import useUser from "../customHooks/useUser";

function Home() {
    const { user, isLogged } = useUser();

    if (isLogged) {
        console.log(user);
    }

    return(
        <div>
            <p>YES</p>
        </div>
    );
}

export default Home;