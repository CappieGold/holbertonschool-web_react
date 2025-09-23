# Typescript

## Learning Objectives
At the end of this project, you are expected to be able to `explain to anyone`, **without the help of Google:**
- Basic types in Typescript
- Interfaces, Classes, and functions
- How to work with the DOM and Typescript
- Generic types
- How to use namespaces
- How to merge declarations
- How to use an ambient Namespace to import an external library
- Basic nominal typing with Typescript

## Requirements
- Allowed editors: `vi`, `vim`, `emacs`, `Visual Studio Code`
- All your files should end with a new line
- All your files will be transpiled on Ubuntu 18.04 or better
- Your TS scripts will be checked with `jest` (version 24.9.* )
- A README.md file, at the root of the folder of the project, is mandatory
- Your code should use the `ts` extension when possible
- The Typescript compiler should not show any warning or error when compiling your code

## Configuration Files

### package.json
```typescript
{
  "name": "typescript_dependencies",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "mode": "development",
  "scripts": {
    "start-dev": "webpack-dev-server",
    "build": "webpack",
    "test": "jest"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "devDependencies": {
    "@babel/plugin-proposal-export-default-from": "^7.18.10",
    "@babel/preset-typescript": "^7.22.15",
    "@types/jest": "^29.5.5",
    "eslint": "^9.24.0",
    "@typescript-eslint/eslint-plugin": "^8.29.1",
    "@typescript-eslint/parser": "^8.29.1",
    "clean-webpack-plugin": "^4.0.0",
    "fork-ts-checker-webpack-plugin": "^9.0.0",
    "html-webpack-plugin": "^5.5.3",
    "jest": "^29.7.0",
    "source-map": "^0.7.4",
    "ts-jest": "^29.1.1",
    "ts-loader": "^9.4.4",
    "typescript": "^4.9.5",
    "webpack": "^5.88.2",
    "webpack-cli": "^5.1.4",
    "webpack-dev-server": "^4.15.1"
  }
}
```

### .eslintrc.js
```typescript
module.exports =  {
  parser:  '@typescript-eslint/parser',
  extends:  [
    'plugin:@typescript-eslint/recommended',  // Uses the recommended rules from @typescript-eslint/eslint-plugin
  ],
  parserOptions:  {
    ecmaVersion:  2020,
    sourceType:  'module',
    project: './tsconfig.json'
  },
  rules:  {
  },
}
```

### tsconfig.json
```typescript
{
  "compilerOptions": {
    "outDir": "./dist/",
    "sourceMap": true,
    "noImplicitAny": true,
    "module": "es6",
    "target": "es5",
    "allowJs": true,
    "moduleResolution": "node",
    "skipLibCheck": true,
    "esModuleInterop": true,
    "forceConsistentCasingInFileNames": true,
    "lib": ["ES2020", "DOM"],
    "strict": true
  }
}
```

### webpack.config.js
```typescript
const path = require("path");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');

module.exports = {
  mode: "development",
  entry: "./js/main.ts",
  
  devtool: "inline-source-map",
  
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'ts-loader',
        options: {
          transpileOnly: true
        }
      }
    ]
  },
  
  resolve: {
    extensions: [".tsx", ".ts", ".js"]
  },
  
  devServer: {
    static: {
      directory: path.join(__dirname, 'dist'),
    },
    open: true,
    port: 8080,
  },
  
  plugins: [
    new ForkTsCheckerWebpackPlugin(),
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      title: "Development"
    })
  ],
  
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist")
  }
};
```
