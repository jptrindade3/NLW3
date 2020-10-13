import React from 'react';
import {Link} from 'react-router-dom'; //permite fazer a navegação no estilo SPA
import {FiPlus} from 'react-icons/fi';
import {Map, TileLayer} from 'react-leaflet'; //Essa é uma biblioteca de mapas que iremos utilizar aqui. Para ela, devemos instalar o leaflet e o react-leaflet, além das tipagens pro TS
/* 
    Sobre o Leaflet, vale a pena comentar também que ele é utilizado
    para diferentes provedores dos mapas, sejam eles os que estamos 
    utilizando aqui(mapbox e openstreetmap), ou outros, como o google maps. O que precisamos
    fazer é mudar a url do TileLayer para se conectar com o provedor
    que estaremos utilizando
*/

import mapMarkerImg from '../images/map_marker.svg';
import '../styles/pages/orphanages-map.css';
import 'leaflet/dist/leaflet.css'; //O leaflet precisa desse arquivo pra poder organizar o mapa do jeito certo na página

function OrphanagesMap(){
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
                <TileLayer url={`https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`}/>
            </Map>
            
            <Link to="" className="create-orphanage">
                <FiPlus size={32} color="#FFF"/>
            </Link>
        </div>
    );
}

export default OrphanagesMap;