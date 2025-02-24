## 대리 여행 중개 플랫폼

![logo](https://i.imgur.com/bvVO9xc.png)

> 2025.01.07 - 2025.02.26 </br>
> 코드잇 스프린트 풀스택 2기 고급 프로젝트 2팀 (Backend) </br> > [Frontend Github 바로가기 🔗](https://github.com/GoHawaiiForMe/frontend)

</br>

- [니가가라 하와이] 홈페이지: https://www.go-for-me.kro.kr
- 🗂️ 팀 문서: https://spotless-file-76e.notion.site/2-15f9b6a2707e806ba711ff1f83c499d3?pvs=4
- 🔍 API 명세: https://www.goforme.duckdns.org/docs

</br>

## 🛠️ 기술스택

1. **NestJS**: TypeScript 기반 서버 프레임워크 (Express 위에서 동작)
2. **Prisma**: 관계형 DB를 위한 ORM
3. **Mongoose**: MongoDB와의 ODM
4. **BullMQ**: Redis 기반의 큐 시스템
5. **Passport.js**: OAuth 인증 (Google, Kakao, Naver 등)
6. **AWS S3**: 파일 업로드 및 저장
7. **AWS Lambda**: 서버리스 함수 실행
8. **Winston**: 로그 수집 및 관리
9. **Grafana & Kibana**: 성능 모니터링 및 시각화
10. **WebSocket (Socket.io)**: 실시간 채팅 처리
11. **Jest & Supertest**: 테스트 프레임워크 및 API 테스트 라이브러리
12. **Cron jobs**: 주기적인 작업 처리
13. **Nginx**

<img src="https://img.shields.io/badge/NestJS-000000?style=for-the-badge&logo=nestjs&logoColor=E0234E"> ![Typescript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white) <img src="https://img.shields.io/badge/Passport-000000?style=for-the-badge&logo=passport&logoColor=34E27A"> ![JWT](https://img.shields.io/badge/json%20web%20tokens-323330?style=for-the-badge&logo=json-web-tokens&logoColor=pink) ![Jest](https://img.shields.io/badge/Jest-C21325?style=for-the-badge&logo=Jest&logoColor=white) ![Socketio](https://img.shields.io/badge/Socket.io-010101?style=for-the-badge&logo=socketdotio&logoColor=white)

![postgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white) ![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white) ![Prisma](https://img.shields.io/badge/Prisma-3982CE?style=for-the-badge&logo=Prisma&logoColor=white) ![Mongoose](https://img.shields.io/badge/Mongoose-880000?style=for-the-badge&logo=mongoose&logoColor=#880000) ![Redis](https://img.shields.io/badge/redis-FF4438.svg?&style=for-the-badge&logo=redis&logoColor=white) ![BullMQ](https://img.shields.io/badge/Bullmq-A8A59B.svg?&style=for-the-badge&logo=&logoColor=white)

<img src="https://img.shields.io/badge/AWS EC2-FF9900?style=for-the-badge&logo=amazonec2&logoColor=white"> <img src="https://img.shields.io/badge/AWS Lambda-FF9900?style=for-the-badge&logo=awslambda&logoColor=white"> <img src="https://img.shields.io/badge/AWS S3-569A31?style=for-the-badge&logo=amazons3&logoColor=white"> <img src="https://img.shields.io/badge/AWS RDS-527FFF?style=for-the-badge&logo=amazonrds&logoColor=white"> <img src="https://img.shields.io/badge/nginx-009639?style=for-the-badge&logo=nginx&logoColor=green"> <img src="https://img.shields.io/badge/PM2-2B037A?style=for-the-badge&logo=PM2&logoColor=green"> ![Grafana](https://img.shields.io/badge/Grafana-F46800?style=for-the-badge&logo=grafana&logoColor=white) ![Kibana](https://img.shields.io/badge/Kibana-005571?style=for-the-badge&logo=kibana&logoColor=white)

![github](https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white) ![slack](https://img.shields.io/badge/Slack-4A154B?style=for-the-badge&logo=slack&logoColor=white) ![discord](https://img.shields.io/badge/Discord-7289DA?style=for-the-badge&logo=discord&logoColor=white) ![notion](https://img.shields.io/badge/Notion-000000?style=for-the-badge&logo=notion&logoColor=white) ![Swagger](https://img.shields.io/badge/-Swagger-%23Clojure?style=for-the-badge&logo=swagger&logoColor=white) ...etc

</br>

## 💁 구성원

|                              김영은                              |                           김태연                            |
| :--------------------------------------------------------------: | :---------------------------------------------------------: |
|            ![imgur](https://i.imgur.com/lVepEn6.png)             |          ![imgur](https://i.imgur.com/YLesOfA.png)          |
|                             **팀장**                             |                        **백엔드장**                         |
| 노션 관리, 백엔드 GitHub 관리, 중간 발표 자료 제작, 배포 및 관리 | 회의록 관리, 발표 자료 정리, Lambda 배포, 데이터베이스 관리 |
|        [Github 바로가기 🔗](https://github.com/Maybeiley)        |    [Github 바로가기 🔗](https://github.com/taeyeonkim94)    |

</br>

## 📋 팀원별 구현 기능 상세

### 김영은

- Auth API 구현
  - 인증/인가 guard 및 decorator
  - 구글, 카카오, 네이버 OAuth
- User API 구현
- Profile API 구현
- Follow API 구현
- Review API 구현
- Notification API 구현
  - SSE 통한 실시간 알림 추가
- Payment API 구현
  - PortOne PG사 연동 결제
- UserStats 구현
  - 메시지큐를 통해 연산 작업 비동기 처리
  - 자주 조회하는 데이터 캐싱
- PointLog 구현
  - 메시지큐를 통해 포인트 작업 비동기 처리
  - 실패한 작업 스케줄링
- 시스템/네트워크 및 애플리케이션 로그 구현
  - Lambda를 통한 Cloudwatch 로그 자동 수집
- GitHub Actions CI/CD 구현
- Swagger 설정 세팅

</br>

### 김태연

- 기초세팅
- 테스트 파일 구현
  - 전체적인 테스트 설정 세팅
  - plan, quote, chatRoom, chat 모델 e2e 테스트 파일 구현
- Plan API 구현
- Quote API 구현
- Chat API 구현
  - 이미지 및 동영상을 s3에 업로드 및 Presigned URL 구현
  - 이미지가 업로드 될 때 최적화 해주는 lambda 함수 구현 및 적용
- ChatRoom API 구현
  - 웹소켓을 이용해 구현
- 다른 종류의 데이터베이스 transaction 구현
  - 의존성 최소화를 위해 AOP를 통한 데코레이터로 구현
- 스케줄러 구현 및 적용

</br>

## ⚓️ 백엔드 전략

- **도메인 모델 설계**: 도메인 주도 설계(DDD)를 통해 주요 개념을 도메인 모델로 추상화하여 복잡한 비즈니스 로직을 관리.

- **트랜잭션 처리**:
  - Prisma와 MongoDB 모두에 적용할 수 있는 데코레이터 구현 및 적용.
  - 도메인 모델을 적용시키며 의존성을 격리하기 위해 AOP를 활용해 데코레이터 방식으로 트랜잭션을 적용.
- **AWS Lambda**: 이미지 업로드 시 최적화 및 별도로 저장, CloudWatch 로그 트리거 시 OpenSearch로 전송.
- **로그 관리:** 실시간 로그 모니터링 및 시각화
  - 애플리케이션 로그: Winston → AWS CloudWatch → Lambda → OpenSearch(Kibana)
  - 시스템 및 네트워크 로그: Node Exporter / NginX Exporer → Prometheus → Grafana
- **실시간 채팅 기능**: `@nestjs/websockets`와 `Socket.io`를 통해 클라이언트 간 실시간 메시지 전달 및 관리.
- **스케줄러**: `Cron jobs`를 사용하여 주기적으로 실행되는 작업을 자동화.
- **결제 시스템**: 외부 PG사 결제 API와의 연동을 통해 결제 처리 자동화.
- **실시간 알림**: SSE 단방향 통신을 통해 서버에서 클라이언트에 알림 전송.
- **캐싱 및 메시지 큐**: Redis를 활용하여 자주 조회하는 데이터를 캐싱하고 BullMQ를 통해 연산 작업 등을 메시지 큐로 비동기 처리

</br>

## 🍰 프로젝트 회고

- 백엔드 결과물: https://www.goforme.duckdns.org
- 발표 자료 및 시연 영상 :

</br>

## 📁 파일 구조

```
src
├── common
│   ├── constants
│   ├── decorators
│   ├── errors
│   ├── filters
│   ├── guards
│   ├── logger
│   │   ├── cloudWatch
│   │   └── winston
│   ├── pipes
│   └── utilities
├── modules
│   ├── auth
│   │   ├── domains
│   │   ├── types
│   │   ├── strategy
│   │   │   ├── google.strategy.ts
│   │   │   ├── jwt.strategy.ts
│   │   │   ├── kakao.strategy.ts
│   │   │   └── naver.strategy.ts
│   │   ├── auth.controller.ts
│   │   ├── auth.e2e.spec.ts
│   │   ├── auth.module.ts
│   │   ├── auth.repository.ts
│   │   └── auth.service.ts
│   ├── chat
│   │   ├── domains
│   │   ├── types
│   │   ├── chat.controller.ts
│   │   ├── chat.e2e.spec.ts
│   │   ├── chat.module.ts
│   │   ├── chat.repository.ts
│   │   └── chat.service.ts
│   ├── chatRoom
│   │   ├── domains
│   │   ├── types
│   │   ├── chatRoom.controller.ts
│   │   ├── chatRoom.e2e.spec.ts
│   │   ├── chatRoom.gateway.ts
│   │   ├── chatRoom.module.ts
│   │   ├── chatRoom.repository.ts
│   │   └── chatRoom.service.ts
│   ├── follow
│   │   ├── domains
│   │   ├── types
│   │   ├── follow.controller.ts
│   │   ├── follow.e2e.spec.ts
│   │   ├── follow.module.ts
│   │   ├── follow.repository.ts
│   │   └── follow.service.ts
│   ├── notification
│   │   ├── domains
│   │   ├── types
│   │   ├── notification.controller.ts
│   │   ├── notification.e2e.spec.ts
│   │   ├── notification.event.ts
│   │   ├── notification.listener.ts
│   │   ├── notification.module.ts
│   │   ├── notification.repository.ts
│   │   └── notification.service.ts
│   ├── payment
│   │   ├── domains
│   │   ├── types
│   │   ├── payment.controller.ts
│   │   ├── payment.e2e.spec.ts
│   │   ├── payment.module.ts
│   │   ├── payment.repository.ts
│   │   └── payment.service.ts
│   ├── plan
│   │   ├── domains
│   │   ├── types
│   │   ├── plan.controller.ts
│   │   ├── plan.e2e.spec.ts
│   │   ├── plan.module.ts
│   │   ├── plan.repository.ts
│   │   └── plan.service.ts
│   ├── pointLog
│   │   ├── domains
│   │   ├── types
│   │   ├── pointLog.controller.ts
│   │   ├── pointLog.module.ts
│   │   ├── pointLog.repository.ts
│   │   └── pointLog.service.ts
│   ├── quote
│   │   ├── domains
│   │   ├── types
│   │   ├── quote.controller.ts
│   │   ├── quote.e2e.spec.ts
│   │   ├── quote.module.ts
│   │   ├── quote.repository.ts
│   │   └── quote.service.ts
│   ├── review
│   │   ├── domains
│   │   ├── types
│   │   ├── review.controller.ts
│   │   ├── review.e2e.spec.ts
│   │   ├── review.module.ts
│   │   ├── review.repository.ts
│   │   └── review.service.ts
│   ├── task
│   │   ├── task.module.ts
│   │   └── task.service.ts
│   ├── user
│   │   ├── domains
│   │   ├── types
│   │   ├── user.controller.ts
│   │   ├── user.e2e.spec.ts
│   │   ├── user.module.ts
│   │   ├── user.repository.ts
│   │   └── user.service.ts
│   └── userStats
│       ├── domains
│       ├── types
│       ├── userStats.module.ts
│       ├── userStats.repository.ts
│       └── userStats.service.ts
├── providers
│   ├── cache
│   │   ├── redis.module.ts
│   │   └── redis.service.ts
│   ├── database
│   │   ├── mongoose
│   │   │   ├── config
│   │   │   ├── mock
│   │   │   ├── chat.schema.ts
│   │   │   ├── chatRoome.schema.ts
│   │   │   ├── mongoose.seed.ts
│   │   │   ├── notification.schema.ts
│   │   │   ├── payment.schema.ts
│   │   │   └── pointLog.schema.ts
│   │   ├── prisma
│   │   └── transaction
│   ├── pg
│   │   ├── pg.module.ts
│   │   ├── pg.service.ts
│   │   └── portone.provider.ts
│   ├── queue
│   │   ├── bullmq.module.ts
│   │   ├── points.processor.ts
│   │   └── userStats.processor.ts
│   └── storage
│       └── s3
│           ├── s3.config.ts
│           ├── s3.module.ts
│           └── s3.service.ts
├── app.module.ts
└── main.ts

```
