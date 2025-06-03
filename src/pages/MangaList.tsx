import React, { useEffect, useState } from "react";
import { getChapters } from "../services/api";
import { Chapter } from "../types/Chapter";
import { Link } from "react-router-dom";
import "./MangaList.scss";

const MangaList = () => {
  const [chapters, setChapters] = useState<Chapter[]>([]);

  useEffect(() => {
    const fetchChapters = async () => {
      const data = await getChapters();
      setChapters(data);
    };

    fetchChapters();
  }, []);

  return (
    <div className="manga-list-container">
      <div className="background-image" />
      <div className="overlay-content">
        <h2>Capítulos de One Piece</h2>
        <div className="manga-list-actions">
          <Link to="/" className="nav-button">← Voltar para Início</Link>
        </div>

        <ul className="chapter-list">
          {chapters.map((chapter) => (
            <li key={chapter.chapterId}>
              <Link to={`/chapter/${chapter.chapterId}`} className="chapter-card">
                {chapter.title}
              </Link>
            </li>
          ))}
        </ul>
         <div className="manga-list-actions">
          <Link to="/" className="nav-button">← Voltar para Início</Link>
        </div>
      </div>
    </div>
  );
};

export default MangaList;
