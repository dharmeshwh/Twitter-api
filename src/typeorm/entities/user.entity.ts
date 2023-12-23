import {
  BaseEntity,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  Index,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { FollowersEntity } from "./followers.entity";
import { MessageEntity } from "./message.entity";

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
  firstName: string;

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

  @OneToOne(() => FollowersEntity, (follower) => follower.profile)
  public follower: FollowersEntity;

  @OneToMany(() => MessageEntity, (message) => message.userProfile)
  public messages: MessageEntity[];
}
