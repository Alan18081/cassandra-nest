import { Module } from '@nestjs/common';
import {UsersModule} from './components/users/users.module';
import {CoreModule} from './components/core/core.module';
import { ExpressCassandraModule } from '@iaminfinity/express-cassandra';
import {ConfigService} from './components/core/services/config.service';

@Module({
  imports: [
    CoreModule,
    ExpressCassandraModule.forRootAsync({
          useFactory: (configService: ConfigService) => ({
              clientOptions: {
                  contactPoints: [configService.get('DB_HOST')],
                  keyspace: configService.get('DB_KEYSPACE'),
                  protocolOptions: {
                    port: +configService.get('DB_PORT'),
                  },
              },
              ormOptions: {
                  migration: 'alter',
                  disableTTYConfirmation: true,
              },
          }),
          inject: [ConfigService],
      }),
      UsersModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
