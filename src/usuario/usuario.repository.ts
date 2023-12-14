import { Injectable } from '@nestjs/common/decorators';
import { UsuarioEntity } from 'src/usuario/usuario.entity';

@Injectable() // <- Provider - Qualquer classe que esteja com Injectable
export class UsuarioRepository {
  private usuarios: UsuarioEntity[] = [];
  
  private buscaPorId(id: string): UsuarioEntity {
    const possivelUsuario: UsuarioEntity = this.usuarios.find(
      (usuario) => usuario.id === id,
    );
    return possivelUsuario;
  }

  async salvar(usuario: UsuarioEntity): Promise<void> {
    this.usuarios.push(usuario);
  }

  async listar() {
    return [...this.usuarios];
  }

  async existeComEmail(email: string): Promise<boolean> {
    const possivelUsuario: UsuarioEntity = this.usuarios.find(
      (usuario) => usuario.email === email,
    );
    return possivelUsuario !== undefined;
  }

  async atualiza(id: string,dadosDeAtualizacao: Partial<UsuarioEntity>): Promise<UsuarioEntity> {
    const usuario = this.buscaPorId(id);

    if (!usuario) {
      throw new Error('Usuário não encontrado!');
    }

    Object.entries(dadosDeAtualizacao).forEach(([chave, valor]) => {
      if (chave === 'id') {
        return;
      }
      usuario[chave] = valor;
    });

    return usuario;
  }

  async remove(id: string): Promise<UsuarioEntity> {
    const usuario = this.buscaPorId(id);
    this.usuarios = this.usuarios.filter(usuarioSalvo => usuarioSalvo.id !== id);
    return usuario;
  }
}
