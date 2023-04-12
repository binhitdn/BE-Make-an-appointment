import db from "../models/index";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
var salt = bcrypt.genSaltSync(10);
let handleUserLogin = (email, password) => {
    return new Promise(async (resolve, reject) => {
        try {
            let userData = {}
            let isExist = await checkUserEmail(email)
            if (isExist) {
                let user = await db.users.findOne({
                    where: { email: email },
                    attributes: ["id", "roleId", "email", "password", "firstName", "lastName", "image"],
                    raw: true
                })
                if (user) {
                    let check = await bcrypt.compareSync(password, user.password)
                    if (check) {
                        userData.errCode = 0
                        userData.errMessage = "Login success";
                        delete user.password;
                        userData.user = user;
                        try {
                            let userEmail = user.email;
                            let userId = await getIdUserByEmail(userEmail);
                            let userRoleId = user.roleId;

                            const token = await jwt.sign({ userId, userEmail, userRoleId }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '20h' });
                            userData.token = token;

                            resolve(userData)

                        } catch (e) {
                            userData.errCode = 10
                            userData.errMessage = "Error from Token";

                            resolve(userData)
                        }
                        console.log("Đây: ", userData)


                        resolve(userData)

                    } else {
                        userData.errCode = 3
                        userData.errMessage = "Wrong password"
                    }
                } else {
                    userData.errCode = 2
                    userData.errMessage = "User is not exist"
                }

            } else {
                userData.errCode = 1
                userData.errMessage = "The email you entered is not registered"



            }

            resolve(userData)
        } catch (e) {
            reject(e)
        }
    })
}

let checkUserEmail = (userEmail) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.users.findOne({
                where: {
                    email: userEmail
                }
            })
            if (user) {
                resolve(true)
            } else {
                resolve(false)
            }


        } catch (err) {
            reject(err)
        }
    })
}

let getAllUsers = (userId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let users = ''
            if (userId === 'ALL') {
                users = db.users.findAll({
                    attributes: {
                        exclude: ["password"]
                    },
                    include: [
                        {
                            model: db.allcodes,
                            as: "roleData",
                        },
                        {
                            model: db.allcodes,
                            as: "genderData",
                        }
                    ],

                    raw: true,
                    nest: true

                })
            }
            if (userId && (userId !== 'ALL')) {

                users = db.users.findOne({
                    where: {
                        id: userId
                    },
                    attributes: {
                        exclude: ["password"]
                    },
                    include: [
                        {
                            model: db.allcodes,
                            as: "roleData",
                        },
                    ],
                    raw: true,
                    nest: true

                })
            }


            resolve(users)
        } catch (err) {
            reject(err)
        }
    })

}
let createNewUser = (data) => {
    return new Promise(async (resolve, reject) => {
        try {

            let check = await checkUserEmail(data.email);
            if (check) {
                resolve({
                    errCode: 1,
                    errMessage: "The email you entered is already registered"
                })
            } else {
                let hashPw = await hashUserPassword(data.password);
                await db.users.create({
                    email: data.email,
                    password: hashPw,
                    firstName: data.firstName,
                    lastName: data.lastName,
                    roleId: data.role,
                    address: data.address,
                    phone: data.phone,
                    gender: data.gender,

                })
                let userId = await db.users.findOne({
                    where: {
                        email: data.email
                    },
                    attributes: ["id"]
                })


                if (data.role === "R1") {
                    await db.admins.create({
                        userId: userId.id
                    })
                } else if (data.role === "R2") {
                    await db.doctors.create({
                        userId: userId.id,
                        specialtyId: "1"
                    })
                } else if (data.role === "R3") {
                    await db.patients.create({
                        userId: userId.id
                    })
                }
                resolve(
                    {
                        errCode: 0,
                        message: 'OK'
                    }
                )
            }



        } catch (err) {
            reject(err)
        }
    }
    )
}
let getIdUserByEmail = (email) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.users.findOne({
                where: {
                    email: email
                },
                attributes: ["id"]
            })
            if (user) {
                resolve(user.id)
            } else {
                resolve(false)
            }
        } catch (err) {
            reject(err)
        }
    })
}
let hashUserPassword = (password) => {

    return new Promise(async (resolve, reject) => {
        try {
            var hash = await bcrypt.hashSync(password, salt);
            resolve(hash)
        } catch (e) {
            reject(e)
        }
    })

}
let editUser = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.id) {
                resolve({
                    errCode: 2,
                    errMessage: 'The user is not exist'
                })
            }

            let user = await db.users.findOne({
                where: { id: data.id },
                raw: false

            })

            if (user) {
                user.firstName = data.firstName
                user.lastName = data.lastName
                user.address = data.address
                user.phone = data.phone
                user.gender = data.gender
                user.roleId = data.role
                user.image = data.image


                await user.save()


                resolve({
                    errCode: 0,
                    errMessage: 'The user is edited'
                })
            } else {
                resolve({
                    errCode: 1,
                    errMessage: 'The user is not exist'
                })
            }




        } catch (e) {
            reject(e)

        }
    })
}

let deleteUser = (userId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let roleId = await db.users.findOne({
                where: {
                    id: userId
                },
                attributes: ["roleId"]
            })
            if (roleId.roleId === "R1") {
                await db.admins.destroy({
                    where: {
                        userId: userId
                    }
                })
            } else if (roleId.roleId === "R2") {
                await db.doctors.destroy({
                    where: {
                        userId: userId
                    }
                })
            } else if (roleId.roleId === "R3") {
                await db.patients.destroy({
                    where: {
                        userId: userId
                    }
                })
            }
            let user = await db.users.findAll({
                where: { id: userId }
            })

            if (!user) {
                resolve({
                    errCode: 0,
                    errMessage: 'The user is not exist'
                })
            }
            await db.users.destroy({
                where: { id: userId }
            })

            resolve({
                errCode: 0,
                errMessage: 'The user is deleted'
            })





        } catch (e) {

            reject(e)
        }
    })
}

let getAllCode = (typeI) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!typeI) {
                resolve({
                    errCode: 1,
                    errMessage: 'The type is not exist'
                })
            } else {
                let res = {};
                let allcode = await db.allcodes.findAll(
                    {
                        where: { type: typeI }
                    })
                res.errCode = 0;
                res.data = allcode;
                resolve(res);
            }

        } catch (e) {
            reject(e)
        }
    })
}

let getIdPatientByIdUser = (userId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let patient = await db.patients.findOne({
                where: {
                    userId: userId
                },
                attributes: ["id"]
            })
            if (patient) {
                resolve(patient.id)
            } else {
                resolve(false)
            }
        } catch (err) {
            reject(err)
        }
    })
}

let countUser = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let count = await db.users.count()
            resolve(count)
        } catch (err) {
            reject(err)
        }
    })
}
let countPatient = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let count = await db.patients.count()
            resolve(count)
        } catch (err) {
            reject(err)
        }
    })
}
let countDoctor = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let count = await db.doctors.count()
            resolve(count)
        } catch (err) {
            reject(err)
        }
    })
}
let countAdmin = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let count = await db.admins.count()
            resolve(count)
        } catch (err) {
            reject(err)
        }
    })
}
let changePassword = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.users.findOne({
                where: { id: data.id },
            })
            if (user) {
                let check = await bcrypt.compareSync(data.oldPassword, user.newPassword)
                if (check) {
                    let hash = await bcrypt.hashSync(data.newPassword, salt);
                    user.password = hash
                    await user.save()
                    resolve({
                        errCode: 0,
                        errMessage: 'The password'
                    })
                } else {
                    resolve({
                        errCode: 1,
                        errMessage: 'The password is not correct'
                    })
                }
            } else {
                resolve({
                    errCode: 2,

                    errMessage: 'The user is not exist'
                })
            }
        } catch (e) {
            reject(e)
        }
    })
}

module.exports = {
    handleUserLogin: handleUserLogin,
    getAllUsers: getAllUsers,
    createNewUser: createNewUser,
    editUser: editUser,
    deleteUser: deleteUser,
    getAllCode: getAllCode,
    getIdUserByEmail: getIdUserByEmail,
    getIdPatientByIdUser: getIdPatientByIdUser,
    countUser: countUser,
    countPatient: countPatient,
    countDoctor: countDoctor,
    countAdmin: countAdmin,
    changePassword: changePassword
}