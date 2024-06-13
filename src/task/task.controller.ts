// task.controller.ts
import { Controller, Get, Post, Body, Put, Param, Delete, ValidationPipe, UseGuards, UseFilters } from '@nestjs/common';
import { TaskService } from './task.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { Task } from './task.schema';
import { EncryptionService } from 'src/utils/encryption.service';
import { IpWhitelistGuard } from 'src/middleware/ip-whitelist.middleware';
import { UnauthorizedExceptionFilter } from 'src/filters/unauthorizedException';
// import { IpWhitelistMiddleware } from 'src/middleware/ip-whitelist.middleware';

@Controller('tasks')
@UseFilters(UnauthorizedExceptionFilter)
export class TaskController {
  constructor(
    private readonly taskService: TaskService,
    private readonly encryptionService: EncryptionService, // Inject EncryptionService
  ) { }

  
  @Post()
  @UseGuards(IpWhitelistGuard) // ใช้ guard ที่นี่
  async create(@Body('data', new ValidationPipe()) encryptedData: string): Promise<Task> {
    // console.log(encryptedData)
    const decryptedData = JSON.parse(this.encryptionService.decryptData(encryptedData));
    // console.log(decryptedData)
    const createTaskDto = new CreateTaskDto();
    Object.assign(createTaskDto, decryptedData);
    return this.taskService.create(createTaskDto);
  }

  @Get()
  async findAll(): Promise<string[]> {
    const tasks = await this.taskService.findAll();
    return tasks.map(task => this.encryptionService.encryptData(JSON.stringify(task)));
  }

  @Put(':id')
  @UseGuards(IpWhitelistGuard)
  async update(@Param('id') id: string, @Body('data') encryptedData: string): Promise<Task> {
    const decryptedData = JSON.parse(this.encryptionService.decryptData(encryptedData));
    const updateTaskDto = new CreateTaskDto();
    Object.assign(updateTaskDto, decryptedData);
    return this.taskService.update(id, updateTaskDto);
  }

  @Put(':id/status')
  @UseGuards(IpWhitelistGuard)
  async updateStatus(@Param('id') id: string, @Body('data') encryptedData: string): Promise<Task> {
    const decryptedData = JSON.parse(this.encryptionService.decryptData(encryptedData));
    return this.taskService.updateStatus(id, decryptedData.status);
  }
  
  @Delete(':id')
  @UseGuards(IpWhitelistGuard)
  async delete(@Param('id') id: string): Promise<Task> {
    return this.taskService.delete(id);
  }
}