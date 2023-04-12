import handbookService from "../service/handbookService";

let addNewhandbook = async (req, res) => {
    try {
        let data = await handbookService.addNewhandbook(req.body);
        return res.status(200).json({
            errCode: 0,
            errMessage: "Add new handbook success",
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
let getAllhandbook = async (req, res) => {
    try {
        let data = await handbookService.getAllhandbook();
        return res.status(200).json({
            errCode: 0,
            errMessage: "Get all handbook success",
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
let getHandbookById = async (req, res) => {
    try {
        let data = await handbookService.getHandbookById(req.query.id);
        return res.status(200).json({
            errCode: 0,
            errMessage: "Get handbook by id success",
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
let handleUpdateView = async (req, res) => {
    try {
        let data = await handbookService.updateView(req.query);
        return res.status(200).json({
            errCode: 0,
            errMessage: "Update view success",
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
let addCommentInHandbook = async (req, res) => {
    try {
        let data = await handbookService.addCommentInHandbook(req.body);
        return res.status(200).json({
            errCode: 0,
            errMessage: "Add comment in handbook success",
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
let getCommentInHandbook = async (req, res) => {
    try {
        let data = await handbookService.getCommentInHandbook(req.query.id);
        return res.status(200).json({
            errCode: 0,
            errMessage: "Get comment in handbook success",
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
let addReplyCommentInHandbook = async (req, res) => {
    try {
        let data = await handbookService.addReplyCommentInHandbook(req.body);
        return res.status(200).json({
            errCode: 0,
            errMessage: "Add reply comment in handbook success",
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
let getReplyCommentInHandbookByIdComment = async (req, res) => {
    try {
        let data = await handbookService.getReplyCommentInHandbookByIdComment(req.query.id);
        return res.status(200).json({
            errCode: 0,
            errMessage: "Get reply comment in handbook by id comment success",
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
let editHandbookById = async (req, res) => {
    try {
        let data = await handbookService.editHandbookById(req.body);
        return res.status(200).json({
            errCode: 0,
            errMessage: "Edit handbook by id success",
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
    addNewhandbook: addNewhandbook,
    getAllhandbook: getAllhandbook,
    getHandbookById: getHandbookById,
    handleUpdateView: handleUpdateView,
    addCommentInHandbook: addCommentInHandbook,
    getCommentInHandbook: getCommentInHandbook,
    addReplyCommentInHandbook: addReplyCommentInHandbook,
    getReplyCommentInHandbookByIdComment: getReplyCommentInHandbookByIdComment,
    editHandbookById: editHandbookById
}