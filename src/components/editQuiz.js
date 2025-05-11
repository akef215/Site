import React, { useEffect, useState } from "react";
import "./styles/CreateQuiz.css";
import "./styles/General.css";
import BtnX from "./pic/btnX.png";
import Illustration from "../images/photo1.png";
import { useNavigate, useParams } from "react-router-dom";

const InputField = ({ placeholder, value, onChange }) => {
  return (
    <input
      type="text"
      placeholder={placeholder}
      className="quiz-name-input"
      value={value}
      onChange={onChange}
    />
  );
};

const SelectDropdown = ({
  label,
  options = [],
  selectedOption,
  onChange,
  disabled = false,
}) => {
  const safeOptions = Array.isArray(options) ? options : [];

  return (
    <select
      className="select-elem"
      value={selectedOption}
      onChange={(e) => onChange(e.target.value)}
      disabled={disabled}
    >
      <option value="">{label}</option>
      {safeOptions.map((opt, index) => {
        const value = opt.code || opt.id || "";
        return (
          <option key={index} value={value}>
            {value}
          </option>
        );
      })}
    </select>
  );
};

const EditQuiz = () => {
  const [quizName, setQuizName] = useState("");
  const [duree, setDuree] = useState("");
  const [modules, setModules] = useState([]);
  const [classes, setClasses] = useState([]);

  const [selectedModule, setSelectedModule] = useState(null);
  const [selectedClass, setSelectedClass] = useState(null);
  const [selectedType, setSelectedType] = useState(1);
  const { id } = useParams();
  const navigate = useNavigate();
  const API_URL = process.env.REACT_APP_API_URL;

  // Fetch modules & classes
  useEffect(() => {
    fetch(`${API_URL}/teachers/modules`)
      .then((res) => res.json())
      .then((data) => setModules(data))
      .catch((err) => console.error(err));

    fetch(`${API_URL}/teachers/groupes`)
      .then((res) => res.json())
      .then((data) => setClasses(data))
      .catch((err) => console.error(err));
  }, []);

  // Fetch quiz details
  useEffect(() => {
    if (!id) return;

    fetch(`${API_URL}/quizzes/quiz/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setQuizName(data.title || "");
        setSelectedModule(
          data.module_code
            ? { code: data.module_code }
            : null
        );
        setSelectedClass(
          data.groupe_id
            ? { id: data.groupe_id }
            : null
        );
        if (data.duree) {
          setDuree(data.duree);
        }
      })
      .catch((err) => {
        console.error("Erreur fetch quiz :", err);
      });
  }, [id]);

  const handleNextClick = async () => {
    const today = new Date().toISOString().split("T")[0];
    const durationInMinutes = parseFloat(duree);
    const payload = {
      title: quizName,
      date: today,
      module_code: selectedModule?.code,
      duree: durationInMinutes,
    };

    try {
      const res = await fetch(`${API_URL}/quizzes/modify/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (res.status === 200) {
        const data = await res.json();
        setSelectedType(data.type_quizz);
        if (data.id) {
          navigate(`/addQuiz${data.type_quizz}/${data.id}`);
        } else {
          console.error("ID manquant dans la réponse du serveur.");
        }
      } else {
        console.error("Erreur lors de la modification :", res.status);
      }
    } catch (err) {
      console.error("Erreur d'envoi :", err);
    }
  };

  const handleCloseButtonClick = () => {
    navigate("../Select");
  };

  const handleCancelClick = () => {
    navigate(`/addQuiz/${id}`);
  };

  return (
    <div className="outerRectangle">
      <div className="innerRectangle">
        <div className="close-button-container">
          <button
            onClick={handleCloseButtonClick}
            style={{ border: "none", background: "none", cursor: "pointer" }}
          >
            <img src={BtnX} alt="btnX" />
          </button>
        </div>

        <h1>Edit Quiz</h1>

        <div className="content-container">
          <div className="form-container">
            <InputField
              placeholder="Quiz Name"
              value={quizName}
              onChange={(e) => setQuizName(e.target.value)}
            />

            <SelectDropdown
              label="Select Module"
              options={modules}
              selectedOption={selectedModule?.code || ""}
              onChange={(code) => {
                const selected = modules.find((m) => m.code === code);
                setSelectedModule(selected || null);
              }}
            />

            <SelectDropdown
              label="Select Class"
              options={classes}
              selectedOption={selectedClass?.id || ""}
              onChange={(id) => {
                const selected = classes.find((c) => c.id === id);
                setSelectedClass(selected || null);
              }}
            />

            <InputField
              placeholder="Durée (minutes)"
              value={duree}
              onChange={(e) => setDuree(e.target.value)}
            />
          </div>

          <div className="img-section">
            <img src={Illustration} alt="Illustration" className="img-fluid" />
          </div>
        </div>

        <div className="action-buttons">
          <button className="cancel-button" onClick={handleCancelClick}>
            Cancel
          </button>
          <button className="next-button" onClick={handleNextClick}>
            Edit
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditQuiz;
