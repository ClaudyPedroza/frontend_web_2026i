const URL = "https://api.nasa.gov/planetary/apod";
const API_KEY = "TFc5A92bfsTe54hj6QpiONFmcHTyULo7gO1bD0Bn";

//Correcion de .then a async, buena practica en la actualidad para consumir el API
export const fetchNasaData = async (modo, fecha, count) => {
  //logica de mi anterior codigo
    let url_final = `${URL}?api_key=${API_KEY}`;
  
  if (modo === "especifica" && fecha) {
    url_final += `&date=${fecha}`;
  } else if (modo === "aleatoria" && count) {
    url_final += `&count=${count}`;
  }
  //espera hasta que la API de la NASA de una respuesta
  const response = await fetch(url_final); 
  if (!response.ok) throw new Error("Error al consultar el API de la NASA");
  //se espera que la respuesta se convierta en obj para que sea mas facil el .map()
  const datos = await response.json();
  return Array.isArray(datos) ? datos : [datos];
};