import React, { Component } from 'react';
import { View, StyleSheet, PixelRatio } from 'react-native';
import { Container, Content, CardItem, Thumbnail, Spinner, Text } from 'native-base';
import { connect } from 'react-redux';
import HTMLView from 'react-native-htmlview';

import { MyParsedText, Card, Error } from '../../components';
import I18n from '../../config/lang/i18';

const absolutePath = 'https://cosmari.e-lios.eu';

const InfoView = (title, val) => {
  const {
    rowContaner,
  } = styles;
  let parsedHtml = val.replace(/(<([^>]+)>)/ig, "");
  parsedHtml = parsedHtml.replace('&#039;', "'");
  return (
    <View style={rowContaner}>
        <Text
          style={{ fontSize: 12, fontWeight: 'bold', color: '#5c5c5c', flex: 1 }}
        >{title}: </Text>
        <Text style={{ flex: 2, textAlign: 'center' }} numberOfLines={15}>
          <MyParsedText>{parsedHtml}</MyParsedText>
        </Text>
    </View>
  );
};

class AboutCity extends Component {

  constructor(props) {
    super(props);
    this.state = {
      error: null  
    };
  }

  componentDidMount() {
    setTimeout(
      () => { 
        if (this.props.error !== null) {
          this.setState({
            error: true
          });
        }
       },
      15000
    );
  }

  renderText() {
   if (!this.props.loading) {
     const community = this.props.city;
     return (
       <Card style={{ flex: 0 }}>
           <CardItem style={{ justifyContent: 'center', alignItems: 'center' }} >
               <Thumbnail
                 size={50}
                 source={{ uri: absolutePath + community.ImagePath }}
               />
               <Text style={{ paddingLeft: 5 }}>
                  <HTMLView value={community.Nome} />
               </Text>
           </CardItem>

           <CardItem cardBody>
               {InfoView(I18n.t('info.aboutCity.IndirizzoComune'), community.CentriRaccolta[0].IndirizzoCentroDiRaccolta)}
               {InfoView(I18n.t('info.aboutCity.Centralino'), (community.NumeroTelefono).replace(/\/*\s*\.*/g, ''))}
               {InfoView(I18n.t('info.aboutCity.UfficioAmbiente'), community.UfficioAmbiente)}
               {InfoView(I18n.t('info.aboutCity.Indirizzo'), community.Indirizzo)}
               {InfoView(I18n.t('info.aboutCity.OrariodiApertura'), community.OrarioApertura)}
               {InfoView(I18n.t('info.aboutCity.Referente'), community.Referente)}
               {InfoView(I18n.t('info.aboutCity.Telefono'), (community.Telefono).replace(/\/*\s*\.*/g, ''))}
               {InfoView(I18n.t('info.aboutCity.Fax'), community.Fax)}
               {InfoView(I18n.t('info.aboutCity.Email'), community.Email)}
               {InfoView(I18n.t('info.aboutCity.SitoWeb'), ('http://' + community.SitoWeb))}
               {InfoView(I18n.t('info.aboutCity.RaccoltaEffettuatada'), community.Nome)}
               {InfoView(I18n.t('info.aboutCity.IndirizzoCentrodiRaccolta'), community.CentriRaccolta[0].IndirizzoCentroDiRaccolta)}
               {InfoView(I18n.t('info.aboutCity.OrarioCentrodiRaccolta'), community.CentriRaccolta[0].Orario)}
               {InfoView(I18n.t('info.aboutCity.DistribuzioneSacchetti'), community.DistribuzioneSacchetti)}
               {InfoView(I18n.t('info.aboutCity.RaccoltaDomiciliareIngombranti'), community.RaccoltaDomiciliareIngombranti)}
               {InfoView(I18n.t('info.aboutCity.RaccoltaDomiciliaredelVerde'), community.RaccoltaDomiciliareVerde)}
               {InfoView(I18n.t('info.aboutCity.InfopointTuristi'), community.RaccoltaDomiciliareIngombranti)}
               {InfoView(I18n.t('info.aboutCity.ContenitoriMedicinali'), community.ContenitoriMedicinali)}
               {InfoView(I18n.t('info.aboutCity.ContenitoriBatterie'), community.ContenitoriBatterie)}
               {InfoView(I18n.t('info.aboutCity.ContenitoriOliVegetaliEsausti'), community.ContenitoriOliVegataliEsausti)}
           </CardItem>
      </Card>
     );
   } else {
     return (
       <Card>
         <CardItem style={{ justifyContent: 'center', alignItems: 'center' }} >
           <Spinner color='green' size='large' />
         </CardItem>
       </Card>
     );
   }
 }

  render() {
    const {
      container,
    } = styles;

    return (
      <Container style={container}>
      {
        this.state.error !== null ?
        <View style={{ flex: 1 }} >
          <Error>{I18n.t('serverError')}</Error>
        </View> :
        <Content>
          {this.renderText()}
        </Content>
      }  
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingLeft: 5,
    paddingRight: 5,
    margin: 5,
  },
  rowContaner: {
    flexDirection: 'row',
    paddingBottom: 5,
    marginBottom: 5,
    borderColor: '#E0E0E0',
    borderBottomWidth: 1 / PixelRatio.get()
  }
});


const mapStateToProps = state => {
  return {
    city: state.city.city.Comune,
    loading: state.city.loading,
    error: state.city.error
   };
};

export default connect(mapStateToProps)(AboutCity);
