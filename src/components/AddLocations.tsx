import {
  Box,
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { handleSubmitCoordinatesApi } from "../api/api";

interface ICoordinates {
  lat: number;
  lng: number;
}

const AddLocations: React.FunctionComponent = () => {
  const [name, setName] = useState("");
  const [lat, setLat] = useState("");
  const [lng, setLng] = useState("");
  const [corrdinatesArray, setCorrdinatesArray] = useState<ICoordinates[]>([]);

  const handleSave = () => {
    const copy = [
      ...corrdinatesArray,
      { lat: parseFloat(lat), lng: parseFloat(lng) },
    ];
    setCorrdinatesArray(copy);
    setLat("");
    setLng("");
  };

  const handleSubmit = async () => {
    try {
      let array: any[] = [];
      for (var i = 0; i < corrdinatesArray.length; i++) {
        array.push([corrdinatesArray[i].lng, corrdinatesArray[i].lat]);
      }

      const requestBody = {
        name: name,
        geometry: {
          type: "Polygon",
          coordinates: [array],
        },
      };

      await handleSubmitCoordinatesApi(requestBody);
      alert("Coordinates Added successfully");
    } catch (err) {
      alert("error");
    }
  };

  const renderCoordinates = () =>
    corrdinatesArray.length != 0 && (
      <Box>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Latitude</TableCell>
                <TableCell align="right">Longitude</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {corrdinatesArray.map((row, index) => (
                <TableRow
                  key={index}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {row.lat}
                  </TableCell>
                  <TableCell align="right">{row.lng}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Button
          variant="contained"
          sx={{ marginTop: 4 }}
          onClick={handleSubmit}
          fullWidth
        >
          Submit coordinates
        </Button>
      </Box>
    );

  return (
    <Box>
      <Typography fontWeight="bold" fontSize={20} textAlign="center">
        Add new location cordinates
      </Typography>
      <Box marginTop={2} marginBottom={2}>
        <Box display={"flex"} justifyContent={"center"}>
          <TextField
            id="name-id"
            label="What is your name"
            variant="outlined"
            onChange={(e) => setName(e.target.value)}
            sx={{ width: 300 }}
            value={name}
          />
        </Box>
        <Box marginTop={2} display={"flex"}>
          <TextField
            id="lat-id"
            label="Enter Latitude"
            variant="outlined"
            onChange={(e) => setLat(e.target.value)}
            sx={{ width: 300 }}
            value={lat}
          />
          <TextField
            id="lng-id"
            label="Enter Longitude"
            variant="outlined"
            onChange={(e) => setLng(e.target.value)}
            sx={{ width: 300, marginLeft: 1 }}
            value={lng}
          />
          <Button
            variant="contained"
            sx={{ marginLeft: 4 }}
            onClick={handleSave}
            disabled={lat == "" || lng == "" ? true : false}
          >
            Add
          </Button>
        </Box>
      </Box>
      {renderCoordinates()}
    </Box>
  );
};

export default AddLocations;
