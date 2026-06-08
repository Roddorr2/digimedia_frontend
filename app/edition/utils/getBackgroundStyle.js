export const getBackgroundStyle = (bgColor = "#1E40AF", bgType = "solid", bgColors = "") => {
  if (!bgColor && !bgColors) return {};

  const colors = bgColors ? bgColors.split(",").map(c => c.trim()).filter(Boolean) : [bgColor];

  if (colors.length === 1) {
    return { backgroundColor: colors[0] };
  }

  if (colors.length === 2) {
    return { backgroundImage: `linear-gradient(to right, ${colors[0]}, ${colors[1]})` };
  }

  if (colors.length >= 3) {
    return { backgroundImage: `linear-gradient(135deg, ${colors[0]}, ${colors[1]}, ${colors[2]})` };
  }

  return { backgroundColor: bgColor };
};