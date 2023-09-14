import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { Tag } from "./tag.entity";

@Entity('courses')
export class Course {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @JoinTable({ name: 'course_tags' })
  @ManyToMany(
    () => Tag,
    (tag) => tag.courses,
    { cascade: true }
  )
  tags: Tag[];
}