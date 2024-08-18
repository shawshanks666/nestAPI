import { Column, Entity, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Cat } from './cat.entity';

export enum Role {
  ADMIN = 'admin',
  USER = 'user',
}

@Entity()
export class Auth {
  @PrimaryGeneratedColumn({
    type: 'bigint',
    name: 'user_id',
  })
  
  id: number;

  @Column({
    nullable: false,
    default: '',
  })
  username: string;

  @Column({
    name: 'email_address',
    nullable: false,
    default: '',
  })
  email: string;

  @Column({
    nullable: false,
    default: '',
  })
  password: string;

  @OneToMany(() => Cat, cat => cat.owner)
  cats: Cat[];


  @Column({ type: 'enum', enum: Role, default: Role.USER })
  role: Role;
}
