/**
 * @file index
 * @author Jim Bulkowski <jim.b@paperelectron.com>
 * @project pomegranate-elasticsearch
 * @license MIT {@link http://opensource.org/licenses/MIT}
 */

'use strict';
let merge = require('lodash.merge')
let elasticsearch = require('elasticsearch')

exports.options = {
  apiVersion: '6.2',
  hosts: [
    'localhost:9200'
  ],
  additionalOptions: {}
}

exports.metadata = {
  name: 'ElasticSearch',
  type: 'service',
  param: 'ElasticSearch',
  depends: [],
  provides: []
}

exports.plugin = {
  load: function(inject, loaded) {
    let baseConfig = {
      hosts: this.options.hosts,
      apiVersion: this.options.apiVersion
    }

    let config = merge(baseConfig, this.options.additionalOptions)
    let client = new elasticsearch(config)

    loaded(null, client)
  },
  start: function(done) {
    done()
  },
  stop: function(done) {
    done()
  }
}