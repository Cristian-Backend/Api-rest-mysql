import { Column, DeleteDateColumn, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Profile } from '../../profile/entities/profile.entity';
import { Post } from '../../post/entities/post.entity';


@Entity({ name: 'users' })
export class User {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true , nullable: false})
    username: string;

    @Column({ unique: true,  nullable: false })
    email: string;

    @Column()
    password: string;

    @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
    createAt: Date;

 
    @DeleteDateColumn()
    deletedAt?: Date

    // Relación uno a uno
    @OneToOne(() => Profile)
    @JoinColumn()
    profile: Profile; // Relación con la entidad Profile

    // Relación uno a muchos
     @OneToMany(() => Post , post => post.author) // Los post van a estar relacionados con el autor
        posts: Post[]; // Relación con la entidad Post

}

