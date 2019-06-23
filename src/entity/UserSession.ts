import { Minimum, Required } from "@tsed/common";
import { Example } from "@tsed/swagger";
import { Column, Entity, PrimaryGeneratedColumn, AfterLoad, Unique, ManyToMany, JoinColumn, Index, ObjectIdColumn, PrimaryColumn, ManyToOne } from "typeorm";
import { ObjectID } from "mongodb";
import { User } from "./User";
@Entity({ name: "user_session" })
@Index(["token"])
export class UserSession {

    @ObjectIdColumn()
    id: ObjectID;

    @Column()
    token: string;

    @ManyToOne(type => User)
    user: User;

    @Column("timestamp", { default: () => "CURRENT_TIMESTAMP" })
    createdAt: Date;

    @Column("timestamp", { default: () => "CURRENT_TIMESTAMP", onUpdate: "CURRENT_TIMESTAMP" })
    modifiedAt: Date;
}
