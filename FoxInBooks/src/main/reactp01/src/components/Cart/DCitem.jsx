import { Link } from 'react-router-dom';
import './CartItem.css';
import { useState, useEffect } from 'react';
import axios from 'axios';

const CartItem = (props) => {
    //===============================================================================================================
    const { proamount, setProamount, isAllChecked } = props;

    const [isChecked, setIsChecked] = useState(0);

    // 수량 더하기
    function addProamount() {
        setProamount(proamount + 1);
    };

    // 수량 빼기 (최소값 1로 고정)
    function subtractProamount() {
        setProamount(proamount - 1);
        console.log(`subtract내부 : `, proamount);
        if (proamount <= 1) {
            setProamount(1);
        }
    };

    //===============================================================================================================

    useEffect(() => {
        const UpdatedProamountData = {
            cart_code: props.cart_code,
            product_code: props.product_code,
            proamount: proamount
        };

        axios
            .post(`/cart/cartProamountUpdateAction`, UpdatedProamountData)
            .then((response) => {

            }).catch((err) => {
                alert(`수량 변경 실패!! ${err.message}`);
            });

    }, [proamount]);



    //===============================================================================================================

    function DeleteThisProduct() {

        const DeleteThisProductData = {
            product_code: props.product_code,
            cart_code: props.cart_code
        };

        axios
            .post(`/cart/cartDeleteThisAction`, DeleteThisProductData)
            .then((response) => {
                console.log(`카트목록 삭제 성공 : `, response.data);
                console.log('========================================');
                alert(`카트목록 삭제  성공 `, response.data);

            }).catch((err) => {
                alert(`카트목록 삭제 실패!! ${err.message}`);
                console.log(props.cart_code);
            });

        window.location.reload();

    };


    //=====================================================================================================

    // 부모 컴포넌트로 선택된 상태와 함께 cart_code 전송.
    const handleCheckboxChange = () => {
        setIsChecked(!isChecked);

        props.onSelectItem(props.cart_code,
            props.product_code,
            props.protype,
            props.domestic,
            props.title,
            props.image,
            props.proamount,
            props.price,
            !isChecked);

        console.log(`개당체크 : `, isChecked);


    };


    useEffect(() => {
        setIsChecked(isAllChecked);
    }, [isAllChecked]);

    console.log(`isChecked[Item](${props.cart_code}) & ${isChecked} ======Item 절취선======Item 절취선======`);

    //=====================================================================================================
    return (
        <tr className='CartItemTbodyContainer'>
            <td className='CartItemCheckBoxTd'>
                <input style={{ width: '25px', height: '25px' }} type="checkbox" checked={isChecked} onChange={handleCheckboxChange} />
            </td>

            <td className='CartItemInfomationTd'>
                <div className='CartItemImage'>
                    <img src={`../img/${props.image}`} alt="image" />
                </div>
                <div className='CartItemTitleDomesticProtype'>
                    <div className='CartItemTitle'>{props.title}</div>
                    <div>
                        <span className='CartItemDomesticProtype'>{props.domestic == 1 ? '국내' :
                            props.domestic == 2 ? '영/미' :
                                props.domestic == 3 ? '프랑스' :
                                    props.domestic == 4 ? '독일' : '기타'} {props.protype == 1 ? '도서' :
                                        props.protype == 2 ? '도서제품' : '분류 외 제품'}
                        </span>
                    </div>
                </div>
            </td>

            <td className='CartItemPriceTd'>
                <span className='CartItemPrice'>{props.price.toLocaleString()}</span>&nbsp;
                <span className='CartItemPriceUnit'>원</span>
            </td>

            <td className='CartItemProamountTd'>
                <div className='CartItemProamountDiv'>
                    <button type='button' onClick={subtractProamount} className='CartItemProamountHandleButton'>-</button>
                    <input className='CartItemProamountInput' type='number' value={proamount} name='itemProamount'
                        id='itemProamount' onChange={(e) => {
                            setProamount(e.target.value);
                            console.log(`e.타겟 변경 확인 : `, proamount);
                        }
                        } min={1} />
                    <button type='button' onClick={addProamount} className='CartItemProamountHandleButton'>+</button>
                </div>
            </td>

            <td className='CartItemTotalPriceTd'>
                <span className='CartItemTotalPrice'>{(props.price * proamount).toLocaleString()}</span>&nbsp;
                <span className='CartItemTotalPriceUnit'>원</span>
            </td>

            <td className='CartItemDeleteTd'>
                <button type='button' onClick={DeleteThisProduct} className='CartItemDeleteButton' >삭제</button>
                {/* <span>{props.cart_code}</span> */}
            </td>
        </tr>
    );

}

export default CartItem;