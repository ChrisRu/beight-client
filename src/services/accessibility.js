export const handleEnter = onClick => ({ key }) => {
  if (key === 'Enter') {
    onClick();
  }
};
