import React, { useCallback, useEffect, useState } from "react";
import PageContainer from "../features/EditPage";
import ComponentPanel from "../features/editor/AddPanel";
import "./styles.css";
import { useParams } from "react-router-dom";
import {
  getPresentationById,
  updatePresentation,
} from "../service/presentation";
import EditorPanel from "../features/editor/EditorPanel";
import { IComponent } from "../types/component";
import { IPresentation } from "../types/presentation";
import { IPage, PageOrientation } from "../types/page";

const EditPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [presentation, setPresentation] = useState<IPresentation>();
  const [selectedPage, setSelectedPage] = useState(0);
  const [selectedComponent, setSelectedComponent] = useState<IComponent>();
  const [undoStack, setUndoStack] = useState<IPresentation[]>([]);
  const [redoStack, setRedoStack] = useState<IPresentation[]>([]);

  const showLoading = !presentation || !id;

  const undo = () => {
    if (undoStack.length > 0) {
      const previousState = undoStack[undoStack.length - 1];
      setUndoStack(undoStack.slice(0, -1));
      setRedoStack([presentation as IPresentation, ...redoStack]);
      setPresentation(previousState);
      updateSelectedComponent(previousState.pages[selectedPage].content);
    }
  };

  const redo = () => {
    if (redoStack.length > 0) {
      const nextState = redoStack[0];
      setRedoStack(redoStack.slice(1));
      setUndoStack([...undoStack, presentation as IPresentation]);
      setPresentation(nextState);
      updateSelectedComponent(nextState.pages[selectedPage].content);
    }
  };

  const updateSelectedComponent = (content: IComponent[]) => {
    if (selectedComponent) {
      const updatedComponent = content.find(
        (component) => component.id === selectedComponent.id
      );
      setSelectedComponent(updatedComponent || undefined);
    }
  };

  useEffect(() => {
    if (id) {
      loadPresentation(id);
    }
  }, [id]);

  const loadPresentation = async (id: string) => {
    try {
      const response = await getPresentationById(id);
      console.log("response...", response);
      if (response) {
        console.log(response);
        setPresentation(response);
      }
    } catch (error) {
      console.error("Error loading presentation:", error);
    }
  };

  const addComponent = (newComponent: IComponent) => {
    logChange();

    setPresentation((prevPresentation: IPresentation | undefined) => {
      if (!prevPresentation) {
        return prevPresentation;
      }

      const updatedPages = prevPresentation.pages.map((page, index) => {
        if (index === selectedPage) {
          return {
            ...page,
            content: [...page.content, newComponent],
          };
        }
        return page;
      });

      return {
        ...prevPresentation,
        pages: updatedPages,
      };
    });
  };

  const addPage = () => {
    if (!presentation) {
      return;
    }
    if (presentation.pages.length >= 10) {
      alert("Maximum number of pages reached");
    }

    logChange();
    const newPage: IPage = {
      id: `page-${presentation.pages.length + 1}`,
      content: [] as IComponent[],
      orientation: PageOrientation.HORIZONTAL,
    };

    setPresentation((prevPresentation: any) => ({
      ...prevPresentation,
      pages: [...prevPresentation.pages, newPage],
    }));
  };

  const removePage = (idx: number) => {
    logChange();

    if (!presentation) {
      return;
    }
    if (presentation.pages.length > 1) {
      setPresentation((prevPresentation: any) => ({
        ...prevPresentation,
        pages: [
          ...prevPresentation.pages.slice(0, idx),
          ...prevPresentation.pages.slice(idx + 1),
        ],
      }));
    }
  };

  const selectPage = (idx: number) => {
    setSelectedPage(idx);
  };

  const handleSelectComponent = (selectedComponent: IComponent) => {
    setSelectedComponent(selectedComponent);
  };

  const handlePropertyChange = (property: string, value: any) => {
    logChange();

    if (!presentation) {
      return;
    }
    if (selectedComponent) {
      const updatedContent = {
        ...selectedComponent,
        [property]: value,
      };

      const contentIndex = presentation.pages[selectedPage].content.findIndex(
        (content) => content.id === selectedComponent.id
      );

      if (contentIndex !== -1) {
        const updatedContentArray = [
          ...presentation.pages[selectedPage].content,
        ];
        updatedContentArray[contentIndex] = updatedContent;

        setPresentation({
          ...presentation,
          pages: [
            ...presentation.pages.slice(0, selectedPage),
            {
              ...presentation.pages[selectedPage],
              content: updatedContentArray,
            },
            ...presentation.pages.slice(selectedPage + 1),
          ],
        });

        setSelectedComponent(updatedContent);
      }
    }
  };

  const handleRemoveComponent = (componentId: string) => {
    logChange();

    if (!presentation) {
      return;
    }
    if (selectedComponent) {
      const contentIndex = presentation.pages[selectedPage].content.findIndex(
        (content) => content.id === componentId
      );

      if (contentIndex !== -1) {
        const updatedContentArray = presentation.pages[
          selectedPage
        ].content.filter((content) => content.id !== componentId);

        setPresentation({
          ...presentation,
          pages: [
            ...presentation.pages.slice(0, selectedPage),
            {
              ...presentation.pages[selectedPage],
              content: updatedContentArray,
            },
            ...presentation.pages.slice(selectedPage + 1),
          ],
        });

        if (selectedComponent.id === componentId) {
          setSelectedComponent(undefined);
        }
      }
    }
  };

  const logChange = () => {
    setUndoStack([...undoStack, presentation as IPresentation]);
    setRedoStack([]);
  };

  const handleSaveChanges = () => {
    if (!id || !presentation) {
      return;
    }
    updatePresentation(id, presentation);
  };

  if (showLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div className="wrapper-container">
        <div className="header">
          <h2 className="title">Edit Presentation</h2>
          <div>Here you can find the options to edit the presentation</div>
          <h2>Title: {presentation.title}</h2>
          <b>Number of pages:</b> {presentation.pages.length}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginTop: "1em",
            }}
          >
            <div
              className="button-container"
              style={{ justifyContent: "start" }}
            >
              <button className="button" onClick={handleSaveChanges}>
                Save Changes
              </button>
            </div>
            <div className="button-container" style={{ justifyContent: "end" }}>
              <button
                className="button"
                onClick={undo}
                disabled={undoStack.length === 0}
              >
                Undo
              </button>
              <button
                className="button"
                onClick={redo}
                disabled={redoStack.length === 0}
              >
                Redo
              </button>
            </div>
          </div>
        </div>
        <div className="edit-panel-container">
          <div className="left-container">
            <ComponentPanel addComponent={addComponent} />
            <EditorPanel
              selectedComponent={selectedComponent}
              onPropertyChange={handlePropertyChange}
              onRemoveComponent={handleRemoveComponent}
            />
          </div>
          <div className="middle-container">
            <PageContainer
              page={presentation.pages[selectedPage]}
              onSelectedComponent={handleSelectComponent}
            />
          </div>
          <div className="right-container">
            <button className="button" onClick={addPage}>
              Add Page
            </button>
            <button className="button" onClick={() => removePage(selectedPage)}>
              Remove
            </button>
            <h3>Select Page</h3>
            {presentation.pages.map((_, idx) => (
              <div key={idx} onClick={() => selectPage(idx)} className="button">
                page {idx + 1}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditPage;
