const user =require("../modles/register")
const bookidgen=require("bookidgen")
let referralCodeGenerator = require('referral-code-generator')



// Create user
const Register = async (req, res) => {
    let { username,
    email,
    refercode,
    password} = req.body;
  
    try {
      if (!(username,
        email,
        password)) {
        res.json({ message: "All fields are required", status: false });
      } else {

        const User = await user.create({
            username,
            email,
            password,
            id: bookidgen("ID", 14522, 199585),
            referral_code:referralCodeGenerator.alphaNumeric('uppercase', 4,5)
        });

        const bonus = await user.findOne({referral_code:refercode})
        if (bonus){
          let item=50
            let date= new Date;
            if (date.getDate()+"/"+date.getMonth()=="26/01" || date.getDate()+"/"+date.getMonth()=="02/10" || date.getDate()+"/"+date.getMonth()=="15/08" ){
              item=200
            }else if(date.getDay()==0 || date.getDate()==6){
              item=100
            }

            // get random item
             
            let value= bonus.refferalBonus + item
            const bonusupdate= await user.findOneAndUpdate({referral_code:refercode},{refferalBonus:value})
        }
  
        if (!User) {
          res.json({ message: "Your Signup is not successfull", status: false });
        } else {
          res.json({
            message: "Signup successfully",
            data: User,
            status: true,
          });
        }
      }
    } catch (error) {
      res.json({ message: error.message, status: false });
    }
  };

  //get all user

const getallUser = async (req, res) => {
    try {
      const User = await user.find();
      if (!User) {
        res.json({ message: "There is no user", status: false });
      } else {
        res.json({ message: "All users is found", data: User, status: true });
      }
    } catch (error) {
      res.json({ message: error.message, status: false });
    }
  };


  // get user details by id 

  const getUser = async (req, res) => {
   
    try {
      const User = await user.findOne({id:req.params.id});
      if (!User) {
        res.json({ message: "There is no id", status: false });
      } else {
        res.json({ message: "User is found", data: User, status: true });
      }
    } catch (error) {
      res.json({ message: error.message, status: false });
    }
  };
  module.exports={Register,getallUser,getUser}

