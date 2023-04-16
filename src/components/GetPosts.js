import React, { useState, useEffect } from 'react';
import Avatar from "@material-ui/core/Avatar";


function GetPosts({userName,imageURL,caption}) {

    

    return (

        <div className='postData'>

        <div className="post" >
            <div className="post__header">
                <Avatar
                    className="post__avatar"
                    alt=''
                    src=' '
                />
                <h3>{userName}</h3>
            </div> 

            <img
                className="post__image"
                src={imageURL}
            />

            <p className="post__text">
                {/* <b>{userName}</b>  */}
                {caption}
            </p>

        </div>
        </div>
        


         

    );
}

export default GetPosts;