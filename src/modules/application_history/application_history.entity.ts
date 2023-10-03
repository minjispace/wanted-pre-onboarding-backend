import { Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("ApplicationHistory")
export class ApplicationHistory {
    @PrimaryGeneratedColumn("increment")
    id: number;
}
