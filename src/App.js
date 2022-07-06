import "./App.css";
import { BrowserRouter } from "react-router-dom";
import RoutesNav from "./components/Routes/Routes";
import NavBarLogin from "./components/Home/NavBarLogin";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <p>mmmm</p>
        <NavBarLogin />
        <RoutesNav />
      </BrowserRouter>
    </div>
  );
}

export default App;
