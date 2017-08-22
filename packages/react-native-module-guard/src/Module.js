// Libraries
import {Platform} from 'react-native';
import warning from 'warning';


const noop = () => {};

/**
 * If a module is `enabled`, that means to use the native method. Otherwise,
 * we return a noop.
 */
const guardMethod = ({isEnabled, method}) => isEnabled ? method : noop;

/**
 * Guards the `Module` if `enabled` is true. A method is guarded by turning it
 * into a noop so that it is not enabled on certain platforms.
 */
const guardModule = ({isEnabled, Module}) => {
  const guard = (SafeModule, [methodName, method]) => {
    if (typeof method === 'object') {
      // If the method is an object, we might have nested functions that we need
      // to guard. Recurse on the nested Module and guard all methods.
      SafeModule[methodName] = guardModule({isEnabled, Module: method});
    } else {
      // Otherwise, we must guard this value (primitive or function).
      SafeModule[methodName] = guardMethod({isEnabled, method});
    }

    return SafeModule;
  };

  return Object.entries(Module).reduce(guard, {});
};

/**
 * Guards an exported module. Options are:
 *
 *   - json:         Required package.json which has `name` and `homepage`.
 *   - nativeModule: The nativeModule that you want to guard.
 *   - enabled:      Set to true if the nativeModule has been implemented for a
 *                   specific platform.
 *   - message:      Custom warning that is logged if the module is not enabled.
 *   - export:       Function that returns the actual exported module. It
 *                   takes in the guarded module and uses the methods.
 *
 */
export const guard = ({
  json,
  nativeModule,
  enabled,
  message,
  export: createExportedModule,
}) => {
  const {name, homepage: repo} = json;

  // `enabled` might be passed in as undefined so we can't use default args.
  const isEnabled = enabled || false;

  warning(
    isEnabled,
    message || `${name} does not currently have an implementation for ` +
    `${Platform.OS}. If you would like to contribute, please submit a PR ` +
    `to ${repo}.`
  );

  // Protects against undefined NativeModules that have constants.
  const NativeModule = nativeModule || {};

  // We now have an object with a bunch of constants (potentially null), and
  // functions that will potentially error when called.
  const ExportedModule = createExportedModule(NativeModule);

  // Now, if `isEnabled` is true, we will use the NativeModule function.
  // Otherwise, we will return a noop for each function.
  const GuardedModule = guardModule({isEnabled, Module: ExportedModule});

  // GuardedModule is just a plain object with methods replaced with noops
  // if `isEnabled` is set to false.
  return GuardedModule;
};
