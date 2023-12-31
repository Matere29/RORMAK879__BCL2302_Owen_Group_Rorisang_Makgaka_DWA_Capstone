import React from "react";

export default function Season(props) {

    const seasonElements = props.Preview.map(item => {
        return (
            <button
                key={item.season}
                className="showItem"
                id={item.season - 1}
                onClick={props.HandleSeasonClick}
                title={item.title}
            >
                <img src={item.image} />
                <p>{item.title}</p>
                <p>Episodes: {item.episodes.length}</p>
            </button>
        )
    })

    return (
        <>
            {
                seasonElements
            }
        </>
    )
}
