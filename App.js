import React from "react";
import Providers from "./navigation";
import init from "./service/firebase";

init();

const App = () => {
  return <Providers />;
};

export default App;
