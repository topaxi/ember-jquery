/* eslint-env node */
'use strict'

var path = require('path')
var Funnel = require('broccoli-funnel')
var mergeTrees = require('broccoli-merge-trees')

module.exports = {
  name: 'ember-jquery',

  included: function(app) {
    this._super.included.apply(this, arguments)

    if (process.env.EMBER_CLI_FASTBOOT !== 'true') {
      // see: https://github.com/ember-cli/ember-cli/issues/3718
      while (typeof app.import !== 'function' && app.app) {
        app = app.app
      }

      this.app = app
      this.jqueryOptions = this.getConfig()

      var vendor = this.treePaths.vendor

      app.import(vendor + '/shims/jquery.js', { prepend: true });

      if (this.jqueryOptions.slim) {
        app.import({
          development: vendor + '/jquery/jquery.slim.js',
          production: vendor + '/jquery/jquery.slim.min.js'
        }, { prepend: true })
      }
      else {
        app.import({
          development: vendor + '/jquery/jquery.js',
          production: vendor + '/jquery/jquery.min.js'
        }, { prepend: true })
      }
    }
  },

  getConfig: function() {
    var jqueryOptions = this.app.options.jquery || {}
    var jqueryPath = path.dirname(require.resolve('jquery'))

    var config = Object.assign({ slim: false }, jqueryOptions, {
      path: jqueryPath
    })

    return config
  },

  treeForVendor: function(vendorTree) {
    var trees = []

    if (vendorTree) {
      trees.push(vendorTree)
    }

    trees.push(new Funnel(this.jqueryOptions.path, {
      destDir: 'jquery'
    }))

    return mergeTrees(trees)
  }
}
