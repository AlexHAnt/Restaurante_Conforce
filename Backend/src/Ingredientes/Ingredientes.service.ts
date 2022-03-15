import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Ingredientes } from './Ingredientes.entity';
import { Ingrediente } from './Ingredientes.interface';

@Injectable()
export class IngredientesService {
  constructor(
    @InjectRepository(Ingredientes)
    private readonly IngredientesRepository: Repository<Ingredientes>
  ) { }

  create(createIngredientes: any): Promise<Ingredientes> {
    const Ingredientes = new Ingrediente();
    Ingredientes.Ingrediente = createIngredientes.Ingrediente
    Ingredientes.Preco = createIngredientes.Preco
    return this.IngredientesRepository.save(Ingredientes);
  }

  async findAll(): Promise<Ingredientes[]> {
    return this.IngredientesRepository.find();
  }

  findOne(IngredientesNumber: string | number): Promise<Ingredientes> {
    return this.IngredientesRepository.findOne({
      where: { Ingredientes_Number: IngredientesNumber }
    });
  }

  async update(IngredientesNumber: string | number, data: Ingredientes): Promise<Ingredientes> {
    // const IngredientesId = await this.IngredientesRepository.findOne(id)
    const IngredientesId = await this.IngredientesRepository.findOne({
      where: { Ingredientes_Number: IngredientesNumber }
    });
    return await this.IngredientesRepository.save(Object.assign(IngredientesId, data))
  }

  async remove(id: string): Promise<void> {
    await this.IngredientesRepository.delete(id);
  }

}

