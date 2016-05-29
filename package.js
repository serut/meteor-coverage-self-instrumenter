Package.describe({
  name: 'lmieulet:meteor-coverage-self-instrumenter',
  version: '1.0.0',
  summary: 'This package adds coverage to lmieulet:meteor-coverage server code',
  git: 'https://github.com/serut/meteor-coverage-self-instrumenter',
  documentation: null

});

Npm.depends({
  "istanbul-api": "1.0.0-alpha.13"
});


Package.onUse(function(api) {
  api.versionsFrom('1.3.2.4');
  api.use('ecmascript');
  api.mainModule('meteor-coverage-self-instrumenter.js', 'server');
});
