import Loader from "../components/Loader/Loader";
import { useLoadUserQuery } from "../redux/features/api/apiSlice";
export const Custom = ({ children }) => {
    const { isLoading } = useLoadUserQuery({});
    return <>{isLoading ? <Loader /> : <>{children}</>}</>;
  };