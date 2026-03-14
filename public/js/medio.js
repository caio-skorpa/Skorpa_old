const ativo = "WEGE3";
const lancamento = [
  { valor: 15.1, quantidade: 5 },
  { valor: 20.23, quantidade: 3 },
  { valor: 30.2, quantidade: 10 },
];

const valorAporte = lancamento.map((e) => {
  return e.valor * e.quantidade;
});
let somaValorAporte = 0;
valorAporte.forEach((e) => {
  return (somaValorAporte += e);
});

const quantidadeTotal = lancamento.reduce((contador, e) => {
  return (contador += e.quantidade);
}, 0);

const medio = (dividendo, divisor) => {
  return dividendo / divisor;
};
console.log(medio(somaValorAporte, quantidadeTotal).toFixed(2));
