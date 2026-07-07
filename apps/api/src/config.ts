import "dotenv/config";

export const config = {
  port: Number(process.env.PORT ?? 3333),
  nasaApiKey: process.env.NASA_API_KEY ?? "DEMO_KEY",
  cacheTtlSeconds: Number(process.env.CACHE_TTL_SECONDS ?? 300),
};

if (config.nasaApiKey === "DEMO_KEY") {
  console.warn(
    "[api] NASA_API_KEY não definida — usando DEMO_KEY (limite de 30 req/h). " +
      "Obtenha uma chave gratuita em https://api.nasa.gov e defina no .env",
  );
}
