import React, { useState } from 'react'
import { gql } from 'apollo-boost'
import { useMutation } from '@apollo/react-hooks'

const LyricCreate = ({ songId }) => {
    const [content, setContent] = useState('')
    const [addLyricToSong] = useMutation(ADD_LYRIC)

    const onSubmit = event => {
        event.preventDefault();
        addLyricToSong({
            variables: { content, songId }
        }).then(() => {
            setContent('')
        })
    }

    return (
        <form onSubmit={onSubmit}>
            <label>Add a Lyric</label>
            <input
                value={content}
                onChange={ event => setContent(event.target.value) }
            />
        </form>
    )
}

const ADD_LYRIC = gql`
    mutation AddLyricToSong($content: String, $songId: ID){
        addLyricToSong(content: $content, songId:$songId) {
            id
            lyrics{
                id
                content
            }
        }
    }
`

export default LyricCreate
