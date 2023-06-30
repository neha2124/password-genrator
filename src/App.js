import "./styles.css";
import { useState } from "react";
import usePasswordGenrater from "./upload/hooks";

export default function App() {
  const [length, setLength] = useState(4);
  const [checkBoxes, setCheckBoxes] = useState([
    { title: "include UpperCase Characters", status: false },
    { title: "include LowerCase Characters", status: false },
    { title: "include Numbers", status: false },
    { title: "include Symbol", status: false }
  ]);
  const [copied, setCopied] = useState(false);
  const handleCheckboxChanges = (index) => {
    let updateCheckboxes = [...checkBoxes];
    updateCheckboxes[index].status = !updateCheckboxes[index].status;
    setCheckBoxes(updateCheckboxes);
  };
  // console.log(checkBoxes)
  // console.log(password);
  const handleCopy = async () => {
    if (password) {
      await navigator.clipboard.writeText(password);
      setCopied(true);
      setTimeout(() => {
        setCopied(false);
      }, 1000);
    }
  };
  const { password, errorMessage, passwordGenrate } = usePasswordGenrater();

  // console.log(handleCpoied())
  // console.log(password);
  return (
    <div className="container">
      {/* password and copy button */}
      {password && (
        <div className="header">
          <p className="title">{password}</p>
          <button onClick={handleCopy}>{copied ? "copied" : "copy"}</button>
        </div>
      )}
      {/* character length rangee */}
      <div className="character-length">
        <span>
          <label>Character Length</label>
          <label>{length}</label>
        </span>
        <input
          type="range"
          min="4"
          max="20"
          onChange={(e) => setLength(e.target.value)}
          className="password-range"
        />
      </div>
      {/* checkboxes */}
      <div className="checkBoxes">
        {checkBoxes.map((item, index) => {
          return (
            <div key={index}>
              <input
                type="checkbox"
                onClick={() => handleCheckboxChanges(index)}
                checked={item.state}
              />
              <label>{item.title}</label>
            </div>
          );
        })}
      </div>
      {/* strength */}
      {errorMessage && <div className="errorMessage">{errorMessage}</div>}
      {/* genrate button */}
      <button
        className="genrate-btn"
        onClick={() => passwordGenrate(checkBoxes, length)}
      >
        Genrate-Button
      </button>
    </div>
  );
}
