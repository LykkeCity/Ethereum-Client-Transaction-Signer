# Ethereum-Client-Transaction-Signer


1) To install all dependencies
```
npm install
```

2) To run tests
```
npm run test
```

3) To build and publish (builds js file for browser with `ethereumjs` global variable)
```
browserify index.js --standalone ethereumjs > dist/lykke-ethereum.js && minify dist/lykke-ethereum.js
```
