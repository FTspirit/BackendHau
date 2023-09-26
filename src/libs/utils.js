/* eslint-disable radix */
/* eslint-disable no-mixed-operators */
/* eslint-disable no-bitwise */
/* eslint-disable no-param-reassign */
const randomstring = require('randomstring');
const Promise = require('promise');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const base64url = require('base64url');
const randToken = require('rand-token');
const moment = require('moment');
const geoLib = require('geolib');
const otpGenerator = require('otp-generator');
const config = require('../config/config');

const generateCode = () => {
  return otpGenerator.generate(6, { lowerCaseAlphabets: false, upperCaseAlphabets: false, specialChars: false });
};
// 'xxxxxx'.replace(/[xy]/g, (c) => {
//   const r = (Math.random() * 6) | 0;
//   const v = c === 'x' ? r : (r & 0x3) | 0x8;
//   return v.toString(6);
// });

module.exports.getBearerToken = (headers) => {
  if (headers && headers.authorization) {
    const parted = headers.authorization.split(' ');
    if (parted.length === 2 && parted[0] === 'Bearer') {
      return parted[1];
    }
    return null;
  }
  return null;
};

module.exports.createToken = (id) =>
  new Promise((resolve, reject) => {
    const token = jwt.sign(JSON.parse(JSON.stringify({ id })), config.jwt.secret, {
      expiresIn: 60 * config.jwt.accessExpirationMinutes,
    });
    jwt.verify(token, config.jwt.secret, (err, data) => {
      if (err) {
        resolve(false);
      }
    });
    resolve(token);
  });

module.exports.getOtpCode = () => generateCode();

module.exports.getExpiredTime = () => parseInt((new Date().getTime() + 60 * config.otp.otpExpirationMinutes * 1000) / 1000);

module.exports.getCurrentTime = () => parseInt(new Date().getTime() / 1000);

module.exports.generateCodeVerifier = () => randomstring.generate(43);

module.exports.generateTrackingId = () => randomstring.generate(48);

// eslint-disable-next-line camelcase
module.exports.generateCodeChallenge = (code_verifier) => {
  const base64Digest = crypto.createHash('sha256').update(code_verifier).digest('base64');
  return base64url.fromBase64(base64Digest);
};

module.exports.generateState = () => crypto.randomBytes(4).toString('hex');

module.exports.createRefreshToken = () => {
  const token = randToken.generate(255);
  return token;
};

// ham get cac phan tu xuat hien 1 lan sau khi da sort mang
module.exports.getOnceTimeElement = (arr, n) => {
  const ans = [];
  for (let i = 0; i < n; i++) {
    if (arr[i] !== arr[i + 1] && arr[i] !== arr[i - 1]) {
      ans.push(arr[i]);
    }
  }
  return ans;
};

// ham get cac phan tu duplicate name va sta_city sau khi sort mang
module.exports.getDuplicateSPs = (arr, n) => {
  const ans = [];
  for (let i = 1; i < n - 1; i++) {
    if (
      (arr[i].name === arr[i + 1].name && arr[i].sta_cty === arr[i + 1].sta_cty) ||
      (arr[i].name === arr[i - 1].name && arr[i].sta_cty === arr[i - 1].sta_cty)
    ) {
      ans.push(arr[i]);
    }
  }
  // so sanh phan tu 0 va 1, phan tu thu n - 2 va n - 1
  if (arr[0].name === arr[1].name && arr[0].sta_cty === arr[1].sta_cty) ans.push(arr[0]);
  if (arr[n - 1].name === arr[n - 2].name && arr[n - 1].sta_cty === arr[n - 2].sta_cty) ans.push(arr[n - 1]);
  return ans;
};

// ham generate gpx format
module.exports.createGPX = (coordinates, reqGpxNormalStep) => {
  const gpx7FirstStep = 1000;
  let gpxNormalStep;
  if (reqGpxNormalStep) {
    gpxNormalStep = reqGpxNormalStep;
  } else {
    gpxNormalStep = 100;
  }

  let newRecord;
  let gpx;
  let coordTime = moment().format('YYYY-MM-DD[T]HH:mm:ss.SSSZ');
  for (let i = 0; i < coordinates.length; i++) {
    // const timestamp_ = coordinates[i].timestamp;
    // const coordTime = moment(timestamp_).format('YYYY-MM-DD[T]HH:mm:ss');
    let gpxStep = gpxNormalStep;
    if (i < 7) gpxStep = gpx7FirstStep;
    coordTime = moment(coordTime).add(gpxStep, 'milliseconds').format('YYYY-MM-DD[T]HH:mm:ss.SSSZ');
    newRecord =
      `<wpt lat=\"${coordinates[i][0]}\" lon=\"${coordinates[i][1]}\">\n <name>` +
      `Point${i}</name>\n <time>${coordTime}Z</time>\n</wpt>\n`;
    if (gpx === undefined) {
      gpx = '<?xml version="1.0"?>\n<gpx version="1.1" creator="hiennv">\n';
    }
    gpx += newRecord;
  }
  gpx = `${gpx}</gpx>`;
  return gpx;
};

module.exports.dividePointWithDistance = async (listLatLon, reqMaxDistance) => {
  let maxDistance;
  if (reqMaxDistance) {
    maxDistance = reqMaxDistance;
  } else {
    maxDistance = 5; // 5m
  }
  // console.log(listLatLon.length);
  // Get distance and get center between 2 point
  let checkDistanceInvalid = true;
  while (checkDistanceInvalid) {
    checkDistanceInvalid = false;
    const tempListLatLon = [];
    for (let i = 1; i < listLatLon.length; i += 1) {
      // const distancefrom2Point = await geoLib.getPreciseDistance(listLatLon[i - 1], listLatLon[i]);
      // Note: Phai dung cong thuc tinh, vi lib tinh sai
      const distancefrom2Point =
        1000 * mapUtil.GetDistance(listLatLon[i - 1][0], listLatLon[i - 1][1], listLatLon[i][0], listLatLon[i][1], 'K');
      // console.log(distancefrom2Point);
      if (distancefrom2Point) {
        tempListLatLon.push(listLatLon[i - 1]);
      }
      if (distancefrom2Point > maxDistance) {
        // console.log(listLatLon[i-1]);
        // console.log(listLatLon[i]);
        checkDistanceInvalid = true;
        const pointA = { latitude: listLatLon[i - 1][0], longitude: listLatLon[i - 1][1] };
        const pointB = { latitude: listLatLon[i][0], longitude: listLatLon[i][1] };
        const newPoint = geoLib.getCenter([pointA, pointB]);
        // console.log(newPoint);
        const tempNewPoint = [parseFloat(newPoint.latitude.toFixed(6)), parseFloat(newPoint.longitude.toFixed(6))];
        tempListLatLon.push(tempNewPoint);
      }
    }
    // update last element location
    tempListLatLon.push(listLatLon[listLatLon.length - 1]);
    listLatLon.splice(0, listLatLon.length);
    listLatLon = tempListLatLon.slice();
  }
  // console.log(listLatLon.length);
  return listLatLon;
};
