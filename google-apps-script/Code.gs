/**
 * Guru Purnima registration → Google Sheet.
 *
 * Paste this into the Apps Script editor of the spreadsheet that should hold
 * the registrations (Extensions → Apps Script), then deploy as a Web App.
 * See FORMS-SETUP.md for the full step-by-step.
 */

// Column order written to the sheet. Header row is created automatically.
var HEADERS = [
  'Timestamp',
  'First Name',
  'Last Name',
  'Email',
  'Phone',
  'Address',
  'Additional Guests',
  'Need Accommodation',
  'Accommodation Guests',
];

// Where to send no-JavaScript visitors after a successful submit.
var THANKS_URL = 'https://www.sriyogi.site/guru-purnima/thanks/';

function doPost(e) {
  var lock = LockService.getScriptLock();
  lock.waitLock(30000); // avoid two submissions clobbering the same row
  try {
    var data = (e && e.parameter) ? e.parameter : {};

    // Honeypot — bots fill this; humans never see it. Silently accept & drop.
    if (data['bot-field']) {
      return _redirectOrJson(true);
    }

    var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheets()[0];

    // Add the header row once, on the first submission.
    if (sheet.getLastRow() === 0) {
      sheet.appendRow(HEADERS);
    }

    sheet.appendRow([
      new Date(),
      data.firstName || '',
      data.lastName || '',
      data.email || '',
      data.phone || '',
      data.address || '',
      data.additionalGuests || '',
      data.accommodation || '',
      data.accommodationGuests || '',
    ]);

    return _redirectOrJson(true);
  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ result: 'error', error: String(err) }))
      .setMimeType(ContentService.MimeType.JSON);
  } finally {
    lock.releaseLock();
  }
}

// The website uses a no-cors fetch (response ignored), so JSON is fine there.
// For visitors with JavaScript disabled (a plain form POST), redirect them to
// the thank-you page via a tiny HTML page.
function _redirectOrJson(ok) {
  var html =
    '<!doctype html><meta http-equiv="refresh" content="0; url=' + THANKS_URL + '">' +
    '<p>Thank you. Redirecting… If nothing happens, ' +
    '<a href="' + THANKS_URL + '">click here</a>.</p>';
  return HtmlService.createHtmlOutput(html);
}
