"use client";

import { RadioButton } from "@/components";
import NasaApod from "@/components/NasaApod";
import Image from "next/image";
import { useState } from "react";
import { useNasa } from "@/hooks/useNasa";

export default function Home() {
  // Para manejar los radiobutton, interfaz del usuario por eso estas declaraciones quedan en el page
  const [modo, setModo] = useState("");
  const [fecha, setFecha] = useState("");
  const [count, setCount] = useState("");

  const { datosNasa, cargando, error, consultarNASA, limpiarResultado } = useNasa();

  // null - respuesta de la API y "" - respuesta del usuarip
  const manejoModo = (e) => {
    const valor = e.target.value;
    const hoyFormatoNasa = new Intl.DateTimeFormat('en-CA').format(new Date()); // Esta línea la busqué para que quedara con el mismo formato que da el API de la NASA

    setModo(valor);
    setFecha(hoyFormatoNasa);
    setCount(1);

    if (valor === "hoy") {
      setFecha(hoyFormatoNasa);
    } else if (valor === "especifica") {
      setFecha("");
    } else if (valor === "aleatoria") {
      setCount(1);
    }
    limpiarResultado();
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

        <button className="rounded-2xl bg-blue-800 hover:bg-blue-400 transition-colors text-white font-medium my-3.5 mx-3.5 px-6 py-3" id="buscar" onClick={() => consultarNASA(modo, fecha, count)} disabled={cargando}>
          Consultar NASA APOD
        </button>

        <button className="rounded-2xl bg-transparent border border-grey text-white transition-colors hover:bg-gray-400 font-medium my-3.5 px-6 py-3" id="borrar" onClick={limpiarResultado} >
          Limpiar resultado
        </button>

        {cargando && <p className="text-center animate-bounce my-5">Cargando datos de las estrellas... 🚀🌌</p>}

        {error && <p className="text-red-500 text-center my-5">{error}</p>}

        {datosNasa && datosNasa.map((item, index) => (
          <NasaApod key={index} item={item} />
        ))}
      </div>
    </div>
  );
}
