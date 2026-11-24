import { ApiError } from '../utils/ApiError.js';

export const notFound = (req, _res, next) => {
  next(new ApiError(404, `Không tìm thấy ${req.method} ${req.originalUrl}`));
};
export const errorHandler = (err, _req, res, _next) => {
  if (err instanceof ApiError) {
    return res.status(err.status).json({ message: err.message, ...(err.errors && { errors: err.errors }) });
  }
  if (err.type === 'entity.parse.failed') {
    return res.status(400).json({ message: 'Body JSON không hợp lệ' });
  }
  if (err.type === 'entity.too.large') {
    return res.status(400).json({ message: 'Dữ liệu gửi lên quá lớn' });
  }
  if (err.name === 'CastError') {
    return res.status(400).json({ message: 'Id không hợp lệ' });
  }
  if (err.code === 11000) {
    return res.status(409).json({ message: 'Dữ liệu bị trùng' });
  }
  console.error(err);
  return res.status(500).json({ message: 'Lỗi máy chủ' });
};
