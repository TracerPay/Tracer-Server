import { db } from '../lib/database.lib.js';
import Constants from '../lib/constants.lib.js';

export default class ReportsM {
  static getReport = async (reportID) => {
    try {
      const report = await db.dbReports().findOne({ reportID }, { projection: Constants.DEFAULT_PROJECTION });
      return report;
    } catch (error) {
      throw new Error('Error getting report from DB: ' + error.message);
    }
  };

  static getReports = async (organizationID, type) => {
    try {
      const reports = await db.dbReports().find({ organizationID, type}, { projection: Constants.DEFAULT_PROJECTION }).toArray();
      console.log(reports);
      return reports;
    } catch (error) {
      throw new Error('Error getting reports from DB: ' + error.message);
    }
  };

  static getAllReports = async (organizationID) => {
    try {
      const reports = await db.dbReports().find({ organizationID }, { projection: Constants.DEFAULT_PROJECTION }).toArray();
      return reports;
    } catch (error) {
      throw new Error('Error getting all reports from DB: ' + error.message);
    }
  };

  static reportExists = async (organizationID, processor, type, month) => {
    try {
      const existingReport = await db.dbReports().findOne({
        organizationID,
        processor,
        type,
        month
      });
      console.log(existingReport);
      return !!existingReport; // Return true if a report exists, false otherwise
    } catch (error) {
      throw new Error('Error checking existing report in the DB: ' + error.message);
    }
  };

  static createReport = async (reportData) => {
    try {
      const report = await db.dbReports().insertOne(reportData);
      return report;
    } catch (error) {
      throw new Error('Error creating report in the DB: ' + error.message);
    }
  };

  static invoiceNum = async (organizationID, processor, type) => {
    try {
      // Fetch the current invoice number from a separate collection
      const invoices = await db.dbReports().find(
        { 
          organizationID,
          processor,
          type
        }
      ).toArray();
      return invoices.length + 1;
    } catch (error) {
      throw new Error('Error generating invoice number: ' + error.message);
    }
  };
}
