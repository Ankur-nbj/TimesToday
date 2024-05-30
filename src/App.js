import React from 'react';
import Navbar from './components/Navbar';
import News from './components/News';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

const App =()=> {
   const apiKey='7dbf1117bb1d4bef93567dbda59a5120';
    return (
      <div>
        <Router>
          <Navbar />

          <Routes>
            <Route exact path="/" element={<News  apiKey={apiKey} key="general" country="in" category="general" />} />
            <Route exact path="/technology" element={<News apiKey={apiKey} key="technology" country="in" category="technology" />} />
            <Route exact path="/sports" element={<News apiKey={apiKey} key="sports" country="in" category="sports" />} />
            <Route exact path="/science" element={<News apiKey={apiKey} key="science" country="in" category="science" />} />
            <Route exact path="/health" element={<News apiKey={apiKey} key="health" country="in" category="health" />} />
            <Route exact path="/entertainment" element={<News apiKey={apiKey} key="entertainment" country="in" category="entertainment" />} />
            <Route exact path="/business" element={<News apiKey={apiKey} key="business" country="in" category="business" />} />
          </Routes>
        </Router>
      </div>
    );
  
}

export default App;