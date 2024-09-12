import './DeliveryAddressModal.css';
import Modal from 'react-modal';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const DeliveryAddressModal = ({ loginID, setAddressSelected }) => {

    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const modalStyles = {
        content: {
            width: '75%',
            padding: '45px 0',
            border: 'solid 1px rgb(176, 176, 176)',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)'
        }
    };

    // --------------------------------------------------
    // 배송지 정보 조회
    const [addressList, setAddressList] = useState([]);

    useEffect(() => {
        axios.post(
            `/address/selectList`,
            {
                user_id: loginID
            }
        ).then((response) => {
            setAddressList(response.data);
            console.log('배송지 내역 조회 성공');
        }).catch((err) => {
            console.log(`배송지 내역 조회 실패 : ${err.message}`);
        });
    }, []);

    // 배송지 정보 선택
    const addressOnclick = (name, address_zip, address, address_detail, phone_number) => {
    setAddressSelected({
        name: name,
        address_zip: address_zip,
        address: address,
        address_detail: address_detail,
        phone_number: phone_number
    });
};

return (
    <label>
        <input type="radio" name="order_addr_select" id="addr_selectData" onClick={openModal} />&nbsp;배송지 선택

        <Modal
            style={modalStyles}
            isOpen={isModalOpen}
            onRequestClose={closeModal}
            contentLabel="모달"
        >
            <div className="payment_modal_box">
                <div className="payment_modal_title d-flex">
                    <span className="payment_modal_title_coupon">배송지 내역</span>
                    <span>
                        <button className="payment_modal_title_btn" onClick={closeModal}>선택완료</button>
                    </span>
                </div>

                <table className='AddressModalTable'>

                    <colgroup>
                        <col className="AddressModalTable1" />
                        <col className="AddressModalTable2" />
                        <col className="AddressModalTable3" />
                        <col className="AddressModalTable4" />
                        <col className="AddressModalTable5" />
                    </colgroup>

                    <thead>
                        <tr>
                            <td></td>
                            <td>주소명</td>
                            <td>주소</td>
                            <td>연락처</td>
                            <td>수령인</td>
                        </tr>
                    </thead>

                    <tbody>
                        {
                            addressList.map(index => (
                                <tr key={index}>
                                    <td><input type="radio" name="addressSelectInput" onClick={() => addressOnclick(index.name, index.address_zip, index.address, index.address_detail, index.phone_number)} /></td>
                                    <td className={index.basic_address ? 'addressAs' : ''}>{index.address_as}</td>
                                    <td>&#40;{index.address_zip}&#41;&nbsp;&nbsp;
                                        {index.address}&#44;&nbsp;&nbsp;
                                        {index.address_detail}</td>
                                    <td>{index.phone_number}</td>
                                    <td>{index.name}</td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
        </Modal>
    </label>
);
};

export default DeliveryAddressModal;