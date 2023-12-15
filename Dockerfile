FROM node:20

WORKDIR /app

COPY package.json ./

RUN npm install

COPY . .

EXPOSE 3000

ENV DATABASE_URL=mongodb+srv://prathmeshsadake:PrathmeshSadake_MongoDB@cluster0.wivqa.mongodb.net/sociodo?retryWrites=true&w=majority
ENV KINDE_CLIENT_ID=5ac872fff6a3462195ed8907de0eec9b
ENV KINDE_CLIENT_SECRET=xhm7iBPy7HKwf5DLTNU4egLHa9Cj5j1cyathlXzZGzMvKdjlQy
ENV KINDE_ISSUER_URL=https://sociodo.kinde.com
ENV KINDE_SITE_URL=http://localhost:3000
ENV KINDE_POST_LOGOUT_REDIRECT_URL=http://localhost:3000
ENV KINDE_POST_LOGIN_REDIRECT_URL=http://localhost:3000

RUN npm run build

CMD ["npm", "start"]
