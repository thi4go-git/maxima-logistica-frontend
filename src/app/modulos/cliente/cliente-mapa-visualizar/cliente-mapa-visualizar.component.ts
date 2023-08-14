import { Component, Inject, OnInit } from '@angular/core';
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
      const mapElement = document.getElementById("mapa-tela");//referencia ao ID da div que mostrará
      if (mapElement) {//Verifica se existe a DIV com id map no HTML
        let loader = new Loader({
          apiKey: environment.tokenGoogleMaps
        })
        loader.load().then(() => { //faz aparecer o map na div definida HTML = mostra-localizacao"
          //nesse exemplo: <div class="full" id="map"></div
          const localizacao = { lat: latitude, lng: longitude };
          //CArrega a lozalização1 através das cordenadas
          const localizacaoMapa = new google.maps.Map(mapElement, {
            center: localizacao,
            zoom: 16,
          });
          //Marca a localização no mapa com alfinete
          const marcarLocalizacaoNoMapa = new google.maps.Marker({
            position: localizacao,
            map: localizacaoMapa,
            title: "Minha Localização",
          });

          // this.linkEndereco = `https://www.google.com/maps?q=${this.latitude},${this.longitude}`;

        });
      }
    }
  }


}
