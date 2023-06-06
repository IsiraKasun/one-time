const express = require('express')
const router = express.Router();
const msgController = require('../controllers/message-controller');
const {check, validationResult, body } = require('express-validator');

router.post('/save',
    check('subject').isLength({min: 2})
    .withMessage('Must be at least 2 characters long'),
    check('body').isLength({min: 2})
    .withMessage('Must be at least 2 characters long'),
    async (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            res.status(400);
            return res.json({errors: errors.array()})
        }

        next();
    }, 
    msgController.save)

router.get('/:msgId', msgController.viewMsg)

// router.post('/signin', 
//     (req, res, next) => {
//         if (req.method !== 'POST') {
//             next({sts: 405, error: 'Method not Allowed'})
//         }
//         next();
//     },
//     check('email').isLength({min: 1})
//     .withMessage('Username cannot be empty'),
//     check('password').isLength({min: 1})
//     .withMessage('Password cannot be empty'), 
//     authController.signin)

module.exports = router;