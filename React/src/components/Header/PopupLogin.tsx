import { useNavigate } from "react-router-dom";
import "./header.css";

function PopupLogin({ close }: {close: () => void }) {
    const navigate = useNavigate();

    const handleSubmit = (e: React.SyntheticEvent) => {
        e.preventDefault();
        // TODO: axios login
    }

    const handleSignInClick = () => {
        close();
        navigate("/register");
    }

    return (
        <div className="p-2 border rounded">
            <div className="d-flex justify-content-end">
                <button className="btn-close" onClick={close}></button>
            </div>
            <div className="px-5">
                <div><h2> Log in </h2></div>
                <div>
                    <form onSubmit={handleSubmit} className="my-5">
                        <div className="">
                            <label htmlFor="email">Email</label>
                            <input type="email" className="form-control" id="email" placeholder="Enter email" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <input type="password" className="form-control" id="password" placeholder="Enter password" />                      
                        </div>
                        <div className="d-grid gap-2">
                            <button className="submit btn btn-primary btn-block">Login</button>
                        </div>
                        <small className="text-muted">If you do not have an account <a onClick={handleSignInClick}>Sign In</a></small>
                    </form>
                </div>
                <div>
                    <p>Login with Google</p>
                    <p>Login with Facebook</p>
                </div>
                <div>
                    <p>Login with MetaMask</p>
                </div>
            </div>
        </div>
    )
}

export default PopupLogin;