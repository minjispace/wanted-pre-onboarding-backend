import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("User")
export class User {
    @PrimaryGeneratedColumn("increment")
    public id: number;

    @Column({ length: 30 })
    name: string;
}
