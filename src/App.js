import React from 'react';
import { Routes, Route } from 'react-router-dom';
import AddNotePage from './pages/AddNotePage';
import ArchivePage from './pages/ArchivePage';
import Navigation from './components/Navigation';
import HomePage from './pages/HomePage';
import DetailNotePage from './pages/DetailNotePage';
import PageNotFound from './pages/PageNotFound';
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
import { getUserLogged, putAccessToken } from './utils/api';
import { ThemeProvider } from './contexts/ThemeContext';
import { LangProvider } from './contexts/LangContext';

class NoteApp extends React.Component{
  constructor(props) {
    super(props);

    this.state = {
      authedUser: null,
      initializing: true,
      
      theme: localStorage.getItem('theme') || 'light',
      toggleTheme: () => {
        this.setState((prevState) => {
          const newTheme = prevState.theme === 'dark' ? 'light' : 'dark';
          localStorage.setItem('theme', newTheme);
          return {
            theme: newTheme
          };
        });
      },

      langContext: {
        language: localStorage.getItem('language') || 'id',
        toggleLang: () => {
          this.setState((prevState) => {
            const newLanguage = prevState.langContext.language === 'id' ? 'en' : 'id';
            localStorage.setItem('language', newLanguage);
            return {
              langContext: {
                ...prevState.langContext,
                language: newLanguage
              }
            }
          })
        }
      }

    };

    this.onLoginSuccess = this.onLoginSuccess.bind(this);
    this.onLogout = this.onLogout.bind(this);
  }

  async componentDidMount() {
    const { data } = await getUserLogged();
    document.documentElement.setAttribute('data-theme', this.state.theme);

    this.setState(() => {
      return {
        authedUser: data,
        initializing: false
      }
    });
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.theme !== this.state.theme) {
      document.documentElement.setAttribute('data-theme', this.state.theme);
    }
  }

  async onLoginSuccess({ accessToken }) {
    putAccessToken(accessToken);
    const { data } = await getUserLogged();

    this.setState(() => {
      return {
        authedUser: data,
      }
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
        <LangProvider value={this.state.langContext}>
        {/* // <LangContext.Provider value={LangContextValue}> */}
          <div className='app-container'>
              <header>
                <h1>
                { this.state.langContext.language === 'id' ? 'Aplikasi Catatan' : 'Notes App' }
                  {/* { language === 'id' ? 'Aplikasi Catatan' : 'Notes App' } */}
              
                </h1>
              </header>
              <main>
                  <Routes>
                    <Route path="/*" element={<LoginPage loginSuccess={this.onLoginSuccess}  />} />
                    <Route path="/register" element={<RegisterPage/>} />
                </Routes>
              </main>
            </div>
        {/* </LangContext.Provider>  */}
          </LangProvider >
      )
    }
    
    return (
      <LangProvider value={this.state.langContext}>
      {/* // <LangContext.Provider value={LangContextValue}> */}
      <ThemeProvider value={this.state}>
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
      </ThemeProvider>
      {/* </LangContext.Provider> */}
      </LangProvider>
    );
  }

}

export default NoteApp;
