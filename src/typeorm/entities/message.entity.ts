import {
  BaseEntity,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { FollowersEntity } from "./followers.entity";
import { UserProfileEntity } from "./user.entity";

@Entity("message_entity")
export class MessageEntity extends BaseEntity {
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

  @Column({ name: "content" })
  content: string;

  @ManyToOne(() => UserProfileEntity, (userProfile) => userProfile.messages)
  @JoinColumn({ name: "user_uuid", referencedColumnName: "uuid" })
  public userProfile: UserProfileEntity; // Define the many-to-one relationship

  @ManyToOne(() => FollowersEntity, (userProfile) => userProfile.messages)
  @JoinColumn({ name: "user_uuid", referencedColumnName: "followerUuid" })
  public follower: FollowersEntity; // Define the many-to-one relationship
}
