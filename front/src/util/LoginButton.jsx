import { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Link } from "react-router-dom";

const LoginButton = () => {
  const { loginWithRedirect, logout, user, isAuthenticated, isLoading } =
    useAuth0();
  const [userLocal, setUserLocal] = useState(null);

  useEffect(() => {
    const userFromLocalStorage = JSON.parse(localStorage.getItem("user"));
    if (!isAuthenticated && userFromLocalStorage) {
      setUserLocal(userFromLocalStorage);
    }
    enviarSolicitudPost();
  }, [isAuthenticated]);

  const enviarSolicitudPost = async () => {
    if (!user && !userLocal) {
      return;
    }

    const userData = user || userLocal;

    const url = "https://no-country-cwv9.onrender.com/api/users/create";
    const parametros = {
      nickname: userData.nickname,
      email: userData.email,
      picture: userData.picture,
      name: userData.name,
    };

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(parametros),
      });
      const data = await response.json();
      if (response.ok) {
        console.log("Solicitud POST enviada con éxito");
        console.log(data.newUser);
        localStorage.setItem("user", JSON.stringify(data.newUser));
      } else if (response.status === 409) {
        console.error("Usuario ya Registrado");
        console.log(data.existsUser);
        localStorage.setItem("user", JSON.stringify(data.existsUser));
      }
    } catch (error) {
      console.error("Error al enviar la solicitud POST:", error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUserLocal(null);
    logout({ logoutParams: { returnTo: window.location.origin } });
  };

  if (isAuthenticated || userLocal) {
    const currentUser = isAuthenticated ? user : userLocal;
    return (
      <div>
        <Link to={"/profile"}>
          <img
            src={currentUser.picture}
            alt={currentUser.name}
            width="20px"
            height="20px"
          />
        </Link>
        <button onClick={handleLogout}>Log Out</button>
      </div>
    );
  }

  return <button onClick={() => loginWithRedirect()}>Log In</button>;
};

export default LoginButton;
