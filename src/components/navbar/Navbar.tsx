import { Strings } from "../../constants";
import { designation, name } from "../../constants";
import Button from "../button/Button";

interface NavbarProps {
  // Callback function for handling click event
  onClick: () => void;
}

/**
 * Navbar Component
 * 
 * Renders a navigation bar with a heading and a profile button.
 * 
 * @param onClick Callback function for handling click event
 */
const Navbar: React.FC<NavbarProps> = ({ onClick }) => {
  return (
    <div className="flex flex-row justify-between bg-light-primary p-3 mb-10 items-center shadow-lg">
      {/* Navbar heading */}
      <label className="text-white font-bold text-2xl">
        {Strings.navbarHeading}
      </label>

      {/* Profile button */}
      <Button className="flex items-center" onClick={onClick}>
        <div className="flex items-center space-x-2">
          {/* Profile image */}
          <img
            src="https://picsum.photos/id/237/200/300"
            alt="Profile"
            className="h-12 w-12 rounded-full border border-light-secondary shadow-sm"
          />

          {/* Profile details */}
          <div className="text-white">
            <p className="text-sm font-semibold text-left">{name}</p>
            <p className="text-xs">{designation}</p>
          </div>
        </div>
      </Button>
    </div>
  );
};

export default Navbar;
