export async function register() {
  if (process.env.NEXT_RUNTIME === "nodejs") {
    const { startQuotesScheduler } = await import(
      "@/lib/services/scheduler.service"
    );
    startQuotesScheduler();
  }
}
