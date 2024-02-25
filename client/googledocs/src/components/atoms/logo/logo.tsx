import { Link } from "react-router-dom";

const Logo = () => {
  return (
    <Link
      to="/document/create"
      className="flex flex-shrink-0 justify-center items-center w-14 h-14 hover:bg-gray-100 rounded-full"
    >
      <img
        src="https://www.gstatic.com/images/branding/product/1x/docs_2020q4_48dp.png"
        style={{ width: 40, height: 40 }}
      ></img>
    </Link>
  );
};

export default Logo;
