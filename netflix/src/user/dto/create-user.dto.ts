import { PickType } from '@nestjs/mapped-types';
import { Role } from '../entities/user.entity';

export class CreateUserDto {
  email: string;
  password: string;
  role: Role;
}
