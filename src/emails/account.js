const sgMail = require('@sendgrid/mail')
// const sendgridAPIKey = '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'

// sgMail.setApiKey(sendgridAPIKey)
sgMail.setApiKey(process.env.SENDGRID_API_KEY)

const sendWellcomeEmail = (email,name) => {
    sgMail.send({
        to:email,
        from:'fazlerabby122@gmail.com',
        subject:'test mail',
        text:`Welcome to the task manager app, ${name}. Now you can do every crud operatios in our system`
    })
}


const sendCancelationcomeEmail = (email,name) => {
    sgMail.send({
        to:email,
        from:'fazlerabby122@gmail.com',
        subject:'test mail',
        text:`Goodbye, ${name}. Hope to see you soon`
    })
}
module.exports = {
    sendWellcomeEmail,
    sendCancelationcomeEmail
}

// sgMail.send({
//     to:'fazlerabby122@yahoo.com',
//     from:'fazlerabby122@gmail.com',
//     subject:'test mail',
//     text:'This is a test mail from nodejs and sendgrid'
// })


