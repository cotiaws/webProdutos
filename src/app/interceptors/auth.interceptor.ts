import { HttpInterceptorFn } from "@angular/common/http";
import { apiProdutos } from "../configurations/environment";

/*
    Interceptador para que todas as requisições feitas para a API de produtos
    possam enviar o TOKEN do usuário autenticado na session storage
*/
export const AuthInterceptor : HttpInterceptorFn = (req, next) => {

    //verificar se a requisição é destinada para a API de produtos
    if(req.url.includes(apiProdutos)) {

        //acessar os dados do usuário autenticado na session storage
        var data = sessionStorage.getItem('usuario') as string;
        var json = JSON.parse(data);

        //adicionando o TOKEN do usuário na requisição
        const request = req.clone({
            setHeaders: { Authorization : 'Bearer ' + json.token }
        });

        return next(request);
    }

    return next(req);
}