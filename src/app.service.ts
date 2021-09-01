import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ContactInfo } from './contact-info-entity';
import { Employee } from './employee.entity';
import { Meeting } from './meeting.entity';
import { Task } from './task.entity';

@Injectable()
export class AppService {
  constructor( 
    @InjectRepository(Employee) private employeeRepo: Repository<Employee>,
    @InjectRepository(ContactInfo) private contactInfoRepo: Repository<ContactInfo>,
    @InjectRepository(Meeting) private meetingRepo: Repository<Meeting>,
    @InjectRepository(Task) private taskRepo: Repository<Task>,
  ){}

    //seeding db
    async seed(){

      // employee 1 CEO
      const ceo = this.employeeRepo.create({name: "Mr. CEO"})
      await this.employeeRepo.save(ceo)
      
      const ceoContactInfo = this.contactInfoRepo.create({email: "ceo@email.com"})

      ceoContactInfo.employee = ceo
      await this.contactInfoRepo.save(ceoContactInfo)


      // employee 2 Manager
      const manager = this.employeeRepo.create({name: "Khalid", manager: ceo})


      //new task
      const task1 = this.taskRepo.create({name: "Hire People"})
      await this.taskRepo.save(task1)
      const task2 = this.taskRepo.create({name: "Presentation to CEO"})
      await this.taskRepo.save(task2)

      manager.tasks = [task1,task2]



      //new Meeting
      const meeting1 = this.meetingRepo.create({zoomUrl: 'meeting.com'})
      meeting1.attendees = [ceo,manager]

      await this.meetingRepo.save(meeting1)




      
    }

  getHello(): string {
    return 'Hello World!';
  }
}

