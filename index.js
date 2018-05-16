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
  keepAlive: true,
  log: [{
    type: 'stdio',
    levels: ['error']
  }],
  additionalOptions: {}
}

exports.metadata = {
  frameworkVersion: 6,
  name: 'ElasticSearch',
  type: 'service',
  param: 'ElasticSearch'
}

exports.plugin = {
  load: function(Options, Logger) {
    let baseConfig = {
      hosts: Options.hosts,
      apiVersion: Options.apiVersion,
      keepAlive: Options.keepAlive,
      log: Options.log
    }
    let loadObj = {}

    let config = merge(baseConfig, Options.additionalOptions)
    let client = new elasticsearch.Client(config)
    loadObj.Client = client
    loadObj.meta = {}

    return loadObj
  },
  start: function(ElasticSearch, Logger) {
    if(ElasticSearch){

    }
    return ElasticSearch.Client.ping({requestTimeout: 1000})
      .then(() => {
        Logger.log('Connection successful.')
        ElasticSearch.available = true
        return true
      })
      .catch((err) => {
        ElasticSearch.meta.available = false
        Logger.error('ElasticSearch is unavailable.')
        return true
      })
  }
}