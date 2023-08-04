import React from "react";

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
            </button>
        )
    })

    return (
        <div>
            {
                previewElements
            }
        </div>
    )
}
