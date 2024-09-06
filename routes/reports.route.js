import express from 'express';
import ReportsCon from '../controllers/reports.controller.js';
import multer from 'multer';

const reportR = express.Router();
const upload = multer({ dest: 'uploads/' });


reportR.post(
  '/organizations/:organizationID',
  upload.fields([
    { name: 'acceptBlueFile', maxCount: 1 },
    { name: 'paayFile', maxCount: 1 }
  ]),
  ReportsCon.createReports
);
reportR.get('/organizations/:organizationID', ReportsCon.getAllReports);
reportR.get('/organizations/:organizationID/:type', ReportsCon.getReports);
reportR.get('/:reportID', ReportsCon.getReport);

export default reportR;