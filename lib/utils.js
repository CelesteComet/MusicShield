export const getDirectionBetweenTwoVectors = (start, end) => {
  return end.sub(start).normalize();
};

export const getRandomNumberBetween = (min, max) => {
    var min = Math.ceil(min);
    var max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min; 
};

// export const getRandomNumberBetweenOneAndNegativeOne = () => {
//   num *= Math.floor(Math.random()*2) == 1 ? 1 : -1; // this will add minus sign in 50% of cases
// }

