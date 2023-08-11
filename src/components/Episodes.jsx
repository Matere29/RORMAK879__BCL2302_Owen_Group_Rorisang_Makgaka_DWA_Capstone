import React, { useState, useEffect } from "react";
//This defines a functional component named Episodes and accepts s 'props' object as an argument. 
export default function Episodes(props) {
    
//Rendering Episodes
    const episodeElements = props.Preview.map(item => {


        return (
            <div
                key={item.episode}//value is used as a unique key
                className="episodes"//css class
                title={item.title}//Sets the title attribute to the episode
                // description={item.description}//Sets the
            >
                <h3>{item.title}</h3>
                <p>Episode: {item.episode}</p>
                <audio src={item.file} title={item.title} controls/>
            </div>
        )
    })

    return (
        <>
            {
                episodeElements//renders the list of episode element
            }
        </>

    )
}
