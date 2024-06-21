FROM node:21.5.0
WORKDIR /usr/local/apps/myapp

COPY package.json ./
RUN npm install --force  && npm cache clean --force
ENV PATH=/usr/local/myapp/node_modules/.bin:$PATH
COPY tsconfig.json ./
COPY src ./src
COPY .env.local ./

EXPOSE 3000

CMD ["npm", "run", "start:dev"]