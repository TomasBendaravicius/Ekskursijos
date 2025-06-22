import { useState } from "react";
import EkskursijaForm from "./EkskursijaForm";
import { updateEkskursija } from "../services/updateEkskursija";
import { postEkskursija } from "../services/postEkskursija";
import { deleteEkskursija } from "../services/deleteEkskursija";
import axios from "axios";

function Ekskursija({ ekskursija, onDelete, onUpdate, onCreate, user }) {
  const { id, pavadinimas, kaina, data1, data2, trukme, vertinimas } = ekskursija || {};
  const [showEditForm, setShowEditForm] = useState(false);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [userRating, setUserRating] = useState(0);
  const [avgRating, setAvgRating] = useState(vertinimas);

  const generateEkskursijaCode = () => {
    const timestamp = Date.now();
    const randomSuffix = Math.floor(Math.random() * 1000);
    return `EXK-${timestamp}-${randomSuffix}`;
  };

  const handleUpdate = async (updatedEkskursija) => {
    try {
      const updatedData = await updateEkskursija(id, updatedEkskursija);
      onUpdate && onUpdate(id, updatedData);
      setShowEditForm(false);
    } catch (error) {}
  };

  const handleCreate = async (newEkskursija) => {
    try {
      const ekskursijaWithCode = {
        ...newEkskursija,
        kodas: generateEkskursijaCode(),
      };
      const createdEkskursija = await postEkskursija(ekskursijaWithCode);
      onCreate && onCreate(createdEkskursija);
      setShowCreateForm(false);
    } catch (error) {}
  };

  const handleDelete = async (id) => {
    try {
      await deleteEkskursija(id);
      onDelete && onDelete(id);
    } catch (error) {}
  };

  const getVertinimasColor = (vertinimas) => {
    if (!vertinimas) return "bg-gray-200 text-gray-800";
    if (Number(vertinimas) >= 8) return "bg-green-200 text-green-800";
    if (Number(vertinimas) >= 5) return "bg-yellow-200 text-yellow-800";
    return "bg-red-200 text-red-800";
  };

  const handleRatingSubmit = async () => {
    try {
      await axios.post("http://localhost:3030/api/v1/ekskursijos/" + id + "/vertinimas", { vertinimas: userRating }, { withCredentials: true });
      const res = await axios.get("http://localhost:3030/api/v1/ekskursijos/" + id + "/vidutinis-vertinimas", { withCredentials: true });
      setAvgRating(res.data.vidutinisVertinimas);
    } catch (err) {}
  };

  const handleRegister = async (ekskursijaId) => {
    try {
      await axios.post(
        "http://localhost:3030/api/v1/registracijos",
        {
          ekskursija_id: ekskursijaId,
          pasirinkta_data: ekskursija.data1
        },
        { withCredentials: true }
      );
      alert("Sėkmingai užsiregistravote į ekskursiją!");
    } catch (error) {
      alert("Nepavyko užsiregistruoti: " + error.message);
    }
  };

  return (
    <div className="ekskursija-card">
      {ekskursija ? (
        <>
          <div className="ekskursija-details flex flex-col md:flex-row gap-4">
            {ekskursija.nuotrauka && (
              <img
                src={ekskursija.nuotrauka}
                alt={ekskursija.pavadinimas}
                className="w-full md:w-60 h-60 object-cover rounded shadow"
                style={{ maxWidth: "240px" }}
              />
            )}
            <div className="flex-1 flex flex-col gap-2">
              <h3 className="text-2xl font-bold">{pavadinimas}</h3>
              {ekskursija.aprasymas && (
                <p className="text-base text-gray-700 mb-2">{ekskursija.aprasymas}</p>
              )}
              <p className="text-sm">Ekskursijos datos nuo: {data1}</p>
              <p className="text-sm">Ekskursijos datos iki: {data2}</p>
              <p className="text-sm">Kaina: {kaina} Eur</p>
              <p className="text-sm">Trukmė: {trukme}</p>
              <p className="text-sm">
                Vidutinis vertinimas:
                <span className="ml-2">
                  {avgRating ? Number(avgRating).toFixed(2) : "Nėra"}
                </span>
              </p>
              <p className="text-sm">
                Grupinė ekskursija: <span className="font-semibold">
                  {ekskursija.grupine ? "Taip" : "Ne"}
                </span>
              </p>
              <div>
                <label>Jūsų vertinimas: </label>
                <select value={userRating} onChange={e => setUserRating(Number(e.target.value))}>
                  <option value={0}> Pasirinkite</option>
                  {[...Array(10)].map((_, i) => (
                    <option key={i + 1} value={i + 1}>{i + 1}</option>
                  ))}
                </select>
                <button
                  className="ml-2 btn"
                  onClick={handleRatingSubmit}
                  disabled={userRating < 1}
                >
                  Siųsti jūsų vertinimą
                </button>
              </div>
              {user && user.role === "user" && (
                <button
                  className="bg-blue-500 text-white px-4 py-2 rounded"
                  onClick={() => handleRegister(ekskursija.id)}
                >
                  Užsirašyti
                </button>
              )}
            </div>
          </div>
          {user && user.role === "admin" && (
            <div className="ekskursija-actions flex gap-2 mt-4">
              <button
                className="bg-blue-200 hover:bg-blue-700 text-black hover:text-white font-bold py-2 px-4 rounded cursor-pointer"
                onClick={() => setShowEditForm(!showEditForm)}
              >
                {showEditForm ? "Atšaukti" : "Redaguoti"}
              </button>
              <button
                className="bg-red-200 hover:bg-red-700 text-black hover:text-white font-bold py-2 px-4 rounded cursor-pointer"
                onClick={() => handleDelete(id)}
              >
                Ištrinti
              </button>
            </div>
          )}
          {showEditForm && (
            <EkskursijaForm ekskursija={ekskursija} onSubmit={handleUpdate} />
          )}
        </>
      ) : (
        <>
          <button
            className="bg-green-200 hover:bg-green-700 text-black hover:text-white font-bold py-2 px-4 rounded cursor-pointer"
            onClick={() => setShowCreateForm(!showCreateForm)}
          >
            {showCreateForm ? "Atšaukti" : "Sukurti ekskursiją"}
          </button>
          {showCreateForm && <EkskursijaForm onSubmit={handleCreate} />}
        </>
      )}
    </div>
  );
}

export default Ekskursija;