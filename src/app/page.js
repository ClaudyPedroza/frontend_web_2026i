"use client";

import { RadioButton } from "@/components";
import Image from "next/image";
import { useState } from "react";

const URL = "https://api.nasa.gov/planetary/apod";
const API_KEY = "TFc5A92bfsTe54hj6QpiONFmcHTyULo7gO1bD0Bn";


export default function Home() {

  // Para manejar los radiobutton
  const [modo, setModo] = useState("");
  const [fecha, setFecha] = useState("");
  const [count, setCount] = useState("");

  // Manejar los estados de la API recibidos, cargando y error
  const [datosNasa, setDatosNasa] = useState(null); //variable para manejar cuando lleguen los datos OK👍🏻
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState(null);

  // null - respuesta de la API y "" - respuesta del usuarip
  const manejoModo = (e) => {
    const valor = e.target.value;
    const hoyFormatoNasa = new Intl.DateTimeFormat('en-CA').format(new Date()); // Esta línea la busqué para que quedara con el mismo formato que da el API de la NASA

    setModo(valor);
    setFecha(hoyFormatoNasa);
    setCount(1);
    setDatosNasa(null);
    setCargando(false);
    setError(null);
  }

  const consultarNasa = () => {
    if (!modo) return //si no está seleccionado no hace nada
    setCargando(true)
    let url_final = `${URL}?api_key=${API_KEY}` // Expresión de js 
    if (modo === "especifica" && fecha) {
      url_final += `&date=${fecha}`
    } else if (modo === "aleatoria") {
      url_final += `&count=${count}`
    }
    //Consumir API mediante el fetch
    fetch(url_final).then((response) => {
      if (!response.ok) throw new Error("Error al consultar el API de la NASA")
      return response.json();
    }).then((datos) => {
      console.log("Los datos estan aqui", datos);
      if (Array.isArray(datos)) {
        setDatosNasa(datos);
      } else {
        setDatosNasa([datos]);
      } setCargando(false);
    }).catch((err) => {
      setError(err.message)
      setCargando(false);
    })
  }

  const limpiarResultado = () => {
    setModo("");
    setFecha("");
    setDatosNasa(null);
    setCargando(false);
    setError(null);
  }

  return (
    <div className="mx-8 my-5 py-6 px-4 bg-linear-to-b from-slate-900 via-purple-900 to-slate-900 text-white font-sans dark:bg-black border-2 rounded-3xl border-gray-300 text-2xl">
      <h1 className="font-bold">Ejercicio REACT: NASA APOD 🚀🌌</h1>
      <div className="border-gray-300 rounded-3xl border-2 text-xl mx-8 my-5 py-6 px-4">
        <h2 className="font-bold">1. Modo de consulta</h2>
        <ul className="flex gap-6">
          <li>
            <RadioButton
              className="text-white"
              name="modo"
              value="hoy"
              label="Foto de hoy"
              checked={modo === "hoy"}
              onChange={manejoModo}>
            </RadioButton>
          </li>
          <li>
            <RadioButton
              className="text-white"
              name="modo"
              value="especifica"
              label="Fecha especifica"
              checked={modo === "especifica"}
              onChange={manejoModo}>
            </RadioButton>
          </li>
          <li>
            <RadioButton
              className="text-white"
              name="modo"
              value="aleatoria"
              label="Aleatorias (count)"
              checked={modo === "aleatoria"}
              onChange={manejoModo}>
            </RadioButton>
          </li>
        </ul>

        {modo && (
          <div className="my-2 py-2">
            {modo === "hoy" && (
              <div>
                <h2 className="font-bold"> 2. Fecha hoy </h2>
                <p className="border-2 border-gray-300 rounded-xl px-4 py-2 mt-1 w-1/2 text-base text-white"> {fecha} </p>
              </div>
            )}
            {modo === "especifica" && (
              <div>
                <h2 className="font-bold"> 2. Fecha especifica </h2>
                <input className="border-2 border-gray-300 rounded-xl px-4 py-2 mt-1 w-1/2 text-base"
                  type="date" value={fecha} onChange={(e) => setFecha(e.target.value)}>
                </input>
              </div>
            )}
            {modo === "aleatoria" && (
              <div>
                <h2 className="font-bold"> 2. Aleatorias (count) </h2>
                <input className="border-2 border-gray-300 rounded-xl px-4 py-2 mt-1 w-1/2 text-base"
                  type="number" value={count} min="1" max="10" onChange={(e) => setCount(e.target.value)}>
                </input>
              </div>
            )}

          </div>
        )}

        <button className="rounded-2xl bg-blue-800 hover:bg-blue-400 transition-colors text-white font-medium my-3.5 mx-3.5 px-6 py-3" id="buscar" onClick={consultarNasa} disabled={cargando}>
          Consultar NASA APOD
        </button>

        <button className="rounded-2xl bg-transparent border border-grey text-white transition-colors hover:bg-gray-400 font-medium my-3.5 px-6 py-3" id="borrar" onClick={limpiarResultado} >
          Limpiar resultado
        </button>

        {cargando && <p className="text-center animate-bounce my-5">Cargando datos de las estrellas... 🚀🌌</p>}

        {error && <p className="text-red-500 text-center my-5">{error}</p>}

        {datosNasa && datosNasa.map((item, index) => (
          <div key={index} className="border-gray-300 rounded-3xl border-2 text-xl mx-8 my-5 py-8 px-8 bg-white/10 backdrop-blur-md text-white dark:bg-zinc-900">
            <h2 className="font-bold text-3xl mb-2">{item.title}</h2>
            <p className="text-white mb-4">{item.date}</p>

            <div className="flex justify-center mb-6">
              {item.media_type === "image" ? (
                <img src={item.url} alt={item.title} className="rounded-xl max-w-full h-auto shadow-lg" />
              ) : (
                <a href={item.url} target="_blank" className="text-blue-600 underline">
                  Abrir video en una nueva pestaña
                </a>
              )}
            </div>

            <p className="text-lg leading-relaxed text-justify">
              {item.explanation}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
