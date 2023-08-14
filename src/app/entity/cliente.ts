import { Endereco } from "./endereco";

export class Cliente {
    id: number = 0;
    nome: string = '';
    cnpj: string = '';
    endereco: Endereco | undefined;
}