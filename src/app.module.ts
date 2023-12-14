import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ProdutoModule } from 'src/produto/produto.module';
import { UsuarioModule } from 'src/usuario/usuario.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostgresConfigService } from 'src/config/postgres.config.service';

// ConfigModule.forRoot => Fazer inicializar as configurações
@Module({
  imports: [
    UsuarioModule,
    ProdutoModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    // Configuração do banco de dados
    TypeOrmModule.forRootAsync({
      useClass: PostgresConfigService,
      inject: [PostgresConfigService],
    }),
  ], // Um module importa outro | CURSO CONTINUAÇÃO -> e configurações do banco de dados
})
export class AppModule {}
