import React from "react";
//Defines a functional component named Preview and accepts a props object as an argument
export default function Preview(props) {
    const previewElements = props.Preview.map(item => {
        const UpdatedDate = new Date(item.updated)
        return (
            <button
                key={item.id}
                className="showItem"
                id={item.id}
                onClick={props.HandlePreviewClick}
                title={item.title}
            >
                <img src={item.image} />
                <p>{item.title}</p>
                <p>Seasons: {item.seasons}</p>
                <p>Updated: {`${UpdatedDate.getFullYear()}-${UpdatedDate.getMonth()}-${UpdatedDate.getDate()}`}</p>
                {/* <button>Description:{item.description}</button> */}
            </button>
        )
    })

    return (
        <div className="previewPage">
            {
                previewElements
            }
        </div>
    )
}
