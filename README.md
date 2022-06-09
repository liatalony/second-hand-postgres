# Wrinkle

## Guide for the backend server of the second hand shop Wrinkle

### Hello new developer!

So happy to see you reading this file! its important that you know how we set everything up and how to work in this project.
This project is the backend for a React application for Wrinkle - a secondhand shop that lests its customers sell their own items in the shop.

In this project we created different routes for different purposes and communicate with a PostgreSQL database.

### When working

This project is split into many different files. we have the index.js file, routes, middleware, controllers and config.
In the config folder we have all sorts of configurations that we are using in the project such as allowed origins, database configurations and so on.\
In the controllers is where we handle all the functionalitie regarding SQL queries.

Its important that when you pull the code from the repository you run the command `npm install` in the terminal in the root directory on the project to make sure you have all the packages used.\

In order to run the project while developing, run the command `npm run dev`. This will start the server using nodemon which will restart the server every time you make changes to the code. That way you won't need to close the server and start it again each time.

When deploying use `npm run prod` to start the server.

\*\* In the future we will create a YAML file that will run when we push the code to the repository and will deploy the project.

Good work!
