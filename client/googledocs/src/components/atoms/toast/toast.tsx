import { MouseEvent, useContext } from "react";
import { ToastContext } from "../../../contexts/toast-context";
import ToastInterface from "../../../types/interfaces/toast";

const TOAST_CLASSES = {
  primary: "toast-primary",
  secondary: "toast-secondary",
  success: "toast-success",
  warning: "toast-warning",
  danger: "toast-danger",
};

const Toast = ({ id, color, title, body, actions }: ToastInterface) => {
  const { removeToast } = useContext(ToastContext);

  const handleToastClick = (e: MouseEvent<HTMLDivElement>) => {
    const clasListArr = Array.from((e.target as HTMLDivElement).classList);
    if (!clasListArr.includes("action")) {
      removeToast(id);
    }
  };

  return (
    <div
      onClick={handleToastClick}
      className={`${TOAST_CLASSES[color]} w-full rounded bg-white dark:bg-slate-700 shadow-md dark:shadow-2xl flex items-stretch text-sm relative cursor-pointer text-primary`}
    >
      <div className="w-full p-4 space-y-1">
        {title && <h1 className="font-medium">{title}</h1>}
        {body && <p className="text-slate-500 dark:text-slate-300">{body}</p>}
        <div className="max-w-fit flex flex-wrap justify-start item-start">
          {actions?.map((a, index) => {
            return (
              <button
                key={index}
                className="text-blue-5000 font-semibold hover:underline text-center pr-2 action"
                onClick={() => a.action()}
              >
                {a.label}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
export default Toast;