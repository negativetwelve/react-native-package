// Libraries
import invariant from 'invariant';
import warning from 'warning';


export const check = ({
  // This is the package.json for the package.
  json,
  nativeModule,
  enabled = false,
  message: customMessage,
  warn = true,
  error = false,
}) => {
  const {name, homepage: repo} = json;
  const message = customMessage || (
    `${name} was not installed correctly. Please follow the instructions ` +
    `in the README: ${repo}#readme.`
  );

  // If the module is defined, then the installation was successful and
  // there's nothing else to do. If the module isn't enabled, then we should
  // also not do anything.
  if (typeof nativeModule !== 'undefined' || !enabled) {
    return;
  } else if (error) {
    invariant(false, message);
  } else if (warn) {
    warning(false, message);
  }
};
