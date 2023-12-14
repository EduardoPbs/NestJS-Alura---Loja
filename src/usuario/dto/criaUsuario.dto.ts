import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';
import { EmailEhUnico } from 'src/usuario/validacao/email-e-unico.validator';

export class CriaUsuarioDTO {
  @IsNotEmpty({ message: 'Nome inválido!' })
  nome: string;

  @IsEmail(undefined, { message: 'Email inválido!' })
  @EmailEhUnico({ message: 'Email já cadastrado!' })
  email: string;

  @MinLength(6, { message: 'Senha precisa ter pelo menos 6 caracteres!' })
  senha: string;
}
