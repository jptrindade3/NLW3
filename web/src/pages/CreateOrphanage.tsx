import React, {ChangeEvent, FormEvent, useState} from "react";
import { Map, Marker, TileLayer } from 'react-leaflet';
import {LeafletMouseEvent} from 'leaflet';
import api from './../services/api';
import { FiPlus } from "react-icons/fi";
import { useHistory } from 'react-router-dom';

import Sidebar from "../components/Sidebar";
import mapIcon from "../utils/mapIcon";

import '../styles/pages/create-orphanage.css';

interface OrphanageInfo {
  name: string;
  about: string;
  instructions: string;
  opening_hours: string;
  latitude: number;
  longitude: number;
  open_on_weekends: boolean;
}

const orphanageDefaultInfo : OrphanageInfo = {
  name: '',
  about: '',
  instructions: '',
  opening_hours: '',
  latitude: 0,
  longitude: 0,
  open_on_weekends: false 
}

export default function CreateOrphanage() {
  const[orphanageInfo, setOrphanageInfo] = useState<OrphanageInfo>(orphanageDefaultInfo);
  const [openOnWeekends, setOpenOnWeekends] = useState(false);
  const [images, setImages] = useState<File[]>([]);
  const [previewImages, setPreviewImages] = useState<string[]>([]);
  const history = useHistory();

  function handleMapClick(e : LeafletMouseEvent) {//Função que pega a lat e long do click no mapa
    const {lat, lng} = e.latlng;
    
    setOrphanageInfo({
      ...orphanageInfo,
      latitude: lat,
      longitude: lng
    });
  }

  function handleChange(e : any) {
    const key = e.target.getAttribute('name');
    const eValue = e.target.value;

    setOrphanageInfo({
      ...orphanageInfo,
      [key]: eValue
    });
  }
  
  function setBoolean(e: any, bool: boolean) {
    setOpenOnWeekends(bool);
    handleChange(e);
  }

  async function handleSubmit(e : FormEvent) {
    e.preventDefault();

    const data = new FormData(); //lembra que pra enviar arquivos eles não podem ir em json?
  
    data.append('name', orphanageInfo.name);
    data.append('latitude', String(orphanageInfo.latitude));
    data.append('longitude', String(orphanageInfo.longitude));
    data.append('about', orphanageInfo.about);
    data.append('instructions', orphanageInfo.instructions);
    data.append('opening_hours', orphanageInfo.opening_hours);
    data.append('open_on_weekends', String(orphanageInfo.open_on_weekends));
    images.forEach(image => { // são muitas imagens para enviar em um só apend, entçao temos que fazer um for each para enviar cada uma individualmente
      data.append('images', image);
    });

    await api.post('orphanages', data);

    alert('Cadastro feito com sucesso!!!');

    history.push('/app');
  }


  function handleSelectedImages(e : ChangeEvent<HTMLInputElement>) {
    if(!e.target.files){
      return;
    }

    const selectedImages = Array.from(e.target.files);

    setImages(selectedImages);

    const selectedImagesPreview = selectedImages.map(image => {
      return URL.createObjectURL(image);
    });

    setPreviewImages(selectedImagesPreview);
  }

  return (
    <div id="page-create-orphanage">
      <Sidebar/>

      <main>
        <form onSubmit={handleSubmit} className="create-orphanage-form">
          <fieldset>
            <legend>Dados</legend>

            <Map 
              center={[-19.9227385,-43.9473516]} 
              style={{ width: '100%', height: 280 }}
              zoom={15}
              onClick={handleMapClick}
            >
              <TileLayer 
                url={`https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`}
              />

              {orphanageInfo.latitude !== 0 ? ( //quando clicando no mapa, pega a latitude e longitude e gera um icone marcador
                <Marker 
                  interactive={false} 
                  icon={mapIcon} 
                  position={[
                    orphanageInfo.latitude,
                    orphanageInfo.longitude
                  ]} 
                />
              ) : (
                null
              )}
            </Map>

            <div className="input-block">
              <label htmlFor="name">Nome</label>
              <input 
                id="name"
                name="name"
                value={orphanageInfo.name}
                onChange={e => handleChange(e)} 
              />
            </div>

            <div className="input-block">
              <label htmlFor="about">Sobre <span>Máximo de 300 caracteres</span></label>
              <textarea 
                id="name" 
                maxLength={300} 
                name="about"
                value={orphanageInfo.about}
                onChange={e => handleChange(e)} 
              />
            </div>

            <div className="input-block">
              <label htmlFor="images">Fotos</label>

              <div className="images-container">
                {previewImages.map(image => {
                  return(
                    <img key={image} src={image} alt={orphanageInfo.name}/>
                  );
                })}

                <label htmlFor="image[]" className="new-image">
                  <FiPlus size={24} color="#15b6d6" />
                </label>
              </div>

              <input 
                multiple type="file" 
                id="image[]"
                onChange={e => handleSelectedImages(e)}
              />

            </div>
          </fieldset>

          <fieldset>
            <legend>Visitação</legend>

            <div className="input-block">
              <label htmlFor="instructions">Instruções</label>
              <textarea 
                id="instructions" 
                name="instructions"
                value={orphanageInfo.instructions}
                onChange={e => handleChange(e)} 
              />
            </div>

            <div className="input-block">
              <label htmlFor="opening_hours">Horário de funcionamento</label>
              <input 
                id="opening_hours"
                name="opening_hours"
                value={orphanageInfo.opening_hours}
                onChange={e => handleChange(e)}  
              />
            </div>

            <div className="input-block">
              <label htmlFor="open_on_weekends">Atende fim de semana</label>

              <div className="button-select">
                <button 
                  type="button" 
                  className={
                    openOnWeekends ? 'active' : ''
                  }
                  name="open_on_weekends"
                  value = "true"
                  onClick = {e => setBoolean(e, true)}
                >
                  Sim
                </button>
                <button 
                  type="button"
                  className={
                    !openOnWeekends ? 'active' : ''
                  }
                  name="open_on_weekends"
                  value = "false"
                  onClick = {e => setBoolean(e, false)}
                >
                  Não
                </button>
              </div>
            </div>
          </fieldset>

          <button className="confirm-button" type="submit">
            Confirmar
          </button>
        </form>
      </main>
    </div>
  );
}

// return `https://a.tile.openstreetmap.org/${z}/${x}/${y}.png`;
