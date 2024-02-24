import { useContext } from "react";
import { EditorContext } from "../../../contexts/editor-context";
import { EditorState } from "draft-js";
import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/outline";
import IconButton from "../../atoms/icon-button";
import FontSelect from "../../atoms/font-select";

const EditorToolbar = () => {
  const { editorState, setEditorState } = useContext(EditorContext);

  const handleUndoButtonClicked = () => {
    setEditorState(EditorState.undo(editorState));
  };

  const handleRedoButtonClicked = () => {
    setEditorState(EditorState.redo(editorState));
  };

  return (
    <div className="w-full h-9 px-3 py-1 flex-shrink-0 flex items-center">
      <IconButton
        onClick={handleUndoButtonClicked}
        icon={<ArrowLeftIcon className="h-4 w-4" />}
        tooltip="Undo"
      />
      <IconButton
        onClick={handleRedoButtonClicked}
        icon={<ArrowRightIcon className="h-4 w-4" />}
        tooltip="Redo"
      />
      <div className="h-5 border-1 border-1-gray-300 mx-2"></div>
      <FontSelect />
    </div>
  );
};

export default EditorToolbar;
