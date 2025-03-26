import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { endpoints } from '../../../configurations/environment';
import { Chart, ChartModule } from 'angular-highcharts';

@Component({
  selector: 'app-dashboard',
  imports: [
    CommonModule,
    ChartModule
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {

  //atributos
  dados: any[] = [];
  grafico: Chart = new Chart();

  //método construtor
  constructor(private http : HttpClient) { }

  //método executado ao abrir o componente
  ngOnInit() {
    //executando uma requisição de consulta para a API
    this.http.get(endpoints.dashboard_categorias)
      .subscribe({
        next: (data) => {
          this.dados = data as any[];

          let conteudo: any[] = []; //array
          this.dados.forEach(item => {
            conteudo.push([ item.nomeCategoria, item.qtdProdutos ])
          });

          this.grafico = new Chart({
              chart: { type : 'pie' },
              title: { text : 'Quantidade de produtos por categoria.' },
              subtitle: { text: "Total de produtos separados por tipo de categoria." },
              plotOptions: {
                pie: {
                  innerSize: '50%',
                  dataLabels: { enabled: true }
                }
              },
              series: [ { data: conteudo, type: 'pie', name: 'Categorias' } ],
              legend: { enabled: false },
              credits: { enabled: false }
          });
        }
      })
  }
}
