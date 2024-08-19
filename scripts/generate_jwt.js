const jwt = require('jsonwebtoken');

function generateJWT(privateKey, apiKeyId, issuerId) {
    let now = Math.round((new Date()).getTime() / 1000);
    let nowPlus20 = now + 1199; // 20 minutes later

    let payload = {
        "iss": issuerId,
        "exp": nowPlus20,
        "aud": "appstoreconnect-v1"
    };

    let signOptions = {
        "algorithm": "ES256",
        header: {
            "alg": "ES256",
            "kid": apiKeyId,
            "typ": "JWT"
        }
    };

    return jwt.sign(payload, privateKey, signOptions);
}

const privateKey = process.argv[2];
const apiKeyId = process.argv[3];
const issuerId = process.argv[4];

const token = generateJWT(privateKey, apiKeyId, issuerId);
console.log(token);