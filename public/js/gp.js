import { fncs } from "./function.js";

const nav = fncs.$(".nav");
const hideSideBar = fncs.$$(".fa-bars");
const main = fncs.$("main");

const elements = {
    nav: fncs.$(".nav"),
    hideSideBar: fncs.$$(".fa-bars"),
    main: fncs.$("main"),

}

function showHide() {
    nav.classList.toggle("hidden");
    main.classList.toggle("full");
};

const mediaQuery = window.matchMedia("(max-width: 720px)");

function handleScreenChange(e) {
    if (e.matches) {
        nav.classList.add("hidden");
        main.classList.add("full");
    } else {
        nav.classList.remove("hidden");
        main.classList.remove("full");
    }
}

handleScreenChange(mediaQuery);

mediaQuery.addEventListener("change", handleScreenChange);

hideSideBar.forEach(e => {
    e.addEventListener("click", () => {
        showHide();
    });
});

document.addEventListener("keydown", (event) => {
    if (event.ctrlKey && event.key.toLowerCase() === "b") {
        event.preventDefault(); // evita ação padrão do navegador
        showHide();
    }
});


const collet = fncs.$(".collect");
const sublistAll = fncs.$$(".sublist");

collet.addEventListener("click", () => {
    sublistAll.forEach(e => {
        e.classList.remove("isBlock");
        arrow.forEach(e => {
            e.classList.remove("rotate");
        })

    });
});



const wallet = fncs.$("#wallet");
const sublistWall = fncs.$("#wallet-child");
const reports = fncs.$("#reports");
const sublistRep = fncs.$("#reports-child");
const settings = fncs.$("#settings");
const sublistSet = fncs.$("#settings-child");
const assets = fncs.$("#assets");
const subListAssets = fncs.$("#assets-child");
const arrow = fncs.$$(".fa-angle-right");

wallet.addEventListener("click", () => {
    sublistWall.classList.toggle("isBlock");
    arrow[0].classList.toggle("rotate");
});

assets.addEventListener("click", () => {
    subListAssets.classList.toggle("isBlock");
    arrow[1].classList.toggle("rotate");
});
reports.addEventListener("click", () => {
    sublistRep.classList.toggle("isBlock");
    arrow[2].classList.toggle("rotate");
});

settings.addEventListener("click", () => {
    sublistSet.classList.toggle("isBlock");
    arrow[3].classList.toggle("rotate");
});

const range = fncs.$$(".variacaoItem")
const icon = fncs.$$(".variacaoItemIcon")

range.forEach(el => {
    const value = parseFloat(el.innerText.replace(',', '.'));
    el.style.color = value > 0 ? "rgb(26, 190, 20)" : "rgb(212, 14, 14)"
});

for (let i = 0; i < icon.length; i++) {
    const value = range[i].innerText.replace(",", ".").replace("%", "")
    if (value > 0) {
        icon[i].innerText = "↗"
        icon[i].style.color = "rgb(26, 190, 20)"
    } else {
        icon[i].innerText = "↘"
        icon[i].style.color = "rgb(212, 14, 14)"
    }
}
const navigateTo = url => {
    history.pushState(null, null, url);//estado, titúlo e local/url
    router();
};

async function router() {
    const routes = [
        { path: "/", view: () => console.log("1") },
        { path: "/carteira/aportes", view: () => console.log("2") },
        { path: "/carteira/meus-ativos", view: () => console.log("3") },
        { path: "/acoes/todos", view: () => console.log("4") },
        { path: "/acoes/favoritas", view: () => console.log("5") },
        { path: "/relatorios/carteira", view: () => console.log("6") },
        { path: "/relatorios/vendas", view: () => console.log("7") },
        { path: "/relatorios/aportes", view: () => console.log("8") },
        { path: "/relatorios/variacao", view: () => console.log("9") },
        { path: "/relatorios/dividendos", view: () => console.log("10") },
        { path: "/config/usuario", view: () => console.log("11") },
        { path: "/config/atalhos", view: () => console.log("12") }
    ];

    routes.forEach(e => {// criando a chave que pega o elemento pelo href
        if (!e.element) {
            e.element = fncs.$(`a[href = "${e.path}"]`);
        }
    });

    const potentialMatches = routes.map(route => { //possiveis correspondencias
        return {
            route: route,
            isMatch: location.pathname === route.path,//localização atual é igual a localização que está no array routes
        };
    });

    let match = potentialMatches.find(pontentialMatch => pontentialMatch.isMatch);//match é true no primeiro elemento que isMath é true. Ele percorre todo o array.

    const urls = fncs.$$(".point");
    urls.forEach(e => {
        const href = e.getAttribute("href");
        if (location.pathname === "/") {
            e.classList.remove("currentUrl");
            return //pula pro próxima iteração
        }
        if (href === match.route.path) {//se a url atual for / sempre vai dar falso pq o match
            match.route.element.classList.add("currentUrl");
        } else {
            e.classList.remove("currentUrl");
        };
    });

    if (!match) {
        match = {
            route: routes[0],
            isMath: true
        };
    }

};

window.addEventListener("popstate", router);//voltar na página

document.addEventListener("DOMContentLoaded", () => {//evento quando o conteudo do DOM é carregado.
    document.body.addEventListener("click", e => {
        if (e.target.matches(".point")) {
            e.preventDefault();
            navigateTo(e.target.href);
        }
    });
    router();
});

