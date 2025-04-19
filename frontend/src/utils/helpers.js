export const getColorByDimension = (dimension) => {
    switch (dimension.toLowerCase()) {
      case "architecture":
        return "#5D9AD0";
      case "history":
        return "#3CC435";
      case "archeology":
        return "#D662C4";
      default:
        return "#D05D5F";
    }
  };
  