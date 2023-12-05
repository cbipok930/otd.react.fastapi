// import logo from './logo.svg';
// import './App.css';
import './style.css'
import MainPanel from './MainPanel';
import Sidebar from './Sidebar';
import IntroPanel from './IntroPanel'
import ConclusionPanel from './ConclusionPanel';
import NotFound from './NotFound';
import Posts from './Posts';
import {BrowserRouter as Router, Routes, Route, Navigate, useLocation} from 'react-router-dom'

// import { UserContextProvider, UserContext } from './User';
// import { useContext } from 'react';

function App() {

  const posts_num_f = function (set) { posts_num_f.value = set; };
  posts_num_f.value = 0;

  document.title = "Hell Yeah"
  return (
    <>
      <Router>
      <Sidebar/>
        <Routes>
          <Route exact path="/" element={<IntroPanel/>}/>
          <Route path="/main" element={<MainPanel/>}/>
          <Route path="/conclusion" element={<ConclusionPanel/>}/>
          <Route path="/404" element={<NotFound/>}/>
          <Route path='/posts' element={<Posts value_func={posts_num_f}/>}/>
          <Route
                        path="*"
                        element={<Navigate to="/404" />}
                    />
        </Routes>
      </Router>
    </>
  );
}

export default App;
