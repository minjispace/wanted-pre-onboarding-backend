import {
    Column,
    Entity,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
} from "typeorm";
import { Company } from "../company/company.entity";
import { ApplicationHistory } from "../application_history/application_history.entity";

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

    @OneToMany(
        () => ApplicationHistory,
        (ApplicationHistory) => ApplicationHistory.job_posting,
    )
    applicationLists: ApplicationHistory[];
}
