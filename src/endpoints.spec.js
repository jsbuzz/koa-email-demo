import { expect } from 'chai';
import sinon from 'sinon';

import mockContext from './helpers/mockContext';
import { router } from './endpoints';

import * as messages from './sendMessage';

describe('endpoints', () => {
  const message = {
    recipient: 'whybuzz@gmail.com',
    subject: 'Test email again',
    body: 'Yaaay and hello world',
  };

  const successfulAttempt = {
    message,
    client: 'TestClient',
    success: true,
  };

  let sandbox;
  let routes;
  let makeRequest;
  let sendMessageStub;

  beforeEach(() => {
    sandbox = sinon.createSandbox();

    routes = router.routes();

    makeRequest = async (body, url = `/send`) => {
      const ctx = mockContext({
        body,
        url,
        method: 'POST',
      });

      await routes(ctx);

      return ctx;
    };

    sendMessageStub = sandbox.stub(messages, 'sendMessage');
    sendMessageStub.resolves(successfulAttempt);
  });

  afterEach(() => {
    sandbox.restore();
  });

  describe('/send', () => {
    describe('WHEN payload is invalid', () => {
      it('should return 400', async () => {
        const { body, status } = await makeRequest({});

        expect(status).to.equal(400);
        expect(body.error).to.exist;
      });
    });

    describe('WHEN payload is valid', () => {
      it('should call sendMessage with the right parameters', async () => {
        await makeRequest(message);

        expect(sendMessageStub.calledWith(message)).to.be.true;
      });

      describe('AND sendMessage is successful', () => {
        it('should return 200', async () => {
          const { body, status } = await makeRequest(message);

          expect(status).to.equal(200);
          expect(body.error).to.not.exist;
        });
      });

      describe('AND sendMessage is unsuccessful', () => {
        it('should return 500 error if sendMessage throws', async () => {
          const error = new Error('something went wrong');
          sendMessageStub.rejects(error);

          const { body, status } = await makeRequest(message);

          expect(status).to.equal(500);
          expect(body.error).to.equal(error.message);
        });
      });
    });
  });
});
