import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getPresentationById } from "../service/presentation";
import ViewPage from "../features/ViewPage";
import "./styles.css";
import { IPresentation } from "../types/presentation";

const ViewPresentation: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [presentation, setPresentation] = useState<IPresentation>();

  useEffect(() => {
    if (id) {
      loadPresentation(id);
    }
  }, [id]);

  const loadPresentation = async (id: string) => {
    try {
      const response = await getPresentationById(id);
      if (response) {
        setPresentation(response);
      }
    } catch (error) {
      console.error("Error loading presentation:", error);
    }
  };

  if (!presentation) {
    return <div>Loading...</div>;
  }

  return (
    <div className="wrapper-container">
      <div className="header">
        <h2>{presentation.title}</h2>
        <b>Number of pages:</b> {presentation.pages.length}
        {/* <b>Created At: </b> {presentation.createdAt.getTime()} */}
      </div>
      <div className="container">
        {presentation.pages.map((page, index) => (
          <ViewPage key={index} page={page} />
        ))}
      </div>
    </div>
  );
};

export default ViewPresentation;
