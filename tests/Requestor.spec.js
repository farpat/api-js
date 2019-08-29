import 'whatwg-fetch';
import fs from "fs";
import path from "path";
const html = fs.readFileSync(path.resolve(__dirname, './index.html'), 'utf8');
const baseUrl = 'https://jsonplaceholder.typicode.com';

import Requestor from "../index";
import Http from "../src/Http";

console.error = function () { }; //to hide fail in code

jest.dontMock('fs');

describe('test', function () {
  beforeEach(function () {
    document.documentElement.innerHTML = html.toString();
  });

  afterEach(function () {
    //restore the origin func after test
    jest.resetModules();
  });

  it('get newRequest()', function () {
    expect(Requestor.newRequest()).toBeInstanceOf(Http);
  })

  it('get token', function () {
    expect(Requestor.getCsrfToken()).toBe('token');
  });

  it('fetch good get request', async function () {
    const request = Requestor.newRequest(baseUrl);
    const data = await request.get('/posts/1');
    expect(data.id).toBe(1);
  });

  it('fetch wrong request', async function () {
    const request = Requestor.newRequest(baseUrl + '.fake');
    await expect(request.get('/posts/1')).rejects.toThrow(Error);
  });

  it('fetch good post request', async function () {
    const request = Requestor.newRequest(baseUrl);
    const data = await request.post('/posts', {
      userId: 1,
      title: 'title',
      body: 'body'
    });

    expect(data.title).toBe('title');
  });

  it('fetch good put request', async function () {
    const request = Requestor.newRequest(baseUrl);
    const data = await request.put('/posts/1', {
      userId: 1,
      title: 'title',
      body: 'body'
    });

    expect(data.title).toBe('title');
    expect(data.id).toBe(1);
  });

  it('fetch good delete request', async function () {
    const request = Requestor.newRequest(baseUrl);
    const data = await request.delete('/posts/1');
    expect(data).toStrictEqual({});
  });
});