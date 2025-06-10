import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './auth.dto';

@Controller('auth') // <-- Asegúrate de que esto sea 'auth'
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup') // <-- Y esto sea 'signup'
  signup(@Body() dto: AuthDto) {
    return this.authService.signup(dto);
  }

  @Post('login')
  login(@Body() dto: AuthDto) {
    return this.authService.login(dto);
  }
}
