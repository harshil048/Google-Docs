import { useContext } from "react";
import useAuth from "../../../hooks/use-auth";
import { DocumentContext } from "../../../contexts/document-context";
import useRandomBackground from "../../../hooks/use-random-bg";

const CurrentUsers = () => {
  const { email } = useAuth();
  const { currentUsers } = useContext(DocumentContext);

  const { backgroundColor } = useRandomBackground();
  return (
    <>
      {Array.from(currentUsers)
        .filter((currentUser) => currentUser !== email)
        .map((currentUser) => {
          return (
            <div
              key={currentUser}
              className={`${backgroundColor} w-8 h-8 text-white font-semibold flex justify-center items-center rounded-full flex-shrink-0 uppercase ring-2`}
            >
              {currentUser[0]}
            </div>
          );
        })}
    </>
  );
};

export default CurrentUsers;
