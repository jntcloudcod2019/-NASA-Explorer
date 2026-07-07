# 01 · Estratégia e Personas

← [Índice](00-README.md) · próximo: [02 · Arquitetura da Informação](02-arquitetura-informacao.md)

---

## 1. Estratégia de Experiência

### 1.1 Arco emocional-alvo

Toda sessão deve percorrer (total ou parcialmente) o arco:

```
CHEGADA          EXPLORAÇÃO         APROFUNDAMENTO      RETORNO
"Uau."       →   "O que é isso?" →  "Quero entender" →  "Volto amanhã"
(admiração)      (curiosidade)      (descoberta)        (hábito)
```

**Mecanismos por etapa:**

| Etapa | Mecanismo de design |
|---|---|
| Admiração | Hero cinematográfico, universo vivo, tipografia display, trilha opcional |
| Curiosidade | Cards com dados vivos ("um asteroide passa pela Terra HOJE"), tooltips ricos, hotspots |
| Descoberta | Painéis de detalhe em camadas, "Saiba mais", conexões entre páginas ("este evento solar afeta este satélite") |
| Hábito | Conteúdo diário (APOD, clima espacial), favoritos, histórico, notificação de eventos (V2) |

### 1.2 Jobs To Be Done (JTBD)

1. *"Quando quero me inspirar ou relaxar, quero mergulhar em imagens e sons do espaço, para sentir admiração sem esforço."*
2. *"Quando preparo uma aula, quero encontrar rapidamente imagens e dados confiáveis com crédito, para ensinar com material real da NASA."*
3. *"Quando ouço uma notícia espacial (asteroide, tempestade solar), quero verificar os dados oficiais, para entender o risco real."*
4. *"Quando pesquiso um tema (exoplanetas, Marte), quero navegar dos conceitos aos dados brutos, para ir tão fundo quanto eu precisar."*
5. *"Quando encontro algo incrível, quero guardar e reencontrar depois, para construir minha coleção do universo."*

---

## 2. Personas

> 6 personas primárias. Cada página dos docs 10–13 indica quais personas atende prioritariamente.

### PE-01 · Lara, 16 — Estudante

- **Contexto:** ensino médio, usa celular em 90% do tempo, descobriu o site por um vídeo curto.
- **Objetivos:** conteúdo visual impressionante para trabalhos escolares; entender "o básico" sem jargão.
- **Frustrações:** sites científicos "feios e difíceis"; textos longos; inglês técnico.
- **Necessidades de design:** mobile impecável, linguagem simples com glossário embutido, botão de compartilhar/baixar imagem com crédito automático.
- **Páginas-chave:** Home, APOD, NASA Image Library, Descubra Planetas.

### PE-02 · Prof. Marcos, 42 — Professor de Física

- **Contexto:** prepara aulas no notebook à noite; precisa de material confiável e citável.
- **Objetivos:** montar aulas com dados reais; projetar visualizações em sala.
- **Frustrações:** dados sem fonte; imagens sem resolução ou licença clara.
- **Necessidades de design:** modo de projeção limpo (fullscreen dos visualizadores), citação/fonte em 1 clique, download em alta resolução, favoritos organizados.
- **Páginas-chave:** APOD, EPIC, GIBS, Exoplanetas, EONET, Favoritos.

### PE-03 · Dra. Yuki, 34 — Astrônoma/Cientista

- **Contexto:** pesquisadora; usa o portal para monitorar eventos e como "dashboard bonito" de dados que já conhece.
- **Objetivos:** acesso rápido aos dados brutos (JSON/CSV), filtros precisos, links para as fontes originais (SSD, OSDR).
- **Frustrações:** interfaces que escondem os dados atrás de "storytelling"; falta de unidades/precisão.
- **Necessidades de design:** tabelas densas com ordenação/exportação, tipografia mono para valores, link direto ao endpoint/fonte, atalhos de teclado.
- **Páginas-chave:** SSD/CNEOS, DONKI, SSC, TLE, Open Science Data, Exoplanetas.

### PE-04 · Rafael, 28 — Entusiasta de astronomia

- **Contexto:** acompanha lançamentos e astrofotografia; power user desktop; deseja "morar" no site.
- **Objetivos:** acompanhar tudo em tempo real; explorar mapas planetários por horas.
- **Frustrações:** dados desatualizados; experiências rasas.
- **Necessidades de design:** dashboards em tempo real, Treks profundos, histórico e favoritos, sons e imersão no máximo.
- **Páginas-chave:** DONKI, NeoWs, Moon/Mars/Vesta Trek, Clima Espacial, Satélites.

### PE-05 · Sofia, 9 (com responsável) — Criança

- **Contexto:** usa tablet com a mãe; adora planetas.
- **Objetivos:** ver "coisas do espaço" bonitas; interagir tocando.
- **Frustrações:** texto demais; interfaces pequenas.
- **Necessidades de design:** alvos de toque grandes, imagens em primeiro lugar, curiosidades curtas, zero conteúdo assustador por padrão (linguagem de risco de asteroides sempre factual e calma).
- **Páginas-chave:** Home, Descubra Planetas, APOD, Moon Trek.

### PE-06 · Antônio, 58 — Público geral

- **Contexto:** leu manchete sobre "tempestade solar"; chegou via busca; primeira visita.
- **Objetivos:** entender a notícia em 2 minutos; confiar no que lê.
- **Frustrações:** sensacionalismo; não saber onde clicar.
- **Necessidades de design:** hierarquia clara, resposta imediata na primeira dobra, texto com bom contraste e tamanho, navegação óbvia, sem exigir cadastro.
- **Páginas-chave:** Home, Clima Espacial (DONKI), NeoWs, FAQ.

### Matriz persona × prioridade de dispositivo

| Persona | Mobile | Tablet | Desktop | Ultrawide |
|---|---|---|---|---|
| Lara | ●●● | ● | ● | – |
| Marcos | ● | ●● | ●●● | ● |
| Yuki | ● | – | ●●● | ●● |
| Rafael | ●● | ● | ●●● | ●●● |
| Sofia | ● | ●●● | ● | – |
| Antônio | ●● | ● | ●● | – |

---

## 3. Jornadas do Usuário

### J1 · Primeira visita (Antônio, mobile) — "da manchete à confiança"

| Etapa | Ação | Estado emocional | Design que suporta |
|---|---|---|---|
| 1 | Chega na Home via busca | Cético | Hero carrega < 2s, título claro, sem popup |
| 2 | Vê seção "Universo em Tempo Real" | Curioso | Card "Clima Espacial: atividade solar moderada" com selo de fonte NASA |
| 3 | Toca no card → página DONKI | Interessado | Resumo em linguagem simples no topo; detalhes técnicos abaixo |
| 4 | Lê explicação "o que isso significa para você" | Tranquilizado | Bloco educativo padrão em toda página de dados |
| 5 | Explora "conteúdos relacionados" | Engajado | Cards de NeoWs e EPIC no rodapé da página |

**Momento da verdade:** etapa 3 — se o dado parecer sensacionalista ou confuso, ele sai. Tom sempre factual e calmo.

### J2 · Ritual diário (Rafael, desktop) — "o café com o universo"

1. Abre a Home → HUD mostra "novidades desde sua última visita" (badge no histórico).
2. Vai direto ao APOD do dia (atalho `g a`), aprecia em fullscreen, favorita.
3. Confere dashboard DONKI: flares das últimas 24h, gráfico de vento solar.
4. Passa 20 min no Mars Trek explorando o local do rover.
5. Sai — sessão salva no histórico; favoritos sincronizados no perfil.

### J3 · Preparando aula (Marcos, notebook) — "do acervo à sala de aula"

1. Busca global: "eclipse" → resultados agrupados por fonte (Image Library, APOD, EPIC).
2. Filtra por imagens em alta resolução; abre 4 em abas de painel.
3. Favorita em uma coleção "Aula – Eclipses".
4. Usa "modo apresentação" do visualizador (UI some, imagem + legenda).
5. Copia citação formatada com 1 clique.

### J4 · Verificação científica (Yuki, desktop) — "direto ao dado"

1. Entra direto em SSD/CNEOS via favorito do navegador.
2. Filtra close-approaches por distância < 1 LD, próximos 30 dias.
3. Ordena tabela por incerteza; abre o objeto no painel de detalhe.
4. Exporta CSV; abre o link para o endpoint original da NASA.

### J5 · Exploração lúdica (Sofia + mãe, tablet) — "tocar o espaço"

1. Home → seção "Descubra Planetas"; Sofia toca em Saturno.
2. Planeta gira em 3D suave; curiosidades em cards de 1 frase.
3. Mãe ativa o som ambiente; exploram a Lua no Moon Trek com pinch-zoom.
4. Salvam uma imagem "para mostrar ao papai" (download com crédito).

---

## 4. Anti-metas (o que o produto NÃO é)

- **Não é um portal de notícias** — sem feed infinito, sem manchetes apelativas.
- **Não é um jogo** — gamificação (V2) será sutil: coleções e marcos de exploração, sem pontos/ranking agressivos.
- **Não é um espelho do site da NASA** — curadoria e experiência próprias; NASA é a fonte, não o template.
- **Não exige cadastro** — perfil é opcional e só adiciona persistência entre dispositivos.
