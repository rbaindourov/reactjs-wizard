Package.describe({
  name: 'winwinhost:reactjs-wizard',
  version: '0.0.1',
  summary: 'Testing meteor package creation process',
  git: '',
  documentation: 'README.md'
});

Package.onUse(function(api) {
  api.versionsFrom('1.1.0.3');
  api.use('react');
  api.use('fourseven:scss');
  api.addFiles('reactjs-wizard.jsx');
  api.addFiles('reactjs-wizard.scss');
  api.export('Wizard');
});

Package.onTest(function(api) {
  api.use('tinytest');
  api.use('winwinhost:reactjs-wizard');
  api.addFiles('reactjs-wizard-tests.js');
});
