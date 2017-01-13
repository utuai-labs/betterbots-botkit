import { uTu } from '../src/main';

describe('uTu Client', function() {

  beforeEach(function () {
    this.client = new uTu("abc123", {
      platform: 'SLACK',
      appId: "abc123",
    });
  });

  describe('set config from constructor ', () => {
    it('should set the global conifg', function() {
      expect(this.client.config.platform).toBe('SLACK');
      expect(this.client.config.appId).toBe('abc123');
    });
  })

  describe('setConfig', () => {
    it('should set the global conifg', function() {
      this.client.setConfig({
        platform: 'SLACK',
        appId: "abc123",
      });

      expect(this.client.config.platform).toBe('SLACK');
      expect(this.client.config.appId).toBe('abc123');
    });
  })

  describe('withContext', () => {
    it('should set the context to a new client', function() {

      const ctx = this.client.withContext({
        platformId: "abc",
        sessionId: "abc123",
      });

      expect(this.client.config.platform).toBe('SLACK');
      expect(this.client.config.appId).toBe('abc123');
      expect(this.client.config.platformId).toBeUndefined();
      expect(this.client.config.sessionId).toBeUndefined();
      expect(ctx.config.platformId).toBe('abc');
      expect(ctx.config.sessionId).toBe('abc123');

    });

    describe('setValues', () => {
      it('should set the values of the new client', function() {
        const ctx = this.client.withContext({
          platformId: "abc",
          sessionId: "abc123",
        });

        ctx.setValues({
          firstName: 'john',
          lastName: 'doe',
        });

        expect(ctx.values.firstName).toBe('john');
        expect(ctx.values.lastName).toBe('doe');
      });

      it('should throw error if not context', function() {
        expect(() => {
          this.client.setValues({ firstName: "patrick" });
        }).toThrow();
      });
    });

    describe('setValue', () => {
      it('should set a value property on the client', function() {
        const ctx = this.client.withContext({
          platformId: "abc",
          sessionId: "abc123",
        });

        ctx.setValue('firstName', 'patrick');

        expect(ctx.values.firstName).toBe('patrick');
      });

      it('should throw error if not context', function() {
        expect(() => {
          this.client.setValue('firstName', 'patrick');
        }).toThrow();
      });
    });

    describe('getRequestObject', () => {
      it('should set a value property on the client', function() {
        const ctx = this.client.withContext({
          platformId: "abc",
          sessionId: "abc123",
        });

        ctx.setValue('firstName', 'patrick');

        const req = ctx.getRequestObject();

        expect(req.platform).toBe('SLACK');
        expect(req.appId).toBe('abc123');
        expect(req.values.firstName).toBe('patrick');
        expect(req.platformId).toBe('abc');
        expect(req.sessionId).toBe('abc123');
      });
    });
  })
});
