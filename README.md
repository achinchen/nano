# Nano

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
