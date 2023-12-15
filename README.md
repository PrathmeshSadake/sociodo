
# Sociodo






## Features

- User Authentication using Kinde https://kinde.com
- Full stack application where users can post a message and add comments to other posts.
- Users can search for posts and comments.
- Deployed on Vercel

### Technology Stack
- Next.js / React
- Prisma as Database ORM
- MongoDB as a Database
- Swr for fetching data
- Tailwind CSS for styling
- Shadcn-ui for components (https://ui.shadcn.com)



## Demo
https://sociodo.vercel.app

## Environment Variables

To run this project, you will need to add the following environment variables to your .env file
You can copy values of these variables below

**Make sure not to mess with any kind of production database and users data without knowledge of Prisma, Kinde and NextJS**

***Environment Variables for Development Environment only***

`DATABASE_URL=mongodb+srv://prathmeshsadake:PrathmeshSadake_MongoDB@cluster0.wivqa.mongodb.net/sociodo?retryWrites=true&w=majority`

`KINDE_CLIENT_ID=5ac872fff6a3462195ed8907de0eec9b`

`KINDE_CLIENT_SECRET=xhm7iBPy7HKwf5DLTNU4egLHa9Cj5j1cyathlXzZGzMvKdjlQy`

`KINDE_ISSUER_URL=https://sociodo.kinde.com`

`KINDE_SITE_URL=http://localhost:3000`

`KINDE_POST_LOGOUT_REDIRECT_URL=http://localhost:3000`

`KINDE_POST_LOGIN_REDIRECT_URL=http://localhost:3000`





## Installation


```bash
  git clone https://github.com/PrathmeshSadake/sociodo.git
  cd sociodo
  npm install
  npx prisma generate
  npm run dev

  visit http://localhost:3000 on your development environment
```

** To build and run Dockerized Next.js app, run the following commands in the terminal:**

```bash
git clone https://github.com/PrathmeshSadake/sociodo.git

cd sociodo

docker-compose up --build

Visit http://localhost:3000 on your development environment
```
    
## Authors

- [Prathmesh Sadake](https://www.github.com/prathmeshsadake)

