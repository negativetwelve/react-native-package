// Modules
import Package from '../Package';


/* eslint-disable no-undef */
describe('Package', () => {
  describe('.create', () => {
    set('name', () => 'react-native-package');
    set('homepage', () => 'https://github.com/negativetwelve/react-native-package');
    set('json', () => ({name, homepage}));
    set('nativeModule', () => undefined);
    set('enabled', () => true);
    set('createExport', () => () => ({
      someConstant: 10,
      testMethod: () => 5,
    }));

    // NOTE(mark): `package` is a reserved word in strict mode.
    set('_package', () => Package.create({
      json,
      nativeModule,
      enabled,
      export: createExport,
    }));

    context('with valid nativeModule', () => {
      set('nativeModule', () => ({}));

      it('should return a valid package', () => {
        expect(_package).toBeDefined();
      });
    });

    context('with invalid nativeModule', () => {
      set('nativeModule', () => undefined);

      it('should return a valid package', () => {
        expect(_package).toBeDefined();
      });
    });
  });
});
