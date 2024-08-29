import express from 'express';
import ReportsCon from '../controllers/reports.controller.js';
import multer from 'multer';

const reportR = express.Router();
const upload = multer({ dest: 'uploads/' });

reportR.get('', ReportsCon.getReports);
reportR.post(
  '',
  upload.fields([
    { name: 'acceptBlueFile', maxCount: 1 },
    { name: 'paayFile', maxCount: 1 }
  ]),
  ReportsCon.createReports
);
/*reportR.get('/report', ReportsCon.getReports);
reportR.put('/report/:id', ReportsCon.updateReport);
reportR.delete('/report/:id', ReportsCon.deleteReport);
reportR.patch('/report/:reportID/processor/:processorID', upload.single('file'), ReportsCon.updateProcessorReport);
reportR.delete('/report/:id/processor/:processorID', ReportsCon.deleteProcessorReport);*/

export default reportR;