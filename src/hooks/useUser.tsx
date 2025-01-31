import { useAppSelector } from "../redux/hooks";

const useUser = () => {
  const user = useAppSelector((state) => state.auth.user);

  return user;
};

export default useUser;
