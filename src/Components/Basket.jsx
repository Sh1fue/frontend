import { useState } from 'react';
import '../Components/Basket.css';
import images from '../assets/images.jpg';
import Header from './Header';
const Basket = () => {
  const items = [
    { id: 1, name: 'Двигатель какой то там', price: 9999, quantity: 1 },
    { id: 2, name: 'Двигатель какой то там', price: 9999, quantity: 1 },
    { id: 3, name: 'Двигатель какой то там', price: 9999, quantity: 1 },
  ];

  const totalPrice = items.reduce((total, item) => total + item.price * item.quantity, 0);
  const [modalActive, setModalActive] = useState(true)
  return (
    <>
    <Header></Header>
    <div className="cart-container">
      <div className="items">
        {items.map((item) => (
          <div className="item" key={item.id}>
            <img src={images} alt="product" />
            <div className="dlr">
            <div className="details">
              <p className="name">{item.name}</p>
              <p className="brand">фирма</p>
              <div className="actions">
                <button>В избранное</button>
                <button>Удалить</button>
              </div>
            </div>


            <div className="quantity-price">
            <div className="quantity">
              <button>-</button>
              <span>{item.quantity}</span>
              <button>+</button>
            </div>
            <div className="price">{item.price} Р</div>
          </div>
          </div>

          </div>
        ))}
      </div>
      <div className="summary">
        <p>Ваш заказ</p>
        <p>Всего: {items.length} шт</p>
        <p>Стоимость товаров в заказе: {totalPrice} Р</p>
        <p>Итого к оплате: {totalPrice + 800} Р</p>
        <button>Перейти к оформлению</button>
      </div>
    </div>
    </>
  );
};

export default Basket;
