import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import Loading from '@/components/loading/loading';


const withAuth = (WrappedComponent: React.ComponentType) => {

  //eslint-disable-next-line
  const AuthComponent = (props: any) => {
    const {isAuthenticated, loading} = useAuth();
    const router = useRouter();

    useEffect(() => {
      if (!isAuthenticated && !loading) {
        router.push('/login');
      }
    }, [isAuthenticated, router, loading]);

    if (loading) {
      return <Loading/>; // Replace with your loading skeleton or spinner component
    }

    return <WrappedComponent {...props} />;
  };

  return AuthComponent;
};

export default withAuth;
