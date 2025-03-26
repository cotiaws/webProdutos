import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { endpoints } from '../../../configurations/environment';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-consulta-produtos',
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterLink
  ],
  templateUrl: './consulta-produtos.component.html',
  styleUrl: './consulta-produtos.component.css'
})
export class ConsultaProdutosComponent {

  //atributos
  produtos: any[] = []; //array de objetos json
  mensagem: string = ''; //mensagem de texto

  //método construtor
  constructor(private http: HttpClient) { }

  //criando um formulário para capturar a pesquisa de produtos
  form = new FormGroup({
    nome : new FormControl('') //campo 'nome'
  });

  //função para enviar os dados para a api
  onSubmit() {
    //fazendo uma requisição de consulta de produtos na API
    this.http.get(`${endpoints.consultar_produtos}/${this.form.value.nome}`)
      .subscribe({ //aguardando o retorno da API
        next: (data) => { //pegando a resposta de sucesso
          //armazenando os dados obtidos (lista de produtos)
          this.produtos = data as any[];
        }
      });
  }

  //função para enviar uma requisição de 
  //exclusão de produto para a API
  onDelete(id: string) {
    //pedir ao usuário que confirme a operação
    if(confirm('Deseja realmente excluir o produto selecionado?')) {

      //executando o serviço de exclusão da API
      this.http.delete(`${endpoints.excluir_produto}/${id}`, { responseType: 'text' })
        .subscribe({ //aguardando o retorno da API
          next: (data) => { //capturando a resposta de sucesso
            this.mensagem = data; //armazenando a mensagem obtida da API
            this.onSubmit(); //executando a consulta novamente
          }
        });
    }
  }
}
