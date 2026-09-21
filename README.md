# Site Renata Anoana

Protótipo de vitrine para a **Renata Anoana Pratas** (pratas com pedras naturais), com cards de produto e botão de compra que abre o WhatsApp com uma mensagem já preenchida.

## Como abrir

Dê dois cliques em `index.html`. É um arquivo único, autocontido — todo o CSS, JavaScript, imagens dos produtos e a logo estão embutidos nele. Não precisa de servidor, internet (exceto para carregar as fontes do Google Fonts) nem de nenhuma outra pasta ou arquivo.

Prévia publicada (para enviar o link sem precisar do arquivo): https://claude.ai/artifact/WWdZ877QorF86XxecZprRt

## Dados de contato usados no site

- **WhatsApp:** (62) 9 9651-4773 — todos os botões de compra levam para `wa.me/556296514773` com uma mensagem pronta mencionando a peça e o preço.

## Estrutura do catálogo

O site tem 5 categorias de filtro: Anéis, Colares, Brincos, Pulseiras e Conjuntos (peças que aparecem juntas na mesma foto, como anel + brinco).

| Produto | Categoria | Preço |
|---|---|---|
| Conjunto Coral Vermelho | Conjuntos | R$ 379,90 |
| Colar Lua de Turquesa | Colares | R$ 259,90 |
| Anel Rosa Vermelha | Anéis | R$ 179,90 |
| Conjunto Esmeralda Vintage | Conjuntos | R$ 459,90 |
| Conjunto Rubi Vintage | Conjuntos | R$ 429,90 |
| Brinco Gota Turquesa | Brincos | R$ 169,90 |
| Bracelete Prata Lisa | Pulseiras | R$ 219,90 |
| Conjunto Pedra Verde | Conjuntos | R$ 329,90 |

> ⚠️ **Os preços acima foram estimados**, já que não foram informados pela Renata Anoana. Confirme os valores reais antes de divulgar o site.

## Identidade visual

- **Paleta:** verde escuro + dourado + marfim, com versão automática para modo escuro do navegador.
- **Tipografia:** Cormorant Garamond (títulos) + Manrope (texto).
- **Logo/favicon:** o monograma "RA" enviado pela Renata Anoana, embutido tanto no selo do cabeçalho quanto no ícone da aba do navegador.

## Como editar

Abra o `index.html` em qualquer editor de texto (Bloco de Notas, VS Code etc.).

- **Trocar nome, preço ou texto de um produto:** procure pelo título do produto (ex.: `Anel Rosa Vermelha`) e edite o texto dentro das tags `<h3>` e `<span class="price">`.
- **Trocar o número de WhatsApp:** procure por `556296514773` (aparece uma vez no cabeçalho, uma no botão flutuante e uma em cada produto) e substitua em todas as ocorrências.
- **Trocar uma foto de produto:** é preciso converter a nova imagem para o formato base64 e substituir o conteúdo depois de `data:image/jpeg;base64,` daquele card. Se não tiver como fazer isso manualmente, me envie a foto nova que eu atualizo o arquivo.
- **Adicionar um produto novo:** copie um bloco `<article class="card" ...> ... </article>` inteiro, cole antes do `</section>` do catálogo, e ajuste categoria, título, preço, link e foto.

## Observações

Este é um protótipo de apresentação comercial — antes de publicar oficialmente, revise preços, textos e fotos com a Renata Anoana.
