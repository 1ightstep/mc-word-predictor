import "./styles/App.css";
import Header from "./components/header/Header";
import Body from "./components/body/Body";
import Footer from "./components/footer/Footer";

function App() {
  return (
    <main className="app">
      <div className="app-content">
        <Header />
        <Body />
        <Footer />
      </div>
    </main>
  );
}

export default App;
