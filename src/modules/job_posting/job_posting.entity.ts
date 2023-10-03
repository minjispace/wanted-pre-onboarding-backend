import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("JobPosting")
export class JobPosting {
    @PrimaryGeneratedColumn("increment")
    id: number;

    @Column({ length: 30 })
    position: string;

    @Column()
    reward: number;

    @Column({ length: 8000 })
    content: string;

    @Column({ length: 20 })
    skill: string;
}
