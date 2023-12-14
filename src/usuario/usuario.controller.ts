import {
  Param,
  Body,
  Controller,
  Get,
  Post,
  Patch,
  Delete,
} from '@nestjs/common';
import { CriaUsuarioDTO } from 'src/usuario/dto/criaUsuario.dto';
import { UsuarioEntity } from 'src/usuario/usuario.entity';
import { AtualizaUsuarioDTO } from 'src/usuario/dto/atualizaUsuario.dto';
import { UsuarioService } from 'src/usuario/usuario.service';
import { v4 as UUID } from 'uuid';

@Controller('/usuarios')
export class UsuarioController {
  constructor(private usuarioService: UsuarioService) {}

  @Post()
  async criaUsuario(@Body() dadosUsuario: CriaUsuarioDTO) {
    const usuarioEntity = new UsuarioEntity();
    usuarioEntity.id = UUID();
    usuarioEntity.nome = dadosUsuario.nome;
    usuarioEntity.email = dadosUsuario.email;
    usuarioEntity.senha = dadosUsuario.senha;

    this.usuarioService.criaUsuario(usuarioEntity);
    return {
      message: 'Usuário criado com sucesso!',
      content: {
        id: usuarioEntity.id,
        nome: usuarioEntity.nome,
      },
    };
  }

  @Get()
  async listaUsuarios() {
    const usuariosSalvos = await this.usuarioService.listaUsuarios();
    return usuariosSalvos;
  }

  @Patch('/:id')
  async atualizaUsuario(
    @Param('id') id: string,
    @Body() novosDados: AtualizaUsuarioDTO,
  ) {
    const usuarioAtualizado = await this.usuarioService.atualizaUsuario(
      id,
      novosDados,
    );
    return {
      usuario: usuarioAtualizado,
      message: 'Usuário atualizado com sucesso!',
    };
  }

  @Delete('/:id')
  async removeUsuario(@Param('id') id: string) {
    const usuarioRemovido = await this.usuarioService.deletaUsuario(id);
    return {
      usurio: usuarioRemovido,
      message: 'Usuário removido com sucesso!',
    };
  }
}
