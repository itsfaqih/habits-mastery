import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { Provider as WrapBalancerProvider } from "react-wrap-balancer";
import "./index.css";
import { router } from "./routes";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <WrapBalancerProvider>
      <RouterProvider router={router} />
    </WrapBalancerProvider>
  </React.StrictMode>
);
