import PropTypes from "prop-types";
import React from "react";

import { ThemeContext } from "../layouts";
import Article from "../components/Article";
import Sedes from "../components/Sedes/Sedes";
import Headline from "../components/Article/Headline";
import "antd/dist/antd.css";
const SedesPage = props => {
  return (
    <React.Fragment>
      <ThemeContext.Consumer>
        {theme => (
          <Article theme={theme}>
            <header>
              <Headline title="Sedes" theme={theme} />
            </header>
            <Sedes />
          </Article>
        )}
      </ThemeContext.Consumer>
    </React.Fragment>
  );
};

export default SedesPage;
