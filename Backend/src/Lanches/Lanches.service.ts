import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Lanches } from './Lanches.entity';
import { Lanche } from './Lanches.interface';

@Injectable()
export class LanchesService {
  constructor(
    @InjectRepository(Lanches)
    private readonly lancheRepository: Repository<Lanches>
  ) { }

  create(createCms: any): Promise<Lanche> {
    const lanche = new Lanches();
    lanche.Lanche = createCms.Lanche
    lanche.Ingredientes = createCms.Ingredientes
 
    return this.lancheRepository.save(lanche);
  }

  async findAll(): Promise<Lanche[]> {
    return this.lancheRepository.find();
  }

  findOne(id: string): Promise<Lanche> {
    return this.lancheRepository.findOne(id);
  }

  async update(id: number, data: Lanche): Promise<Lanche> {
    const userId = await this.lancheRepository.findOne(id)
    return await this.lancheRepository.save(Object.assign(userId, data))
  }

  async remove(id: string): Promise<void> {
    await this.lancheRepository.delete(id);
  }

}

