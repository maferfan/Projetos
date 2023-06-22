import { createRoot } from "react-dom/client";
import { App } from "./App";
import "./index.css";
import "./pages/Home/Home"

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

root.render(<App />);
