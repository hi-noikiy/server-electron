const xml2js = require('xml2js')

exports.xmlToJson = (str) => {
     return new Promise((resolve, reject) => {
        const parseString = xml2js.parseString
        parseString(str, { explicitArray: false }, (err, result) => {
            if (err) {
                reject(err)
            } else {
                resolve(result)
            }
        })
     })
}

exports.jsonToXml = (obj) => {
    const builder = new xml2js.Builder()
    return builder.buildObject(obj)
}

exports.sqlToXml = (data) => {
    var obj = {
        Action: {
            data: data.data,
            $: {
                'action': data.action || 10
            }
        }
    }
    const builder = new xml2js.Builder({
        headless: false,
        xmldec: false
    });
    var xml = builder.buildObject(obj);
    return JSON.stringify(xml);
}