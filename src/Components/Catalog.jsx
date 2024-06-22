import React, { useState, useEffect } from 'react';
import '../Components/Catalog.css';
import axios from 'axios';
import Header from '../Components/Header';
import { useLocation } from 'react-router-dom';

function Catalog() {
  const [filteredData, setFilteredData] = useState(null);
  const [minValue, setMinValue] = useState(0);
  const [maxValue, setMaxValue] = useState(5000);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedCategories, setSelectedCategories] = useState({
    1: false, // Шины
    2: false, // Тех запчасти
    3: false, // Масла
    4: false, // Инструменты
    5: false, // АвтоХимия
  });

  const location = useLocation();

  const handleMinChange = (e) => {
    const value = Math.min(Number(e.target.value), maxValue - 1);
    setMinValue(value);
  };

  const handleMaxChange = (e) => {
    const value = Math.max(Number(e.target.value), minValue + 1);
    setMaxValue(value);
  };

  const handleCategoryChange = (categoryId) => {
    setSelectedCategories({
      ...selectedCategories,
      [categoryId]: !selectedCategories[categoryId],
    });
  };

  const filterByPriceAndCategory = (searchQuery = '') => {
    if (!data) return;

    // Фильтрация по цене
    let filtered = data.filter((item) => item.price >= minValue && item.price <= maxValue);

    // Фильтрация по категориям, если выбраны
    const selectedCategoryValues = Object.values(selectedCategories);
    if (selectedCategoryValues.some((value) => value)) {
      filtered = filtered.filter((item) => selectedCategories[item.info_id]);
    }

    // Фильтрация по поисковому запросу
    if (searchQuery) {
      filtered = filtered.filter((item) =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.articul.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setFilteredData(filtered);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://b279-94-141-125-64.ngrok-free.app/api/detail/all', {
          headers: {
            'ngrok-skip-browser-warning': 'true',
          },
        });
        setData(response.data); 
        setFilteredData(response.data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const infoId = params.get('info_id');
    const searchQuery = params.get('search');
    if (infoId) {
      setSelectedCategories((prevCategories) => ({
        ...prevCategories,
        [infoId]: true,
      }));
    }
    filterByPriceAndCategory(searchQuery);
  }, [location.search]);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const searchQuery = params.get('search');
    filterByPriceAndCategory(searchQuery);
  }, [minValue, maxValue, data, selectedCategories]);

  const handleBuyClick = async (itemId) => {
    try {
      const response = await axios.post('https://b279-94-141-125-64.ngrok-free.app/api/basket/add', {
        detail_id: itemId
      }, {
        headers: {
          'ngrok-skip-browser-warning': 'true',
        },
      });
  
      if (response.status === 200) {
        alert('Товар добавлен в корзину');
      } else {
        console.error('Ошибка при добавлении товара в корзину', response.status, response.statusText);
        alert('Не удалось добавить товар в корзину');
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error('AxiosError:', error.response?.data || error.message);
        alert(`Ошибка при добавлении товара в корзину: ${error.response?.data?.message || error.message}`);
      } else {
        console.error('Unexpected error:', error);
        alert('Произошла неожиданная ошибка при добавлении товара в корзину');
      }
    }
  };
  
  

  if (error) return <p>Error: {error.message}</p>;

  return (
    <>
      <Header />
      <div className='glivn'>
        <div className="container-common">
          <div className="sidebar">
            <div className="filter-section">
              <h4>Price Range</h4>
              <div className="range-container">
                <input
                  type="number"
                  className="range-input"
                  value={minValue}
                  onChange={handleMinChange}
                  min="0"
                  max="10000"
                />
                <span>:</span>
                <input
                  type="number"
                  className="range-input"
                  value={maxValue}
                  onChange={handleMaxChange}
                  min="0"
                  max="10000"
                />
                <div className="slider-container">
                  <input
                    type="range"
                    min="0"
                    max="10000"
                    value={minValue}
                    onChange={handleMinChange}
                    className="slider"
                  />
                  <input
                    type="range"
                    min="0"
                    max="10000"
                    value={maxValue}
                    onChange={handleMaxChange}
                    className="slider"
                  />
                </div>
              </div>
            </div>

            <div className="filter-section">
              <h4>Categories</h4>
              {Object.keys(selectedCategories).map((categoryId) => (
                <label key={categoryId} className={`category-label category-${categoryId}`}>
                  <input
                    type="checkbox"
                    value={categoryId}
                    checked={selectedCategories[categoryId]}
                    onChange={() => handleCategoryChange(categoryId)}
                    className={`category-checkbox category-${categoryId}`}
                  />
                  {categoryId === '1' && "Шины"}
                  {categoryId === '2' && "Тех запчасти"}
                  {categoryId === '3' && "Масла"}
                  {categoryId === '4' && "Инструменты"}
                  {categoryId === '5' && "АвтоХимия"}
                  <span>(1)</span>
                </label>
              ))}
            </div>
          </div>
          <div className="product-grid">
            {filteredData && filteredData.map((item) => (
              <div key={item.detail_id} className="product-card">
                <img src={`data:image/png;base64,${item.img}`} alt={item.name} />
                <h2>{item.name}</h2>
                <div className="info">
                  <p className="price">Price: {item.price}</p>
                  <button className="buy-button" onClick={() => handleBuyClick(item.detail_id)}>Купить</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default Catalog;
