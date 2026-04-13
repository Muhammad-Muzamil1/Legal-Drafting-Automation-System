import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { LoadingProvider } from '@/contexts/LoadingContext';
import { Home } from '@/pages/Home';
import { Categories } from '@/pages/Categories';
import { Templates } from '@/pages/Templates';
import { FormPage } from '@/pages/FormPage';
import { PreviewPage } from '@/pages/PreviewPage';

function App() {
  return (
    <LoadingProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/categories" element={<Categories />} />
          <Route path="/templates" element={<Templates />} />
          <Route path="/form" element={<FormPage />} />
          <Route path="/preview" element={<PreviewPage />} />
        </Routes>
      </Router>
    </LoadingProvider>
  );
}

export default App;
