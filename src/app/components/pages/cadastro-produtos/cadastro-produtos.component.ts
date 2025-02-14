import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-cadastro-produtos',
  imports: [
    CommonModule
  ],
  templateUrl: './cadastro-produtos.component.html',
  styleUrl: './cadastro-produtos.component.css'
})
export class CadastroProdutosComponent {

  //atributos do componente
  categorias: any[] = []; //array de objetos

  //método construtor (inicializar objetos)
  constructor(private http: HttpClient) {}

  //função executada ao abrir a página
  ngOnInit() {
    
    //fazendo uma requisição GET para a API
    this.http.get('http://localhost:8080/api/categorias/consultar')
      .subscribe({ //capturando a resposta da requisição
        next: (data) => { //se a requisição for bem sucedida
          this.categorias = data as any[];
        }
      });
  }
}
