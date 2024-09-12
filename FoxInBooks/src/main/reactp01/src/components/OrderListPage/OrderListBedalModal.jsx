import './OrderListBedalModal.css';
import React, { useState } from 'react';
import Modal from 'react-modal';

const OrderListBedalModal = (props) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const modalStyles = {
        content: {
            width: '900px',
            height: '440px',
            padding: '0',
            border: 'solid 1px black',
            top: '58%',
            left: '50%',
            transform: 'translate(-50%, -50%)'
        }
    };


    // const today = props.today
    const t = new Date();

    // const today = `${t.getFullYear()} - ${t.getMonth() + 1} - ${Number(t.getDate())}`

    const month = t.getMonth() + 2 + (Math.floor(Math.random() * 2));

    const day = (Math.floor(Math.random() * 25) + 1);

    const hour = (Math.floor(Math.random() * 24));

    const minute = (Math.floor(Math.random() * 60));

    console.log(`월 : ${month}`);
    console.log(`며칠이냐 : ${day}`);

    // const tomorrow = `${t.getFullYear()} - ${t.getMonth() + 1} - ${Number(t.getDate()) + 1}`;


    return (
        <div>
            <button className="order_check_btn" onClick={openModal}>배송조회</button>

            <Modal
                style={modalStyles}
                isOpen={isModalOpen}
                onRequestClose={closeModal}
                contentLabel="모달"
            >
                <div className='orderModal_container'>
                    <div className="order_check_close_btn_box">
                        <button onClick={closeModal}>X</button>
                    </div>

                    <div className='beasongtitle'>배송 조회</div>
                    <table>
                        <colgroup>
                            <col className="order_table_col-date" />
                            <col className="order_table_col-time" />
                            <col className="order_table_col-location" />
                            <col className="order_table_col-orderstate" />
                        </colgroup>

                        <thead>
                            <tr>
                                <th>날짜</th>
                                <th>시간</th>
                                <th>현재 위치</th>
                                <th>배송상태</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>{`2023 - 08 - 24`}</td>
                                <td>18:37</td>
                                <td>성남 여우</td>
                                <td>물품 출하</td>
                            </tr>

                            <tr>
                                <td>{`2023 - ${month.toString().padStart(2, 0)} - ${day.toString().padStart(2, 0)}`}</td>
                                <td>{`${hour.toString().padStart(2, 0)}:${minute.toString().padStart(2, 0)}`}</td>
                                <td>옥천 hub</td>
                                <td>집품</td>
                            </tr>
                            <tr>
                                <td>{`2023 - ${month.toString().padStart(2, 0)} - ${(day + 1).toString().padStart(2, 0)}`}</td>
                                <td>{`${(Math.floor(Math.random() * 24)).toString().padStart(2, 0)}:${(Math.floor(Math.random() * 60)).toString().padStart(2, 0)}`}</td>
                                <td>옥천hub</td>
                                <td>출하</td>
                            </tr>

                            <tr>
                                <td>{`2023 - ${month.toString().padStart(2, 0)} - ${(day + Math.floor(Math.random() * 5) + 1).toString().padStart(2, 0)}`}</td>
                                <td>{`${(Math.floor(Math.random() * 24)).toString().padStart(2, 0)}:${(Math.floor(Math.random() * 60)).toString().padStart(2, 0)}`}</td>
                                <td>화성(상)</td>
                                <td>집품</td>
                            </tr>

                            <tr>
                                <td>{`2023 - ${(month + 1).toString().padStart(2, 0)} - ${(day).toString().padStart(2, 0)}`}</td>
                                <td>{`${(Math.floor(Math.random() * 24)).toString().padStart(2, 0)}:${(Math.floor(Math.random() * 60)).toString().padStart(2, 0)}`}</td>
                                <td>화성(상)</td>
                                <td>물품 출하</td>
                            </tr>

                            <tr>
                                <td>{`2023 - ${(month + 1).toString().padStart(2, 0)} - ${(day + 1 + Math.floor(Math.random())).toString().padStart(2, 0)}`}</td>
                                <td>{`${(Math.floor(Math.random() * 24)).toString().padStart(2, 0)}:${(Math.floor(Math.random() * 60)).toString().padStart(2, 0)}`}</td>
                                <td>경기오산중앙</td>
                                <td>배송중</td>
                            </tr>

                            <tr>
                                <td>{`2023 - ${(month + 1).toString().padStart(2, 0)} - ${(day + 2 + Math.floor(Math.random() * 5) + 1).toString().padStart(2, 0)}`}</td>
                                <td>{`${(Math.floor(Math.random() * 24)).toString().padStart(2, 0)}:${(Math.floor(Math.random() * 60)).toString().padStart(2, 0)}`}</td>
                                <td>경기오산중앙</td>
                                <td>배송완료</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </Modal>
        </div >
    );
};

export default OrderListBedalModal;