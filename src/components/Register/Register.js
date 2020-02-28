/* eslint no-unused-vars: 0 */
import { navigate } from "gatsby";
import {
  Divider, Select, Input,
  InputNumber, Checkbox, notification,
  Spin, Alert,Radio,
  Typography, Modal, Avatar,
  Row, Col
 } from "antd";

import reactLogo from './react-logo.png';

import Button from "antd/lib/button";
import Form from "antd/lib/form";

import PropTypes from "prop-types";
import React from "react";

import { ThemeContext } from "../../layouts";
import axios from "axios";
import "antd/dist/antd.min.css";

import events from './events';

// import "antd/lib/form/style/index.css";
// import "antd/lib/input/style/index.css";
// import "antd/lib/button/style/index.css";
// import "antd/lib/input-number/style/index.css";
// import "antd/lib/spin/style/index.css";

const FormItem = Form.Item;

const Option = Select.Option;

const Events = ({data, selectEvent}) => {
  if(data.length === 0) return <Alert message="No hay eventos activos" type="warning" />;
  return(
    data.map(e => (
      <Radio.Button
        onClick={() => selectEvent(e) }
        key={e.eventId} value={e.eventId}>
        { e.name }
      </Radio.Button>
    ))
  );
}

class Register extends React.Component {
  state = {
    // set to false to enable registry
    sendRegister: false,
    acceptPrivacy: false,
    selected: null,
    showModal: false,
    events: events
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

  selectEvent = (data) => this.setState({ selected: data })

  sendRegister = (values) => {
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
        if(that.state.selected.hasCost){
          that.setState({ showModal: true });
        }else{
          notification["success"]({
            message: "Mensaje",
            description: "Los datos fueron guardados con exito, muchas gracias."
          });
          setTimeout(() => {
            navigate("/");
          }, 2500);
        }
      })
      .catch(function(error) {
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
                description="El llenado del siguiente formulario, es con el propósito de tener los datos de
                nuestros participantes para de esa manera realizar la generación de los
                certificados digitales.
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
                          <Events
                            data={this.state.events}
                            selectEvent={this.selectEvent}/>
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
                  <FormItem label="Número de celular">
                    {getFieldDecorator("celular", {
                      rules: [
                        {
                          required: true,
                          message: "Por favor, ingrese su número de celuar",
                          whitespace: true,
                        }
                      ]
                    })(<Input name="celular" />)}
                  </FormItem>
                  <Form.Item>
                    {getFieldDecorator('privacy', {
                      valuePropName: 'checked',
                      initialValue: false,
                    })(<Checkbox onChange={() => this.setState({ acceptPrivacy: !this.state.acceptPrivacy })}>Acepto brindar mis datos para la organización del evento</Checkbox>)}
                  </Form.Item>
                  {/* <Alert message="Las inscripciones están cerradas" type="warning" /> */}
                  <FormItem>
                    <Button disabled={this.state.sendRegister || !this.state.acceptPrivacy} type="primary" htmlType="submit">
                      Registrarse
                    </Button>
                  </FormItem>
                </Form>
                <Modal
                  title="Felicitaciones, su registro fue realizado con éxito"
                  visible={this.state.showModal}
                  onOk={() => navigate("/")}
                  onCancel={() => navigate("/")}
                  cancelText={'Cerrar'}>
                    { this.state.showModal && this.state.selected &&
                    <>
                      <Row>
                        <Col span={2} offset={10} >
                          <img src={reactLogo} style={{width: 64, height: 64}}/>
                        </Col>
                      </Row>
                      <br/>
                      <p>
                        Tu registro para el evento <b>{`${this.state.selected.name}`}</b> fue realizado con éxito, el costo del evento es de: Bs.{`${this.state.selected.cost}`} con <b>cupos limitados</b> y no queremos que te pierdas esta gran oportunidad, es por eso que la comunidad React Bolivia implemento el método de pago electrónico "$imple" para verificar la asistencia de los participantes.
                        <br/>
                        <br/>
                        <a href="https://www.bithumano.com/que-es-simple-el-nuevo-sistema-de-pagos-en-bolivia/" target="_blank" style={{color: '#007AFF'}}>"$imple"</a>, es un método para realizar transacciones electrónicas implementado por ASOBAN, que permite realizar cobros o pagos a través de un código QR.
                        <br/>
                        <br/>
                        Si realizas el pago a través del código QR, obtendrás un <b>descuento del {`${this.state.selected.discount * 100}%, es decir que solo pagaras: Bs.${ (this.state.selected.cost) - (this.state.selected.cost * this.state.selected.discount) }`}</b>. Para realizar esta operación debes seguir los siguientes pasos:
                      </p>
                      <ol style={{margin: 20}}>
                        <li> Guarda el código QR que tienes debajo 👇 </li>
                        <li> Entra a la aplicación móvil de tu banco y busca la palabra clave "QR" o "Transferencias QR/Colectas", presiona en esa opción.</li>
                        <li> Selecciona el botón "Pagar".</li>
                        <li> Escanea el código QR que guardaste en el paso 1.</li>
                        <li> Verifica que la transacción fue realizada con éxito y <b>sácale un "screen shot" a tu recibo electrónico</b>, envía esa imagen a uno de nuestros canales:
                          <ul>
                            <li>Correo electrónico: <b>comunity.react.bolivia@gmail.com</b></li>
                            <li>Whatsapp de los números: <b>+591 70162630</b>, <b>+591 60684585</b></li>
                            <li>Messenger de la pagina <a href="http://m.me/ReactBolivia" target="_blank" style={{color: '#007AFF'}}>React Bolivia</a></li>
                          </ul>
                        </li>
                      </ol>
                      <a href={this.state.selected.qr} style={{color: '#007AFF'}} download>
                        Descargar QR de pago
                        <img src={this.state.selected.qr} />
                      </a>
                      <p>
                        <b> AYÚDANOS A CREAR UNA CULTURA DE COMERCIO ELECTRÓNICO EN BOLIVIA Y MUCHAS GRACIAS POR EL INTERÉS EN EL EVENTO {`"${this.state.selected.name}"`}, TE ESPERAMOS</b>
                      </p>
                      <br/>
                      <h4>Video tutorial $imple</h4>
                      <Row>
                          <iframe  src="https://www.youtube.com/embed/uvoqREm_oqA" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                      </Row>
                    </>
                    }
                </Modal>
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
