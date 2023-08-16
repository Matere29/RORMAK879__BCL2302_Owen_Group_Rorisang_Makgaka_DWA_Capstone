import React, { useState, useEffect } from "react";
import { supabase } from "./SignIn";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
//This defines a functional component named Episodes and accepts s 'props' object as an argument.
export default function Episodes(props) {
  const SaveToFavoritesDatabase = async (
    EpisodeTitle,
    EpisodeNumber,
    EpisodeDescription,
    EpisodeFile
  ) => {
    const Season = props.favouriteSeasonTitle;
    const Show = props.favouriteShowTitle;
    const Email = props.email;
    try {
      const { data, error } = await supabase
        .from("Favorites")
        .insert([
          {
            Season,
            Show,
            EpisodeTitle,
            EpisodeDescription,
            EpisodeNumber,
            EpisodeFile,
            Email,
          },
        ]);

      if (error) {
        console.error("Error inserting data:", error.message);
      } else {
        // console.log('Data inserted successfully:', data);
      }
    } catch (error) {
      console.error("Error inserting data:", error.message);
    }
  };

  const SaveToHistoryDatabase = async (
    EpisodeTitle,
    EpisodeNumber,
    EpisodeDescription,
    EpisodeFile
  ) => {
    const Season = props.favouriteSeasonTitle;
    const Show = props.favouriteShowTitle;
    const Email = props.email;
    try {
      const { data, error } = await supabase
        .from("History")
        .insert([
          {
            Season,
            Show,
            EpisodeTitle,
            EpisodeDescription,
            EpisodeNumber,
            EpisodeFile,
            Email,
          },
        ]);

      if (error) {
        console.error("Error inserting data:", error.message);
      } else {
        // console.log('Data inserted successfully:', data);
      }
    } catch (error) {
      console.error("Error inserting data:", error.message);
    }
  };

  //Rendering Episodes
  const episodeElements = props.Preview.map((item) => {
    return (
      <div
        key={item.episode} //value is used as a unique key
        className="episodes" //css class
        title={item.title} //Sets the title attribute to the episode
        // description={item.description}//Sets the
      >
        <h3>{item.title}</h3>
        <p>Episode: {item.episode}</p>
        <audio
          src={item.file}
          title={item.title}
          onPlay={() =>
            SaveToHistoryDatabase(
              item.title,
              item.episode,
              item.description,
              item.file
            )
          }
          controls
        />
        <button
          onClick={() =>
            SaveToFavoritesDatabase(
              item.title,
              item.episode,
              item.description,
              item.file
            )
          }
          className="btn btn-outline-danger"
        >
          Add To Favorites <FontAwesomeIcon icon={faHeart} className="ml-2" />
        </button>
        
      </div>
    );
  });

  return (
    <>
      {
        episodeElements //renders the list of episode element
      }
    </>
  );
}
