import React from "react";

import logo from "assets/img/thebridgelogo.svg";
import logol from "assets/img/lone-logo.png";

export const NoMatch = () => {
  return (
    <div className="error404">
      <img src={logol} />
      <h1>Error 404!</h1>
      <p>
        Todos acabamos perdidos de vez en cuando, lo importante es seguir
        buacando el camino... o cambiar la url ;)
      </p>
    </div>
  );
};
