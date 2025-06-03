import React from "react";
import { Link } from "react-router-dom";
import "./Home.scss";

const Home = () => {
  return (
    <div className="home-container">
      <div className="background-image" />
      <div className="overlay-content">
        <h1>One Piece</h1>
        <p>
          Em One Piece, conhecemos as aventuras de Monkey D. Luffy e sua equipe de piratas, 
          navegando por oceanos fantásticos e ilhas exóticas em busca do maior tesouro já deixado 
          pelo lendário Gold Roger. Luffy acredita na lenda do tesouro e sai em uma busca
           extraordinária na esperança de proclamar para si o título de Rei dos Piratas. 
        </p>
       <div className="button-wrapper">
        <Link to="/mangas" className="manga-button">
          
          Ver Mangás
        </Link>
</div>


      </div>
    </div>
  );
};

export default Home;
