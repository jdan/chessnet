FROM node:15.5.0-alpine3.12

EXPOSE 23

WORKDIR /app
ADD . .

RUN npm install
CMD ["node", "main.js"]
