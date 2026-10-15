import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeormLabModule } from './typeorm-lab/typeorm-lab.module.js';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: process.env.DATABASE as 'postgres',
      url: process.env.DATABASE_URL,
      autoLoadEntities: true,
      synchronize: false,
    }),
    TypeormLabModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
