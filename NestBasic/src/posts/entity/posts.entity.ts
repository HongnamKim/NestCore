import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { UsersModel } from '../../users/entity/users.entity';
import { BaseModel } from '../../common/entity/base.entity';
import { IsString } from 'class-validator';
import { stringValidationMessage } from '../../common/validation-message/string-validation.message';
import { ImageModel } from '../../common/entity/image.entity';
import { CommentsModel } from '../comments/entity/comments.entity';

@Entity()
export class PostsModel extends BaseModel {
  //@Column()
  //author: string;

  // 1) UserModel 과 연동한다 Foreign key
  // 2) null 이 될 수 없다.
  @ManyToOne(() => UsersModel, (user) => user.posts, {
    nullable: false,
  })
  author: UsersModel;

  @Column()
  @IsString({
    message: stringValidationMessage,
  })
  title: string;

  @Column()
  @IsString({
    message: stringValidationMessage,
  })
  content: string;

  /*@Column({ nullable: true })
  @Transform((req) => {
    return req.value && `/${join(POST_PUBLIC_IMAGE_PATH, req.value)}`;
  })
  image?: string;*/

  @OneToMany(() => ImageModel, (image) => image.post)
  images: ImageModel[];

  @Column()
  likeCount: number;

  @Column()
  commentCount: number;

  @OneToMany(() => CommentsModel, (comment) => comment.post)
  comments: CommentsModel[];
}
