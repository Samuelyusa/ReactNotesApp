import React from 'react';
import { Routes, Route } from 'react-router-dom';
import AddNotePage from './pages/AddNotePage';
import ArchivePage from './pages/ArchivePage';
import Navigation from './components/Navigation';
import HomePage from './pages/HomePage';
// import SearchPage from './pages/SearchPage';
import DetailNotePage from './pages/DetailNotePage';
import PageNotFound from './pages/PageNotFound';
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
import { getUserLogged, putAccessToken } from './utils/api';

function AppWrapper() {
  // return (
  //   <div className='app-container'>
  //     <header>
  //       <h1>Catatan</h1>
  //       <div className='navigation'>
  //         <Navigation />
  //       </div>
  //     </header>
  //     <main>
  //       <Routes>
  //         <Route path="/" element={<HomePage />} />
  //         <Route path="/arsip" element={<ArchivePage />} />
  //         <Route path="/tambah" element={<AddNotePage />} />
  //         <Route path="/notes/:id" element={<DetailNotePage />} />
  //         <Route path="*" element={<PageNotFound />} />
  //       </Routes>
  //     </main>
  //   </div>
  // );
  return <NoteApp/>
}

class NoteApp extends React.Component{
  constructor(props) {
    super(props);

    this.state = {
      authedUser: null,
      initializing: true,
    };

    this.onLoginSuccess = this.onLoginSuccess.bind(this);
    this.onLogout = this.onLogout.bind(this);
  }

  async componentDidMount() {
    const { data } = await getUserLogged();
    this.setState(() => {
      return {
        authedUser: data,
        initializing: false
      };
    });
  }

  async onLoginSuccess({ accessToken }) {
    putAccessToken(accessToken);
    const { data } = await getUserLogged();

    this.setState(() => {
      return {
        authedUser: data,
      };
    });
  }

  onLogout() {
    this.setState(() => {
      return {
        authedUser: null
      }
    });
    putAccessToken('');
  }

  render() {
    if (this.state.initializing) {
      return null;
    }

    if (this.state.authedUser === null) {
      return (
        <div className='app-container'>
          <header>
            <h1>Aplikasi Kontak</h1>
          </header>
          <main>
            <Routes>
              <Route path="/*" element={<LoginPage loginSuccess={this.onLoginSuccess}  />} />
              <Route path="/register" element={<RegisterPage/>} />
            </Routes>
          </main>
        </div>
      )
    }
    
    return (
      <div className='app-container'>
      <header>
        <h1>Catatan</h1>
        <div className='navigation'>
          <Navigation logout={this.onLogout} name={this.state.authedUser.name} />
        </div>
      </header>
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/arsip" element={<ArchivePage />} />
          <Route path="/tambah" element={<AddNotePage />} />
          <Route path="/notes/:id" element={<DetailNotePage />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </main>
    </div>
    )
  }

}

export default AppWrapper;
