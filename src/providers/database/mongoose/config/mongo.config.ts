export default async function getMongoConfig() {
  return {
    uri: process.env.MONGO_URI,
    dbName: process.env.MONGO_DB_NAME,
    user: process.env.MONGO_USER,
    pass: process.env.MONGO_PASS,
    authSource: process.env.MONGO_AUTH_SOURCE,
    retryWrites: true, // 트랜잭션이 실패한 경우 자동으로 재시도
    useNewUrlParser: true, // 새로운 URL 파서 사용
    useUnifiedTopology: true // MongoDB 드라이버의 새로운 연결 방식 사용
  };
}
