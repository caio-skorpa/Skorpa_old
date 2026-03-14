function teste(a) {
    return a
}
const routes = [
    { path: "/", view: () => console.log("1") },
    { path: "/carteira/aportes", view: () => console.log("2") },
    { path: "/carteira/meus-ativos", view: () => console.log("3") },
    { path: "/acoes/todos", view: () => console.log("4") },
    { path: "/acoes/favoritas", view: () => console.log("5") },
    { path: "/relatorios/carteira", view: () => console.log("6") },
    { path: "/relatorios/vendas", view: () => console.log("7aaa") },
    { path: "/relatorios/aportes", view: () => console.log("8") },
    { path: "/relatorios/variacao", view: () => console.log("9sss") },
    { path: "/relatorios/dividendos", view: () => console.log("10") },
    { path: "/config/usuario", view: () => console.log("11") },
    { path: "/config/atalhos", view: () => console.log("12") }
];
routes.forEach(e => {
    if (!e.element) {
        e.element = teste(`a[href = "${e.path}"]`);
    }
});
console.log(routes);