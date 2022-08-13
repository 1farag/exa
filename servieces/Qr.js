const QRCode = require('qrcode');
const productModel = require('../DB/model/product');

async function Qr_code (doc,model){
    const qrData = JSON.stringify(doc)
    const qrCode = await QRCode.toDataURL(qrData, {
          errorCorrectionLevel: 'H'
        })
        console.log(qrCode);
        const id = doc.id
    await model.findByIdAndUpdate(id,
          {
            qrCode: qrCode
          },
          {
            new: true
          }
        )
  }  


module.exports = Qr_code