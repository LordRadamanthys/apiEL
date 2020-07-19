const multer = require('multer')
const path = require('path')
const crypto = require('crypto')

module.exports = {
    uploads(local) {

        return {
            storage: multer.diskStorage({

                destination: path.resolve(__dirname, '..', 'uploads', local),
                filename(req, file, callback) {
                    //if(!req.image) return new Error('Imagem não veio')
                    const hash = crypto.randomBytes(6).toString('hex')

                    const fileName = `${hash}_${file.originalname}`

                    callback(null, fileName)
                }
            })
        }
    }
}


// const multer = require('multer')
// const path = require('path')

// module.exports = {
//     dest: path.resolve(__dirname, '..'  , 'uploads'),
//     storage: multer.diskStorage({
//         destination: (req, file, cb) => {
//             cb(null, path.resolve(__dirname, '..', 'uploads'))
//         },
//         filename: (req, file, cb) => {

//             const typeImage = file.mimetype.split('/')

//             const fileName = `${req.userId}.${typeImage[1]}`
//             cb(null, fileName)
//         }
//     }),
//     limits: {
//         fileSize: 7 * 1024 * 1024,
//     },
//     fileFilter: (req, file, cb) => {
//         const allowedMimes = [
//             'image/jpeg',
//             'image/pjpeg',
//             'image/jpg',
//             'image/png',
//             'image/gif',
//         ]

//         if (allowedMimes.includes(file.mimetype)) {
//             cb(null, true)
//         } else {
//             cb(new Error('File invalid' + file.mimetype))
//         }
//     }
// }