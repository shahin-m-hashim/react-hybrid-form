const validateName = (value) => {
  if (!value) {
    return "Name is required";
  } else if (value.length < 3) {
    return "Name must be at least 3 characters";
  } else if (value.length > 20) {
    return "Name must be at most 20 characters";
  }

  return null;
};

const validateDescription = (value) => {
  if (!value) {
    return "Description is required";
  }

  /*
    else if (value.length < 10) {
      return "Description must be at least 10 characters";
    } else if (value.length > 100) {
      return "Description must be at most 100 characters";
    }
  */

  return null;
};

export { validateName, validateDescription };
