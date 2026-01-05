import React from 'react'
import { Link } from 'react-router-dom';
import '../styles/Footer.css';

import logo from '../assets/icons/lotus-logo-white.png';
import box from '../assets/icons/box.png';

import phoneIcon from '../assets/icons/phone.png';
import emailIcon from '../assets/icons/email.png';
import instaIcon from '../assets/icons/instagram.png';

const Footer = ({ user }) => {
  return (
    <footer className="footer">
        <div className="footer-left">
            <Link to="/" className="footer-logo">
                <span>Lumina Lotus</span>
                <img src={logo} alt="Lumina Lotus" className="icon-logo" />
            </Link>
            <p>Фотолабораторія твоєї мрії</p>

            <div className="free-delivery">
                <img src={box} alt="!" className="package" />
                <p>
                При замовленні на суму від 2000 грн. доставка по Україні безкоштовна.
                </p>
            </div>
        </div>

        <div className="footer-center">
            <h3>Компанія</h3>
            <ul>
                <li><Link to="/">Домашня</Link></li>
                <li><Link to="/catalogue">Каталог послуг</Link></li>
                <li>Доставка</li>
                <li>Політика приватності</li>
                <li>
                {user ? (
                    <span>{user.name}</span>
                ) : (
                    <Link to="/login">Увійти</Link>
                )}
                </li>
            </ul>
            </div>

        <div className="footer-right">
            <h3>Зв’язатися з нами</h3>
            <ul>
                <li className="contact-item">
                    <img src={phoneIcon} alt="phone" className="contact-icon" />
                    <p>(+380)97-15-75-484</p>
                </li>
                <li className="contact-item">
                    <img src={emailIcon} alt="email" className="contact-icon" />
                    <p>lumina_lotus@gmail.com</p>
                </li>
                <li className="contact-item">
                    <img src={instaIcon} alt="instagram" className="contact-icon" />
                    <p>lumina_lotus</p>
                </li>
            </ul>
        </div>
    </footer>
  )
}

export default Footer
