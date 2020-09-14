[![Build Status](https://travis-ci.org/farpat/api-js.svg?branch=master)](https://travis-ci.org/farpat/api-js)

**Warning: This library is only used in front**

# Installation
`npm install @farpat/api`


# Use
You can use verb " GET, POST, PUT, PATCH and DELETE ". Here are some examples of use :

```javascript
import {jsonGet, jsonPost} from "@farpat/api";

jsonGet(
  '/path/to/resource', 
  {query_string:'value'},
  {header:'value'}
)
  .then()
  .catch()

jsonPost(
  '/path/to/resource', 
  {key: 'value'}, //or FormData 
  {header: 'value'}
)
  .then()
  .catch()

// and " put, patch, delete " verbs;
```
