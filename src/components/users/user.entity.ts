import {Column, Entity} from '@iaminfinity/express-cassandra';
import {Exclude} from 'class-transformer';
import {BaseEntity} from '../core/base.entity';

@Entity({
    key: ['id'],
})
export class User extends BaseEntity {

    @Column({ type: 'varchar' })
    firstName: string;

    @Column({ type: 'varchar' })
    lastName: string;

    @Column({ type: 'varchar' })
    email: string;

    @Exclude()
    @Column({ type: 'varchar' })
    password: string;

    constructor(partial: Partial<User>) {
        super();
        Object.assign(this, partial);
    }

}