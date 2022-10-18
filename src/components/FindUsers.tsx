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
import React, { Dispatch, SetStateAction, useState } from "react";
import { handleLookUpApi } from "../api/api";
import LoadingButton from "@mui/lab/LoadingButton";
import { hasNumber } from "./AddLocations";

interface IData {
  id: number;
  name: string;
  geom: string;
}

const FindUsers: React.FunctionComponent = () => {
  const [radius, setRadius] = useState("");
  const [lat, setLat] = useState("");
  const [lng, setLng] = useState("");
  const [data, setData] = useState<IData[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleLookUp = async () => {
    try {
      if (!lng.includes("-")) {
        return alert("Error, please add - to your longitude");
      }
      if (!hasNumber(radius) || !hasNumber(lng) || !hasNumber(lat)) {
        return alert("Only numbers allowed");
      }

      setIsLoading(true);
      const result = await handleLookUpApi(
        parseFloat(lat),
        parseFloat(lng),
        parseInt(radius)
      );
      setData(result.data);
      setIsLoading(false);
    } catch (err) {
      setIsLoading(false);
      alert("error");
    }
  };

  const renderData = () =>
    data.length != 0 && (
      <Box>
        <TableContainer component={Paper}>
          <Table sx={{ width: 250 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Id</TableCell>
                <TableCell>Your name</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((row, index) => (
                <TableRow
                  key={index}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {row.id}
                  </TableCell>
                  <TableCell>{row.name}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    );

  return (
    <Box>
      <Typography fontWeight="bold" fontSize={20} textAlign="center">
        Find users near your coordinates
      </Typography>
      <Box marginTop={2} marginBottom={2}>
        <Box display={"flex"} justifyContent={"center"}>
          <TextField
            id="radius-id"
            label="Enter Radius"
            variant="outlined"
            onChange={(e) => setRadius(e.target.value)}
            sx={{ width: 300 }}
            value={radius}
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

          <LoadingButton
            size="small"
            onClick={handleLookUp}
            loading={isLoading}
            loadingIndicator="Loading…"
            variant="outlined"
            disabled={lat == "" || lng == "" || radius == "" ? true : false}
            sx={{ width: 100, marginLeft: 1 }}
          >
            Find
          </LoadingButton>
          {/* <Button
            variant="contained"
            sx={{ marginLeft: 1 }}
            onClick={handleLookUp}
            disabled={lat == "" || lng == "" ? true : false}
          >
            use my location
          </Button> */}
        </Box>
      </Box>
      {renderData()}
    </Box>
  );
};

export default FindUsers;
