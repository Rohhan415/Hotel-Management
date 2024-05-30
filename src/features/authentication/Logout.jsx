import { HiArrowRightOnRectangle } from "react-icons/hi2";
import ButtonIcon from "../../ui/ButtonIcon";
import { useLogout } from "./useLogout";
import SpinnerMini from "../../ui/SpinnerMini";
import { LoginContext } from "./LoginContext";
import { useContext } from "react";

function Logout() {
  const { logout, isLoading } = useLogout();
  const { logOut } = useContext(LoginContext);

  const handleLogout = () => {
    logout();
    logOut();
  };

  return (
    <ButtonIcon disabled={isLoading} onClick={handleLogout}>
      {!isLoading ? <HiArrowRightOnRectangle /> : <SpinnerMini />}
    </ButtonIcon>
  );
}

export default Logout;
