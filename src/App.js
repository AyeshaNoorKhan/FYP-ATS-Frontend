import './App.css';
import {BrowserRouter } from 'react-router-dom'
// import Login from './components/Login/Login.js';
import Header from './components/Home/Header';
// import NavBar from './components/Home/NavBar';
import RoutesNav from './components/Routes/Routes';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
          <Header/>
          <RoutesNav/>
      </BrowserRouter>
    </div>
  );
}

export default App;
