import './App.css';
import Home from './pages/Home'
import About from './pages/About';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Signup from './pages/Signup';
import ProductDetails from './pages/ProductDetails';
import Checkout from './pages/Checkout';
import Navbar from './component/Navbar';
import axios from 'axios';
import { useState, useEffect } from 'react';
import Cart from './pages/Cart';
import Login from './pages/Login'

function App() {
  const [fetchedData, setFetchedData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [query, setQuery] = useState('');
  const[searchResult, setSearchResult] = useState([]);

  useEffect(() => {
    const fetching = async () => {
      try {
        const response = await axios.post(process.env.REACT_APP_SERVER_URL + "/api/data");
        if (response.data) {
          setFetchedData(response.data.data);
          setIsLoading(false);
        }
      } catch (error) {
        console.log("fetching error", error);
        setIsLoading(false);
      }
    };
    fetching();
  }, []);

  const handleSearch = (e) => {
    setQuery(e.target.value);

    const result = fetchedData.filter((item) => {
      return item.name.toLowerCase().includes(query.toLowerCase())
    })
    setSearchResult(result)
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Router>
        <Navbar query={query} handleSearch={handleSearch} products={fetchedData} />
        <Routes>
          <Route
            exact path="/" element={<Home products={query ? searchResult : fetchedData} />} />
          <Route exact path="/about" element={<About />} />
          <Route exact path="/tosignup" element={<Signup />} />
          <Route exact path="/tologin" element={<Login />} />
          <Route path="/product/:id" element={<ProductDetails products={fetchedData} />} />
          <Route exact path="/product/checkout" element={<Checkout />} />
          <Route path="/tocart" element={<Cart />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;

