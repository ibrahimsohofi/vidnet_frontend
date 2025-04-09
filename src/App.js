
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import NavBar from './Components/NavBar';
import Header from './Components/Header';
import Footer from './Components/Footer';
import Contact from './Components/Contact';
import AboutUs from './Components/About'
import Faqs from './Components/Faqs';
import HowToUse from './Components/HowToUse';



function App() {
  return (
    <div>
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route path="/" element={<Header />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/#faqs" element={<Faqs/>}/>
          <Route path='/#howTo' element={<HowToUse/>}/>
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
