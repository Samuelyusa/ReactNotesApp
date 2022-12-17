import React from 'react';
// import { addNote } from '../utils/local-data';
import { addNote } from '../utils/api';
import NoteInput from '../components/NoteInput';
import { useNavigate } from 'react-router-dom';

function AddNotePage() {
    const navigate = useNavigate();

    async function onAddNoteHandler(note) {
        await addNote(note);
        navigate('/');
    }

  return (
    <section>
      <h2>Tambah Catatan</h2>
      <NoteInput addNote={onAddNoteHandler} />
    </section>
  )
}

export default AddNotePage;