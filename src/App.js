import './components/navbar.css';
import './pages/pages.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Home } from "./pages/home";
import { Login } from "./pages/login";
import { Register } from "./pages/register";
import { CreateRecipe } from "./pages/create-recipe";
import { Recipes } from "./pages/recipes";
import { Navbar } from "./components/navbar";

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element = {<Home />} />
          <Route path="/login" element = {<Login />} />
          <Route path="/register" element = {<Register />} />
          <Route path="/create-a-recipe" element = {<CreateRecipe />} />
          <Route path="/your-recipes" element = {<Recipes />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
