import React, { useEffect, useRef, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { Chapter } from "../types/Chapter";
import "./ChapterReader.scss";

const ChapterReader = () => {
  const { id } = useParams();
  const currentId = parseInt(id || "0");

  const [chapter, setChapter] = useState<Chapter | null>(null);
  const [allChapters, setAllChapters] = useState<Chapter[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const imageRefs = useRef<(HTMLImageElement | null)[]>([]);

  const navigate = useNavigate();

  const currentIndex = allChapters.findIndex((c) => c.chapterId === currentId);
  const prevChapter = allChapters[currentIndex + 1];
  const nextChapter = allChapters[currentIndex - 1];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [chapterRes, allChaptersRes] = await Promise.all([
          axios.get(`https://one-piece-api-h20v.onrender.com/api/chapters/${currentId}`),
          axios.get("https://one-piece-api-h20v.onrender.com/api/chapters")
        ]);
        setChapter(chapterRes.data);
        setAllChapters(allChaptersRes.data);

        // Scroll para o topo ao trocar de capítulo
        setTimeout(() => {
          window.scrollTo({ top: 0, behavior: "auto" });
        }, 100);
      } catch (error) {
        console.error("Erro ao carregar capítulo:", error);
      }
    };

    fetchData();
  }, [currentId]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft" && prevChapter) {
        navigate(`/chapter/${prevChapter.chapterId}`);
      } else if (e.key === "ArrowRight" && nextChapter) {
        navigate(`/chapter/${nextChapter.chapterId}`);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [prevChapter, nextChapter, navigate]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = imageRefs.current.findIndex((img) => img === entry.target);
            if (index !== -1) {
              setCurrentPage(index + 1);
            }
          }
        });
      },
      { threshold: 0.5 }
    );

    imageRefs.current.forEach((img) => {
      if (img) observer.observe(img);
    });

    return () => {
      imageRefs.current.forEach((img) => {
        if (img) observer.unobserve(img);
      });
    };
  }, [chapter]);

  return (
    <div className="chapter-reader">
      <div className="background-image" />
      <div className="overlay-content">
        <div className="back-to-list">
          <Link to="/mangas" className="nav-button">
            ← Voltar para lista de mangás
          </Link>
        </div>

        <div className="navigation-buttons">
          {prevChapter ? (
            <Link to={`/chapter/${prevChapter.chapterId}`} className="nav-button">
              ← Capítulo Anterior
            </Link>
          ) : <span />}
          {nextChapter ? (
            <Link to={`/chapter/${nextChapter.chapterId}`} className="nav-button">
              Próximo Capítulo →
            </Link>
          ) : null}
        </div>

        {chapter && (
          <p className="page-indicator">
            Página {currentPage} de {chapter.pages.length}
          </p>
        )}

        {chapter?.pages.map((url, index) => (
          <img
            key={index}
            src={url}
            alt={`Página ${index + 1}`}
            className="chapter-page"
            ref={(el) => {
              imageRefs.current[index] = el;
            }}
            draggable={false}
            onContextMenu={(e) => e.preventDefault()}
            onMouseDown={(e) => e.preventDefault()}
          />
        ))}

        <div className="back-to-home">
          <Link to="/" className="nav-button">
            ← Voltar para o início
          </Link>
        </div>

        <div className="navigation-buttons">
          {prevChapter ? (
            <Link to={`/chapter/${prevChapter.chapterId}`} className="nav-button">
              ← Capítulo Anterior
            </Link>
          ) : <span />}
          {nextChapter ? (
            <Link to={`/chapter/${nextChapter.chapterId}`} className="nav-button">
              Próximo Capítulo →
            </Link>
          ) : null}
        </div>

        <button
          className="scroll-to-top"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        >
          ↑
        </button>
      </div>
    </div>
  );
};

export default ChapterReader;
