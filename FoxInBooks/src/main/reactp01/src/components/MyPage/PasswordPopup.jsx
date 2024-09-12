import React, { useEffect, useState } from 'react';
import './PasswordPopup.css';

const PasswordPopup = ({ isOpen, onClose, onSubmit }) => {
    const [popupPassword, setPopupPassword] = useState('');

    const handlePasswordChange = (e) => {
        setPopupPassword(e.target.value);
    }

    const handleKey = (e) => {
        if (e.key === 'Enter') {
            if (e.target.id === 'password') {
                onSubmit(popupPassword);
            }
        } else if (e.key === 'Escape') {
            onClose();
        }
    }

    useEffect(() => {
        if (isOpen) {
            document.addEventListener('keydown', handleKey);
        }

        return () => {
            document.removeEventListener('keydown', handleKey);
        };
    }, [isOpen, onSubmit, onClose, popupPassword]);

    if (!isOpen) {
        return null;
    }

    return (
        <div className="PasswordPopup">
            <div className="popup-content">
                <h2>비밀번호 확인</h2>
                <input type="password" placeholder="비밀번호 입력"
                    name='password' id='password' value={popupPassword}
                    autoComplete='off' className='popup_input'
                    onChange={handlePasswordChange} />
                <div className='popup_button'>
                    <button onClick={() => onSubmit(popupPassword)}>확인</button>
                    <button onClick={onClose}>취소</button>
                </div>
            </div>
        </div>
    );
};

export default PasswordPopup;