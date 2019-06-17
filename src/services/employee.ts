import { Service, Inject } from 'typedi';
import MailerService from './mailer';
import { IEmployee, IEmployeeInputDTO } from '../interfaces/IEmployee';

@Service()
export default class EmployeeService {
  constructor(
    @Inject('employeeModel') private employeeModel,
    private mailer: MailerService,
    @Inject('logger') private logger,
  ) {}

  public async Register(employeeInputDTO: IEmployeeInputDTO): Promise<{ employee: IEmployee }> {
    try {
      this.logger.silly('Creating employee db record');
      const employeeRecord = await this.employeeModel.create({ ...employeeInputDTO });

      if (!employeeRecord) {
        throw new Error('Employee cannot be created');
      }

      this.logger.silly('Sending welcome email');
      await this.mailer.SendWelcomeEmail(employeeRecord);

      const employee = employeeRecord.toObject();

      return { employee };
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }

  public async Update(id: String, employeeInputDTO: IEmployeeInputDTO): Promise<{ employee: IEmployee }> {
    try {
      this.logger.silly('Updating employee db record');
      const employee = await this.employeeModel.findById(id);

      if (!employee) {
        throw new Error('Employee cannot be found');
      }

      await employee.update({ ...employeeInputDTO });
      const employeeUpdate = employee.toObject();

      return { employee: employeeUpdate };
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }

  public async GetAll(): Promise<[{ employee: IEmployee }]> {
    try {
      this.logger.silly('Get all employees');
      const employees = await this.employeeModel.find();

      if (employees.length < 1) {
        throw new Error('Employees cannot be founded');
      }

      return employees;
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }

  public async Get(id: String): Promise<{ employee: IEmployee }> {
    try {
      this.logger.silly('Get one employee');
      const employee = await this.employeeModel.findById(id);

      if (!employee) {
        throw new Error('Employee cannot be founded');
      }

      return employee;
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }
}
