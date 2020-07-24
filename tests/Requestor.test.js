const baseUrl = 'https://jsonplaceholder.typicode.com'

import Requestor from '../'
import HttpRequest from '../src/HttpRequest'
import 'whatwg-fetch'

console.error = function () {} //to hide fail in code

describe('test', function () {
  it('get newRequest()', function () {
    expect(Requestor.newRequest()).toBeInstanceOf(HttpRequest)
  })

  it('get token in page without token', function () {
    Requestor.csrfToken = undefined
    document.head.innerHTML = `<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title></head>`
    expect(Requestor.getCsrfToken()).toBe(null)
  })

  it('get token in page with token', function () {
    Requestor.csrfToken = undefined
    document.head.innerHTML = `<head>
    <meta charset="UTF-8">
    <meta name="csrf-token" content="token">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title></head>`
    expect(Requestor.getCsrfToken()).toBe('token')
  })

  it('fetch good get request', async function () {
    const request = Requestor.newRequest(baseUrl)
    const data = await request.get('/posts/33')
    expect(data.id).toBe(33)
  })

  it('fetch wrong request', async function () {
    const request = Requestor.newRequest(baseUrl + '.fake')
    await expect(request.get('/posts/1')).rejects.toThrow(Error)
  })

  it('fetch good post request', async function () {
    const request = Requestor.newRequest(baseUrl)
    const data = await request.post('/posts', {
      userId: 1,
      title : 'title added',
      body  : 'body'
    })

    expect(data.title).toBe('title added')
  })

  it('fetch good put request', async function () {
    const request = Requestor.newRequest(baseUrl)
    const data = await request.put('/posts/33', {
      userId: 1,
      title : 'title updated',
      body  : 'body'
    })

    expect(data.title).toBe('title updated')
    expect(data.id).toBe(33)
  })

  it('fetch good delete request', async function () {
    const request = Requestor.newRequest(baseUrl)
    const data = await request.delete('/posts/1')
    expect(data).toStrictEqual({})
  })
})
