import "dotenv/config";
import Brapi from "brapi";

const BP_API_KEY = process.env.BRAPI_API_KEY;

const client = new Brapi({
    apiKey: BP_API_KEY,
});

try {
    const quote = await client.quote.retrieve("BBSE3");
    console.log(quote)
} catch (error) {
    if (error instanceof Brapi.RateLimitError) {
        // Trate limite de requisições
    } else if (error instanceof Brapi.NotFoundError) {
        // Trate ticker não encontrado
    }
}
