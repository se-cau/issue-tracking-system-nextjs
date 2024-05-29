# 1. Base image 설정
FROM node:18-alpine

# 2. 작업 디렉토리 설정
WORKDIR /app

# 3. package.json과 package-lock.json 복사
COPY package*.json ./

# 4. 의존성 설치
RUN npm install

# 5. Next.js 소스코드 복사
COPY . .

# 6. Next.js 애플리케이션 빌드
RUN npm run build

# 7. Next.js 애플리케이션 시작
CMD ["npm", "start"]

# 8. 포트 설정
EXPOSE 3000