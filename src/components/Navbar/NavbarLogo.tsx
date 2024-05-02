import { Link } from "react-router-dom";

const NavbarLogo = () => {
  return (
    <div className="flex ms-2 md:me-10">
      <div className="flex items-center justify-center ">
        {" "}
        {/* <img
      src={logo}
      alt="Company Logo"
      className="max-h-14 w-20 sm:h-16 md:h-20 lg:h-20 object-cover"
    /> */}
        <Link to={"/"} className="font-bold text-xl underline sm:block hidden">
          tâche
        </Link>
        {/* <img
      src={textlogo}
      alt="Company Text Logo"
      className="h-12 w-56 sm:h-13.5 md:h-13 lg:h-13 object-cover"
    /> */}
      </div>
    </div>
  );
};
export default NavbarLogo;
