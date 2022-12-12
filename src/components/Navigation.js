import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { FiHome, FiPlusCircle, FiLogOut } from 'react-icons/fi';

function Navigation({ logout, name }) {
    return (
        <nav>
            <ul>
                <li>
                    <Link to="/">Catatan Aktif</Link>
                </li>
                <li>
                    <Link to="/arsip">Catatan Arsip</Link>
                </li>
                <li>
                    <button onClick={logout}>{name} <FiLogOut /></button>
                </li>
            </ul>
        </nav>
    );
}

Navigation.propTypes = {
    logout: PropTypes.func.isRequired,
    name: PropTypes.string.isRequired,
};

export default Navigation;
