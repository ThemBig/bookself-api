FROM node:14-alpine

WORKDIR app/

COPY package*.json ./

COPY src/ src/

COPY nest-cli.json ./

COPY tsconfig*.json ./

RUN npm install

EXPOSE 3000

CMD ["npm", "run", "start"]