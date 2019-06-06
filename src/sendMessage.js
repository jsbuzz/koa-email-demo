import { Attempt } from './domain';
import { makeAttempt } from './balancer';

const MaxRetries = 3;
export const DefaultSender =
  process.env.DEFAULT_SENDER || 'matyas.buczko@gmail.com';

export async function sendMessage(message) {
  const attempts = [];
  while (attempts.length < MaxRetries) {
    const attempt = await makeAttempt(
      {
        ...message,
        sender: message.sender || DefaultSender
      },
      attempts
    );

    if (attempt.success) {
      return attempt;
    }

    attempts.push(attempt);
  }

  return new Attempt(message, null, 'Max retries exceeded');
}
