import { getSession } from "next-auth/react";

const isAuthenticatedUser = async (req, res, next) => {
  const session = await getSession({ req });

  if (!session) {
    return res.status(401).json({error : "Login first to access this route"})
  }

  req.user = session.user;

  next();
};

export { isAuthenticatedUser };