import { footer_menu_list_context } from "../../Data/ProductOriginData_context";
import { useContext, useState } from "react";
import Modal from 'react-modal'

function FooterMenuListItem() {
    Modal.setAppElement('#root');
    const footer_menu_list = useContext(footer_menu_list_context);

    const FooterListClick = () => {
        // openModal();
        setIsModalOpen(!isModalOpen);
    };

    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    // 수정
    const footer_modalStyles = {
        content: {
            width: '800px',
            height: '500px',
            padding: '45px 20px',
            border: '3px solid',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -40%)'
        },
        overlay: {
            backgroundColor: 'rgba(255, 255, 255, 0.1)'
            // 모달창 외부에 오페서티가 안먹어서 강제로 부여함.
        }
    };

    function Footer_list({ id, title, content }) {
        return (
            <div onClick={FooterListClick}>{title}
                {isModalOpen &&
                    <Modal
                        style={footer_modalStyles}
                        isOpen={isModalOpen}
                        onRequestClose={closeModal}
                    >   
                        <div onClick={(e) => e.stopPropagation()}>{content}</div>
                    </Modal>}
            </div>

        )
    }
    return (
        <li>
            {footer_menu_list.map((item, index) => (
                <Footer_list
                    key={index}
                    id={item.id}
                    title={item.title}
                    content={item.content}
                />
            ))}
        </li>
    )
}

export default FooterMenuListItem;