import { ChangeEvent, FocusEvent, useContext } from "react";
import useAuth from "../../../hooks/use-auth";
import { DocumentContext } from "../../../contexts/document-context";
import DocumentInterface from "../../../types/interfaces/document";
import DocumentService from "../../../services/document-service";
import Logo from "../../atoms/logo/logo";
import UserDropDown from "../../atoms/user-dropdown/user-dropdown";
import useRandomBackground from "../../../hooks/use-random-bg";
import ShareDocumentModel from "../share-document-model";
import CurrentUsers from "../current-users/current-users";

const DocumentMenuBar = () => {
  const { accessToken, userId } = useAuth();

  const {
    document,
    saving,
    setDocumentTitle,
    setDocument,
    setSaving,
    setErrors,
  } = useContext(DocumentContext);

  const handleTitleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const title = event.target.value;
    setDocumentTitle(title);
  };

  const handleTitleInputBlur = async (event: FocusEvent<HTMLInputElement>) => {
    if (accessToken === null || document === null) return;

    setSaving(true);

    const title = (event.target as HTMLInputElement).value;
    const updatedDocument = {
      ...document,
      title,
    } as DocumentInterface;
    console.log(saving);
    console.log(document.id);
    console.log(updatedDocument);
    try {
      await DocumentService.update(accessToken, updatedDocument);
    } catch (error) {
      setErrors(["There was an error saving the document. Please try again."]);
    } finally {
      setDocument(updatedDocument);
      setSaving(false);
    }
  };

  return (
    <div className="w-full flex justify-between items-center px-3 pb-1 border-b">
      <div className="w-full flex justify-start items-center overflow-x-hidden md:overflow-visible">
        <Logo />
        <div className="flex flex-col">
          <input
            maxLength={25}
            type="text"
            onBlur={(event) => handleTitleInputBlur(event)}
            onChange={(event) => handleTitleInputChange(event)}
            value={document?.title ? document?.title : ""}
            className="font-medium text-xl px-2 pt-2"
            name=""
            id=""
            placeholder="Untitled document"
          />
          <div className="flex items-center">
            <button className="text-md whitespace-nowrap px-2 py-1 font-medium hover:bg-gray-100 rounded-md">
              File
            </button>
            <button className="text-md whitespace-nowrap px-2 py-1 font-medium hover:bg-gray-100 rounded-md">
              Edit
            </button>
            <button className="text-md whitespace-nowrap px-2 py-1 font-medium hover:bg-gray-100 rounded-md">
              View
            </button>
            <button className="text-md whitespace-nowrap px-2 py-1 font-medium hover:bg-gray-100 rounded-md">
              Insert
            </button>
            <button className="text-md whitespace-nowrap px-2 py-1 font-medium hover:bg-gray-100 rounded-md">
              Format
            </button>
            <button className="text-md whitespace-nowrap px-2 py-1 font-medium hover:bg-gray-100 rounded-md">
              Tools
            </button>
            <button className="text-md whitespace-nowrap px-2 py-1 font-medium hover:bg-gray-100 rounded-md">
              Add-ons
            </button>
            <button className="text-md whitespace-nowrap px-2 py-1 font-medium hover:bg-gray-100 rounded-md">
              Help
            </button>
            {saving && <p className="text-sm text-gray-500 px-2">Saving...</p>}
          </div>
        </div>
      </div>
      <div className="flex items-center flex-shrink-0 pl-3 gap-x-4">
        {document !== null && document.userId === userId && (
          <ShareDocumentModel />
        )}
        <div className="flex items-center gap-x-2">
          <CurrentUsers />
          <UserDropDown />
        </div>
      </div>
    </div>
  );
};

export default DocumentMenuBar;
