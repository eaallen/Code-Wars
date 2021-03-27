function doGet(e){
    const data = JSON.parse(e.parameter.data)
    MailApp.sendEmail({
      to:'elijahallentest@gmail.com',
      replyTo: data.email,
      subject: data.subject,
      htmlBody: `From: ${data.name} <br> Message: <br> ${data.message}`
    })
    return ContentService.createTextOutput(JSON.stringify({success:true}))
  }