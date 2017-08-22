# react-native-package

[![npm](https://img.shields.io/npm/v/react-native-package.svg)](https://www.npmjs.com/package/react-native-package)
[![npm](https://img.shields.io/npm/dt/react-native-package.svg)](https://www.npmjs.com/package/react-native-package)
[![npm](https://img.shields.io/npm/l/react-native-package.svg)](https://github.com/negativetwelve/react-native-package/blob/master/LICENSE)

Provides a consistent format to define and export packages for React Native.

## Getting Started

Install `react-native-package` using `yarn`:

```shell
yarn add react-native-package
```

## Motivation

This package (pun intended) addresses several issues when creating a NativeModule for React Native:

1. Consistent way of checking if a NativeModule was installed correctly.
2. Allows 'guarding' a module on a platform that it has not been implemented on yet.
3. Helpful error messages when a module has not been implemented on a platform.

## Usage

This is an example from the `react-native-instabug-sdk` which was the motivation for this package.

```javascript
import {Platform} from 'react-native';
import Package from 'react-native-package';


export default Package.create({
  json: require('./package.json'),
  nativeModule: NativeModules.RNInstabugSDK,
  enabled: Platform.select({
    ios: true,
  }),
  export: (Instabug) => ({
    // Constants that this module exports.
    events: {
      ...
    },
    modes: {
      ...
    },

    // All methods that this NativeModule is supposed to export:
    startWithToken: (token, event) => Instabug.startWithToken(token, event),
  }),
});
```

Using values from the `package.json`, we can record a consistent warning if we determine this package was not installed correctly:

> Warning: react-native-instabug-sdk was not installed correctly. Please follow the instructions in the README: https://github.com/negativetwelve/react-native-instabug-sdk#readme.

It will also record a message if the Package is not enabled on the current platform:

> Warning: react-native-instabug-sdk does not currently have an implementation for Android. If you would like to contribute, please submit a PR to https://github.com/negativetwelve/react-native-instabug-sdk.

But, calling a method on that platform, Android in this case, such as:

```javascript
import React from 'react';
import Instabug from 'react-native-instabug-sdk';


export default class App extends React.Component {
  componentDidMount() {
    Instabug.startWithToken(TOKEN, EVENT);
  }

  render() {
    return (
      <Text>Testing Instabug</Text>
    );
  }
}
```

will not error! :tada:

## Contributing

If you have any ideas on how this module could be better, [create an Issue](https://github.com/negativetwelve/react-native-package/issues) or [submit a PR](https://github.com/negativetwelve/react-native-package/pulls).
