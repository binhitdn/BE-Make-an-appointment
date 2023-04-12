import patientService from "./../service/patientService";
let handlePatientBookAppointment = async (req, res) => {
    let data = await patientService.bookAppointment(req.body);
    if (data) {
        return res.status(200).json({
            success: true,
            message: "Đặt lịch thành công",
            data: data
        })
    } else {
        return res.status(200).json({
            success: false,
            message: "Đặt lịch thất bại"
        })
    }
}
module.exports = {
    handlePatientBookAppointment: handlePatientBookAppointment
}