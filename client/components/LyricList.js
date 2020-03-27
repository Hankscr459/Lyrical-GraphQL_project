import React from 'react'
import { gql } from 'apollo-boost'
import { useMutation } from '@apollo/react-hooks'

const ADD_LIKE = gql`
mutation LikeLyric($id: ID) {
    likeLyric(id: $id){
      id
      likes
    }
  }
`

const LyricList = ({lyrics}) => {
    const [likeLyric] = useMutation(ADD_LIKE)

    const onLike = (id, likes) => {
        likeLyric({
            variables: {id},
            optimisticResponse: {
                __typename: 'Mutation',
                likeLyric: {
                    id: id,
                    __typename: 'LyricType',
                    likes: likes +1
                }
            }
        })
    }

    const renderLyrics = () => {
        return lyrics.map(({ id, content, likes }) => {
            return (
                <li key={id} className="collection-item">
                    {content}
                    <div className='vote-box'>
                        <i 
                            className='material-icons'
                            onClick={() => onLike(id, likes)}
                        >
                            thumb_up
                        </i>
                        {' '}{likes}
                    </div>
                </li>
            )
        })
    }

    return (
        <ul className="collection">
            {renderLyrics()}
        </ul>
    )
}

export default LyricList
