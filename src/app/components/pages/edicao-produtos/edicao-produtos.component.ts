import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { endpoints } from '../../../configurations/environment';

@Component({
  selector: 'app-edicao-produtos',
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './edicao-produtos.component.html',
  styleUrl: './edicao-produtos.component.css'
})
export class EdicaoProdutosComponent {

  //atrinbutos
  id: string = '';
  categorias: any[] = []; //array de objetos
  erros: any = null; //objeto
  mensagem: string = ''; //mensagem de sucesso

  //método construtor
  constructor(
    private http: HttpClient,
    private activated: ActivatedRoute
  ) {}

  //função executada quando a página é aberta
  ngOnInit() {

    //capturando o id enviado pela URL
    this.id = this.activated.snapshot.paramMap.get('id') as string;
    //consultando os dados do produto através do ID
    this.http.get(`${endpoints.obter_produto}/${this.id}`)
      .subscribe({
        next: (data: any) => {
          //preenchendo o formulário
          this.form.controls.nome.setValue(data.nome);
          this.form.controls.preco.setValue(data.preco);
          this.form.controls.quantidade.setValue(data.quantidade);
          this.form.controls.categoriaId.setValue(data.categoria.id);
        }
      });

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

  onSubmit() {
        //fazendo uma requisição PUT para a API
        this.http.put(`${endpoints.atualizar_produto}/${this.id}`, this.form.value, 
          { responseType: 'text' }
      ).subscribe({ //aguardando o retorno da API
          next: (data) => { //se a requisição for bem sucedida          
            //limpar as mensagens de erro
            this.erros = null;
            //capturar a mensagem de sucesso retornada pela api
            this.mensagem = data;
          },
          error: (e) => { //se a requisição falhar
            this.erros = JSON.parse(e.error);
            this.mensagem = '';
          }
      });
  }

}
