import React, { useState } from "react";
import "./App.css";
import { Box, Button } from "@mui/material";
import AddLocations from "./components/AddLocations";
import FindUsers from "./components/FindUsers";

function App() {
  const [view, setView] = useState("index");

  const renderView = () => {
    switch (view) {
      case "index":
        return <AddLocations />;
      case "near-u":
        return <FindUsers />;
    }
  };
  return (
    <Box>
      <Box display={"flex"} justifyContent="center" marginTop={10}>
        <Button
          variant="contained"
          sx={{ marginLeft: 4 }}
          onClick={() => setView("index")}
        >
          Add new location
        </Button>
        <Button
          variant="contained"
          sx={{ marginLeft: 4 }}
          color={"success"}
          onClick={() => setView("near-u")}
        >
          Find users near you
        </Button>
      </Box>
      <Box display={"flex"} justifyContent="center" padding={20}>
        {renderView()}
      </Box>
    </Box>
  );
}

export default App;
