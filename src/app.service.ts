import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(testId: string): Record<string, unknown> {
    return {message : `Hello ${testId}!`};
  }
}
