import './DetailPageBook.css';

import { Link } from "react-router-dom";
import React, { useEffect, useState } from 'react';
import axios from 'axios';

function DetailPageBook({ oneProductWriterJoin }) {

    const { product_code, protype, title, translator, publisher, image, price, writer } = oneProductWriterJoin;

    // 로그인 아이디
    const loginID = sessionStorage.getItem("loginID");

    // 수량에 따른 합계 금액 출력
    // 수량
    const [selected_quantity, setSelected_quantity] = useState(1);
    // 수량 X 가격
    const quantity_sum = selected_quantity * price;
    // 변경된 수량
    const onChange_quantity = (e) => {
        setSelected_quantity(parseInt(e.target.value));
    }

    // 제품정보 + 수량 데이터
    const [order_data, setOrder_data] = useState('');

    useEffect(() => {
        setOrder_data(
            [{
                ...oneProductWriterJoin,
                proamount: selected_quantity
            }]);
    }, [oneProductWriterJoin, selected_quantity]);

    // 장바구니 버튼
    function saveOnCart() {
        if (loginID == null) {
            alert('로그인 후 이용 가능합니다.')
        } else {
            const savedDataOnCart = {
                product_code: product_code,
                proamount: selected_quantity,
                id: loginID
            };

            axios
                .post(`/cart/cartOnSaveAction`, savedDataOnCart)
                .then((response) => {
                    console.log(`response.OK :`, response.status);

                    if (window.confirm('장바구니로 이동하시겠습니까?')) {
                        window.location.href = `/CartPage`;
                    } else {
                        window.location.href = `/DetailPage/${product_code}`;
                    }
                }).catch((err) => {
                    alert(`담기 실패!! ${err.message}`);
                });
        }
    };

    const orderLoginCheck = () => {
        alert('로그인 후 구매 가능합니다.');
        window.location.href = `/LogIn`;
    }

    return (
        <div className="book d-flex" >
            <div className="book_img">
                <img className="book_img_01" src={`../img/${image}`} alt="book" />
            </div>

            <div className="book_info_box d-flex">
                <div className="book_name_box">
                    <strong className="book_name">{title}</strong>

                    {
                        protype == 1 ?
                            <strong className='book_author'>{writer} (지은이),</strong>
                            :
                            ''
                    }

                    {
                        translator !== '' ?
                            <strong className='book_compiler'>{translator} (옮긴이),</strong>
                            :
                            ''
                    }

                    {
                        protype == 1 ?
                            <strong className='book_publishingHouse'>{publisher} (출판사)</strong>
                            :
                            ''
                    }

                </div>
                <div className='book_info_box_line'>
                    <hr className='DetailPage_line' />
                </div>

                <div className="book_info">

                    <div className="book_info_01 d-flex">
                        <div className="book_info_01_L">판매가</div>
                        <div className="book_info_01_R">
                            <span className="book_info_01_pri">{(price || '').toLocaleString()}원</span>
                        </div>
                    </div>

                    <div className="book_info_02 d-flex">
                        <div className="book_info_02_L">적립 포인트</div>
                        <div className="book_info_02_R">5%</div>
                    </div>

                    {
                        publisher !== '주식회사 여우' ?
                            <div className="book_info_03 d-flex" >
                                <div className="book_info_03_L">전자책</div>
                                <div className="book_info_03_R">10,000원</div>
                            </div>
                            :
                            <div className="book_info_03 d-flex" >
                                <div className="book_info_03_L">제조사</div>
                                <div className="book_info_03_R">주식회사 여우</div>
                            </div>
                    }

                    <div className="book_info_04 d-flex">
                        <div className="book_info_04_L">배송료</div>
                        {
                            price >= 20000 ?
                                <div className="book_info_04_R" >무료</div>
                                :
                                <div className="book_info_04_R">3,500원</div>
                        }

                    </div>

                    <div className="book_info_05 d-flex">
                        <div className="book_info_05_L">수량</div>
                        <div className="book_info_05_R d-flex">
                            <select className='quantity' min='1' onChange={onChange_quantity} value={selected_quantity}>
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                                <option value="5">5</option>
                                <option value="6">6</option>
                                <option value="7">7</option>
                                <option value="8">8</option>
                                <option value="9">9</option>
                                <option value="10">10</option>
                            </select>
                            <p className='quantity_sum_box'>
                                총 상품금액 <span className='quantity_sum_price'>{(quantity_sum || '').toLocaleString()}</span>원
                            </p>
                        </div>
                    </div>
                </div>

                <div className="book_info_06 d-flex">
                    <div className="book_info_06_L">
                        <button type="button" className="detailCart" onClick={saveOnCart}>장바구니 담기</button>
                    </div>
                    <div className="book_info_06_R">
                        {
                            loginID == null ?
                                <div className='buy' onClick={orderLoginCheck}>바로구매</div>
                                :
                                <Link to={`/PaymentPage`}
                                    state={{ order_data: order_data }}
                                    className='buy'>
                                    바로구매
                                </Link>
                        }
                    </div>
                </div>
            </div>
        </div >
    );
}

export default DetailPageBook;