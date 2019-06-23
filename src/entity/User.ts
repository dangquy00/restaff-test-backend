import { Minimum, Required } from "@tsed/common";
import { Example } from "@tsed/swagger";
import { Column, Entity, PrimaryGeneratedColumn, AfterLoad, Unique, ManyToMany, JoinColumn, Index, ObjectIdColumn, PrimaryColumn } from "typeorm";
import {ObjectID} from "mongodb";
@Entity({ name: "user" })
@Unique(["username"])
export class User {

    @ObjectIdColumn()
    id: ObjectID;

    @Column()
    @Required()
    username: string;

    @Column()
    @Required()
    fullname: string;

    @Column({ length: 200, nullable: false, select: false })
    @Required()
    password: string;

    @Column("timestamp", { default: () => "CURRENT_TIMESTAMP" })
    createdAt: Date;

    @Column("timestamp", { default: () => "CURRENT_TIMESTAMP", onUpdate: "CURRENT_TIMESTAMP" })
    modifiedAt: Date;
}
