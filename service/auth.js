// const jwt=require("jsonwebtoken");
// const secret="Piyush$123@$"
// const sessionIdToUserMap= new Map();

// function setUser(user){
//    return jwt.sign(user,secret);
// }
// function getUser(token){
//     if(!token)return null;
//     return jwt.verify(token,secret);
// }
// module.exports={
//     setUser,getUser
// }
const jwt = require("jsonwebtoken");

const secret = "Piyush$123@$";

function setUser(user) {
  // ONLY safe data in token
  return jwt.sign(
    { _id: user._id, email: user.email },
    secret,
    { expiresIn: "7d" }
  );
}

function getUser(token) {
  if (!token) return null;
  try {
    return jwt.verify(token, secret);
  } catch (err) {
    return null;
  }
}

module.exports = {
  setUser,
  getUser,
};
