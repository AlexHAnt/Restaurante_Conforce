import { Controller, Get, Param, Post, Body, Put, Delete } from '@nestjs/common';

import { IngredientesService } from './Ingredientes.service';
import { Ingrediente } from './Ingredientes.interface';


@Controller('Ingredientes')
export class IngredientesController {
  constructor(
    private cmsService: IngredientesService
  ) { }

  @Post()
  create(@Body() task: Ingrediente): Promise<Ingrediente> {
    return this.cmsService.create(task);
  }

  @Get()
  findAll(): Promise<Ingrediente[]> {
    return this.cmsService.findAll();
  }

  @Get(':IngredientesNumber')
  findOne(@Param('IngredientesNumber') IngredientesNumber): Promise<Ingrediente> {
    return this.cmsService.findOne(IngredientesNumber);
  }

  @Put(':id')
  async update(@Param('id') id, @Body() data: Ingrediente): Promise<Ingrediente> {
    return this.cmsService.update(id, data)
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.cmsService.remove(id);
  }
}

