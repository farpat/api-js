[![Build Status](https://travis-ci.org/farpat/api-js.svg?branch=master)](https://travis-ci.org/farpat/api-js)

# Installation
`npm i @farpat/api`


# Use

You can use verb " POST, GET PUT, PATCH and DELETE ". Here are some examples of use :

```javascript
import Requestor from "@farpat/api";

http = Requestor.newRequest();

http.get('/path/to/resource')
    .then()
    .catch();

// and " post, put, patch, delete " verbs;
```