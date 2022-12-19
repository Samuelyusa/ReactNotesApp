import React from 'react';
import { getActiveNotes } from '../utils/api';


function useNotes() {
    const [loading, setLoading] = React.useState(true);
    const [activedNotes, setActivedNotes] = React.useState([]);

    React.useEffect(() => {
        getActiveNotes().then((activedNotes) => {
            setActivedNotes(activedNotes);
            setLoading(false);
        });

        return () => {
            setLoading(true);
        };
    }, []);

    return [activedNotes, loading];
}
export default useNotes;