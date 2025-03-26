import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { endpoints } from '../../../configurations/environment';

@Component({
  selector: 'app-criar-usuario',
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './criar-usuario.component.html',
  styleUrl: './criar-usuario.component.css'
})
export class CriarUsuarioComponent {

  //atributos
  mensagemSucesso: string = '';
  mensagemErro: string = '';
  erros: any = null;

  //construtor
  constructor(private http: HttpClient) { }

  //objeto para capturar o formulário
  form = new FormGroup({
    nome: new FormControl(''), //campo 'nome'
    email: new FormControl(''), //campo 'email'
    senha: new FormControl(''), //campo 'senha'
    senhaConfirmacao: new FormControl(''), //campo 'senhaConfirmacao'
  });

  //função para capturar o evento de submit do formulário
  onSubmit() {

    //limpar as mensagens exibidas na página
    this.mensagemSucesso = '';
    this.mensagemErro = '';
    this.erros = null;

    //verificando se as senhas estão iguais
    if (this.form.value.senha == this.form.value.senhaConfirmacao) {

      //enviando a requisição de cadastro do usuário para a API
      this.http.post(endpoints.criar_usuario, this.form.value)
        .subscribe({ //capturando o retorno da API (resposta)
          next: (data: any) => { //retorno de sucesso
            //exibir mensagem de sucesso
            this.mensagemSucesso = `Parabéns ${data.nome}, sua conta foi criada com sucesso.`;
            //limpar o formulário
            this.form.reset();
          },
          error: (e) => { //retorno de erro
            if (typeof e.error === "string") {
              this.mensagemErro = e.error;
            }
            else {
              this.erros = e.error;
            }
          }
        });
    }
    else {
      this.mensagemErro = "Senhas não conferem, por favor verifique.";
    }
  }
}
