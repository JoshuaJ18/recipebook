import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import {  useCookies} from "react-cookie";

export const Navbar = () => {
  const [ cookies, setCookies ] = useCookies(["access_token"]);

  const navigate = useNavigate();
  const logout = () => {
    setCookies("access_token", "");
    window.localStorage.removeItem("userID");
    navigate("/login");
  }
  return <div className="navbar">
    <Link to="/">Community Recipes</Link>
    <Link to="/create-a-recipe">New Recipe</Link>
    {!cookies.access_token ? (
      <Link to="/login">Login/Register</Link>
    ) : (
      <>
        <Link to="/your-recipes">My Recipes</Link>
        <button onClick={logout}>Logout</button>
      </>
    )}
  </div>;
}