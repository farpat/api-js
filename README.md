[![Build Status](https://travis-ci.org/farpat/api-js.svg?branch=master)](https://travis-ci.org/farpat/api-js)

**Warning: This library is only used in front**

# Installation
`npm install @farpat/api`


# Use
You can use verb " POST, GET PUT, PATCH and DELETE ". Here are some examples of use :

```javascript
import Requestor from "@farpat/api";

const baseUrl = 'http://my-domain.com' // or null (the url is equals to the current domain)
Requestor.newRequest(baseUrl).get('/path/to/resource', {query_string:'value'}, {header:'value'})
  .then()
  .catch()

Requestor.newRequest().post('/path/to/resource', {key: 'value'}, {header: 'value'})
  .then()
  .catch()

// and " post, put, patch, delete " verbs;
```