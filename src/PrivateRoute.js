import { Navigate } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from './firebase-config';

const PrivateRoute = ({ children }) => {
    const [user, loading, error] = useAuthState(auth);

    if (loading) {
        return <div>Loading...</div>;  // Shows a loading message while the authentication status is being determined
    }

    if (error) {
        return <div>Error: {error.message}</div>;  // Optionally handle errors, such as network issues
    }

    return user ? children : <Navigate to="/login" />;  // Redirects to login page if not authenticated
};

export default PrivateRoute;
