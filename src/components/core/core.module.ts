import {Global, Module} from '@nestjs/common';
import {ConfigService} from './services/config.service';
import {HashService} from './services/hash.service';

const providers = [
    HashService,
    {
        provide: ConfigService,
        useValue: new ConfigService(`${process.env.NODE_ENV}.env`),
    },
];

@Global()
@Module({
    providers: [...providers],
    exports: [...providers],
})
export class CoreModule {}