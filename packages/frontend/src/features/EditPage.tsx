import React, { useCallback, useEffect } from "react";

import componentMap from "./components/ComponentMap";
import { IComponent } from "../types/component";
import { IPage } from "../types/page";

interface PageContainerProps {
  page: IPage;
  onSelectedComponent?: (component: IComponent) => void;
}

const PageContainer: React.FC<PageContainerProps> = (
  props: PageContainerProps
) => {
  const { page } = props;
  const { onSelectedComponent } = props;

  const handleSelectComponent = (id: string) => {
    const selectedComponent = page.content.find((content) => content.id === id);
    if (selectedComponent) {
      if (onSelectedComponent) {
        onSelectedComponent(selectedComponent);
      }
    }
  };

  return (
    <div key={page.id} className="page-container">
      <div>
        {page.content.map((content, contentIndex) => {
          const Component = componentMap[content.type];
          return (
            <div key={contentIndex}>
              <Component
                onSelect={() => handleSelectComponent(content.id)}
                {...content}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PageContainer;
