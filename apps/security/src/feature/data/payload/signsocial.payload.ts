import {IsEmail, IsNotEmpty, IsOptional, Length, Matches} from "class-validator";


export class SignsocialPayload {
    @IsNotEmpty()
    @Length(1, 25)
    @Matches(/^[a-zA-Z0-9_.-]+$/)
    username: string;

    @IsOptional()    // Rend ce champ optionnel
    @IsEmail()
    @Matches(/^[^\s<>]+$/)
    mail?: string;   // Utilisez ? pour marquer le champ comme optionnel

    googleHash: string;

    facebookHash: string;
}
