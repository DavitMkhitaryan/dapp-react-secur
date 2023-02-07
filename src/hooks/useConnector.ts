import { useContext } from "react";
import ConnectorContext from "../context/connector";

const useConnector = (): any => {
    const context = useContext(ConnectorContext);
  
    if (context === undefined) {
      throw new Error(
        "useConnector hook must be used with a ConnectorProvider component"
      );
    }
  
    return context;
  };

  export default useConnector;