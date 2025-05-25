# Stage 1: Building the code
FROM node:20-alpine as builder

ENV PORT=8080
WORKDIR /app

COPY package.json ./

RUN npm install -f


COPY . .
RUN npm run build

EXPOSE 8080
CMD ["npm", "run", "start"]