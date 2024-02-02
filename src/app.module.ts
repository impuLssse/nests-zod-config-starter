import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ZodConfigModule, dotEnvLoader } from 'nest-zod-config';
import { AppConfig } from '@config';

@Module({
  imports: [
    ZodConfigModule.forRootAsync({
      config: AppConfig,
      isGlobal: true,
      loader: dotEnvLoader(),
    }),
    TypeOrmModule.forRootAsync({
      inject: [AppConfig],
      useFactory: (config: AppConfig) => ({
        type: 'postgres',
        host: config.PG_HOST,
        port: config.PG_PORT,
        username: config.PG_USERNAME,
        password: config.PG_PASSWORD,
        database: config.PG_DATABASE,
        entities: [],
        poolSize: 1,
      }),
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
