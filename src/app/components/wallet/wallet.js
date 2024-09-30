import React, { useEffect } from "react";
import "./wallet.css";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import FormControl, { useFormControl } from "@mui/material/FormControl";
import OutlinedInput from "@mui/material/OutlinedInput";
import FormHelperText from "@mui/material/FormHelperText";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Button from "@mui/material/Button";
import TuneIcon from "@mui/icons-material/Tune";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

function MyFormHelperText() {
  const { focused } = useFormControl() || {};

  const helperText = React.useMemo(() => {
    if (focused) {
      return "This field is being focused";
    }

    return "Helper text";
  }, [focused]);

  return <FormHelperText>{helperText}</FormHelperText>;
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const Wallet = ({
  orgToken,
  compToken,
  handleSwap,
  orgValue,
  compValue,
  setCompValue,
  setOrgValue,
  dark,
  setShowTokenList,
  setIsOrgToken,
  setIsCompToken,
}) => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  useEffect(() => {}, [dark]);
  return (
    <div className={dark ? "walletdark" : ""}>
      <div className={`wallet-section`}>
        <Box sx={{ width: "100%" }} className="tab-section">
          <Box className="tabs">
            <Tabs
              value={value}
              onChange={handleChange}
              aria-label="basic tabs example"
            >
              <Tab label="Swap" {...a11yProps(0)} className="tab-section-h" />
              <Tab label="Limit" {...a11yProps(1)} className="tab-section-h" />
              <Tab label="TWAP" {...a11yProps(2)} className="tab-section-h" />
            </Tabs>
            <TuneIcon />
          </Box>
          <CustomTabPanel value={value} index={0} className="input-section">
            <div className={`weth-section  ${dark ? "weth-section-dark" : ""}`}>
              <form noValidate autoComplete="off">
                <div className="left-section">
                  <div
                    className="dropdown"
                    onClick={() => {
                      setShowTokenList(true);
                      setIsOrgToken(true);
                    }}
                  >
                    <span>{orgToken?.label}</span>
                    <div className="dropdown-img">
                      <ExpandMoreIcon />
                    </div>
                  </div>
                </div>
                <div className="right-section">
                  <FormControl sx={{ width: "100%" }}>
                    <OutlinedInput
                      type="number"
                      placeholder="0.00"
                      value={orgValue}
                      onChange={(e) => setOrgValue(e?.target?.value)}
                    />
                  </FormControl>
                </div>
                <div className="down-arrow" onClick={handleSwap}>
                  <ArrowDownwardIcon />
                </div>
              </form>
            </div>
            <div
              className={`weth-section eth-section ${
                dark ? "eth-section-dark" : ""
              }`}
            >
              <form noValidate autoComplete="off">
                <div className="left-section">
                  <div
                    className="dropdown"
                    onClick={() => {
                      setIsCompToken(true);
                      setShowTokenList(true);
                    }}
                  >
                    <span>{compToken?.label}</span>
                    <div className="dropdown-img">
                      <ExpandMoreIcon />
                    </div>
                  </div>
                </div>
                <div className="right-section">
                  <FormControl sx={{ width: "100%" }}>
                    <OutlinedInput
                      placeholder="0.00"
                      type="number"
                      value={compValue}
                      onChange={(e) => setCompValue(e?.target?.value)}
                    />
                  </FormControl>
                </div>
              </form>
            </div>
            <Button className="connect-btn">Connect Wallet</Button>
          </CustomTabPanel>
          <CustomTabPanel value={value} index={1} className="eth-section">
            Limit
          </CustomTabPanel>
          <CustomTabPanel value={value} index={2}>
            TWAP
          </CustomTabPanel>
        </Box>
      </div>
    </div>
  );
};

export default Wallet;
