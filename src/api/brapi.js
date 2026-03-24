import "dotenv/config";
import Brapi from "brapi";

const BP_API_KEY = process.env.BRAPI_API_KEY;

//OPÇÕES DO CLIENT PADRÃO
const client = new Brapi({
    apiKey: BP_API_KEY, // Obrigatório
    environment: 'production', // 'production' ou 'sandbox'
    maxRetries: 2, // Número de tentativas (padrão: 2)
    timeout: 60000, // Timeout em ms (padrão: 60000)
});

try {
    const quote = await client.quote.retrieve("BBSE3");
    console.log(quote)
    /*
    const quoteWithModules = await client.quote.retrieve('PETR4', {
        modules: 'summaryProfile,balanceSheetHistory',
    });
    console.log(quoteWithModules.results[0].summaryProfile)//retorna diversas novos dados sobre a empresa.
    */
} catch (error) {
    if (error instanceof Brapi.RateLimitError) {
        // Trate limite de requisições
    } else if (error instanceof Brapi.NotFoundError) {
        // Trate ticker não encontrado
    }
}
