import { Injectable, NotFoundException } from '@nestjs/common';
import { Course } from './entities/course.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Equal, Repository } from 'typeorm';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { Tag } from './entities/tag.entity';

@Injectable()
export class CoursesService {

  constructor(
    @InjectRepository(Course)
    private readonly courseRepository: Repository<Course>,
    @InjectRepository(Tag)
    private readonly tagRepository: Repository<Tag>
  ) {}

  async findAll() {
    return this.courseRepository.find({
      relations: ['tags']
    });
  }

  async findOne(id: string) {
    const course = await this.courseRepository.findOne({
      where: { id },
      relations: ['tags']
    });

    if(!course) {
      throw new NotFoundException(`Course ID ${id} not found`);
    }

    return course;
  }

  async create(createCourseDto: CreateCourseDto) {
    const tags = await Promise.all(
      createCourseDto.tags.map((name) => this.preLoadTagByName(name))
    );

    const course = this.courseRepository.create({
      ...createCourseDto,
      tags
    });

    return this.courseRepository.save(course);
  }

  async update(id: string, updateCourseDto: UpdateCourseDto) {
    const tags = updateCourseDto.tags && (//Valida se tem tags e se tiver, também validará se existe as tags pelo nome
      await Promise.all(
        updateCourseDto.tags.map(name => this.preLoadTagByName(name))
      )
    )

    const course = await this.courseRepository.preload({
      id,
      ...updateCourseDto,
      tags
    });

    if(!course) {
      throw new NotFoundException(`Course ID ${id} not found`)
    }

    return this.courseRepository.save(course);
  }

  async remove(id: string) {
    const course = await this.courseRepository.findOne({
      where: { id }
    });

    if(!course) {
      throw new NotFoundException(`Course ID ${id} not found`);
    }

    return this.courseRepository.remove(course);
  }

  private async preLoadTagByName(name: String): Promise<Tag> {
    const tag = await this.tagRepository.findOne({
      where: {
        name:  Equal<String>(name),
      },
    });

    if(tag) {
      return tag;
    }

    return this.tagRepository.create({ name });
  }
}
