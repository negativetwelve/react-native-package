# react-native-package

[![npm](https://img.shields.io/npm/v/react-native-package.svg)](https://www.npmjs.com/package/react-native-package)
[![npm](https://img.shields.io/npm/dt/react-native-package.svg)](https://www.npmjs.com/package/react-native-package)
[![npm](https://img.shields.io/npm/l/react-native-package.svg)](https://github.com/negativetwelve/react-native-package/blob/master/LICENSE)
[![CircleCI branch](https://img.shields.io/circleci/project/github/negativetwelve/react-native-package/master.svg)](https://circleci.com/gh/negativetwelve/react-native-package)

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

## List of Packages using `react-native-package`

| Package | Version | Description |
|---------|---------| ------------|
| [`react-native-amplitude-sdk`](https://github.com/negativetwelve/react-native-amplitude-sdk) | [![npm](https://img.shields.io/npm/v/react-native-amplitude-sdk.svg)](https://www.npmjs.com/package/react-native-amplitude-sdk) | React Native wrapper for Amplitude |
| [`react-native-heap-analytics`](https://github.com/negativetwelve/react-native-heap-analytics) | [![npm](https://img.shields.io/npm/v/react-native-heap-analytics.svg)](https://www.npmjs.com/package/react-native-heap-analytics) | React Native wrapper for Heap Analytics |
| [`react-native-instabug-sdk`](https://github.com/negativetwelve/react-native-instabug-sdk) | [![npm](https://img.shields.io/npm/v/react-native-instabug-sdk.svg)](https://www.npmjs.com/package/react-native-instabug-sdk) | React Native wrapper for Instabug |
| [`react-native-lookback`](https://github.com/negativetwelve/react-native-lookback) | [![npm](https://img.shields.io/npm/v/react-native-lookback.svg)](https://www.npmjs.com/package/react-native-lookback) | React Native wrapper for Lookback.io |
| [`react-native-segment-io`](https://github.com/negativetwelve/react-native-segment-io) | [![npm](https://img.shields.io/npm/v/react-native-segment-io.svg)](https://www.npmjs.com/package/react-native-segment-io) | React Native wrapper for Segment.io |
| [`react-native-ux-cam`](https://github.com/negativetwelve/react-native-ux-cam) | [![npm](https://img.shields.io/npm/v/react-native-ux-cam.svg)](https://www.npmjs.com/package/react-native-ux-cam) | React Native wrapper for uxcam.com |

Please submit a PR to add your package to this list!

## Contributing

If you have any ideas on how this module could be better, [leave an Issue](https://github.com/negativetwelve/react-native-package/issues) or [submit a PR](https://github.com/negativetwelve/react-native-package/pulls).
