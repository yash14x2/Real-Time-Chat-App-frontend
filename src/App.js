import logo from './logo.svg';
import './App.css';
import { BrowserRouter , Route , Routes } from 'react-router-dom';
import Register from './Pages/Register';
import Login from './Pages/Login';
import Setavtar from './Pages/Setavtar';
import Chat from './Pages/Chat';


function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
      <Route path='/' element={<Chat></Chat>}></Route>
        <Route path='/register' element={<Register></Register>}></Route>
        <Route path='/login' element={<Login></Login>}></Route>
        <Route path='/setavtar' element={<Setavtar></Setavtar>}></Route>
      </Routes>
      </BrowserRouter>
      
    </div>
  );
}

export default App;
