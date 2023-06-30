import { useState } from "react";
const usePasswordGenrater = () => {
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const passwordGenrate = (checkBoxes, length) => {
    let genratedPassword = "";
    let charSet = "";
    const selectedBox = checkBoxes.filter((item) => item.status);
    // console.log(selectedBox.length);
    if (selectedBox.length === 0) {
      setErrorMessage("please select ateast one option");
      setPassword("");
      return;
    }
    selectedBox.forEach((option) => {
      switch (option.title) {
        case "include UpperCase Characters":
          charSet += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
          break;
        case "include LowerCase Characters":
          charSet += "abcdefghijklmnopqrstuvwxyz";
          break;
        case "include Numbers":
          charSet += "0123456789";
          break;
        case "include Symbol":
          charSet += "~@#$%^&*";
          break;
        default:
          break;
      }
    });

    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * charSet.length);
      genratedPassword += charSet[randomIndex];
    }
    setPassword(genratedPassword);
    setErrorMessage("");
  };
  return { password, errorMessage, passwordGenrate };
};

export default usePasswordGenrater;
