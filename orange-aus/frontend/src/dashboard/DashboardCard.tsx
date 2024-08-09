import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';

interface DashboardCardProps {
  title: string;
  value: number | string;
}

const DashboardCard: React.FC<DashboardCardProps> = ({ title, value }) => {
  return (
    <Card sx={{ minWidth: 275, margin: 2 }}>
      <CardContent>
        <Typography variant="h5" component="div">
          {title}
        </Typography>
        <Typography variant="h4">
          {value}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default DashboardCard;
