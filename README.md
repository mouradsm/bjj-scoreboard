# Placar BJJ 🥋

Placar de Jiu-Jitsu (BJJ) para mesa de arbitragem, com **tela de controle** e **tela de exibição** para projetor/TV. Funciona **offline**, sem instalar nada, com fontes e sons embutidos.

**▶️ Abrir agora:** https://mouradsm.github.io/bjj-scoreboard/

---

## Recursos

- Dois atletas com **pontos, vantagens (VANT) e punições (PUN)** — botões +2 / +3 / +4 / +A / +P e os equivalentes para subtrair.
- Marcação de **STALLING** por atleta.
- **Cronômetro** com Iniciar/Pausar, Zerar, −30s/+30s e tempos prontos (4, 5, 6, 8, 10 min) e sinal sonoro no fim do tempo.
- **Encerrar Luta**: calcula o vencedor por pontos → vantagens → menos punições; em empate total, o árbitro decide.
- Desfazer, Trocar Lados e Nova Luta.
- Campos de Competição / Fase / Categoria exibidos no rodapé da tela de exibição.

## Como usar

1. Abra o app (link acima) — essa é a **tela de controle**.
2. Clique em **“Abrir Tela de Exibição ↗”** para abrir a tela do público.
3. Arraste essa janela para o segundo monitor / projetor e aperte **F11** (tela cheia).
4. Tudo que você lançar no controle aparece na hora na exibição.

> As duas telas precisam estar no **mesmo computador**. Recomendado: **Chrome** ou **Edge**.

## Instalar como aplicativo (PWA)

Abrindo o link no Chrome/Edge, aparece a opção **Instalar** (ícone na barra de endereço ou menu ⋮ → “Instalar Placar BJJ”). Depois de instalado, abre pelo ícone na área de trabalho e **funciona offline**.

## Versão para pen drive (arquivo único, sem servidor)

Se preferir algo que roda com **duplo clique**, sem internet e sem hospedagem, use a versão de arquivo único:

- [`Placar-BJJ-offline.zip`](Placar-BJJ-offline.zip) — contém `Placar BJJ.html` + instruções.
- Ou direto: [`offline/Placar BJJ.html`](offline/Placar%20BJJ.html)

## Estrutura do repositório

```
index.html              → aplicativo (versão PWA, é o site publicado)
manifest.webmanifest    → dados de instalação do PWA
sw.js                   → service worker (offline)
icons/                  → ícones do app
offline/                → versão de arquivo único (pen drive)
Placar-BJJ-offline.zip  → o mesmo, empacotado para download
```

## Detalhes técnicos

- Um único arquivo HTML autossuficiente: fontes (Barlow / Barlow Condensed) embutidas em base64, sem CDN, **zero requisições externas**.
- Sincronização controle ↔ exibição por `postMessage` (robusto até em `file://`), com `BroadcastChannel` + `localStorage` como reforço.
- Sem build, sem dependências.
- No fim do tempo o cronômetro apenas **para e toca o sinal** — o vencedor não é declarado automaticamente (o árbitro pode pontuar após o gongo). Declarar é feito no botão **Encerrar Luta**.
- Versão hospedada (PWA): quando há atualização, aparece um aviso **“Nova versão disponível — Recarregar”** na tela de controle; a atualização só é aplicada quando o usuário confirma. Para publicar uma nova versão, suba o número do cache em [`sw.js`](sw.js).

## Licença

[MIT](LICENSE) © 2026 Diego Moura
