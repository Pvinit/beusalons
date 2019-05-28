module.exports = function () {
    var env = "localEnv";


    var localEnv = {
        PORT: 8000
        , port: 8001
        , DB_URL: 'mongodb://localhost/beusalons'
        , key: "beusalons"
        , secretKey: '<@beusalons@>'
        , url: "http://localhost:8080"
        , server: 'Local Server'
    }

    return env == "localEnv" ? localEnv : localEnv;
}