import Joi from 'joi';
import Router from 'koa-router';

import { sendMessage } from './sendMessage';

export const router = new Router();

export const messageSchema = Joi.object().keys({
  sender: Joi.string().email(),
  recipient: Joi.string()
    .email()
    .required(),
  subject: Joi.string().required(),
  body: Joi.string().required(),
});

router.get('/health', ctx => {
  // if there were any databases or resources we should check them here

  ctx.body = 'OK';
  ctx.status = 200;
});

router.post('/send', async ctx => {
  const schemaResult = messageSchema.validate(ctx.request.body, {
    stripUnknown: true,
  });

  if (schemaResult.error) {
    const { details } = schemaResult.error;
    ctx.body = {
      error: details.map(({ message }) => message),
    };
    ctx.status = 400;
    return;
  }

  const message = schemaResult.value;

  try {
    const attempt = await sendMessage(message);

    if (!attempt.success) {
      ctx.body = attempt;
      ctx.status = 500;
      return;
    }

    ctx.body = attempt;
    ctx.status = 200;
  } catch (error) {
    ctx.body = { error: error.message };
    ctx.status = 500;
  }
});
