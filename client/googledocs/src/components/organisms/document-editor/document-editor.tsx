import { useContext } from "react";
import { EditorContext } from "../../../contexts/editor-context";
import { Editor } from "draft-js";
import { customStyleMap } from "../../../utils/constants";

const DocumentEditor = () => {
  const { editorState, editorRef, focusEditor, handleEditorChange } =
    useContext(EditorContext);

  return (
    <div
      style={{ height: "1100px", width: "850px" }}
      className="bg-white shadow-lg border flex-shrink-0 cursor-text p-12"
      onClick={focusEditor}
    >
      <Editor
        ref={editorRef}
        editorState={editorState}
        onChange={handleEditorChange}
        customStyleMap={customStyleMap}
      />
    </div>
  );
};

export default DocumentEditor;
