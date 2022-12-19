import React from 'react';
import { useSearchParams } from 'react-router-dom';
import NoteList from '../components/NoteList';
import SearchBar from '../components/SearchBar';
import { getArchivedNotes } from '../utils/api';
import LangContext from '../contexts/LangContext';

function ArchivedPage() {
    const [searchParams, setSearchParams] = useSearchParams();
    const [ArchivedNotes, setArchivedNotes] = React.useState([]);
    const [keyword, setKeyword] = React.useState(() => {
        return searchParams.get('keyword') || ''
    });
    const {language} = React.useContext(LangContext);

    React.useEffect(()=>{
        async function fetchArchivedNotes(){
            const {data}= await getArchivedNotes();
            setArchivedNotes(data);
        }
        fetchArchivedNotes();

        return ()=> {
            setArchivedNotes(null);
        };
    },[]);

    function onKeywordChangeHandler(keyword){
        setKeyword(keyword);
        setSearchParams({keyword});
    }

    const filteredNotes = ArchivedNotes.filter((note) =>{
        return note.title.toLowerCase().includes(
            keyword.toLowerCase()
        );
    });

    return (
        <section className='archivedPage'>
            <h2>
                {language === 'id' ? 'Catatan Arsip' : 'Archive Notes' }
            </h2>
            <SearchBar keyword={keyword} keywordChange={onKeywordChangeHandler} />
            <NoteList notes={filteredNotes} />
        </section>
    )
}

export default ArchivedPage;