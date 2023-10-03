import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Company } from "../company/company.entity";

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

    @ManyToOne(() => Company, (company) => company.postings, {
        nullable: false,
        onDelete: "CASCADE",
    })
    company: Company;
}
