import { Controller, Get, HttpCode, Param, Query, Res } from '@nestjs/common';
import { AppService } from './app.service';
import { query, Response } from 'express';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @HttpCode(200)
  getHello(@Res() res: Response, @Query('TEST_ID') testId: string) {
    return res.json(this.appService.getHello(testId));
  }
} 
