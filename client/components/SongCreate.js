import React, { useState } from 'react'
import { gql } from 'apollo-boost'
import { useMutation } from '@apollo/react-hooks'
import { Link } from 'react-router-dom'
import query from '../queries/fetchSongs'

const SongCreate = ({history}) => {
    const [title, setTitle] = useState('');
    const [addSong] = useMutation(ADD_SONG);
 
    const onSubmit = event => {
        event.preventDefault();
        addSong({
            variables: { title },
            // when inserting data, you may have to refetch data
            refetchQueries: [{
                query,
                // variables: you can add variables here 
            }]
        }).then(() => {
            setTitle({title: ''})
            history.push('/')
        })
    }
    return (
        <div>
            <Link to='/'>Back</Link>
            <h3>Create a New Song</h3>
            <form onSubmit={onSubmit}>
                <label>Song Title:</label>
                <input type="text" onChange={e => setTitle(e.target.value)} value={title}/>
            </form>
        </div>
    );
};
 
const ADD_SONG = gql`
    mutation AddSong($title: String) {
        addSong(title: $title) {
            id
            title
        }
    }
`
 
export default SongCreate
