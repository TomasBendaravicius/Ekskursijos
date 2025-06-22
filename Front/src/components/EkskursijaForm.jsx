import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";


function EkskursijaForm({ ekskursija, onSubmit }) {
  const [error, setError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm({
    mode: "onBlur",
    defaultValues: {
      pavadinimas: ekskursija?.pavadinimas || "",
      kaina: ekskursija?.kaina || "",
      data1: ekskursija?.data1 || "",
      data2: ekskursija?.data2 || "",
      trukme: ekskursija?.trukme || "",
    },
  });

  useEffect(() => {
  if (ekskursija) {
    setValue("pavadinimas", ekskursija.pavadinimas, { shouldValidate: true });
    setValue("kaina", ekskursija.kaina, { shouldValidate: true });
    setValue("data1", ekskursija.data1, { shouldValidate: true });
    setValue("data2", ekskursija.data2, { shouldValidate: true });
    setValue("trukme", ekskursija.trukme, { shouldValidate: true });
    setValue("nuotrauka", ekskursija.nuotrauka, { shouldValidate: true });
    setValue("aprasymas", ekskursija.aprasymas, { shouldValidate: true });
    setValue("grupine", ekskursija.grupine ? "true" : "false", { shouldValidate: true }); // <-- pridėta
  }
}, [ekskursija, setValue]);

  // ...toliau kaip buvo...

  const updateVertinimasColor = (vertinimas) => {
    if (!vertinimas) setVertinimasColor("bg-gray-200");
    else if (Number(vertinimas) >= 8) setVertinimasColor("bg-green-200");
    else if (Number(vertinimas) >= 5) setVertinimasColor("bg-yellow-200");
    else setVertinimasColor("bg-red-200");
  };

  const handleVertinimasChange = (event) => {
    const value = event.target.value;
    updateVertinimasColor(value);
  };

  const formSubmitHandler = async (data) => {
  // Konvertuojam grupine iš string į boolean
  data.grupine = data.grupine === "true";
  try {
    await onSubmit(data);
    if (!ekskursija) reset();
  } catch (error) {
    setError(error.message);
  }
};

  return (
    <form onSubmit={handleSubmit(formSubmitHandler)} className="ekskursija-form">
  <h2 >{ekskursija ? "Redaguoti ekskursiją" : "Sukurti ekskursiją"}</h2>
  {error && <p className="text-red-600 font-bold">{error}</p>}

  <div className="form-group">
    <label htmlFor="pavadinimas">Pavadinimas</label>
    <input
      className="bg-gray-200 rounded p-1 m-2 w-full"
      type="text"
      id="pavadinimas"
      name="pavadinimas"
      {...register("pavadinimas", { required: "Pavadinimas yra privalomas" })}
    />
    {errors.pavadinimas && <p className="error">{errors.pavadinimas.message}</p>}
  </div>
  <div className="form-group">
  <label htmlFor="grupine">Ar ekskursija grupinė?</label>
  <select
    id="grupine"
    name="grupine"
    className="bg-gray-200 rounded p-1 m-2 w-full"
    {...register("grupine", { required: "Pasirinkite ar grupinė" })}
    
  >
    <option value="true">Taip</option>
    <option value="false">Ne</option>
  </select>
  {errors.grupine && <p className="error">{errors.grupine.message}</p>}
</div>

  <div className="form-group">
    <label htmlFor="kaina">Kaina (EUR)</label>
    <input
      className="bg-gray-200 rounded p-1 m-2 w-full"
      type="number"
      id="kaina"
      name="kaina"
      {...register("kaina", { required: "Kaina yra privaloma" })}
    />
    {errors.kaina && <p className="error">{errors.kaina.message}</p>}
  </div>

  <div className="form-group">
    <label htmlFor="data1">Data nuo</label>
    <input
      className="bg-gray-200 rounded p-1 m-2"
      placeholder="YYYY-MM-DD"
      type="date"
      id="data1"
      name="data1"
      {...register("data1", { required: "Pradžios data yra privaloma" })}
    />
    {errors.data1 && <p className="error">{errors.data1.message}</p>}
  </div>

  <div className="form-group">
    <label htmlFor="data2">Data iki</label>
    <input
      className="bg-gray-200 rounded p-1 m-2"
      placeholder="YYYY-MM-DD"
      type="date"
      id="data2"
      name="data2"
      {...register("data2", { required: "Pabaigos data yra privaloma" })}
    />
    {errors.data2 && <p className="error">{errors.data2.message}</p>}
  </div>

  <div className="form-group">
    <label htmlFor="trukme">Trukmė</label>
    <input
      className="bg-gray-200 rounded p-1 m-2 w-full"
      type="text"
      id="trukme"
      name="trukme"
      {...register("trukme", { required: "Trukmė yra privaloma" })}
    />
    {errors.trukme && <p className="error">{errors.trukme.message}</p>}
  </div>
  <div className="form-group">
  <label htmlFor="nuotrauka">Nuotraukos URL</label>
  <input
    className="bg-gray-200 rounded p-1 m-2 w-full"
    type="text"
    id="nuotrauka"
    name="nuotrauka"
    {...register("nuotrauka", { required: "Nuotraukos URL yra privalomas" })}
  />
  {errors.nuotrauka && <p className="error">{errors.nuotrauka.message}</p>}
</div>

<div className="form-group">
  <label htmlFor="aprasymas">Aprašymas</label>
  <textarea
    className="bg-gray-200 rounded p-1 m-2 w-full"
    id="aprasymas"
    name="aprasymas"
    rows={3}
    {...register("aprasymas", { required: "Aprašymas yra privalomas" })}
  />
  {errors.aprasymas && <p className="error">{errors.aprasymas.message}</p>}
</div>

  <button
    className="bg-blue-400 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded cursor-pointer"
    type="submit"
  >
    {ekskursija ? "Atnaujinti" : "Sukurti"}
  </button>
</form>
  );
}

export default EkskursijaForm;