import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './UserDelete.css';
import PasswordPopup from './PasswordPopup';


function UserDelete() {
    const navigate = useNavigate();

    const [id, setId] = useState(JSON.parse(sessionStorage.user).id);
    const [isPasswordPopupOpen, setPasswordPopupOpen] = useState(false);
    const [isChecked, setIsChecked] = useState(false);

    const openPasswordPopup = () => {
        if (isChecked) {
            setPasswordPopupOpen(true);
        } else {
            alert('안내사항에 동의하셔야 합니다.');
        }
    }

    const closePasswordPopup = () => {
        setPasswordPopupOpen(false);
    }

    const handleDeleteSubmit = (popupPassword) => {

        axios({
            url: "/user/delete",
            method: 'post',
            headers: { 'Content-Type': 'application/json' },
            data: {
                id: id,
                password: popupPassword
            }
        }).then((res) => {
            sessionStorage.removeItem('user');
            sessionStorage.removeItem('loginID');
            sessionStorage.removeItem('loginName');

            alert(res.data);
            navigate('/');
        }).catch((error) => {
            alert(error.response.data);
        });
        closePasswordPopup();
    }

    const handlePasswordSubmit = (popupPassword) => {
        handleDeleteSubmit(popupPassword);
    }

    const cancel = () => {
        navigate("/MyPage");
    }

    return (
        <div className='UserDelete'>
            <div className='index_text'><h1>회원 탈퇴</h1></div>
            <div className='sub_text'>회원 탈퇴하기에 앞서 안내사항을 반드시 확인해주세요.</div>
            <div className='explain_container'>
                <div>
                    <div className='header_text'>
                        1. 탈퇴 신청한 아이디(이메일) 30일 재가입 불가
                    </div>
                    <div className='main_text'>
                        탈퇴한 아이디(이메일)은 탈퇴한 일로부터 30일 동안 재가입이 불가능합니다. 신중히 선택하신 후 결정해 주세요.
                    </div>
                </div>
                <div>
                    <div className='header_text'>
                        2. 내 정보 및 서비스 이용 기록 삭제
                    </div>
                    <div className='main_text'>
                        사이트에 등록된 회원정보, 이용정보 등 모든 내용이 삭제되며, 삭제된 데이터는 복구되지 않습니다. 필요한 데이터는 미리 백업을 해주세요.
                    </div>
                </div>
                <div className='header_text'>
                    3. 등록된 게시글 및 댓글은 삭제 불가
                </div>
                <div className='main_text'>
                    등록된 게시글 및 댓글에 대한 삭제를 원하는 경우 반드시 탈퇴 전에 삭제하시기 바랍니다.
                </div>
            </div>
            <div className='userDelete_agree_checkbox'>
                <input type="checkbox" id='userDelete_agree'
                    checked={isChecked}
                    onChange={() => setIsChecked(!isChecked)} />
                <label htmlFor='userDelete_agree'>안내사항을 모두 확인하였으며, 이에 동의합니다.</label>
            </div>
            <div className='userDelete_button_container'>
                <div>
                    <button className='userDelete_submit_button'
                        type='button'
                        onClick={openPasswordPopup}
                        disabled={!isChecked}>확인</button>
                </div>
                <form>
                    <PasswordPopup
                        isOpen={isPasswordPopupOpen}
                        onClose={closePasswordPopup}
                        onSubmit={handlePasswordSubmit}
                    />
                </form>
                <div>
                    <button className='userDelete_cancel_button' type='button' onClick={cancel}>취소</button>
                </div>
            </div>
        </div >
    );
}

export default UserDelete;