import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { endpoints } from '../../../configurations/environment';

@Component({
  selector: 'app-autenticar-usuario',
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './autenticar-usuario.component.html',
  styleUrl: './autenticar-usuario.component.css'
})
export class AutenticarUsuarioComponent {

  //atributos  
  mensagem: string = '';
  erros: any = null;

  //construtor para inicialização do HttpClient
  constructor(private http: HttpClient) {}

  //criando a estrutura do formulário
  form = new FormGroup({
    email : new FormControl('', [Validators.required, Validators.email]),
    senha : new FormControl('', [Validators.required, Validators.minLength(8)])
  });

  //função para capturar o evento SUBMIT do formulário
  onSubmit() {

      //limpar as mensagens
      this.mensagem = '';
      this.erros = null;

      //fazendo a requisição para a API
      this.http.post(endpoints.autenticar_usuario, this.form.value)
        .subscribe({ //capturando o retorno da API (resposta)
          next: (data: any) => { //retorno de sucesso
            //gravar os dados do usuário autenticado na sessão do navegador
            sessionStorage.setItem('usuario', JSON.stringify(data));
            //redirecionar para a página do dashboard
            location.href = '/pages/dashboard';
          },
          error: (e) => { //retorno de erro
            if(typeof e.error === "string") {              
              this.mensagem = e.error;
            }
            else {
              this.erros = e.error;              
            }
          }
        });    
  }
}
