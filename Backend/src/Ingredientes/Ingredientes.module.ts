import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { IngredientesController } from './Ingredientes.controller';
import { IngredientesService } from './Ingredientes.service';
import { Ingredientes } from './Ingredientes.entity';


@Module({
    imports: [TypeOrmModule.forFeature([Ingredientes])],
    controllers: [IngredientesController],
    providers: [IngredientesService],
    exports: [IngredientesService],
})
export class IngredientesModule { }
