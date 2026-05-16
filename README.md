# Headless CMS User Microservice

User management microservice built using NestJS and gRPC.

Responsible for handling:

- User registration
- Authentication logic
- Password hashing
- Database access
- gRPC communication

This service is consumed by the API Gateway.

---

## Architecture Role

```text
Client
  │
  ▼
API Gateway
  │
  │ gRPC
  ▼
User Microservice
  │
  ▼
PostgreSQL
```

The microservice does not expose HTTP endpoints directly.

Communication occurs through gRPC.

---

## Tech Stack

- NestJS
- TypeScript
- PostgreSQL
- TypeORM
- gRPC
- bcrypt
- JWT
- Docker
- Kubernetes

---

## Features

Implemented:

- Create users
- Find users
- Authentication support
- Password hashing
- Database persistence
- gRPC transport

Planned:

- Roles & permissions
- User profile management
- Refresh tokens
- Email verification
- CMS ownership support

---

## Project Structure

```text
src/
├── auth/
├── users/
├── entities/
├── proto/
└── app.module.ts
```

---

## Installation

Clone:

```bash
git clone https://github.com/FaiqShahzad/headless-cms-microservice.git

cd headless-cms-microservice
```

Install:

```bash
npm install
```

---

## Environment Variables

Create `.env`

```env
PORT=5000

DB_HOST=localhost

DB_PORT=5432

DB_USERNAME=postgres

DB_PASSWORD=password

DB_NAME=users

JWT_SECRET_KEY=secret
```

---

## Running Locally

Development:

```bash
npm run start:dev
```

Production:

```bash
npm run build
npm run start:prod
```

---

## PostgreSQL Setup

Example docker command:

```bash
docker run \
-p 5432:5432 \
-e POSTGRES_PASSWORD=password \
-e POSTGRES_USER=postgres \
-e POSTGRES_DB=users \
postgres
```

---

## gRPC Configuration

Proto files define communication contracts between:

- API Gateway
- User Microservice

Location:

```text
src/proto/
```

---

## Docker

Build:

```bash
docker build -t user-microservice .
```

Run:

```bash
docker run -p 5000:5000 user-microservice
```

---

## Kubernetes

Deploy:

```bash
kubectl apply -f .
```

Resources included:

- Deployment
- Service
- Scaling configuration

---

## Notes

This project was built primarily to explore:

- NestJS microservices
- gRPC
- Distributed systems
- Containerization
- Kubernetes orchestration

It is evolving toward a more complete headless CMS architecture.

---

## Future Improvements

- Remove TypeORM synchronize mode
- Add migrations
- Add unit tests
- Improve secret management
- Add monitoring/logging
- Add refresh token strategy
- Implement CMS features

---

## Author

Faiq Shahzad

Software Engineer interested in backend systems, microservices, cloud infrastructure, and scalable architectures.