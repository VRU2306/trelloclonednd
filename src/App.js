
import './App.css';
import Navbar from "./components/Sidebar/navbar";
import Login from '../src/components/Login_register/Login'
import Activity from '../src/components/activity/Activity'

import {
  BrowserRouter as Router, Route, Routes
} from "react-router-dom";
function App() {
  return (
    <div className="App">
     {/* <Navbar/> */}
     <Router>
      <div className="App">
        <Routes>
          <Route path='/' element={<Login />}/>
          <Route path='/navbar' element={<Navbar />}/>
          <Route path='/activity' element={<Activity />}/>
        </Routes>
      </div>
    </Router>
    </div>
  );
}

export default App;
