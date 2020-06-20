import React from "react";
import Footer from "./components/footer/Footer";
import Header from "./components/header/Header";
import { theme } from "./styles/variables";
import "./styles/App.scss";

const App = () => {
  return (
    <div className={['App', theme].join(' ')}>
      <Header />
      <div id="main-view"></div>
      <Footer />
    </div>
  );
};

export default App;
