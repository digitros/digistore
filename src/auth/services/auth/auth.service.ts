import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

import { UsersService } from 'src/modules/users/services/users.service';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.usersService.findByEmail(email);
    const isValid = await bcrypt.compare(password, user.password);
    if (user && isValid) {
      const { password, ...result } = user.toObject();
      return result;
    }
    return null;
  }
}
