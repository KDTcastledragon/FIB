import './CustomerServiceFaq.css';
import axios from 'axios';
import { useState, useEffect } from "react";
import { useLocation } from 'react-router-dom';
import Pagination from '../../Index/IndexBody/Pagination';


function CustomerServiceFaqCategory() {
    const [faqList, setFaqList] = useState([]);
    const [expandedFaqIndex, setExpandedFaqIndex] = useState("");
    const location = useLocation();
    const category = location.state ? encodeURIComponent(location.state.category) : '';

    // 페이지네이션
    const [limit, setLimit] = useState(10);
    const [page, setPage] = useState(1);
    const offset = (page - 1) * limit; // 데이터 시작 번호

    useEffect(() => {
        axios
            .get(`/test/faqList/${category}`)
            .then((response) => {
                setFaqList(response.data);
                console.log(`서버연결 성공 =>`, response.data);
            }).catch((err) => {
                alert(`서버연결 실패 => ${err.message}`);
            });
    }, [category]);

    const toggleFaqContent = (index) => {
        setExpandedFaqIndex((prevIndex) => (prevIndex === index ? "" : index));
    };


    return (
        <div className='customer_service_faq_list'>
            {/* {faqList.map((faq, index) => ( */}
            {faqList.slice(offset, offset + limit).map((faq, index) => (
                <div key={index} className={`faq_list_item ${expandedFaqIndex === index ? 'faq_list_item_selected' : ''}`}>
                    <p className='faq_list_item_title' onClick={() => toggleFaqContent(index)}>
                        {faq.title}
                    </p>
                    {expandedFaqIndex === index && <p className='faq_list_item_content'>{faq.content}</p>}
                </div>
            ))}
            <Pagination
                total={faqList.length}
                limit={limit}
                page={page}
                setPage={setPage}
            />
        </div>
    );
}

export default CustomerServiceFaqCategory;
