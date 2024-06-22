import React, { useState } from "react";
import axios from "axios";
import './ModalAuth.css';

const ModalAuth = ({ activeAuth, setActiveAuth, onLogin }) => { 
    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async () => {
        try {
            const response = await axios.post('https://b279-94-141-125-64.ngrok-free.app/api/user/login', formData);
            console.log(response.data); 
            onLogin();
            setActiveAuth(false);
        } catch (error) {
            console.error("Ошибка при отправке запроса:", error);
        }
    };

    return (
        <div className={activeAuth ? "ModalAuth activeAuth" : "ModalAuth"} onClick={() => setActiveAuth(false)}>
            <div className="ModalAuth__content" onClick={e => e.stopPropagation()}>
                <input 
                    type="email" 
                    name="email" 
                    value={formData.email} 
                    onChange={handleChange} 
                    placeholder="Электронная почта" 
                />
                <input 
                    type="password" 
                    name="password" 
                    value={formData.password} 
                    onChange={handleChange} 
                    placeholder="Пароль" 
                />
                <button onClick={handleSubmit}>Войти</button>
            </div>
        </div>
    );
};

export default ModalAuth;
