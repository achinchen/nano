import { Navigate } from 'react-router-dom';
import { useAppContext } from '~frontend/context';

export default function UserProtectedRoute({
  children,
}: React.PropsWithChildren): React.ReactNode {
  const { isLogin } = useAppContext();
  if (!isLogin) return <Navigate to="/login" />;
  return children;
}
