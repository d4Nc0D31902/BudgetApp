import React, { useState, useRef } from "react";
import {
  Button,
  Container,
  Grid,
  TextField,
  Typography,
  Paper,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import MetaData from "../layout/MetaData";
import Loader from "../layout/Loader";
import Sidebar from "../admin/Sidebar";

const Calculator = () => {
  const [expression, setExpression] = useState("");
  const [history, setHistory] = useState([]);
  const inputRef = useRef(null);

  const handleButtonClick = (value) => {
    if (value === "=") {
      try {
        const result = eval(expression);
        setExpression(result.toString());
        addToHistory(`${expression} = ${result}`);
      } catch {
        setExpression("Error");
      }
      return;
    }

    if (value === "C") {
      setExpression("");
      return;
    }

    setExpression((prevExpression) => prevExpression + value);
  };

  const addToHistory = (calculation) => {
    setHistory((prevHistory) => [calculation, ...prevHistory]);
  };

  const addCommas = (num) => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  const isSymbol = (value) => {
    return ["+", "-", "*", "/", "="].includes(value);
  };

  const clearHistory = () => {
    setHistory([]);
  };

  return (
    <Container>
      <MetaData title={"Calculator"} />
      <Grid container spacing={2}>
        {/* Sidebar */}
        <Grid item xs={12} md={3}>
          <Sidebar />
        </Grid>

        {/* Calculator Section */}
        <Grid item xs={12} md={6}>
          <Grid container spacing={2} justifyContent="center">
            <Grid item xs={12}>
              <Typography variant="h4" align="center" mt={8} gutterBottom>
                Calculator
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Paper elevation={3} style={{ padding: "1rem" }}>
                <TextField
                  fullWidth
                  variant="outlined"
                  value={addCommas(expression)}
                  InputProps={{
                    readOnly: true,
                    style: { fontSize: "40px" },
                  }}
                  inputRef={inputRef}
                />
                <Grid container spacing={1} style={{ marginTop: "1rem" }}>
                  {[
                    "7",
                    "8",
                    "9",
                    "/",
                    "4",
                    "5",
                    "6",
                    "*",
                    "1",
                    "2",
                    "3",
                    "-",
                    "0",
                    ".",
                    "=",
                    "+",
                  ].map((btn, index) => (
                    <Grid item xs={3} key={index}>
                      <Button
                        variant="contained"
                        fullWidth
                        color={isSymbol(btn) ? "primary" : "inherit"}
                        style={
                          isSymbol(btn)
                            ? { backgroundColor: "#3f51b5", color: "#fff" }
                            : {}
                        }
                        onClick={() => handleButtonClick(btn)}
                      >
                        {btn}
                      </Button>
                    </Grid>
                  ))}
                  <Grid item xs={12}>
                    <Button
                      variant="contained"
                      color="error"
                      fullWidth
                      onClick={() => handleButtonClick("C")}
                    >
                      Clear
                    </Button>
                  </Grid>
                </Grid>
              </Paper>
            </Grid>
          </Grid>
        </Grid>

        {/* History Section */}
        <Grid item xs={12} md={3}>
          <Grid container spacing={2} justifyContent="center">
            <Grid item xs={12}>
              <Typography variant="h4" align="center" mt={8} gutterBottom>
                History
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Paper elevation={3} style={{ padding: "1rem" }}>
                <List>
                  {history.map((calculation, index) => (
                    <ListItem key={index}>
                      <ListItemText>
                        <Typography
                          variant="body1"
                          style={{ fontSize: "20px" }}
                        >
                          {calculation}
                        </Typography>
                      </ListItemText>
                    </ListItem>
                  ))}
                </List>
                <Button
                  variant="contained"
                  color="primary"
                  fullWidth
                  onClick={clearHistory}
                  style={{ marginTop: "1rem" }}
                >
                  Clear History
                </Button>
              </Paper>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Calculator;
