import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Drawer from "@mui/material/Drawer";
import { IconButton, useTheme, useMediaQuery } from "@mui/material";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PaymentsIcon from "@mui/icons-material/Payments";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import SavingsIcon from "@mui/icons-material/Savings";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import ReceiptIcon from "@mui/icons-material/Receipt";
import TableChartIcon from "@mui/icons-material/TableChart";
import AddIcon from "@mui/icons-material/Add";
import PaidIcon from "@mui/icons-material/Paid";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import PieChartIcon from "@mui/icons-material/PieChart";
import ReceiptLongRoundedIcon from "@mui/icons-material/ReceiptLongRounded";
import CategoryIcon from "@mui/icons-material/Category";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import CalculateIcon from "@mui/icons-material/Calculate";
import MenuIcon from "@mui/icons-material/Menu";
import axios from "axios";
import {
  Box,
  Collapse,
  Divider,
  ListItemButton,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";

const Sidebar = () => {
  const [open, setOpen] = useState(false);
  const [atmOpen, setAtmOpen] = useState(false);
  const [transactionOpen, setTransactionOpen] = useState(false);
  const [cashCount, setCashCount] = useState(0);
  const [atmCount, setAtmCount] = useState(0);
  const [categoryOpen, setCategoryOpen] = useState(false);
  const [budgetOpen, setBudgetOpen] = useState(false);
  const [openDrawer, setOpenDrawer] = React.useState(false);
  const toggleDrawer = (newOpen) => () => {
    setOpenDrawer(newOpen);
  };

  const location = useLocation();

  const theme = useTheme();

  const isMobileSize = useMediaQuery(theme.breakpoints.down("sm"));
  const isMobileSizeMd = useMediaQuery(theme.breakpoints.down("md"));

  const handleCollapse = () => {
    setOpen(!open);
  };

  const handleAtmOpen = () => {
    setAtmOpen(!atmOpen);
  };

  const handleTransactionOpen = () => {
    setTransactionOpen(!transactionOpen);
  };

  const handleCategoryOpen = () => {
    setCategoryOpen(!categoryOpen);
  };

  const handleBudgetOpen = () => {
    setBudgetOpen(!budgetOpen);
  };

  const isActive = (path) => {
    return location.pathname === path;
  };

  useEffect(() => {
    fetchCashCount();
  }, []);

  useEffect(() => {
    fetchAtmCount();
  }, []);

  const fetchCashCount = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/cash-count`,
        {
          withCredentials: true,
        }
      );
      setCashCount(response.data.count);
    } catch (error) {
      console.error("Error fetching cash count:", error);
    }
  };

  const fetchAtmCount = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/atm-count`,
        {
          withCredentials: true,
        }
      );
      setAtmCount(response.data.count);
    } catch (error) {
      console.error("Error fetching atm count:", error);
    }
  };

  const DrawerList = (
    <List sx={{ width: "240px" }}>
      <Box p={"5px"}>
        <Typography variant="h4" textAlign={"center"}>
          <img
            src="../images/BA.png"
            style={{
              width: "70%",
              borderRadius: "80px",
            }}
          />
        </Typography>
      </Box>
      <Divider sx={{ margin: "20px" }} />
      <ListItemButton component={Link} to="/" selected={isActive("/")}>
        <ListItemIcon>
          <PieChartIcon />
        </ListItemIcon>
        <ListItemText primary="Analytics" />
      </ListItemButton>

      <ListItemButton onClick={handleBudgetOpen}>
        <ListItemIcon>
          <AccountBalanceWalletIcon />
        </ListItemIcon>
        <ListItemText primary="Budget" />
        {budgetOpen ? <ExpandLessIcon /> : <ExpandMoreIcon />}
      </ListItemButton>

      <Collapse in={budgetOpen} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItemButton
            button
            component={Link}
            to="/budget-list"
            selected={isActive("/budget-list")}
            sx={{ marginLeft: "20px" }}
          >
            <ListItemIcon>
              <TableChartIcon />
            </ListItemIcon>
            <ListItemText primary="List" />
          </ListItemButton>
          <ListItemButton
            button
            component={Link}
            to="/budget/new"
            selected={isActive("/budget/new")}
            sx={{ marginLeft: "20px" }}
          >
            <ListItemIcon>
              <AddIcon />
            </ListItemIcon>
            <ListItemText primary="New" />
          </ListItemButton>
        </List>
      </Collapse>

      <ListItemButton onClick={handleCategoryOpen}>
        <ListItemIcon>
          <CategoryIcon />
        </ListItemIcon>
        <ListItemText primary="Category" />
        {categoryOpen ? <ExpandLessIcon /> : <ExpandMoreIcon />}
      </ListItemButton>

      <Collapse in={categoryOpen} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItemButton
            button
            component={Link}
            to="/category-list"
            selected={isActive("/category-list")}
            sx={{ marginLeft: "20px" }}
          >
            <ListItemIcon>
              <TableChartIcon />
            </ListItemIcon>
            <ListItemText primary="Categories" />
          </ListItemButton>
          <ListItemButton
            button
            component={Link}
            to="/category/new"
            selected={isActive("/category/new")}
            sx={{ marginLeft: "20px" }}
          >
            <ListItemIcon>
              <AddIcon />
            </ListItemIcon>
            <ListItemText primary="New" />
          </ListItemButton>
        </List>
      </Collapse>

      <ListItemButton onClick={handleCollapse}>
        <ListItemIcon>
          <PaymentsIcon />
        </ListItemIcon>
        <ListItemText primary="Cash" />
        {open ? <ExpandLessIcon /> : <ExpandMoreIcon />}
      </ListItemButton>

      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItemButton
            button
            component={Link}
            to="/cash-list"
            selected={isActive("/cash-list")}
            sx={{ marginLeft: "20px" }}
          >
            <ListItemIcon>
              <TableChartIcon />
            </ListItemIcon>
            <ListItemText primary="List" />
          </ListItemButton>
          <ListItemButton
            button
            component={Link}
            to="/cash/new"
            selected={isActive("/cash/new")}
            sx={{ marginLeft: "20px" }}
            disabled={cashCount > 0}
          >
            <ListItemIcon>
              <AddIcon />
            </ListItemIcon>
            <ListItemText primary="Add" />
          </ListItemButton>
        </List>
      </Collapse>

      <ListItemButton onClick={handleAtmOpen}>
        <ListItemIcon>
          <CreditCardIcon />
        </ListItemIcon>
        <ListItemText primary="Card" />
        {atmOpen ? <ExpandLessIcon /> : <ExpandMoreIcon />}
      </ListItemButton>

      <Collapse in={atmOpen} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItemButton
            button
            component={Link}
            to="/atm-list"
            selected={isActive("/atm-list")}
            sx={{ marginLeft: "20px" }}
          >
            <ListItemIcon>
              <TableChartIcon />
            </ListItemIcon>
            <ListItemText primary="List" />
          </ListItemButton>
          <ListItemButton
            button
            component={Link}
            to="/atm/new"
            selected={isActive("/atm/new")}
            sx={{ marginLeft: "20px" }}
            disabled={atmCount > 0}
          >
            <ListItemIcon>
              <AddIcon />
            </ListItemIcon>
            <ListItemText primary="Add" />
          </ListItemButton>
          <ListItemButton
            button
            component={Link}
            to="/atm/withdraw"
            selected={isActive("/atm/withdraw")}
            sx={{ marginLeft: "20px" }}
          >
            <ListItemIcon>
              <ArrowBackIcon />
            </ListItemIcon>
            <ListItemText primary="Withdraw" />
          </ListItemButton>
        </List>
      </Collapse>

      <ListItemButton
        component={Link}
        to="/expenses-list"
        selected={isActive("/expenses-list")}
      >
        <ListItemIcon>
          <ShoppingCartIcon />
        </ListItemIcon>
        <ListItemText primary="Expenses" />
      </ListItemButton>

      <ListItemButton
        component={Link}
        to="/income-list"
        selected={isActive("/income-list")}
      >
        <ListItemIcon>
          <PaidIcon />
        </ListItemIcon>
        <ListItemText primary="Income" />
      </ListItemButton>

      <ListItemButton
        component={Link}
        to="/savings-list"
        selected={isActive("/savings-list")}
      >
        <ListItemIcon>
          <SavingsIcon />
        </ListItemIcon>
        <ListItemText primary="Savings" />
      </ListItemButton>

      <ListItemButton onClick={handleTransactionOpen}>
        <ListItemIcon>
          <ReceiptIcon />
        </ListItemIcon>
        <ListItemText primary="Transaction" />
        {transactionOpen ? <ExpandLessIcon /> : <ExpandMoreIcon />}
      </ListItemButton>

      <Collapse in={transactionOpen} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItemButton
            button
            component={Link}
            to="/transaction-list"
            selected={isActive("/transaction-list")}
            sx={{ marginLeft: "20px" }}
          >
            <ListItemIcon>
              <TableChartIcon />
            </ListItemIcon>
            <ListItemText primary="List" />
          </ListItemButton>
          <ListItemButton
            button
            component={Link}
            to="/transaction/new"
            selected={isActive("/transaction/new")}
            sx={{ marginLeft: "20px" }}
          >
            <ListItemIcon>
              <ReceiptLongRoundedIcon />
            </ListItemIcon>
            <ListItemText primary="Transact" />
          </ListItemButton>
        </List>
      </Collapse>

      <ListItemButton
        component={Link}
        to="/calculator"
        selected={isActive("/calculator")}
      >
        <ListItemIcon>
          <CalculateIcon />
        </ListItemIcon>
        <ListItemText primary="Calculator" />
      </ListItemButton>
    </List>
  );

  return (
    <div>
      {isMobileSize || isMobileSizeMd ? (
        <>
          <IconButton onClick={toggleDrawer(true)}>
            <MenuIcon />
          </IconButton>
          <Drawer open={openDrawer} onClose={toggleDrawer(false)}>
            {DrawerList}
          </Drawer>
        </>
      ) : (
        <Drawer
          variant="permanent"
          anchor="left"
          sx={{
            width: "240px",
            flexShrink: 0,
            "& .MuiDrawer-paper": {
              width: "240px",
              boxSizing: "border-box",
            },
          }}
          open={true}
        >
          {DrawerList}
        </Drawer>
      )}
    </div>
  );
};

export default Sidebar;
