import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-navbar',
  imports: [
    RouterLink,
    CommonModule
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {

  //atributos
  isAuthenticated: boolean = false;

  nome: string = '';
  email : string = '';
  perfil : string = '';

  //evento executado no momento em que
  //o componente é aberto
  ngOnInit() {
    //verificar se os dados do usuário estão gravados na session storage
    if(sessionStorage.getItem('usuario') != null) {

      this.isAuthenticated = true;

      //ler os dados do usuário
      var data = sessionStorage.getItem('usuario') as string;
      var json = JSON.parse(data);

      this.nome = json.nome;
      this.email = json.email;
      this.perfil = json.perfil;
    }
  }

  //função para logout do usuário
  logout() {

    if(window.confirm('Deseja realmente sair do sistema?')) {
      //apagar os dados da session storage
      sessionStorage.removeItem('usuario');
      //redirecionar o usuário de volta para a página de autenticação
      location.href = '/pages/autenticar-usuario';
    }
  }

}
