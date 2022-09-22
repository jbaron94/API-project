import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { getSongDetails } from '../../store/song';
import { deleteSong } from '../../store/song';
import { Link } from 'react-router-dom';
import SongEditForm from './SongEditForm';

const SongIndexItem = ({ song }) => {
    const { id } = useParams();
    console.log("this is the song Id", id)
    const singleSong = useSelector(state => state.songs.singleSong);
    console.log("this is the song", singleSong)

    const dispatch = useDispatch()
    const history = useHistory()
    const [showEdit, setShowEdit] = useState(false)

    useEffect(() =>{
        dispatch(getSongDetails(id))
    }, [id])


    const removeSong = () => {
        dispatch(deleteSong(id))
        .then(() => history.push('/'))
      };



    return (
<div className="song-detail-lists">
        <div>
            <h2>{singleSong?.title}</h2>
            <ul>
                {/* {singleSong?.song?.map(song => (
                    <div>
                    <li>{song.imageUrl}</li>
                    <li>{song.description}</li>
                    </div>
                ))} */}
                <li>{singleSong?.imageUrl}</li>
                <li>{singleSong?.description}</li>
            </ul>
            <button onClick={removeSong}>Delete Song</button>
            <button onClick={() => setShowEdit(!showEdit)}>Edit Song</button>
          </div>
          {showEdit && (
            <SongEditForm />
          )}
</div>
      );
    };

export default SongIndexItem
