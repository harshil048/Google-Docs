import { useContext, useEffect, useState } from "react";
import useAuth from "./use-auth";
import { ToastContext } from "../contexts/toast-context";
import DocumentInterface from "../types/interfaces/document";
import DocumentService from "../services/document-service";

const useDocuments = () => {
  const { accessToken } = useAuth();
  const { error } = useContext(ToastContext);
  const [documents, setDocuments] = useState<Array<DocumentInterface>>([]);
  const [loading, setLoading] = useState(false);

  const loadDocuments = async (accessToken: string) => {
    setLoading(true);
    try {
      const response = await DocumentService.list(accessToken);
      setDocuments(response.data as Array<DocumentInterface>);
    } catch (err) {
      error("Unable to load documents");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (accessToken === null) return;
    loadDocuments(accessToken);
  }, [accessToken]);

  return {
    documents,
    loading,
    setDocuments,
    setLoading,
  };
};

export default useDocuments;
