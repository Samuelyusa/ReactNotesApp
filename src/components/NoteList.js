import React from 'react';
import PropTypes from 'prop-types';
import NoteItem from './NoteItem';
import { getActiveNotes } from '../utils/api';

function NoteList({ notes }) {

    const [activedNotes, setActivedNotes] = React.useState(null);

    React.useEffect(() => {
        async function fetchActivedNotes() {
            const { data } = await getActiveNotes();
            setActivedNotes(data);
        }
        fetchActivedNotes();

        return () => {
            setActivedNotes(null);
        };
    }, [notes]);

    if (activedNotes === null) {
        return (
            <div className="lds-ellipsis">
                <div></div>
                <div></div>
                <div></div>
                <div></div>
            </div>
        )
    }

    if (notes.length === 0) {
        return (
            <div className='notes-list-empty'>
                <p>Tidak ada Catatan</p>
            </div>
        );
    }
    else {
        return (
            <div className='notes-list'>
            {notes.map((note) => (
                <NoteItem key={note.id} {...note} />
            ))}
            </div>
        );
    }
}

NoteList.propTypes = {
    notes: PropTypes.arrayOf(PropTypes.object).isRequired,
}

export default NoteList;
