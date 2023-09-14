
// module.exports = {
//   type: 'postgres',
//   host: 'localhost',
//   port: 5432,
//   username: 'postgres',
//   password: 'docker',
//   database: 'postgres',
//   entities: ['dist/**/*.entity.{ts,js}'],
//   migrations: [__dirname + '/src/migrations/*.ts'],
//   cli: {
//     migrationsDir: 'src/migrations'
//   }
//   // entities: [join(__dirname, '**', '*.entity.{ts,js}')],
// }

import 'dotenv/config'
import { DataSource, DataSourceOptions } from "typeorm";

const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: [__dirname + '/../**/*.entity{.js,.ts}'], //Para pegar na raiz do projeto até o src e tiver com o final .entity
  migrations: [__dirname + '/src/migrations/*.{js,ts}'],
  // synchronize: true //Apenas para tempo de desenvolvimento (Cria tabelas automaticamente)
}

const dataSource = new DataSource(dataSourceOptions);

export default dataSource;

// import { DataSource } from 'typeorm';
 
// import { config } from 'dotenv';
// import { ConfigService } from '@nestjs/config';
 
// config();
 
// const configService = new ConfigService();
 
// export default new DataSource({
//   type: 'postgres',
//   host: 'localhost',
//   port: 5432,
//   username: 'postgres',
//   password: 'docker',
//   database: 'postgres',
//   entities: [__dirname + '/src/**/*.entity{.ts,.js}'],
//   migrations: [__dirname + '/src/migrations/*.ts'],
// });