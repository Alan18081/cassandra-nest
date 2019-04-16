import {Column, CreateDateColumn, Entity, GeneratedUUidColumn, UpdateDateColumn} from '@iaminfinity/express-cassandra';
import {Exclude, Transform} from 'class-transformer';

@Entity({
    key: ['id'],
})
export class User {

    @Transform(id => id.toString())
    @GeneratedUUidColumn()
    id: string;

    @Column({ type: 'text' })
    firstName: string;

    @Column({ type: 'text' })
    lastName: string;

    @Column({ type: 'text' })
    email: string;

    @Exclude()
    @Column({ type: 'text' })
    password: string;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    constructor(partial: Partial<User>) {
        Object.assign(this, partial);
    }

}