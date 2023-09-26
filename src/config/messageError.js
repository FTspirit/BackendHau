const messageError = {
  InternalServerError: {
    vn: 'Hệ thống đang bảo trì',
    en: 'Internal Server Error',
  },
  NotFound: {
    vn: 'Không tìm thấy',
    en: 'Not Found',
  },
  addCarError: {
    vn: 'Thông tin biển số xe đã tồn tại',
    en: 'License plate information already existed',
  },
  FeaturePenaltyError: {
    vn: 'Tính năng tra cứu phạt nguội đang bảo trì',
    en: 'The penalty search feature  is currently under maintenance',
  },
  LicensePlateNotfound: {
    vn: 'Biển số xe không có thông tin phạt nguội',
    en: 'The license plate has no fine information',
  },
};
module.exports = messageError;
