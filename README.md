#### Introduce
- A tiny key-value db engine implementation based off of JSON file.
- Base on single thread interpreter of JavaScript.
- Build project with latest LTS nodejs `v14.17.0` and `mjs` enabled.
  - Ref: https://nodejs.org/dist/latest-v14.x/docs/api/esm.html#esm_enabling
  - Ref: https://nodejs.org/dist/latest-v14.x/docs/api/packages.html#packages_type
- For bundler thing, here we use esbuild instead of webpack.
  - Ref: https://esbuild.github.io/
- Here we host it with Heroku.
  - Ref: https://www.heroku.com/

#### Quickstart
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
    "test:debug": "node --inspect `which jest` --no-cache ./src"
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
- Caveat! Your key should be encoded by `encodeURIComponent` with JavaScript, if you want to type it in the URL directly.
```
curl -X GET https://versioning-key-value.herokuapp.com/object
curl -X POST https://versioning-key-value.herokuapp.com/object --data '{"scott": 100}' -H "content-type: application/json"

# NOTE: get value = 100
curl -X GET https://versioning-key-value.herokuapp.com/object/scott

# NOTE: get value = 101
curl -X POST https://versioning-key-value.herokuapp.com/object --data '{"scott": 101}' -H "content-type: application/json"
curl -X GET https://versioning-key-value.herokuapp.com/object/scott

# NOTE: you need to input a timestamp for query versioning value
curl -X GET https://versioning-key-value.herokuapp.com/object/scott?timestamp=$timestamp
```

#### Troubleshooting
- `esbuild-jest` doesn't work, Ref: https://github.com/aelbore/esbuild-jest
- `esbuild-jest-transform` works well, Ref: https://github.com/AkifumiSato/esbuild-jest-transform
