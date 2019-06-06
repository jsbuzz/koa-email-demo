import SendGrid from '@sendgrid/mail';

import { MessageSenderClient } from '../domain';

SendGrid.setApiKey('tt' + process.env.SENDGRID_API_KEY);

export class SendGridClient extends MessageSenderClient {
  send(message) {
    const { sender, recipient, subject, body } = message;
    return SendGrid.send({
      subject,
      to: recipient,
      from: sender,
      text: body,
      html: body
    });
  }
}
