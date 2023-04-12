import userService from "../service/userService";
import jwt from "jsonwebtoken";
let handleLogin = async (req, res) => {
    let email = req.body.email;
    let password = req.body.password;

    if (!email || !password) {
        return res.status(200).json({
            errCore: 1,
            message: "Email or password is empty"
        })
    }

    let userData = await userService.handleUserLogin(email, password)

    return res.status(200).json({
        errCode: userData.errCode,
        message: userData.errMessage,
        user: userData.user ? userData.user : {},
        token: userData.token ? userData.token : ""
    })


}

let handleGetAllUsers = async (req, res) => {
    let userId = req.query.id;
    if (!userId) {
        return res.status(200).json({
            errCore: 1,
            message: "Id not exist",
            users: []
        })
    }
    let users = await userService.getAllUsers(userId)
    return res.status(200).json({
        errCode: 0,
        errMessage: "Get users success",
        users
    })

}
let handleCreateNewUser = async (req, res) => {
    let message = await userService.createNewUser(req.body)

    return res.status(200).json({
        message
    })
}
let handleDeleteUser = async (req, res) => {
    let userId = req.query.id;
    if (!userId) {
        return res.status(200).json({
            errCore: 1,
            message: "Id not exist"
        })
    }

    let message = await userService.deleteUser(userId)
    return res.status(200).json({

        message
    })
}
let handleEditUser = async (req, res) => {
    let data = req.body;
    let message = await userService.editUser(data)
    return res.status(200).json({
        message
    })
}

let handleGetAllCode = async (req, res) => {
    try {
        let data = await userService.getAllCode(req.query.type);
        return res.status(200).json({
            data
        })
    } catch (e) {
        console.log(e)
        return res.status(200).json({
            errCore: -1,
            errMessage: "Error from server"
        })
    }
}
let handlegetIdPatientByIdUser = async (req, res) => {
    try {
        let data = await userService.getIdPatientByIdUser(req.query.id);
        return res.status(200).json({
            errCode: 0,
            errMessage: "Get id patient success",
            data: data
        })
    } catch (e) {
        console.log(e)
        return res.status(200).json({
            errCore: -1,
            errMessage: "Error from server"
        })
    }
}

let handleCountUser = async (req, res) => {
    try {
        let data = await userService.countUser();
        return res.status(200).json({
            errCode: 0,
            errMessage: "Get count user success",
            data: data
        })
    } catch (e) {
        console.log(e)
        return res.status(200).json({
            errCore: -1,
            errMessage: "Error from server"
        })

    }
}
let handleCountPatient = async (req, res) => {
    try {
        let data = await userService.countPatient();
        return res.status(200).json({
            errCode: 0,
            errMessage: "Get count patient success",
            data: data
        })
    } catch (e) {
        console.log(e)
        return res.status(200).json({
            errCore: -1,
            errMessage: "Error from server"
        })
    }
}
let handleCountDoctor = async (req, res) => {
    try {
        let data = await userService.countDoctor();
        return res.status(200).json({
            errCode: 0,
            errMessage: "Get count doctor success",
            data: data
        })
    } catch (e) {
        console.log(e)
        return res.status(200).json({
            errCore: -1,
            errMessage: "Error from server"
        })
    }
}
let handleCountAdmin = async (req, res) => {
    try {
        let data = await userService.countAdmin();
        return res.status(200).json({
            errCode: 0,
            errMessage: "Get count Admin success",
            data: data
        })
    } catch (e) {
        console.log(e)
        return res.status(200).json({
            errCore: -1,
            errMessage: "Error from server"
        })
    }
}
let handleEditBookingComfirm = async (req, res) => {
    try {
        let data = await userService.editBookingComfirm(req.body);
        return res.status(200).json({
            errCode: 0,
            errMessage: "Edit booking comfirm success",
            data: data
        })
    } catch (e) {
        console.log(e)
        return res.status(200).json({
            errCore: -1,
            errMessage: "Error from server"
        })
    }
}
let changePassword = async (req, res) => {
    try {
        let data = await userService.changePassword(req.body);
        return res.status(200).json({
            errCode: 0,
            errMessage: "Change password success",
            data: data
        })
    } catch (e) {
        console.log(e)
        return res.status(200).json({
            errCore: -1,
            errMessage: "Error from server"
        })
    }
}





module.exports = {
    handleLogin: handleLogin,
    handleGetAllUsers: handleGetAllUsers,
    handleCreateNewUser: handleCreateNewUser,
    handleDeleteUser: handleDeleteUser,
    handleEditUser: handleEditUser,
    handleGetAllCode: handleGetAllCode,
    handlegetIdPatientByIdUser: handlegetIdPatientByIdUser,
    handleCountUser: handleCountUser,
    handleCountPatient: handleCountPatient,
    handleCountDoctor: handleCountDoctor,
    handleCountAdmin: handleCountAdmin,
    handleEditBookingComfirm: handleEditBookingComfirm,
    changePassword: changePassword



}