import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    // Simuler une authentification
    if (user === "admin" && password === "admin") {
      localStorage.setItem("auth", "true"); // Stockage simple de l'état connecté
      navigate("/edition");
    } else {
      alert("Identifiants incorrects");
    }
  };

return (
  <>
  <div className="contenAll">
      <form onSubmit={handleLogin} className="card card2 displayFlex2">
        <h1>Page de connexion</h1>
        <input type="text" name="user" id="userName" className="form-control thick" placeholder="User" value={user} onChange={(e) => setUser(e.target.value)} required/>
        <input type="password" name="password" id="userPassword" className="form-control thick" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required/>
        <button type="submit" className="cta"><span>Connection</span></button>
      </form>
  </div>
  </>
)
}; export default Login;