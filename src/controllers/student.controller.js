/* eslint-disable no-shadow */
/* eslint-disable no-unused-vars */
/* eslint-disable no-plusplus */
/* eslint-disable camelcase */
/* eslint-disable no-await-in-loop */
/* eslint-disable no-undef */
/* eslint-disable no-restricted-syntax */

const axios = require('axios');
const httpStatus = require('http-status');
const { parse } = require('node-html-parser');
const catchAsync = require('../helpers/catchAsync');
const logger = require('../config/logger');
const ApiError = require('../helpers/ApiError');

// Import serivce
const { userService, studentService } = require('../services/index');

const login = catchAsync(async (req, res) => {
  const formData = new URLSearchParams();
  formData.append('Role', `${req.body.role}`);
  formData.append('UserName', `${req.body.username}`);
  formData.append('Password', `${req.body.password}`);
  let cookies = null;

  const axiosInstance = axios.create({
    baseURL: 'https://tinchi.hau.edu.vn/',
    timeout: 3000,
  });
  axiosInstance
    .get('/')
    .then((response) => {
      const parts = response.headers['set-cookie'][0].split(';');
      cookies = parts[0].trim();
      axios
        .post('https://tinchi.hau.edu.vn/DangNhap/CheckLogin', formData, {
          headers: {
            Cookie: cookies,
          },
        })
        .then((response) => {
          const axiosInstanceGet = axios.create({
            baseURL: 'https://tinchi.hau.edu.vn/TraCuuDiem/Index',
            headers: {
              Cookie: cookies,
            },
          });
          axiosInstanceGet
            .get('/')
            .then((response) => {
              const root = parse(response.data);
              const studentName = root.querySelector('#ulMenu2 .styMenu').text.trim();
              const studentCode = root.querySelector('#MaSinhVien').text;
              const learningGrading4 = root.querySelector('#XepLoaiHTH4').text;
              const learningGrading10 = root.querySelector('#XepLoaiHTH10').text;
              const Average = root.querySelector('#TBHTH4').text;
              const cumulativeAverage = root.querySelector('#TBCTichLuy').text;
              const accumulatedCredits = root.querySelector('#TinChiTichLuy').text;
              const academicCredits = root.querySelector('#TinChiHocTap').text;

              // parser score
              // Find the table element by its ID
              const tableElement = root.querySelector('#ctl00_ContentCP_ctl00_gvDiem');
              // Initialize an array to store the extracted data
              const extractedData = [];
              if (tableElement) {
                // Select all table rows except the header row (skipping the first row)
                const tableRows = tableElement.querySelectorAll('tbody tr:not(.table-header)');

                // Loop through the table rows
                tableRows.forEach((row) => {
                  const rowData = row.querySelectorAll('td'); // Select all table cells in the row

                  // Extract data from each cell and push it into the extractedData array
                  const rowDataArray = rowData.map((cell) => cell.text.trim());
                  extractedData.push(rowDataArray);
                });
              }

              const studentData = {
                studentName,
                studentCode,
                learningGrading4,
                learningGrading10,
                Average,
                cumulativeAverage,
                accumulatedCredits,
                academicCredits,
                scoreData: {
                  extractedData,
                },
                cookies,
              };
              res.status(httpStatus.OK).send(studentData);
            })
            .catch((error) => {
              logger.error(`Error: ${error}`);
              return res.status(500).send('Internal Server Errror!');
            });
        })
        .catch((error) => {
          logger.error(`Error: ${error}`);
          return res.status(500).send('Internal Server Errror!');
        });
    })
    .catch((error) => {
      logger.error(`Error: ${error}`);
      return res.status(500).send('Internal Server Errror!');
    });
});

const schedule = catchAsync(async (req, res) => {
  const axiosInstanceGet = axios.create({
    baseURL: 'https://tinchi.hau.edu.vn/TraCuuLichHoc',
    headers: {
      Cookie: req.body.cookies,
    },
  });
  axiosInstanceGet
    .get('/ThongTinLichHoc?HocKy=1&NamHoc=2023&ChuyenNganh=0&Dothoc=1')
    .then((response) => {
      // Parse the HTML content
      const root = parse(response.data);

      // Find the table element by ID or any other means
      const table = root.querySelector('table');

      // Initialize an array to store the table data
      const tableData = [];

      // Iterate through the table rows
      table.querySelectorAll('tr').forEach((row) => {
        // Initialize an object to store row data
        const rowData = {};

        // Iterate through the table cells (columns) in the row
        row.querySelectorAll('td').forEach((cell, index) => {
          // Use the cell text content and remove any HTML tags or extra whitespace
          const cellData = cell.text.trim();

          // Assign the cell data to the corresponding property in the rowData object
          switch (index) {
            case 0:
              rowData.STT = cellData;
              break;
            case 1:
              rowData.TenHocPhan = cellData;
              break;
            case 2:
              rowData.SoTinChi = cellData;
              break;
            // Add more cases for other columns as needed
            default:
              break;
          }
        });

        // Push the rowData object into the tableData array
        tableData.push(rowData);
      });

      res.status(httpStatus.OK).send(response.data);
    })
    .catch((error) => {
      logger.error(`Error: ${error}`);
    });
});

const loginV2 = catchAsync(async (req, res) => {
  const data = {
    studentName: 'Phạm Đăng Phúc',
    studentClass: '20CN5',
    studentCode: '2055010203',
    learningGrading4: 'Khá',
    learningGrading10: 'Khá',
    Average: '3.04',
    cumulativeAverage: '3.04 ',
    accumulatedCredits: '99 / 99',
    academicCredits: '108',
    scoreData: {
      extractedData: [
        ['1', 'TC2611', 'Toán Đại số', '3', '1', 'QT : 7', '7', '7', '3', 'B', '', ''],
        ['2', 'TC2701', 'Vật lý P1', '2', '1', 'QT : 7', '4.5', '5.3', '1', 'D', '', ''],
        ['3', 'CT3901.1', 'Triết học Mác - LêNin', '3', '1', 'QT : 9', '5', '5.8', '2', 'C', '', ''],
      ],
    },
  };
  res.status(httpStatus.OK).send(data);
});

// API Login
// Method: POOST
// Example request
// "role": 0,
// "username": "2051010113",
// "password": "205101011326112002"
const loginV3 = catchAsync(async (req, res) => {
  const { username, password } = req.body;
  const checkUser = {
    user_name: username,
    password,
  };
  const result = await userService.checkUserAndPassword(checkUser);
  if (!result) {
    return res.status(500).send('Internal Server Errror!');
  }
  const studentCodeData = {
    student_code: result.student_code,
  };
  const studentData = await studentService.getStudentByCodeService(studentCodeData);

  res.status(httpStatus.OK).send(studentData);
});

module.exports = {
  login,
  schedule,
  loginV2,
  loginV3,
};
