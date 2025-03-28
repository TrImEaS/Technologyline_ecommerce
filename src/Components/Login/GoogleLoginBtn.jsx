import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google"
import { jwtDecode } from "jwt-decode";

export default function GoogleLoginBtn () {
  const handleSuccess = (res) => {
    const token = res.credential;
    const user = jwtDecode(token);
    console.log("Usuario:", user);
  }

  const handleFailure = () => {
    console.error("Error al iniciar sesion con Google")
  }

  return (
    <GoogleOAuthProvider clientId="835322012970-8ir2jfsiqj3etff2n91pkpm4br2sfdrt.apps.googleusercontent.com">
      <GoogleLogin onSuccess={handleSuccess} onFailure={handleFailure} />
    </GoogleOAuthProvider>
  )
}