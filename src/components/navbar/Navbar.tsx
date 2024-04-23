const Navbar = () => {
  return (
    <div className="flex flex-row justify-between bg-light-primary p-3 mb-10 items-center shadow-lg">
      <label className="text-white font-bold text-2xl">
        Expense Tracker App
      </label>
      <div className="flex items-center">
        <div className="flex items-center space-x-2">
          <img
            src="https://picsum.photos/id/237/200/300"
            alt="Profile"
            className="h-12 w-12 rounded-full border border-light-secondary shadow-sm"
          />
          <div className="text-white">
            <p className="text-sm font-semibold">Satyam</p>
            <p className="text-xs">Software Engineer</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
