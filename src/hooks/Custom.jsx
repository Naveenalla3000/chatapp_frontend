import Loader from "../components/Loader/Loader";
import { useLoadUserQuery, useRefreshTokenQuery } from "../redux/features/api/apiSlice";
export const Custom = ({ children }) => {
  const { isLoading: isUserLoading } = useLoadUserQuery({});
  const { isLoading: isAccessTokenLoading } = useRefreshTokenQuery({});
  return <>
    {
      isAccessTokenLoading ||
        isUserLoading
        ? <Loader />
        : <>
          {children}
        </>
    }
  </>;
};