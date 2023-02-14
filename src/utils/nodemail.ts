import nodemailer, {Transporter} from "nodemailer"

type Email = (param: string, param2: string) => void

const mail: Email = (body: string, emailDest: string) => {
  let transporter:Transporter = nodemailer.createTransport({
    host: "localhost",
    port: 1025,
    secure: false,
    tls:{
      rejectUnauthorized: false
    }
  })
  
  let message: {} = {
    from: "from@test.fr",
    to: emailDest,
    subject: "test nodemailer",
    html: body,
  
  }
  
  
      
  transporter.verify((err, success):void => {
    if(err){
      console.log(err)
    }else{
      transporter.sendMail(message, (error, info):void => {
        console.log(info)
      })
    }
  })
}

export default mail