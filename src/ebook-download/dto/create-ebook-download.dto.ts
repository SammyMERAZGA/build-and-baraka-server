import { IsEmail, IsNotEmpty } from 'class-validator';

export class CreateEbookDownloadDto {
  @IsEmail({}, { message: 'Veuillez fournir une adresse email valide' })
  @IsNotEmpty({ message: "L'email est requis" })
  email: string;
}
