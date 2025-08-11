import React, { useRef, useState } from "react";

const DeleteButton = () => {
  const btnRef = useRef(null);
  const [deleted, setDeleted] = useState(false);

  const vaporize = () => {
    if (deleted) return;
    const button = btnRef.current;
    const text = button.querySelector(".btn-text");
    const rect = text.getBoundingClientRect();
    const particles = [];
    for (let i = 0; i < 500; i++) {
      const span = document.createElement("span");
      span.className = "delete-particle";
      span.innerText = "•";
      span.style.left = `${rect.left + Math.random() * rect.width}px`;
      span.style.top = `${rect.top + Math.random() * rect.height}px`;

      
      const angle = Math.random() * 2 * Math.PI;
      const distance = Math.random() * 100;
      const x = Math.cos(angle) * distance;
      const y = Math.sin(angle) * distance;
      span.style.setProperty("--x", `${x}px`);
      span.style.setProperty("--y", `${y}px`);
      span.style.setProperty("--delay", `${Math.random() * 0.2}s`);
      document.body.appendChild(span);
      particles.push(span);
    }
    text.style.opacity = "0";
    button.style.transform = "scale(0.9)";
    button.style.opacity = "0";
    setDeleted(true);
    setTimeout(() => {
      particles.forEach((p) => p.remove());
      button.style.display = "none";
    }, 1000);
  };

  return (
    <>
      <button className="delete-button" ref={btnRef} onClick={vaporize}>
        <span className="btn-text">Delete</span>
      </button>

      <style jsx>{`
        .delete-button {
          padding: 10px 20px;
          background: #ff0000ff;
          color: white;
          font-weight: bold;
          border: none;
          border-radius: 8px;
          cursor: pointer;
          transition: all 0.3s ease;
          position: relative;
          z-index: 1;
        }
        .delete-button:hover {
          transform: scale(1.01);
          border: 1px solid white;
        }
        .btn-text {
          transition: opacity 0.3s ease;
          position: relative;
          z-index: 2;
        }
        .delete-particle {
          position: fixed;
          color: #ff0000ff;
          font-size: 16px;
          animation: disintegrate 1s forwards;
          pointer-events: none;
          opacity: 1;
          z-index: 999;
        }
        @keyframes disintegrate {
          to {
            transform: translate(var(--x), var(--y)) scale(0.5);
            opacity: 0;
          }
        }
      `}</style>
    </>
  );
};

export default DeleteButton;