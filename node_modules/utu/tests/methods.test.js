import { uTu } from '../src/main';

const key = '7673f5d1298f4c6596458d8dca5a5968';

describe('Request Calls', () => {

  beforeEach(function () {
    this.client = new uTu(key, {
      platform: "messenger",
      platformId: "abc123",
    });
  });

  describe('user', function() {
    it('should return success', async function() {
      const result = await this.client.user({
        values: {
          firstName: "patrick",
        },
      });
      expect(result.success).toBe(true)
    });
  });

  describe('message', function() {
    it('should return success', async function() {
      const result = await this.client.message({
        values: {
          sessionId: "abc123",
          botMessage: false,
          message: "abc123",
          rawMessage: {},
        },
      });
      expect(result.success).toBe(true)
    });

    it('should return 422 and errors', async function() {
      await this.client.message({
        values: {},
      }).catch((res) => (
        expect(res.status).toBe(422)
      ));
    });
  });

  describe('event', function() {
    it('should return success', async function() {
      const result = await this.client.event("Custom Event", {
        values: {
          foo: "bar",
        },
      });
      expect(result.success).toBe(true)
    });
  });

})
