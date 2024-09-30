import React, { useState } from "react";
import "./tokenList.css";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Search } from "@mui/icons-material";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";

const TokenList = ({
  cryptoList,
  setShowTokenList,
  isOrgToken,
  setOrgToken,
  setCompToken,
  setIsOrgToken,
  setIsCompToken,
  dark,
}) => {
  const [searchQuery, setSearchQuery] = useState(""); // State to hold search query

  // Filter the tokens based on the search query
  const filteredTokens = cryptoList.filter(
    (token) => token.name.toLowerCase().includes(searchQuery.toLowerCase()) // case-insensitive search
  );

  return (
    <div className={dark ? "tokendark" : ""}>
      <div className="token-section">
        <div className="search-section">
          <div className="headeing">
            <div onClick={() => setShowTokenList(false)} className="c-pointer">
              <ArrowBackIcon />
            </div>
            <h3>Select a token</h3>
          </div>
          <div className="input-box">
            <input
              type="text"
              placeholder="Search here..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)} // Update search query on input change
            />
          </div>
          <div className="tokens-name">
            <h4>Favorite tokens</h4>
            <HelpOutlineIcon />
          </div>
          <div>
            <ul className="tags">
              {cryptoList.slice(0, 4).map((token, index) => (
                <li
                  className="tag"
                  key={index}
                  onClick={() => {
                    if (isOrgToken) {
                      setOrgToken(token);
                    } else if (!isOrgToken) {
                      setCompToken(token);
                    }
                    setShowTokenList(false);
                    setIsOrgToken(false);
                    setIsCompToken(false);
                  }}
                >
                  <a>{token.label}</a>
                </li>
              ))}
            </ul>
          </div>
          <div className="list">
            {filteredTokens?.map((data, index) => {
              return (
                <div
                  className="list-item"
                  key={index}
                  onClick={() => {
                    if (isOrgToken) {
                      setOrgToken(data);
                    } else if (!isOrgToken) {
                      setCompToken(data);
                    }
                    setShowTokenList(false);
                    setIsOrgToken(false);
                    setIsCompToken(false);
                  }}
                >
                  <span className="label">{data?.label}</span>
                  <div className="name">
                    <span className="TokenName__Wrapper-sc-1ocqdeh-0 hkERLD">
                      {data?.name}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TokenList;
