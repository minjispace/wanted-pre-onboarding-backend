import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { JobPosting } from "../job_posting/job_posting.entity";

@Entity("Company")
export class Company {
    @PrimaryGeneratedColumn("increment")
    id: number;

    @Column({ length: 30 })
    name: string;

    @Column({ length: 100 })
    nation: string;

    @Column({ length: 20 })
    location: string;

    @OneToMany(() => JobPosting, (posting) => posting.company)
    postings: JobPosting[];
}
