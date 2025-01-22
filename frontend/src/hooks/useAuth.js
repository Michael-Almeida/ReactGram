import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

export const useAuth = () => {
  const { User } = useSelector((state) => state.auth);

  const [auth, setAuth] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (User) {
      setAuth(true);
    } else {
      setAuth(false);
    }
    setLoading(false);
  }, [User]);

  return { auth, loading };
};
