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

      if (!files || (!files.acceptBlueFile && !files.paayFile)) {
        res.status(400).json({ message: 'No files uploaded' });
        return;
      }

      const reportPromises = [];
      const organizationID = req.params.organizationID; // Get the organization ID from the request parameters
      if (files.acceptBlueFile) {
        const fileBuffer = files.acceptBlueFile[0].buffer;
        const mimetype = files.acceptBlueFile[0].mimetype;
        const promises = await ReportsCoor.createReport(organizationID, 'accept.blue', fileBuffer, mimetype, {});
        promises.forEach(promise => reportPromises.push(promise));
      }

      if (files.paayFile) {
        const promises = await ReportsCoor.createReport(
          organizationID,
          'PAAY',
          files.paayFile[0].buffer,
          files.paayFile[0].mimetype,
          reportPromises[1].billReport
        );
        promises.forEach(promise => reportPromises.push(promise));
      }

      const reports = await Promise.all(reportPromises);

      res.status(200).json({ message: 'Reports created successfully', reports });
    } catch (error) {
      next(error);
    }
  };

  static deleteReport = async (req, res, next) => {
    try {
      const report = await ReportsCoor.deleteReport(req.params.reportID);
      if (!report) {
        res.status(404).json({ message: 'Report not deleted' });
      } else {
        res.status(200).json(report);
      };
    } catch (error) {
      next(error);
    };


  };
};


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

