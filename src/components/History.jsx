import React, { useState, useEffect, useSyncExternalStore } from "react";
import { supabase } from "./SignIn";

export default function History(props) {
    const [historyData, setHistoryData] = useState([]);
    const [state, setState] = useState('loading')

    useEffect(() => {
        const fetchData = async () => {
            try {
                const { data, error } = await supabase
                    .from('History')
                    .select('*')
                    .eq('Email', props.email)
                if (error) {
                    console.error('Error fetching data:', error.message);
                } else {
                    setHistoryData(data);
                    setState('History')
                }
            } catch (error) {
                console.error('Error fetching data:', error.message);
            }
        };

        fetchData(); // Call the function to fetch data when the component mounts
    }, [historyData]);

    
    const handleDelete = async () => {
        const { data, error } = await supabase
            .from('History')
            .delete()
            .eq('Email', props.email)

        if (error) {
            console.log(error)
        }
        if (data) {

        }
    }




    const HistoryElements = historyData.map(item => {

        const AddedDate = new Date(item.Added)
        return (
            <div
                key={item.id}
                className="episodes"

            >
                <p>Show: {item.Show}</p>
                <p>Seasons: {item.Season}</p>
                <p>Title: {item.EpisodeTitle}</p>
                <p>Episode: {item.EpisodeNumber}</p>
                <p>Added: {AddedDate.toLocaleDateString('en-GB', { hour: '2-digit', minute: '2-digit' })}</p>
                <div className="favButtons">
                    {/* <button id={item.EpisodeFile} title={item.EpisodeTitle} onClick={props.HandleAudioPlay}>Play</button> */}
                    <audio src={item.EpisodeFile} title={item.title} controls/>
                </div>
            </div>
        )
    })

    return (
        <>  
           <button onClick={handleDelete}>Clear All</button>
            <div className="favouriteSection">
                <h1 className="favTitle">History</h1>
                {
                    state === 'loading' ? <div className="NoFavouritesText">{"LOADING..."}</div> :
                        historyData.length === 0 ? <h1 className="NoFavouritesText">No History Available</h1> :
                            <div className="favourites">{HistoryElements}</div>
                }

            </div>
        </>
    )
}