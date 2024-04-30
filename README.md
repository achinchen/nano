# Nano
A reservation service system with queueing functionality. 

## Introduction
I encountered a challenge when booking a dress photoshoot due to the time-consuming process of reserving my dress. Reflecting on this experience, I realized it would be a beneficial idea to implement a reservation service system with queueing functionality.

## User Flow
0. User can use Google OAuth to create account.
1. Provider creates a service with a specific time slot.
2. Consumer can reserve a service with a specific time slot.
3. Consumer can queue for a service with a specific time slot.
4. Provider can view the list of consumers who have reserved or queued for a service.
5. Provider can view the list of services they have created.
4. Consumer can view the orders.

## Tech Stack
- Monorepo: Nx
- Frontend: React, Unocss, Vite, Jest 
- Backend: Express, TypeORM, MySQL, Docker, Jest


## Environment Setup
1. setup environment
note: Fill in the .env file with your own credentials
```
yarn 
cp services/backend/.env.example services/backend/.env
```

2. run backend service
note: Don't forget to setup your docker environment
```
nx dev backend
```

3. run frontend service
```
nx dev frontend
```

4. on your nginx to proxy the port 81 for backend and frontend service
```
brew services start nginx
nginx -c nginx.conf
```
