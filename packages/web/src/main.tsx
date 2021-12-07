import ReactDOM from "react-dom";
import { App } from "./App";

const rootContainerId = "root";

const container =
  document.getElementById(rootContainerId) ?? createContainer(document.body);

if (container.hasAttribute("data-ssr")) {
  ReactDOM.hydrate(<App />, container);
} else {
  ReactDOM.render(<App />, container);
}

function createContainer(targetParent: Element) {
  const newContainer = document.createElement("div");
  newContainer.id = rootContainerId;
  return targetParent.appendChild(newContainer);
}
