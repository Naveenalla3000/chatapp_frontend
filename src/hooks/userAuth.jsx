import { useSelector } from 'react-redux';
export default function userAuth() {
  const { user,token } = useSelector((state) => state.auth);
  if (user && token) {
    return true;
  }
  return false;
}