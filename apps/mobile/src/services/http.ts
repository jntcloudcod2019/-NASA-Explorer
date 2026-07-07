/**
 * Cliente HTTP base dos serviços do NASA Explorer.
 * Todas as requisições passam pelo nosso serviço de API (apps/api), que guarda
 * a chave da NASA e faz cache — o app nunca fala com api.nasa.gov diretamente.
 *
 * Em dispositivo físico/emulador, defina EXPO_PUBLIC_API_URL apontando para o
 * IP da máquina que roda a API (ex: http://192.168.0.10:3333/api).
 */
const API_BASE_URL = process.env.EXPO_PUBLIC_API_URL ?? "http://localhost:3333/api";

export class ApiError extends Error {
  constructor(
    public status: number,
    message: string,
  ) {
    super(message);
  }
}

export type QueryParams = Record<string, string | number | boolean | undefined>;

export async function apiGet<T>(path: string, query: QueryParams = {}): Promise<T> {
  const url = new URL(API_BASE_URL + path);
  for (const [key, value] of Object.entries(query)) {
    if (value !== undefined) url.searchParams.set(key, String(value));
  }

  const response = await fetch(url.toString());

  if (!response.ok) {
    let message = `Falha na requisição (${response.status})`;
    try {
      const body = (await response.json()) as { error?: string };
      if (body.error) message = body.error;
    } catch {
      // corpo não-JSON — mantém a mensagem padrão
    }
    throw new ApiError(response.status, message);
  }

  return (await response.json()) as T;
}
