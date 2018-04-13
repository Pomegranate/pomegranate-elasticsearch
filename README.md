## Pomegranate-Elasticsearch

### Install

```shell

yarn add pomegranate-elasticsearch

```

### Options

```javascript

exports.options = {
  apiVersion: '6.2',
  hosts: [
    'localhost:9200'
  ],
  additionalOptions: {}
}

```

### Usage

pomegranate-elasticsearch adds `ElasticSearch` to the pomegranate plugin injector. It has no dependencies.