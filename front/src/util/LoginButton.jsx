import { useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";

const LoginButton = () => {
  const { loginWithRedirect, logout, user, isAuthenticated, isLoading } =
    useAuth0();

  useEffect(() => {
    if (isAuthenticated) {
      enviarSolicitudPost();
    }
  }, [isAuthenticated]);

  const enviarSolicitudPost = async () => {
    if (!user) {
      return;
    }

    const url = "https://no-country-cwv9.onrender.com/api/users/create";
    const parametros = {
      nickname: user.nickname,
      email: user.email,
      picture: user.picture,
      name: user.name,
    };

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(parametros),
      });

      if (response.ok) {
        console.log("Solicitud POST enviada con éxito");
      } else if (response.status === 409) {
        console.error("Usuario ya Registrado");
      }
    } catch (error) {
      console.error("Error al enviar la solicitud POST:", error);
    }
  };

  // console.log(user);

  if (isAuthenticated) {
    return (
      <div>
        <img src={user.picture} alt={user.name} width="20px" height="20px" />
        <button
          onClick={() =>
            logout({ logoutParams: { returnTo: window.location.origin } })
          }
        >
          Log Out
        </button>
      </div>
    );
  }

  return <button onClick={() => loginWithRedirect()}>Log In</button>;
};

export default LoginButton;
