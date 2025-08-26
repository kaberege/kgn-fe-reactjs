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
      <div className="fixed bottom-4 left-2 z-50 transition duration-300 hover:scale-105 max-sm:hidden">
        <div className="relative h-24 w-24">
          <div className="absolute flex h-full w-full animate-spin items-center justify-center rounded-full border-t-4 border-blue-500"></div>
          <a
            href="mailto:kabgnestor@gmail.com"
            className="absolute top-4 left-4 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-b from-slate-400 via-orange-500 to-green-800 text-xs font-semibold text-zinc-950"
          >
            Hire Me
          </a>
        </div>
      </div>
    </div>
  );
}

export default App;
