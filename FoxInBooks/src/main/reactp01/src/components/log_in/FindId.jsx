import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { IoAlertCircleOutline } from "react-icons/io5";
import './FindId.css';
import axios from 'axios';

function FindId() {
    const navigate = useNavigate();


    const [name, setName] = useState('');
    const [birthday, setBirthday] = useState('');
    const [phone_number, setPhone_number] = useState('');

    const [nameError, setNameError] = useState('');
    const [birthdayError, setBirthdayError] = useState('');
    const [phone_numberError, setPhone_numberError] = useState('');

    const nameRegex = /^[가-힣a-zA-Z]*$/;
    const birthdayRegex = /^\d{8}$/;
    const phone_numberRegex = /^010\d{7,8}$/;

    const validateName = () => {
        if (name.length < 2 || !nameRegex.test(name)) {
            setNameError("유효한 이름이 아닙니다.");
        } else {
            setNameError('');
        }
    }

    const currentDate = new Date();
    const inputDate = new Date(
        parseInt(birthday.substring(0, 4)),
        parseInt(birthday.substring(4, 6)) - 1, // 월은 0부터 시작하므로 -1
        parseInt(birthday.substring(6, 8))
    );
    const validateBirthday = () => {
        if (!birthdayRegex.test(birthday) || (inputDate > currentDate)) {
            setBirthdayError("올바른 생년월일 형식이 아닙니다.");
        } else {
            setBirthdayError('');
        }
    }

    const validatePhone_number = () => {
        if (!phone_numberRegex.test(phone_number)) {
            setPhone_numberError("010으로 시작하는 숫자만 입력해주세요.");
        }
    }

    // ================================
    // ** 버튼 활성화
    const [findIdButton, setFindIdButton] = useState(true);

    function changeButton() {
        name.length >= 2 && nameRegex.test(name) && birthdayRegex.test(birthday) &&
            phone_numberRegex.test(phone_number) && inputDate < currentDate
            ? setFindIdButton(false) : setFindIdButton(true);
    }

    // ==================================
    // ** 취소 버튼 클릭 시 로그인 페이지로

    function pageToLogin() {
        navigate('/LogIn');
    }

    // ==================================
    // ** 데이터 전송
    const findIdSubmit = () => {
        axios({
            url: "/user/findId",
            method: 'post',
            headers: { 'Content-Type': 'application/json' },
            data: {
                name: name,
                birthday: birthday,
                phone_number: phone_number
            }
        }).then((res) => {
            alert(name + "님의 아이디는 " + res.data + "입니다.");
            navigate('/LogIn');
        }).catch((err) => {
            alert(err.response.data);
            window.location.reload();
        });
    }

    // =================================
    // ** 엔터 키 설정
    const handleEnterKey = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();

            if (e.target.id === 'find_id_name') {
                document.getElementById('find_id_birthday').focus();
            } else if (e.target.id === 'find_id_birthday') {
                document.getElementById('find_id_phone_number').focus();
            } else if (e.target.id === 'find_id_phone_number') {
                findIdSubmit(e);
            }
        }
    }

    return (
        <div className='FindId'>
            <form className='find_id_form' onSubmit={findIdSubmit}>
                <fieldset className='find_id_fieldset d-flex'>
                    <div className='find_id_input_container'>
                        <div>이름</div>
                        <input type="text" placeholder='이름을 입력해 주세요.'
                            name='name' autoComplete='off' id='find_id_name'
                            onKeyUp={changeButton}
                            onKeyDown={handleEnterKey}
                            onChange={(e) => {
                                setName(e.target.value);
                                setNameError('');
                            }}
                            onBlur={validateName} />
                        {nameError && <div className="findId_error-message d-flex"><IoAlertCircleOutline />&nbsp;{nameError}</div>}
                    </div>
                    <div className='find_id_input_container'>
                        <div>생년월일</div>
                        <input type="text" placeholder='생년월일 8자리를 입력해 주세요.'
                            name='birthday' autoComplete='off' id='find_id_birthday'
                            onKeyUp={changeButton}
                            onKeyDown={handleEnterKey}
                            onChange={(e) => {
                                setBirthday(e.target.value);
                                setBirthdayError('');
                            }}
                            onBlur={validateBirthday} />
                        {birthdayError && <div className="findId_error-message d-flex"><IoAlertCircleOutline />&nbsp;{birthdayError}</div>}
                    </div>
                    <div className='find_id_input_container'>
                        <div>전화번호</div>
                        <input type="text" placeholder='(-)없이 숫자만 입력해주세요.'
                            name='phone_number' autoComplete='off' id='find_id_phone_number'
                            onKeyUp={changeButton}
                            onKeyDown={handleEnterKey}
                            onChange={(e) => {
                                setPhone_number(e.target.value);
                                setPhone_numberError('');
                            }}
                            onBlur={validatePhone_number} />
                        {phone_numberError && <div className="findId_error-message d-flex"><IoAlertCircleOutline />&nbsp;{phone_numberError}</div>}
                    </div>
                    <div className='find_id_button_container'>
                        <button className='find_id_submit_btn' type='button'
                            disabled={findIdButton} onClick={findIdSubmit}>확인</button>
                        <button onClick={pageToLogin}>취소</button>
                    </div>
                </fieldset>
            </form>
        </div>
    );
}

export default FindId;