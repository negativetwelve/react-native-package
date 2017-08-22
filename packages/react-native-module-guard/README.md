# react-native-module-guard

[![npm](https://img.shields.io/npm/v/react-native-module-guard.svg)](https://www.npmjs.com/package/react-native-module-guard)
[![npm](https://img.shields.io/npm/dt/react-native-module-guard.svg)](https://www.npmjs.com/package/react-native-module-guard)
[![npm](https://img.shields.io/npm/l/react-native-module-guard.svg)](https://github.com/negativetwelve/react-native-package/blob/master/LICENSE)

Guards React Native NativeModules that are not implemented for a particular platform. Edit

## Getting Started

Install `react-native-module-guard` using `yarn`:

```shell
yarn add react-native-module-guard
```

## Motivation

Often times, a NativeModule will only be implemented on one platform, but the code might be used in an application that is enabled on multiple. This module guards the NativeModule so that all methods that are expected to be defined, are defined, they are simply replaced with noops.

Why use this? Say you create a react-native package called `react-native-instabug-sdk` but right now you only have the time (or expertise) to create the iOS implementation. Your application, however, has a single module for reporting bugs which is enabled on iOS, Android, and even Windows. Now, instead of separating the code in your application, you (as the module author), can take care of it for your users and even log a nice warning letting them know a module is not implemented on their specific platform.

Here's another scenario if you aren't sold yet. As an application developer, say you just finished building the inital version of your iOS app. You now want to add Android and maybe even Windows in the mix as well. So, you use `react-native` to create Android and Windows scaffolds that use the same components as your iOS application. What happens when you start it up? You receive a slew of errors from NativeModules that are not defined and causing errors in your app. With `react-native-module-guard`, each of the modules would log a single, readable warning explaining the module you're using isn't enabled. Even better, it'll let you run your app by not erroring on the specific modules that don't have your platform's implementation.

## Usage

This is an example from the `react-native-instabug-sdk` which was the motivation for this package.

```javascript
import {guard} from 'react-native-module-guard';

export default guard({
  json: require('../package.json'),
  nativeModule: NativeModules.RNInstabugSDK,
  enabled: Platform.select({
    ios: true,
  });
  export: (Instabug) => ({
    // All methods for the module will go here, for example:
    startWithToken: (token, event) => Instabug.startWithToken(token, event),
  }),
});
```

Using values from the `package.json`, we can record a consistent warning if we determine this package is not enabled.

> Warning: react-native-instabug-sdk does not currently have an implementation for Android. If you would like to contribute, please submit a PR to https://github.com/negativetwelve/react-native-instabug-sdk.

But, calling a method on Android such as:

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
