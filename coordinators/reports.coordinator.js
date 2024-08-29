import fs from 'fs';
import csv from 'csv-parser'; // Ensure you have this package installed
import reportsM from '../models/reports.model.js';

export default class ReportsCoor {
  static getReports = async () => {
    try {
      const reports = await reportsM.getReports();
      return reports;
    } catch (error) {
      throw new Error('Error getting reports: ' + error.message);
    }
  };

  static createReport = async (processor, filePath) => {
    try {
      const csvData = await this.parseCSV(filePath);
      const report = await reportsM.createReport({ processor, data: csvData });
      return report;
    } catch (error) {
      throw new Error('Error creating report: ' + error.message);
    }
  };

  static parseCSV = (filePath) => {
    return new Promise((resolve, reject) => {
      const results = [];
      fs.createReadStream(filePath)
        .pipe(csv())
        .on('data', (data) => results.push(data))
        .on('end', () => {
          fs.unlinkSync(filePath); // Clean up the uploaded file
          resolve(results);
        })
        .on('error', (err) => {
          reject(err);
        });
    });
  };
}
