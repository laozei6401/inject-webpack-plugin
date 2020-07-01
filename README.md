# Inject-webpack-plugin

###Installation

```
npm i --save-dev inject-webpack-plugin
```

```
yarn add --save-dev inject-webpack-plugin
```

###Usage
```
const InjectWebpackPlugin = require('inject-webpack-plugin');

module.exports = {
  plugins: [
    new InjectWebpackPlugin({
      head: ['jquery']
    })
  ]
}
```
###reference
[html-webpack-injector](https://github.com/architgarg/html-webpack-injector)