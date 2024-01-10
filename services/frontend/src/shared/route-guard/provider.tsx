import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '~frontend/context';

export default function ProviderProtectedRoute({
  children,
}: {
  children: JSX.Element;
}) {
  const navigate = useNavigate();
  const { isProvider } = useAppContext();

  useEffect(() => {
    if (!isProvider) navigate('/login');
  }, [isProvider, navigate]);

  return isProvider ? children : null;
}
