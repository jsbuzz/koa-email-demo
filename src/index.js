import Koa from 'koa';
import KoaBody from 'koa-body';
import Router from 'koa-router';
import Joi from 'joi';

const app = new Koa();
const router = new Router();

const messageSchema = Joi.object().keys({
  sender: Joi.string(),
  recipient: Joi.string().required(),
  subject: Joi.string().required(),
  body: Joi.string().required()
});

router.get('/health', ctx => {
  ctx.body = 'OK';
  ctx.status = 200;
});

router.post('/send', ctx => {
  const schemaResult = messageSchema.validate(ctx.request.body, {
    stripUnknown: true
  });

  if (schemaResult.error) {
    const { details } = schemaResult.error;
    ctx.body = {
      error: details.map(({ message }) => message)
    };
    ctx.status = 400;
    return;
  }

  const message = schemaResult.value;

  ctx.body = message;
  ctx.status = 200;
});

app.use(KoaBody());
app.use(router.routes()).use(router.allowedMethods());
app.listen(3000);
