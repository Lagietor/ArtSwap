import useUser from "../../customHooks/useUser";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import "./Home.css";

function Home() {
    const { user, isLogged } = useUser();

    if (isLogged) {
        console.log(user);
    }

    return(
        <div className="container">
            <div className="searchBar d-flex justify-content-center mt-5">
                <form className="form-inline w-50">
                    <div className="input-group">
                        <input 
                            type="search" 
                            className="form-control rounded" 
                            placeholder="Search" 
                            aria-label="Search" 
                            aria-describedby="search-addon"
                        />
                        <span className="input-group-text border-0" id="search-addon">
                            <FontAwesomeIcon icon={faSearch} />
                        </span>
                    </div>
                </form>
            </div>
            <div className="categories mt-5">
                <button className="category-btn">Popular</button>
                <button className="category-btn">Newest</button>
                <button className="category-btn">Expensive</button>
                <button className="category-btn">Cats</button>
                <button className="category-btn">
                    <FontAwesomeIcon icon={faSearch} />
                </button>
            </div>
            <div className="nft-items mt-5">
                <div className="card-group">
                    <div className="card mx-2 mb-4 rounded">
                        <img className="card-img-top" src="./profileImages/BUBBA.jpg" alt="nft image" />
                        <div className="card-body">
                            <h5 className="card-title">Card title</h5>
                            <p className="card-text">This is a longer card with supporting text below as a natural lead-in to additional content.</p>
                            <p className="card-text"><small className="text-muted">Last updated 3 mins ago</small></p>
                        </div>
                    </div>
                    <div className="card mx-2 mb-4 rounded">
                        <img className="card-img-top" src="./profileImages/BUBBA.jpg" alt="nft image" />
                        <div className="card-body">
                            <h5 className="card-title">Card title</h5>
                            <p className="card-text">This is a longer card with supporting text below as a natural lead-in to additional content.</p>
                            <p className="card-text"><small className="text-muted">Last updated 3 mins ago</small></p>
                        </div>
                    </div>
                    <div className="card mx-2 mb-4 rounded">
                        <img className="card-img-top" src="./profileImages/BUBBA.jpg" alt="nft image" />
                        <div className="card-body">
                            <h5 className="card-title">Card title</h5>
                            <p className="card-text">This is a longer card with supporting text below as a natural lead-in to additional content.</p>
                            <p className="card-text"><small className="text-muted">Last updated 3 mins ago</small></p>
                        </div>
                    </div>
                    <div className="card mx-2 mb-4 rounded">
                        <img className="card-img-top" src="./profileImages/BUBBA.jpg" alt="nft image" />
                        <div className="card-body">
                            <h5 className="card-title">Card title</h5>
                            <p className="card-text">This is a longer card with supporting text below as a natural lead-in to additional content.</p>
                            <p className="card-text"><small className="text-muted">Last updated 3 mins ago</small></p>
                        </div>
                    </div>
                    <div className="card mx-2 mb-4 rounded">
                        <img className="card-img-top" src="./profileImages/BUBBA.jpg" alt="nft image" />
                        <div className="card-body">
                            <h5 className="card-title">Card title</h5>
                            <p className="card-text">This is a longer card with supporting text below as a natural lead-in to additional content.</p>
                            <p className="card-text"><small className="text-muted">Last updated 3 mins ago</small></p>
                        </div>
                    </div>
                    <div className="card mx-2 mb-4 rounded">
                        <img className="card-img-top" src="./profileImages/BUBBA.jpg" alt="nft image" />
                        <div className="card-body">
                            <h5 className="card-title">Card title</h5>
                            <p className="card-text">This is a longer card with supporting text below as a natural lead-in to additional content.</p>
                            <p className="card-text"><small className="text-muted">Last updated 3 mins ago</small></p>
                        </div>
                    </div>
                </div>
                <div className="card-group">
                    <div className="card mx-2 mb-4 rounded">
                        <img className="card-img-top" src="./profileImages/BUBBA.jpg" alt="nft image" />
                        <div className="card-body">
                            <h5 className="card-title">Card title</h5>
                            <p className="card-text">This is a longer card with supporting text below as a natural lead-in to additional content.</p>
                            <p className="card-text"><small className="text-muted">Last updated 3 mins ago</small></p>
                        </div>
                    </div>
                    <div className="card mx-2 mb-4 rounded">
                        <img className="card-img-top" src="./profileImages/BUBBA.jpg" alt="nft image" />
                        <div className="card-body">
                            <h5 className="card-title">Card title</h5>
                            <p className="card-text">This is a longer card with supporting text below as a natural lead-in to additional content.</p>
                            <p className="card-text"><small className="text-muted">Last updated 3 mins ago</small></p>
                        </div>
                    </div>
                    <div className="card mx-2 mb-4 rounded">
                        <img className="card-img-top" src="./profileImages/BUBBA.jpg" alt="nft image" />
                        <div className="card-body">
                            <h5 className="card-title">Card title</h5>
                            <p className="card-text">This is a longer card with supporting text below as a natural lead-in to additional content.</p>
                            <p className="card-text"><small className="text-muted">Last updated 3 mins ago</small></p>
                        </div>
                    </div>
                    <div className="card mx-2 mb-4 rounded">
                        <img className="card-img-top" src="./profileImages/BUBBA.jpg" alt="nft image" />
                        <div className="card-body">
                            <h5 className="card-title">Card title</h5>
                            <p className="card-text">This is a longer card with supporting text below as a natural lead-in to additional content.</p>
                            <p className="card-text"><small className="text-muted">Last updated 3 mins ago</small></p>
                        </div>
                    </div>
                    <div className="card mx-2 mb-4 rounded">
                        <img className="card-img-top" src="./profileImages/BUBBA.jpg" alt="nft image" />
                        <div className="card-body">
                            <h5 className="card-title">Card title</h5>
                            <p className="card-text">This is a longer card with supporting text below as a natural lead-in to additional content.</p>
                            <p className="card-text"><small className="text-muted">Last updated 3 mins ago</small></p>
                        </div>
                    </div>
                    <div className="card mx-2 mb-4 rounded">
                        <img className="card-img-top" src="./profileImages/BUBBA.jpg" alt="nft image" />
                        <div className="card-body">
                            <h5 className="card-title">Card title</h5>
                            <p className="card-text">This is a longer card with supporting text below as a natural lead-in to additional content.</p>
                            <p className="card-text"><small className="text-muted">Last updated 3 mins ago</small></p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Home;