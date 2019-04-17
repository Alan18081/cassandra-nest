import {CreateDateColumn, GeneratedUUidColumn, UpdateDateColumn} from '@iaminfinity/express-cassandra';
import {Transform} from 'class-transformer';

export class BaseEntity {

    @Transform(id => id.toString())
    @GeneratedUUidColumn()
    id: string;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

}