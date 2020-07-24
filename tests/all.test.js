import 'whatwg-fetch'
import { getCsrfToken, jsonGet, jsonDelete, jsonPatch, jsonPost, jsonPut } from '../index'

const baseUrl = 'https://jsonplaceholder.typicode.com'
console.error = function () {} //to hide fail in code

describe('test', function () {
  it('get token in page with token', function () {
    window._csrfToken = undefined

    document.head.innerHTML = `<head>
    <meta charset="UTF-8">
    <meta name="csrf-token" content="token">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title></head>`
    expect(getCsrfToken()).toBe('token')
  })

  it('get token in page without token', function () {
    window._csrfToken = undefined

    document.head.innerHTML = `<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title></head>`
    expect(getCsrfToken()).toBe(null)
  })

  it('fetch good get request', async function () {
    const data = await jsonGet(`${baseUrl}/posts/33`)
    expect(data.id).toBe(33)
  })

  it('fetch wrong request', async function () {
    await expect(jsonGet(`${baseUrl}.fake/posts/1`)).rejects.toThrow(Error)
  })

  it('fetch good post request', async function () {
    const data = await jsonPost(`${baseUrl}/posts`, {
      userId: 1,
      title : 'title added',
      body  : 'body'
    })

    expect(data.title).toBe('title added')
  })

  it('fetch good put request', async function () {
    const data = await jsonPut(`${baseUrl}/posts/33`, {
      userId: 1,
      title : 'title updated',
      body  : 'body'
    })

    expect(data.title).toBe('title updated')
    expect(data.id).toBe(33)
  })

  it('fetch good patch request', async function () {
    const data = await jsonPatch(`${baseUrl}/posts/33`, {
      title: 'title updated',
    })

    expect(data.title).toBe('title updated')
    expect(data.id).toBe(33)
  })

  it('fetch good delete request', async function () {
    const data = await jsonDelete(`${baseUrl}/posts/1`)
    expect(data).toStrictEqual({})
  })
})
