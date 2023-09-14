import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Patch, Post } from '@nestjs/common';
import { CoursesService } from './courses.service';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';

@Controller('courses')
export class CoursesController {

  constructor(private readonly coursesService: CoursesService) {}

  @Get()
  findAll() {
    return this.coursesService.findAll();
  }

  @Get('/:id')
  findOne(@Param('id') id: string) {
    return this.coursesService.findOne(id);
  }

  @Post()
  @HttpCode(HttpStatus.NO_CONTENT)
  async create(@Body() createCourseDTO: CreateCourseDto) {
    return await this.coursesService.create(createCourseDTO);
  }

  @Patch('/:id')
  update(@Param('id') id: string, @Body() updateCourseDTO: UpdateCourseDto) {
    return this.coursesService.update(id, updateCourseDTO);
  }

  @Delete('/:id')
  remove(@Param('id') id: string, @Body() body) {
    return this.coursesService.remove(id);  
  }
}
