import { Type } from "@angular/core";
import { Route } from "@angular/router";

export const PAGE_ROUTE_KEY = Symbol('PAGE_ROUTE_KEY');
export const PAGE_REGISTRY: any[] = [];

export function Page(config: Omit<Route, 'component'>) {
    return <T extends Type<any>>(constructor: T): T | void => { 

        const originalOnInit = constructor.prototype.ngOnInit;
        constructor.prototype.ngOnInit = function(...args: any[]) {
            console.warn(`🚀 [Page Decorator] Vida interceptada! Inicializando rota: '${config.path || '/'}'`);
            
            // Injetamos propriedades dinamicamente
            this.pageContextInjetado = true;
            
            if (originalOnInit) {
                originalOnInit.apply(this, args);
            }
        };

        const originalOnDestroy = constructor.prototype.ngOnDestroy;
        constructor.prototype.ngOnDestroy = function(...args: any[]) {
            console.warn(`🛑 [Page Decorator] Página destruída. Rota: '${config.path || '/'}'`);
            
            // Pode fazer limpeza centralizada aqui
            
            if (originalOnDestroy) {
                originalOnDestroy.apply(this, args);
            }
        };

        Object.defineProperty(constructor, 'routeConfig', {
            value: {
                ...config,
                component: constructor
            },
            writable: false,
            configurable: false
        });

        PAGE_REGISTRY.push(constructor);
        return constructor;
    }    
}