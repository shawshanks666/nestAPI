import { Column, Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Auth } from './auth.entity';
@Entity()
export class Cat {
  @PrimaryGeneratedColumn({
    type: 'bigint',
    name: 'user_id',
  })
  
  id: number;

  @Column({
    nullable: false,
    default: '',
  })
  name: string;

  @Column({
    nullable: false,
    default: '',
  })
  breed: string;

  @Column({
    nullable: false,
    default: '',
  })
  nature: string;

  @Column({
    nullable: false,
    default: 0,
  })
  age: number;

  @ManyToOne(() => Auth, auth => auth.cats, { eager: true })
  owner: Auth;
}