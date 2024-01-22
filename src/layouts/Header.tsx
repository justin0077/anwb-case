import anwbLogo from "/logo.svg";

const Header = () => {
  return (
    <>
      <header className="mx-auto px-8">
        <nav className="flex items-center justify-between flex-wrap pt-6 pb-6 ">
          <div className="flex items-center flex-shrink-0 text-white mr-6">
            <img src={anwbLogo} alt="ANWB Logo" className="h-16 w-16 mr-2" />
          </div>
          <div className="block search">
            {/* <button className="flex items-center px-3 py-2 rounded text-teal-200">
              <span className="search__icon material-symbols-outlined">
                search
              </span>
            </button> */}
          </div>
        </nav>
      </header>
    </>
  );
};

export default Header;
