// Libraries
import {check} from 'react-native-module-check';
import {guard} from 'react-native-module-guard';


const createPackage = ({
  // This is the package.json for the module.
  json,
  nativeModule,
  enabled,
  export: createExport,
}) => {
  // `enabled` might be passed in as undefined (from Platform.select) so we
  // can't use default args here.
  const isEnabled = enabled || false;

  // Runs checks to make sure the module is installed correctly if `isEnabled`
  // is set to true.
  check({json, nativeModule, enabled: isEnabled});

  // Returns the guarded, exported module from the input `export` function.
  return guard({
    json,
    nativeModule,
    enabled: isEnabled,
    export: createExport,
  });
};


export default {
  create: createPackage,
};
