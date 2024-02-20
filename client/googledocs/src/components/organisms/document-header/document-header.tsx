import { MutableRefObject } from "react";
import DocumentMenubar from "../../molecules/document-menubar";

interface DocumentHeaderProps {
  documentHeaderRef: MutableRefObject<null | HTMLDivElement>;
}

const DocumentHeader = ({ documentHeaderRef }: DocumentHeaderProps) => {
  return (
    <div
      ref={documentHeaderRef}
      className="border-b w-full bg-white flex flex-col"
    >
      <DocumentMenubar />
    </div>
  );
};

export default DocumentHeader;
