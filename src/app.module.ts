import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm'
import { AppController } from './app.controller';
import { AppService } from './app.service';
// import config  from '../ormconfig'
import { Employee } from './employee.entity';
import { ContactInfo } from './contact-info-entity';
import { Meeting } from './meeting.entity';
import { Task } from './task.entity';  

@Module({
  imports: [TypeOrmModule.forRoot({
    type: 'sqlite',
    database: 'database',
    entities: ['dist/**/*.entity.js'],
    synchronize: true,
    logging: true,
  }),
  TypeOrmModule.forFeature([Employee,ContactInfo,Meeting,Task])], 
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

