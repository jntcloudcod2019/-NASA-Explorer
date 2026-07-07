import { config } from "./config.js";
import { cacheGet, cacheSet } from "./cache.js";

export interface UpstreamRoute {
  /** Caminho exposto pela nossa API, ex: "/apod" */
  path: string;
  /** URL base do serviço NASA (sem query string) */
  upstream: string;
  /** Se o serviço exige api_key de api.nasa.gov */
  needsKey: boolean;
  /** TTL de cache em segundos (sobrepõe o padrão) */
  ttlSeconds?: number;
  description: string;
}

/**
 * Tabela de serviços NASA expostos pelo proxy.
 * Rotas com sufixo dinâmico (ex: /neo/:id) são resolvidas em routes.ts.
 */
export const upstreamRoutes: UpstreamRoute[] = [
  { path: "/apod", upstream: "https://api.nasa.gov/planetary/apod", needsKey: true, ttlSeconds: 3600, description: "Astronomy Picture of the Day" },
  { path: "/neo/feed", upstream: "https://api.nasa.gov/neo/rest/v1/feed", needsKey: true, description: "NeoWs — asteroides próximos por data" },
  { path: "/neo/browse", upstream: "https://api.nasa.gov/neo/rest/v1/neo/browse", needsKey: true, description: "NeoWs — catálogo de asteroides" },
  { path: "/donki/flr", upstream: "https://api.nasa.gov/DONKI/FLR", needsKey: true, description: "DONKI — erupções solares" },
  { path: "/donki/cme", upstream: "https://api.nasa.gov/DONKI/CME", needsKey: true, description: "DONKI — ejeções de massa coronal" },
  { path: "/donki/gst", upstream: "https://api.nasa.gov/DONKI/GST", needsKey: true, description: "DONKI — tempestades geomagnéticas" },
  { path: "/donki/notifications", upstream: "https://api.nasa.gov/DONKI/notifications", needsKey: true, description: "DONKI — alertas de clima espacial" },
  { path: "/eonet/events", upstream: "https://eonet.gsfc.nasa.gov/api/v3/events", needsKey: false, description: "EONET — eventos naturais na Terra" },
  { path: "/epic/natural", upstream: "https://api.nasa.gov/EPIC/api/natural/images", needsKey: true, ttlSeconds: 3600, description: "EPIC — imagens da Terra (luz natural)" },
  { path: "/mars/weather", upstream: "https://api.nasa.gov/insight_weather/", needsKey: true, ttlSeconds: 3600, description: "InSight — clima em Marte" },
  { path: "/images/search", upstream: "https://images-api.nasa.gov/search", needsKey: false, description: "NASA Image and Video Library" },
  { path: "/ssd/cad", upstream: "https://ssd-api.jpl.nasa.gov/cad.api", needsKey: false, description: "SSD/CNEOS — close approaches" },
  { path: "/techport/projects", upstream: "https://api.nasa.gov/techport/api/projects", needsKey: true, description: "TechPort — projetos de tecnologia" },
  { path: "/techtransfer/patents", upstream: "https://api.nasa.gov/techtransfer/patent/", needsKey: true, description: "Technology Transfer — patentes" },
  { path: "/tle", upstream: "https://tle.ivanstanojevic.me/api/tle", needsKey: false, description: "TLE — elementos orbitais de satélites" },
  { path: "/exoplanets", upstream: "https://exoplanetarchive.ipac.caltech.edu/TAP/sync", needsKey: false, description: "Exoplanet Archive (TAP/ADQL)" },
];

export class UpstreamError extends Error {
  constructor(
    public status: number,
    message: string,
  ) {
    super(message);
  }
}

/**
 * Busca um recurso na NASA com autenticação, cache e tratamento de rate limit.
 * `query` é repassado ao upstream; a api_key nunca sai do servidor.
 */
export async function fetchNasa(
  route: UpstreamRoute,
  query: Record<string, string>,
  extraPath = "",
): Promise<unknown> {
  const url = new URL(route.upstream + extraPath);
  for (const [k, v] of Object.entries(query)) url.searchParams.set(k, v);
  if (route.needsKey) url.searchParams.set("api_key", config.nasaApiKey);

  const cacheKey = url.toString();
  const cached = cacheGet<unknown>(cacheKey);
  if (cached !== undefined) return cached;

  const res = await fetch(url);

  if (res.status === 429) {
    throw new UpstreamError(429, "Limite de requisições da NASA atingido. Tente novamente em instantes.");
  }
  if (!res.ok) {
    throw new UpstreamError(res.status, `NASA respondeu ${res.status} para ${route.path}`);
  }

  const contentType = res.headers.get("content-type") ?? "";
  const data = contentType.includes("json") ? await res.json() : await res.text();

  cacheSet(cacheKey, data, route.ttlSeconds ?? config.cacheTtlSeconds);
  return data;
}
