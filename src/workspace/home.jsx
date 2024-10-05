import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import './workspace.css';

function Home() {
    const [currentIndex, setCurrentIndex] = useState(0);

    const nextSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % 2); // เปลี่ยนเป็น % 2 เพราะมีภาพ 4 ภาพ (0-1 คือ 3 ภาพ)
    };

    const prevSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + 2) % 2); // % 2 เพื่อให้วนกลับมา
    };
    return (
        <>
            <div>
                <Navbar />
                <div className='container1'>
                    <div className='discrip1'>
                        <div className='cat1'>
                            <h1>What will you get</h1>
                        </div>
                        <div className='cat2'>
                            <h3>from our store?</h3>
                        </div>

                    </div>
                    <div className='discrip'>
                        <p>"Our online stationery store offers the convenience of shopping anytime, anywhere, without the need to travel to a physical store. We provide a wide variety of products to choose from, ensuring the quality of the products you receive. Additionally, we offer fair pricing and various discount promotions to help you save money. Our store is an excellent choice for those who seek convenience and time-saving when shopping for stationery."</p>
                    </div>
                </div>
                <div className='container1'>
                    <div className='cat'>
                        <h2>Category</h2>
                    </div>
                    <div className='category'>
                        <div className="carousel rounded-box">
                            <div className="carousel-inner" style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
                                <div className="carousel-item">
                                    <Link to="/Pen">
                                        <img src="/pigg/c1.png" alt="product image" />
                                        <div className='des'>
                                            <span>Pens and Pencils</span>
                                        </div>
                                    </Link>
                                </div>
                                <div className="carousel-item">
                                    <Link to="/Paper">
                                        <img src="/pigg/c2.png" alt="product image" />
                                        <div className='des'>
                                            <span>Paper and Notebooks</span>
                                        </div>
                                    </Link>
                                </div>
                                <div className="carousel-item">
                                    <Link to="/Art">
                                        <img src="/pigg/c3.png" alt="product image" />
                                        <div className='des'>
                                            <span>Art and coloring Supplies</span>
                                        </div>
                                    </Link>
                                </div>
                                <div className="carousel-item">
                                    <Link to="/Office">
                                        <img src="/pigg/c4.png" alt="product image" />
                                        <div className='des'>
                                            <span>Office and School Supplies</span>
                                        </div>
                                    </Link>
                                </div>
                            </div>
                        </div>
                        <button className="carousel-control left" onClick={prevSlide}>❮</button>
                        <button className="carousel-control right" onClick={nextSlide}>❯</button>
                    </div>
                </div>
                <div className='magin'>
                    <div className='container1'>
                        <img className='im'
                            src="/pigg/image2.png" />
                    </div>
                </div>
                {/* <div className='container1'>
                    <div className='cat'>
                        <h2>Best Seller</h2>
                    </div>
                    <div className='category'>
                        <div className="carousel rounded-box">
                            <div className="carousel-inner" style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
                                <div className="carousel-item">
                                    <img src="/pigg/c1.png" alt="product image" />
                                </div>
                                <div className="carousel-item">
                                    <img src="/pigg/c2.png" alt="product image" />
                                </div>
                                <div className="carousel-item">
                                    <img src="/pigg/c3.png" alt="product image" />
                                </div>
                                <div className="carousel-item">
                                    <img src="/pigg/c4.png" alt="product image" />
                                </div>
                            </div>
                        </div>
                        <button className="carousel-control left" onClick={prevSlide}>❮</button>
                        <button className="carousel-control right" onClick={nextSlide}>❯</button>
                    </div>
                </div> */}
            </div>
        </>
    );
}

export default Home;
