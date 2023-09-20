import './App.css';
import BrowserRouter from "react-router-dom";
import Header from './components/Header';
import Login from './components/Login';
import Home from './components/Home';
import Product from './components/Product';
import Footer from './components/Footer';




//import shoppingCartImage from './images/trolley.png';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Header />
        <Login />

        <Home />
        <Product />
        <Footer />
        
      
       
      </header>
    </div>
  );
}

export default App;
