
import db, { sequelize } from "../models/index";

let addNewhandbook = async (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let add = await db.handbooks.create({
                title: data.title,
                description: data.description,
                contentHTML: data.contentHTML,
                contentMarkdown: data.contentMarkdown,
                image : data.image,
            })
            resolve(add)
            } catch (e) {
                reject(e)
            }

       
    })
}
let editHandbookById = async (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let update = await db.handbooks.update({
                description: data.description,
                contentHTML: data.contentHTML,
                contentMarkdown: data.contentMarkdown,
                image : data.image,
            }, {
                where: {
                    id: data.id
                }
            })
            resolve(update)
        } catch (e) {
            reject(e)
        }
    })
}
let getAllhandbook = async () => {
    return new Promise(async (resolve, reject) => {
        try {
            let data = await db.handbooks.findAll({
                order: [
                    ['createdAt', 'DESC']
                ]
            })
            resolve(data)
        } catch (e) {
            reject(e)
        }
    })
}
let getHandbookById = async (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            let data = await db.handbooks.findOne({
                where: {
                    id: id
                }
            })
            resolve(data)
        } catch (e) {
            reject(e)
        }
    })
}
let updateView = async (Inputid) => {
    return new Promise(async (resolve, reject) => {
        try {
            let data = await db.handbooks.findOne({
                where: {
                    id: Inputid.id
                }
            })
            let views = data.view + 1;
            let update = await db.handbooks.update({
                view: views
            }, {
                where: {
                    id: Inputid.id
                }
            })

            resolve(views)
        } catch (e) {
            reject(e)
        }
    })
}
let addCommentInHandbook = async (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let add = await db.comments.create({
                content: data.content,
                userId: data.userId,
                handbookId: data.handbookId
            })
            resolve(add)
        } catch (e) {
            reject(e)
        }
    })
}
let getCommentInHandbook = async (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            let data = await db.comments.findAll({
                where: {
                    handbookId: id
                },
                order: [
                    ['createdAt', 'DESC']
                ],
                // attributes: {
                //     include: [[
                        
                //         sequelize.query(`SELECT * FROM replycomments`),
                //         'countReply'
                //     ]]
                // },
                include: [{
                    model: db.users,
                    as: 'userData2',   
                }],
                raw: true,
                nest: true

            })
                
                    

            resolve(data)
        } catch (e) {
            reject(e)
        }
    })
}
let getReplyCommentInHandbookByIdComment = async (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            let data = await db.replycomments.findAll({
                where: {
                    commentId: id
                },
                order: [
                    ['createdAt', 'DESC']
                ],
                include: [{
                    model: db.users,
                    as: 'userData3',
                }],
                raw: true,
                nest: true
            })
            resolve(data)
        } catch (e) {
            reject(e)
        }
    })
}
let addReplyCommentInHandbook = async (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let add = await db.replycomments.create({
                content: data.content,
                userId: data.userId,
                commentId: data.commentId
            })
            resolve(add)
        } catch (e) {
            reject(e)
        }
    })
}

module.exports = {
    addNewhandbook: addNewhandbook,
    getAllhandbook: getAllhandbook,
    getHandbookById: getHandbookById,
    updateView: updateView,
    addCommentInHandbook: addCommentInHandbook,
    getCommentInHandbook: getCommentInHandbook,
    addReplyCommentInHandbook: addReplyCommentInHandbook,
    getReplyCommentInHandbookByIdComment: getReplyCommentInHandbookByIdComment,
    editHandbookById: editHandbookById
}