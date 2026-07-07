import { apiGet, type QueryParams } from "../http";
import type { ApodItem, ApodQuery } from "./types";

function toQueryParams(query: ApodQuery): QueryParams {
  return {
    date: query.date,
    start_date: query.startDate,
    end_date: query.endDate,
    count: query.count,
    thumbs: query.thumbs,
  };
}

/** Imagem Astronômica do Dia (de hoje, ou de uma data específica via `date`). */
export function getApod(query: ApodQuery = {}): Promise<ApodItem> {
  return apiGet<ApodItem>("/apod", toQueryParams(query));
}

/** Lista de APODs num intervalo de datas (inclusive). */
export function getApodRange(startDate: string, endDate?: string, thumbs?: boolean): Promise<ApodItem[]> {
  return apiGet<ApodItem[]>("/apod", toQueryParams({ startDate, endDate, thumbs }));
}

/** N APODs aleatórios. */
export function getApodRandom(count: number, thumbs?: boolean): Promise<ApodItem[]> {
  return apiGet<ApodItem[]>("/apod", toQueryParams({ count, thumbs }));
}
