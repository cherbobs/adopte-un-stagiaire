import React from "react";
import ReactDOM from "react-dom/client";
import { App } from "./App.tsx";
import { Auth0Provider } from "@auth0/auth0-react";
import { Authenticated } from "./auth/Authenticated.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Auth0Provider
       domain="orange-aus.eu.auth0.com"
    clientId="0v11WwvIimcLXNhhgauExbZBdfrAL5or"
      authorizationParams={{
        audience: "api.orange.aus.floless.fr",
        redirect_uri: window.location.origin,
      }}
    >
      <Authenticated>
        <App />
      </Authenticated>
    </Auth0Provider>
  </React.StrictMode>
);
