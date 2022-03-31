import './App.css';
import Home from './pages/Home';
import Detail from './pages/Detail';
import { Routes, Route, Link } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid mx-3">
          <span className="navbar-brand">Pokedex</span>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
            <div className="navbar-nav">
              <Link to={'/'} className="nav-link active" aria-current="page" >Home</Link>
            </div>
          </div>
        </div>
      </nav>
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/detail/:id' element={<Detail/>} />
      </Routes>
    </div>
  );
}

export default App;
