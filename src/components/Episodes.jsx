import React, { useState, useEffect } from "react";

export default function Episodes(props) {

    const episodeElements = props.Preview.map(item => {


        return (
            <div
                key={item.episode}
                className="episodes"
                title={item.title}
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
                episodeElements
            }
        </>

    )
}
