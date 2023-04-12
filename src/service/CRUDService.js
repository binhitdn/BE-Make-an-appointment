import bcrypt from 'bcryptjs'
import db from '../models/index'
var salt = bcrypt.genSaltSync(10);
let createNewUser = async (data) => {
    return new Promise( async (resolve,reject) => {
        try {
            let hashPw = await hashUserPassword(data.password);
            await db.users.create({
                email: data.email,
        password: hashPw,
        firstName: data.firstname,
        lastName: data.lastname,
        address: data.address,
          gender: data.gender === '1' ? true: false,   
            roleId: data.roleId,
        phone: data.phone,
            })
            resolve(

            )
        } catch(e) {
            reject('ok')
        }
        
    })
}

let hashUserPassword = (password) => {
    
return new Promise(async (resolve,reject) => {
    try{
        var hash = await bcrypt.hashSync(password, salt);
        resolve(hash)
    } catch(e) {
        reject(e)
    }
})

}

let getAllUser =() => {
    return new Promise(async(resolve,reject) => {
        try {
            let users =db.Users.findAll();
            
            resolve(users)
        } catch(e) {
            reject(e)
        }
    })
}
let getUserInfoById = (userId) => {
    return new Promise(async (resolve,reject) => {
        try {
        
            let user = await db.Users.findOne({
                where: {id: userId},
                raw: true
            })
            if(user) {
                resolve(user)
            } else {
                resolve([])
            }
   


        }catch(e) {
            reject(e)
        }
    })
}

let updateUserData = (data) => {
    return new Promise(async(resolve,reject) => {
        try{
            let user = await db.Users.findOne({
                where: {id: data.id}
            })
            
            if(user) {
                user.firstName = data.firstName
                user.lastName = data.lastName
                user.address = data.address

                await user.save()
                let allUser = await db.Users.findAll();

                resolve(allUser)
            } else {
                reject('user not found')
            } 
            
          
            
            
        }catch(e) {
            console.log(e)
            reject(e)
        }
    })
}

let deleteUser = (userId) => {
    return new Promise(async(resolve,reject) => {
        try{
            let user = await db.Users.findOne({
                where: {id: userId}
            })
            if(user) {
                await user.destroy()
                let allUser = await db.Users.findAll();
                resolve(allUser)
            } else {
                reject('user not found')
            } 
            
          
            
            
        }catch(e) {
            console.log(e)
            reject(e)
        }
    })
}

module.exports = {
    createNewUser: createNewUser,
    getAllUser: getAllUser,
    getUserInfoById: getUserInfoById,
    updateUserData: updateUserData,
    deleteUser: deleteUser
}
