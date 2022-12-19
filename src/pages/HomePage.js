import React from 'react';
import { useSearchParams } from 'react-router-dom';
import NoteList from '../components/NoteList';
import SearchBar from '../components/SearchBar';
import ButtonAdd from '../components/ButtonAdd';
import { getActiveNotes } from '../utils/api';
import LangContext from '../contexts/LangContext';

function HomePage(){
    const [searchParams, setSearchParams]= useSearchParams();
    const [notes, setNotes] = React.useState([]);
    const [keyword, setKeyword] = React.useState(() => {
        return searchParams.get('keyword') || ''
    });
    const {language} = React.useContext(LangContext);

    React.useEffect(() => {
        async function fetchActivedNotes() {
            const {data}= await getActiveNotes();
            setNotes(data);
        }
        fetchActivedNotes();

        return () => {
            setNotes(null);
        };
    },[]);

    function onKeywordChangeHandler(keyword){
        setKeyword(keyword);
        setSearchParams({keyword});
    }

    const filteredNotes = notes.filter((note) => {
        return note.title.toLowerCase().includes(
            keyword.toLowerCase()
        );
    });

    return (
            <section className='homePage'>
                <h2>
                    {language === 'id' ? 'Catatan Aktif' : 'Active Notes' }
                </h2>
                <SearchBar keyword={keyword} keywordChange={onKeywordChangeHandler} />
                <NoteList notes={filteredNotes} />
                <div className="detail-page__action">
                    <ButtonAdd />
                </div>
            </section>
    )
}

export default HomePage;
