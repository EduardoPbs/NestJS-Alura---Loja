import { IsEmail, IsNotEmpty, IsOptional, MinLength } from 'class-validator';
import { EmailEhUnico } from 'src/usuario/validacao/email-e-unico.validator';

export class AtualizaUsuarioDTO {
  @IsOptional() // Por ser opcional, se o nome nao for informado o campo nao sera validado
  @IsNotEmpty({ message: 'Nome inválido!' })
  nome?: string;

  @IsOptional()
  @IsEmail(undefined, { message: 'Email inválido!' })
  @EmailEhUnico({ message: 'Email já cadastrado!' })
  email?: string;

  @IsOptional()
  @MinLength(6, { message: 'Senha precisa ter pelo menos 6 caracteres!' })
  senha?: string;
}
