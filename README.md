[![Build Status](https://travis-ci.org/farpat/api-js.svg?branch=master)](https://travis-ci.org/farpat/api-js)

**Warning: This library is only used in front**

# Installation
`npm i @farpat/api`


# Use

You can use verb " POST, GET PUT, PATCH and DELETE ". Here are some examples of use :

```javascript
import Requestor from "@farpat/api";

http = Requestor.newRequest('base-url or null');

http.get('/path/to/resource')
    .then()
    .catch();

// and " post, put, patch, delete " verbs;
```