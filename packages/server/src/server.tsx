import path from "path";
import express from "express";
//import compression from "compression";
import ReactDOMServer from "react-dom/server";
import { App } from "@rsts/web";

const appRootDirectory = path.dirname(
  require.resolve("@rsts/web/package.json")
);
const appBundleDirectory = path.join(appRootDirectory, "build");

export function createHttpServer(): express.Express {
  const app = express();

  //app.use(compression());
  app.use(express.static(appBundleDirectory));
  app.get("/", ssrHandler);

  return app;
}

function ssrHandler(_req: express.Request, res: express.Response) {
  const ssrText = ReactDOMServer.renderToString(<App />);
  console.log("ssrText", ssrText);
  res.end(
    `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <meta name="Description" content="Monorepo example server-side renderer app">
    <title>Monorepo Example</title>
</head>
<body>
    <div id="root" data-ssr>
      ${ssrText}
    </div>
    <script type="text/javascript" src="main.js"></script>
</body>
</html>`
  );
}
