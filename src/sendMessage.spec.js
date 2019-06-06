import mocha from 'mocha';
import { expect } from 'chai';
import sinon from 'sinon';

import { Attempt } from './domain';
import * as balancer from './balancer';
import { sendMessage, DefaultSender } from './sendMessage';

const message = {
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

  it('should add default sender if not defined', async () => {
    await sendMessage(message);

    expect(
      makeAttemptStub.calledWith({
        ...message,
        sender: DefaultSender
      })
    );
  });
});
