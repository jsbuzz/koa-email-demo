import Koa from 'koa';
import Router from 'koa-router';

const app = new Koa();
const router = new Router();

router.get('/health', ctx => {
  ctx.body = 'OK';
  ctx.status = 200;
});

router.post('/send', ctx => {
  ctx.body = 'OK';
  ctx.status = 200;
});

app.use(router.routes()).use(router.allowedMethods());
app.listen(3000);
