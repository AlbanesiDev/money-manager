/* eslint-disable @typescript-eslint/no-explicit-any */
export const createAddaptedUser = (user: any) => {
  const formattedUser: any = {
    id: user.id,
    name: user.name,
    email: user.email,
  };
  return formattedUser;
};
