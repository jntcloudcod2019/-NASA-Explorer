# NASA Explorer — Documentação Oficial de Design

> **Portal Interativo sobre o Universo** · Powered by NASA APIs
> Documentação de UX, UI, Motion e Design System — versão 1.0 (Julho/2026)

---

## 1. Visão do Produto

O **NASA Explorer** é um portal web premium que transforma os dados abertos da NASA em uma experiência de exploração espacial imersiva. O usuário não "visita um site" — ele **entra no espaço**: navega entre planetas, acompanha asteroides em tempo real, observa a Terra do ponto de vista de satélites e descobre exoplanetas a centenas de anos-luz.

**Sentimentos-alvo (nesta ordem):** admiração → curiosidade → descoberta → retorno.

**Barra de qualidade:** Apple, NASA.gov, SpaceX, National Geographic, vencedores do Awwwards.

### Princípios de Design

| # | Princípio | O que significa na prática |
|---|-----------|---------------------------|
| P1 | **O espaço é o palco, os dados são as estrelas** | O background imersivo nunca compete com o conteúdo. Dados científicos sempre legíveis em primeiro plano. |
| P2 | **Cinematográfico, nunca barulhento** | Movimento lento, easing suave, silêncio visual. Nada pisca, nada grita. |
| P3 | **Ciência com reverência** | Dados reais, fontes citadas, unidades corretas. Precisão é parte da estética. |
| P4 | **Descoberta progressiva** | Superfície simples, profundidade opcional. Cada tela oferece "um passo a mais" para quem quiser. |
| P5 | **Acessível por padrão** | WCAG AA não é modo alternativo — é a base. Som e movimento são sempre opt-in/reduzíveis. |
| P6 | **Performance é UX** | Toda espera é coreografada (skeleton, streaming). O universo carrega antes do usuário perceber. |

### Marca

- **Marca principal:** NASA Explorer (wordmark próprio — ver [04-design-system-fundacoes.md](04-design-system-fundacoes.md#8-marca-e-logotipo)).
- **NASA:** aparece exclusivamente como colaboradora de dados, no selo "Powered by NASA APIs" (footer, página Sobre e telas de crédito de mídia). Nunca como marca principal.

---

## 2. Índice da Documentação

| Doc | Arquivo | Conteúdo |
|-----|---------|----------|
| 00 | Este arquivo | Visão, princípios, índice, como usar |
| 01 | [Estratégia e Personas](01-estrategia-e-personas.md) | Personas, jornadas, JTBD |
| 02 | [Arquitetura da Informação](02-arquitetura-informacao.md) | Sitemap, mapa de navegação, taxonomia, mapeamento API↔página |
| 03 | [Fluxos de Usuário](03-fluxos-de-usuario.md) | Fluxos principais com diagramas |
| 04 | [Design System — Fundações](04-design-system-fundacoes.md) | Cores, tipografia, espaçamento, grid, sombras, glass, ícones, marca |
| 05 | [Design System — Componentes](05-design-system-componentes.md) | Catálogo completo de componentes com estados |
| 06 | [Background e Imersão](06-background-e-experiencia-imersiva.md) | O universo vivo em camadas, parallax, fallbacks |
| 07 | [Experiência Sonora](07-experiencia-sonora.md) | Trilha ambiente, SFX, controles, regras anti-irritação |
| 08 | [Animações e Microinterações](08-animacoes-e-microinteracoes.md) | Tokens de motion, catálogo de animações, coreografias |
| 09 | [Navegação](09-navegacao.md) | Sidebar, mega menu, busca, breadcrumb, histórico, mobile |
| 10 | [Páginas — Home](10-paginas-home.md) | As 14 seções da landing page |
| 11 | [Páginas — Exploração](11-paginas-exploracao.md) | APOD, NeoWs, DONKI, EONET, EPIC, Exoplanetas, GIBS, Mars Weather, Image Library |
| 12 | [Páginas — Científicas e Treks](12-paginas-cientificas-e-treks.md) | OSDR, SSC, SSD/CNEOS, TechPort, Tech Transfer, TLE, Moon/Mars/Vesta Trek |
| 13 | [Páginas — Utilitárias](13-paginas-utilitarias.md) | Busca, Favoritos, Perfil, Configurações, Sobre, Contato, FAQ |
| 14 | [Responsividade](14-responsividade.md) | Breakpoints, adaptações por componente e página |
| 15 | [Acessibilidade](15-acessibilidade.md) | WCAG AA, teclado, leitores de tela, reduced motion, alto contraste |
| 16 | [Performance UX](16-performance-ux.md) | Skeleton, lazy, prefetch, cache, virtualização, orçamentos |
| 17 | [Recomendações e Roadmap](17-recomendacoes-e-roadmap.md) | Recomendações de UX, melhorias futuras, roadmap MVP→V2 |

---

## 3. Como usar esta documentação (guia do implementador)

1. **Leia nesta ordem:** 00 → 04 (tokens) → 05 (componentes) → 06–08 (imersão/motion) → 09 (navegação) → 10–13 (páginas). Os docs 01–03 dão o "porquê"; 14–16 são transversais e devem ser consultados a cada página; 17 orienta priorização.
2. **Tokens são a fonte da verdade.** Nenhuma cor, espaçamento, duração ou easing deve ser hardcoded — todos os valores nomeados em [04](04-design-system-fundacoes.md) e [08](08-animacoes-e-microinteracoes.md) mapeiam 1:1 para CSS variables / theme.
3. **Template de página.** Toda página nos docs 10–13 segue o mesmo template (abaixo). Se um campo não estiver especificado para uma página, aplique o padrão global do componente correspondente.
4. **Estados obrigatórios.** Toda view que consome API deve implementar os 5 estados: `loading (skeleton)`, `success`, `empty`, `error`, `rate-limited` — especificados em [05 §14](05-design-system-componentes.md) e [16](16-performance-ux.md).
5. **Acessibilidade e reduced motion não são opcionais.** Cada animação do doc 08 tem um fallback definido em [15](15-acessibilidade.md).

### Template padrão de especificação de página

```
1. Objetivo            — o que o usuário consegue fazer/sentir aqui
2. API / Dados         — endpoints, campos exibidos, frequência de atualização
3. Wireframe textual   — estrutura em blocos, desktop-first
4. Componentes         — referências ao doc 05
5. Navegação           — como se chega e para onde se vai
6. Microinterações     — hover, focus, gestos, som
7. Estados             — loading / success / empty / error / rate-limited
8. Responsividade      — o que muda em tablet / mobile / ultrawide
9. Fluxo do usuário    — passo a passo do caminho feliz + desvios
```

### Glossário rápido

- **Deck** — painel de dados glassmórfico sobre o background espacial (componente base de conteúdo).
- **HUD** — camada fixa de interface (navegação, controles de som, breadcrumb) que "flutua" sobre o universo.
- **Universo vivo** — o background animado multicamadas (doc 06).
- **Opt-in sonoro** — nenhum som toca sem ação explícita do usuário (doc 07).
