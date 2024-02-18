import DocumentCreateHeader from "../../components/organisms/toast-manager/document-create-header";
import useAuth from "../../hooks/use-auth";
import useDocuments from "../../hooks/use-documents";
import useWindowSize from "../../hooks/use-window-size";

const Create = () => {
  const { heightStr, widthStr } = useWindowSize();
  const { userId } = useAuth();

  const { documents, loading, setDocuments } = useDocuments();
  const recentDocuments =
    documents === null ? [] : documents.filter((doc) => doc.userId === userId);
  const sharedDocuments =
    documents === null ? [] : documents.filter((doc) => doc.userId !== userId);

  return (
    <div style={{ height: heightStr }}>
      <DocumentCreateHeader />
    </div>
  );
};

export default Create;
