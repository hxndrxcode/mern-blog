# Mern Blog

Mern Blog is simple Blogging platform build with MERN stack (MongoDB, ExpressJS, React, Nodejs). Here you can provide a platform for everybody who wants to create a blog with your platform.

This platform is similar to blogger or wordpress. But, we build the dashboard that makes users are able to find posts from another blogger, just like a social media.

So, in short. This platform is a collaboration between blogging platform + social media.

## Preparation

Create .env files inside `api`, `client-app` and `client-blog` with keys defined in the `.env.example` file.

You need to create google api to have GOOGLE_API_KEY / GOOGLE_CLIENT_KEY and GOOGLE_SECRET_KEY. And also, you have to register in mongodb atlas to have a hosted mongodb server or you can host your own mongoDB server.

## Run

Run these three apps from CLI with the following commands:

```
# run api server (expressjs)
npm run start-api

# run the dashboard (reactjs)
npm run start-app

# run the blog (expressjs)
npm run start-blog
```