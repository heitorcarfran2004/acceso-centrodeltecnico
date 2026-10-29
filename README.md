# Diagnósticos Visuales — app de membros dos 120 Diagnósticos Visuales (LATAM, espanhol)

Entrega do produto **120 Diagnósticos Visuales para Hardware y Software** (US$ 17, ticket único:
120 fichas + 4 bonos). App de uma página só (PWA), no estilo do app das Carteiras
(`apps/carteiras-membros`): mesma estrutura, componentes, animações e navegação, com a identidade
das fichas (preto, azul neon #22B8F0, Poppins nos títulos e Inter no texto, como em
`funis/diagnosticos-hardware-es`).

    node servidor.cjs     # http://localhost:4250

**Login de teste (só funciona em localhost/127.0.0.1):** `prueba@diagnosticosvisuales.com`.
No teste, o suporte grava no próprio aparelho (a Edge Function só aceita e-mail com compra paga).

## Abas e telas

| rota | o que é |
|---|---|
| `#inicio` | busca por síntoma (o recurso principal), continuar, categorias, favoritas, vistas, coleção (PDF e índice), bonos |
| `#fichas` | busca, 12 categorias, filtros Hardware / Software / Favoritas / Vistas, portada e índice |
| `#cat/<n>` | a categoria: faixa da abertura + as 10 fichas |
| `#ficha/<n>` | visor em tela cheia: pinça (até 5x), duplo toque, roda do mouse, arrastar, deslizar para trocar, favorita, índice, imprimir |
| `#pag/<capa\|indice\|catNN>` | capa, índice e aberturas no mesmo visor |
| `#bonos`, `#bono/<1-4>` | os 4 bonos em texto (checklist que marca, tabelas, imprimir) |
| `#como` | Cómo usar: os 6 blocos da ficha |
| `#ayuda` | 14 preguntas frecuentes, soporte (8 temas) e Mis mensajes |
| `#app` | instalar, **usar sin internet** (guarda as 120 fichas no aparelho, ~35 MB) e notificações |
| `#perfil` | nome, foto, experiência, fichas abertas e favoritas, sair |

Favoritas, vistas, checklist dos bonos e estado do sininho ficam no `localStorage`, por e-mail.

## Como é montado

- `index.html` é editado à mão (não é gerado).
- `node preparar.cjs` (rodar de qualquer pasta) refaz o conteúdo a partir de
  `~/Downloads/Diagnosticos de Hardware e Software/Entregavel ES/`:
  fichas webp 1086 px (tamanho nativo, para ler com zoom) + miniaturas 360 px, capa/índice/aberturas,
  as faixas das categorias (`assets/cats/`), a colagem do login, as capas dos bonos (da página de vendas),
  o PDF comprimido (`pdf/120-diagnosticos-visuales.pdf`, 25 MB) e o `datos.js`.
  `--dados` refaz só o `datos.js` (títulos das fichas em frase, síntomas e causas para a busca, e as
  3 primeiras pruebas de 16 fichas para o Bono 4).
- `bonos.js`: o texto dos bonos 1 a 3 (o 4 sai do `datos.js`, copiado do plano das fichas).
- `sw.js`: página e `datos.js` com rede primeiro; `/assets/` com cache primeiro (é o que faz as fichas
  abrirem sem internet). Ao trocar o conteúdo de algum arquivo de `/assets/`, troque o nome do cache
  (`dv-fichas-v1`) no `sw.js` e no `index.html` (objeto `OFF`).
- Ícone: `assets/icone.svg`, renderizado com o Chrome headless em `icon-512/192/180.png` e `logo-192.webp`.
- `capturas/`: screenshots de conferência (390 px e desktop). Fora do deploy (`.vercelignore`).

## Acesso (quem vê o quê)

Mesmo login dos outros apps: Edge Function `membros-acesso` (Supabase `dxybmayffxvepmwbyezc`), que lê
`membros_compras`. **O item deste produto é `diagnosticos-es`** e libera tudo (ticket único).
Suporte: Edge Function `membros-suporte`, tabela `membros_suporte`, `app = 'diagnosticos-es'`
(o protocolo sai com o prefixo `CC` da função). Push: `membros-push`, `app = 'diagnosticos-es'`.

`ACEITA_QUALQUER_COMPRA` (no começo do script do `index.html`) fica `false`.

### Pendente: checkout LATAM e webhook

O checkout ainda não existe, então **nenhuma Edge Function foi alterada nem publicada** e hoje nenhum
e-mail real entra (só o de teste). Quando o checkout existir:

1. Se for Wiapy, acrescentar em `apps/micanga-membros/supabase/functions/wiapy-webhook/mapa.ts`:

   ```ts
   // ── 120 Diagnósticos Visuales (LATAM, app diagnosticos-membros-es) ──
   export const CHECKOUT_DIAGNOSTICOS_ES = "<id do checkout>";
   // em itensDoPagamento(), antes do "if (ck === CHECKOUT_PRINCIPAL)":
   if (ck === CHECKOUT_DIAGNOSTICOS_ES) { out.push({ item: "diagnosticos-es", origem: ck }); return out; }
   ```

   Se for outro gateway (Hotmart, Kiwify, Stripe…), o webhook dele precisa gravar em `membros_compras`
   a linha `{ email, item: "diagnosticos-es", status: "paid" }`.
2. Publicar o webhook (MCP `deploy_edge_function`, verify_jwt false) e conferir o 1º evento em `membros_eventos`.
3. No e-mail de entrega do checkout, mandar o link do app.

## Publicar

Não publicado. Precisa de repo próprio e projeto na Vercel (o token do `gh` desta máquina não cria
repositório e o MCP da Vercel não cria projeto): o Heitor cria o repo, sobe esta pasta e importa na Vercel.
Os PDFs e as imagens somam ~60 MB e vão no repo. Domínio ainda não definido: com ele, o texto de
instalação no iPhone já usa `location.host` sozinho.
