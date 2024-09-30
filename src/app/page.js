"use client";
import { useEffect, useState } from "react";
import styles from "./page.module.css";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import Container from "@mui/material/Container";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import Wallet from "./components/wallet/wallet";
import TokenList from "./components/tokenList/tokenList";
import SettingsIcon from "@mui/icons-material/Settings";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import "./style.css";
export default function Home() {
  const cryptoList = [
    { label: "ETH", name: "Ether" },
    { label: "1INCH", name: "1INCH token" },
    { label: "AAVE", name: "Aave token" },
    { label: "ACX", name: "Across protocol token" },
    { label: "AERGO", name: "Aergo" },
    { label: "ALI", name: "Ali link" },
  ];
  const [dark, setDark] = useState(true);
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [orgToken, setOrgToken] = useState(cryptoList[0]); // Default orgToken
  const [compToken, setCompToken] = useState(cryptoList[1]); // Default compToken
  const [orgValue, setOrgValue] = useState();
  const [compValue, setCompValue] = useState();
  const [showTokenList, setShowTokenList] = useState(false);
  const [isOrgToken, setIsOrgToken] = useState(false);
  const [isCompToken, setIsCompToken] = useState(false);

  useEffect(() => {}, [dark]);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  // Function to swap orgToken and compToken
  const swapTokens = () => {
    setOrgToken((prevOrgToken) => {
      setCompToken(prevOrgToken); // Set compToken to current orgToken
      return compToken; // Set orgToken to current compToken
    });
    setOrgValue((prevOrgValue) => {
      setCompValue(prevOrgValue); // Set compValue to current orgValue
      return compValue; // Set orgValue to current compValue
    });
  };
  return (
    <div className={dark ? styles.pagedark : styles.page}>
      <AppBar position="static" className="header-container">
        <Container className="header-section" maxWidth="xl">
          <Toolbar
            className="header"
            disableGutters
            sx={"justify-content: space-between;"}
          >
            <Typography
              variant="h6"
              noWrap
              component="div"
              className="header-list"
            >
              <div className="logo">Logo</div>
              <div>
                <div className="list-section">
                  <div className="header-dropdown">
                    <span>Trade</span>
                    <div className="dropdown-img">
                      <ExpandMoreIcon />
                    </div>
                  </div>
                  <div className="header-dropdown">
                    <span>Account</span>
                    <div className="dropdown-img">
                      <ExpandMoreIcon />
                    </div>
                  </div>
                  <div className="header-dropdown">
                    <span>Learn</span>
                    <div className="dropdown-img">
                      <ExpandMoreIcon />
                    </div>
                  </div>
                  <div className="header-dropdown">
                    <span>More</span>
                    <div className="dropdown-img">
                      <ExpandMoreIcon />
                    </div>
                  </div>
                </div>
              </div>
            </Typography>

            <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
              >
                <SettingsIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{ display: { xs: "block", md: "none" } }}
              ></Menu>
            </Box>
            <Typography
              variant="h5"
              noWrap
              component="a"
              href="#app-bar-with-responsive-menu"
              sx={{
                mr: 2,
                display: { xs: "flex", md: "none" },
                flexGrow: 1,
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "inherit",
                textDecoration: "none",
              }}
            >
              LOGO
            </Typography>
            <Typography variant="div"></Typography>

            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <SettingsIcon />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: "45px" }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                <MenuItem key={0} onClick={() => setDark(!dark)}>
                  <Typography
                    sx={{
                      textAlign: "center",
                      fontWeight: "bold",
                      fontSize: "18px",
                    }}
                  >
                    {dark ? "Light mode" : "Dark mode"}
                  </Typography>
                </MenuItem>
              </Menu>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
      <div className="main">
        {!showTokenList && (
          <Wallet
            orgToken={orgToken}
            compToken={compToken}
            handleSwap={swapTokens}
            orgValue={orgValue}
            compValue={compValue}
            setCompValue={setCompValue}
            setOrgValue={setOrgValue}
            dark={dark}
            setShowTokenList={setShowTokenList}
            setIsOrgToken={setIsOrgToken}
            setIsCompToken={setIsCompToken}
          />
        )}
        {showTokenList && (
          <TokenList
            cryptoList={cryptoList}
            setShowTokenList={setShowTokenList}
            isOrgToken={isOrgToken}
            setOrgToken={setOrgToken}
            setCompToken={setCompToken}
            orgToken={orgToken}
            compToken={compToken}
            setIsOrgToken={setIsOrgToken}
            isCompToken={isCompToken}
            setIsCompToken={setIsCompToken}
            dark={dark}
          />
        )}
      </div>
    </div>
  );
}
