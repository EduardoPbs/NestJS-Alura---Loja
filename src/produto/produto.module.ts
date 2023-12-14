import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProdutoController } from 'src/produto/produto.controller';
import { ProdutoEntity } from 'src/produto/produto.entity';
import { ProdutoService } from 'src/produto/produto.service';

@Module({
  imports: [TypeOrmModule.forFeature([ProdutoEntity])],
  controllers: [ProdutoController],
  providers: [ProdutoService],
})
export class ProdutoModule {}
