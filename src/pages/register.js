import PropTypes from "prop-types";
import React from "react";

import { ThemeContext } from "../layouts";
import Article from "../components/Article";
import Register from "../components/Register";
import Headline from "../components/Article/Headline";
import "antd/dist/antd.css";
const RegisterPage = props => {
  return (
    <React.Fragment>
      <ThemeContext.Consumer>
        {theme => (
          <Article theme={theme}>
            <header>
              <Headline title="Registro de Participantes" theme={theme} />
            </header>
            <Register theme={theme} />
          </Article>
        )}
      </ThemeContext.Consumer>
    </React.Fragment>
  );
};

export default RegisterPage;
