import * as faIcons from "@fortawesome/free-solid-svg-icons";
import { Category } from "../../domain/entities";

export interface IconList {
  title: string;
  icons: Category[];
}

const defaultIconList: IconList[] = [
  {
    title: "Comidas",
    icons: [
      { icon: faIcons.faAppleAlt, label: "Fruta" },
      { icon: faIcons.faBacon, label: "Carne" },
      { icon: faIcons.faBeer, label: "Cerveza" },
      { icon: faIcons.faCoffee, label: "Café" },
      { icon: faIcons.faPizzaSlice, label: "Pizza" },
      { icon: faIcons.faHamburger, label: "Hamburguesa" },
      { icon: faIcons.faHotdog, label: "Perro Caliente" },
    ],
  },
  {
    title: "Transporte",
    icons: [
      { icon: faIcons.faCar, label: "Coche" },
      { icon: faIcons.faGasPump, label: "Combustible" },
      { icon: faIcons.faTaxi, label: "Taxi" },
      { icon: faIcons.faBus, label: "Autobús" },
      { icon: faIcons.faBicycle, label: "Bicicleta" },
      { icon: faIcons.faMotorcycle, label: "Motocicleta" },
      { icon: faIcons.faTrain, label: "Tren" },
    ],
  },
  {
    title: "compras",
    icons: [
      { icon: faIcons.faShirt, label: "Camisa" },
      { icon: faIcons.faGift, label: "Regalo" },
      { icon: faIcons.faShoppingCart, label: "Shopping" },
      { icon: faIcons.faHatCowboy, label: "Sombrero" },
      { icon: faIcons.faTshirt, label: "Camiseta" },
    ],
  },
  {
    title: "entretenimiento",
    icons: [
      { icon: faIcons.faFootballBall, label: "Fútbol" },
      { icon: faIcons.faGamepad, label: "Video juegos" },
      { icon: faIcons.faFilm, label: "Película" },
      { icon: faIcons.faMusic, label: "Música" },
      { icon: faIcons.faTheaterMasks, label: "Teatro" },
    ],
  },
  {
    title: "aptitud",
    icons: [
      { icon: faIcons.faDumbbell, label: "Gimnasio" },
      { icon: faIcons.faBicycle, label: "Bicicleta" },
      { icon: faIcons.faSwimmer, label: "Natación" },
      { icon: faIcons.faHiking, label: "Senderismo" },
      { icon: faIcons.faRunning, label: "Correr" },
    ],
  },
  {
    title: "medicina",
    icons: [
      { icon: faIcons.faHospital, label: "Hospital" },
      { icon: faIcons.faPills, label: "Medicamentos" },
      { icon: faIcons.faStethoscope, label: "Estudios" },
      { icon: faIcons.faFirstAid, label: "Primeros Auxilios" },
    ],
  },
  {
    title: "familia",
    icons: [
      { icon: faIcons.faBaby, label: "Bebé" },
      { icon: faIcons.faDog, label: "Perro" },
      { icon: faIcons.faCat, label: "Gato" },
      { icon: faIcons.faChild, label: "Niño" },
      { icon: faIcons.faHouseUser, label: "Casa" },
    ],
  },
  {
    title: "muebles",
    icons: [
      { icon: faIcons.faCouch, label: "Sofá" },
      { icon: faIcons.faBed, label: "Cama" },
      { icon: faIcons.faChair, label: "Silla" },
      { icon: faIcons.faLightbulb, label: "Lámpara" },
      { icon: faIcons.faCouch, label: "Sofá" },
    ],
  },
  {
    title: "electronica",
    icons: [
      { icon: faIcons.faLaptop, label: "Laptop" },
      { icon: faIcons.faMobileAlt, label: "Móvil" },
      { icon: faIcons.faTv, label: "Televisor" },
      { icon: faIcons.faTabletAlt, label: "Tablet" },
      { icon: faIcons.faCamera, label: "Cámara" },
      { icon: faIcons.faHeadphones, label: "Auriculares" },
      { icon: faIcons.faKeyboard, label: "Teclado" },
    ],
  },
  {
    title: "educacion",
    icons: [
      { icon: faIcons.faBook, label: "Libro" },
      { icon: faIcons.faChalkboardTeacher, label: "Profesor" },
      { icon: faIcons.faGraduationCap, label: "Graduación" },
      { icon: faIcons.faPaintBrush, label: "Arte" },
      { icon: faIcons.faGlobe, label: "Geografía" },
      { icon: faIcons.faSchool, label: "Instituto" },
    ],
  },
  {
    title: "personal",
    icons: [
      { icon: faIcons.faBrush, label: "Cepillo" },
      { icon: faIcons.faCut, label: "Corte" },
      { icon: faIcons.faSpa, label: "Spa" },
      { icon: faIcons.faShower, label: "Ducha" },
      { icon: faIcons.faSoap, label: "Jabón" },
      { icon: faIcons.faScissors, label: "Corte" },
    ],
  },
  {
    title: "vida",
    icons: [
      { icon: faIcons.faPlane, label: "Viaje" },
      { icon: faIcons.faCampground, label: "Campamento" },
      { icon: faIcons.faHotel, label: "Hotel" },
      { icon: faIcons.faMountain, label: "Montaña" },
    ],
  },
  {
    title: "ingresos",
    icons: [
      { icon: faIcons.faMoneyBillWave, label: "Efectivo" },
      { icon: faIcons.faCreditCard, label: "Tarjeta de Crédito" },
      { icon: faIcons.faPiggyBank, label: "Ahorros" },
      { icon: faIcons.faDollarSign, label: "Dólares" },
      { icon: faIcons.faCoins, label: "Ingresos" },
      { icon: faIcons.faWallet, label: "Cartera" },
      { icon: faIcons.faReceipt, label: "Recibo" },
    ],
  },
];

export { defaultIconList };
