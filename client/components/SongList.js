import React from 'react'
import { gql } from 'apollo-boost'
import { Query, Mutation } from 'react-apollo'
import { Link } from 'react-router-dom'
import query from '../queries/fetchSongs'

const getSongsQuery = gql`
    {
        songs {
            id
            title
        }
    }
`;

const DELETE_SONG = gql`
        mutation DeleteSong($id: ID) {
            deleteSong(id: $id){
            id
        }
    }
`

const SongList = () => (
    <Query query={getSongsQuery}>
        {({ loading, error, data}) => {
            if (loading) return <p>Loading...</p>;
            if (error) return <p>Error...</p>;
            const songsList = data.songs.map(({ id, title }) => {
                return (
                    <li 
                    className="collection-item"
                    key={id}
                    >
                        <span>{title}</span>
                        <Mutation mutation={DELETE_SONG} key={id}>
                        {(deleteSong) => (
                            <i
                                className="material-icons"
                                onClick={() => 
                                    deleteSong({ 
                                        variables: { id } ,
                                        refetchQueries: [{
                                            query
                                        }]
                                    })
                                }
                            >
                            delete
                            </i>
                        )}
                        </Mutation>
                    </li>
                )
            })
            return (
                <div>
                    <ul 
                        className="collection"
                        style={{ "listStyleType": "none" }}
                    >
                        {songsList}
                    </ul>
                    <Link
                        to="/songs/new"
                        className="btn-floating btn-large red right"
                    >
                        <i className="material-icons">add</i>
                    </Link>
                </div>
            );
        }}
    </Query>
)

export default SongList
