// import jwt from "jsonwebtoken";

// const auth = (req, res, next) => {
//   const token = req.header("Authorization");

//   if (!token) {
//     return res.status(401).json({ message: "No token, access denied" });
//   }

//   try {
//     const verified = jwt.verify(token, "secretkey123");
//     req.user = verified;
//     next();
//   } catch (err) {
//     res.status(400).json({ message: "Invalid token" });
//   }
// };

// export default auth;



import jwt from "jsonwebtoken";

const auth = (req, res, next) => {
  const token = req.header("Authorization");

  if (!token) {
    return res.status(401).json({
      message: "No token, access denied"
    });
  }

  try {
    const verified = jwt.verify(token, "secretkey123");

    console.log("TOKEN VERIFIED:", verified);

    req.user = verified;
    next();

  } catch (err) {
    console.log("AUTH ERROR:", err.message);

    return res.status(400).json({
      message: "Invalid token"
    });
  }
};

export default auth;