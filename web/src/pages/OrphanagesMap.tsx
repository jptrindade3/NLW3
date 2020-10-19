import React, {useEffect, useState} from 'react';
import {Link} from 'react-router-dom'; //permite fazer a navegação no estilo SPA
import {FiPlus, FiArrowRight} from 'react-icons/fi';
import {Map, TileLayer, Marker, Popup} from 'react-leaflet'; //Essa é uma biblioteca de mapas que iremos utilizar aqui. Para ela, devemos instalar o leaflet e o react-leaflet, além das tipagens pro TS

/* 
    Sobre o Leaflet, vale a pena comentar também que ele é utilizado
    para diferentes provedores dos mapas, sejam eles os que estamos 
    utilizando aqui(mapbox e openstreetmap), ou outros, como o google maps. O que precisamos
    fazer é mudar a url do TileLayer para se conectar com o provedor
    que estaremos utilizando
*/

import mapMarkerImg from '../images/map_marker.svg';
import mapIcon from './../utils/mapIcon';
import api from './../services/api';

import '../styles/pages/orphanages-map.css';
import 'leaflet/dist/leaflet.css'; //O leaflet precisa desse arquivo pra poder organizar o mapa do jeito certo na página

interface Orphanage { //Como só vamos utilizar essas informações na página, não precisamos fazer uma interface com tudo
    id: number;
    latitude: number;
    longitude: number;
    name: string;
}

function OrphanagesMap(){
    const [orphanages, setOrphanages] = useState<Orphanage[]>([]); //
    /*
        Toda vez que o estado muda ele recarrega todo o componente,
        por isso precisamos do useEffect, se não iriam ser mutias 
        requisições.
        Agora que temos a nossa interface, precisamos preparar o 
        useState para receber informações nesse formato, sendo em um
        vetor ainda (Generic).

    */
    useEffect(() => {
        api.get('orphanages/').then(res => { //estamos acessando a rota get /orphanages. O resto da URL foi declarado no arquivo da api
            setOrphanages(res.data);//essa requisição nos retorna muitas coisas do back, mas o que queremos é a instância data no momento, que vem com todos os orfanatos registrados
        });
    }, []);
    /*
        A função useEffect serve para ser executada assim que o
        componente for exibido em tela. Assim que o mapa for
        carregado, queremos puxar a lista de orfanatos cadastrados.

        Passamos como primeiro parâmetro o que queremos executar, e
        o segundo parâmetro é quando iremos executar o que desejamos.
        Esse parâmetro do quando é um vetor em que suas posições guardam
        componentes e constantes que podem ser alteradas, e a ação
        só é executada quando á a mudança nos valores de algo que 
        esteja registrado nesse vetor. 
        
        Isso tem que ser feito porque um componente sempre recarrega na 
        página, várias vezes, e se colocarmos a chamada da api normalmente 
        dentro do componente, sem o controle do useEffect, qualquer 
        atualização vai gerar uma requisição do banco, o que pode deixar a 
        aplicação bem lenta.

        Se deixamos esse vetor vazio, a função só é executada no primeiro
        carregamento do componente.

    */

    return(
        <div id="page-map">
            <aside>
                <header>
                    <img src={mapMarkerImg} alt="Happy"/>

                    <h2>Escolha um orfanato no mapa</h2>
                    <p>Muitas crianças estão esperando a sua visita :)</p>
                </header>

                <footer>
                   <strong>Belo Horizonte</strong>
                   <span>Minas Gerais</span> 
                </footer>
            </aside>

            <Map
                center={[-19.9227385,-43.9473516]}
                zoom={14}
                style={{width: '100%', height: '100%'}}
            >
                {/* <TileLayer url="https://a.tile.openstreetmap.org/{z}/{x}/{y}.png"/> */}
                <TileLayer 
                    url={`https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`}
                />

                {orphanages.map(orphanage => { //Utilizamos o map e não o forEach porque o map tem retorno ao percorrer, o forEach só percorre
                    return(
                        <Marker
                            icon = {mapIcon}
                            position={[orphanage.latitude,orphanage.longitude]}
                            key = {orphanage.id}
                        >
                            <Popup
                                closeButton = {false} //o popup não vem com o botão de fechar
                                minWidth={248}
                                maxWidth={248}
                                className="map-popup"
                            >
                                {orphanage.name}
                                <Link to={`/orphanages/${orphanage.id}`}>
                                    <FiArrowRight size={20} color="#FFF" />
                                </Link>
                            </Popup>
                        </Marker>
                    );
                })}
            </Map>
            
            <Link to="orphanages/create" className="create-orphanage">
                <FiPlus size={32} color="#FFF"/>
            </Link>
        </div>
    );
}

export default OrphanagesMap;