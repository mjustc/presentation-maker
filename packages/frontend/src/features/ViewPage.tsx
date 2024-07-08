import React from "react";

import componentMap from "./components/ComponentMap";
import { IPage } from "../types/page";

interface PageContainerProps {
  page: IPage;
}

const ViewPage: React.FC<PageContainerProps> = (props: PageContainerProps) => {
  const { page } = props;
  return (
    <div key={page.id} className="page-container">
      <div>
        {page.content.map((content, contentIndex) => {
          const Component = componentMap[content.type];
          return (
            <div key={contentIndex}>
              <Component onSelect={() => {}} {...content} />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ViewPage;
