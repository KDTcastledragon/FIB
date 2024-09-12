import { useEffect, useState } from "react";
import InsertAddressPopup from "./InsertAddressPopup";
import './UserAddress.css';
import axios from "axios";
import { MdOutlineRefresh } from "react-icons/md";

function UserAddress() {
    const [id, setId] = useState(JSON.parse(sessionStorage.user).id);
    const [addressList, setAddressList] = useState([]);

    const [checkedList, setCheckedList] = useState([]);

    const [isSearchAddressPopupOpen, setSearchAddressPopupOpen] = useState(false);


    const openSearchAddressPopup = () => {
        setSearchAddressPopupOpen(true);
    };

    const closeSearchAddressPopup = () => {
        setSearchAddressPopupOpen(false);
    };


    const loadAddressList = () => {
        axios({
            url: "/address/selectList",
            method: 'post',
            headers: { 'Content-Type': 'application/json' },
            data: {
                user_id: id
            }
        }).then((res) => {
            setAddressList(res.data);
        }).catch((error) => {
            alert('추가 실패' + error.data);
        });
    }

    useEffect(() => {
        loadAddressList();
    }, [id]);

    const toggleAllCheckboxes = () => {
        setCheckedList((prevList) => {
            if (prevList.length === addressList.length) {
                return [];
            } else {
                return addressList.map((addressData) => addressData.address_code);
            }
        });
    }

    const toggleCheckbox = (addressCode) => {
        setCheckedList((prevList) => {
            if (prevList.includes(addressCode)) {
                return prevList.filter((code) => code !== addressCode);
            } else {
                return [...prevList, addressCode];
            }
        });
    }

    console.log(checkedList);

    const refresh = () => {
        loadAddressList();
        setCheckedList([]);
    }

    // ========================================
    // ** 삭제

    const deleteSelectedAddress = () => {
        axios({
            url: "/address/delete",
            method: 'post',
            headers: { 'Content-Type': 'application/json' },
            data: checkedList
        }).then(() => {
            alert('삭제 완료');
            refresh();
        }).catch(() => {
            // if (error.response) {
            //     // 서버가 응답을 반환한 경우
            //     console.error("Login error - Server responded with data:", error.response.data);
            //     console.error("Status code:", error.response.status);
            //     console.error("Headers:", error.response.headers);

            // } else if (error.request) {
            //     // 서버에 요청이 전송되었지만 응답이 없는 경우
            //     console.error("Login error - No response received:", error.request);

            // } else {
            //     // 요청을 보내기 전에 오류가 발생한 경우
            //     console.error("Login error - Request setup error:", error.message);
            // }
            alert('삭제 과정에서 오류 발생');
        });
    }

    return (
        <div className="UserAddress">
            <div className="index_text"><h1>배송지 관리</h1></div>
            <div>
                <div className="insert_address_button d-flex">
                    <button onClick={deleteSelectedAddress}>삭제</button>
                    <div className="refresh_container d-flex">
                        <MdOutlineRefresh className="address_refresh" onClick={refresh} />
                        <button onClick={openSearchAddressPopup}>배송지 등록</button>
                    </div>
                </div>
                <InsertAddressPopup
                    isOpen={isSearchAddressPopupOpen}
                    onClose={closeSearchAddressPopup}
                ></InsertAddressPopup>
                <table className="user_address_table">
                    <thead>
                        <tr className="user_address_column user_address_index_column">
                            <th><input type="checkbox"
                                checked={addressList.length > 0 && checkedList.length === addressList.length}
                                onChange={toggleAllCheckboxes} /></th>
                            <th>주소 명</th>
                            <th>주소</th>
                            <th>연락처</th>
                            <th>수령인</th>
                        </tr>
                    </thead>
                    <tbody>
                        {addressList.map((addressData, index) => (
                            <tr key={index} className={addressData.basic_address ? "user_address_basic_tr user_address_column" : "user_address_column"}>
                                <td>
                                    <input type="hidden" value={addressData.address_code} />
                                    <input type="checkbox"
                                        checked={checkedList.includes(addressData.address_code)}
                                        onChange={() => toggleCheckbox(addressData.address_code)}
                                    />
                                </td>
                                <td className={addressData.basic_address ? "basic_address" : ""}>{addressData.basic_address ? '기본 배송지' : addressData.address_as}</td>
                                <td className="full_address">
                                    <div>{addressData.address_zip}</div>
                                    <div>{addressData.address}</div>
                                    <div>{addressData.address_detail}</div>
                                </td>
                                <td>{addressData.phone_number}</td>
                                <td>{addressData.name}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default UserAddress;