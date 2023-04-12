import specialityService from '../service/specialityService.js'
let getAllSpeciality = async (req, res) => {
    try {
        let specialities = await specialityService.getAllSpecialities()
        return res.status(200).json({
            specialities
        })
    } catch (e) {
        return res.status(500).json({
            errCore: 1,
            message: "Server error"
        })
    }
}
let createNewSpeciality = async (req, res) => {
    try {
        let message = await specialityService.createNewSpeciality(req.body)
        return res.status(200).json({
            message
        })
    } catch (e) {
        return res.status(200).json({
            errCore: 1,
            message: "Server error"
        })
    }
}
let getSpecialityById = async (req,res) => {
    try {
        let message = await specialityService.getSpecialityById(req.query.id)
        return res.status(200).json({
            message
        })
    }catch(e) {
        return res.status(200).json({
            errCore: 1,
            message: "Server error"
        })
    }
}
let editSpeciality = async (req, res) => {
    try {
        let message = await specialityService.editSpeciality(req.body)
        return res.status(200).json({
            message
        })
    } catch (e) {
        return res.status(200).json({
            errCore: 1,
            message: "Server error"
        })
    }
}
module.exports = {
    getAllSpeciality: getAllSpeciality,
    createNewSpeciality: createNewSpeciality,
    getSpecialityById: getSpecialityById,
    editSpeciality: editSpeciality
}