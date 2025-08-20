import { useState } from "react";
import Header from "./components/Header";
import Main from "./components/Main";
import Footer from "./components/Footer";

function App() {
  const [mode, setMode] = useState<boolean>(false); // update toggle dark\light mode

  return (
    <div className={`${mode && "dark"}`}>
      <Header handleMode={setMode} mode={mode} />
      <Main mode={mode} />
      <Footer mode={mode} />
    </div>
  );
}

export default App;
