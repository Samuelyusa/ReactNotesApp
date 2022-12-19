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
    
//     const keyword = searchParams.get('keyword');
//     function changeSearchParams(keyword) {
//         setSearchParams((keyword));
//     }

//     return <ArchivedPage defaultKeyword={keyword} keywordChange={changeSearchParams} />
// }

// class ArchivedPage extends React.Component {
//     constructor(props) {
//         super(props);

//         this.state = {
//         ArchivedNotes: [],
//         keyword: props.defaultKeyword || '',
//         };

//         this.onDeleteHandler = this.onDeleteHandler.bind(this);
//         this.onKeywordChangeHandler = this.onKeywordChangeHandler.bind(this);
//     }

//     async componentDidMount() {
//         const { data } = await getArchivedNotes();

//         this.setState(() => {
//             return {
//                 ArchivedNotes: data,
//             }
//         });
//     }

//     async onDeleteHandler(id){
//         await deleteNote(id);

//         const { data } = await getArchivedNotes();
//         this.setState(() => {
//             return {
//                 ArchivedNotes: data,
//             }
//         });
//     }

//     onKeywordChangeHandler(keyword) {
//         this.setState(() => {
//             return {
//                 keyword,
//             }
//         });
//         this.props.keywordChange(keyword);
//     }

//     render() {
//         const ArchivedNotes = this.state.ArchivedNotes.filter((note) => {
//             return note.title.toLowerCase().includes(
//                 this.state.keyword.toLowerCase()
//             );
//         });

//         return (
//             <LangConsumer>
//                 {
//                     ({language}) => {
//                         return(
//                             <section className='archivedPage'>
//                                 <h2>
//                                     {language === 'id' ? 'Catatan Arsip' : 'Archive Notes' }</h2>
//                                 <SearchBar keyword={this.state.keyword} keywordChange={this.onKeywordChangeHandler} />
//                                 <NoteList notes={ArchivedNotes} />
//                             </section>
//                         )
//                     }
//                 }
//             </LangConsumer>
//         );
//     }
// }

// ArchivedPage.propTypes = {
//     defaultKeyword: PropTypes.string,
//     keywordChange: PropTypes.func.isRequired
// }
// export default ArchivedPageWrapper;
