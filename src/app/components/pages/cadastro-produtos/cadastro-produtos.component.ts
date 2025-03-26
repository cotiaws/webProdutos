import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { endpoints } from '../../../configurations/environment';

@Component({
  selector: 'app-cadastro-produtos',
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './cadastro-produtos.component.html',
  styleUrl: './cadastro-produtos.component.css'
})
export class CadastroProdutosComponent {

  //atributos do componente
  categorias: any[] = []; //array de objetos
  erros: any = null; //objeto
  mensagem: string = ''; //mensagem de sucesso

  //método construtor (inicializar objetos)
  constructor(private http: HttpClient) {}

  //função executada ao abrir a página
  ngOnInit() {
    
    //fazendo uma requisição GET para a API
    this.http.get(endpoints.consultar_categorias)
      .subscribe({ //capturando a resposta da requisição
        next: (data) => { //se a requisição for bem sucedida
          this.categorias = data as any[];
        }
      });
  }

  //objeto para capturar os campos do formulário
  form = new FormGroup({
    nome: new FormControl(''), //campo 'nome'
    preco: new FormControl(''), //campo 'preco'
    quantidade: new FormControl(''), //campo 'quantidade'
    categoriaId: new FormControl('') //campo 'categoriaId'
  });

  //função executada ao enviar o formulário
  onSubmit() {

    //fazendo uma requisição POST para a API
    this.http.post(endpoints.cadastrar_produto, this.form.value, 
        { responseType: 'text' }
    ).subscribe({ //aguardando o retorno da API
        next: (data) => { //se a requisição for bem sucedida          
          //limpar as mensagens de erro
          this.erros = null;
          //capturar a mensagem de sucesso retornada pela api
          this.mensagem = data;
          //limpar os campos do formulário
          this.form.reset();
        },
        error: (e) => { //se a requisição falhar
          this.erros = JSON.parse(e.error);
          this.mensagem = '';
        }
    });
  }
}
