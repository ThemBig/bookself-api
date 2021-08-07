import { BaseEntity, Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class Book extends BaseEntity {
  @PrimaryColumn({
    type: 'varchar',
    length: 16,
  })
  id: string;

  @Column({
    type: 'varchar',
    length: 50,
    nullable: false,
  })
  name: string;

  @Column({
    type: 'int',
    nullable: false,
  })
  year: number;

  @Column({
    type: 'varchar',
    length: 50,
    nullable: false,
  })
  author: string;

  @Column({
    type: 'varchar',
    length: 255,
    nullable: false,
  })
  summary: string;

  @Column({
    type: 'varchar',
    length: '50',
    nullable: false,
  })
  publisher: string;

  @Column({
    type: 'int',
    nullable: false,
  })
  pageCount: number;

  @Column({
    type: 'int',
    nullable: false,
  })
  readPage: number;

  @Column({
    type: 'boolean',
    nullable: false,
  })
  reading: boolean;

  @Column({
    type: 'boolean',
    nullable: false,
  })
  finished: boolean;

  @Column({
    type: 'timestamp',
    nullable: false,
    default: new Date(),
  })
  insertedAt: Date;

  @Column({
    type: 'timestamp',
    nullable: false,
    default: new Date(),
  })
  updatedAt: Date;
}
