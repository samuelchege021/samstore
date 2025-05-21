import { Flex } from '@chakra-ui/react';
import './App.css';
import Footer from './components/Footer';
import Header from './components/Header';
import HomeScreen from './HomeScreen';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ProductScreen from './ProductScreen';
import  CartScreen  from './Cartscreen';
import Loginscreen from './LoginScreen'
import Registerscreen from './Registerscreen';
import ProfileScreen from './ProfileScreen';
import { ShippingScreen } from './ShippingScreen';
import { PaymentMethodScreen } from './Paymentmethod';
import { Placeholderscreen } from './placeholder';
import {OrderScreen} from './OrderScreen';
import UsersScreen from './UsersScreen';
import UserEditScreen from './UserEditScreen';
import Productscreenlist from './ProductListscreen';
import Producteditscreen from './producteditscreen';
import OrderScreenlist from './orderListScreen';








function App() {
  return (
    <BrowserRouter>
      <Header />

      <div style={{ height: "100px" }}></div>

      <Flex
        as="main"
        mt="-0.5rem"
        direction="column"
        minH="xl"
        py="6"
        px="6"
        bg="gray.200"
      >
        <Routes>
          
          <Route path="/" element={<HomeScreen />} />
          <Route path="/products/:id" element={<ProductScreen />} />
          <Route path="/cart/:id" element={<CartScreen />} />
          <Route path="/cart" element={<CartScreen />} />
          <Route path="/login" element={<Loginscreen/>} />
          <Route path="/register"   element={<Registerscreen/>}/>
          <Route path="/profile"   element={<ProfileScreen/>}/>
          <Route path="/shipping"   element={<ShippingScreen/>}/>
          <Route path="/payment"   element={<PaymentMethodScreen/>}/>
          <Route path="/placeholder"   element={<Placeholderscreen/>}/>
          <Route path="/order/:id"   element={<OrderScreen/>}/>
          <Route path="/admin/userlist"   element={<UsersScreen/>}/>
          <Route path="/admin/user/:id/edit"   element={<UserEditScreen/>}/>
          <Route path="/admin/productlist"   element={<Productscreenlist/>}/> 
         <  Route path="/admin/product/:id/edit" element={<Producteditscreen/>}/>
         <Route  path="/admin/orderlist"   element={ <OrderScreenlist/>}       />
        </Routes>
      </Flex>

      <Footer />
    </BrowserRouter>
  );
}

export default App;
