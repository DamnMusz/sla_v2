import React from 'react';
import autoBind from 'react-autobind';
import FeatureItem from './FeatureItem'

class FeaturesList extends React.Component {
  constructor(props) {
    super(props);
    autoBind(this);

    this.state =
      {
        features: [
          {
            key: 0,
            title: "SLA Asegurados",
            desc: "Estadísticas mensuales de los plazos de combinación y entrega de inspecciones por aseguradora.",
            icon: "mdi-av-equalizer"
          },
          {
            key: 1,
            title: "Resumen Ejecutivo Mensual",
            desc: "Tabla comparativa mensual entre aseguradoras de los plazos y porcentajes de realización.",
            icon: "mdi-action-assignment"
          },
          {
            key: 2,
            title: "Liquidación Siniestros",
            desc: "Utilitario para facturación de siniestros. Convierte un archivo .xls en un .txt formateado para importar al Gecom.",
            icon: "mdi-file-file-upload"
          },
          {
            key: 3,
            title: "Semestral Aseguradoras",
            desc: "Resumen semestral de volúmenes de inspecciones realizadas, agrupados por aseguradora.",
            icon: "mdi-communication-business"
          },
          {
            key: 4,
            title: "Semestral Inspectores",
            desc: "Resumen semestral de volúmenes de inspecciones realizadas, agrupados por inspector.",
            icon: "mdi-action-assignment-ind"
          },
          {
            key: 5,
            title: "Semestral Centros",
            desc: "Resumen semestral de volúmenes de inspecciones realizadas, agrupados por centro de inspección.",
            icon: "mdi-maps-directions-car"
          }
        ],
        listTitle: "Aplicaciones",
        listSubtitle: "“Create with the heart, build with the mind.”"
      };
  }
  render() {
    return (
      <section id="features" className="section">
        <div className="container">
          <div className="section-header">
            <h1 className="section-title wow fadeInRight" data-wow-duration="1000ms" data-wow-delay="100ms">{this.state.listTitle}</h1>
            <h2 className="section-subtitle wow fadeInRight" data-wow-duration="1000ms" data-wow-delay="400ms">{this.state.listSubtitle}</h2>
          </div>
          <div className="row">
          {
            this.state.features.map(function(feature, i) {
              return (
                <FeatureItem icon={feature.icon} title={feature.title} desc={feature.desc} key={i} />
              );
            })
          }
          </div>
        </div>
      </section>
    )
  }
};

export default FeaturesList;
