Este README foi estruturado para refletir a sofisticação da arquitetura que você construiu. Ele foca na separação de camadas, na inteligência reativa dos Signals e na engine de layout baseada em Container Queries.

---

# 1. BlueCrow Layout Engine 🐦‍⬛

**BlueCrow** é uma engine de layout pragmática e ultra-performática para Angular, projetada para resolver o caos do posicionamento espacial em sistemas de design complexos.

Ao contrário de frameworks CSS tradicionais, o BlueCrow trata o layout como uma **camada de infraestrutura programável**, separando o "onde as coisas estão" de "como as coisas se parecem".

## 2. 🏗️ A Arquitetura das 3 Camadas

O projeto resolve o problema do **Atomic Design** através da separação de domínios espaciais:

1.  **Camada de Estrutura (Grid):** Gerenciada pela classe `BlueCrowLayout`. Define as massas críticas (Main, Section, Content) usando CSS Grid.
2.  **Camada de Lógica (Widgets):** Agrupamentos funcionais que utilizam Flexbox para gerenciar a relação e o fluxo entre componentes.
3.  **Camada de Apresentação (Componentes):** Átomos puros e "burros" que apenas renderizam UI, sem conhecimento de margens externas ou posicionamento global.

---

## 3. 🚀 Recursos Principais

* **Container-First Responsiveness:** Responsividade baseada no tamanho do próprio container (via `ResizeObserver`), não na viewport.
* **Signal-Based Registry:** Acesso reativo a qualquer instância de layout de qualquer lugar da aplicação.
* **Dynamic Grid Areas:** Controle granular de áreas (`column`/`row`) via atributos `data-name`, permitindo que componentes se movam na grid dinamicamente.
* **Zero Memory Leak:** Gestão rigorosa do ciclo de vida com limpeza automática de Observers e referências do DOM no `ngOnDestroy`.
* **Hybrid Box Model:** Abstração simplificada de eixos (`axisX`, `axisY`) que mapeia automaticamente para `align-content` ou `align-items`.

---

## 4. 🛠️ Como Funciona

### 1. Definindo a Estrutura (HTML)
Use a diretiva `blueCrowLayout` para transformar qualquer elemento em um nó inteligente.

```html
<main [blueCrowLayout]="'main-grid'">
  <aside data-name="sidebar"></aside>
  <section data-name="content"></section>
</main>
```

### 2. Orquestrando via Componente
Recupere a instância e configure o comportamento espacial de forma imperativa e elegante.

```typescript
export class DashboardComponent {
  // O Signal garante que a lógica só dispare quando o DOM estiver pronto
  set layoutMain(layoutSignal: Signal<BlueCrowLayout | null>) {
    const layout = layoutSignal();
    if (layout) {
      // 1. Configuração Base
      layout.setup({
        columns: ['250px', '1fr'],
        boxModel: { spaceBetweenThem: 20 }
      });

      // 2. Responsividade por Container (Engine Interna)
      layout.responsive.set({ maxWidth: 768 }, {
        columns: ['1fr'],
        direction: 'column'
      });

      // 3. Posicionamento Dinâmico de Áreas
      layout.setArea('sidebar', { column: 1, row: '1 / 3' });
    }
  }

  constructor() {
    this.layoutMain = getLayout('main-grid');
  }
}
```

---

## 5. 🧬 Anatomia Técnica

### A Classe `BlueCrowLayout`
É o coração da engine. Ela encapsula:
* **`ResizeObserver`**: Monitora o tamanho do container e aplica breakpoints do `responsiveMap`.
* **`MutationObserver`**: Opcional para monitorar mudanças estruturais de filhos.
* **CSS Variables Bridge**: Traduz configurações JS em variáveis CSS de alta performance (`--cols`, `--area-col`, etc).

### O Registry
Um sistema de `signals` global que mantém o rastro de todas as instâncias ativas, permitindo comunicação *cross-component* sem acoplamento direto.

---

## 6. 🎨 CSS Bridge (O Contrato Visual)

A engine espera um conjunto mínimo de utilitários CSS para processar as variáveis:

```css
.grid {
  display: grid;
  grid-template-columns: var(--cols);
  grid-template-rows: var(--rows);
  gap: var(--gap);
  padding: var(--padding);
}

.grid-area {
  grid-column: var(--area-col);
  grid-row: var(--area-row);
}
```

---

## 7. 🧹 Garbage Collection
A engine é projetada para aplicações de longa duração (Dashboards/CMS).
* `destroy()`: Desconecta todos os observers e anula referências ao elemento host.
* `unregisterLayout()`: Remove a instância do Signal Registry, liberando a memória imediatamente.

---

> **Nota do Engenheiro:** "Não é sobre fazer o componente caber na tela, é sobre fazer a tela entender o componente." 🐦‍⬛