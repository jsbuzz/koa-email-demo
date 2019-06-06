# Initial Design

Simple email sender with primary and secondary email client. Using Koa for routing and as http server and backpack for building.

## Endpoints

**GET /health**
Returns 200 if service is up and running.

**POST /send**
Body should be json format for the following specification:
{
sender: <EmailAddress | null>,
recipient: <EmailAddress>,
subject: <String>,
body: <String | HTML>
}

**Success**
Returns 200 OK

**Bad Request**
Returns 400 and an error message

**Server error**
Returns 500 and an error message

## Domain

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
  error;
  success = false;
}
```

```
class EmailSenderClient {
  send(message, attempts = []) {
    return new Attempt(message);
  }
}
```
