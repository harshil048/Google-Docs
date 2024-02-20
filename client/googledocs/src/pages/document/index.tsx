import { useParams } from "react-router-dom";
import useWindowSize from "../../hooks/use-window-size";
import useDocument from "../../hooks/use-document";
import DocumentHeader from "../../components/organisms/document-header";
import { useRef } from "react";

const Document = () => {
  const { heightStr, widthStr } = useWindowSize();
  const { id: documentId } = useParams();
  const documentHeaderRef = useRef<HTMLDivElement | null>(null);
  const { loading, document } = useDocument(parseInt(documentId as string));

  return (
    <div
      style={{ height: heightStr }}
      className="w-full h-full bg-gray flex flex-col"
    >
      {loading ? (
        <>Loadong...</>
      ) : (
        <>
          <DocumentHeader documentHeaderRef={documentHeaderRef} />
        </>
      )}
    </div>
  );
};
export default Document;
