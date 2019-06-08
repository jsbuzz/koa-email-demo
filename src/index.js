import Koa from 'koa';
import KoaBody from 'koa-body';

import { router } from './endpoints';

const app = new Koa();

app.use(KoaBody());
app.use(router.routes()).use(router.allowedMethods());
app.listen(3000);
