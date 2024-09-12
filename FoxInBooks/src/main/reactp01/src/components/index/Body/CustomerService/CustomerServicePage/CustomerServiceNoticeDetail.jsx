import './CustomerServiceNotice.css';
import { useLocation } from "react-router-dom";

function CustomerServiceNoticeDetail({ }) {

    const location = useLocation();
    const noticeList = location.state;
    const noticeNum = location.state.num;
    const noticeCode = location.state.notice_code;
    const noticeCategory = location.state.notice_category;
    const noticeTitle = location.state.notice_title;
    const noticeView = location.state.notice_view;
    const noticeRegdate = location.state.notice_regdate;
    const noticeContent = location.state.notice_content;

    console.log("state noticeList 확인 : " + noticeList);
    console.log("notice_code 확인 : " + noticeList.notice_code);
    console.log("notice_code 확인 : " + noticeCode);


    return (
        <div>
            <table className='notice_item'>
                <thead>
                    <tr>
                        <th style={{ width: '10%' }}>번호</th>
                        <th style={{ width: '10%' }}>분류</th>
                        <th style={{ width: '60%' }}>제목</th>
                        <th style={{ width: '10%' }}>조회수</th>
                        <th style={{ width: '10%' }}>작성일</th>
                    </tr>
                </thead>
                <tbody>
                    <tr className='notice_item_tr'>
                        <td>{noticeNum}</td>
                        <td>{noticeCategory}</td>
                        <td>{noticeTitle}</td>
                        <td>{noticeView}</td>
                        <td>{noticeRegdate}</td>
                    </tr>
                    <tr className='notice_item_tr'>
                        <td colSpan={2} />
                        <td className="notice_content_detail">
                            {noticeContent}
                        </td>
                        <td colSpan={2} />
                    </tr>
                </tbody>
            </table>
        </div>
    );

}

export default CustomerServiceNoticeDetail;