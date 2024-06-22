import React from 'react';
import './Lk.css';

const ProfilePage = () => {
    return (
        <div className="glv">
        <div className="profile-page">
            <div className="sidebar">
                <div className="menu-item">Мой профиль</div>
                <div className="menu-item">Заказы</div>
                <div className="menu-item">Настройки</div>
                <div className="menu-item">****************</div>
            </div>
            <div className="content">
                <h2>Мой профиль</h2>
                <form>
                    <label>
                        Имя
                        <input type="text" name="firstName" />
                    </label>
                    <label>
                        Отчество
                        <input type="text" name="middleName" />
                    </label>
                    <label>
                        Фамилия
                        <input type="text" name="lastName" />
                    </label>
                    <label>
                        Город
                        <input type="text" name="city" />
                    </label>
                    <label>
                        E-mail
                        <input type="email" name="email" />
                    </label>
                    <label>
                        Телефон
                        <input type="tel" name="phone" />
                    </label>
                    <button className='button-lk' type="submit">Сохранить изменения</button>
                </form>
                <div className="photo-placeholder">
                    <div className="circle large"></div>
                    <div className="circle small"></div>
                </div>
            </div>
        </div>
        </div>
    );
};

export default ProfilePage;
