import { Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { JobPosting } from "../job_posting/job_posting.entity";
import { User } from "../user/user.entity";

@Entity("ApplicationHistory")
export class ApplicationHistory {
    @PrimaryGeneratedColumn("increment")
    id: number;

    @ManyToOne(() => User, (user) => user.applicationHistory, {
        nullable: false,
        onDelete: "CASCADE",
    })
    user: User;

    @ManyToOne(() => JobPosting, (posting) => posting.applicationLists, {
        nullable: false,
        onDelete: "CASCADE",
    })
    job_posting: JobPosting;
}
