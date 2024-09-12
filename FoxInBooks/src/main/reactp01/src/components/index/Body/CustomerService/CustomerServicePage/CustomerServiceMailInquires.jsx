import { Routes, Route } from 'react-router-dom';
import CustomerServiceMailInquiresMyList from './CustomerServiceMailInquiresMyList';
import CustomerServiceMailInquiresMyListDetail from './CustomerServiceMailInquiresMyListDetail';
import CustomerServiceMailInquiresRegister from './CustomerServiceMailInquiresRegister';

function CustomerServiceMailInquires() {


    return (
        <Routes>
            <Route path='/*' element={<CustomerServiceMailInquiresMyList />}></Route>
            <Route path='/CustomerServiceMailInquiresMyListDetail/:num/*' element={<CustomerServiceMailInquiresMyListDetail />}></Route>
            <Route path='/CustomerServiceMailInquiresRegister' element={<CustomerServiceMailInquiresRegister />}></Route>
        </Routes>
    );
}

export default CustomerServiceMailInquires;