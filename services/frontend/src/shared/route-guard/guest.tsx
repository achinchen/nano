import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '~frontend/context';

export default function GuestProtectedRoute({
  children,
}: {
  children: JSX.Element;
}) {
  const { isLogin } = useAppContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (isLogin) navigate('/my/setting');
  }, [isLogin, navigate]);
  return isLogin ? null : children;
}
