const convertImage = async (file) => {
  // expecting e.target.files[0]
  const reader = new FileReader();
  reader.readAsDataURL(file);
  await new Promise((resolve) => {
    reader.onloadend = () => {
      resolve();
    };
  });
  return reader.result;
};

export default convertImage;
