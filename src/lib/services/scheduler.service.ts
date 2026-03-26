import cron from "node-cron";
import { updateQuotesCache } from "./quotes.service";

const SCHEDULER_INTERVAL = process.env.SCHEDULER_INTERVAL || "15"; // minutos

/**
 * Inicia o agendador de atualização de cotações
 * Executa a cada X minutos (configurável via env)
 */
export function startQuotesScheduler(): void {
  // Expressão cron: a cada X minutos
  const cronExpression = `*/${SCHEDULER_INTERVAL} * * * *`;

  console.log(
    `[Scheduler] Iniciando agendador de cotações (intervalo: ${SCHEDULER_INTERVAL} min)`
  );

  // Atualiza imediatamente ao iniciar
  updateQuotesCache().then(() => {
    console.log("[Scheduler] Cache inicial carregado");
  });

  // Agenda atualizações periódicas
  cron.schedule(cronExpression, async () => {
    console.log(
      `[Scheduler] Executando atualização agendada - ${new Date().toLocaleString("pt-BR")}`
    );
    await updateQuotesCache();
  });

  console.log("[Scheduler] Agendador configurado com sucesso");
}

/**
 * Para o agendador (caso necessário)
 */
export function stopQuotesScheduler(): void {
  cron.getTasks().forEach((task) => task.stop());
  console.log("[Scheduler] Agendador parado");
}
