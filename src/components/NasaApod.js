export default function NasaApod({ item }) {
    return(
    <div className="border-gray-300 rounded-3xl border-2 text-xl mx-8 my-5 py-8 px-8 bg-white/10 backdrop-blur-md text-white dark:bg-zinc-900">
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
)}