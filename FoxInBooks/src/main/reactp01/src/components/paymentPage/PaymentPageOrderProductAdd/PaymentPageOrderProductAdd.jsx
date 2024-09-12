
function PaymentPageOrderProductAdd({ title, image, price, proamount }) {

    return (
        <tr>
            <td>
                <img className="order_book_img" src={`../img/${image}`} alt="책 이미지" />
            </td>
            <td>{title}</td>
            <td>{price.toLocaleString()}원</td>
            <td>{proamount}</td>
            <td>{(price * proamount).toLocaleString()}원</td>
        </tr>
    );
}

export default PaymentPageOrderProductAdd;