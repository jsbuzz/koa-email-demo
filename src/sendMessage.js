import { ConsoleClient } from './emailClients/consoleClient';
import { Attempt } from './domain';

const consoleClient = new ConsoleClient();

const clients = [consoleClient];
const MaxRetries = 3;

export async function sendMessage(message) {
  const attempts = [];
  while (attempts.length < MaxRetries) {
    const attempt = await makeAttempt(message, attempts);

    if (attempt.success) {
      return attempt;
    }

    attempts.push(attempt);
  }

  return new Attempt(message, null, 'Max retries exceeded');
}

export async function makeAttempt(message, attempts) {
  return await clients[0].send(message);
  // return new Attempt(message, null, 'Some error');
}
