import { Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import NavBar from './components/NavBar';

const App = () => {
  return (
    <div className="App">
      <NavBar/>
      <Routes>
        <Route path="/" element={<HomePage />} />
        {/* <Route path="/explore" element={<Explore/>}/>
        <Route path="/mylist" element={<MyList/>}/>
        <Route path="/register" element={<Login/>}/>
        <Route path="/login" element={<Register/>}/> */}
      </Routes>
    </div>
  );
}

export default App;
