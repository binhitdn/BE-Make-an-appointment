import db from '../models/index';
const { Op } = require("sequelize");

let getAllSpecialities = async () => {
    return new Promise(async (resolve, reject) => {
        try {
            let specialities = await db.specialties.findAll({
                where: {
                    id: {
                        [Op.gt]: 1
                    }
                },
                
                
            },
            )
           
            resolve(specialities)

        } catch (e) {
            resolve(e)
        }
        
    })
}
let editSpeciality = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let message = await db.specialties.update(
                {
                    contentHTML: data.contentHTML,
                    contentMarkdown: data.contentMarkdown,
                    image: data.avatar,
                    description: data.description
                },
                {
                    where: {
                        id: data.id
                    }
                }
            )
            resolve(message)
        } catch (e) {
            resolve(e)
        }
    }
    )
}
let createNewSpeciality = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let message = await db.specialties.create(
                {
                    name: data.name,
                    contentHTML: data.contentHTML,
                    contentMarkdown: data.contentMarkdown,
                    image: data.avatar,
                    description: data.description              
                }
            )
            
            resolve(message)
        } catch (e) {
            resolve(e)
        }
    }
    )
}
let getSpecialityById = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let message = await db.specialties.findOne({
                where: {
                    id: data
                },
                raw: true
            },
           )    
            resolve(message)
        } catch (e) {
            resolve(e)
        }
    }
    )
}

module.exports = {
    getAllSpecialities: getAllSpecialities,
    createNewSpeciality: createNewSpeciality,
    getSpecialityById: getSpecialityById,
    editSpeciality: editSpeciality
   
}