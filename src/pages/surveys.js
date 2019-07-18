import PropTypes from "prop-types";
import React from "react";

import { ThemeContext } from "../layouts";
import Article from "../components/Article";
import Sedes from "../components/Sedes/Sedes";
import Surveyquestions from "../components/Surveys-questions/Surveysquestions";
import Headline from "../components/Article/Headline";
import "antd/dist/antd.css";
const SurveysPage = props =>{
	return (
    <React.Fragment>
      <ThemeContext.Consumer>
        {theme => (
          <Article theme={theme}>
            <header>
              <Headline title="Ayúdanos a mejorar" theme={theme} />
            </header>
            <Surveyquestions />
          </Article>
        )}
      </ThemeContext.Consumer>
    </React.Fragment>
  	);	
};

export default SurveysPage;