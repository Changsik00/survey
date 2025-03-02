# 빌드 스테이지
FROM node:22-alpine as build
WORKDIR /app

# corepack 활성화 및 pnpm 설정
RUN corepack enable && corepack prepare pnpm@latest --activate

# 패키지 설치
COPY pnpm-lock.yaml package.json ./
RUN pnpm install --frozen-lockfile

# 소스 코드 복사 및 빌드
COPY . .
RUN pnpm build

# 실행 스테이지
FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]