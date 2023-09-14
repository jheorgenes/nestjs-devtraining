import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { Course } from './course.entity';

@Entity('tags')
export class Tag {

  @PrimaryGeneratedColumn()
  id: Number;

  @Column()
  name: String;

  @ManyToMany(
    () => Course,
    (course) => course.tags
  )
  courses: Course[];
}
