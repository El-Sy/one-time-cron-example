import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { ScheduleSingleTaskDto } from './dtos';

@Controller('crons')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post()
  scheduleSingleTask(@Body() body: ScheduleSingleTaskDto) {
    return this.appService.scheduleSingleTask(body);
  }

  @Get()
  listCrons() {
    return this.appService.getCrons();
  }
}
