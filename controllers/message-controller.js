const Message = require('../models/message-model');

exports.save = async (req, res, next) => {
    let newLinkId = await getUniqueLinkId();
    let msg = new Message({
        subject: req.body.subject,
        body: req.body.body,
        linkId: newLinkId,
        status: 'pending'
    });

    msg.save()
    .then((savedMsg) => {
        res.status(200).json({sts: 1, linkId: newLinkId});
    }).catch((error) => {
        res.status(500).json({sts: -1, erorr: 'Internal Server Error'})
    })

}

exports.viewMsg = async (req, res, next) => {
    const msgId = req.params['msgId'];
    const msgObj = await Message.checkLinkExists(msgId);

    if (msgObj.status === 'viewed') {
        res.status(200).json({sts: 1, info: 'Messge has already been seen'});
    } else {
        const filter = { linkId: msgId};
        const update = { status: 'viewed' };

        let updatedMsgObj = await Message.findOneAndUpdate(filter, update);

        if (msgObj && updatedMsgObj) {
            res.status(200).json({sts: 1, msg: msgObj});
        } else {
            res.status(400).json({sts: -1, error: 'Link is not available'});
        }
    }
}

const getUniqueLinkId = async () => {
    let uniqueLink = makeUniqueId();
    const checkLink = await Message.checkLinkExists(uniqueLink);

    while (checkLink) {
        uniqueLink = makeUniqueId();
        checkLink = await Message.checkLinkExists(uniqueLink);
    }

    return uniqueLink;
}

const makeUniqueId = () => {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    let counter = 0;

    while (counter < 16) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
        counter += 1;
    }

    return result;
}

// exports.signin = async (req, res, next) => {
//     const user = await User.login(req.body.email, req.body.password);
    
//     if (user) {
//         user.password = undefined; 
//         console.log(user);
//         res.status(200).json({sts: 1, user: user});
//     } else {
//         res.status(401).json({sts: -1});
//     }
// }
