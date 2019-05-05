const buildResponse = (statusCode, body) => {
    return {
        statusCode,
        headers: {
            "Access-Control-Allow-Origin": "*",
            "Acesss-Control-Allow-Credentials": true,
        },
        body: JSON.stringify(body)
    }
}

const success = body => buildResponse(200, body)
const failure = body => buildResponse(500, body)

export { success, failure }