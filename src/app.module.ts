import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReportModule } from './report/report.module.js';
import { TaskModule } from './task/task.module.js';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: process.env.DATABASE as 'postgres',
      url: process.env.DATABASE_URL,
      autoLoadEntities: true,
      synchronize: false,
    }),
    TaskModule,
    ReportModule,
  ],
})
export class AppModule {}
