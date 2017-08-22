// Modules
import Module from '../Module';


/* eslint-disable no-undef */
describe('Module', () => {
  describe('.check', () => {
    set('name', () => 'react-native-module-check');
    set('homepage', () => {
      return 'https://github.com/negativetwelve/react-native-package';
    });
    set('json', () => ({name, homepage}));
    set('nativeModule', () => undefined);
    set('enabled', () => true);
    set('warn', () => false);
    set('error', () => false);

    action('checkModule', () => Module.check({
      json,
      nativeModule,
      enabled,
      warn,
      error,
    }));

    context('with valid nativeModule', () => {
      set('nativeModule', () => ({}));

      context('with error = true', () => {
        set('error', () => true);

        it('should not throw an error', () => {
          expect(checkModule).not.toThrow();
        });
      });

      context('with warn = true', () => {
        set('warn', () => true);

        it('should not throw a warning', () => {
          expect(checkModule).not.toThrowWarning();
        });
      });
    });

    context('with invalid nativeModule', () => {
      set('nativeModule', () => undefined);

      context('with error = true', () => {
        set('error', () => true);

        it('should throw an error', () => {
          expect(checkModule).toThrow();
        });
      });

      context('with warn = true', () => {
        set('warn', () => true);

        it('should throw a warning', () => {
          expect(checkModule).toThrowWarning();
        });
      });
    });
  });
});
