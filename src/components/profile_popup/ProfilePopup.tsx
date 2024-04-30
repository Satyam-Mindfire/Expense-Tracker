import React from "react";
import { Icons, Strings } from "../../constants";
import Button from "../button/Button";

interface ProfilePopupProps {
  // Boolean indicating whether the profile popup is open or not
  isOpen: boolean;

  // Callback function to close the profile popup
  onClose: () => void;

  // Callback function to handle the logout action
  onLogOut: () => void;
}

/**
 * ProfilePopup Component
 * 
 * Renders a popup for user profile options such as logout.
 * 
 * @param isOpen Boolean indicating whether the profile popup is open or not
 * @param onClose Callback function to close the profile popup
 * @param onLogOut Callback function to handle the logout action
 */
const ProfilePopup: React.FC<ProfilePopupProps> = ({ isOpen, onClose, onLogOut }) => {
  return (
    <div
      className={`fixed top-2 right-2 flex items-center justify-between mt-16 w-60 bg-gray-200 p-3 rounded-md shadow-xl ${
        isOpen ? "visible" : "hidden"
      }`}
    >
      {/* Logout button */}
      <Button className="w-40" onClick={onLogOut}>{Strings.logout}</Button>

      {/* Close button */}
      <Button className="bg-gray-200 rounded-full" onClick={onClose}>
        <img src={Icons.close} className="w-5 h-5" />
      </Button>
    </div>
  );
};

export default ProfilePopup;
