# MEAN - SSR

### LOCAL SETUP STEPS

# DOWNLOADS AND INSTALLATION

- node v10.15.2
https://nodejs.org/download/release/v10.15.2/

From CLI (install these on global levels)
- yarn: @1.16.0
- npm: @6.4.1

- Download mongoDB and install as a service
https://fastdl.mongodb.org/windows/mongodb-windows-x86_64-4.4.12-signed.msi

# .env FILE SETUP

- Create a `.env` file
    APP_URL=http://localhost:4000
    SSR_URL=http://localhost:4200
    BROWSER_URL=http://localhost:3200
    PORT=4000
    MONGODB_URI=mongodb://localhost/mean-ssr
- Paste `.env` file in `dist` folder

# CMD/TERMINAL COMMANDS TO RUN

- Clone repo
- Open CMD and go to cloned repo path.
- Run `yarn install --ignore-engines`
- Run `yarn watch-ts` (You might want to comment line containing 'AngularServer' keywords on main.ts, it will watch TS the client side, and will disturb the experience of running node JS backend)
- Open another CMD
- Run `yarn watch-node`
- Go to `http://localhost:4000/api/user/checkRoute` to check pulse beat

# Run angular client browser
- Go to 'client'
- Run `yarn client-browser`
- Port: 3200

# Run angular client server
- Go to 'client' again
- Run `yarn client-ssr`
- Port: 4200

# STYLES.SCSS Guide
- Use default scss as `@import "projects/client-ssr/src/styles.scss;`

# Deployment
- Make sure you uncommented the AngularServer lines code, which you did on main.ts
- Run `yarn build-app-production` to make a dist folder
- Run locally and check the meta tags that we have added on app-routing

### END LOCAL SETUP

# Avoiding Memory Leaks in SSR
In SSR, Angular calls ngOnDestroy for services, so it is a good place to unsubscribe any pending RxJs subscriptions at the end of life of the service.

