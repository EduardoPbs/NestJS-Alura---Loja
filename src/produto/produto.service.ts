import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { ProdutoEntity } from './produto.entity';
import { ListaProdutoDTO } from 'src/produto/dto/listaProduto.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { AtualizaProdutoDTO } from 'src/produto/dto/atualizaProduto.dto';

@Injectable()
export class ProdutoService {
  constructor(
    @InjectRepository(ProdutoEntity)
    private readonly produtoRepository: Repository<ProdutoEntity>,
  ) {}

  async criaProduto(produtoEntity: ProdutoEntity) {
    await this.produtoRepository.save(produtoEntity);
  }

  async listaProdutos() {
    const produtosSalvos = await this.produtoRepository.find();
    const produtosLista = produtosSalvos.map(
      (produto) =>
        new ListaProdutoDTO(
          produto.id,
          produto.usuarioId,
          produto.nome,
          produto.valor,
          produto.quantidade,
          produto.descricao,
          produto.categoria,
          produto.caracteristicas,
          produto.imagens,
        ),
    );
    return produtosLista;
  }

  async atualizaProduto(id: string, produtoEntity: AtualizaProdutoDTO) {
    await this.produtoRepository.update(id, produtoEntity);
  }

  async deletaProduto(id: string) {
    await this.produtoRepository.delete(id);
  }
}
