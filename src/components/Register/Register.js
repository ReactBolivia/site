/* eslint no-unused-vars: 0 */

import { navigate } from "gatsby";
import { Divider, Select, Input, InputNumber, notification, Spin, Alert,Radio, Typography} from "antd";

import Button from "antd/lib/button";
import Form from "antd/lib/form";

import PropTypes from "prop-types";
import React from "react";

import { ThemeContext } from "../../layouts";
import axios from "axios";

const { Text } = Typography;
const FormItem = Form.Item;

const Option = Select.Option;

class Register extends React.Component {
  state = {
    sendRegister: false
  };

  handleSubmit = event => {
    event.preventDefault();
    this.props.form.validateFields(async (err, values) => {
      if (!err) {
        this.changeLoading(true);
        this.sendRegister(values);
      }
    });
  };

  sendRegister = values => {
    let dataRegister = {
      ...values,
      eventoId: values.meetup,
      typeRequest: "ajax",
      createQr: "NO"
    };
    const that = this;
    axios
      .post("https://www.isoc.bo/isocbo/public/api/registro", dataRegister)
      .then(function(response) {
        notification["success"]({
          message: "Mensaje",
          description: "Los datos fueron guardados con exito, muchas gracias."
        });
        setTimeout(() => {
          navigate("/");
        }, 2500);
      })
      .catch(function(error) {
        console.log("error Register", error);
        notification["error"]({
          message: "Mensaje",
          description:
            "Ocurrio un problema, por favor intente nuevamente, si el error persiste envie un mensaje a comunity.react.bolivia@gmail.com."
        });
        that.changeLoading(false);
      });
  };

  changeLoading = (value = false) => {
    this.setState({
      sendRegister: value
    });
  }

  handleNetworkError = e => {
    console.log("submit Error", e);
  };
  render() {
    const { getFieldDecorator } = this.props.form;

    return (
      <React.Fragment>
        <ThemeContext.Consumer>
          {theme => (
            <React.Fragment>
              <Spin spinning={this.state.sendRegister}>
              <Alert
                message="Información importante"
                description="El llenado del siguiente formulario, es con el proposito de tener los datos de
                nuestros participantes para de esa manera realizar la generación de los
                certificados.
                El correo ingresado, sera donde se enviaran los certificados."
                type="info"
                showIcon
              />
              <Divider />
              <div className="form">
                <Form
                  name="contact"
                  onSubmit={e => this.handleSubmit(e)}
                  data-netlify="true"
                  data-netlify-honeypot="bot-field"
                > 
                  

                  <FormItem label="Seleccione el meetup que asistira:">
                    {getFieldDecorator("meetup", {
                        rules: [
                          {
                            required: true,
                            message: "Por favor, seleccione el meetup al que asistira!",
                            type: "number"
                          }
                        ]
                      })(
                        <Radio.Group name='meetup' style={{ width: "100%" }} buttonStyle="solid">
                        <Radio.Button value={13}>
                          Primeros pasos con React Workshop - Cochabamba
                        </Radio.Button>
                      </Radio.Group>)}
                  </FormItem>
                  <FormItem label="Nombres" style={{ width: "100%" }}>
                    {getFieldDecorator("nombres", {
                      rules: [
                        {
                          required: true,
                          message: "Por favor, introduce su(s) nombre(s)!",
                          whitespace: true
                        }
                      ]
                    })(<Input name="nombres" style={{ width: "100%" }} />)}
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
                    {getFieldDecorator("sexo", {
                      rules: [
                        {
                          required: true,
                          message: "Por favor, seleccione su genero!",
                          whitespace: true
                        }
                      ]
                    })(
                      <Select name="genero_id" style={{ width: "100%" }}>
                        <Option value="M">Masculino</Option>
                        <Option value="F">Femenino</Option>
                      </Select>
                    )}
                  </FormItem>
                  <FormItem label="E-mail">
                    {getFieldDecorator("correo", {
                      rules: [
                        {
                          required: true,
                          message: "Por favor, ingrese un correo electronico valido!",
                          whitespace: true,
                          type: "email"
                        }
                      ]
                    })(<Input name="correo" />)}
                  </FormItem>

                  <FormItem>
                    <Button disabled={this.state.sendRegister} type="primary" htmlType="submit">
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
              </Spin>
            </React.Fragment>
          )}
        </ThemeContext.Consumer>
      </React.Fragment>
    );
  }
}

Register.propTypes = {
  form: PropTypes.object
};

const RegisterForm = Form.create({})(Register);

export default RegisterForm;
