import { Page } from './page.decorator';

describe('Engine Documentação: @Page Decorator', () => {
  
  it('1. deve injetar metadados configurados de rota na propriedade estática da classe', () => {
    @Page({ path: 'minha-rota', title: 'Dashboard' })
    class MockPageComponent {}

    const metadata = (MockPageComponent as any).routeConfig;
    expect(metadata).toBeDefined();
    expect(metadata.path).toBe('minha-rota');
    expect(metadata.title).toBe('Dashboard');
    expect(metadata.component).toBe(MockPageComponent); // Verifica o laço de amarração
  });

  it('2. deve interceptar os métodos nativos de ciclo de vida e injetar contexto', () => {
    let executouNativo = false;
    
    @Page({ path: 'intercepta' })
    class ExecComponent {
      ngOnInit() {
        executouNativo = true;
      }
    }

    const instance = new ExecComponent();
    instance.ngOnInit();

    // Comprova que o Decorator não afoga o método original
    expect(executouNativo).toBe(true);
    
    // Comprova que a propriedade fantasma atrelada pelo Decorator persistiu na instância final
    expect((instance as any).pageContextInjetado).toBe(true);
  });
});
