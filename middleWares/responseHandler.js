module.exports = {
    // send response with with out data liken as not found or server error 
    "responseWithOutData": (res, responseCode, responseMessage) => {
        res.send({
            responseCode: responseCode
            , responseMessage: responseMessage
        });
    }, //  send response with object data=>
    "responseWithObjectData": (res, responseCode, responseMessage, result) => {
        res.send({
            responseCode: responseCode
            , responseMessage: responseMessage
            , result: result
        });
    }, // send response with array object data
    "responseWithArrayData": (res, responseCode, responseMessage, results) => {
        res.send({
            responseCode: responseCode
            , responseMessage: responseMessage
            , results: results
        });
    }, // send response with token and  object data
    "responseTokenWithObjectdata": (res, responseCode, responseMessage, result) => {
        res.send({
            responseCode: responseCode
            , responseMessage: responseMessage
            , result: result
        });
    }
}