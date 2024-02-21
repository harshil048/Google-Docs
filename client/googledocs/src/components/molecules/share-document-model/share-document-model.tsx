import {
  ChangeEvent,
  KeyboardEvent,
  useContext,
  useRef,
  useState,
} from "react";
import { DocumentContext } from "../../../contexts/document-context";
import useAuth from "../../../hooks/use-auth";
import { ToastContext } from "../../../contexts/toast-context";
import validator from "validator";
import PermissionEnum from "../../../types/enums/permission-enum";
import DocumentUser from "../../../types/interfaces/document-user";
import DocumentUserService from "../../../services/document-user-service";
import DocumentInterface from "../../../types/interfaces/document";
import Model from "../../atoms/model/model";
import { UserAddIcon } from "@heroicons/react/outline";

const ShareDocumentModal = () => {
  const { document, saving, saveDocument, setDocument } =
    useContext(DocumentContext);
  const copyLinkInputRef = useRef<null | HTMLInputElement>(null);
  const [email, setEmail] = useState<null | string>(null);
  const { accessToken } = useAuth();
  const { success, error } = useContext(ToastContext);
  const [loading, setLoading] = useState(false);

  const shareDocument = async () => {
    if (
      email === null ||
      !validator.isEmail(email) ||
      accessToken === null ||
      document === null
    )
      return;

    const payload = {
      documentId: document.id,
      email: email,
      permission: PermissionEnum.EDIT,
    };

    setLoading(true);
    try {
      const response = await DocumentUserService.create(accessToken, payload);
      const documentUser = response.data as DocumentUser;
      documentUser.user = { email };

      success(`Document shared successfully! with ${email}`);
      setDocument({
        ...document,
        users: [...document.users, documentUser],
      } as DocumentInterface);
      setEmail("");
    } catch (err) {
      error("Unable to share document. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleShareEmailInputChanged = (event: ChangeEvent) => {
    setEmail((event.target as HTMLInputElement).value);
  };

  const handleCopyLinkBtnClick = () => {
    if (copyLinkInputRef === null || copyLinkInputRef.current === null) return;

    const url = window.location.href;
    copyLinkInputRef.current.value = url;
    copyLinkInputRef.current.focus();
    copyLinkInputRef.current.select();
    window.document.execCommand("copy");
  };

  const handleOnKeyPress = async (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Enter") {
      await shareDocument();
    }
  };

  const updateIsPublic = (isPublic: boolean) => {
    const updatedDocument = {
      ...document,
      isPublic: isPublic,
    } as DocumentInterface;

    saveDocument(updatedDocument);
  };

  return (
    <Model
      button={
        <button className="btn-primary">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
              clipRule="evenodd"
            />
          </svg>
          <span>Share</span>
        </button>
      }
      content={
        document === null ? (
          <></>
        ) : (
          <div
            onKeyPress={(event) => handleOnKeyPress(event)}
            className="space-y-4 text-sm"
          >
            <div className="rounded-md bg-white shadow-xl p-4 space-y-4">
              <div className="flex items-center space-x-2 m-2">
                <div className="w-8 h-8 bg-blue-500 flex justify-center items-center rounded-full text-white">
                  <UserAddIcon className="w-5 h-5 relative" />
                </div>
                <h1 className="text-xl font-medium">Share with people</h1>
              </div>
              <input
                type="text"
                name=""
                id=""
                value={email !== null ? email : ""}
                onChange={handleShareEmailInputChanged}
                placeholder="Enter email"
                className="border-b border-blue-500 rounded-t-md p-4 w-full bg-gray-100 font-medium"
              />
              {/* <SharedUsers
                documentUsers={document.users}
                setDocument={setDocument}
              /> */}
            </div>
          </div>
        )
      }
    />
  );
};
