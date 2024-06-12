import { Controller, Get, Post, Body, Put, Delete, Param, ValidationPipe } from '@nestjs/common';
import { ProjectService } from './project.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { Project } from './project.schema';
import { EncryptionService } from 'src/utils/encryption.service';


@Controller('projects')
export class ProjectController {
  constructor(
    private readonly projectService: ProjectService,
    private readonly encryptionService: EncryptionService, // Inject EncryptionService
  ) { }

  // @Post()
  // async create(@Body('data') encryptedData: string): Promise<Project> {
  //   const decryptedData: CreateProjectDto = JSON.parse(this.encryptionService.decryptData(encryptedData));
  //   return this.projectService.create(decryptedData);
  // }

  @Post()
  async create(@Body('data', new ValidationPipe()) encryptedData: string): Promise<Project> {
    // console.log(encryptedData)
    const decryptedData = JSON.parse(this.encryptionService.decryptData(encryptedData));
    // console.log(decryptedData)
    const createProjectDto = new CreateProjectDto();
    Object.assign(createProjectDto, decryptedData);
    return this.projectService.create(createProjectDto);
  }


  @Get()
  async findAll(): Promise<string[]> {
    const projects = await this.projectService.findAll();
    return projects.map(project => this.encryptionService.encryptData(JSON.stringify(project)));
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body('data') encryptedData: string): Promise<Project> {
    const decryptedData = JSON.parse(this.encryptionService.decryptData(encryptedData));
    return this.projectService.update(id, decryptedData);
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<Project> {
    return this.projectService.delete(id);
  }
}
