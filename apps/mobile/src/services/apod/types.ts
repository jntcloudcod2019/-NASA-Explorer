/** Item retornado pela APOD (Astronomy Picture of the Day) da NASA. */
export interface ApodItem {
  /** Data da imagem no formato AAAA-MM-DD */
  date: string;
  title: string;
  explanation: string;
  /** URL da mídia (imagem ou vídeo) */
  url: string;
  /** URL da imagem em alta resolução (apenas quando media_type = "image") */
  hdurl?: string;
  media_type: "image" | "video";
  service_version: string;
  /** Presente quando a imagem não é de domínio público */
  copyright?: string;
  /** URL da miniatura do vídeo (apenas com thumbs=true e media_type = "video") */
  thumbnail_url?: string;
}

/** Parâmetros de consulta da APOD (ver docs api.nasa.gov). */
export interface ApodQuery {
  /** Data específica (AAAA-MM-DD). Não pode ser usada com startDate/endDate/count. */
  date?: string;
  /** Início do intervalo de datas (AAAA-MM-DD) */
  startDate?: string;
  /** Fim do intervalo de datas (AAAA-MM-DD); padrão: hoje */
  endDate?: string;
  /** Retorna N imagens aleatórias. Não pode ser usado com date/startDate/endDate. */
  count?: number;
  /** Retorna thumbnail_url quando a mídia é vídeo */
  thumbs?: boolean;
}
