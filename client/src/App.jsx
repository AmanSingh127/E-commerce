import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        {/* More routes coming: /products/:id, /builder, /cart, /login */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;