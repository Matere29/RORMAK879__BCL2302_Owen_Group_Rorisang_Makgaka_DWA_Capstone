import React, { useState, useEffect, useSyncExternalStore } from "react";
import { supabase } from "./SignIn";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";

export default function Favorites(props) {
  const [favouriteData, setFavouriteData] = useState([]);
  const [state, setState] = useState("loading");
  const [sortState, setSortState] = useState("originData");
  const [sortPhase, setSortPhase] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data, error } = await supabase
          .from("Favorites")
          .select("*")
          .eq("Email", props.email);
        if (error) {
          console.error("Error fetching data:", error.message);
        } else {
          setFavouriteData(data);
          setState("favourites");
        }
      } catch (error) {
        console.error("Error fetching data:", error.message);
      }
    };

    fetchData(); // Call the function to fetch data when the component mounts
  }, [favouriteData]);

  const handleDelete = async (title) => {
    setSortState("originData");
    const { data, error } = await supabase
      .from("Favorites")
      .delete()
      .eq("EpisodeTitle", title)
      .eq("Email", props.email);

    if (error) {
      console.log(error);
    }
    if (data) {
    }
  };

  function sortByAscending() {
    setSortState("sortByAscending");
    setSortPhase(favouriteData.sort((a, b) => b.Show.localeCompare(a.Show)));
  }
  function sortByDescending() {
    setSortState("sortByDescending");
    setSortPhase(favouriteData.sort((a, b) => a.Show.localeCompare(b.Show)));
  }
  function sortByLatest() {
    setSortState("sortByLatest");
    setSortPhase(
      favouriteData.sort((a, b) => new Date(a.Added) - new Date(b.Added))
    );
  }
  function sortByOldest() {
    setSortState("sortByOldest");
    setSortPhase(
      favouriteData.sort((a, b) => new Date(b.Added) - new Date(a.Added))
    );
  }

  const favouriteElements = (
    sortState === "originData" ? favouriteData : sortPhase
  ).map((item) => {
    const AddedDate = new Date(item.Added);
    return (
      <div key={item.id} className="episodes">
        <p>Show: {item.Show}</p>
        <p>Seasons: {item.Season}</p>
        <p>Title: {item.EpisodeTitle}</p>
        <p>Episode: {item.EpisodeNumber}</p>
        <p>
          Added:{" "}
          {AddedDate.toLocaleDateString("en-GB", {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </p>
        <div className="favButtons">
          {/* <button onClick={() => handleDelete(item.EpisodeTitle)}>DELETE</button> */}
          <button
            onClick={() => handleDelete(item.EpisodeTitle)}
            className="btn btn-danger"
          >
            DELETE <FontAwesomeIcon icon={faTrashAlt} className="ml-2" />
          </button>

          {/* <button id={item.EpisodeFile} title={item.EpisodeTitle} onClick={props.HandleAudioPlay}>Play</button> */}
          <audio src={item.EpisodeFile} title={item.title} controls />
        </div>
      </div>
    );
  });

  return (
    <>
      <div className="SortNav">
        <button onClick={sortByAscending}>A-Z</button>
        <button onClick={sortByDescending}>Z-A</button>
        <button onClick={sortByLatest}>Latest</button>
        <button onClick={sortByOldest}>Oldest</button>
      </div>
      <div className="favouriteSection">
        <h1 className="favTitle">FAVOURITES</h1>
        {state === "loading" ? (
          <div className="NoFavouritesText">{"LOADING..."}</div>
        ) : favouriteData.length === 0 ? (
          <h1 className="NoFavouritesText">No Favourites Available</h1>
        ) : (
          <div className="favourites">{favouriteElements}</div>
        )}
      </div>
    </>
  );
}
