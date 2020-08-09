import React from 'react'
import './Body.css'
import Header from './Header'
import {useDataLayerValue} from './DataLayer'
// import SongRow from "./SongRow";
import PlayCircleFilledIcon from "@material-ui/icons/PlayCircleFilled";
import FavoriteIcon from "@material-ui/icons/Favorite";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import SongRow from './SongRow';

function Body({spotify}) {

const [{discover_weekly}, dispatch]=useDataLayerValue();
console.log("TRACK>>>>>>>>>",discover_weekly)
const playPlaylist = (id) => {
    spotify
      .play({
        context_uri: `spotify:playlist:37i9dQZEVXcJZyENOWUFo7`,
      })
      .then((res) => {
        spotify.getMyCurrentPlayingTrack().then((r) => {
          dispatch({
            type: "SET_ITEM",
            item: r.item,
          });
          dispatch({
            type: "SET_PLAYING",
            playing: true,
          });
        });
      });
  };

  const playSong = (id) => {
    spotify
      .play({
        uris: [`spotify:track:${id}`],
      })
      .then((res) => {
        spotify.getMyCurrentPlayingTrack().then((r) => {
          dispatch({
            type: "SET_ITEM",
            item: r.item,
          });
          dispatch({
            type: "SET_PLAYING",
            playing: true,
          });
        });
      });
  };


    return (
        
        <div className="body">
           <Header  spotify={spotify}/>

           <div className="body__info">
               {/* //"https://i.scdn.co/image/ab67616d0000b27359a1132f3cab22f80b2d2777" */}
               <img src={ discover_weekly?.images[0].url} alt="" />
               <div className="body__infoText">
                   <strong>PLAYLIST</strong>
                   <h2>Discover Weekly</h2>
                   <p>{discover_weekly?.description}</p>
               </div>
            </div>
            <div className="body__song">
                <div className="body__icons">
                <PlayCircleFilledIcon className="body__shuffle" onClick={playPlaylist}/>
                <FavoriteIcon fontSize="large" />
                <MoreHorizIcon />
             </div>

             {discover_weekly?.tracks.items.map(item=>(
                 <SongRow track={item.track}/>
             ))}
            </div>
        </div>
    )
}

export default Body
