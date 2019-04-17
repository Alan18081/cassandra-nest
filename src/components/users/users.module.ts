import {Module} from '@nestjs/common';
import {ExpressCassandraModule} from '@iaminfinity/express-cassandra';
import {User} from './user.entity';
import {UsersRepository} from './users.repository';
import {UsersController} from './users.controller';
import {UsersService} from './users.service';
import {CoreModule} from '../core/core.module';

@Module({
    imports: [
        ExpressCassandraModule.forFeature([User, UsersRepository]),
        CoreModule,
    ],
    controllers: [
        UsersController,
    ],
    providers: [UsersService],
    exports: [UsersService],
})
export class UsersModule {}