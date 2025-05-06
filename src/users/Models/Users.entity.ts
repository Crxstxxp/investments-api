import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Users {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column({ nullable: true, name: 'last_name' })
    lastName: string;

    @Column({ unique: true })
    email: string;

    @Column()
    password: string;
}
