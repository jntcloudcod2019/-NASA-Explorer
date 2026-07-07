# NASA Explorer

Portal interativo sobre o Universo, consumindo APIs oficiais da NASA. Monorepo com app mobile (React Native/Expo) e um serviço de API próprio que autentica e faz proxy das requisições à NASA.

## Estrutura

```
apps/
  mobile/   App React Native (Expo) + NativeWind
  api/      Serviço Node/Express que autentica e faz proxy das APIs da NASA
```

## Design System

- **Tokens** em [`apps/mobile/src/design/tokens`](apps/mobile/src/design/tokens) (cores, tipografia, espaçamento) — única fonte da verdade, consumida pelo `tailwind.config.js`.
- **Componentes** em [`apps/mobile/src/components`](apps/mobile/src/components), um por pasta (`Component.tsx` + `index.ts`), com variantes tipadas via `class-variance-authority` e classes NativeWind derivadas dos tokens — nunca `StyleSheet`/estilo inline.
- Componentes atuais: `Text`, `Button`, `Card`, `Badge`, `Skeleton`.

## Rodando o projeto

```bash
npm install

# API (proxy autenticado das APIs da NASA)
cp apps/api/.env.example apps/api/.env   # defina sua NASA_API_KEY (https://api.nasa.gov)
npm run api

# App mobile
npm run mobile        # abre o Expo (dev client / QR code)
npm run mobile:web    # roda no navegador
```

A API expõe as rotas em `http://localhost:3333/api/*` (ex: `/api/apod`, `/api/neo/feed`, `/api/donki/flr`). A chave da NASA nunca é exposta ao app — toda requisição passa pelo serviço de API.
