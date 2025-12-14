import { UserJwtDto } from 'src/auth/dto/user-jwt.dto';

declare global {
  namespace Express {
    interface Request {
      user?: UserJwtDto;
    }
  }
}
