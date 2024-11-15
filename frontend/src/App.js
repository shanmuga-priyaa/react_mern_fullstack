import './App.css';
import Navbar from './components/Navbar/Navbar';
import {BrowserRouter ,Routes, Route} from 'react-router-dom';
import Shop from './pages/Shop';
import ShopCategory from './pages/ShopCategory';
import Product from './pages/Product';
import LoginSignup from './pages/LoginSignup';
import Cart from './pages/Cart';
import Footer from './components/Footer/Footer';
import men_banner from './components/Assets/banner_mens.jpeg';
import women_banner from './components/Assets/banner_women.jpeg';
import kid_banner from './components/Assets/banner_kids.jpeg';
// import Headers from './components/Navbar/Headers';
function App() {
  return (
    <div>
      <BrowserRouter>
      <Navbar/>
      <Routes>
        <Route path='/'element={<Shop/>}/>
        <Route path='/mens'element={<ShopCategory banner={men_banner} category="men"/>}/>
        <Route path='/womens'element={<ShopCategory banner={women_banner} category="women"/>}/>
        <Route path='/Kids'element={<ShopCategory banner={kid_banner}  category="Kid"/>}/>
        <Route path='/product/:productId' element={<Product />} />
        <Route path='/cart' element={<Cart/>}/>
        <Route path='/login' element={<LoginSignup/>}/>
        {/* <Route path='/realated-products' element={<RelatedProducts/>}/> */}
        </Routes>
        <Footer/>
        </BrowserRouter>
    </div>
  );
}

export default App;
