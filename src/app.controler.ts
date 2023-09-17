import { Controller, Get } from '@nestjs/common';

@Controller()
export class MessageController {
  @Get()
  message() {
    const swaggerLink =
      'https://app.swaggerhub.com/apis-docs/MAVIROLERO/relicario/1.0.0';
    return `Bem-vindo à API RelicarioApp , acesse  nossa documentação em: <a href="${swaggerLink}">Relicario.</a>`;
  }
}
