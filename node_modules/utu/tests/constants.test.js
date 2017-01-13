import { constants } from '../src/main';

describe('constants', () => {
  it('should contain MESSENGER, KIK, ALEXA, SLACK', () => {
    const keys = Object.keys(constants);
    const required = ['MESSENGER', 'KIK', 'ALEXA', 'SLACK'];
    required.map((o) => expect(keys).toContain(o));
  });
});
