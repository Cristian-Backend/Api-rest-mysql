import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "../../users/entities/user.entity";

@Entity()
export class Post {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column()
    content: string;

    @Column()
    authorId: number;

    @ManyToOne(() => User)
    author: User;
}
