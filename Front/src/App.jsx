import EkskursijaForm from "./components/EkskursijaForm";
import LoginForm from "./components/LoginForm";
import { useState, useEffect, useContext } from "react";
import { getAllEkskursijos } from "./services/getEkskursijos";
import EkskursijuList from "./components/EkskursijuList";
import { Routes, Route } from "react-router";
import NavBar from "./components/NavBar";
import { UserContext } from "../contexts/userContext";
import ManoEkskursijos from "./components/ManoEkskursijos";

function App() {
  const [ekskursijos, setEkskursijos] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  const { user } = useContext(UserContext);

  const fetchEkskursijos = async () => {
    try {
      const ekskursijosList = await getAllEkskursijos();
      setEkskursijos(ekskursijosList.data.ekskursijos);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  // <-- Svarbiausia pataisa čia!
  useEffect(() => {
    fetchEkskursijos();
    // eslint-disable-next-line
  }, []);

  return (
    <div className="p-4 m-5 bg-gray-100 rounded-lg shadow-md">
      <NavBar />
      {loading && <p className="text-center text-gray-500">Kraunama...</p>}

      {error ? (
        <p className="text-center text-red-500">{error}</p>
      ) : (
        <Routes>
          <Route
            path="/"
            element={
              <EkskursijuList
                ekskursijos={ekskursijos}
                setEkskursijos={setEkskursijos}
                user={user}
              />
            }
          />
          <Route path="/mano-ekskursijos" element={<ManoEkskursijos />} />
          <Route
            path="/all-ekskursijos"
            element={
              <EkskursijuList
                ekskursijos={ekskursijos}
                setEkskursijos={setEkskursijos}
                user={user}
              />
            }
          />
          <Route path="/login" element={<LoginForm />} />
          {user && user.role === "admin" && (
            <Route
              path="/create-ekskursija"
              element={<EkskursijaForm onSubmit={fetchEkskursijos} />}
            />
          )}
        </Routes>
      )}
      <footer className="text-center m-4 text-gray-700">
        All rights reserved by Tomas Bendaravičius © 2025
      </footer>
    </div>
  );
}

export default App;
