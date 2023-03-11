import Navbar from "./components/navbar/Navbar";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/home/Home";
import Footer from "./components/footer/Footer";
import "./style/style.scss";
import CoinDetail from "./pages/detail/CoinDetail";

function App() {
  return (
    <Router>
      <div className="app">
        <header>
          <Navbar />
        </header>
        <section>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/coin/:id" element={<CoinDetail />} />
          </Routes>
        </section>
        <footer className="app__footer">
          <Footer />
        </footer>
      </div>
    </Router>
  );
}

export default App;
