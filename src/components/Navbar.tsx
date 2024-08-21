import { useContext } from 'react';
import { AuthContext } from '../Providers/AuthProvider';

const Navbar = () => {
  const { googleSignIn, user, logout }: any = useContext(AuthContext);

  return (
    <div className="navbar max-w-[1440px] px-3 mx-auto">
      <div className="flex-1">
        <a className="text-base md:text-3xl font-matemasie text-green-400">FootyRoom</a>
      </div>
      <div className="flex-none space-x-2">
        <button onClick={googleSignIn} className="btn btn-success btn-sm md:btn-md text-white">
          Google
        </button>
        {user && (
          <button onClick={logout} className="btn btn-error text-white">
            Logout
          </button>
        )}
        <div>
          <p className="text-sm font-bold">{user ? user?.displayName : 'No User'}</p>
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
