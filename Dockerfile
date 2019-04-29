FROM keymetrics/pm2:10-alpine

COPY src src/
COPY package.json .
COPY ./deployment/pm2.json .
COPY .babelrc .

RUN npm install
RUN npm run build
RUN ls -al -R
