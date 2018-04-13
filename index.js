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
  log: [{
    type: 'stdio',
    levels: ['error']
  }],
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
      apiVersion: this.options.apiVersion,
      log: this.options.log
    }
    let loadObj = this.loadObj = {}

    let config = merge(baseConfig, this.options.additionalOptions)
    let client = new elasticsearch.Client(config)
    loadObj.Client = client
    loadObj.meta = {}

    loaded(null, loadObj)
  },
  start: function(done) {
    this.loadObj.Client.ping({requestTimeout: 1000})
      .then(() => {
        this.loadObj.meta.available = true
        done()
      })
      .catch((err) => {
        this.loadObj.meta.available = true
        this.Logger.error("ElasticSearch is unavailable.")
        done()
      })
    done()
  },
  stop: function(done) {
    done()
  }
}