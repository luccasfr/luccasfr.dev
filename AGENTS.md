# AGENTS.md

Landing page pessoal de Lucas Ferreira (luccasfr). Monorepo criado com Better-T-Stack + Turborepo, gerenciado com Bun.

## Estrutura

- `apps/web`: Vite + React 19 + TanStack Router. A LP vive aqui.
- `packages/ui`: componentes shadcn (estilo `base-lyra`, Base UI), utilitários e o CSS global do Tailwind 4 (`src/styles/globals.css`).
- `packages/config`: tsconfig base compartilhado.

## Comandos

```sh
bun install
bun run dev:web        # http://localhost:3001
bun run build
bun run check-types
```

Adicionar componente shadcn (sempre a partir de `apps/web`; o CLI grava em `packages/ui`):

```sh
cd apps/web && bunx shadcn@latest add <componente>
```

## Regras obrigatórias

### 1. shadcn para tudo

- **É proibido usar elemento nativo quando existe um candidato shadcn.** Exemplos: `<button>` → `Button`, `<input>` → `Input`, `<textarea>` → `Textarea`, `<select>` → `Select`, `<hr>` → `Separator`, `<dialog>`/modais → `Dialog`/`Sheet`, `<table>` → `Table`, `<label>` → `Label`, `<input type="checkbox">` → `Checkbox`, `<kbd>` → `Kbd`, `<progress>` → `Progress`, tooltips com `title` → `Tooltip`, avatares com `<img>` → `Avatar`, abas → `Tabs`, menus → `DropdownMenu`, paleta de comandos → `Command`, selos/etiquetas → `Badge`, blocos de conteúdo em caixa → `Card`.
- Se o componente necessário não existir em `packages/ui/src/components`, **adicione-o pelo CLI do shadcn** antes de usar. Não recrie à mão.
- Links que parecem botões usam `buttonVariants` (ou `Button` com `render`) — nunca um `<a>` estilizado do zero.
- Elementos estruturais/semânticos sem equivalente shadcn (`section`, `header`, `nav`, `main`, `footer`, `ul`, `li`, `p`, `h1`–`h6`, `a` de texto, `pre`, `code`) continuam permitidos.
- Não edite os arquivos gerados em `packages/ui/src/components` para customizações pontuais; passe `className`/variantes. Mudanças de sistema (novas variantes) são aceitas quando reaproveitáveis.

### 2. Tailwind CSS antes de qualquer CSS

- **É proibido CSS arbitrário quando o mesmo resultado é possível com Tailwind.** Nada de `style={{...}}`, arquivos `.css` por componente, CSS Modules ou styled-components.
- Tokens (cores, fontes, raios, animações) ficam em `packages/ui/src/styles/globals.css`, via variáveis CSS + `@theme`. Animações novas são declaradas como `--animate-*` + `@keyframes` dentro de `@theme` e usadas como classe (`animate-blink`).
- Prefira utilitários e escalas do tema a valores arbitrários (`p-4` em vez de `p-[17px]`). Valores arbitrários só quando não houver token adequado.
- CSS fora de `@theme`/`@layer base` só é aceito quando o Tailwind não consegue expressar (ex.: `@keyframes`, `@property`, `::selection`). Justifique com um comentário.
- `style` inline só para valores realmente dinâmicos em runtime (ex.: posição do mouse em variável CSS), e mesmo assim consumidos por classes Tailwind (`bg-[radial-gradient(...var(--x)...)]`).

### 3. React

- Sem `useEffect` direto; prefira estado derivado, handlers, `useSyncExternalStore` ou um hook dedicado (`useMountEffect`) isolado.

## Identidade visual

Preto e branco puros (`oklch(0 0 0)` / `oklch(1 0 0)`), sem cor de acento. Padrão escuro; o claro é a inversão exata.

- Fontes: Doto (matriz de pontos) só em títulos grandes (`font-display`, caixa-alta, peso 900); Geist Mono em todo o resto.
- Destaque = inversão: hover e item ativo viram bloco branco com texto preto (`bg-foreground text-background`). Nada de cinza "sujo" de fundo.
- Movimento com personalidade: nome do hero se decodifica (`ScrambleText`), títulos de seção re-embaralham no hover, cursor em bloco piscando, faixa de linguagens rolando, relógio de São Paulo ao vivo.
- Prints dos projetos em cor, num quadro com borda; nunca janela de navegador desenhada.
- Respeite `prefers-reduced-motion` (`motion-safe:`; `ScrambleText` já checa).

## Idiomas

- pt-BR e en-US. Todo texto visível vem de `apps/web/src/i18n/messages.ts` (`useI18n()` → `t`); nada de string solta em componente.
- Detecção: `navigator.language` igual a `pt-BR` → pt-BR; qualquer outro → en-US. A escolha manual (botão PT/EN ou Ctrl+K) fica em `localStorage["locale"]` e vence a detecção.
- `en-US` é tipado a partir de `pt-BR` (`Messages`): ao criar uma chave, preencha as duas línguas.

## Conteúdo

Textos em pt-BR e en-US. Projetos e fatos vêm de fontes reais (GitHub `luccasfr`, sites publicados). Não invente métricas, clientes ou datas.
