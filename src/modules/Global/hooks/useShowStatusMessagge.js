export default function useShowStatusMessagge() {
  //type: 'inputAlert' - 'MessageAlert' - 'InputAndMessageAlert'
  const showStatusMessage = (type, alertType, values) => {
    const { errorContainer, inputs, message } = values;

    alertType === "InputAndMessageAlert" &&
      showInputAndMessageAlert(type, errorContainer, inputs, message);

    alertType === "inputAlert" &&
      showInputAlert(type, errorContainer, inputs, message);

    alertType === "MessageAlert" &&
      showMessageAlert(type, errorContainer, message);
  };

  //inputs: arreglo con elementos a modificar en el DOM
  //message: arreglo de strings. Indica cual de los inputs tiene un error
  const showInputAndMessageAlert = (type, errorContainer, inputs, message) => {
    //Mostrar contenedor de errores en el DOM
    setTypeContainer(type, errorContainer);

    //Eliminar errores anteriores
    removeContainerMessages(errorContainer);

    for (let i = 0; i < inputs.length; i++) {
      //message[x]: Si hay error valdra "true"
      if (message[i]) {
        // Marcar error en el input del formulario
        inputs[i].classList.add("is-invalid");

        // Agregar mensaje de error al DOM
        createDomElement([errorContainer, "span", message[i]]);
        createDomElement([errorContainer, "br"]);
      } else {
        //Quitar error marcado en el formulario
        changeClass(inputs[i], "is-invalid", "is-valid");
      }
    }
  };

  const showInputAlert = (type, errorContainer, inputs, message) => {
    //Mostrar contenedor de errores en el DOM
    setTypeContainer(type, errorContainer);

    //Eliminar errores anteriores
    removeContainerMessages(errorContainer);

    for (let i = 0; i < inputs.length; i++) {
      //message[x]: Si hay error valdra "true"
      if (message[i]) {
        // Marcar error en el input del formulario
        inputs[i].classList.add("is-invalid");
      } else {
        //Quitar error marcado en el formulario
        changeClass(inputs[i], "is-invalid", "is-valid");
      }
    }
  };

  const showMessageAlert = (type, errorContainer, message) => {
    //Mostrar contenedor de errores en el DOM
    setTypeContainer(type, errorContainer);

    //Eliminar errores anteriores
    removeContainerMessages(errorContainer);

    for (let i = 0; i < message.length; i++) {
      // Agregar mensaje de error al DOM
      createDomElement([errorContainer, "span", message[i]]);
      createDomElement([errorContainer, "br"]);
    }
  };

  const hideFormAlerts = (errorsContainer, inputs) => {
    //Eliminar errores anteriores
    removeContainerMessages(errorsContainer);

    //Ocultar contenedor de errores en el DOM
    changeClass(errorsContainer, "visible", "invisible");

    for (let aux = 0; aux < inputs.length; aux++) {
      inputs[aux].classList.remove("is-invalid");
      inputs[aux].classList.remove("is-valid");
    }
  };

  return {
    showStatusMessage,
    hideFormAlerts,
  };
}

const createDomElement = ([parent, elementType, elementContent]) => {
  const newElement = document.createElement(elementType);
  if (elementType !== "br") newElement.textContent = elementContent;
  parent.appendChild(newElement);
};

const removeContainerMessages = (errorsContainer) => {
  while (errorsContainer.children.length > 0) {
    errorsContainer.children[errorsContainer.children.length - 1].remove();
  }
};

const setTypeContainer = (type, errorsContainer) => {
  if (type === "success") {
    errorsContainer.classList.remove("invisible");
    errorsContainer.classList.add("visible");
    errorsContainer.classList.remove("text-danger");
    errorsContainer.classList.add("text-success");
    errorsContainer.classList.remove("border-danger");
    errorsContainer.classList.add("border-success");
  } else {
    errorsContainer.classList.remove("invisible");
    errorsContainer.classList.add("visible");
    errorsContainer.classList.remove("text-success");
    errorsContainer.classList.add("text-danger");
    errorsContainer.classList.remove("border-success");
    errorsContainer.classList.add("border-danger");
  }
};

const changeClass = (element, deleteClass, newClass) => {
  element.classList.remove(deleteClass);
  element.classList.add(newClass);
};
