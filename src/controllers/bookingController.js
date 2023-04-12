import bookingService from '../service/bookingService';


let handlePatientBookAppointment = async (req, res) => {
    try {
        let response = await bookingService.handlePatientBookAppointment(req.body);
        return res.status(200).json(response)
    } catch (e) {
        console.log(e)
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from server...'
        })
    }
}
let handleGetAllBooking = async (req, res) => {
    try {
        let response = await bookingService.handleGetAllBooking(req.query);
        return res.status(200).json(response)
    } catch (e) {
        console.log(e)
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from server...'
        })
    }
}
// 
let handleEditBookingComfirm = async (req, res) => {
    try {
        let response = await bookingService.handleEditBookingComfirm(req.query);
        return res.status(200).json(response)
    } catch (e) {
        console.log(e)
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from server...'
        })
    }
}
let handleEditBookingFinished = async (req, res) => {
    try {
        let response = await bookingService.handleEditBookingFinished(req.query);
        return res.status(200).json(response)
    } catch (e) {
        console.log(e)
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from server...'
        })
    }
}
let handleGetAllBookingForPatient = async (req, res) => {
    try {
        let response = await bookingService.handleGetAllBookingForPatient(req.query);
        return res.status(200).json(response)
    } catch (e) {
        console.log(e)
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from server...'
        })
    }
}
let countBookingByDoctor = async (req, res) => {
    try {
        let response = await bookingService.countBookingByDoctor(req.query);
        return res.status(200).json(response)
    } catch (e) {   
        console.log(e)
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from server...'
        })
    }

}
let handleChangeStatus = async (req, res) => {
    try {
        let response = await bookingService.changeStatus(req.query);
        return res.status(200).json(response)
    } catch (e) {
        console.log(e)
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from server...'
        })
    }
}
let handleGetBookingByDoctorStatusAndDate = async (req, res) => {
    try {
        let response = await bookingService.getBookingByDoctorStatusAndDate(req.query);
        return res.status(200).json(response)
    } catch (e) {
        console.log(e)
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from server...'
        })
    }
}
let createBookingFinished = async (req, res) => {
    try {
        let response = await bookingService.createBookingFinished(req.body);
        return res.status(200).json(response)
    } catch (e) {
        console.log(e)
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from server...'
        })
    }
}
let createBookingCancelled = async (req, res) => {
    try {
        let response = await bookingService.createBookingCancelled(req.body);
        return res.status(200).json(response)
    } catch (e) {
        console.log(e)
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from server...'
        })
    }
}
let handleGetAllBookingForPatientFinished = async (req, res) => {
    try {
        let response = await bookingService.handleGetAllBookingForPatientFinished(req.query);
        return res.status(200).json(response)
    } catch (e) {
        console.log(e)
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from server...'
        })
    }
}
let getBookingCancelled = async (req, res) => {
    try {
        let response = await bookingService.getBookingCancelled(req.query);
        return res.status(200).json(response)
    } catch (e) {
        console.log(e)
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from server...'
        })
    }
}



module.exports = {
    handlePatientBookAppointment,
    handleGetAllBooking,
    handleEditBookingComfirm,
    handleEditBookingFinished,
    handleGetAllBookingForPatient,
    countBookingByDoctor,
    handleChangeStatus,
    handleGetBookingByDoctorStatusAndDate,
    createBookingFinished,
    handleGetAllBookingForPatientFinished,
    createBookingCancelled,
    getBookingCancelled
    

}