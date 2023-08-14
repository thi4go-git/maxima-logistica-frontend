import { Component, EventEmitter, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Loader } from '@googlemaps/js-api-loader';
import { Coordenada } from 'src/app/entity/coordenada';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-cliente-mapa-visualizar',
  templateUrl: './cliente-mapa-visualizar.component.html',
  styleUrls: ['./cliente-mapa-visualizar.component.css']
})
export class ClienteMapaVisualizarComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public coordenada: Coordenada,
  ) { }

  linkEndereco: string = '';

  ngOnInit(): void {
    this.mostrarLocalizacaoNoMapa();
  }

  mostrarLocalizacaoNoMapa() {

    const latitude = this.coordenada.latitude;
    const longitude = this.coordenada.longitude;

    if (latitude == 0 || longitude == 0 ||
      latitude == undefined || longitude == undefined) {
      alert("Informe a latitude e longitude!")
    } else {
      const mapElement = document.getElementById("mapa-tela");
      if (mapElement) {
        let loader = new Loader({
          apiKey: environment.tokenGoogleMaps
        })
        loader.load().then(() => {
          const localizacao = { lat: latitude, lng: longitude };
          const localizacaoMapa = new google.maps.Map(mapElement, {
            center: localizacao,
            zoom: 16,
          });
          const marcarLocalizacaoNoMapa = new google.maps.Marker({
            position: localizacao,
            map: localizacaoMapa,
            title: "Minha Localização",
          });
          this.linkEndereco = `https://www.google.com/maps?q=${latitude},${longitude}`;

        });
      }
    }
  }


}