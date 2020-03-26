import React from 'react'
import { Link } from 'react-router-dom'
import { Query } from 'react-apollo'
import { gql } from 'apollo-boost'
import LyricCreate from './LyricCreate'

const READ_SONG =gql`
query SongQuery($id: ID!) {
    song(id: $id) {
        id
        title
    }
}
`

const SongDetail = ({match}) => (
    <Query
        query={READ_SONG}
        variables={{ id: match.params.id }}
    >
        {({ loading, error, data }) => {
            if (loading) return <p>Loading...</p>;
            if (error) return <p>Error...</p>;
            const { song } = data
            return (
                <div>
                    <Link to='/'>Back</Link>
                    <h3>{song.title}</h3>
                    <LyricCreate />
                </div>
            )
        }}
    </Query>
)


export default SongDetail
