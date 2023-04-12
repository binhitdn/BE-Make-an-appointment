import db, { sequelize } from "../models/index";
import _ from "lodash";
import moment from "moment";
import { Op,QueryTypes } from "sequelize";


let getTopDocterHomes = (limit) => {
    return new Promise(async (resolve, reject) => {
        try {
            let doctors = await db.doctors.findAll({
                limit: limit,
                where: {
                    specialtyId: {
                        [Op.gt]: 1
                    }
                },
                
                order: [
                    [
                        'count', 'DESC'
                    ]
                ],
                attributes: ['positionId','userId','count','id'],
                include: [{
                    model: db.users,
                    as: 'userData',
                    exclude: ['password']
                },{
                    model: db.allcodes,
                    as: 'positionData',
                    attributes: ['valueEn', 'valueVi']
                },
                {
                    model: db.specialties,
                    as: 'specialtyData',
                    attributes: ['name']
                },
                
                
                
                ],


                raw: true,
                nest: true
            })
            resolve({
                errCode: 0,
                message: 'Find Doctor Success',
                data: doctors
            })
        } catch (e) {
            reject(e)
        }
    })
}
let getAllDoctor= () => {
    return new Promise(async (resolve, reject) => {
        try {
            let doctors = await db.doctors.findAll({
                where: {
                    specialtyId: {
                        [Op.gt]: 1
                    }
                },
                include: [
                    {
                    model: db.users,
                    as: 'userData',
                    exclude: ['password']
                },
                {
                    model: db.allcodes,
                    as: 'positionData',
                    attributes: ['valueEn', 'valueVi']
                },
                {
                    model: db.specialties,
                    as: 'specialtyData',
                    
                }
              
            ]
            })
            resolve({
                errCode: 0,
                message: 'Find Doctor Success',
                data: doctors
            })
        } catch (e) {
            reject(e)
        }
    })
}
let getIdDoctorById = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            let doctor = await db.doctors.findOne({
                where: {
                    userId: id
                },
                attributes: ['id'],
                raw: true,
                nest: true
            })
            resolve({
                errCode: 0,
                message: 'Find Doctor Success',
                data: doctor
            })
        } catch (e) {
            reject(e)
        }
    })
}
let saveDetailInfoDoctor = (inputData) => {
    return new Promise(async (resolve, reject) => {
        try {
        

         let userID = await db.users.findOne({
                where: {
                    email: inputData.email
                },
                attributes: ['id']
                
                
            })
          


            let save = await db.doctors.update({
                specialtyId: inputData.specialty,
                positionId: inputData.position,
                cost: inputData.cost,
                provinceId: inputData.province,
                paymentId: inputData.payment,
                nameClinic: inputData.nameClinic,
                addressClinic: inputData.addressClinic,
                contentHTML: inputData.contentHTML,
                contentMarkdown: inputData.contentMarkdown,
                description: inputData.description,
                priceId: inputData.cost,
                
            }, {
                where: {
                    userId: userID.id
                }
            })
            let saveImageUser = await db.users.update({
                image: inputData.avatar,
            }, {
                where: {
                    email: inputData.email
                }
            })
            resolve({
                errCode: 0,
                message: 'Save Detail Info Doctor Success',
                data: save
            })
            

                
                



        } catch (e) {
            reject(e)
        }
    })
}
let editInfoDoctor = (inputData) => {
    return new Promise(async (resolve, reject) => {
        try {
            if ((!inputData.contentHTML) && (!inputData.contentMarkdown)) {
                resolve({
                    errCode: 1,
                    errMessage: "Missing Parameter"
                })
            } else {
                let doctor = await db.markdowns.findOne({
                    where: {
                        doctorId: inputData.doctorId
                    }
                })
                if (doctor) {
                    await db.markdowns.update({
                        contentHTML: inputData.contentHTML,
                        contentMarkdowns: inputData.contentMarkdown,
                        description: inputData.description,
                        doctorId: inputData.doctorId,
                        specialtyId: inputData.specialtyId,
                        clinicId: inputData.clinicId
                    }, {
                        where: {
                            doctorId: inputData.doctorId
                        }
                    })
                    resolve({
                        errCode: 0,
                        errMessage: "Update detail information doctor success!"
                    })
                } else {
                    resolve({
                        errCode: 1,
                        errMessage: "Doctor not found!"
                    })
                }
            }
        } catch (e) {
            reject(e)
        }
    })
}

let getDetailDoctorById = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            let doctor = await db.doctors.findOne({
                where: {
                    userId: id
                },
                attributes: {
                    exclude: ['password','gender']
                },
                include: [
                    {
                        model: db.users,
                        as: 'userData',
                        attributes: ['image']
                    }
                ],
                raw: true,
                nest: true
            })
            resolve({
                errCode: 0,
                message: 'Find Doctor Success',
                data: doctor
            })
        } catch (e) {
            reject(e)
        }
    })
}
let getDetailDoctorByIdDoctor = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            let doctor = await db.doctors.findOne({
                where: {
                    id: id
                },
                attributes: {
                    exclude: ['password','gender']
                },
                include: [
                    {
                        model: db.users,
                        as: 'userData',
                        attributes: {
                            exclude: ['password']
                        },
                    },
                    {
                        model: db.allcodes,
                        as: 'paymentData',
                        attributes: ['valueEn', 'valueVi']
                    }
                ],
                raw: true,
                nest: true
            })
            resolve({
                errCode: 0,
                message: 'Find Doctor Success',
                data: doctor
            })
        } catch (e) {
            reject(e)
        }
    })
}
let getDetailDoctorBySpecialty = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            let doctor = await db.doctors.findAll({
                where: {
                    specialtyId: id
                },
                attributes: {
                    exclude: ['password','gender']
                },
                include: [
                    {
                        model: db.users,
                        as: 'userData',
                        attributes: {
                            exclude: ['password']
                        },
                        include: [
                            {
                                model: db.allcodes,
                                as: 'genderData',
                                attributes: ['valueEn', 'valueVi']
                            }
                        ]

                    },
                   
                    {
                        model: db.allcodes,
                        as: 'positionData',
                        attributes: ['valueEn', 'valueVi']
                    },
                    {
                        model: db.specialties,
                        as: 'specialtyData',
                        attributes: ['name']
                    },
                    {
                        model: db.allcodes,
                        as: 'provinceData',
                        attributes: ['valueEn', 'valueVi']
                    },
                    
                    
                ],
                raw: true,
                nest: true
            })
            resolve({
                errCode: 0,
                message: 'Find Doctor Success',
                data: doctor
            })
        } catch (e) {
            reject(e)
        }
    })
}
                
                    
let bulkCreateSchedule = (inputData) => {
    return new Promise(async (resolve, reject) => {
        console.log(inputData)
        try {
            let schedule = await db.schedules.destroy({
                where: {
                    doctorId: inputData.doctorId,
                    date: inputData.date + " 07:00:00"
                }
            })
            if(inputData.arrSchedule.length <= 0){
                resolve({
                    errCode: 0,
                    errMessage: "Delete Schedule Success"
                })
            }

            


            if (!inputData.arrSchedule) {
                resolve({
                    errCode: 1,
                    errMessage: "Missing Parameter"
                })
            } else {
                let arrSchedule = inputData.arrSchedule;
                if (arrSchedule.length > 0) {
                    arrSchedule.map(item => {
                        item.maxNumber = 10;
                        return item;
                    })
                }

        
            

                let existing = await db.schedules.findAll({
                    where: {
                        doctorId: 3
                    },
                    attributes: ["doctorId", "date", "timeType", "maxNumber"],
                    raw: true
                })
                let existingNew = [];
                existing.map(item => {
                    let object = {};
                    object.doctorId = parseInt(item.doctorId);
                    object.date = moment(item.date).format("MM/DD/YYYY")
                    object.timeType = item.timeType
                    object.maxNumber = item.maxNumber
                    existingNew.push(object)
                })




                let toCreate = _.differenceBy(arrSchedule, existing, ['timeType', 'date'])


                let newSchedule = arrSchedule.filter(
                    ar => !existingNew.find(rm => (
                        rm.doctorId == ar.doctorId
                        && rm.timeType == ar.timeType
                        && rm.date == ar.date)

                    )

                )
                

                if (!newSchedule || newSchedule.length <= 0) {
                    resolve(
                        {
                            errCode: 2,
                            errMessage: "Schedules is not change"
                        }
                    )
                } else {
                    let a = await db.schedules.bulkCreate(newSchedule)
                    
                    resolve({
                        errCode: 0,
                        errMessage: "Create schedule is success"
                    })
                }
            }
        } catch (e) {
            reject(e)
        }
    })
}
let getScheduleDoctorByDate = (id, date) => {
   

    return new Promise(async (resolve, reject) => {
        try {
            // let idDoctor = await db.doctors.findOne({
            //     where: {
            //         userId: doctorId
            //     },
            //     attributes: ['id']
              
            // })
            // if (!idDoctor) {
            //     resolve({
            //         errCode: 1,
            //         errMessage: "Doctor not found"
            //     })
            // } else {
                let schedule = await db.schedules.findAll({
                    where: {
                        doctorId: id,
                        date: date + " 07:00:00"
                    },
                    attributes: ["id","doctorId", "date", "timeType", "maxNumber"],
                    include: [{
                        model: db.allcodes,
                        as: 'timeTypeData',
                        attributes: ['valueEn', 'valueVi','keyMap']
                    }],
                    raw: true,
                    nest: true
                })
        // }
            
            resolve({
                errCode: 0,
                message: 'Find Schedule Success',
                data: schedule
            })
        } catch (e) {
            reject(e)
        }
    })
}
let handleAddInfoDoctor = (inputData) => {
    return new Promise(async (resolve, reject) => {
       
        try {
          
            let doctor = await db.doctors.findOne({
                where: {
                    doctorId: inputData.doctorId
                }
            })
          
            if (doctor) {

                await db.doctors.update({
                    doctorId: inputData.doctorId,
                    contentHTML: inputData.contentHTML,
                    contentMarkdown: inputData.contentMarkdown,
                    description: inputData.description,
                    priceId: inputData.price,
                    provinceId: inputData.province,
                    paymentId: inputData.payment,
                    addressClinic: inputData.addressClinic,
                    nameClinic: inputData.nameClinic,
                    note: inputData.note,
                }, {
                    where: {
                        doctorId: inputData.doctorId
                    }
                })
                
                
                {inputData.specialtyId && inputData.specialtyId.map( async(item) => {
                    let specialty = await db.Doctor_Clinic_Specialty.findOne({
                        where: {
                            doctorId: inputData.doctorId,
                            specialtyId: item
                        }
                    })
                        if (!specialty){
                            await db.doctors_clinics_specialties.create({
                                doctorId: inputData.doctorId,
                                specialtyId: item
                            })
                        }
                })
            }
                    
                
                resolve({
                    errCode: 0,
                    errMessage: "Update detail information doctor success!"
                })
            } else {

                await db.doctors.create({
                    doctorId: inputData.doctorId,
                    contentHTML: inputData.contentHTML,
                    contentMarkdown: inputData.contentMarkdown,
                    description: inputData.description,
                    priceId: inputData.price,
                    provinceId: inputData.province,
                    paymentId: inputData.payment,
                    addressClinic: inputData.addressClinic,
                    nameClinic: inputData.nameClinic,
                    note: inputData.note,
                    count: 0,
                })
                await db.doctors_clinics_specialties.create({
                    doctorId: inputData.doctorId,
                    specialtyId: inputData.specialty
                })

                resolve({
                    errCode: 0,
                    errMessage: "Create detail information doctor success!"
                })
            }
        } catch (e) {
            reject(e)
        }
    })
}
let getExtraDoctorById = (doctorId) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (doctorId) {
                let Doctor_Info = await db.doctor_infos.findOne({
                    where: {
                        doctorId: doctorId
                    },
                    attributes: {
                        exclude: ['id', 'doctorId']
                    },
                    include: [
                        { model: db.allcodes, as: 'priceTypeData', attributes: ['valueEn', 'valueVi', 'valueJa'] },
                        { model: db.allcodes, as: 'provinceTypeData', attributes: ['valueEn', 'valueVi', 'valueJa'] },
                        { model: db.allcodes, as: 'paymentTypeData', attributes: ['valueEn', 'valueVi', 'valueJa'] },
                    ]
                })
            } else {

            }
            resolve(Doctor_Info)
        } catch (e) {
            reject(e)
        }
    })
}
let createReviewerSchedule = (inputData) => {
    return new Promise(async (resolve, reject) => {
        let createReviewerSchedule = await db.ReviewerBookings.create({
            bookingId: inputData.bookingId,
            rate: inputData.rate,
            review: inputData.review,
        })
        resolve(createReviewerSchedule)
    })
}
let editReviewerSchedule = (inputData) => {
    return new Promise(async (resolve, reject) => {
        let editReviewerSchedule = await db.ReviewerBookings.update({
            rate: inputData.rate,
            review: inputData.review,
        }, {
            where: {
                bookingId: inputData.bookingId
            }
        })
        resolve(editReviewerSchedule)
    })
}
let getAllReviewByDoctorId = (doctorId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let booking = await db.bookings.findAll({
                where: {
                    doctorId: doctorId,
                    statusID: "S3"
                },
               
                
                
                
            })
           
            let arrBookingId = []
            for (let i = 0; i < booking.length; i++) {
                booking.map((item, index) => {
                    arrBookingId.push(item.id)
                }
                )

            }
           
            
            let review = await db.ReviewerBookings.findAll({
                where: {
                    [Op.or]: [
                        // { bookingId: 11 },
                        // { bookingId: 16}
                        {
                            bookingId: {
                                [Op.in]: arrBookingId
                            }
                        }
                      ]
                },
                include: [
                    {
                        model: db.bookings,
                        as: 'bookingData',
                        
                        include: [
                            {
                                model: db.patients,
                                as: 'patientData',
                                include: [
                                    {
                                        model: db.users,
                                        as: 'userData',
                                        
                                    }
                                ]
                            }
                        ]
                    }
                ],
                order: [
                    ['createdAt', 'DESC']
                ],
                raw: true,
                nest: true
            })
            resolve(review)
        } catch (e) {
            reject(e)
        }
    })
}
let countViewDoctor = (doctorId) => {
    return new Promise(async (resolve, reject) => {
        try {
            
            let doctor = await db.doctors.findOne({
                where: {
                    id: doctorId
                }
            })
            
            if (doctor) {
                await db.doctors.update({
                    count: doctor.count + 1
                }, {
                    where: {
                        id: doctorId
                    }
                })
                resolve({
                    errCode: 0,
                    errMessage: "Update count view doctor success!",
                    count: doctor.count
                })
            } else {
                resolve({
                    errCode: 1,
                    errMessage: "Update count view doctor fail!"
                })
            }
        } catch (e) {
            reject(e)
        }
    })
}

let totalIncomeByMonth = (doctorId,month) => {
    return new Promise(async (resolve, reject) => {
        try {
            let sql;
            if(month =="ALL" || month == 'all') {
                sql = `SELECT COUNT(*) as total FROM bookings WHERE doctorId = ${doctorId}  AND statusID = 'S3'`
            } else {
                 sql = `SELECT COUNT(*) as total FROM bookings WHERE doctorId = ${doctorId} AND MONTH(createdAt) = ${month} AND statusID = 'S3'`
            }
            let data = await sequelize.query(sql, { type: QueryTypes.SELECT })
            let doctor = await db.doctors.findOne(
                {
                    where: {
                        id: doctorId
                    },
                    attributes: ['priceId', 'count','provinceId'],
                    include: [
                        {
                            model: db.users,
                            as: 'userData',
                           

                        }       
                    ]   ,
                    raw: true,
                    nest: true

                }
            )
            let result = data[0].total * doctor.priceId
            resolve({
                ...doctor,
                total: result
            })
            
            // if(month=="ALL"){

            //     let booking = await db.bookings.findAll({
            //         where: {
            //             doctorId: doctorId,
            //             statusID: "S3"
            //         },
            //         include: [
            //             {
            //                 model: db.doctors,
            //                 as: 'doctorData',
            //                 attributes: [
            //                     priceId
            //                 ],
            //                 include: [
            //                     {
            //                         model: db.bookings,
            //                         as: 'bookingData',
            //                         // attributes: [
            //                         //     [sequelize.fn('count', sequelize.col('id')), 'total']
            //                         // ]
                                
            //                     }
            //                 ]
            //             }
            //         ],
                            
                        
            //         raw: true,
            //         nest: true
            //     })
            //     resolve(booking)
            // }else{
            //     let booking = await db.bookings.findAll({
            //         where: {
            //             doctorId: doctorId,
            //             statusID: "S3",
                        
            //         },
            //         include: [
            //             {
            //                 model: db.doctors,
            //                 as: 'doctorData',
            //                 attributes: [
            //                     'priceId'
            //                 ],
            //                 include: [
            //                     {
            //                         model: db.bookings,
            //                         as: 'bookingData',
            //                         attributes: [
            //                             [sequelize.fn('count', sequelize.col('doctorId')), 'total']
            //                         ]
                                
            //                     }
            //                 ]
            //             }
            //         ],
            //         // attributes: [
            //         //     [sequelize.fn('sum', sequelize.col('priceId')), 'totalIncome']
            //         // ],
            //         raw: true,
            //         nest: true
            //     })
            //     resolve(booking)
            // }
            

        } catch (e) {
            reject(e)
        }
    })
}
let totalIncomeAllDoctor = (month) => {
    return new Promise(async (resolve, reject) => {
        try {
            let sql;
            if(month =="ALL" || month == 'all') {
                // sql = `SELECT COUNT(*) as total,doctorId FROM bookings WHERE statusID = 'S3' GROUP BY doctorId` 
                sql = `SELECT COUNT(*) as total,doctorId,users.firstName,users.lastName,doctors.priceId,users.image,users.email FROM bookings INNER JOIN doctors ON bookings.doctorId = doctors.id INNER JOIN users ON doctors.userId = users.id WHERE statusID = 'S3' GROUP BY doctorId`
                
            } else {
                    sql= `SELECT COUNT(*) as total,doctorId,users.firstName,users.lastName,doctors.priceId,users.image,users.email FROM bookings INNER JOIN doctors ON bookings.doctorId = doctors.id INNER JOIN users ON doctors.userId = users.id WHERE MONTH(date) = ${month} AND statusID = 'S3' GROUP BY doctorId`
            }
            let data = await sequelize.query(sql, { type: QueryTypes.SELECT })
            resolve(data)

            // if(month=="ALL"){
            //     let booking = await db.bookings.findAll({
            //         where: {
            //             statusID: "S3"
            //         },
            //         include: [
            //             {
            //                 model: db.doctors,
            //                 as: 'doctorData',
            //                 attributes: [
            //                     [sequelize.fn('sum', sequelize.col('priceId')), 'totalIncome']
            //                 ],
            //                 include: [
            //                     {
            //                         model: db.users,
            //                         as: 'userData',
            //                     }
            //                 ]
                            
            //             }
            //         ],
            //         raw: true,
            //         nest: true
            //     })
            // }else{
            //     let booking = await db.bookings.findAll({
            //         where: {
            //             statusID: "S3",
            //             [Op.and]: [
            //                 sequelize.where(sequelize.fn('MONTH', sequelize.col('date')), month)
            //             ]
            //         },
            //         include: [
            //             {
            //                 model: db.doctors,
            //                 as: 'doctorData',
            //                 attributes: [
            //                     [sequelize.fn('count', sequelize.col('id')), 'countBooking']
            //                 ],
                            
            //                 include: [
            //                     {
            //                         model: db.users,
            //                         as: 'userData',
            //                     }
                                
            //                 ]
            //             }
            //         ],
                    
            //         raw: true,
            //         nest: true
            //     })
            //     resolve(booking)
            // } 
        } catch (e) {
            reject(e)
        }
    })
}



                                


        
            
          


module.exports = {
    getTopDocterHomes: getTopDocterHomes,
    saveDetailInfoDoctor: saveDetailInfoDoctor,
    getDetailDoctorById: getDetailDoctorById,
    bulkCreateSchedule: bulkCreateSchedule,
    getScheduleDoctorByDate: getScheduleDoctorByDate,
    handleAddInfoDoctor: handleAddInfoDoctor,
    editInfoDoctor: editInfoDoctor,
    getExtraDoctorById: getExtraDoctorById,
    getDetailDoctorByIdDoctor: getDetailDoctorByIdDoctor,
    getDetailDoctorBySpecialty: getDetailDoctorBySpecialty,
    getIdDoctorById: getIdDoctorById,
    createReviewerSchedule: createReviewerSchedule,
    getAllReviewByDoctorId: getAllReviewByDoctorId,
    countViewDoctor: countViewDoctor,
    totalIncomeByMonth: totalIncomeByMonth,
    totalIncomeAllDoctor: totalIncomeAllDoctor,
    getAllDoctor: getAllDoctor,
    editReviewerSchedule: editReviewerSchedule,

}