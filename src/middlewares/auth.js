import { expressjwt as jwt } from 'express-jwt';

const SECRET = process.env.JWT_SECRET || 'secret';

export const auth = jwt({
  secret: SECRET,
  algorithms: ['HS256'],
  requestProperty: 'auth',
});
