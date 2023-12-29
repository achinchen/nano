import { Navigate } from 'react-router-dom';
import { useAppContext } from '~frontend/context';

export default function GuestProtectedRoute({
  children,
}: React.PropsWithChildren): React.ReactNode {
  const { isLogin } = useAppContext();
  if (isLogin) return <Navigate to="/my/setting" />;
  return children;
}
