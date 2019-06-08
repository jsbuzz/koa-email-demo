import { expect } from 'chai';
import sinon from 'sinon';

import { makeAttempt, clients } from './balancer';

const message = {
  sender: 'sender@bender.dev',
  recipient: 'test@test.com',
  subject: 'Test email',
  body: 'Hello world'
};

const originalClients = clients;

describe('makeAttempt', () => {
  let sandbox;

  beforeEach(() => {
    sandbox = sinon.createSandbox();

    clearClients();

    clients.push({
      send: sandbox.stub().resolves(),
      constructor: { name: 'first' }
    });
    clients.push({
      send: sandbox.stub().resolves(),
      constructor: { name: 'second' }
    });
  });

  afterEach(() => {
    sandbox.restore();

    restoreClients();
  });

  it('should try to send with the first client by default', async () => {
    const attempt = await makeAttempt(message, []);

    expect(clients[0].send.called).to.be.true;
    expect(attempt.client).to.equal('first');
  });

  it('should fall back to second client on second call', async () => {
    const attempt = await makeAttempt(message, [{ client: 'first' }]);

    expect(clients[0].send.called).to.be.false;
    expect(clients[1].send.called).to.be.true;
    expect(attempt.client).to.equal('second');
  });

  it('should catch any error and return a failed attempt with the right client', async () => {
    const error = 'some error';

    clients[0].send.rejects(error);

    const attempt = await makeAttempt(message, []);

    expect(attempt.client).to.equal('first');
    expect(attempt.success).to.be.false;
  });
});

function clearClients() {
  while (clients.length) {
    clients.pop();
  }
}

function restoreClients() {
  clearClients();
  originalClients.forEach(client => clients.push(client));
}
