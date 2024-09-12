import './CartPage.css';
import { useState, useEffect } from 'react';
import CartItem from './CartItem';
import { Link } from 'react-router-dom';
import CartCautionBox from './CartCautionBox';
import CartAdvertise from './CartAdvertise';
import axios from 'axios';

const CartPage = () => {
    //====================================================================================================
    const [cartData, setCartData] = useState([]);
    const [selectedItems, setSelectedItems] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);
    const [isAllChecked, setIsAllChecked] = useState(0);

    const loginID = sessionStorage.getItem("loginID");

    useEffect(() => {
        axios
            .get(`/cart/cartlistParam?id=${loginID}`)
            .then((response) => {
                console.log(`response 성공 :`, response);
                console.log('========================================');

                setCartData(response.data);

            }).catch((err) => {
                alert(`서버연결 실패 => ${err.message}`);
            });
    }, []);

    //=========================================================================================================================

    useEffect(() => {
        const calculatedTotalPrice = selectedItems.reduce((total, item) => total + item.price * item.proamount, 0);
        setTotalPrice(calculatedTotalPrice);
    }, [selectedItems, selectedItems.proamount]);

    //=========================================================================================================================

    // 수량 업데이트
    const handleUpdateProamount = (cartCode, newProamount) => {
        const updatedCartData = cartData.map((item) =>
            item.cart_code === cartCode ? { ...item, proamount: newProamount } : item

        );

        setCartData(updatedCartData);   // 업데이트

        const updatedSelectedItems = selectedItems.map((item) =>
            item.cart_code === cartCode ? { ...item, proamount: newProamount } : item
        );

        setSelectedItems(updatedSelectedItems);

    };


    //=========================================================================================================================
    const handleSelectItem = (cart_code, product_code, protype, domestic, title, image, proamount, price, isChecked) => {
        setSelectedItems((prevSelectedItems) => {
            if (isChecked == true) {
                return [
                    ...prevSelectedItems,
                    {
                        cart_code: cart_code,
                        product_code: product_code,
                        protype: protype,
                        domestic: domestic,
                        title: title,
                        image: image,
                        proamount: proamount,
                        price: price,
                    }
                ];
            } else {

                return prevSelectedItems.filter((item) => item.cart_code !== cart_code);

            }
        });

    }
    //=========================================================================================================================

    const handleAllSelectCartLists = (e) => {
        setIsAllChecked(e);

        if (e == 1) {
            setSelectedItems(cartData);
        }

        else {
            setSelectedItems([]);
        }

        console.log(`e : `, e);

    };

    //=========================================================================================================================

    const handleDeleteSelected = () => {
        const selectedCartCodeArray = selectedItems.map((item) => item.cart_code);

        console.log(`selectdCartCodeArray : `, selectedCartCodeArray);

        axios
            .post(`/cart/cartDeleteSelectedAction`, selectedCartCodeArray)
            .then((response) => {
                console.log(`선택목록 삭제 성공:`, response.data);
                console.log('========================================');
                alert(`선택목록 삭제 성공`, response.data);


                // 삭제 후, 다시 장바구니 목록 가져오기
                axios
                    .get(`/cart/cartlistParam?id=${loginID}`)
                    .then((response) => {
                        console.log(`response 성공 :`, response);
                        setCartData(response.data);

                    }).catch((err) => {
                        alert(`서버연결 실패 => ${err.message}`);
                    });


            }).catch((err) => {
                alert(`선택목록 삭제 실패!! ${err.message}`);
            });


        window.location.reload(); // 새로고침 처리.

    };


    //====================================================================================================================

    console.log(`selectedItems[Page] : `, selectedItems);
    console.log(`totalPrice[Page](147) : `, totalPrice);
    console.log(`isAllChecked[Page](151) : `, isAllChecked);
    console.log(`======Page 분단======Page 분단======Page 분단======Page 분단======Page 분단======`);

    const firstSelectWarning = () => {
        alert(`구매하실 상품을 먼저 선택해주세요. `);
    }


    //=====================================================================================================================
    return (
        <div className='CartPageContainer'>
            <span className='CartPageTitle'>장바구니 페이지</span>&nbsp;&nbsp;
            <span className='CartPageSubtitle'>구매하실 상품목록들을 확인하실 수 있는 페이지입니다.</span>

            <div className='deleteSelectedItemsButtonDiv'>
                <button onClick={handleDeleteSelected} className='deleteSelectedItemsButton'>선택목록 삭제</button>&nbsp;&nbsp;&nbsp;
            </div>

            {/* 카트페이지 =========================================================================== */}
            <table className="CartPageTable">
                <thead>
                    <tr>
                        <th style={{ width: '6%' }} >
                            <input type='checkbox' style={{ width: '26px', height: '26px' }} checked={isAllChecked}
                                onChange={(e) => { handleAllSelectCartLists(e.target.checked) }} />
                        </th>
                        <th style={{ width: '35%' }}>상품정보</th>
                        <th style={{ width: '10%' }}>가격</th>
                        <th style={{ width: '12%' }}>수량</th>
                        <th style={{ width: '15%' }}>총 가격</th>
                        <th style={{ width: '8%' }}>삭제</th>
                    </tr>
                </thead>

                <tbody>
                    {cartData.length === 0 ?
                        <tr className='cartDataIsVacant'>
                            <td colSpan='4'>장바구니에 담은 상품이 없습니다.</td>
                        </tr>
                        :
                        cartData.map((d, i) => (
                            <CartItem
                                key={i}
                                cart_code={d.cart_code}
                                id={d.id}
                                product_code={d.product_code}
                                protype={d.protype}
                                domestic={d.domestic}
                                title={d.title}
                                image={d.image}
                                proamount={d.proamount}
                                price={d.price}
                                onSelectItem={handleSelectItem}
                                onDeleteSelected={handleDeleteSelected}
                                onSelectAllItems={handleAllSelectCartLists}
                                isAllChecked={isAllChecked}
                                setProamount={(newProamount) => handleUpdateProamount(d.cart_code, newProamount)}
                            />
                        ))}
                </tbody>
            </table>

            <div className='TotalOrderAndCartAdvertise'>
                <table className='settlementTotalOrderTable'>
                    <tbody>
                        <tr className='totalPriceOfSelectedItemsTr'>
                            <td style={{ width: '10px' }}></td>
                            <td style={{ width: '170px' }} className='totalPriceOfSelectedItemsColumn'>선택 상품 총 금액 </td>
                            <td> : </td>
                            <td>
                                <span className='totalPriceOfSelectedItems'>{totalPrice ? totalPrice.toLocaleString() : 0}</span>&nbsp;
                                <span className='totalPriceOfSelectedItemsUnit'>원</span></td>
                        </tr>

                        <tr className='shippingChargeTr'>
                            <td></td>
                            <td className='shippingChargeColumn'>배송금액</td>
                            <td> : </td>
                            <td className='shippingCharge'>
                                {totalPrice >= 20000 ? '무료' : `${(3500).toLocaleString()} 원`}
                            </td>
                        </tr>

                        <tr className='finalTotalPriceOfSelectedItemsTr'>
                            <td></td>
                            <td className='finalTotalPriceOfSelectedItemsColumn'>최종 결제 금액</td>
                            <td> : </td>
                            <td>
                                <span className='finalTotalPriceOfSelectedItems'>
                                    {totalPrice == 0 ? 0 : totalPrice >= 20000 ? totalPrice.toLocaleString() : (totalPrice + 3500).toLocaleString()}
                                </span>
                                <span> 원</span>
                            </td>
                        </tr>
                    </tbody>
                </table>

                <div>
                    <CartAdvertise />
                </div>
            </div>
            <div className='basket_total_sum_container'>


                <div className='CartPageMoveToOtherPageButton'>

                    <Link to='/'><button className='CartPageToHome'>계속 쇼핑하기</button></Link>

                    <div className='CartPageToPayment'>{selectedItems.length > 0 ? (<Link to={`/PaymentPage`}
                        state={{ order_data: selectedItems }}>
                        바로구매
                    </Link>)
                        :
                        (<Link to={`/CartPage`}
                            state={{ order_data: selectedItems }}
                            onClick={firstSelectWarning}>
                            바로구매
                        </Link>)}

                    </div>
                </div>

            </div>

            <div>
                <CartCautionBox />
            </div>

        </div >
    );
};


export default CartPage;