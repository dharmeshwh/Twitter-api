import {
  BaseEntity,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { MessageEntity } from "./message.entity";
import { UserProfileEntity } from "./user.entity";

@Entity("followers_entity")
export class FollowersEntity extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  uuid: string;

  @CreateDateColumn({ name: "created_at" })
  createdAt: Date;

  @UpdateDateColumn({ name: "updated_at" })
  updatedAt: Date;

  @DeleteDateColumn({ name: "deleted_at" })
  deletedAt: Date;

  @Column({ name: "user_uuid", type: "uuid" })
  userUuid: string;

  @Column({ name: "follower_uuid", type: "uuid" })
  followerUuid: string;

  @OneToOne(() => UserProfileEntity, (profile) => profile.follower)
  @JoinColumn({ name: "follower_uuid", referencedColumnName: "uuid" })
  public profile: UserProfileEntity;

  @OneToMany(() => MessageEntity, (message) => message.follower)
  messages: MessageEntity[];
}
