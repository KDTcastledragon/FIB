import './ReviewImgModal.css';
import Modal from 'react-modal';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ReviewImgModal = ({ image }) => {

    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const modalStyles = {
        content: {
            width: '25%',
            height: '530px',
            padding: '10px',
            border: 'solid 1px rgb(176, 176, 176)',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)'
        }
    };

    return (
        <label>
            <img className="review_con_img" src={`../img/${image}`} onClick={openModal} />

            <Modal
                style={modalStyles}
                isOpen={isModalOpen}
                onRequestClose={closeModal}
                contentLabel="모달"
            >
                <div className="review_modal_box">
                        <span className="review_modal_close" onClick={closeModal}>x</span>
                </div>
                <div className='review_modal_img'>
                    <img src={`../img/${image}`} />
                </div>

            </Modal>
        </label >
    );
};

export default ReviewImgModal;