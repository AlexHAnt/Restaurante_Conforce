import { Module} from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { LanchesController } from './Lanches.controller';
import { LanchesService } from './Lanches.service';
import { Lanches } from './Lanches.entity';


@Module({
    imports: [TypeOrmModule.forFeature([Lanches])],
    controllers: [LanchesController],
    providers: [LanchesService],
    exports: [LanchesService],
})
export class LanchesModule { }
