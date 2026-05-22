import Userservice from '../services/user-service.js'

const userService = new Userservice();

export const createUserAccount = async (req, res) => {
    try {
        const response = await userService.registerUserusingWallet(req.body.email,req.body.password,req.body.name,req.body.initialbalance);
        console.log(response)
        return res.status(201).json({
            success: true,
            message: "User and funded wallet created successfully",
            data: response,
            err:{}
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message || "Internal server error",
            err:error,
            data:{}
        });
    }
};