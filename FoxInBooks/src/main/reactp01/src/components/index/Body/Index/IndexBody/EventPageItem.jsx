import { useContext } from "react";
import { useParams } from "react-router-dom";
import { event_item_list_context } from "../../../../Data/ProductOriginData_context";

function CouponPage() {
    const { id } = useParams();
    const event_item_list = useContext(event_item_list_context);
    const event_data_selected = event_item_list.find(event => event.id === parseInt(id));

    return (
        <div className="event_list_container">
            <div className='event_item'>
                <span className='event_page_title'>이벤트</span>
            </div>
            <hr className='event_page_title_hr' />
            {event_data_selected && (
                <div className='event_page_item'>
                    <h2 className="event_page_item_title">{event_data_selected.title}</h2>
                    <img className='event_page_item_image' src={event_data_selected.image} alt={event_data_selected.title} />
                    {event_data_selected.content.split('\n').map((content, index) => (
                        <p key={index} className='event_page_item_content'>{content}</p>
                    ))}

                </div>
            )}
        </div>
    )
}

export default CouponPage;