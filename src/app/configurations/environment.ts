//variáveis para configurar os endereços das APIs
export const apiProdutos = "http://localhost:8081";
export const apiUsuarios = "http://localhost:8082"

//mapeamento de cada endpoint da API
export const endpoints = {
    cadastrar_produto : `${apiProdutos}/api/produtos/cadastrar`,
    atualizar_produto : `${apiProdutos}/api/produtos/atualizar`,
    excluir_produto : `${apiProdutos}/api/produtos/excluir`,
    consultar_produtos : `${apiProdutos}/api/produtos/consultar`,
    obter_produto : `${apiProdutos}/api/produtos/obter`,
    consultar_categorias : `${apiProdutos}/api/categorias/consultar`,
    dashboard_categorias : `${apiProdutos}/api/dashboard/produtos-categoria`,
    autenticar_usuario : `${apiUsuarios}/api/usuario/autenticar`,
    criar_usuario : `${apiUsuarios}/api/usuario/criar`,
};