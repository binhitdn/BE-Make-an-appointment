import doctorService from "../service/doctorService";
let getTopDocterHome = async (req, res) => {
    let limit = req.query.limit || 10;
    try {
        let response = await doctorService.getTopDocterHomes(limit);
        return res.status(200).json(response);
    } catch (e) {
        console.log(e)
        return res.status(200).json({
            errCode: -1,
            message: 'Error from server...'
        })
    }
}
let postInfoDoctor = async (req, res) => {
    try {
        let response = await doctorService.saveDetailInfoDoctor(req.body);
        console.log(response)
        return res.status(200).json(response)
    } catch (e) {
        console.log(e)
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from server...'
        })
    }
}
let getDetailDoctorById = async (req, res) => {
    try {
        let response = await doctorService.getDetailDoctorById(req.query.id);
        return res.status(200).json(response)
    } catch (e) {
        console.log(e)
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from server...'
        })
    }
}
let getDetailDoctorByIdDoctor = async (req, res) => {
    try {
        let response = await doctorService.getDetailDoctorByIdDoctor(req.query.id);
        return res.status(200).json(response)
    } catch (e) {
        console.log(e)
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from server...'
        })
    }
}
let bulkCreateSchedule = async (req, res) => {
    try {
        let response = await doctorService.bulkCreateSchedule(req.body);
        return res.status(200).json(response)
    } catch (e) {
        console.log(e)
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from server...'
        })
    }
}

let getScheduleDoctorByDate = async (req, res) => {
    try {
        let response = await doctorService.getScheduleDoctorByDate(req.query.doctorId, req.query.date);
        return res.status(200).json(response)
    } catch (e) {
        console.log(e)
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from server...'
        })
    }
}
let handleAddInfoDoctor = async (req, res) => {
    try {
        let response = await doctorService.handleAddInfoDoctor(req.body);
        return res.status(200).json(response)
    } catch (e) {
        console.log(e)
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from server...'
        })
    }
}
let editInfoDoctor = async (req, res) => {
    try {
        let response = await doctorService.editInfoDoctor(req.body);
        return res.status(200).json(response)
    } catch (e) {
        console.log(e)
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from server...'
        })
    }
}
let handleGetExtraDoctorById = async (req, res) => {
    try {
        let response = await doctorService.getExtraDoctorById(req.query.doctorId);
        return res.status(200).json(response)
    } catch (e) {
        console.log(e)
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from server...'
        })
    }
}
let handleGetDoctorBySpecialty = async (req, res) => {
    try {
        let response = await doctorService.getDetailDoctorBySpecialty(req.query.id);
        return res.status(200).json(response)
    } catch (e) {
        console.log(e)
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from server...'
        })
    }
}
let handleGetIdDoctorById = async (req, res) => {
    try {
        let response = await doctorService.getIdDoctorById(req.query.id);
        return res.status(200).json(response)
    } catch (e) {
        console.log(e)
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from server...'
        })
    }
}
let createReviewerSchedule = async (req, res) => {
    try {
        let data = await doctorService.createReviewerSchedule(req.body);
        return res.status(200).json({
            errCode: 0,
            errMessage: "Create reviewer schedule success",
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
let getAllReviewByDoctorId = async (req, res) => {
    try {
        let data = await doctorService.getAllReviewByDoctorId(req.query.doctorId);
        return res.status(200).json({
            errCode: 0,
            errMessage: "Get all review by doctor id success",
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
let handleCountViewDoctor = async (req, res) => {
    try {
        let data = await doctorService.countViewDoctor(req.query.doctorId);
        return res.status(200).json({
            errCode: 0,
            errMessage: "Count view doctor success",
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
let handleGetTotalIncomeByMonth = async (req, res) => {
    try {
        let data = await doctorService.totalIncomeByMonth(req.query.doctorId, req.query.month);
        return res.status(200).json({
            errCode: 0,
            errMessage: "Get total income by month success",
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
let totalIncomeAllDoctor = async (req, res) => {
    try {
        let data = await doctorService.totalIncomeAllDoctor(req.query.month);
        return res.status(200).json({
            errCode: 0,
            errMessage: "Get total income all doctor success",
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
let handleGetAllDoctor = async (req, res) => {
    try {
        let data = await doctorService.getAllDoctor();
        return res.status(200).json({
            errCode: 0,
            errMessage: "Get all doctor success",
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
let editReviewerSchedule = async (req, res) => {
    try {
        let data = await doctorService.editReviewerSchedule(req.body);
        return res.status(200).json({
            errCode: 0,
            errMessage: "Edit reviewer schedule success",
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
    getTopDocterHome: getTopDocterHome,
    postInfoDoctor: postInfoDoctor,
    getDetailDoctorById: getDetailDoctorById,
    bulkCreateSchedule: bulkCreateSchedule,
    getScheduleDoctorByDate: getScheduleDoctorByDate,
    handleAddInfoDoctor: handleAddInfoDoctor,
    editInfoDoctor: editInfoDoctor,
    handleGetExtraDoctorById: handleGetExtraDoctorById,
    getDetailDoctorByIdDoctor: getDetailDoctorByIdDoctor ,
    handleGetDoctorBySpecialty: handleGetDoctorBySpecialty ,
    handleGetIdDoctorById: handleGetIdDoctorById,
    createReviewerSchedule: createReviewerSchedule,
    getAllReviewByDoctorId: getAllReviewByDoctorId,
    handleCountViewDoctor: handleCountViewDoctor,
    handleGetTotalIncomeByMonth: handleGetTotalIncomeByMonth,
    totalIncomeAllDoctor: totalIncomeAllDoctor,
    handleGetAllDoctor: handleGetAllDoctor,
    editReviewerSchedule: editReviewerSchedule

}