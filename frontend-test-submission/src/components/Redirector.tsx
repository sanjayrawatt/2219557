import { useEffect, useState } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import axios from 'axios';
import { CircularProgress, Alert } from '@mui/material';

export default function Redirector() {
  const { shortCode } = useParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchOriginalUrl = async () => {
      try {
        const response = await axios.get(
          `http://20.244.56.144/evaluation-service/${shortCode}`,
          {
            headers: {
              Authorization: `Bearer ${process.env.REACT_APP_ACCESS_TOKEN}`
            }
          }
        );
        window.location.href = response.data.longUrl;
      } catch (err) {
        if (axios.isAxiosError(err)) {
          setError(err.response?.data?.message || 'Invalid short URL');
        } else {
          setError('Something went wrong');
        }
        setLoading(false);
      }
    };

    fetchOriginalUrl();
  }, [shortCode]);

  if (loading) return <CircularProgress sx={{ display: 'block', margin: '2rem auto' }} />;
  if (error) return <Alert severity="error">{error}</Alert>;

  return <Navigate to="/" replace />;
}
