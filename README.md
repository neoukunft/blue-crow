# 1. BlueCrow Engine 🐦‍⬛

> 🚧 **STATUS: EM CONSTRUÇÃO** 🚧
> 
> **Pare de lutar com layout responsivo dentro de containers no Angular.**
> Layout complexo, previsível e programável — sem media query caótica.

[Fundamentos de Arquitetura e Design](/docs/architecture.md)

---

## ✨ Por que BlueCrow?

Se você já tentou montar um dashboard real em Angular, conhece o problema:

* Media queries acopladas ao viewport quebram layouts dentro de sidebars/modais
* CSS Grid fica declarativo demais quando o layout precisa reagir a estado
* Lógica de layout espalhada entre HTML, CSS e TS
* Ajustes simples viram cascatas de `if`, classes e bindings

**BlueCrow muda o modelo:**

> Em vez de forçar componentes a caberem no layout, o layout **responde ao contexto**.

---

## 🚀 Exemplo (o “aha moment”)

### ❌ Abordagem comum (CSS + Angular)

* múltiplas media queries
* bindings de estilo
* lógica espalhada

### ✅ Com BlueCrow

```html
<main blueCrowLayout="dashboard">
  <aside data-area="sidebar"></aside>
  <section data-area="content"></section>
</main>
```

```ts
const layout = getLayout('dashboard');

layout()?.setup({
  columns: ['250px', '1fr'],
  boxModel: { spaceBetweenThem: 16 }
});

layout()?.responsive.set(
  { maxWidth: 768 },
  { columns: ['1fr'], direction: 'column' }
);

layout()?.setArea('sidebar', { column: 1, row: '1 / 3' });
```

👉 **Sem media query manual. Sem bindings confusos. Sem caos.**

---

## 🧠 Como funciona

BlueCrow trata layout como **estado programável**, não apenas estilo.

* 🧩 **Grid Engine** — baseado em CSS Grid + variáveis CSS (alta performance)
* 📦 **Container-first responsiveness** — reage ao tamanho do container, não da tela
* 🎯 **Target-based positioning** — posiciona por `data-area`, não por hierarquia rígida
* ⚡ **CSS Variable Bridge** — TS define intenção, o browser renderiza rápido

---

## 📦 Instalação

```bash
npm install @bluecrow/angular
```

---

## 🔧 Uso básico

### 1. Adicione a directive

```ts
import { BlueCrowLayoutDirective } from '@bluecrow/angular';
```

---

### 2. Defina o layout no template

```html
<div blueCrowLayout="main">
  <aside data-area="sidebar"></aside>
  <section data-area="content"></section>
</div>
```

---

### 3. Controle via TypeScript

```ts
const layout = getLayout('main');

layout()?.setup({
  columns: ['250px', '1fr']
});

layout()?.setArea('sidebar', {
  column: 1,
  row: '1 / 3'
});
```

---

## 📐 Responsividade baseada em container

```ts
layout()?.responsive.set(
  { maxWidth: 768 },
  {
    columns: ['1fr'],
    direction: 'column'
  }
);
```

👉 Funciona dentro de qualquer contexto:

* sidebar
* modal
* micro-frontend

---

## 🎯 Posicionamento por área

```html
<section data-area="content"></section>
```

```ts
layout()?.setArea('content', {
  column: 2,
  row: 1
});
```

👉 Sem depender da estrutura rígida do DOM.

---

## 🎨 Integração com Design Tokens

BlueCrow é **agnóstico a design system**.

Use tokens via CSS variables:

```ts
layout()?.setBoxModel({
  spaceBetweenThem: 'var(--spacing-md)'
});
```

Ou com helper tipado:

```ts
spaceBetweenThem: tokens.spacing.md
```

---

## 🧩 API principal

```ts
layout.setup(config)
layout.setArea(name, config)
layout.responsive.set(breakpoint, config)

layout.setColumns([...])
layout.setRows([...])
layout.setDirection(...)
layout.setBoxModel(...)
```

---

## 🧹 Lifecycle

BlueCrow gerencia automaticamente:

* ResizeObserver
* MutationObserver
* cleanup no destroy

---

## 🧠 Filosofia

* Layout é **estado**, não só estilo
* Responsividade deve ser **local (container)**
* O browser deve fazer o trabalho pesado (CSS)
* A API deve ser **simples, previsível e explícita**

---

## ⚠️ O que BlueCrow NÃO é

* ❌ Não é framework completo
* ❌ Não substitui Angular Router
* ❌ Não gerencia estado global
* ❌ Não impõe design system

---

## 🗺️ Roadmap (resumido)

* ✅ Core de layout (Grid + Responsive)
* 🔄 Melhorias de DX
* 🔌 Plugins opcionais (router, store — fora do core)
* 🌐 Futuro: suporte a múltiplos ambientes

---

## 🤝 Contribuição

PRs são bem-vindos — especialmente:

* exemplos reais de uso
* melhorias de DX
* casos de layout complexos

---

## 📄 Licença

MIT
