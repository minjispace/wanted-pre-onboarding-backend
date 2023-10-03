import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { ApplicationHistory } from "../application_history/application_history.entity";

@Entity("User")
export class User {
    @PrimaryGeneratedColumn("increment")
    public id: number;

    @Column({ length: 30 })
    name: string;

    @OneToMany(
        () => ApplicationHistory,
        (ApplicationHistory) => ApplicationHistory.user,
    )
    applicationHistory: ApplicationHistory[];
}
