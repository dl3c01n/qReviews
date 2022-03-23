import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./User";

@Entity({ name: 'Review'})
export class Review {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    comment: string

    @OneToOne(() => User)
    @JoinColumn()
    user: User
}