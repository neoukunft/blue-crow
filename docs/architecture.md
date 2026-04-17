# 🧠 BlueCrow Architecture & Design Rationale

> 🚧 **Status: em evolução** — a API pode mudar conforme o core amadurece.

---

## 🐦‍⬛ Visão

O **BlueCrow** trata layout como uma **camada programável de infraestrutura**, não apenas como CSS declarativo.

Em vez de adaptar componentes ao layout, o layout passa a **responder ao contexto do container e ao estado da aplicação**.

> *“Não é sobre fazer o componente caber na tela, é sobre fazer a tela entender o componente.”*

---

## 🎯 Problemas que motivaram o design

A arquitetura nasce de dores recorrentes em projetos Angular em escala:

---

### 📐 Layout e Responsividade

**Problemas comuns:**

* “How to change CSS Grid from TypeScript?”
* Layout dinâmico gera bindings excessivos (`[style.*]`)
* Media queries falham em layouts dentro de containers (sidebar, modal)
* `ExpressionChangedAfterItHasBeenCheckedError` ao reagir ao DOM

**Decisão:**

* Usar **CSS Variable Bridge** → TS altera variáveis, CSS renderiza
* Responsividade baseada em **container (ResizeObserver)**, não viewport
* Uso de **Signals** para evitar conflitos com ciclo de detecção do Angular

---

### 🛣️ Roteamento e Acoplamento

**Problemas comuns:**

* Arquivo central de rotas vira ponto de conflito em times grandes
* Boilerplate para hooks globais (telemetria, logs, auth)
* Baixa modularização de páginas

**Decisão:**

* Decorator `@Page` para **auto-registro de rotas**
* Injeção de lifecycle comum no prototype
* Componente passa a ser **dono da sua própria rota**

---

### 🔮 Comunicação e Ciclo de Vida

**Problemas comuns:**

* “Communication between Directive and Component”
* Excesso de `@Output` ou services compartilhados
* Memory leaks com `ResizeObserver` / `MutationObserver`

**Decisão:**

* **Registry reativo (Signals)** para descoberta de layouts (`getLayout`)
* Comunicação desacoplada via lookup
* Cleanup centralizado no `.destroy()`

---

## 🧩 Principais abstrações

| Abstração           | Papel                    | Benefício                               |
| ------------------- | ------------------------ | --------------------------------------- |
| `BlueCrowLayout`    | Engine de layout         | Orquestra grid, áreas e responsividade  |
| `data-area`         | Target-based positioning | Remove dependência da hierarquia do DOM |
| CSS Variable Bridge | Ponte TS → CSS           | Performance nativa do browser           |
| Registry (Signals)  | Descoberta reativa       | Comunicação sem acoplamento             |

---

## ⚙️ Modelo de funcionamento

### 1. Estrutura (DOM)

```html
<main blueCrowLayout="main-grid">
  <aside data-area="sidebar"></aside>
  <section data-area="content"></section>
</main>
```

---

### 2. Orquestração (TS)

```ts
const layout = getLayout('main-grid');

layout()?.setup({
  columns: ['250px', '1fr'],
  boxModel: { spaceBetweenThem: 20 }
});

layout()?.responsive.set(
  { maxWidth: 768 },
  { columns: ['1fr'], direction: 'column' }
);

layout()?.setArea('sidebar', {
  column: 1,
  row: '1 / 3'
});
```

---

## 🎨 Ponte de renderização (CSS)

O CSS permanece simples e performático:

```css
.grid { display: grid; }

.grid-template-columns {
  grid-template-columns: var(--cols);
}

.grid-template-rows {
  grid-template-rows: var(--rows);
}

.grid-auto-flow {
  grid-auto-flow: var(--direction);
}

.grid-area {
  grid-column: var(--area-col);
  grid-row: var(--area-row);
}
```

👉 O TypeScript define **intenção**
👉 O browser executa **renderização**

---

## 🧠 Princípios de design

* Layout é **estado programável**
* Responsividade é **local (container-first)**
* O browser faz o trabalho pesado (CSS)
* API deve ser **explícita e previsível**
* Comunicação deve ser **desacoplada**

---

## ⚠️ Limites do sistema

O BlueCrow **não** é responsável por:

* Design system (cores, spacing, tokens)
* Gerenciamento de estado global
* Framework completo de UI

👉 Ele resolve **estrutura espacial**, não aparência.

---

## 📌 Resumo

BlueCrow reduz:

* acoplamento entre layout e DOM
* dependência de media queries
* boilerplate de comunicação

E introduz:

* layout reativo
* controle programável
* responsividade baseada em container

---

*Foco no essencial. Sem mágica. Sem acoplamento desnecessário.*
