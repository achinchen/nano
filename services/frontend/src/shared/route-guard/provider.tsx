import { Navigate } from 'react-router-dom';
import { useAppContext } from '~frontend/context';

export default function ProviderProtectedRoute({
  children,
}: React.PropsWithChildren): React.ReactNode {
  const { isProvider } = useAppContext();
  if (!isProvider) return <Navigate to="/login" />;
  return children;
}
