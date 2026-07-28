/**
 * Seva registrations → public confirmation list (READ-ONLY).
 *
 * Reads the three Guru Purnima seva response spreadsheets and returns a
 * combined { name, seva } list as JSON (or JSONP when ?callback= is given).
 * The website's /guru-purnima/seva-confirmation/ page calls this so devotees
 * can confirm the seva(s) they registered for. The sheets STAY PRIVATE — this
 * script runs as you (the owner) and only exposes the name + seva label, never
 * phone/email/address.
 *
 * Deploy this in ONE of the three spreadsheets (or a brand-new one — it opens
 * all three by ID). See SEVA-CONFIRMATIONS-SETUP.md for the full steps.
 */

// The three seva response spreadsheets. `gid` picks the response tab.
// Add/remove entries here if the sevas change.
var SHEETS = [
  { id: '15Vmy5I_SdwG_-cJx1KIQPSLwYnudEH-f7zVVd7nvmDg', gid: 1504500198 },
  { id: '1UT7txLNt5wNBPZ8Pb9d0KpaeN9XzsvJuktk1tUcf0Hg', gid: 331356767 },
  { id: '1zv69qYJ6ICjz19kWO7kreDEr2J0Z67-sM07-ZZaOJcs', gid: 755020665 },
];

// OPTIONAL manual overrides, only if auto-detection picks the wrong columns.
// Key by spreadsheet id. Use header text EXACTLY as it appears in row 1.
//   label       – the seva name to show (defaults to the spreadsheet's title)
//   nameHeaders – ['Name']  OR  ['First Name', 'Last Name']
//   sevaHeader  – header of the column that lists the chosen seva(s), if any
// Verify auto-detection first by opening the /exec URL with ?debug=1 appended.
var OVERRIDES = {
  // '15Vmy5I_SdwG_-cJx1KIQPSLwYnudEH-f7zVVd7nvmDg': {
  //   label: 'Guru Padukapuja Sankalpa Seva',
  //   nameHeaders: ['Name'],
  //   sevaHeader: '',
  // },
};

var CACHE_KEY = 'seva_confirmations_v1';
var CACHE_SECONDS = 30; // list refreshes at most every ~30s (keeps it snappy)

function doGet(e) {
  var params = (e && e.parameter) ? e.parameter : {};

  // Debug view: shows the detected headers/columns per sheet so you can
  // confirm auto-detection (or fill in OVERRIDES). Never cached.
  if (params.debug) {
    return _output(_collect(), params.callback);
  }

  var cache = CacheService.getScriptCache();
  var json = params.nocache ? null : cache.get(CACHE_KEY);
  if (!json) {
    var data = _collect();
    json = JSON.stringify({
      updated: new Date().toISOString(),
      count: data.records.length,
      records: data.records,
    });
    try { cache.put(CACHE_KEY, json, CACHE_SECONDS); } catch (err) {}
  }
  return _output(json, params.callback);
}

// Returns either JSON or, when a callback name is supplied, JSONP.
function _output(payload, callback) {
  var json = (typeof payload === 'string') ? payload : JSON.stringify(payload);
  if (callback) {
    return ContentService
      .createTextOutput(callback + '(' + json + ');')
      .setMimeType(ContentService.MimeType.JAVASCRIPT);
  }
  return ContentService
    .createTextOutput(json)
    .setMimeType(ContentService.MimeType.JSON);
}

function _collect() {
  var records = [];
  var meta = [];

  for (var s = 0; s < SHEETS.length; s++) {
    var cfg = SHEETS[s];
    try {
      var ss = SpreadsheetApp.openById(cfg.id);
      var sheet = _getSheet(ss, cfg.gid);
      var ov = OVERRIDES[cfg.id] || {};
      var label = (ov.label || ss.getName().replace(/\s*\(Responses\)\s*$/i, '')).trim();

      var values = sheet.getDataRange().getValues();
      if (!values || values.length < 2) {
        meta.push({ id: cfg.id, label: label, rows: 0 });
        continue;
      }

      var headers = values[0];
      var nameCols = ov.nameHeaders ? _mapNameHeaders(headers, ov.nameHeaders)
                                    : _findNameCols(headers);
      var sevaCol = ov.sevaHeader ? headers.map(String).indexOf(ov.sevaHeader)
                                  : _findSevaCol(headers);

      for (var r = 1; r < values.length; r++) {
        var name = _nameFrom(values[r], nameCols);
        if (!name) continue;
        var seva = label;
        if (sevaCol !== -1) {
          var sel = String(values[r][sevaCol] || '').trim();
          if (sel && sel.toLowerCase() !== label.toLowerCase()) {
            seva = label + ' — ' + sel;
          }
        }
        records.push({ name: name, seva: seva });
      }

      meta.push({
        id: cfg.id, label: label, rows: values.length - 1,
        headers: headers, nameCols: nameCols, sevaCol: sevaCol,
        sevaHeader: sevaCol !== -1 ? headers[sevaCol] : null,
      });
    } catch (err) {
      meta.push({ id: cfg.id, error: String(err) });
    }
  }

  records.sort(function (a, b) { return a.name.localeCompare(b.name); });
  return { records: records, meta: meta };
}

function _getSheet(ss, gid) {
  var sheets = ss.getSheets();
  if (gid === undefined || gid === null || gid === '') return sheets[0];
  for (var i = 0; i < sheets.length; i++) {
    if (sheets[i].getSheetId() === Number(gid)) return sheets[i];
  }
  return sheets[0];
}

// Detects the name column(s). Handles a single "Name" column or a
// "First Name" + "Last Name" pair.
function _findNameCols(headers) {
  var lc = headers.map(function (h) { return String(h).trim().toLowerCase(); });

  var first = -1, last = -1;
  for (var j = 0; j < lc.length; j++) {
    if (first === -1 && lc[j].indexOf('first name') !== -1) first = j;
    if (last === -1 && lc[j].indexOf('last name') !== -1) last = j;
  }
  if (first !== -1 && last !== -1) return { first: first, last: last };

  var priorities = ['devotee name', 'name of the devotee', 'full name', 'your name', 'name'];
  for (var p = 0; p < priorities.length; p++) {
    var idx = lc.indexOf(priorities[p]);
    if (idx !== -1) return { single: idx };
  }
  for (var i = 0; i < lc.length; i++) {
    if (lc[i].indexOf('name') !== -1 && lc[i].indexOf('user') === -1) return { single: i };
  }
  if (first !== -1) return { single: first };
  return null;
}

// Detects a column that lists the chosen seva(s), skipping obvious
// non-seva fields. Returns -1 if none — then the spreadsheet title is used.
function _findSevaCol(headers) {
  var lc = headers.map(function (h) { return String(h).trim().toLowerCase(); });
  var skip = /(name|e-?mail|phone|mobile|contact|whats\s*app|timestamp|address|amount|paid|payment|gotra|rashi|raashi|nakshatra|guest|member|date)/;
  for (var i = 0; i < lc.length; i++) {
    if (skip.test(lc[i])) continue;
    if (/(seva|service|offering|puja|pooja|samarpana|bimba|which|choose|select|opt)/.test(lc[i])) return i;
  }
  return -1;
}

function _mapNameHeaders(headers, arr) {
  var hs = headers.map(String);
  var idx = [];
  for (var i = 0; i < arr.length; i++) {
    var k = hs.indexOf(arr[i]);
    if (k !== -1) idx.push(k);
  }
  if (idx.length === 0) return null;
  if (idx.length === 1) return { single: idx[0] };
  return { first: idx[0], last: idx[1] };
}

function _nameFrom(row, nameCols) {
  if (!nameCols) return '';
  if (nameCols.single !== undefined) return String(row[nameCols.single] || '').trim();
  if (nameCols.first !== undefined) {
    var f = String(row[nameCols.first] || '').trim();
    var l = nameCols.last !== undefined ? String(row[nameCols.last] || '').trim() : '';
    return (f + ' ' + l).trim();
  }
  return '';
}
