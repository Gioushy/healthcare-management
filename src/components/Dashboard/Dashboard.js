import React, { useState, useEffect } from "react";
import { Container, Typography, Grid, Paper } from "@mui/material";
import { styled } from "@mui/material/styles";
import { useAuth } from "../../context/AuthContext";

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(2),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

function Dashboard() {
  const [patients, setPatients] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const { user, getPatients, getAppointments } = useAuth();

  const fetchPatients = async () => {
    const fetchedPatients = await getPatients();
    setPatients(fetchedPatients);
  };

  const fetchAppointments = async () => {
    const fetchedAppointments = await getAppointments();
    setAppointments(fetchedAppointments);
  };

  useEffect(() => {
    fetchPatients();
    fetchAppointments();
  }, []);

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" gutterBottom>
        Healthcare Management Dashboard
      </Typography>
      {user ? (
        <Grid container spacing={3}>
          <Grid item xs={12} md={4}>
            <Item>
              <Typography variant="h6">Total Patients</Typography>
              <Typography variant="h4">{patients.length}</Typography>
            </Item>
          </Grid>
          <Grid item xs={12} md={4}>
            <Item>
              <Typography variant="h6">Appointments Today</Typography>
              <Typography variant="h4">{appointments.length}</Typography>
            </Item>
          </Grid>
          <Grid item xs={12} md={4}>
            <Item>
              <Typography variant="h6">Staff on Duty</Typography>
              <Typography variant="h4">15</Typography>
            </Item>
          </Grid>
        </Grid>
      ) : (
        <Typography variant="h6">
          Please log in to view the dashboard.
        </Typography>
      )}
    </Container>
  );
}

export default Dashboard;
