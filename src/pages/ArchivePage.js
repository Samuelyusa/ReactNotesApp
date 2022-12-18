import React from 'react';
import PropTypes from 'prop-types';
import { useSearchParams } from 'react-router-dom';
import NoteList from '../components/NoteList';
import SearchBar from '../components/SearchBar';
import { getArchivedNotes, deleteNote } from '../utils/api';
import { LangConsumer } from '../contexts/LangContext';

function ArchivedPageWrapper() {
    const [searchParams, setSearchParams] = useSearchParams();
    const keyword = searchParams.get('keyword');
    function changeSearchParams(keyword) {
        setSearchParams((keyword));
    }

    return <ArchivedPage defaultKeyword={keyword} keywordChange={changeSearchParams} />
}

class ArchivedPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
        ArchivedNotes: [],
        keyword: props.defaultKeyword || '',
        };

        this.onDeleteHandler = this.onDeleteHandler.bind(this);
        this.onKeywordChangeHandler = this.onKeywordChangeHandler.bind(this);
    }

    async componentDidMount() {
        const { data } = await getArchivedNotes();

        this.setState(() => {
            return {
                ArchivedNotes: data,
            }
        });
    }

    async onDeleteHandler(id){
        await deleteNote(id);

        const { data } = await getArchivedNotes();
        this.setState(() => {
            return {
                ArchivedNotes: data,
            }
        });
    }

    onKeywordChangeHandler(keyword) {
        this.setState(() => {
            return {
                keyword,
            }
        });
        this.props.keywordChange(keyword);
    }

    render() {
        const ArchivedNotes = this.state.ArchivedNotes.filter((note) => {
            return note.title.toLowerCase().includes(
                this.state.keyword.toLowerCase()
            );
        });

        return (
            <LangConsumer>
                {
                    ({language}) => {
                        return(
                            <section className='archivedPage'>
                                <h2>
                                    {language === 'id' ? 'Catatan Arsip' : 'Archive Notes' }</h2>
                                <SearchBar keyword={this.state.keyword} keywordChange={this.onKeywordChangeHandler} />
                                <NoteList notes={ArchivedNotes} />
                            </section>
                        )
                    }
                }
            </LangConsumer>
        );
    }
}

ArchivedPage.propTypes = {
    defaultKeyword: PropTypes.string,
    keywordChange: PropTypes.func.isRequired
}
export default ArchivedPageWrapper;
