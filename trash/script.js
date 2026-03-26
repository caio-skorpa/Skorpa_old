function valorTotal(quantidade, valorAtual) {
    if (quantidade < 1) {
        quantidade = 1
    }
    return quantidade * valorAtual;
}
const inputQuantidade = document.querySelector('input[name="quantidade"]');
const inputValorAtual = document.querySelector('input[name="valorAtual"]');
const divValorAporte = document.getElementById("valorAporte");

function atualizarValor() {
    const quantidade = parseInt(inputQuantidade.value) || 0;
    const valorAtual = parseFloat(
        inputValorAtual.value.replace(",", ".")
    ) || 0;

    const total = valorTotal(quantidade, valorAtual);
    // com inner text eu troco o texto da div
    divValorAporte.innerText = `Total: R$ ${total.toFixed(2)}`;
}
//o comando addEventListener atualiza sempre que o elemento é alterado
//a função atualizarValor é executada para todas as vezes que o evento input acontecer
//se a função tivesse parenteses, seria executada no momento, e não no evento
inputQuantidade.addEventListener("input", atualizarValor);
inputValorAtual.addEventListener("input", atualizarValor);

//-------------parte que atualiza em tempo real valor de aporte------------------------------



const quantidades = document.querySelectorAll(".quantidade");//retorna lista
const precos = document.querySelectorAll(".precoAtual");
const totais = document.querySelectorAll(".total");

for (let i = 0; i < quantidades.length; i++) {
    const qtd = parseInt(quantidades[i].textContent);//innerHTML retorna string, textContent retorna o texto correto.

    const preco = parseFloat(
        precos[i].textContent
            .replace(".", "")   // remove ponto de milhar, se houver
            .replace(",", ".")  // troca vírgula por ponto
            .trim()  //tira os espacamentos
    );

    const total = qtd * preco;

    totais[i].innerText = total.toLocaleString("pt-BR", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    });
}
//-------------calculo do valor total------------------------------