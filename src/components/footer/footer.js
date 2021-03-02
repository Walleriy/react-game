import React from "react";
import './footer.css'
import rsPhoto from './rs-logo.png'

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer__item">
                Developers:
                <a
                    className="footer__link"
                    href={"https://github.com/Walleriy"}
                    rel="noreferrer"
                    target="_blank">
                    Walleriy
                </a>
            </div>
            <div className="footer__item">
                2021
            </div>
            <div className="footer__item">
                <a
                    className="footer__link"
                    href={"https://rs.school/react/"}
                    rel="noreferrer"
                    target="_blank">
                    <img
                        className="footer__img"
                        src={rsPhoto}
                        alt="RS School"
                    ></img>
                </a>
            </div>
        </footer>
    );
}

export default Footer;
