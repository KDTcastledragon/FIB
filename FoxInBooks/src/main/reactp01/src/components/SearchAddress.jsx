import * as React from 'react-daum-postcode';
import DaumPostcode from 'react-daum-postcode';
import './SearchAddress.css';
import { useState } from 'react';

function SearchAddress({ onAddress_zip, onAddress, onAddress_detail }) {
    const [address_zip, setAddress_zip] = useState('');
    const [address, setAddress] = useState('');
    const [address_detail, setAddress_detail] = useState('');
    const [showAddressSearch, setShowAddressSearch] = useState(false);

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
        setShowAddressSearch(false);

        onAddress_zip(data.zonecode);
        onAddress(selectedAddress);
    };

    const resetAddress = () => {
        setAddress_zip('');
        setAddress('');
        setAddress_detail('');
    };

    return (
        <div className='SearchAddress'>
            <div className='search_address_btn_container'>
                <button type="button" onClick={() => setShowAddressSearch(true)} className='SearchAddress_btn'>
                    주소 검색
                </button>
                <button type="button" onClick={resetAddress} className='SearchAddress_btn'>
                    주소 초기화
                </button>
            </div>
            {showAddressSearch && (
                <div className='DaumPostcode'>
                    <DaumPostcode onComplete={handleComplete}></DaumPostcode>
                </div>
            )}
            <div>
                <input
                    type="text"
                    id="sample6_postcode"
                    name='address_zip'
                    placeholder="우편번호"
                    value={address_zip}
                    onChange={(e) => onAddress_zip(e.target.value)}
                    readOnly
                />
                <br />
                <input
                    type="text"
                    id="sample6_address"
                    name='address'
                    placeholder="주소"
                    value={address}
                    onChange={(e) => onAddress(e.target.value)}
                    readOnly
                />
                <br />
                <input
                    type="text"
                    id="sample6_detailAddress"
                    name='address_detail'
                    placeholder="상세주소"
                    autoComplete='off'
                    value={address_detail}
                    onChange={(e) => {
                        setAddress_detail(e.target.value);
                        onAddress_detail(e.target.value);
                    }}
                />
            </div>
        </div>
    );
}

export default SearchAddress;