import { Cookies } from "react-cookie";
import { useJwt } from "react-jwt";

const useUser = () => {
    const cookies = new Cookies();
    const token = cookies.get("userToken");

    const { decodedToken, isExpired } = useJwt(token);
    const user = decodedToken;

    const isLogged = (user && !isExpired);

    return { user, isLogged };
}

export default useUser;