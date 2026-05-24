import JWT, { ExtractJwt } from 'passport-jwt';
import User from '../models/usermodel.js'
import dotenv from "dotenv";
dotenv.config();
const Jwtstrategy=JWT.Strategy;
const extractjwt=JWT.ExtractJwt;
const opts={
  jwtFromRequest:ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey:process.env.JWT_SECRET
}
export const  passportAuth=(passport)=>{
  passport.use(new Jwtstrategy(opts,async(jwt_payload,done)=>{
    const user =await  User.findById(jwt_payload.id);
     if(!user){
      done(null,false);
     }
     else{
      done(null,user);
     }
  }))
}