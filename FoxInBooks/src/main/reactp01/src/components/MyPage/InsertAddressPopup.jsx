import * as React from 'react-daum-postcode';
import DaumPostcode from 'react-daum-postcode';
import './InsertAddressPopup.css';
import { useState } from 'react';
import axios from 'axios';

function InsertAddressPopup({ isOpen, onClose }) {
    const [defaultPhone_number, setDefaultPhone_number] = useState(JSON.parse(sessionStorage.user).phone_number);
    const [defaultName, setDefaultName] = useState(JSON.parse(sessionStorage.user).name);

    const [address_zip, setAddress_zip] = useState('');
    const [address, setAddress] = useState('');
    const [address_detail, setAddress_detail] = useState('');
    const [addressName, setAddressName] = useState('');
    const [phone_number, setPhone_number] = useState('');
    const [name, setName] = useState('');

    const [isChecked, setIsChecked] = useState(false);
    const [basic_address, setBasic_address] = useState(false);

    const [insertAddressButton, setInsertAddressButton] = useState(true);

    const handleComplete = (data) => {
        let selectedAddress = data.userSelectedType === 'R' ? data.roadAddress : data.jibunAddress;

        if (data.userSelectedType === 'R') {
            let detailAddr = '';

            if (data.bname !== '' && /[동|로|가]$/g.test(data.bname)) {
                detailAddr += data.bname;
            }
            if (data.buildingName !== '' && data.apartment === 'Y') {
                detailAddr += detailAddr !== '' ? `, ${data.buildingName}` : data.buildingName;
            }
            if (detailAddr !== '') {
                detailAddr = ` (${detailAddr})`;
            }

            setAddress_detail(detailAddr);
        } else {
            setAddress_detail('');
        }

        setAddress_zip(data.zonecode);
        setAddress(selectedAddress);
        document.getElementById('sample6_postcode').value = data.zonecode;
        document.getElementById('sample6_address').value = selectedAddress;

    };

    function changeButton() {
        address_zip && address && address_detail && address_detail.length <= 100
            ? setInsertAddressButton(false) : setInsertAddressButton(true);
    }

    const insertAddress = () => {
        axios({
            url: 'address/insert',
            method: 'post',
            headers: { 'Content-Type': 'application/json' },
            data: {
                user_id: JSON.parse(sessionStorage.user).id,
                name: isChecked ? defaultName : name,
                address_zip: address_zip,
                address: address,
                address_detail: address_detail,
                address_as: isChecked ? '기본 배송지' : addressName,
                phone_number: isChecked ? defaultPhone_number : phone_number,
                basic_address: basic_address
            }
        }).then((res) => {
            alert("등록 완료");
            sessionStorage.setItem('user', JSON.stringify(res.data));
            onClose();
        }).catch((err) => {
            if (err.response.status == 502) {
                alert("이미 존재하는 주소입니다.");
            } else {
                alert('입력 오류입니다.');
            }
        });
    }

    if (!isOpen) {
        return null;
    }

    return (
        <div className='InsertAddressPopup'>
            <div className='insert_address_popup_content'>
                <div className='DaumPostcode'>
                    <DaumPostcode onComplete={handleComplete}></DaumPostcode>
                </div>
                <div>
                    <div className='insert_address_postcode_container'>
                        <input
                            type="text"
                            id="sample6_postcode"
                            name='address_zip'
                            placeholder="우편번호"
                            value={address_zip}
                            onKeyUp={changeButton}
                            onChange={(e) => setAddress_zip(e.target.value)}
                            readOnly
                        />
                        <br />
                        <input
                            type="text"
                            id="sample6_address"
                            name='address'
                            placeholder="주소"
                            value={address}
                            onKeyUp={changeButton}
                            onChange={(e) => setAddress(e.target.value)}
                            readOnly
                        />
                        <br />
                        <input
                            type="text"
                            id="sample6_detailAddress"
                            name='address_detail'
                            placeholder="상세주소 (100자 이하)"
                            autoComplete='off'
                            value={address_detail}
                            onKeyUp={changeButton}
                            onChange={(e) => {
                                setAddress_detail(e.target.value);
                            }}
                        />
                    </div>
                    <div className='insert_address_option'>
                        <div>
                            <span>주소명 :&nbsp;</span>
                            <input type="text" placeholder='20자 이하'
                                onChange={(e) => setAddressName(e.target.value)}
                                value={isChecked ? '기본 배송지' : addressName} />
                        </div>
                        <div>
                            <span>연락처 :&nbsp;</span>
                            <input type="text" placeholder='숫자만 입력'
                                onChange={(e) => setPhone_number(e.target.value)}
                                value={isChecked ? defaultPhone_number : phone_number} />
                        </div>
                        <div>
                            <span>수령인 :&nbsp;</span>
                            <input type="text" placeholder='30자 이하'
                                onChange={(e) => setName(e.target.value)}
                                value={isChecked ? defaultName : name} />
                        </div>
                    </div>
                    <div className='insert_address_checkbox_container'>
                        <input type="checkbox" className='insert_address_checkbox' id='insert_address_checkbox'
                            checked={isChecked}
                            onChange={() => {
                                setIsChecked(!isChecked);
                                setBasic_address(!basic_address);
                            }} />
                        <label htmlFor="insert_address_checkbox">기본 배송지로 설정 &#40;회원정보와 동일&#41;</label>
                    </div>
                </div>
                <div className='search_address_btn_container'>
                    <button type="button" className='insertAddress_btn'
                        onClick={insertAddress}
                        disabled={insertAddressButton}>
                        확인
                    </button>
                    <button type="button" onClick={onClose} className='SearchAddress_btn'>
                        취소
                    </button>
                </div>
            </div>
        </div>
    );
}

export default InsertAddressPopup;