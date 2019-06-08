# Initial Design

Simple email sender with primary and secondary email client. Using Koa for routing and as http server and backpack for building.

Service is designed as a very simple email sender with capacity for multiple clients.

To have a solid basis for improvements I separated the presentation layer, email sending, client balancing and the actual clients.

Going forward I would do the following steps:

- add a config handler like dotenv or similar
- list of active clients should be coming from a separate service/config
- connect to log and an error aggregators for debugging
- create a database for all emails going through or fail (?)
- move email sending to a job queue, like Bull or Google pub-sub

## Potholes

- Joi didn't work with current node version, had to switch to 12.4 - took a while to figure out the error
- Wife coming home from work is very disruptive :)
- mocha, backpack and babel are not really working well together out of the box

## Endpoints

**GET /health**
Returns 200 if service is up and running.

**POST /send**
Body should be json format for the following specification:

```
{
  sender: <EmailAddress | null>,
  recipient: <EmailAddress>,
  subject: <String>,
  body: <String | HTML>
}
```

**Success**
Returns 200 with the successful Attempt. Example:

```
{
  "message": {
    "recipient": "matyas@test.com",
    "subject": "Test email",
    "body": "Hello world",
    "sender": "matyas@testing.com"
  },
  "client": "SendGridClient",
  "success": true
}
```

**Bad Request**
Returns 400 and an error message

**Server error**
Returns 500 and an error message

## Domain

As a thin domain layer I based the implementation on the following classes:

```
class Message {
  sender;
  recipient;
  subject;
  body;
}
```

```
class Attempt {
  message;
  client;
  error;
  success;
}
```

```
class MessageSenderClient {
  async send(message) {}
}
```
