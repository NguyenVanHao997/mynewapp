export const getMaxTokensByRole = (role: string): number => {
  switch (role) {
    case "SUPER_ADMIN":
      return 10;
    case "ADMIN":
      return 5;
    default:
      return 1;
  }
};
