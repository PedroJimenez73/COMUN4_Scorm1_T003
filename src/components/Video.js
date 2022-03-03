import React from 'react';

const Video = (props) => (
        <div className="video__container">
            <iframe className="video" src={props.video} frameBorder="0" title="{video_title}" allowFullScreen></iframe>
        </div>
    );
    
export default Video;
