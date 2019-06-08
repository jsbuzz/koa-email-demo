import { expect } from 'chai';
import sinon from 'sinon';

import { Attempt } from './domain';
import * as balancer from './balancer';
import { sendMessage, MAX_RETRIES, DEFAULT_SENDER } from './sendMessage';

const message = {
  sender: 'sender@bender.dev',
  recipient: 'test@test.com',
  subject: 'Test email',
  body: 'Hello world'
};

describe('sendMessage', () => {
  let sandbox;
  let makeAttemptStub;

  beforeEach(() => {
    sandbox = sinon.createSandbox();

    makeAttemptStub = sandbox.stub(balancer, 'makeAttempt');
    makeAttemptStub.resolves(new Attempt());
  });

  afterEach(() => {
    sandbox.restore();
  });

  it('should send message with the right parameters', async () => {
    await sendMessage(message);

    expect(makeAttemptStub.calledWith(message, [])).to.be.true;
  });

  it('should add default sender if not defined', async () => {
    await sendMessage({
      ...message,
      sender: undefined
    });

    expect(
      makeAttemptStub.calledWith({
        ...message,
        sender: DEFAULT_SENDER
      })
    ).to.be.true;
  });

  describe('WHEN sending was not successful', () => {
    const failedAttempt = new Attempt(message, 'some client', 'some error');
    beforeEach(() => {
      makeAttemptStub.onFirstCall().resolves(failedAttempt);
    });

    it('should send message again with the right parameters', async () => {
      await sendMessage(message);

      expect(makeAttemptStub.calledWith(message, [failedAttempt])).to.be.true;
    });

    describe('AND message cannot be sent', () => {
      const failedAttempt = new Attempt(message, 'some client', 'some error');
      beforeEach(() => {
        makeAttemptStub.resolves(failedAttempt);
      });

      it('should return with error', async () => {
        const result = await sendMessage(message);

        expect(makeAttemptStub.callCount).to.equal(MAX_RETRIES);
        expect(result.success).to.be.false;
      });
    });
  });
});
