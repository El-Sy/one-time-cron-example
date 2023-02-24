import { Injectable, Logger } from '@nestjs/common';
import { CronExpression, SchedulerRegistry } from '@nestjs/schedule';
import { CronJob } from 'cron';
import { ScheduleSingleTaskDto } from './dtos';

@Injectable()
export class AppService {
  private readonly logger = new Logger(AppService.name);
  constructor(private schedulerRegistry: SchedulerRegistry) {}

  scheduleSingleTask(request: ScheduleSingleTaskDto) {
    const executeDate = new Date(request.executeAt);
    const cronName = 'task_' + executeDate.getTime();
    console.log(this.createSpecificDayCronString(executeDate));
    console.log(new Date());
    const job = new CronJob(
      this.createSpecificDayCronString(executeDate),
      () => {
        this.logger.log('cron executed on ' + new Date());
        this.schedulerRegistry.deleteCronJob(cronName);
      },
    );
    this.schedulerRegistry.addCronJob(cronName, job);
    job.start();
  }

  createSpecificDayCronString(date: Date) {
    return `${date.getSeconds()} ${date.getMinutes()} ${date.getHours()} ${date.getDate()} ${date.getMonth()} *`;
  }

  getCrons() {
    const jobs = this.schedulerRegistry.getCronJobs();
    jobs.forEach((value, key) => {
      let next;
      try {
        next = value.nextDates().toJSDate();
      } catch (e) {
        next = 'error: next fire date is in the past!';
      }
      this.logger.log(`job: ${key} -> next: ${next}`);
    });
    return {
      numberOfJobs: jobs.size,
    };
  }
}
