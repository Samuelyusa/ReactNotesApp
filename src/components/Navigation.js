import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { FiHome, FiPlusCircle, FiLogOut } from 'react-icons/fi';
import ToggleTheme from './ToggleTheme';
import { LangConsumer } from '../contexts/LangContext';
import ToggleLang from './ToggleLang';

function Navigation({ logout, name }) {
    return (
        <LangConsumer>
            {
                ({ language }) => {
                    return (
                        <nav>
                            <ul>
                                <li>
                                    <ToggleLang/>
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
                                    <button className='button-logout' onClick={logout}>{name} <FiLogOut /></button>
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
