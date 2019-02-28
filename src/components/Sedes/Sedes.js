import React from "react";
import { Row, Col, Card } from "antd";
const { Meta } = Card;
import "antd/lib/card/style/index.css";
// import "antd/lib/row/style/index.css";
// import "antd/lib/col/style/index.css";
import LpImage from "./../../images/jpg/lp.jpg";
import CbbaImage from "./../../images/jpg/cbba.jpg";
const Sedes = props => {
  return (
    <React.Fragment>
      <header>
        La comunidad de ReactBolivia se esta expandiendo, al comienzo solo teniamos una Sede
        principal en la ciudad de La Paz, ahora en Marzo de 2019, junto a compañeros, amigos,
        colegas nos estamos expandiendo a la ciudad de Cochabamba. La comunidad de ReactBolivia se
        esta expandiendo, al comienzo solo teniamos una Sede principal en la ciudad de La Paz, ahora
        en Marzo de 2019, junto a compañeros, amigos, colegas nos estamos expandiendo a la ciudad de
        Cochabamba. Una misión de este año, es poder llegar a tener muchas mas sedes en los demás
        departamentos de Bolivia.
      </header>
      <br />
      <Card
        hoverable
        style={{ width: "80%", height: "auto", margin: "auto" }}
        cover={<img alt="example" src={LpImage} />}
      >
        <Meta title="Ciudad de La Paz" />
      </Card>
      <br />
      <Card
        hoverable
        style={{ width: "80%", height: "auto", margin: "auto" }}
        cover={<img alt="example" src={CbbaImage} />}
      >
        <Meta title="Ciudad de Cochabamba" />
      </Card>
    </React.Fragment>
  );
};

Sedes.propTypes = {};

export default Sedes;
