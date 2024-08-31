import { Cookies } from "react-cookie";
import { useJwt } from "react-jwt";
import UserType from "../types/UserType";

const isUserLogged = () => {
    const cookies = new Cookies();
    const token = cookies.get("userToken");

    const { decodedToken, isExpired } = useJwt<UserType>(token);
    const user = decodedToken || null;

    const isLogged = !!user && !isExpired;

    return isLogged;
}

export default isUserLogged