import { Radio, Checkbox, Row, Col, Divider, Select, Input, notification } from "antd";

import Button from "antd/lib/button";
import Form from "antd/lib/form";

import PropTypes from "prop-types";
import React from "react";
const FormItem = Form.Item;
import { ThemeContext } from "../../layouts";

import axios from "axios";

const Option = Select.Option;
const RadioGroup = Radio.Group;
const { TextArea } = Input;

const Surveyquestions = props => {
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
        sendSarveys(values);
      }
    });
  }

  function sendSarveys(values) {
    console.log("sendM");

    let val = [
      { id: 9, respuesta: values.pregunta_1 },
      { id: 10, respuesta: values.pregunta_2 },
      { id: 11, respuesta: values.pregunta_3 },
      { id: 12, respuesta: values.pregunta_4 },
      { id: 13, respuesta: values.pregunta_5 },
      { id: 14, respuesta: values.pregunta_6 },
      { id: 15, respuesta: values.pregunta_7 },
      { id: 16, respuesta: values.pregunta_8.join(";") },
      { id: 17, respuesta: values.pregunta_9 },
      { id: 18, respuesta: values.pregunta_10 },
      { id: 19, respuesta: values.pregunta_11 },
      { id: 20, respuesta: values.pregunta_12 }
    ];

    let dataRegister = {
      preguntas: val,
      encuestaId: 2
    };
    console.log("dataRegister", dataRegister);

    axios
      .post("https://www.isoc.bo/isocbo/public/api/survey", dataRegister)
      .then(function(response) {
        console.log("response Register", response);
        notification["success"]({
          message: "Mensaje",
          description: "Los datos fueron guardados con exito, muchas gracias."
        });
      })
      .catch(function(error) {
        console.log("error Register", error);
        notification["error"]({
          message: "Mensaje",
          description:
            "Ocurrio un problema, por favor intente nuevamente, si el error persiste envie un mensaje a comunity.react.bolivia@gmail.com."
        });
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
            <span>Por favor llena esta encuesta sobre el evento Reac Bolivia 2019.</span>
            <Divider />
            <div className="form">
              <Form
                name="surbys"
                onSubmit={handleSubmit}
                data-netlify="true"
                data-netlify-honeypot="bot-field"
              >
                <span>
                  <h3 style={{ margin: "0 0 3px 0" }}>
                    1. Califica del 1 (muy malo) a 5 (excelente) los siguientes aspectos:
                  </h3>
                </span>
                <FormItem label="Temáticas expuestas." style={{ width: "100%", padding: "3px" }}>
                  {getFieldDecorator("pregunta_1", {
                    rules: [
                      {
                        required: true,
                        message: "Por favor, seleccione una opción"
                      }
                    ]
                  })(
                    <RadioGroup name="pregunta_1">
                      <Radio value={1}>1</Radio>
                      <Radio value={2}>2</Radio>
                      <Radio value={3}>3</Radio>
                      <Radio value={4}>4</Radio>
                      <Radio value={5}>5</Radio>
                    </RadioGroup>
                  )}
                </FormItem>

                <FormItem label="Expositores." style={{ width: "100%", padding: "3px" }}>
                  {getFieldDecorator("pregunta_2", {
                    rules: [
                      {
                        required: true,
                        message: "Por favor, seleccione una opción"
                      }
                    ]
                  })(
                    <RadioGroup name="pregunta_2">
                      <Radio value={1}>1</Radio>
                      <Radio value={2}>2</Radio>
                      <Radio value={3}>3</Radio>
                      <Radio value={4}>4</Radio>
                      <Radio value={5}>5</Radio>
                    </RadioGroup>
                  )}
                </FormItem>

                <FormItem label="Ambiente." style={{ width: "100%", padding: "3px" }}>
                  {getFieldDecorator("pregunta_3", {
                    rules: [
                      {
                        required: true,
                        message: "Por favor, seleccione una opción"
                      }
                    ]
                  })(
                    <RadioGroup name="pregunta_3">
                      <Radio value={1}>1</Radio>
                      <Radio value={2}>2</Radio>
                      <Radio value={3}>3</Radio>
                      <Radio value={4}>4</Radio>
                      <Radio value={5}>5</Radio>
                    </RadioGroup>
                  )}
                </FormItem>

                <FormItem label="Refrigerio." style={{ width: "100%", padding: "3px" }}>
                  {getFieldDecorator("pregunta_4", {
                    rules: [
                      {
                        required: true,
                        message: "Por favor, seleccione una opción"
                      }
                    ]
                  })(
                    <RadioGroup name="pregunta_4">
                      <Radio value={1}>1</Radio>
                      <Radio value={2}>2</Radio>
                      <Radio value={3}>3</Radio>
                      <Radio value={4}>4</Radio>
                      <Radio value={5}>5</Radio>
                    </RadioGroup>
                  )}
                </FormItem>

                <FormItem label="Horario y fecha." style={{ width: "100%", padding: "3px" }}>
                  {getFieldDecorator("pregunta_5", {
                    rules: [
                      {
                        required: true,
                        message: "Por favor, seleccione una opción"
                      }
                    ]
                  })(
                    <RadioGroup name="pregunta_5">
                      <Radio value={1}>1</Radio>
                      <Radio value={2}>2</Radio>
                      <Radio value={3}>3</Radio>
                      <Radio value={4}>4</Radio>
                      <Radio value={5}>5</Radio>
                    </RadioGroup>
                  )}
                </FormItem>

                <FormItem label="Género">
                  {getFieldDecorator("pregunta_6", {
                    rules: [
                      {
                        required: true,
                        message: "Por favor, seleccione una opción"
                      }
                    ]
                  })(
                    <Select name="genero" style={{ width: "100%", padding: "3px" }}>
                      <Option value="M">Masculino</Option>
                      <Option value="F">Femenino</Option>
                    </Select>
                  )}
                </FormItem>

                <FormItem
                  label="¿Por qué medio te enteraste del meetup 'React And Data?'"
                  style={{ width: "100%", padding: "3px" }}
                >
                  {getFieldDecorator("pregunta_7", {
                    rules: [
                      {
                        required: true,
                        message: "Por favor, seleccione una opción"
                      }
                    ],
                    initialValue: ""
                  })(
                    <Select name="medio" style={{ width: "100%" }}>
                      <Select.Option value="">Seleccione medio</Select.Option>
                      <Select.Option value="Facebook">Facebook</Select.Option>
                      <Select.Option value="Twitter">Twitter</Select.Option>
                      <Select.Option value="Whatsapp">Whatsapp</Select.Option>
                      <Select.Option value="Meetup">Meetup</Select.Option>
                    </Select>
                  )}
                </FormItem>

                <FormItem
                  label="¿Cuál fue la charla que más te agradó del meetup 'React And Data'?"
                  style={{ width: "100%", padding: "3px" }}
                >
                  {getFieldDecorator("pregunta_8", {
                    rules: [
                      {
                        required: true,
                        message: "Por favor, seleccione una opción"
                      }
                    ]
                  })(
                    <Checkbox.Group name="pregunta_8" style={{ width: "100%" }}>
                      <Row>
                        <Col span={8} style={{ width: "100%" }}>
                          <Checkbox value="Mesa 1">El Poder Del dato</Checkbox>
                        </Col>
                        <br />
                        <Col span={8} style={{ width: "100%" }}>
                          <Checkbox value="Mesa 2">
                            Web Components fantásticos y donde encontrarlos
                          </Checkbox>
                        </Col>
                        <br />
                        <Col span={8} style={{ width: "100%" }}>
                          <Checkbox value="Mesa 3">
                            Acceso a la Información y Datos Abiertos
                          </Checkbox>
                        </Col>
                        <br />
                        <Col span={8} style={{ width: "100%" }}>
                          <Checkbox value="Mesa 4">Entre icebergs, ML y el Titanic</Checkbox>
                        </Col>
                        <br />
                        <Col span={8} style={{ width: "100%"}}>
                          <Checkbox value="Mesa 5">
                            Usando React Native para el desarrollo de apps móviles
                          </Checkbox>
                        </Col>
                        <br />
                        <Col span={8} style={{ width: "100%" }}>
                          <Checkbox value="Mesa 6">How To Compete on Data Science</Checkbox>
                        </Col>
                        <br />
                      </Row>
                    </Checkbox.Group>
                  )}
                </FormItem>
                <FormItem
                  label="¿Qué temática te gustaría incluir en los próximos eventos de React Bolivia?"
                  style={{ width: "100%", padding: "3px" }}
                >
                  {getFieldDecorator("pregunta_9", {
                    rules: [
                      {
                        required: true,
                        message:
                          "Por favor, ingrese la temática que desería ver en nuestro próximo evento."
                      }
                    ]
                  })(<TextArea name="pregunta_9" autosize={{ minRows: 2, maxRows: 6 }} />)}
                </FormItem>
                <span>
                  <h3 style={{ margin: "0 0 3px 0" }}>
                    2. Califica del 1 (Nada) a 5 (Experto) el siguiente aspecto:
                  </h3>
                </span>
                <FormItem
                  label="¿Qué tanto dominas React?"
                  style={{ width: "100%", padding: "3px" }}
                >
                  {getFieldDecorator("pregunta_10", {
                    rules: [
                      {
                        required: true,
                        message: "Por favor, seleccione una opción"
                      }
                    ]
                  })(
                    <RadioGroup name="pregunta_10">
                      <Radio value={1}>1</Radio>
                      <Radio value={2}>2</Radio>
                      <Radio value={3}>3</Radio>
                      <Radio value={4}>4</Radio>
                      <Radio value={5}>5</Radio>
                    </RadioGroup>
                  )}
                </FormItem>

                <span>
                  <h3 style={{ margin: "0 0 3px 0" }}>
                    3. Califica del 1(No me interesa) a 5 (Me interesa mucho), el siguiente aspecto:
                  </h3>
                </span>
                <FormItem
                  label="¿Estarías interesado en tomar un curso de React impartido por la comunidad React Bolivia?" 
                  style={{ width: "100%", padding: "3px" }}
                >
                  {getFieldDecorator("pregunta_11", {
                    rules: [
                      {
                        required: true,
                        message: "Por favor, seleccione una opción"
                      }
                    ]
                  })(
                    <RadioGroup name="pregunta_11">
                      <Radio value={1}>1</Radio>
                      <Radio value={2}>2</Radio>
                      <Radio value={3}>3</Radio>
                      <Radio value={4}>4</Radio>
                      <Radio value={5}>5</Radio>
                    </RadioGroup>
                  )}
                </FormItem>

                <FormItem
                  label="Queremos mejorar la comunidad de React Bolivia en sus próximos eventos, ¿tienes algún comentario, crítica o sugerencia?"
                  style={{ width: "100%", padding: "3px" }}
                >
                  {getFieldDecorator("pregunta_12", {
                    rules: [
                      {
                        required: true,
                        message: "Por favor, ingrese un comentario, crítica o sugerencia."
                      }
                    ]
                  })(
                    <TextArea
                      name="pregunta_12"
                      autosize={{ minRows: 2, maxRows: 6 }}
                      style={{ margin: "0 0 0 0" }}
                    />
                  )}
                </FormItem>
                <FormItem>
                  <Button type="primary" htmlType="submit">
                    Subir Encuesta
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

Surveyquestions.propTypes = {
  form: PropTypes.object
};

const RegisterSarvey = Form.create({})(Surveyquestions);

export default RegisterSarvey;
