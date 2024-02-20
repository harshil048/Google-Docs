import CreateDocumentButton from "../../components/atoms/create-document-button";
import Spinner from "../../components/atoms/spinner/spinner";
import DocumentList from "../../components/molecules/document-list";
import DocumentCreateHeader from "../../components/organisms/document-create-header";
import useAuth from "../../hooks/use-auth";
import useDocuments from "../../hooks/use-documents";
import useWindowSize from "../../hooks/use-window-size";

const Create = () => {
  const { heightStr, widthStr } = useWindowSize();
  const { userId } = useAuth();

  const { documents, loading, setDocuments } = useDocuments();
  const recentDocuments =
    documents === undefined
      ? []
      : documents.filter((document) => document.userId === userId);

  const sharedDocuments =
    documents === undefined
      ? []
      : documents.filter((document) => document.userId !== userId);

  return (
    <div style={{ height: heightStr }}>
      <DocumentCreateHeader />
      <CreateDocumentButton />
      {loading ? (
        <Spinner size="lg"></Spinner>
      ) : (
        <>
          <DocumentList
            title="Recent Documents"
            documents={recentDocuments}
            setDocuments={setDocuments}
          />
          <DocumentList
            title="Shared Documents"
            documents={sharedDocuments}
            setDocuments={setDocuments}
          />
        </>
      )}
    </div>
  );
};

export default Create;
