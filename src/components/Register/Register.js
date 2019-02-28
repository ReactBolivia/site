/* eslint no-unused-vars: 0 */

import { navigate } from "gatsby";
import { InputNumber, Select, Input } from "antd";
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
import { ThemeContext } from "../../layouts";

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
    fetch("/", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: encode({ "form-name": "contact", ...values })
    })
      .then(() => {
        console.log("Form submission success");
        navigate("/success");
      })
      .catch(error => {
        console.error("Form submission error:", error);
        this.handleNetworkError(error);
      });
  }

  function handleNetworkError(e) {
    console.log("submit Error", e);
  }

  return (
    <React.Fragment>
      <ThemeContext.Consumer>
        {theme => (
          <div className="form">
            <Form
              name="contact"
              onSubmit={handleSubmit}
              data-netlify="true"
              data-netlify-honeypot="bot-field"
            >
              <FormItem label="Nombre Completo" style={{ width: "100%" }}>
                {getFieldDecorator("nombrecompleto", {
                  rules: [
                    {
                      whitespace: true
                    }
                  ]
                })(<Input name="nombrecompleto" style={{ width: "100%" }} />)}
              </FormItem>
              <FormItem label="Celular">
                {getFieldDecorator("celular", {
                  rules: [
                    {
                      required: true,
                      message: "Por favor, introduce un número de celular valido!",
                      whitespace: true
                    }
                  ]
                })(<Input name="celular" min={10000000} max={99999999} />)}
              </FormItem>
              <FormItem label="E-mail">
                {getFieldDecorator("email", {
                  rules: [
                    {
                      required: true,
                      message: "Please input your e-mail address!",
                      whitespace: true,
                      type: "email"
                    }
                  ]
                })(<Input name="email" />)}
              </FormItem>
              <FormItem label="Profesión/ocupación">
                <Select defaultValue="estudiante" style={{ width: "100%" }}>
                  <Option value="estudiante">Estudiante Universitario</Option>
                  <Option value="frontend_developer">Frontend Developer</Option>
                  <Option value="backend_developer">Backend Developer</Option>
                  <Option value="software_engineer">Software Engineer</Option>
                  <Option value="mobile_developer">Mobile Developer</Option>
                  <Option value="devops_engineer">DevOps Engineer</Option>
                </Select>
              </FormItem>
              <FormItem label="Biografía">
                {getFieldDecorator("biografia", {
                  rules: [
                    {
                      required: true,
                      message: "Por favor, escribe una pequeña biografía para conocerte!",
                      whitespace: true
                    }
                  ]
                })(<TextArea name="biografia" autosize={{ minRows: 4, maxRows: 10 }} />)}
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
