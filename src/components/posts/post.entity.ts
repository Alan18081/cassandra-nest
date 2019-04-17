import {Column, Entity, uuid} from '@iaminfinity/express-cassandra';
import {BaseEntity} from '../core/base.entity';

@Entity({
    table_name: 'posts',
    key: ['id'],
})
export class PostEntity extends BaseEntity {

    @Column({
        type: 'varchar',
    })
    title: string;

    @Column({
        type: 'text',
    })
    text: string;

    @Column({
        type: 'uuid',
        virtual: {
            set: (value: string) => uuid(value),
        },
    })
    authorId: string;

    @Column({
        type: 'map',
        typeDef: '<varchar, varchar>',
    })
    authorInfo: { firstName: string, lastName: string };

    constructor(partial: Partial<PostEntity>) {
        super();
        Object.assign(this, partial);
    }

}