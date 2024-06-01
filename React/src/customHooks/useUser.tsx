import { Cookies } from "react-cookie";
import { useJwt } from "react-jwt";
import User from "../types/UserType";

const useUser = (): {user: User | null; isLogged: boolean} => {
    const cookies = new Cookies();
    const token = cookies.get("userToken");

    const { decodedToken, isExpired } = useJwt<User>(token);
    const user = decodedToken || null;

    const isLogged = !!user && !isExpired;

    return { user, isLogged };
}

export default useUser;