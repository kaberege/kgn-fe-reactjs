import React,{useState} from "react";
import Header from "./components/Header";
import Main from "./components/Main";
import Footer from "./components/Footer";


function App() {
  const [mode, setMode] = useState(false); // update toggle dark\light mode

  return (
    <div className={`${mode &&"dark"}`}>
      <Header handleMode={setMode} />
      <Main mode={mode} />
      <Footer />
    </div>
  )
}

export default App
