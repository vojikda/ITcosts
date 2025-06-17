import { useState } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { Box, Container, Grid, Paper, Typography } from '@mui/material';
import { blue } from '@mui/material/colors';
import TotalCostChart from './components/TotalCostChart';
import CategoryDistributionChart from './components/CategoryDistributionChart';
import { dummyApplications } from './data/dummyData';
import { calculateCategoryTotals, formatCurrency } from './utils/dataProcessing';

// Create a theme instance with blue palette
const theme = createTheme({
  palette: {
    primary: {
      main: blue[700],
    },
    secondary: {
      main: blue[400],
    },
    background: {
      default: '#f5f5f5',
      paper: '#ffffff',
    },
  },
});

function App() {
  const categoryTotals = calculateCategoryTotals(dummyApplications);
  const totalCost = categoryTotals.reduce((sum, category) => sum + category.totalCost, 0);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ flexGrow: 1, height: '100vh', overflow: 'auto' }}>
        {/* Header */}
        <Paper 
          elevation={3} 
          sx={{ 
            p: 2, 
            mb: 2, 
            backgroundColor: theme.palette.primary.main,
            color: 'white'
          }}
        >
          <Typography variant="h4" component="h1">
            IT Cost Management Dashboard
          </Typography>
        </Paper>

        <Container maxWidth="lg">
          <Grid container spacing={3}>
            {/* Total Cost Overview */}
            <Grid item xs={12} md={8}>
              <Paper sx={{ p: 2, height: 300, display: 'flex', flexDirection: 'column' }}>
                <Typography variant="h6" gutterBottom>Total Cost Overview</Typography>
                <Box sx={{ flexGrow: 1, position: 'relative' }}>
                  <TotalCostChart data={categoryTotals} />
                </Box>
              </Paper>
            </Grid>

            {/* Quick Stats */}
            <Grid item xs={12} md={4}>
              <Paper sx={{ p: 2, height: 300 }}>
                <Typography variant="h6" gutterBottom>Quick Statistics</Typography>
                <Box sx={{ mt: 2 }}>
                  <Typography variant="h4" color="primary" gutterBottom>
                    {formatCurrency(totalCost)}
                  </Typography>
                  <Typography variant="subtitle1" gutterBottom>
                    Total IT Costs
                  </Typography>
                  <Typography variant="h6" color="secondary" gutterBottom>
                    {dummyApplications.length} Applications
                  </Typography>
                  <Typography variant="body1">
                    Across {categoryTotals.length} Categories
                  </Typography>
                </Box>
              </Paper>
            </Grid>

            {/* Category Distribution */}
            <Grid item xs={12} md={6}>
              <Paper sx={{ p: 2, height: 300, display: 'flex', flexDirection: 'column' }}>
                <Typography variant="h6" gutterBottom>Category Distribution</Typography>
                <Box sx={{ flexGrow: 1, position: 'relative' }}>
                  <CategoryDistributionChart data={dummyApplications} />
                </Box>
              </Paper>
            </Grid>

            {/* Cost Trends */}
            <Grid item xs={12} md={6}>
              <Paper sx={{ p: 2, height: 300 }}>
                <Typography variant="h6" gutterBottom>Cost Trends</Typography>
                <Typography variant="body2" color="text.secondary">
                  Historical trend data will be added in the next phase
                </Typography>
              </Paper>
            </Grid>

            {/* Category Details */}
            <Grid item xs={12}>
              <Paper sx={{ p: 2 }}>
                <Typography variant="h6" gutterBottom>Category Details</Typography>
                <Box sx={{ overflowX: 'auto' }}>
                  {categoryTotals.map((category) => (
                    <Box key={category.category} sx={{ mb: 2 }}>
                      <Typography variant="subtitle1" color="primary">
                        {category.category}
                      </Typography>
                      <Typography variant="body1">
                        Total Cost: {formatCurrency(category.totalCost)}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Applications: {category.applicationCount}
                      </Typography>
                    </Box>
                  ))}
                </Box>
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </ThemeProvider>
  );
}

export default App; 