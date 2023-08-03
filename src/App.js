import "./App.scss";
import MainPage from "./components/MainPage";
import { Routes, Route } from "react-router-dom";
import Interior from "./pages/Interior";
import Cook from "./pages/Interior";
import Office from "./pages/Office";
import Fabric from "./pages/Fabric";
import Header from "./components/Header";
import Footer from "./components/Footer";
import UploadPage from "./components/UploadPage";
import ProductPage from "./components/ProductPage";
function App() {
  return (
    <div className="App">
      <Header />

      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/Interior" element={<Interior />} />
        <Route path="/Cook" element={<Cook />} />
        <Route path="/Office" element={<Office />} />
        <Route path="/Fabric" element={<Fabric />} />
        <Route path="/UploadPage" element={<UploadPage />} />
        <Route path="/ProductPage/:id" element={<ProductPage />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
