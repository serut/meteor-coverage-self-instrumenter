Package.describe({
  name: 'lmieulet:meteor-coverage-self-instrumenter',
  version: '4.0.0',
  summary: 'This package adds coverage to lmieulet:meteor-coverage server code',
  git: 'https://github.com/serut/meteor-coverage-self-instrumenter',
  documentation: null

});

Npm.depends({
  'istanbul-lib-instrument': '1.10.0',
  'istanbul-lib-hook': '1.2.0'
});


Package.onUse(function(api) {
  api.versionsFrom('1.6.1');
  api.use('ecmascript');
  api.mainModule('meteor-coverage-self-instrumenter.js', 'server');
});
