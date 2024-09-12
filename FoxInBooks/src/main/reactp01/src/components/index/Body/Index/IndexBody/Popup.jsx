import './Popup.css';
import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { book_list_context } from '../../../../Data/ProductOriginData_context';

function Popup() {
    const item_data = useContext(book_list_context);
    const item_filter = item_data.filter((book) => {
        return book.type == 'item';
    })

    const PopupItem = ({ image, title, id }) => {
        return (
            <div className='popup_container'>
                <div className="popup_item_info">
                    <span>
                        <Link to={`/DetailPage/${id}`}>
                            <img className="item_info_img" src={image} alt={title} />
                        </Link>
                    </span>
                    <span className="item_info_box">
                        <div className="item_info_box_name">
                            <Link to={`/DetailPage/${id}`}>
                                <h3>{title}</h3>
                            </Link>
                        </div>
                    </span>
                    <div className='close_choose'>
                        <input type='checkBox' />
                        <span className='today_close'>오늘하루 보지 않기</span>
                        <span className='close'>닫기[X]</span>
                    </div>
                </div>
            </div>
        )
    }
    return (
        <div className="popup_item">
            {item_filter.map((item_data, index) => (
                <PopupItem
                    key={index}
                    id={item_data.id}
                    image={item_data.image}
                    title={item_data.title}
                    price={item_data.price}
                    salePer={item_data.salePer}
                />
            ))}
            {/* book_data에 할당된 useContext(List_context)를 map()메서드로 하나씩 꺼내서 새 배열로 정의
                    새 배열의 객체는 key, image, title, price, salePer */}
        </div>
    );
}

export default Popup;