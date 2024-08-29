import { db } from '../lib/database.lib.js';
import Constants from '../lib/constants.lib.js';

export default class ReportsM {
  static getReports = async () => {
    try {
      const reports = await db.dbReports().find({}, { projection: Constants.DEFAULT_PROJECTION }).toArray();
      return reports;
    } catch (error) {
      throw new Error('Error getting reports from DB: ' + error.message);
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
}
