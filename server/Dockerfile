FROM node:18

WORKDIR /server
COPY package.json .
COPY wait-for-it.sh ./
RUN chmod +x ./wait-for-it.sh .
RUN npm install
COPY . .
CMD npm start