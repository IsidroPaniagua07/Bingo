import ReactDOM from 'react-dom/client';
import './index.css';
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import HomePage from "./HomePage";
import Controls from "./Controls/Controls";



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
<Router>
    <Routes>
        <Route path="/" element={<HomePage/>} />
        <Route path="/controls" element={<Controls/>}/>
  </Routes> 
</Router>
);
