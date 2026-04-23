import { useState } from "react";
import { fetchNasaData } from "@/services/nasaServices";

export function useNasa() {
    // Manejar los estados de la API recibidos, cargando y error
    const [datosNasa, setDatosNasa] = useState(null); //variable para manejar cuando lleguen los datos OK👍🏻
    const [cargando, setCargando] = useState(false);
    const [error, setError] = useState(null);

    const consultarNASA = async (modo, fecha, count) => {
        setCargando(true);
        setError(null);

        try {
            const datos = await fetchNasaData(modo, fecha, count);
            setDatosNasa(datos);
        } catch (err) {
            setError(err.message);
        } finally {
            setCargando(false)
        }
    }
    const limpiarResultado = () => {
        setDatosNasa(null);
        setCargando(false);
        setError(null);
    }
    
    return { datosNasa, cargando, error, consultarNASA, limpiarResultado };
}