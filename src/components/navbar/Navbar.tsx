import { Strings } from "../../constants";
import Button from "../button/Button";
interface NavbarProps {
  onClick: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ onClick }) => {
  return (
    <div className="flex flex-row justify-between bg-light-primary p-3 mb-10 items-center shadow-lg">
      <label className="text-white font-bold text-2xl">
        {Strings.navbarHeading}
      </label>
      <Button className="flex items-center" onClick={onClick}>
        <div className="flex items-center space-x-2">
          <img
            src="https://picsum.photos/id/237/200/300"
            alt="Profile"
            className="h-12 w-12 rounded-full border border-light-secondary shadow-sm"
          />
          <div className="text-white">
            <p className="text-sm font-semibold text-left">Satyam</p>
            <p className="text-xs">Software Engineer</p>
          </div>
        </div>
      </Button>
    </div>
  );
};

export default Navbar;
