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
import DocumentUserService from "../../../services/document-user-service";
import DocumentUser from "../../../types/interfaces/document-user";
import DocumentInterface from "../../../types/interfaces/document";
import {
  LinkIcon,
  LockClosedIcon,
  UserAddIcon,
} from "@heroicons/react/outline";
import SharedUsers from "../shared-users/shared-users";
import Spinner from "../../atoms/spinner/spinner";
import Model from "../../atoms/model/model";

const ShareDocumentModel = () => {
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

      success(`Successfully shared document with ${email}`);

      setDocument({
        ...document,
        users: [...document.users, documentUser],
      } as DocumentInterface);

      setEmail("");
    } catch (err) {
      error(`Unable to share this document with ${email}. Please try again`);
    } finally {
      setLoading(false);
    }
  };

  const handleShareEmailInputChange = (event: ChangeEvent) => {
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

  const handleOnKeyPress = async (event: KeyboardEvent) => {
    if (event.key === "Enter") await shareDocument();
  };

  const updateIsPublic = (isPublic: boolean) => {
    const updatedDocument = {
      ...document,
      isPublic: isPublic,
    } as DocumentInterface;

    saveDocument(updatedDocument);
  };

  const handleShareBtnClick = async () => {
    await shareDocument();
  };

  const alreadyShared =
    document === null ||
    (document !== null &&
      document.users.filter((documentUser) => documentUser.user.email === email)
        .length > 0);

  const publicAccessBtn = (
    <div className="space-y-1">
      <button
        disabled={saving}
        onClick={() => updateIsPublic(false)}
        className="font-semibold text-blue-600 p-2 hover:bg-blue-50 rounded-md"
      >
        {saving && <Spinner size="sm" />}
        <span className={`${saving && "opacity-0"} text-base font-medium`}>
          Change to only shared users
        </span>
      </button>
      <p className="mx-2">
        <b className="font-semibold">Public - </b>
        <span className="text-gray-600">Anyone with this link can view</span>
      </p>
    </div>
  );

  const restrictedAccessBtn = (
    <div className="space-y-1">
      <button
        disabled={saving}
        onClick={() => updateIsPublic(true)}
        className="font-semibold text-blue-600 p-2 hover:bg-blue-100 rounded-3xl my-3"
      >
        {saving && <Spinner size="sm" />}
        <span className={`${saving && "opacity-0"} tracking-wide px-3`}>
          Change to anyone with the link
        </span>
      </button>
      <p className="mx-2">
        <b className="font-semibold">Restricted - </b>
        <span className="text-gray-600">
          {" "}
          Only people added can open with this link
        </span>
      </p>
    </div>
  );

  return (
    <Model
      button={
        <button className="flex items-center justify-center px-4 py-2 bg-blue-600 text-white rounded-3xl hover:bg-blue-700 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50">
          Share Document
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
                onChange={handleShareEmailInputChange}
                placeholder="Enter email"
                className="border-b border-blue-500 rounded-t-md p-4 w-full bg-gray-100 font-medium"
              />
              <SharedUsers
                documentUsers={document.users}
                setDocument={setDocument}
              />
              <div className="w-full flex justify-end ">
                <button
                  onClick={handleShareBtnClick}
                  disabled={
                    loading ||
                    email === null ||
                    !validator.isEmail(email) ||
                    alreadyShared
                  }
                  className={`${
                    email === null || !validator.isEmail(email) || alreadyShared
                      ? "btn-disabled"
                      : "btn-primary"
                  } px-7 py-2 bg-blue-600 rounded-3xl hover:bg-blue-500 hover:shadow-lg`}
                >
                  {loading && <Spinner size="sm" />}
                  <span
                    className={`${
                      loading && "opacity-0"
                    } text-white text-[16px]`}
                  >
                    Share
                  </span>
                </button>
              </div>
            </div>
            <div className="rounded-md bg-white shadow-xl p-4 space-y-4 flex flex-col">
              <div className="m-2 flex items-center space-x-2">
                <div className="w-8 h-8 bg-gray-400 flex justify-center items-center rounded-full text-white">
                  <LinkIcon className="w-5 h-5 relative" />
                </div>
                <h1 className="text-xl font-medium">Get Link</h1>
              </div>
              <div>
                <div className="flex justify-between items-center">
                  <div className="space-y-1">
                    {document.isPublic ? publicAccessBtn : restrictedAccessBtn}
                  </div>
                  <input
                    ref={copyLinkInputRef}
                    type="text"
                    className="d-none opacity-0 cursor-default"
                  />
                  <button
                    onClick={handleCopyLinkBtnClick}
                    className="flex justify-center tracking-wide text-[16px] text-blue-600 border border-black px-6 py-2 hover:bg-blue-50 rounded-3xl space-x-2"
                  >
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      focusable="false"
                      className="fill-current text-blue-600"
                    >
                      <path d="M17 7h-4v2h4c1.65 0 3 1.35 3 3s-1.35 3-3 3h-4v2h4c2.76 0 5-2.24 5-5s-2.24-5-5-5zm-6 8H7c-1.65 0-3-1.35-3-3s1.35-3 3-3h4V7H7c-2.76 0-5 2.24-5 5s2.24 5 5 5h4v-2zm-3-4h8v2H8z"></path>
                    </svg>
                    <span className="whitespace-nowrap my-auto">Copy link</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )
      }
    />
  );
};

export default ShareDocumentModel;
