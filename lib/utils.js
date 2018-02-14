export const getDirectionBetweenTwoVectors = (start, end) => {
  return end.sub(start).normalize();
};

