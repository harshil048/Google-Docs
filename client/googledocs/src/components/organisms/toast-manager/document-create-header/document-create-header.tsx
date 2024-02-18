import DocumentSearchbar from "../../../atoms/document-searchbar"
import UserDropdown from "../../../atoms/user-dropdown"

const DocumentCreateHeader = ()=>{
  return (
    <div className="w-full px-3 py-1 flex justify-between items-center">
      <h1>Logo</h1>
      <DocumentSearchbar/>
      <UserDropdown/>
    </div>
  )
};

export default DocumentCreateHeader;