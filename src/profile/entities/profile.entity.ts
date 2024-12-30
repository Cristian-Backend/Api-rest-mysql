import { User } from "src/users/entities/user.entity";
import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Profile {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstname: string;

  @Column()
  lastname: string;  // Cambié 'lastame' por 'lastname'

  @Column()
  age: number;

  @Column({ nullable: true })
  phone: number;

  @OneToOne(() => User, (user) => user.profile, { cascade: true })
  user: User;
}
