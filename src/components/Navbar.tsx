const Navbar = () => {
  return (
    <div className="navbar max-w-[1440px] px-3 mx-auto">
      <div className="flex-1">
        <a className="text-3xl font-matemasie text-green-400">FootyRoom</a>
      </div>
      <div className="flex-none">
        <div className="dropdown dropdown-end">
          <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
            <div>
              <p>User</p>
            </div>
          </div>
        </div>
        <div className="dropdown dropdown-end">
          <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
            <div className="w-10 rounded-full">
              <img alt="Tailwind CSS Navbar component" src="./favicon.svg" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
