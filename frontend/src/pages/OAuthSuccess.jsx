import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const OAuthSuccess = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const accessToken = params.get('access_token');
    const refreshToken = params.get('refresh_token');
    const state = params.get('state'); // <- get the original page

    if (accessToken) {
      sessionStorage.setItem('access_token', accessToken);
    }
    if (refreshToken) {
      sessionStorage.setItem('refresh_token', refreshToken);
    }

    // Redirect back to the page user was on, or default
    navigate(state || '/home_page');
  }, [navigate]);

  return <div>Logging you in...</div>;
};

export default OAuthSuccess;
