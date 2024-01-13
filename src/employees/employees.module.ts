import { DatabaseModule } from 'src/database/database.module';
import { EmployeesController } from './employees.controller';
import { EmployeesService } from './employees.service';
import { Module } from '@nestjs/common';

@Module({
  imports: [DatabaseModule],
  controllers: [EmployeesController],
  providers: [EmployeesService],
})
export class EmployeesModule {}
