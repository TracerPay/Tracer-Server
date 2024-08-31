export default class ARRow {
  constructor(name, agentID, invoiceNum, month, lineItemName, lineItemQuantity, lineItemAmount, lineItemPrice) {
    this.customerName = name;
    this.customerID = agentID;
    this.invoiceNum = `Invoice-${invoiceNum.toString().padStart(4, '0')}`;
    this.invoiceDate = month;
    this.dueDate = month;
    this.lineItemName = lineItemName;
    this.lineItemQuantity = lineItemQuantity;
    this.lineItemAmount = lineItemAmount;
    this.lineItemPrice = lineItemPrice;
  }

  updateReport(data) {
    for (let key in data) {
      if (this.hasOwnProperty(key)) {
        this[key] = data[key];
      }
    }
    this.updatedAt = new Date();
  }
}