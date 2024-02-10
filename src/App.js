import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { AppBar, Toolbar, Typography, Button, Tabs, Tab, Paper } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

const data = [
  { cities: 'abc', name: 'Alabama', temp: 70, population: 4903185 },
  { cities: 'def', name: 'Alaska', temp: 40, population: 731545 },
  // ...
];

const App = () => {
  const classes = useStyles();
  const [selectedState, setSelectedState] = useState(null);
  const [selectedCity, setSelectedCity] = useState(null);

  const handleStateClick = (state) => {
    setSelectedState(state);
  };

    const handleCityClick = (city) => {
    setSelectedCity(city);
  };

  const renderStateChart = () => {
    if (!selectedState) return null;

    const cities = data.find((d) => d.name === selectedState).cities;
console.log(cities)
    return (
      <LineChart width={500} height={300} data={cities} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
        <XAxis dataKey="name" />
        <YAxis />
        <CartesianGrid strokeDasharray="3 3" />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="temp" stroke="#8884d8" activeDot={{ r: 8 }} />
        <Line type="monotone" dataKey="population" stroke="#82ca9d" />
      </LineChart>
    );
  };

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            State Graph
          </Typography>
        </Toolbar>
      </AppBar>
      <Tabs value={selectedState} onChange={(e, state) => handleStateClick(state)}>
        {data.map((d) => (
          <Tab key={d.name} label={d.name} />
        ))}
      </Tabs>
      {renderStateChart()}
      {selectedCity && (
        <Paper>
          <Typography variant="h6">{selectedCity.name}</Typography>
          <LineChart width={500} height={300} data={[selectedCity]} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
            <XAxis dataKey="name" />
            <YAxis />
            <CartesianGrid strokeDasharray="3 3" />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="temp" stroke="#8884d8" activeDot={{ r: 8 }} />
            <Line type="monotone" dataKey="population" stroke="#82ca9d" />
          </LineChart>
        </Paper>
      )}
    </div>
  );
};

export default App;

