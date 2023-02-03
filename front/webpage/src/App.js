import {BrowserRouter as Router,Routes, Route} from 'react-router-dom'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import Register from './pages/Register';
import Login from './pages/Login';
import Header from './components/Header';

function App() {
  return (
    <>
      <Router>
        <div className='container'>
          <Header/>
          <Routes>
            
            <Route path='/login' element={<Login/>}></Route>
            <Route path='/register' element={<Register/>}></Route>
            <Route path='/dashboard' element={<Dashboard/>}></Route>
            <Route path='/' element={<Home/>}></Route>
            
          </Routes>
        </div>
      </Router>
      <ToastContainer/>
    </>
  );
}

export default App;
