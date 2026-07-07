import { Router } from "express";
import { fetchNasa, upstreamRoutes, UpstreamError } from "./nasa.js";

export const router = Router();

router.get("/health", (_req, res) => {
  res.json({ status: "ok", routes: upstreamRoutes.map((r) => r.path) });
});

for (const route of upstreamRoutes) {
  router.get(route.path, async (req, res) => {
    try {
      const query = Object.fromEntries(
        Object.entries(req.query).map(([k, v]) => [k, String(v)]),
      );
      const data = await fetchNasa(route, query);
      res.json(data);
    } catch (err) {
      if (err instanceof UpstreamError) {
        res.status(err.status).json({ error: err.message });
        return;
      }
      res.status(502).json({ error: "Falha ao consultar a NASA.", details: (err as Error).message });
    }
  });
}
