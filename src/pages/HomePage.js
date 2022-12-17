import React from 'react';
import PropTypes from 'prop-types';
import { useSearchParams } from 'react-router-dom';
import NoteList from '../components/NoteList';
import SearchBar from '../components/SearchBar';
import ButtonAdd from '../components/ButtonAdd';
import { getActiveNotes, deleteNote } from '../utils/api';
import { LangConsumer } from '../contexts/LangContext';

function HomePageWrapper() {
    const [searchParams, setSearchParams] = useSearchParams();
    const keyword = searchParams.get('keyword');
    function changeSearchParams(keyword) {
        setSearchParams((keyword));
    }

    return <HomePage defaultKeyword={keyword} keywordChange={changeSearchParams} />
}


class HomePage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
        // ActivedNotes: getActiveNotes(),
        ActivedNotes: [],
        keyword: props.defaultKeyword || '',
        };

        // this.onDeleteHandler = this.onDeleteHandler.bind(this);
        this.onKeywordChangeHandler = this.onKeywordChangeHandler.bind(this);
    }

    async componentDidMount() {
        const { data } = await getActiveNotes();
        this.setState(() => {
            return {
                ActivedNotes: data,
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
        const ActivedNotes = this.state.ActivedNotes.filter((note) => {
            return note.title.toLowerCase().includes(
                this.state.keyword.toLowerCase()
            );
        });

        return (
            <LangConsumer>
                {
                    ({language}) => {
                        return(
                            <section className='homePage'>
                                <h2>
                                    {language === 'id' ? 'Catatan Aktif' : 'Active Notes' }
                                </h2>
                                <SearchBar keyword={this.state.keyword} keywordChange={this.onKeywordChangeHandler} />
                                <NoteList notes={ActivedNotes} />
                                <div className="detail-page__action">
                                    <ButtonAdd />
                                </div>
                            </section>
                        )
                    }
                }
            </LangConsumer>
        )
    }
}

HomePage.propTypes = {
    defaultKeyword: PropTypes.string,
    keywordChange: PropTypes.func.isRequired
}

export default HomePageWrapper;
