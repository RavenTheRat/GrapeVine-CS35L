# GrapeVine-CS35L

Grapevine developed by DARTZ, by Remi Akopians, Adelisa Navarro Cobian, David Zhong, Zayd Khan, and Thomas Scullin.

![Calendar Page](docs/calendar_example.png)
![Login Page](docs/public_example.png)

## Architecture

Grapevine is broadly split into two components and their respective folders in `frontend` and `backend`.

The frontend is built using Javascript and ReactJS.
To bundle and serve our frontend for development, we used `vite`, and for backend calls, we used the `axios` library.

The backend consists of a NodeJS server written in Javascript which serves our website statically and runs our backend API endpoints using the `express` library.
To handle authentication securely, we used Auth0, an external authentication service.
For our database, we used MySQL.
We interfaced with MySQL using the `prisma` library.
For development, we used the `nodemon` package to live reload database changes.

## Setup

### External Setup

Firstly, you need to create a project within auth0.
You can navigate to the auth0 website, sign in using any google account, and create a new application. The codes below will be in the settings bar
This should give you a client ID and client secret which you must store in `backend/.env` in the following format.

```
AUTH0_CLIENT_ID="CLIENT_ID"
AUTH0_CLIENT_SECRET="CLIENT_SECRET"
```

For TAs, our auth0 keys are provided in the .env. Please don't do anything evil.

Next, you must create a MySQL database.
This database may be set up locally or in the cloud.
For development, we recommend following [these steps](https://dev.mysql.com/doc/mysql-getting-started/en/) to set up MySQL locally.

Once set up, you should have a MySQL URL which may also contain authentication data.
The URL should look like this: `mysql://USER:PASSWORD@URL`
Most likely the template for this will be `mysql://USERNAME:PASSWORD@localhost:PORT#/dbname` (you can access all of this information in your mysql workbench or through scripts)
You will also place this string in `backend/.env`.

```
DATABASE_URL="URL"
AUTH0_CLIENT_ID="CLIENT_ID"
AUTH0_CLIENT_SECRET="CLIENT_SECRET"
```

### Repository Setup

First, install the required packages:

```sh
npm install
```

(If this fails, try running `npm install` in the `backend` and `frontend` folders separately, or running 
`npm install --force`, or both. This has helped one of our groupmates who run on Windows.)

The only setup you must complete is the database.
In order to create the database schema, you must run the following commands initially and on each database schema change:

```sh
cd backend
npx prisma migrate dev
```

If the command fails, it is likely that your `DATABASE_URL` is not configured correctly or the database is not running.
If you want to reset the database in a development environment, run `npx prisma migrate reset`.

Then, you can run the commands below in the **top level** directory, and navigate to `http://localhost:3000/index.html`:

```sh
npm run build
npm run dev
```

This will complete three steps:

1. Generate the backend's database files
2. Compile the frontend (this means no hot reloading)
3. Serve the frontend and run the backend via `nodemon`

> Made with ❤️ by the DARTZ team.

