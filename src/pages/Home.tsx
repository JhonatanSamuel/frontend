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
          One Piece é um anime e mangá que conta a história de Monkey D. Luffy, um jovem pirata que sonha em encontrar o tesouro lendário chamado “One Piece” e se tornar o Rei dos Piratas. Durante sua jornada, ele reúne uma tripulação poderosa, enfrenta inimigos perigosos e descobre mistérios do mundo.
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
