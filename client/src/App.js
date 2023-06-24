import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";
// import Loader from "./components/Loader.jsx";
import Services from "./components/Services.jsx";
import Transaction from "./components/Transaction.jsx";
import Welcome from "./components/Welcome.jsx";

const App = () => {
  return (
    <div className="min-h-screen">
      <div className="gradient-bg-welcome">
        <Header></Header>
        <Welcome></Welcome>
      </div>
      <Services></Services>
      <Transaction></Transaction>
      <Footer></Footer>
    </div>
  );
};

export default App;
