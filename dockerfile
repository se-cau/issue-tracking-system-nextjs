# 1. Base image 설정
FROM node:18-alpine

# 2. 작업 디렉토리 설정
WORKDIR /app

# 3. Build-time argument 설정
ARG NEXT_PUBLIC_API_URL

# 4. Build-time argument를 환경 변수로 설정
ENV NEXT_PUBLIC_API_URL=$NEXT_PUBLIC_API_URL

# 5. package.json과 package-lock.json 복사
COPY package*.json ./

# 6. 의존성 설치
RUN npm install

# 7. Next.js 소스코드 복사
COPY . .

# 8. Next.js 애플리케이션 빌드
RUN npm run build

# 9. Next.js 애플리케이션 시작
CMD ["npm", "start"]

# 10. 포트 설정
EXPOSE 3000