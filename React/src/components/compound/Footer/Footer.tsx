import "./Footer.css";

const Footer = () => {
    return (
      <footer className="bg-info text-primary py-3 shadow-top mt-5">
        <div className="container text-center">
          <p> {new Date().getFullYear()} ArtSwap. All rights reserved.</p>
        </div>
      </footer>
    );
  };

export default Footer;