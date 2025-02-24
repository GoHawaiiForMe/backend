import { CloudWatchLogsClient, GetLogEventsCommand } from '@aws-sdk/client-cloudwatch-logs';
import { Client } from '@opensearch-project/opensearch';
import { AwsSigv4Signer } from '@opensearch-project/opensearch/aws';
import { defaultProvider } from '@aws-sdk/credential-provider-node';

const cloudWatchLogsClient = new CloudWatchLogsClient({});

const openSearchClient = new Client({
  ...AwsSigv4Signer({
    region: 'ap-northeast-2',
    service: 'es',
    getCredentials: () => defaultProvider()()
  }),
  node: 'https://search-go-for-me-6ebt2zm6prgyxjr25rnni6pd74.aos.ap-northeast-2.on.aws'
});

export const handler = async (event) => {
  try {
    const logGroupName = process.env.LOG_GROUP_NAME;
    const logStreamName = process.env.LOG_STREAM_NAME;

    const params = {
      logGroupName,
      logStreamName,
      limit: 10
    };

    const command = new GetLogEventsCommand(params);
    const data = await cloudWatchLogsClient.send(command);

    function parseResponseTime(responseTime) {
      if (typeof responseTime === 'number') {
        return responseTime;
      }
      if (typeof responseTime === 'string') {
        const match = responseTime.match(/(\d+)/);
        return match ? parseInt(match[1], 10) : 0;
      }
      return 0;
    }

    function extractContentType(accept) {
      const types = accept.split(',');
      return types[0].trim();
    }

    const formattedLogs = data.events
      .map((event) => {
        let logLevel, logObject;

        // 로그 레벨과 로그 객체 분리
        const match = event.message.match(/^(info|error) - (.+)$/);
        if (match) {
          [, logLevel, logObject] = match;
        } else {
          console.warn('Unexpected log format:', event.message);
          return null;
        }

        // 로그 객체 파싱
        try {
          logObject = JSON.parse(logObject);
        } catch (error) {
          console.error('Failed to parse log object:', error, logObject);
          return null;
        }

        if (typeof logObject !== 'object' || logObject === null) {
          console.warn('Invalid log object structure:', logObject);
          return null;
        }

        return {
          '@timestamp': new Date(logObject.timestamp || event.timestamp).toISOString(),
          log_level: logLevel,
          method: logObject.method || 'N/A',
          path: logObject.path || 'N/A',
          status: logObject.status || 0,
          response_time: parseResponseTime(logObject.responseTime) || 0,
          client_ip: logObject.request?.headers?.['x-forwarded-for'] || 'N/A',
          'sec-ch-ua-platform': (logObject.request?.headers?.['sec-ch-ua-platform'] || 'N/A').replace(/"/g, ''),
          host: logObject.request?.headers?.['host'] || 'N/A',
          origin: logObject.request?.headers?.['origin'] || 'N/A',
          content_type: extractContentType(logObject.request?.headers?.accept || 'N/A'),
          accept: logObject.request?.headers?.['accept'] || 'N/A',
          user_agent: logObject.request?.headers?.['user-agent'] || 'N/A',
          referer: logObject.request?.headers?.['referer'] || 'N/A',
          request_body: JSON.stringify(logObject.request?.body || {}).replace(/"/g, ''),
          error_message: logObject.response?.errorMessage || 'N/A'
        };
      })
      .filter(Boolean);

    // OpenSearch로 로그 데이터 전송
    if (formattedLogs.length > 0) {
      const body = formattedLogs.flatMap((doc) => [
        { index: { _index: 'logs', _id: `${doc['@timestamp']}-${Math.random().toString(36).substring(7)}` } },
        doc
      ]);

      try {
        const response = await openSearchClient.bulk({ body });
        console.log('OpenSearch response:', JSON.stringify(response));
      } catch (error) {
        console.error('Error sending logs to OpenSearch:', error);
      }
    } else {
      console.warn('No valid logs to send to OpenSearch');
    }

    return {
      statusCode: 200,
      body: JSON.stringify({
        message: 'Logs processed successfully',
        response
      })
    };
  } catch (error) {
    console.error('Error processing logs:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({
        message: 'Failed to process logs',
        error: error.message
      })
    };
  }
};
