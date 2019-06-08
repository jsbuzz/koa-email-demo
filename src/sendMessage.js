import { Attempt } from './domain';
import { makeAttempt } from './balancer';

export const MAX_RETRIES = 3;
export const DEFAULT_SENDER =
  process.env.DEFAULT_SENDER || 'matyas@testing.com';

export async function sendMessage(message) {
  const attempts = [];
  while (attempts.length < MAX_RETRIES) {
    const attempt = await makeAttempt(
      {
        ...message,
        sender: message.sender || DEFAULT_SENDER,
      },
      attempts,
    );

    if (attempt.success) {
      return attempt;
    }

    attempts.push(attempt);
  }

  return new Attempt(message, null, 'Max retries exceeded');
}
