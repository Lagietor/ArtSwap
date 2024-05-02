function Header() {
    return(
        <>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <div className="container-fluid p-2 mx-5">
                    <a className="navbar-brand" href="#">Logo</a>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <a className="nav-link" href="#">Link</a>
                            </li>
                        </ul>
                        <div>
                            <button className="btn btn-primary">Sign Up</button>
                        </div>
                    </div>
                </div>
            </nav>
        </>
    );
}

export default Header;