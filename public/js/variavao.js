const medio = document.querySelectorAll(".precoMedio");
const variacao = document.querySelectorAll(".variacao");
const precoAtual = document.querySelectorAll(".precoAtual");

for (let i = 0; i < medio.length; i++) {
  const preco = parseFloat(
    precoAtual[i].textContent
      .replace(".", "")
      .replace(",", ".")
      .trim()
  );
  const medioFormat = parseFloat(
    medio[i].textContent
      .replace(".", "")
      .replace(",", ".")
      .trim()
  );
  const divisao = (preco * 100) / medioFormat - 100;
  variacao[i].innerText = divisao > 0 ? `+${divisao.toFixed(3).replace(".", ",")}%` : `${divisao.toFixed(3).replace(".", ",")}%`
}
variacao.forEach(el => {
  const valor = parseFloat(el.innerText.replace(',', '.'));
  el.style.color = valor > 0 ? 'rgb(26, 190, 20)' : 'rgb(212, 14, 14)'
});
