#### Introduce
- A tiny key-value db engine implementation based off of JSON file.
- Base on single thread interpreter of JavaScript.
- Build project with latest LTS nodejs `v14.17.0` and `mjs` enabled.
  - Ref: https://nodejs.org/dist/latest-v14.x/docs/api/esm.html#esm_enabling

#### Quicksart

- Production mode
```
yarn
yarn start
```
- Development mode

```
yarn debug
```

#### Troubleshooting
- `esbuild-jest` doesn't work, Ref: https://github.com/aelbore/esbuild-jest
- `esbuild-jest-transform` works well, Ref: https://github.com/AkifumiSato/esbuild-jest-transform
