import './UserUpdate.css';
import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PasswordPopup from './PasswordPopup';
import axios from 'axios';

function UserUpdate() {
    const navigate = useNavigate();

    // ============================================\
    // ** 유효성 검사

    const [id, setId] = useState(JSON.parse(sessionStorage.user).id);
    const [name, setName] = useState(JSON.parse(sessionStorage.user).name);
    const [phone_number, setPhoneNumber] = useState(JSON.parse(sessionStorage.user).phone_number);
    const [birthday, setBirtyday] = useState(JSON.parse(sessionStorage.user).birthday);
    const [address_zip, setAddress_zip] = useState(JSON.parse(sessionStorage.user).address_zip != 'null' ? JSON.parse(sessionStorage.user).address_zip : '');
    const [address, setAddress] = useState(JSON.parse(sessionStorage.user).address != 'null' ? JSON.parse(sessionStorage.user).address : '');
    const [address_detail, setAddress_detail] = useState(JSON.parse(sessionStorage.user).address_detail != 'null' ? JSON.parse(sessionStorage.user).address_detail : '');
    const [nickname, setNickname] = useState(JSON.parse(sessionStorage.user).nickname != null ? JSON.parse(sessionStorage.user).nickname : '');
    const [ad_check_email, setAd_check_email] = useState(JSON.parse(sessionStorage.user).ad_check_email);
    const [ad_check_sms, setAd_check_sms] = useState(JSON.parse(sessionStorage.user).ad_check_sms);
    const [point, setPoint] = useState(JSON.parse(sessionStorage.user).point);
    const [join_date, setJoin_date] = useState(JSON.parse(sessionStorage.user).join_date);

    const [nameError, setNameError] = useState('');
    const [phoneNumberError, setPhoneNumberError] = useState('');
    const [nicknameError, setNicknameError] = useState('');

    const [idError, setIdError] = useState('');
    const [addressError, setAddressError] = useState('');
    const [pointError, setPointError] = useState('');

    const nameRegex = /^[가-힣a-zA-Z]*$/;

    const validateName = () => {
        if (name.length < 2 || !nameRegex.test(name)) {
            setNameError('유효한 이름이 아닙니다.(2자 이상의 한글 또는 영문)');
        } else {
            setNameError('');
        }
    }
    const validatePhoneNumber = () => {
        if (!phone_number.match(/^010\d{7,8}$/)) {
            setPhoneNumberError('유효한 전화번호 형식이 아닙니다.(010으로 시작하는 숫자만 입력)');
        } else {
            setPhoneNumberError('');
        }
    }
    const validateNickname = () => {
        if (nickname != null && nickname.length > 10) {
            setNicknameError('닉네임은 10자 이하만 가능합니다.');
        } else {
            setNicknameError('');
        }
    }

    // 수정 불가능 항목 안내
    const validateId = () => {
        setIdError('아이디는 수정 불가능합니다.');
        setTimeout(() => setIdError(''), 3000);
    };
    const validateAddress = () => {
        setAddressError('주소 관리 메뉴에서 수정해주세요.');
        setTimeout(() => setAddressError(''), 3000);
    };
    const validatePoint = () => {
        setPointError('포인트는 수정 불가능합니다.');
        setTimeout(() => setPointError(''), 3000);
    };

    // 이메일 수신 여부 라디오 버튼 상태 변경 함수
    const handleEmailChange = () => {
        setAd_check_email(!ad_check_email);
        changeButton();
    };

    // SMS 수신 여부 라디오 버튼 상태 변경 함수
    const handleSmsChange = () => {
        setAd_check_sms(!ad_check_sms);
        changeButton();
    };

    // ==============================================
    // ** 이미지 업로드

    const [profile_image, setProfile_image] = useState(JSON.parse(sessionStorage.user).profile_image != null ? JSON.parse(sessionStorage.user).profile_image : "resources/uploadImages/basicman4.png");
    const [selectedFile, setSelectedFile] = useState('');
    const fileInput = useRef(null);

    const handleFileChange = (e) => {
        const file = e.target.files[0];

        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                if (reader.readyState === 2) {
                    setProfile_image(reader.result);
                    setSelectedFile(file);
                    changeButton();
                }
            }
            reader.readAsDataURL(file);
        }
        // } else {
        //     setSelectedFile(JSON.parse(sessionStorage.user).profile_image);
        // }
    }

    // ==========================================================
    // ** 버튼 활성화

    const [userUpdateButton, setuserUpdateButton] = useState(true);

    function changeButton() {
        const isNameValid = name.length >= 2 && nameRegex.test(name);
        const isPhoneNumberValid = phone_number.length >= 10 && phone_number.length <= 11;

        isNameValid && isPhoneNumberValid
            ? setuserUpdateButton(false)
            : setuserUpdateButton(true);
    }

    function userUpdateReset() {
        window.location.reload();
    }

    // =========================================================
    // ** 회원 수정/탈퇴 선택 -> 비밀번호 확인 팝업 창 -> 데이터 전송

    const [password, setPassword] = useState('');
    const [isPasswordPopupOpen, setPasswordPopupOpen] = useState(false);

    const openPasswordPopup = () => {
        setPasswordPopupOpen(true);
    };

    const closePasswordPopup = () => {
        setPasswordPopupOpen(false);
    };

    const handlePasswordSubmit = (popupPassword) => {
        setPassword(popupPassword);
        handleuserUpdateSubmit(popupPassword);
    }

    const handleuserUpdateSubmit = (popupPassword) => {
        const formData = new FormData();

        if (selectedFile) {
            formData.append('uploadfilef', selectedFile);
        }

        formData.append('id', id);
        formData.append('password', popupPassword);
        formData.append('name', name);
        formData.append('phone_number', phone_number);
        formData.append('birthday', birthday);
        formData.append('address_zip', address_zip);
        formData.append('address', address);
        formData.append('address_detail', address_detail);
        formData.append('nickname', nickname);
        formData.append('ad_check_email', ad_check_email);
        formData.append('ad_check_sms', ad_check_sms);
        formData.append('point', point);

        axios({
            url: "/user/update",
            method: 'post',
            headers: { 'Content-Type': 'multipart/form-data' },
            data: formData
        }).then((res) => {
            sessionStorage.setItem('user', JSON.stringify(res.data));
            sessionStorage.setItem('loginName', res.data.name);
            alert("회원정보 수정 완료");
            navigate('/MyPage');

        }).catch((error) => {
            if (error.response.status == 502) {
                alert('비밀번호가 일치하지 않습니다.');
            }
            window.location.reload();
        });

        closePasswordPopup();
    }

    return (
        <div className='UserUpdate'>
            <div className='index_text'><h1>회원정보 수정</h1></div>
            <form>
                <table>
                    <tbody>
                        <tr className='d-flex'>
                            <th>
                                <div>프로필 사진</div>
                                <div className='user_update_profile_size'>(150 * 150)</div>
                            </th>
                            <td>
                                <div className='user_update_profile'>
                                    <label htmlFor="user_update_profile_img"></label>
                                    <input id='user_update_profile_img'
                                        className='userUpdate_input'
                                        type="image" alt='Profile'
                                        src={profile_image} />
                                </div>
                                <span>
                                    <input type="hidden" name='profile_image' value={profile_image} />
                                    <input
                                        id='uploadfilef'
                                        className='userUpdate_input'
                                        accept='img/jpg, img/png, img/jpeg, img/gif'
                                        name='uploadfilef' type="file"
                                        ref={fileInput} onChange={handleFileChange}
                                    />
                                </span>
                            </td>
                        </tr>
                        <tr className='d-flex'>
                            <th scope='col'>아이디</th>
                            <td>
                                <label htmlFor="id"></label>
                                <input id='id' name='id'
                                    className='userUpdate_input' type="text" size={30}
                                    value={id} readOnly
                                    onFocus={validateId}
                                    onBlur={() => { setIdError('') }}
                                />
                                <div className='error-message'>{idError}</div>
                            </td>
                        </tr>
                        <tr className='d-flex'>
                            <th scope='col'>이름</th>
                            <td>
                                <label htmlFor="name"></label>
                                <input id='name' name='name'
                                    className='userUpdate_input'
                                    type="text" maxLength={100} required
                                    value={name}
                                    onKeyUp={changeButton}
                                    onChange={(e) => {
                                        setName(e.target.value);
                                        setNameError('');
                                    }}
                                    onBlur={validateName} />
                                {nameError && <div className="error-message">{nameError}</div>}
                            </td>
                        </tr>
                        <tr className='d-flex'>
                            <th scope='col'>닉네임</th>
                            <td>
                                <label htmlFor="nickname"></label>
                                <input id='nickname' name='nickname'
                                    className='userUpdate_input'
                                    value={nickname}
                                    onKeyUp={changeButton}
                                    onChange={(e) => {
                                        setNickname(e.target.value);
                                        setNicknameError('');
                                    }}
                                    onBlur={validateNickname}
                                    type="text" maxLength={100} />
                                {nicknameError && <div className="error-message">{nicknameError}</div>}
                            </td>
                        </tr>
                        <tr className='user_update_phone_number d-flex'>
                            <th scope='col'>전화번호</th>
                            <td>
                                <input type="text" className='userUpdate_input' id='phone_number' required
                                    value={phone_number}
                                    onChange={(e) => {
                                        setPhoneNumber(e.target.value);
                                        setPhoneNumberError('');
                                    }}
                                    onKeyUp={changeButton}
                                    onBlur={validatePhoneNumber} />
                                {phoneNumberError && <div className="error-message">{phoneNumberError}</div>}
                            </td>
                        </tr>
                        <tr className='d-flex'>
                            <th scope='col'>주소 (기본 주소)</th>
                            <td>
                                <div className='userUpdate_address'>
                                    <div>
                                        <input type="text" className='userUpdate_input' id='userUpdate_address_zip'
                                            value={address_zip} readOnly
                                            onFocus={validateAddress}
                                            onBlur={() => { setAddressError('') }} />
                                    </div>
                                    <div>
                                        <input type="text" className='userUpdate_input'
                                            value={address} readOnly
                                            onFocus={validateAddress}
                                            onBlur={() => { setAddressError('') }} />
                                    </div>
                                    <div>
                                        <input type="text" className='userUpdate_input'
                                            value={address_detail} readOnly
                                            onFocus={validateAddress}
                                            onBlur={() => { setAddressError('') }} />
                                    </div>
                                </div>
                                <div className='error-message'>{addressError}</div>
                            </td>
                        </tr>
                        <tr className='d-flex'>
                            <th>포인트</th>
                            <td>
                                <input type="text" className='userUpdate_input'
                                    value={point} readOnly
                                    onFocus={validatePoint}
                                    onBlur={() => { setPointError('') }} />
                                <div className='error-message'>{pointError}</div>
                            </td>
                        </tr>
                        <tr className='d-flex'>
                            <th scope='col'>이메일 수신 여부</th>
                            <td>
                                <div className='user_update_email_explain'>
                                    ※ 쇼핑몰에서 제공하는 유익한 이벤트 소식을 이메일로 받으실 수 있습니다.
                                </div>
                                <span>
                                    <input
                                        id='user_update_email_recieve'
                                        name='ad_check_email'
                                        className='userUpdate_input'
                                        type="radio"
                                        value={true}
                                        checked={ad_check_email}
                                        onChange={handleEmailChange}
                                        required />
                                    <label htmlFor="user_update_email_recieve">수신함</label>
                                    <input
                                        id='user_update_email_reject'
                                        name='ad_check_email'
                                        className='userUpdate_input'
                                        type="radio"
                                        value={false}
                                        checked={!ad_check_email}
                                        onChange={handleEmailChange} />
                                    <label htmlFor="user_update_email_reject">수신안함</label>
                                </span>
                            </td>
                        </tr>
                        <tr className='d-flex'>
                            <th scope='col'>SMS 수신여부</th>
                            <td>
                                <div className='user_update_sms_explain'>
                                    ※ 쇼핑몰에서 제공하는 유익한 이벤트 소식을 SMS로 받으실 수 있습니다.
                                </div>
                                <div>
                                    <input
                                        id='user_update_sms_recieve'
                                        name='ad_check_sms'
                                        className='userUpdate_input'
                                        type="radio"
                                        value={true}
                                        checked={ad_check_sms}
                                        onChange={handleSmsChange}
                                        required />
                                    <label htmlFor="user_update_sms_recieve">수신함</label>
                                    <input
                                        id='user_update_sms_reject'
                                        name='ad_check_sms'
                                        className='userUpdate_input'
                                        type="radio"
                                        value={false}
                                        checked={!ad_check_sms}
                                        onChange={handleSmsChange} />
                                    <label htmlFor="user_update_sms_reject">수신안함</label>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
                <div className='user_update_btn'>
                    <button type='button' className='user_update_submit_btn'
                        onClick={openPasswordPopup} disabled={userUpdateButton} >
                        수정완료
                    </button>
                    <button type='button' className='user_update_cancel_btn'
                        onClick={userUpdateReset}>
                        취소
                    </button>
                </div>
                <PasswordPopup
                    isOpen={isPasswordPopupOpen}
                    onClose={closePasswordPopup}
                    onSubmit={handlePasswordSubmit}
                />
            </form>
        </div >
    );
}

export default UserUpdate;