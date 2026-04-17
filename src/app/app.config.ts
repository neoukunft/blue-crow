import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';
import { getGeneratedRoutes } from '@core/factories/route.factory';

import '@pages/index';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(getGeneratedRoutes())
  ]
};
