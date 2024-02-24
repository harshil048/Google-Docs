import { MutableRefObject } from "react";
import DocumentMenubar from "../../molecules/document-menubar";
import EditorToolbar from "../../molecules/editor-toolbar";

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
      <EditorToolbar />
    </div>
  );
};

export default DocumentHeader;
