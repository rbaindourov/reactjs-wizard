Package.describe({
  name: 'winwinhost:reactjs-wizard',
  version: '0.0.5',
  summary: 'ReactJS based Wizard component for meteor projects using React and SCSS.',
  git: 'https://github.com/rbaindourov/reactjs-wizard',
  documentation: 'README.md'
});

Package.onUse(function(api) {
  api.versionsFrom("1.1.0.3");
  api.use('react@0.1.0');
  api.use('mongo', ['client', 'server']);
  api.use('fourseven:scss@3.2.0');
  api.addFiles('reactjs-wizard-fields.jsx');
  api.addFiles('reactjs-wizard.jsx');
  api.addFiles('reactjs-wizard.scss');
  api.export('Wizard');
});

Package.onTest(function(api) {
  api.use('tinytest');
  api.use('winwinhost:reactjs-wizard');
  api.addFiles('reactjs-wizard-tests.js');
});
