import db from "../models/index";
import _, { attempt } from "lodash";
// import moment from "moment";
// import { Op } from "sequelize";

let handlePatientBookAppointment =  (data) => {
    return new Promise(async (resolve, reject) => {
        try {
           
            let a = await db.bookings.create({
                patientId: data.patientId,
                doctorId: data.doctorId,
                reason: data.reason,
                date: data.date,
                timeType: data.timeType,
                statusID: "S1"
            })
            // let a = await db.bookings.create({
            //     patientId: data.patientId,
            //     doctorId: data.doctorId,
                
            // })

           
            
           
            resolve({
                message: "Book appointment successfully"

            })
        } catch (e) {
            
        }
    })

}
let handleGetAllBooking = async (data) => {
    return new Promise(async (resolve, reject) => {
        try {
           
            let bookings = await db.bookings.findAll({
                where: {
                    
                    doctorId: data.doctorId
                },
                include: [
                    {
                        model: db.patients,
                        as: "patientData",
                        include: [
                            {
                                model: db.users,
                                as: "userData",
                            }
                        ]
                    },
                    {
                        model: db.allcodes,
                        as: "timeTypeData2",
                    
                    }
                   
                                
                ],
                
                        
                
                    

               
                raw: true,
                nest: true
            
            })
            
            resolve(bookings)
        } catch (e) {
            resolve(e)
        }
    })
}
let handleGetAllBookingComfirm = async (data) => {

}
let handleGetAllBookingFinished = async (data) => {
}
let handleGetAllBookingCancelled = async (data) => {
}
let handleEditBookingComfirm = async (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let booking = await db.bookings.findOne({
                where: {
                    doctorId: data.id,
                    statusId: "S1"
                },
                attributes: {
                    exclude: ["createdAt", "updatedAt"]
                },
                raw: true
            })
            if (booking) {
                let update = await db.bookings.update({
                    statusId: "S2"
                }, {
                    where: {
                        doctorId: data.id
                    }
                })
                resolve({
                    message: "Update successfully"
                })
            } else {
                resolve({
                    message: "Schedule is S2"
                })
            }
        } catch (e) {
            resolve(e)
        }
    })
}　
let handleEditBookingFinished = async (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let booking = await db.bookings.findOne({
                where: {
                    doctorId: data.id,
                    statusId: "S2"
                },
                attributes: {
                    exclude: ["createdAt", "updatedAt"]
                },
                raw: true
            })
            if (booking) {
                let update = await db.bookings.update({
                    statusId: "S3"
                }, {
                    where: {
                        doctorId: data.id
                    }
                })
                resolve({
                    message: "Update successfully"
                })
            } else {
                resolve({
                    message: "Schedule is S3"
                })
            }
        } catch (e) {
            resolve(e)
        }
    })
}
let handleGetAllBookingForPatient = async (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let patient = await db.patients.findOne({
                where: {
                    userId: data.patientId
                },
                

                attributes: {
                    exclude: ["createdAt", "updatedAt"]
                },
                raw: true
            })
            
            
            let bookings = await db.bookings.findAll({
                where: {
                    patientId: patient.id,
                },
                include: [
                    {
                        model: db.doctors,
                        as: "doctorData",
                        include: [
                            {
                                model: db.users,
                                as: "userData",
                            },{

                                model: db.specialties,
                                as: "specialtyData",

                            },
                            // {
                            //     model: db.allcodes,
                            //     as: "timeTypeData2",
                                
                            // },
                            // {
                            //     model: db.allcodes,
                            //     as: "statusData",
                                
                            // }
                        ]
                    },
                    {  
                        model: db.allcodes,
                        as: "timeTypeData2",
                    },
                    {
                        model: db.allcodes,
                        as: "statusData",
                    },
                    {
                        model: db.ReviewerBookings,
                        as: "reviewerBookingData",
                    
                        

                    }
                ],
                raw: true,
                nest: true
                
                
            })

            resolve(bookings)
        }
        catch (e) {
            resolve(e)
        }
    })
}
let handleGetAllBookingForPatientFinished = async (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let patient = await db.patients.findOne({
                where: {
                    userId: data.patientId
                },
                

                
            })
           
            
            let bookings = await db.bookings.findAll({
                where: {
                    patientId: patient.id,
                    statusId: "S3"
                },
                include: [
                    {
                        model: db.doctors,
                        as: "doctorData",
                        include: [
                            {
                                model: db.users,
                                as: "userData",
                            },{

                                model: db.specialties,
                                as: "specialtyData",

                            },
                            // {
                            //     model: db.allcodes,
                            //     as: "timeTypeData2",
                                
                            // },
                            // {
                            //     model: db.allcodes,
                            //     as: "statusData",
                                
                            // }
                        ]
                    },
                    {  
                        model: db.allcodes,
                        as: "timeTypeData2",
                    },
                    {
                        model: db.allcodes,
                        as: "statusData",
                    },
                    {
                        model: db.ReviewerBookings,
                        as: "reviewerBookingData",
                    
                        

                    },
                    {
                        model: db.bookingfinishs,
                        as: "bookingfinishData",
                    }
                ],
                raw: true,
                nest: true
                
                
            })

            resolve(bookings)
        }
        catch (e) {
            resolve(e)
        }
    })
}

let changeStatus = async (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let booking = await db.bookings.findOne({
                where: {
                    id: data.id,
                },
                attributes: {
                    exclude: ["createdAt", "updatedAt"]
                },
                raw: true
            })
            
            if (booking) {
                let update = await db.bookings.update({
                    statusID: data.statusId
                }, {
                    where: {
                        id: data.id
                    }
                })

                resolve({
                    message: "Update successfully"
                })
            } else {
                resolve({
                    message: "Schedule is"
                })
            }
        } catch (e) {
            resolve(e)
        }
    })
}
let countBookingByDoctor = async (data) => {
    return new Promise(async (resolve, reject) => {
        let doctorID = await db.doctors.findAll({
            where: {
                userId: data.doctorId
            },
        }
        )
        
        let id = doctorID.map(item => item.id)
        if(data.statusId==="all") {
           
        
            try {
                let count = await db.bookings.count({
                    where: {
                        doctorId: id
                    }
                })
                resolve(count)
            } catch (e) {
                resolve(e)
            }
        } else {
            try {
                let count = await db.bookings.count({
                    where: {
                        doctorId: id,
                        statusId: data.statusId                          
                    }
                })
                resolve(count)
            } catch (e) {
                resolve(e)
            }
        }
    })
}
let getBookingByDoctorStatusAndDate = async (data) => {
    return new Promise(async (resolve, reject) => {    
            try {
                let doctorID = await db.doctors.findOne({
                    where: {
                        userId: data.doctorId
                    },
                }
                )
                let bookings = await db.bookings.findAll({
                    where: {
                        doctorId: doctorID.id,
                        date: data.date +" 07:00:00",
                        statusID: data.statusId
                    },
                    include: [
                        {
                            model: db.patients,
                            as: "patientData",
                            include: [
                                {
                                    model: db.users,
                                    as: "userData",
                                }
                            ]
                        },
                        {
                            model: db.allcodes,
                            as: "timeTypeData2",
                        },
                        {
                            model: db.allcodes,
                            as: "statusData",
                        }
                    ],
                    raw: true,
                    nest: true
                })
                resolve(bookings)
            } catch (e) {
                resolve(e)
            }
    
    })
        }

        let createBookingFinished = async (data) => {
            return new Promise(async (resolve, reject) => {
                try {
                   
                    let creates = await db.bookingfinishs.create({
                        bookingId: data.bookingId,
                        diagnose: data.diagnose,
                        medicine: data.medicine,
                        note: data.note,
                    })
                    resolve({
                        message: "Create successfully"
                    })
                } catch (e) {
                    reject({
                        message: "Create failed",
                        error: e
                    })
                    
                }
            })
        }
        let createBookingCancelled = async (data) => {
            return new Promise(async (resolve, reject) => {
                try {
                   console.log(data)
                    let creates = await db.bookingcancelleds.create({
                        bookingId: data.bookingId,
                        reason: data.reason
                    })
                    resolve({
                        message: "Create successfully"
                    })
                } catch (e) {
                    reject({
                        message: "Create failed",
                        error: e
                    })
                    
                }
            })
        }
        let getBookingCancelled = async (data) => {
            return new Promise(async (resolve, reject) => {
                try {
                    let booking = await db.bookingcancelleds.findOne({
                        where: {
                            bookingId: data.bookingId
                        },
                        attributes: {
                            exclude: ["createdAt", "updatedAt"]
                        },
                        raw: true
                    })
                    resolve(booking)
                } catch (e) {
                    resolve(e)
                }
            })
        }
        



module.exports = {
    handlePatientBookAppointment,
    handleGetAllBooking,
    handleGetAllBookingComfirm,
    handleGetAllBookingFinished,
    handleGetAllBookingCancelled,

    handleEditBookingComfirm,
    handleEditBookingFinished,
    handleGetAllBookingForPatient,
    countBookingByDoctor,
    changeStatus,
    getBookingByDoctorStatusAndDate,
    createBookingFinished,
    handleGetAllBookingForPatientFinished,
    createBookingCancelled,
    getBookingCancelled

}
