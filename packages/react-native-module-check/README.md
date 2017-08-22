# react-native-module-check

[![npm](https://img.shields.io/npm/v/react-native-module-check.svg)](https://www.npmjs.com/package/react-native-module-check)
[![npm](https://img.shields.io/npm/dt/react-native-module-check.svg)](https://www.npmjs.com/package/react-native-module-check)
[![npm](https://img.shields.io/npm/l/react-native-module-check.svg)](https://github.com/negativetwelve/react-native-package/blob/master/LICENSE)

Checks NativeModules to make sure they are installed correctly. Provides react-native package creators with an easy way to write instructions when things go wrong.

## Getting Started

Install `react-native-module-check` using `yarn`:

```shell
yarn add react-native-module-check
```

## Motivation

When installing a NativeModule for React Native, there are several issues that can go wrong and often times the error messages are cryptic and misleading. This module aims to provide NativeModule authors an easy way to add a default message that should appear either as a `warning` or as an `error` on startup.

This package also allows you to notify users when a NativeModule only supports certain platforms. See the examples below.

## Usage

This is an example from the `react-native-instabug-sdk` which was the motivation for this package. By default, `check` will log a warning using `console.warn` but it also has the option to throw an error by setting `error: true`.

```javascript
import {check} from 'react-native-module-check';

check({
  json: require('../package.json'),
  nativeModule: NativeModules.RNInstabugSDK,
  enabled: Platform.select({
    ios: true,
  });
});
```

Using values from the `package.json`, we can record a consistent warning if we determine this package was not installed correctly:

> Warning: react-native-instabug-sdk was not installed correctly. Please follow the instructions in the README: https://github.com/negativetwelve/react-native-instabug-sdk#readme.

I recommend placing this call at the top of your implementation before you call any methods on your NativeModule.

## Contributing

If you have any ideas on how this module could be better, [create an Issue](https://github.com/negativetwelve/react-native-package/issues) or [submit a PR](https://github.com/negativetwelve/react-native-package/pulls).
