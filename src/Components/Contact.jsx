import './Contact.css';
import Header from '../Components/Header'
import Footer from './Footer';
const ContactPage = () => {
  return (
    <div className="glv">
    <Header></Header>
    <div className="contact-page">
                <h2>Контакты</h2>
      <div className="contact-details">
        <div className="contact-item contact-items-grid-1">
        <p>Звоните нам:</p>
        <p>8 800 551 50 45</p>
        <p>+7 (905) 297 00 08</p>
        </div>
        <div className="contact-item contact-items-grid-1">
        <p>Наши e-mail:</p>
        <p>hello@recauto.ru</p>
        <p>recautos@yandex.ru</p>
        </div>
        <div className="contact-item contact-items-grid-3">
        <p>Мы находимся:</p>
        <p>160024, Вологодская обл.,</p>
        <p>г Вологда ул. Батюшкова, 11</p>
        </div>
      </div>
      <div className="map-container">
        <iframe
        src="https://yandex.ru/map-widget/v1/?um=constructor%3Aa0c0b4d1c70e04f25a803cc92b92c10bb5445c90a6c3b8e5223da1b0cd785b57&amp;source=constructor"
        width="100%"
        height="400"
        frameborder="0"
        ></iframe>
      </div>
      <div className="message-container">
        <p>Отправьте нам сообщение</p>
        <p>Если у вас есть какие-то вопросы  или предложения по сотрудничеству заполните форму ниже</p>
        <div className="contact-container">
        <div className="data-container">
        <input type="text" name="username" placeholder="Введите имя"/>
        <input type="email" name="email" placeholder="Email"/>
        <input type='phone' name='phone' placeholder='Введите телефон'/>
        </div>
        <div className="message-container">
        <textarea placeholder="Сообщение"></textarea>
        </div>
        </div>
        <button>Отправить</button>
      </div>
    </div>
    <Footer></Footer>
    </div>
  );
};

export default ContactPage;
