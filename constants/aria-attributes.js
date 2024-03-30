export const ariaDiv = (title, description, role) => {
  return {
    role: role,
    "aria-label": title,
    "aria-description": description,
    title: title,
  };
};
