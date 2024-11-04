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
  } else if (value.length < 10) {
    return "Description must be at least 10 characters";
  } else if (value.length > 500) {
    return "Description must be at most 100 characters";
  }

  return null;
};

const validatePassword = (value) => {
  if (!value) {
    return "Password is required";
  } else if (value.length < 3) {
    return "Password must be at least 3 characters";
  } else if (value.length > 5) {
    return "Password must be at most 5 characters";
  }

  return null;
};

const validateEmail = (value) => {
  if (!value) {
    return "Email is required";
  } else if (!value.includes("@")) {
    return "Email must contain @";
  }

  return null;
};

const validateDueDate = (value) => {
  if (!value) {
    return "Due date is required";
  }

  const today = new Date();
  const date = new Date(value);

  if (date < today) {
    return "Due date cannot be in the past";
  }

  return null;
};

export {
  validateName,
  validateEmail,
  validateDueDate,
  validatePassword,
  validateDescription,
};
