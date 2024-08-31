import ReportsCoor from '../coordinators/reports.coordinator.js';

export default class ReportsCon {
  static getReport = async (req, res, next) => {
    try {
      const report = await ReportsCoor.getReport(req.params.reportID);
      if (!report) {
        res.status(404).json({ message: 'Report not found' });
      } else {
        res.status(200).json(report);
      };
    } catch (error) {
      next(error);
    };
  }

  static getReports = async (req, res, next) => {
    try {
      console.log(req.params.organizationID, req.params.type);
      const reports = await ReportsCoor.getReports(req.params.organizationID, req.params.type);
      if (!reports) {
        res.status(404).json({ message: 'No reports found' });
      } else {
        res.status(200).json(reports);
      };
    } catch (error) {
      next(error);
    };
  };

  static getAllReports = async (req, res, next) => {
    try {
      const reports = await ReportsCoor.getAllReports(req.params.organizationID);
      if (!reports) {
        res.status(404).json({ message: 'No reports found' });
      } else {
        res.status(200).json(reports);
      };
    } catch (error) {
      next(error);
    };
  };

  static createReports = async (req, res, next) => {
    try {
      const files = req.files; // Object containing files for each field
      const processors = req.body.processor; // Array of processors corresponding to files

      if (!files || (!files.acceptBlueFile && !files.paayFile)) {
        res.status(400).json({ message: 'No files uploaded' });
        return;
      }

      const reportPromises = [];
      console.log(req.params.organizationID);

      if (files.acceptBlueFile) {
        reportPromises.push(ReportsCoor.createReport(req.params.organizationID, 'accept.blue', files.acceptBlueFile[0].path));
      }

      if (files.paayFile) {
        reportPromises.push(ReportsCoor.createReport('PAAY', files.paayFile[0].path));
      }

      const reports = await Promise.all(reportPromises);

      res.status(200).json({ message: 'Reports created successfully', reports });
    } catch (error) {
      next(error);
    };
  };
}


/*
  static updateReport = async (req, res, next) => {
    try {
      const report = await ReportsCoor.updateReport(req.params.id, req.body);
      if (!report) {
        res.status(404).json({ message: 'Report not updated' });
      } else {
        res.status(200).json(report);
      };
    } catch (error) {
      next(error);
    };
  };

  static deleteReport = async (req, res, next) => {
    try {
      const report = await ReportsCoor.deleteReport(req.params.id);
      if (!report) {
        res.status(404).json({ message: 'Report not deleted' });
      } else {
        res.status(200).json(report);
      };
    } catch (error) {
      next(error);
    };
  };

  static updateProcessorReport = async (req, res, next) => {
    try {
      const report = await ReportsCoor.updateProcessorReport(req.params.reportID, req.params.processorID, req.file.path);
      if (!report) {
        res.status(404).json({ message: 'Report not updated' });
      } else {
        res.status(200).json(report);
      };
    } catch (error) {
      next(error);
    };
  };

  static deleteProcessorReport = async (req, res, next) => {
    try {
      const report = await ReportsCoor.deleteProcessorReport(req.params.reportID, req.params.processorID);
      if (!report) {
        res.status(404).json({ message: 'Report not deleted' });
      } else {
        res.status(200).json(report);
      };
    } catch (error) {
      next(error);
    };
  };*/
