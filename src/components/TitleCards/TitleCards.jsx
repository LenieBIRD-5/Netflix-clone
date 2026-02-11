import React, { useEffect, useRef, useState } from 'react'
import "./TitleCards.css";
import cards_data from "../../assets/cards/Cards_data.js";
import { Link } from 'react-router-dom';

const TitleCards = ({title, category}) => {

  const [apiData, setApiData] = useState([]);
  const cardsRef = useRef();

  const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4NTI0MDM4MzVkM2Q5NzM5ZWFjYTcwNTk4ODk1OGViYiIsIm5iZiI6MTc3MDY5MTMzNi4xNzcsInN1YiI6IjY5OGE5YjA4NWJmYjFlNzZjNmM3MmY3NCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.CmRVm6m1brxxhHRrJ7X0xLDS6XygSwN7AuZb0YghzaM'
  }
};

  const handleWheel = (event) => {
    event.preventDefault();
    cardsRef.current.scrollLeft += event.deltaY;
  }

  useEffect(() => {

  fetch(`https://api.themoviedb.org/3/movie/${category ? category : "now_playing"}?language=en-US&page=1`, options)
  .then(res => res.json())
  .then(res => setApiData(res.results))
  .catch(err => console.error(err));

    cardsRef.current.addEventListener("wheel", handleWheel);
  }, [])

  return (
    <div className="title-cards">
      <h2>{title ? title : "Popular on Netflix"}</h2>
      <div className="card-list" ref={cardsRef}>
        {apiData.map((card, index) => {
          return <Link to={`/player/${card.id}`} className="card" key={index}>
            <img src={`https://image.tmdb.org/t/p/w500`+card.backdrop_path} alt="" />
            <p>{card.original_title}</p>
          </Link>
          })}
      </div>
    </div>
  )
};

export default TitleCards;