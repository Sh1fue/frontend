import React, { useState, useEffect } from 'react';
import '../Components/Header.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import Modal from '../modal/ModalRegistration';
import ModalAuth from "../modal/ModalAuth";
import { Link, useNavigate } from 'react-router-dom';

function Header() {
    const [modalActive, setModalActive] = useState(false);
    const [modalActiveAuth, setModalActiveAuth] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [showCatalog, setShowCatalog] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');

    const navigate = useNavigate();

    const saveUserDataToLocalStorage = (userData) => {
        localStorage.setItem('userData', JSON.stringify(userData));
    };

    const removeUserDataFromLocalStorage = () => {
        localStorage.removeItem('userData');
    };

    useEffect(() => {
        const userDataFromLocalStorage = localStorage.getItem('userData');
        if (userDataFromLocalStorage) {
            setIsLoggedIn(true);
        }
    }, []);

    const handleLogin = (userData) => {
        setIsLoggedIn(true);
        saveUserDataToLocalStorage(userData);
        setModalActiveAuth(false);
    };

    const handleLogout = () => {
        setIsLoggedIn(false);
        removeUserDataFromLocalStorage();
    };

    const handleSearch = () => {
        navigate(`/catalog?search=${searchQuery}`);
    };

    return (
        <div>
            <header className="header">
                <Link to="/" className="item-link">
                    <div className="logo">
                        <span className="logo-text">РекАвто</span>
                        <span className="logo-text-small">Автозапчасти</span>
                    </div>
                </Link>
                <button className="catalog-button" onClick={() => setShowCatalog(!showCatalog)}>Каталог</button>
                <div className="search-bar">
                    <input 
                        type="text" 
                        placeholder="Артикул или номер детали" 
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    <button className="search-button" onClick={handleSearch}>Найти</button>
                </div>
                <div className="icon-links">
                <Link to="/contact" className="item-link">
                        <a href="#">
                            <i className="fas fa-address-book"></i>
                            <span>Контакты</span>
                        </a>
                    </Link>
                    
                    <Link to="/onas" className="item-link">
                        <a href="#">
                            <i className="fas fa-info-circle"></i>
                            <span>О нас</span>
                        </a>
                    </Link>
                    <Link to="/basket" className="item-link">
                        <a href="#">
                            <i className="fas fa-shopping-cart"></i>
                            <span>Корзина</span>
                        </a>
                    </Link>
                    {isLoggedIn ? (
                        <button className='open-btn' onClick={handleLogout}>Выход</button>
                    ) : (
                        <div className="auth-links">
                            <button className='open-btn' onClick={() => setModalActive(true)}>Регистрация</button>
                            <Modal active={modalActive} setActive={setModalActive} />
                            <span>/</span>
                            <button className='open-btn' onClick={() => setModalActiveAuth(true)}>Вход</button>
                            <ModalAuth activeAuth={modalActiveAuth} setActiveAuth={setModalActiveAuth} onLogin={handleLogin} />
                        </div>
                    )}
                </div>
            </header>
            {showCatalog && (
                <div className="catalog-list">
                    <ul>
                        <li><a href='/catalog?info_id=1'>Шины</a></li>
                        <li><a href='/catalog?info_id=2'>Тех запчасти</a></li>
                        <li><a href='/catalog?info_id=3'>Масла</a></li>
                        <li><a href='/catalog?info_id=4'>Инструменты</a></li>
                        <li><a href='/catalog?info_id=5'>АвтоХимия</a></li>
                    </ul>
                </div>
            )}
        </div>
    );
}

export default Header;
