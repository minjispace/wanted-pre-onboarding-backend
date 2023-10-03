import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

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
}
