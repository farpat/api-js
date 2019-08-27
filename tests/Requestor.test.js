import Requestor from "../index";
import Http from "../src/Http";

test('simple test', () => {
    expect(Requestor.newRequest()).toBeInstanceOf(Http);
  });