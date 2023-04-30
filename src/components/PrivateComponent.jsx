import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";

function PrivateComponent({ authComp, defaultComp }) {
  const { user } = useContext(AuthContext);
  const auth = user !== null;
  return auth ? authComp : defaultComp;
}

export default PrivateComponent;
