import { useState } from 'react';
import {
  Button,
  TextField,
  Container,
  Typography,
  Box,
  Paper,
  FormControl,
  FormLabel,
} from '@mui/material';

export default function ShortenerForm() {
  const [longUrl, setLongUrl] = useState('');
  const [customCode, setCustomCode] = useState('');
  const [validity, setValidity] = useState(30);
  const [shortUrl, setShortUrl] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setShortUrl('');

    try {
      const response = await fetch('http://localhost:3000/api/shorten', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          longUrl,
          customCode: customCode || undefined,
          validity: validity || 30,
        }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || 'Failed to shorten URL');
      }

      const data = await response.json();
      setShortUrl(`http://localhost:3000/${data.shortCode}`);
    } catch (err: any) {
      setError(err.message || 'Something went wrong');
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h4" gutterBottom align="center">
          URL Shortener
        </Typography>

        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}
        >
          <FormControl fullWidth>
            <FormLabel required>Long URL</FormLabel>
            <TextField
              value={longUrl}
              onChange={(e) => setLongUrl(e.target.value)}
              placeholder="https://example.com"
              fullWidth
              required
            />
          </FormControl>

          <TextField
            label="Custom Short Code (optional)"
            value={customCode}
            onChange={(e) => setCustomCode(e.target.value)}
            fullWidth
          />

          <TextField
            label="Validity in minutes (default: 30)"
            type="number"
            value={validity}
            onChange={(e) => setValidity(Number(e.target.value))}
            fullWidth
            inputProps={{ min: 1 }}
          />

          <Button
            type="submit"
            variant="contained"
            size="large"
            fullWidth
            sx={{ mt: 2 }}
          >
            SHORTEN URL
          </Button>

          {/* Success message and stats button */}
          {shortUrl && (
            <Box sx={{ mt: 2 }}>
              <Typography variant="body1">
                Shortened URL:{' '}
                <a href={shortUrl} target="_blank" rel="noopener noreferrer">
                  {shortUrl}
                </a>
              </Typography>
              <Button
                variant="outlined"
                sx={{ mt: 1 }}
                onClick={() =>
                  window.location.href = `/stats/${shortUrl.split('/').pop()}`
                }
              >
                View Statistics
              </Button>
            </Box>
          )}

          {/* Error message */}
          {error && (
            <Typography color="error" sx={{ mt: 2 }}>
              {error}
            </Typography>
          )}
        </Box>
      </Paper>
    </Container>
  );
}
