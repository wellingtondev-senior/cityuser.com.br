export function isTokenExpireVerefic(token: string) {

    const {access_token} = JSON.parse(token);

    const arrPayload = access_token.split('.')[1]
    const bufferPayload = Buffer.from(arrPayload, "base64")
    const toStringToken = bufferPayload.toString("utf8");
    const payload = JSON.parse(toStringToken)
  
    const timeStamp = Math.floor(Date.now() / 1000);
    return timeStamp > payload.exp;

}