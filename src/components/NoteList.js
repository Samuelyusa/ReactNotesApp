import React from 'react';
import PropTypes from 'prop-types';
import NoteItem from './NoteItem';
import { getActiveNotes } from '../utils/api';

function NoteList({ notes }) {
    const [loading, setLoading] = React.useState(true);
    const [activedNotes, setActivedNotes] = React.useState([]);

    React.useEffect(() => {
        getActiveNotes().then((activedNotes) => {
            setActivedNotes(activedNotes);
            setLoading(false);
        });

        return () => {
            setActivedNotes(null);
            setLoading(true);
        };
    }, []);

    if (loading) {
        return (
            <div className="lds-ellipsis">
                <div></div>
                <div></div>
                <div></div>
                <div></div>
            </div>
        )
    }
        return (
            <div className='notes-list'>
            {notes.map((note) => (
                <NoteItem key={note.id} {...note} />
            ))}
            </div>
        );
}

NoteList.propTypes = {
    notes: PropTypes.arrayOf(PropTypes.object).isRequired,
}


export default NoteList;
