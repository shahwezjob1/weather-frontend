import SearchBox from "./SearchBox";
import { APP_NAME } from "../utils/constants";
import useOnlineStatusHook from "../hooks/useOnlineStatusHook";
import { MdSignalWifiStatusbarConnectedNoInternet4 } from "react-icons/md";
interface NavBarProps {
  handleChangeCity: (name: string) => void; // handleChangeCity is a function
}
const NavBar: React.FC<NavBarProps> = ({ handleChangeCity }) => {
  const isOffline = useOnlineStatusHook();
  return (
    <>
      <div
        id="NavBar"
        className="bg-blue-400 py-5 flex justify-center px-3 z-50"
      >
        <div className="container flex justify-between  items-center w-full max-w-lg sm:max-w-2xl ">
          <h2 className="font-semibold sm:text-2xl text-slate-100">
            {APP_NAME}
          </h2>
          <SearchBox handleChangeCity={handleChangeCity} />
        </div>
      </div>
      {!isOffline && (
        <div>
          <span
            className={`flex justify-center items-center gap-2 animate-slide-fade transition ease duration-700 transform bg-red-500 text-white text-center p-1 text-xs absolute  left-0 right-0 `}
          >
            <MdSignalWifiStatusbarConnectedNoInternet4 size={16} />
            You are browsing Offline
          </span>
        </div>
      )}
    </>
  );
};

export default NavBar;
