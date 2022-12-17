import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { FiHome, FiPlusCircle, FiLogOut } from 'react-icons/fi';
import ToggleTheme from './ToggleTheme';
import { LangConsumer } from '../contexts/LangContext';

function Navigation({ logout, name }) {
    return (
        <LangConsumer>
            {
                ({ language, toggleLang }) => {
                    return (
                        <nav>
                            <ul>
                                <li>
                                    <button onClick={toggleLang}>{language === 'id' ? 'en' : 'id'}</button>
                                </li>
                                <li>
                                    <Link to="/">
                                        {language === 'id' ? 'Catatan Aktif' : 'Active Notes'}
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/arsip">
                                        { language === 'id' ? 'Catatan Arsip' : 'Archive Notes' }
                                    </Link>
                                </li>
                                <li>
                                    <ToggleTheme/>
                                </li>
                                <li>
                                    <button onClick={logout}>{name} <FiLogOut /></button>
                                </li>
                            </ul>
                        </nav>
                    )
                }
            }
            
            </LangConsumer>
    );
}

Navigation.propTypes = {
    logout: PropTypes.func.isRequired,
    name: PropTypes.string.isRequired,
};

export default Navigation;
