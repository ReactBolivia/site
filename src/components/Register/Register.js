/* eslint no-unused-vars: 0 */

import { navigate } from "gatsby";
import { Divider, Select, Input, InputNumber } from "antd";

import Button from "antd/lib/button";
import Form from "antd/lib/form";

import PropTypes from "prop-types";
import React from "react";
const FormItem = Form.Item;
const { TextArea } = Input;
import "antd/lib/form/style/index.css";
import "antd/lib/input/style/index.css";
import "antd/lib/input-number/style/index.css";
import "antd/lib/button/style/index.css";
import "antd/lib/select/style/index.css";
import "antd/lib/divider/style/index.css";
import { ThemeContext } from "../../layouts";

import axios from "axios";

const Option = Select.Option;

const Register = props => {
  const { getFieldDecorator } = props.form;

  function encode(data) {
    return Object.keys(data)
      .map(key => encodeURIComponent(key) + "=" + encodeURIComponent(data[key]))
      .join("&");
  }

  function handleSubmit(e) {
    e.preventDefault();
    props.form.validateFields((err, values) => {
      if (!err) {
        console.log("Received values of form: ", values);
        sendRegister(values);
      }
    });
  }

  function sendRegister(values) {
    console.log("sendM");
    let dataRegister = {
      ...values,
      sector_id: null,
      evento_id: 7
    };
    console.log("dataRegister", dataRegister);
    axios.post("https://www.isoc.bo/isocbo/public/api/v1/register", dataRegister)
      .then(function(response) {
        console.log(response);
      })
      .catch(function(error) {
        console.log(error);
      });
  }

  function handleNetworkError(e) {
    console.log("submit Error", e);
  }

  return (
    <React.Fragment>
      <ThemeContext.Consumer>
        {theme => (
          <React.Fragment>
            <span>
              El llenado del siguiente formulario, es con el proposito de tener los datos de
              nuestros participantes para de esa manera realizar la generación de los certificados.
            </span>
            <Divider />
            <div className="form">
              <Form
                name="contact"
                onSubmit={handleSubmit}
                data-netlify="true"
                data-netlify-honeypot="bot-field"
              >
                <FormItem label="Nombres" style={{ width: "100%" }}>
                  {getFieldDecorator("nombre", {
                    rules: [
                      {
                        required: true,
                        message: "Por favor, introduce su(s) nombre(s)!",
                        whitespace: true
                      }
                    ]
                  })(<Input name="nombre" style={{ width: "100%" }} />)}
                </FormItem>
                <FormItem label="Apellidos" style={{ width: "100%" }}>
                  {getFieldDecorator("apellidos", {
                    rules: [
                      {
                        required: true,
                        message: "Por favor, introduce su(s) apellido(s)!",
                        whitespace: true
                      }
                    ]
                  })(<Input name="apellidos" style={{ width: "100%" }} />)}
                </FormItem>
                <FormItem label="Edad">
                  {getFieldDecorator("edad", {
                    rules: [
                      {
                        required: true,
                        message: "Por favor, ingrese una edad valida!",
                        whitespace: true,
                        type: "number"
                      }
                    ]
                  })(<InputNumber name="edad" />)}
                </FormItem>
                <FormItem label="Genero">
                  {getFieldDecorator("genero_id", {
                    rules: [
                      {
                        required: true,
                        message: "Por favor, seleccione su genero!",
                        whitespace: true
                      }
                    ]
                  })(
                    <Select name="genero_id" style={{ width: "100%" }}>
                      <Option value="1">Masculino</Option>
                      <Option value="2">Femenino</Option>
                    </Select>
                  )}
                </FormItem>
                <FormItem label="E-mail">
                  {getFieldDecorator("correo", {
                    rules: [
                      {
                        required: true,
                        message: "Please input your e-mail address!",
                        whitespace: true,
                        type: "email"
                      }
                    ]
                  })(<Input name="correo" />)}
                </FormItem>

                <FormItem>
                  <Button type="primary" htmlType="submit">
                    Registrarse
                  </Button>
                </FormItem>
              </Form>

              {/* --- STYLES --- */}
              <style jsx>{`
                .form {
                  background: transparent;
                }
                .form :global(.ant-row.ant-form-item) {
                  margin: 0 0 1em;
                }
                .form :global(.ant-row.ant-form-item:last-child) {
                  margin-top: 1em;
                }
                .form :global(.ant-form-item-control) {
                  line-height: 1em;
                }
                .form :global(.ant-form-item-label) {
                  line-height: 1em;
                  margin-bottom: 0.5em;
                }
                .form :global(.ant-form-item) {
                  margin: 0;
                }
                .form :global(.ant-input) {
                  appearance: none;
                  height: auto;
                  font-size: 1.2em;
                  padding: 0.5em 0.6em;
                }
                .form :global(.ant-btn-primary) {
                  height: auto;
                  font-size: 1.2em;
                  padding: 0.5em 3em;
                  background: ${theme.color.brand.primary};
                  border: 1px solid ${theme.color.brand.primary};
                }
                .form :global(.ant-form-explain) {
                  margin-top: 0.2em;
                }
              `}</style>
            </div>
          </React.Fragment>
        )}
      </ThemeContext.Consumer>
    </React.Fragment>
  );
};

Register.propTypes = {
  form: PropTypes.object
};

const RegisterForm = Form.create({})(Register);

export default RegisterForm;
