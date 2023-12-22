import {
  BaseEntity,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  Index,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity("user_profile_entity")
export class UserProfileEntity extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  uuid: string;

  @CreateDateColumn({ name: "created_at" })
  createdAt: Date;

  @UpdateDateColumn({ name: "updated_at" })
  updatedAt: Date;

  @DeleteDateColumn({ name: "deleted_at" })
  deletedAt: Date;

  @Column({
    name: "first_name",
    type: "varchar",
    length: 36,
  })
  firstname: string;

  @Column({
    name: "last_name",
    type: "varchar",
    length: 36,
  })
  lastName: string;

  @Index({ unique: true })
  @Column({
    name: "user_name",
    type: "varchar",
    length: 36,
  })
  username: string;

  @Index({ unique: true })
  @Column({
    name: "email",
    length: 48,
    type: "varchar",
  })
  email: string;

  @Column({
    name: "password",
    type: "varchar",
    length: 100,
  })
  password: string;
}
