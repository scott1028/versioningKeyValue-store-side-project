#### Introduce
- A tiny key-value db engine implementation based off of JSON file.
- Base on single thread interpreter of JavaScript.
- Build project with latest LTS nodejs `v14.17.0` and `mjs` enabled.
  - Ref: https://nodejs.org/dist/latest-v14.x/docs/api/esm.html#esm_enabling
- For bundler thing, here we use esbuild instead of webpack.
  - Ref: https://esbuild.github.io/

#### Quicksart

- Some of build-in task defined in package.json already.
```
    ...
  "scripts": {
    # NOTE: launch with development mode
    "dev": "nodemon --watch ./src --inspect ./src/index.mjs",

    # NOTE: launch with production mode, you can also use PM2 to manage the process.
    "start": "node ./src/index.mjs",

    # NOTE: launch with development debug mode
    "debug": "node --inspect ./src/index.mjs",

    # NOTE: run test
    "test": "jest --no-cache ./src --coverage",

    # NOTE: run test with debug mode
    "test:debug": "node --inspect-brk `which jest` ./src"
  },
    ...
```

- Production mode
```
yarn
yarn start
```
- Development mode

```
yarn debug
```

#### Playground with CURL

```
curl -X GET http://127.0.0.1:3000/api/keys
curl -X POST http://127.0.0.1:3000/api/keys --data '{"key": "scott", "value": 100}' -H "content-type: application/json"

# NOTE: get value = 100
curl -X GET http://127.0.0.1:3000/api/keys/scott

# NOTE: get value = 101
curl -X POST http://127.0.0.1:3000/api/keys --data '{"key": "scott", "value": 101}' -H "content-type: application/json"
curl -X GET http://127.0.0.1:3000/api/keys/scott

# NOTE: you need to input a timestamp for query versioning value
curl -X GET http://127.0.0.1:3000/api/keys/scott?timestamp=$timestamp
```

#### Troubleshooting
- `esbuild-jest` doesn't work, Ref: https://github.com/aelbore/esbuild-jest
- `esbuild-jest-transform` works well, Ref: https://github.com/AkifumiSato/esbuild-jest-transform
