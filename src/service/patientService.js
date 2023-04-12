import db from '../models/index';
let bookAppointment = async (data) => {
   
    try {
        if (!data.email) {
            return ({
                errCode: 1,
                errMessage: "Email không được để trống"
            })
        } else {
            let user = await db.users.findOrCreate({
                where: {
                    email: data.email
                },
                defaults: {
                    email: data.email,
                    roleId: 'R3',

                }
            })
            if (user && user[0]) {
                await db.bookings.findOrCreate({
                    where: {
                        patient: user[0].id,
                    },
                    defaults: {
                        statusId: 'S1',
                        patientId: user[0].id,
                        doctorId: data.doctorId,
                        date: data.date,
                        timeType: data.timeType,
                    }

                })
            }
            return user;
        }
    }
    catch (e) {
       
    }


}

module.exports = {
    bookAppointment: bookAppointment
}