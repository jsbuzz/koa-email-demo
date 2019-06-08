import Stream from 'stream';
import Koa from 'koa';

/**
 * Creates a mock Koa context. This is taken and adapted from the Koa project itself.
 * @param req - any request properties to override
 * @param res - any response properties to override
 * @param app - a Koa application to attach to, otherwise it will create its own
 */
export default (req = {}, res = {}, app = null) => {
  const socket = new Stream.Duplex();
  const newReq = Object.assign(
    { socket, headers: {} },
    Stream.Readable.prototype,
    req,
  );
  const newRes = Object.assign(
    { socket, _headers: {} },
    Stream.Writable.prototype,
    res,
  );
  newReq.socket.remoteAddress = newReq.socket.remoteAddress || '127.0.0.1';
  newRes.getHeader = k => newRes._headers[k.toLowerCase()];
  newRes.setHeader = (k, v) => (newRes._headers[k.toLowerCase()] = v);
  newRes.removeHeader = (k, v) => delete newRes._headers[k.toLowerCase()];

  const newApp = app || new Koa();
  const ctx = newApp.createContext(newReq, newRes);

  // mock bodyparser by just passing raw JSON
  ctx.request.body = req.body;

  return ctx;
};
