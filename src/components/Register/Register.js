import React, { Component } from "react";
import PropTypes from "prop-types";

export default class Register extends Component {
  static propTypes = {
    prop: PropTypes
  };

  render() {
    return (
      <div>
        Esto sera un formulario de registro a la comunidad, con ayuda de la API que pablo proveera.
      </div>
    );
  }
}
