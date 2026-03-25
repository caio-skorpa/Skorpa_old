import "dotenv/config";
import Brapi from "brapi";

const BP_API_KEY = process.env.BRAPI_API_KEY;
//OPÇÕES DO CLIENT PADRÃO 
const client = new Brapi({
    apiKey: BP_API_KEY, // Obrigatório
    environment: "production", // 'production' ou 'sandbox'
    maxRetries: 2, // Número de tentativas (padrão: 2)
    timeout: 60000, // Timeout em ms (padrão: 60000)
});

const sliderAssets = [
    "BBSE3",
    "WEGE3",
    "BBAS3",
    "CMIG4",
    "PETR4",
    "ITSA4",
    "POMO4",
    "VALE3",
    "ITUB4",
    "BBDC4",
    "ABEV3",
    "B3SA3",
    "RENT3",
    "SUZB3",
    "ELET3"
];//ideal seria ver as negociações do dia na bolsa e fazer esse array com as 15 ações mais negociadas

//minha implementação
async function getValueAssets(sliderAssets) {
    for (let i = 0; i < sliderAssets.length; i++) {
        const quote = await client.quote.retrieve(sliderAssets[i]);
        let assets = {
            symbol: quote.results[0].symbol,
            regularMarketPrice: quote.results[0].regularMarketPrice
        }
        console.log(assets);
        //console.log(quote);
    }
}
//implementação IA ABSURDAMENTE MELHOR E MAIS RÁPIDA USA PROMISSE ALL
async function getValueAssets2(sliderAssets) {
    const promises = sliderAssets.map(ticker =>
        client.quote.retrieve(ticker)
    );
    const results = await Promise.all(promises);
    const assets = results.map(quote => ({
        symbol: quote.results[0].symbol,
        regularMarketPrice: quote.results[0].regularMarketPrice
    })
    );

    console.log(assets);
}

getValueAssets(sliderAssets);
getValueAssets2(sliderAssets);

/*
try {
    
    
    const stocks = await client.quote.list();//lista de todas as stocks
    console.log(stocks.stocks[0]);
    const quoteWithModules = await client.quote.retrieve('PETR4', {
        modules: 'summaryProfile,balanceSheetHistory',
    });
    console.log(quoteWithModules.results[0].summaryProfile)//retorna diversas novos dados sobre a empresa.
} catch (error) {
    if (error instanceof Brapi.RateLimitError) {
        // Trate limite de requisições
    } else if (error instanceof Brapi.NotFoundError) {
        // Trate ticker não encontrado
    }
}
*/