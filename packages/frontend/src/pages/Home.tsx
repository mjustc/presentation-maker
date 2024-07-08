// Home.jsx

import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  createPresentation,
  deletePresentation,
  fetchPresentations,
} from "../service/presentation";
import "./styles.css";
import { IPresentationSummary } from "../types/presentation";

const Home: React.FC = () => {
  const [presentations, setPresentations] = useState<IPresentationSummary[]>(
    []
  );

  useEffect(() => {
    loadPresentations();
  }, []);

  const loadPresentations = async () => {
    try {
      const presentations = await fetchPresentations();
      if (presentations) {
        console.log(presentations);
        setPresentations(presentations);
      }
    } catch (error) {
      console.error("Error loading presentations:", error);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deletePresentation(id);
      const updatedPresentations = presentations.filter(
        (presentation) => presentation.title !== id
      );
      setPresentations(updatedPresentations);
    } catch (error) {
      console.error("Error deleting presentation:", error);
    }
  };

  const handleCreatePresentation = async () => {
    try {
      const title = "Sample-Presentation-" + new Date().getTime();
      const newPresentation = await createPresentation(title);

      if (newPresentation) {
        const updatedPresentations = [...presentations, newPresentation];
        setPresentations(updatedPresentations);
      }
    } catch (error) {
      console.error("Error deleting presentation:", error);
    }
  };

  return (
    <div className="wrapper-container">
      <div className="header">
        <h2 className="title">Presentations</h2>
        <div>
          <p>
            Here you can find the <strong>List</strong> of presentations, along
            with the options: <strong>View, Edit, Remove </strong> and
            <strong> Create</strong>
          </p>
          <p>Check out the sample presentations to see what you can do</p>
        </div>
      </div>

      <div className="container">
        <button
          className="create-button"
          onClick={() => handleCreatePresentation()}
        >
          Create new presentation
        </button>
        <div className="presentation-list">
          {presentations.map((presentation) => (
            <div key={presentation.title} className="presentation-item">
              <span>{presentation.title}</span>
              <div className="presentation-actions">
                <Link className="button" to={`/view/${presentation.title}`}>
                  View
                </Link>
                <Link className="button" to={`/edit/${presentation.title}`}>
                  Edit
                </Link>
                <button
                  className="button"
                  onClick={() => handleDelete(presentation.title)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
