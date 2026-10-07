import { mockApiVersion } from './version';

const app = document.querySelector<HTMLDivElement>('#app');
if (app) {
  app.textContent = `mock-ui, built against mock-api ${mockApiVersion}`;
}
