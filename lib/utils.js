export const getDirectionBetweenTwoVectors = (start, end) => {
  return end.sub(start).normalize();
};

export const getRandomNumberBetween = (min, max) => {
    var min = Math.ceil(min);
    var max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min; 
};

