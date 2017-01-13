import createEndpoint from '../src/http';

describe('createEndpoint', function() {
  it('should create a function', function() {
    const func = createEndpoint();

    expect(typeof func).toBe('function')
  });
});
