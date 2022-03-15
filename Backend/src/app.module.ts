import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Connection } from 'typeorm';
import { ScheduleModule } from '@nestjs/schedule';

import { AppController } from './app.controller';
import { AppService } from './app.service';

import { Users } from './user/user.entity'
import { Ingredientes } from './Ingredientes/Ingredientes.entity';

import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { LanchesModule } from './Lanches/Lanches.module';
import { IngredientesModule } from './Ingredientes/Ingredientes.module';
import { Lanches } from './Lanches/Lanches.entity';


@Module({
  imports: [
    ScheduleModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'mssql',
      host: 'localhost',
      port: 1433,
      username: 'sa',
      password: 'lcdepadm',
      database: 'Restaurante_Conforce',
      entities: [Lanches,
        Users,
        Ingredientes,
      ],
      synchronize: true
    }),
    AuthModule,
    LanchesModule,
    IngredientesModule,
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService,],
})
export class AppModule { }
