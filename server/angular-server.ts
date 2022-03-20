import "zone.js/dist/zone-node";
import "localstorage-polyfill";
import { ngExpressEngine } from "@nguniversal/express-engine";
import { AppServerModule } from "../client/projects/client-ssr/src/main.server";
import { APP_BASE_HREF } from "@angular/common";

function declareBrowserGlobalValues() {
  const MockBrowser = require("mock-browser").mocks.MockBrowser;
  const mock = new MockBrowser();
  // tslint:disable-next-line: no-string-literal
  (global as any)["window"] = mock.getWindow();
  // tslint:disable-next-line: no-string-literal
  (global as any)["document"] = mock.getDocument();
  // tslint:disable-next-line: no-string-literal
  (global as any)["localStorage"] = localStorage;
}

export function init(server: any) {
  declareBrowserGlobalValues();
  server.engine(
    "html",
    ngExpressEngine({
      bootstrap: AppServerModule,
    }),
  );
}

export function setSSRViews(server: any, indexHtml: any) {
  server.get(/[^.]*$/, (req: any, res: any, next: any) => {
    console.log("IN2");
    res.render(indexHtml, {
      req,
      providers: [{ provide: APP_BASE_HREF, useValue: req.baseUrl }],
    });
  });
}

// // Webpack will replace 'require' with '__webpack_require__'
// // '__non_webpack_require__' is a proxy to Node 'require'
// // The below code is to ensure that the server is run only when not requiring the bundle.

declare const __non_webpack_require__: NodeRequire;
const mainModule = __non_webpack_require__.main;
const moduleFilename = (mainModule && mainModule.filename) || "";
if (moduleFilename === __filename || moduleFilename.includes("iisnode")) {
}

export * from "../client/projects/client-ssr/src/main.server";
