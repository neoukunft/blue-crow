import { Routes } from "@angular/router";
import { PAGE_REGISTRY } from "../decorators/page.decorator";

export function getGeneratedRoutes(): Routes {
    console.info('Total de páginas registradas:', PAGE_REGISTRY.length);

    return PAGE_REGISTRY.map(page => {
        const route = (page as any).routeConfig;

        if (!route)
            console.error(`A classe ${page.name} não possui @Page.`);

        return route;
    }).filter(route => !!route);
}