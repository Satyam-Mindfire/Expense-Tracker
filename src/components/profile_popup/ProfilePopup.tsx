import React from "react";
import { Icons, Strings } from "../../constants";
import Button from "../button/Button";

interface ProfilePopupProps {
  isOpen: boolean;
  onClose: () => void;
}

const ProfilePopup: React.FC<ProfilePopupProps> = ({ isOpen, onClose }) => {
  return (
    <div
      className={`fixed top-2 right-2 flex items-center justify-between mt-16 w-60 bg-gray-200 p-3 rounded-md shadow-xl ${
        isOpen ? "visible" : "hidden"
      }`}
    >
      <Button className="w-40">{Strings.logout}</Button>
      <Button className="bg-gray-200 rounded-full" onClick={onClose}>
        <img src={Icons.close} className="w-5 h-5" />
      </Button>
    </div>
  );
};

export default ProfilePopup;
