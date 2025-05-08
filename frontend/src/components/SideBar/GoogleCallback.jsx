import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const GoogleCallback = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const accessToken = params.get('access_token');

    if (accessToken) {
      sessionStorage.setItem('access_token', accessToken);
      navigate('/dashboard'); 
    } else {
      console.error('No access token found');
    }
  }, [navigate]);

  return <div>Logging in...</div>;
};

export default GoogleCallback;
