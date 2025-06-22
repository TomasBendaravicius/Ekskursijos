import React, { useState } from "react";
import axios from "axios";
import Ekskursija from "./Ekskursija";
import EkskursijaForm from "./EkskursijaForm";

function EkskursijuList({ ekskursijos, setEkskursijos, user }) {
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [alertMsg, setAlertMsg] = useState("");
    const [grupineFilter, setGrupineFilter] = useState("all");
    const [searchTitle, setSearchTitle] = useState("");
    const [searchDate, setSearchDate] = useState("");

    const handleCreateEkskursija = async (data) => {
        try {
            const res = await axios.post(
                `${import.meta.env.VITE_API_URL}/ekskursijos`,
                data,
                { withCredentials: true }
            );
            setAlertMsg("Ekskursija sukurta sėkmingai!");
            setEkskursijos((prev) => [...prev, res.data.data.ekskursija]);
            setShowCreateModal(false);
        } catch (error) {
            setAlertMsg("Klaida: ekskursijos sukurti nepavyko!");
        }
    };

    const filteredEkskursijos = ekskursijos.filter((ekskursija) => {
        if (grupineFilter === "true" && ekskursija.grupine !== true) return false;
        if (grupineFilter === "false" && ekskursija.grupine !== false) return false;
        if (
            searchTitle &&
            !ekskursija.pavadinimas.toLowerCase().includes(searchTitle.toLowerCase())
        ) {
            return false;
        }
        if (
            searchDate &&
            !(searchDate >= ekskursija.data1 && searchDate <= ekskursija.data2)
        ) {
            return false;
        }
        return true;
    });

    return (
        <div>
            <div className="flex flex-col md:flex-row gap-4 mb-4">
                <input
                    type="text"
                    placeholder="Ieškoti pagal pavadinimą"
                    className="p-2 rounded border"
                    value={searchTitle}
                    onChange={e => setSearchTitle(e.target.value)}
                />
                <input
                    type="date"
                    placeholder="Ieškoti pagal datą"
                    className="p-2 rounded border"
                    value={searchDate}
                    onChange={e => setSearchDate(e.target.value)}
                />
            </div>

            <div className="mb-4">
                <select
                    className="px-6 py-3 text-lg font-bold rounded bg-blue-400 text-white transition-colors duration-200 hover:bg-blue-600 hover:text-white"
                    value={grupineFilter}
                    onChange={e => setGrupineFilter(e.target.value)}
                >
                    <option value="all">Visos ekskursijos</option>
                    <option value="true">Tik grupinės</option>
                    <option value="false">Tik individualios</option>
                </select>
            </div>

            {user?.role === "admin" && (
                <button
                    className="bg-green-500 m-5 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mb-4"
                    onClick={() => setShowCreateModal(true)}
                >
                    Sukurti naują ekskursiją
                </button>
            )}

            <h2 className="text-4xl font-bold  m-4">Ekskursijų sąrašas</h2>
            {alertMsg && (
                <div className="bg-blue-100 text-blue-800 p-2 rounded mb-2">{alertMsg}</div>
            )}

            {showCreateModal && (
                <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
                    <div className="bg-white  p-6 rounded shadow-lg relative">
                        <button
                            className="absolute top-2 right-2 text-xl"
                            onClick={() => setShowCreateModal(false)}
                        >
                            &times;
                        </button>
                        <EkskursijaForm onSubmit={handleCreateEkskursija} />
                    </div>
                </div>
            )}

            {filteredEkskursijos.length === 0 ? (
                <p>Nėra ekskursijų.</p>
            ) : (
                filteredEkskursijos.map((ekskursija) => (
                    <Ekskursija key={ekskursija.id} ekskursija={ekskursija} user={user} />
                ))
            )}
        </div>
    );
}

export default EkskursijuList;