import { Module } from '@nestjs/common';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EmployeeModule } from './employee/employee.module';
import { TasksModule } from './tasks/tasks.module';
import { DepartmentModule } from './department/department.module';
import { CompanyModule } from './company/company.module';

@Module({
  imports: [MikroOrmModule.forRoot(), EmployeeModule, TasksModule, DepartmentModule, CompanyModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
