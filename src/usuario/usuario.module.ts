import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsuarioController } from 'src/usuario/usuario.controller';
import { UsuarioEntity } from 'src/usuario/usuario.entity';
import { UsuarioRepository } from 'src/usuario/usuario.repository';
import { UsuarioService } from 'src/usuario/usuario.service';
import { EmailEhUnicoValidator } from './validacao/email-e-unico.validator';

@Module({
  imports: [TypeOrmModule.forFeature([UsuarioEntity])],
  controllers: [UsuarioController],
  providers: [UsuarioService, UsuarioRepository, EmailEhUnicoValidator],
})
export class UsuarioModule {}
