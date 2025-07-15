import { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { Typography, Paper, Box } from '@mui/material';

export default function StatsPage() {
  const { shortCode } = useParams();
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await axios.get(
          `http://20.244.56.144/evaluation-service/stats/${shortCode}`,
          {
            headers: {
              Authorization: `Bearer ${process.env.REACT_APP_ACCESS_TOKEN}`
            }
          }
        );
        setStats(response.data);
      } catch (error) {
        console.error('Error fetching stats:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, [shortCode]);

  const columns: GridColDef[] = [
    { field: 'timestamp', headerName: 'Time', width: 200 },
    { field: 'source', headerName: 'Source', width: 150 },
    { field: 'location', headerName: 'Location', width: 150 },
  ];

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" gutterBottom>
        Statistics for: {shortCode}
      </Typography>
      {stats && (
        <Paper elevation={3} sx={{ p: 2, mb: 2 }}>
          <Typography>Total Clicks: {stats.totalClicks}</Typography>
          <Typography>Created: {new Date(stats.createdAt).toLocaleString()}</Typography>
          <Typography>Expires: {new Date(stats.expiresAt).toLocaleString()}</Typography>
        </Paper>
      )}
      <div style={{ height: 400, width: '100%' }}>
        <DataGrid
          rows={stats?.clicks || []}
          columns={columns}
          loading={loading}
        />
      </div>
    </Box>
  );
}