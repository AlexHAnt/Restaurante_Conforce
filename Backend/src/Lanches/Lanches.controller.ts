import { Controller, Get, Param, Post, Body, Put, Delete } from '@nestjs/common';

import { LanchesService } from './Lanches.service';
import { Lanche } from './Lanches.interface';


@Controller('Lanches')
export class LanchesController {
  constructor(
    private lancheService: LanchesService
    ) { }

  @Post()
  create(@Body() task: Lanche): Promise<Lanche> {
    return this.lancheService.create(task);
  }

  @Get()
  findAll(): Promise<Lanche[]> {
    return this.lancheService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id): Promise<Lanche> {
    return this.lancheService.findOne(id);
  }

  @Put(':id')
  async update(@Param('id') id, @Body() data: Lanche): Promise<Lanche> {
    return this.lancheService.update(id, data)
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.lancheService.remove(id);
  }
}

