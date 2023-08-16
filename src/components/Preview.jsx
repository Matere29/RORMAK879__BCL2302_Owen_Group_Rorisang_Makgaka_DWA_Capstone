import React from "react";
//Defines a functional component named Preview and accepts a props object as an argument
export default function Preview(props) {

    const genderToString = (gender) => {
        switch (gender) {
            case 1:
                return 'Personal Growth';
            case 2:
                return 'True Crime and Investigative Journalism';
            case 3:
                return 'History';
            case 4:
                return 'Comedy';
            case 5:
                return 'Entertainment';
            case 6:
                return 'Business';
            case 7:
                return 'Fiction';
            case 8:
                return 'News';
            case 9:
                return 'Kids and Family';
            default:
                return 'Unknown, ';
        }
    };

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
                <h5>{item.title}</h5>
                <p>Seasons: {item.seasons}</p>
                <h6>Genre: {item.genres.map(genderToString).join(',')}</h6>
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
