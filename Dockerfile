FROM node:22-alpine
WORKDIR /Elysian
COPY package*.json /Elysian
RUN npm install
EXPOSE 6161
COPY . /Elysian
CMD ["npm","start"]