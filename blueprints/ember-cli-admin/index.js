var fs = require('fs');
var path = require('path');
var renameFile = require('ember-cli-admin/lib/proccess-text-content').renameFile;

module.exports = {
  normalizeEntityName: function() {},

  afterInstall: function() {
    renameFile.bind(this)('app/styles/app.css', 'app/styles/app.scss');
    this.addBowerPackagesToProject([
      {name: "bootstrap-sass-official", target: "3.2.0"},
      {name: "typeahead.js", target: "0.10.5"},
      {name: "jquery-ui-sortable", target: "git://github.com/ryantbrown/jquery-ui-sortable.git"},
      {name: "jquery-ui-touch-punch", target: "git://github.com/cbier/bower-jquery-ui-touch-punch.git"}
    ]);

    return this.addPackagesToProject([
      {name: "ember-cli-map", target: "0.2.2"},
      {name: "ember-cli-bootstrap-datepicker", target: "0.4.0"},
      {name: "broccoli-merge-trees", target: "0.1.4"},
      {name: "broccoli-static-compiler", target: "0.1.4"},
      {name: "ember-cli-sass", target: "^4.0.0"}
    ]);
  }
};
