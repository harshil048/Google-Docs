import { useContext, useRef, useState } from "react";
import { ToastContext } from "../../../contexts/toast-context";
import useAuth from "../../../hooks/use-auth";
import { useNavigate } from "react-router-dom";
import useRandomBackground from "../../../hooks/use-random-bg";
import { CSSTransition } from "react-transition-group";

const UserDropdown = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const { backgroundColor } = useRandomBackground();
  const dropdownRef = useRef(null);
  const { success } = useContext(ToastContext);
  const { email, logout } = useAuth();
  const navigate = useNavigate();

  const logoutUser = async () => {
    await logout();
    success("Logged out successfully!");
    navigate("/login");
  };

  return (
    // <div
    //   className="flex flex-col justify-center items-center"
    //   onBlur={() => setShowDropdown(false)}
    // >
    //   <button
    //     onClick={() => setShowDropdown(!showDropdown)}
    //     className={`${backgroundColor} w-8 h-8 text-white font-semibold flex justify-center items-center rounded-full ring-2 flex-shrink-0 uppercase`}
    //   >
    //     {email !== null && email[0]}
    //   </button>
    //   <CSSTransition
    //     nodeRef={dropdownRef}
    //     in={showDropdown}
    //     timeout={200}
    //     className="fade-in my-4"
    //     unmountOnExit
    //     children={
    //       <div
    //         ref={dropdownRef}
    //         className="top-full right-0 z-10 w-52 bg-white py-2 rounded-sm shadow-lg border "
    //       >
    //         <button
    //           onClick={logoutUser}
    //           className="w-full bg-blue-500 text-black hover:bg-gray-100 text-sm px-6 py-1 text-left"
    //         >
    //           Logout
    //         </button>
    //       </div>
    //     }
    //   ></CSSTransition>
    // </div>
    <div className="relative">
      <button
        onClick={() => setShowDropdown(!showDropdown)}
        onBlur={() => setShowDropdown(false)}
        className={`${backgroundColor} w-10 h-10 text-white font-medium flex justify-center items-center rounded-full flex-shrink-0 uppercase hover:shadow-2xl`}
      >
        {email !== null && email[0]}
      </button>
      <CSSTransition
        nodeRef={dropdownRef}
        in={showDropdown}
        timeout={200}
        classNames="fade-in"
        unmountOnExit
      >
        <div
          ref={dropdownRef}
          className="absolute mt-1.5 top-full right-0 z-10 rounded-lg "
        >
          <button
            onClick={logoutUser}
            className="block w-full bg-blue-500 text-white hover:bg-blue-600 text-md px-6 py-2 text-left rounded-3xl shadow-xl"
          >
            Logout
          </button>
        </div>
      </CSSTransition>
    </div>
  );
};

export default UserDropdown;
