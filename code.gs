// Google Apps Script Backend for Teacher Administration Dashboard
// Following CORS bypass rules: No custom headers needed

// Spreadsheet ID - REPLACE WITH YOUR SPREADSHEET ID
const SPREADSHEET_ID = '1Gedn6C21H0T9D9SznpwKPex42GhDqksNOuGthxF6Tuo';

// Global variables - Use the specific spreadsheet ID instead of active spreadsheet
var SS = SpreadsheetApp.openById(SPREADSHEET_ID);

// Initialize sheets when the web app loads
function doGet(e) {
  return handleRequest(e || {});
}

function doPost(e) {
  return handleRequest(e || {});
}

function handleRequest(e) {
  // Initialize sheets if they don't exist
  initializeSheets();
  
  // Process the request parameters - langsung dari e.parameter sesuai rules CORS.txt
  var params = e && e.parameter ? e.parameter : {};
  var action = params.action;
  
  // Debug logging
  Logger.log('Received request with parameters:');
  Logger.log('e.parameter:', e.parameter);
  Logger.log('action:', action);
  Logger.log('params:', params);
  
  // If no action provided, return a default response for direct browser access
  if (!action) {
    return createCORSResponse(JSON.stringify({
      success: true,
      message: "Teacher Administration API is running. Please use POST requests with an action parameter."
    }));
  }
  
  var result = { success: false, error: "Invalid action" };
  
  // Route to the appropriate function based on action
  try {
    Logger.log('Processing action:', action);
    switch(action) {
      // Debug actions
      case 'debugSiswaData':
        Logger.log('Executing debugSiswaData');
        result = debugSiswaData();
        break;
        
      case 'debugSpreadsheetConnection':
        Logger.log('Executing debugSpreadsheetConnection');
        result = debugSpreadsheetConnection();
        break;
        
      // User actions
      case 'login':
        Logger.log('Executing login');
        result = login(params);
        break;
      case 'createUser':
        result = createUser(params);
        break;
      case 'updateUser':
        result = updateUser(params);
        break;
      case 'deleteUser':
        result = deleteUser(params);
        break;
      case 'getUsers':
        result = getUsers(params);
        break;
        
      // Kelas (Class) actions
      case 'getKelas':
        if (params.paginated === 'true') {
          result = getKelasPaginated(params);
        } else {
          result = getKelas(params);
        }
        break;
      case 'createKelas':
        result = createKelas(params);
        break;
      case 'updateKelas':
        result = updateKelas(params);
        break;
      case 'deleteKelas':
        result = deleteKelas(params);
        break;
        
      // Siswa (Student) actions
      case 'getSiswa':
        if (params.paginated === 'true') {
          result = getSiswaPaginated(params);
        } else {
          result = getSiswa(params);
        }
        break;
      case 'createSiswa':
        result = createSiswa(params);
        break;
      case 'updateSiswa':
        result = updateSiswa(params);
        break;
      case 'deleteSiswa':
        result = deleteSiswa(params);
        break;
        
      // Tugas (Assignment) actions
      case 'getTugas':
        if (params.paginated === 'true') {
          result = getTugasPaginated(params);
        } else {
          result = getTugas(params);
        }
        break;
      case 'createTugas':
        result = createTugas(params);
        break;
      case 'updateTugas':
        result = updateTugas(params);
        break;
      case 'deleteTugas':
        result = deleteTugas(params);
        break;
        
      // Nilai (Grade) actions
      case 'getNilai':
        if (params.paginated === 'true') {
          result = getNilaiPaginated(params);
        } else {
          result = getNilai(params);
        }
        break;
      case 'createNilai':
        result = createNilai(params);
        break;
      case 'updateNilai':
        result = updateNilai(params);
        break;
      case 'deleteNilai':
        result = deleteNilai(params);
        break;
        
      // Presensi (Attendance) actions
      case 'getPresensi':
        if (params.paginated === 'true') {
          result = getPresensiPaginated(params);
        } else {
          result = getPresensi(params);
        }
        break;
      case 'createPresensi':
        result = createPresensi(params);
        break;
      case 'updatePresensi':
        result = updatePresensi(params);
        break;
      case 'deletePresensi':
        result = deletePresensi(params);
        break;
        
      // Event actions
      case 'getEvent':
        result = getEvent(params);
        break;
      case 'getEvents':
        result = getEvents(params);
        break;
      case 'createEvent':
        result = createEvent(params);
        break;
      case 'updateEvent':
        result = updateEvent(params);
        break;
      case 'deleteEvent':
        result = deleteEvent(params);
        break;
        
      // Jurnal Pembelajaran (Learning Journal) actions
      case 'getJurnal':
        result = getJurnal(params);
        break;
      case 'createJurnal':
        result = createJurnal(params);
        break;
      case 'updateJurnal':
        result = updateJurnal(params);
        break;
      case 'deleteJurnal':
        result = deleteJurnal(params);
        break;
        
      // Bank Soal (Question Bank) actions
      case 'getBankSoal':
        result = getBankSoal(params);
        break;
      case 'createBankSoal':
        result = createBankSoal(params);
        break;
      case 'updateBankSoal':
        result = updateBankSoal(params);
        break;
      case 'deleteBankSoal':
        result = deleteBankSoal(params);
        break;
        
      // Gamifikasi actions
      case 'getGamifikasiXP':
        result = getGamifikasiXP(params);
        break;
      case 'createGamifikasiXP':
        result = createGamifikasiXP(params);
        break;
      case 'updateGamifikasiXP':
        result = updateGamifikasiXP(params);
        break;
      case 'deleteGamifikasiXP':
        result = deleteGamifikasiXP(params);
        break;
      case 'getGamifikasiBadge':
        result = getGamifikasiBadge(params);
        break;
      case 'createGamifikasiBadge':
        result = createGamifikasiBadge(params);
        break;
      case 'updateGamifikasiBadge':
        result = updateGamifikasiBadge(params);
        break;
      case 'deleteGamifikasiBadge':
        result = deleteGamifikasiBadge(params);
        break;
      case 'getSiswaBadge':
        result = getSiswaBadge(params);
        break;
      case 'createSiswaBadge':
        result = createSiswaBadge(params);
        break;
      case 'updateSiswaBadge':
        result = updateSiswaBadge(params);
        break;
      case 'deleteSiswaBadge':
        result = deleteSiswaBadge(params);
        break;
        
      // Detail Presensi (Attendance Detail) actions
      case 'getDetailPresensi':
        Logger.log('Executing getDetailPresensi');
        result = getDetailPresensi(params);
        break;
      case 'createDetailPresensi':
        Logger.log('Executing createDetailPresensi');
        result = createDetailPresensi(params);
        break;
      case 'updateDetailPresensi':
        Logger.log('Executing updateDetailPresensi');
        result = updateDetailPresensi(params);
        break;
      case 'deleteDetailPresensi':
        Logger.log('Executing deleteDetailPresensi');
        result = deleteDetailPresensi(params);
        break;
        
      // Student role actions
      case 'studentLogin':
        result = studentLogin(params);
        break;
      case 'getSiswaNilai': 
        result = getSiswaNilai(params);
        break;
      case 'getSiswaGamification':
        result = getSiswaGamification(params);
        break;
      case 'testStudentLogin':
        result = testStudentLogin();
        break;
        
      // Google Sheets import action
      case 'getSiswaFromSheet':
        Logger.log('Executing getSiswaFromSheet');
        result = getSiswaFromSheet(params);
        break;
        
      default:
        // Invalid action
        Logger.log('Invalid action received:', action);
        result = { success: false, error: "Invalid action: " + action };
    }
  } catch(error) {
    Logger.log('Error in handleRequest:', error);
    result = { success: false, error: error.toString() };
  }
  
  // Return the result as JSON with CORS headers
  return createCORSResponse(JSON.stringify(result));
}

/**
 * Initializes all required sheets with proper headers if they don't exist
 */
function initializeSheets() {
  var sheets = {
    // User sheet for authentication
    'User': ['id', 'username', 'password', 'name', 'role', 'email', 'created_at', 'updated_at'],
    
    'Kelas': ['id', 'nama_kelas', 'tingkat', 'tahun_ajaran', 'wali_kelas', 'mata_pelajaran', 'created_at', 'updated_at'],
    
    'Siswa': ['id', 'kelas_id', 'nama', 'nis', 'jenis_kelamin', 'tanggal_lahir', 'alamat', 'nama_orang_tua', 'no_telp', 'password', 'created_at', 'updated_at'],
    
    'Tugas': ['id', 'kelas_id', 'judul', 'deskripsi', 'jenis', 'tanggal_mulai', 'tanggal_selesai', 'bobot', 'status', 'created_at', 'updated_at'],
    
    'Nilai': ['id', 'siswa_id', 'tugas_id', 'nilai', 'komentar', 'tanggal_penilaian', 'created_at', 'updated_at'],
    
    'Presensi': ['id', 'kelas_id', 'tanggal', 'jam_mulai', 'jam_selesai', 'materi', 'catatan', 'created_at', 'updated_at'],
    
    'DetailPresensi': ['id', 'presensi_id', 'siswa_id', 'status', 'keterangan', 'created_at', 'updated_at'],
    
    'Event': ['id', 'judul', 'deskripsi', 'jenis', 'lokasi', 'tanggal_mulai', 'tanggal_selesai', 'status', 'created_at', 'updated_at'],
    
    'JurnalPembelajaran': ['id', 'kelas_id', 'tanggal', 'materi', 'metode', 'media', 'kegiatan_pendahuluan', 'kegiatan_inti', 'kegiatan_penutup', 'evaluasi', 'refleksi', 'rencana_tindak_lanjut', 'created_at', 'updated_at'],
    
    'BankSoal': ['id', 'kategori', 'tingkat_kesulitan', 'mata_pelajaran', 'bab', 'pertanyaan', 'pilihan_a', 'pilihan_b', 'pilihan_c', 'pilihan_d', 'jawaban_benar', 'penjelasan', 'created_at', 'updated_at'],
    
    'GamifikasiXP': ['id', 'siswa_id', 'jumlah_xp', 'level', 'aktivitas', 'deskripsi', 'tanggal', 'created_at', 'updated_at'],
    
    'GamifikasiBadge': ['id', 'nama_badge', 'deskripsi', 'icon_url', 'syarat_perolehan', 'xp_reward', 'created_at', 'updated_at'],
    
    'SiswaBadge': ['id', 'siswa_id', 'badge_id', 'tanggal_perolehan', 'created_at', 'updated_at']
  };
  
  // Create each sheet if it doesn't exist
  for (var sheetName in sheets) {
    var sheet = SS.getSheetByName(sheetName);
    
    // If sheet doesn't exist, create it with headers
    if (!sheet) {
      sheet = SS.insertSheet(sheetName);
      
      // Set the headers in the first row
      var headers = sheets[sheetName];
      sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
      
      // Format the header row
      sheet.getRange(1, 1, 1, headers.length).setFontWeight("bold");
      sheet.setFrozenRows(1);
      
      // Add default admin user if this is the User sheet
      if (sheetName === 'User') {
        var adminUser = [
          generateUniqueId(),    // id
          'admin',               // username
          'admin123',            // password (in a real app, this should be hashed)
          'Administrator',       // name
          'admin',               // role
          'admin@example.com',   // email
          getCurrentTimestamp(), // created_at
          getCurrentTimestamp()  // updated_at
        ];
        sheet.appendRow(adminUser);
      }
    } else {
      // If sheet exists, check if it has all the required headers
      updateSheetSchema(sheet, sheets[sheetName]);
    }
  }
}

/**
 * Updates an existing sheet schema by adding any missing columns
 * @param {Sheet} sheet - The sheet to update
 * @param {Array} requiredHeaders - The headers that should be in the sheet
 */
function updateSheetSchema(sheet, requiredHeaders) {
  // Get the existing headers from the sheet
  var existingHeaders = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];
  
  // Check if any required headers are missing
  var missingHeaders = requiredHeaders.filter(function(header) {
    return existingHeaders.indexOf(header) === -1;
  });
  
  // If there are missing headers, add them
  if (missingHeaders.length > 0) {
    Logger.log('Adding missing headers to sheet ' + sheet.getName() + ': ' + missingHeaders.join(', '));
    
    // Add each missing header as a new column
    missingHeaders.forEach(function(header) {
      // Add the header to the next available column
      var nextColumn = existingHeaders.length + 1;
      sheet.getRange(1, nextColumn).setValue(header);
      
      // Update the existingHeaders array
      existingHeaders.push(header);
    });
    
    // Format the header row
    sheet.getRange(1, 1, 1, existingHeaders.length).setFontWeight("bold");
  }
}

// Function to manually force schema update for all sheets
function forceUpdateSchemas() {
  var sheets = {
    // User sheet for authentication
    'User': ['id', 'username', 'password', 'name', 'role', 'email', 'created_at', 'updated_at'],
    
    'Kelas': ['id', 'nama_kelas', 'tingkat', 'tahun_ajaran', 'wali_kelas', 'mata_pelajaran', 'created_at', 'updated_at'],
    
    'Siswa': ['id', 'kelas_id', 'nama', 'nis', 'jenis_kelamin', 'tanggal_lahir', 'alamat', 'nama_orang_tua', 'no_telp', 'password', 'created_at', 'updated_at'],
    
    'Tugas': ['id', 'kelas_id', 'judul', 'deskripsi', 'jenis', 'tanggal_mulai', 'tanggal_selesai', 'bobot', 'status', 'created_at', 'updated_at'],
    
    'Nilai': ['id', 'siswa_id', 'tugas_id', 'nilai', 'komentar', 'tanggal_penilaian', 'created_at', 'updated_at'],
    
    'Presensi': ['id', 'kelas_id', 'tanggal', 'jam_mulai', 'jam_selesai', 'materi', 'catatan', 'created_at', 'updated_at'],
    
    'DetailPresensi': ['id', 'presensi_id', 'siswa_id', 'status', 'keterangan', 'created_at', 'updated_at'],
    
    'Event': ['id', 'judul', 'deskripsi', 'jenis', 'lokasi', 'tanggal_mulai', 'tanggal_selesai', 'status', 'created_at', 'updated_at'],
    
    'JurnalPembelajaran': ['id', 'kelas_id', 'tanggal', 'materi', 'metode', 'media', 'kegiatan_pendahuluan', 'kegiatan_inti', 'kegiatan_penutup', 'evaluasi', 'refleksi', 'rencana_tindak_lanjut', 'created_at', 'updated_at'],
    
    'BankSoal': ['id', 'kategori', 'tingkat_kesulitan', 'mata_pelajaran', 'bab', 'pertanyaan', 'pilihan_a', 'pilihan_b', 'pilihan_c', 'pilihan_d', 'jawaban_benar', 'penjelasan', 'created_at', 'updated_at'],
    
    'GamifikasiXP': ['id', 'siswa_id', 'jumlah_xp', 'level', 'aktivitas', 'deskripsi', 'tanggal', 'created_at', 'updated_at'],
    
    'GamifikasiBadge': ['id', 'nama_badge', 'deskripsi', 'icon_url', 'syarat_perolehan', 'xp_reward', 'created_at', 'updated_at'],
    
    'SiswaBadge': ['id', 'siswa_id', 'badge_id', 'tanggal_perolehan', 'created_at', 'updated_at']
  };
  
  // Update each sheet schema
  for (var sheetName in sheets) {
    var sheet = SS.getSheetByName(sheetName);
    
    if (sheet) {
      updateSheetSchema(sheet, sheets[sheetName]);
    }
  }
  
  return { success: true, message: "All sheet schemas have been updated." };
}

/**
 * Special test function that creates a test student account if needed and verifies functionality
 */
function testStudentLogin() {
  // First update schema to ensure we have password field
  forceUpdateSchemas();
  
  try {
    // Check if we have any students
    var siswaSheet = SS.getSheetByName('Siswa');
    if (!siswaSheet) {
      return { 
        success: false, 
        error: "Siswa sheet not found! Please run initializeSheets() first."
      };
    }
    
    var data = siswaSheet.getDataRange().getValues();
    var headers = data.shift();
    
    var idIndex = headers.indexOf('id');
    var nisIndex = headers.indexOf('nis');
    var namaIndex = headers.indexOf('nama');
    var passwordIndex = headers.indexOf('password');
    
    Logger.log("Test login: Found columns - id:" + idIndex + ", nis:" + nisIndex + 
               ", nama:" + namaIndex + ", password:" + passwordIndex);
    
    // If no students, create a test student
    if (data.length === 0) {
      var testStudentId = generateUniqueId();
      var testNis = "12345";
      var testPassword = "password123";
      var testStudent = [];
      
      // Create array with all fields
      for (var i = 0; i < headers.length; i++) {
        switch(headers[i]) {
          case 'id':
            testStudent.push(testStudentId);
            break;
          case 'nama':
            testStudent.push("Test Student");
            break;
          case 'nis':
            testStudent.push(testNis);
            break;
          case 'password':
            testStudent.push(testPassword);
            break;
          case 'jenis_kelamin':
            testStudent.push("Laki-laki");
            break;
          case 'tanggal_lahir':
            testStudent.push("2000-01-01");
            break;
          case 'kelas_id':
            testStudent.push("");
            break;
          case 'created_at':
          case 'updated_at':
            testStudent.push(getCurrentTimestamp());
            break;
          default:
            testStudent.push("");
        }
      }
      
      siswaSheet.appendRow(testStudent);
      Logger.log("Created test student with NIS: " + testNis + " and password: " + testPassword);
      
      return { 
        success: true, 
        message: "Created test student account. Use NIS: " + testNis + " and password: " + testPassword + " to login.",
        testAccount: {
          nis: testNis,
          password: testPassword
        }
      };
    } else {
      // Find an existing student and ensure they have a password
      var studentRow = -1;
      var studentNis = "";
      var studentPassword = "";
      
      for (var i = 0; i < data.length; i++) {
        if (data[i][nisIndex]) {
          studentRow = i + 2; // +2 for header row and 1-indexed
          studentNis = data[i][nisIndex];
          
          // Check if student has a password
          if (passwordIndex !== -1) {
            studentPassword = data[i][passwordIndex];
            
            // If no password, set a default one (same as NIS)
            if (!studentPassword) {
              studentPassword = studentNis;
              siswaSheet.getRange(studentRow, passwordIndex + 1).setValue(studentPassword);
              Logger.log("Updated student password to match NIS: " + studentPassword);
            }
          }
          
          break;
        }
      }
      
      if (studentRow !== -1) {
        return { 
          success: true, 
          message: "Found existing student. Use NIS: " + studentNis + " and password: " + studentPassword + " to login.",
          testAccount: {
            nis: studentNis,
            password: studentPassword
          }
        };
      } else {
        return { 
          success: false, 
          error: "No valid student records found in the Siswa sheet."
        };
      }
    }
  } catch (error) {
    Logger.log("Error in testStudentLogin: " + error.toString());
    return { 
      success: false, 
      error: "Error testing student login: " + error.toString()
    };
  }
}

// Helper Functions for CRUD Operations

/**
 * Generates a unique ID
 */
function generateUniqueId() {
  return Utilities.getUuid();
}

/**
 * Gets the current timestamp
 */
function getCurrentTimestamp() {
  return new Date().toISOString();
}

/**
 * Gets all data from a sheet as an array of objects
 */
function getAllData(sheetName) {
  Logger.log('🔍 getAllData called for sheet:', sheetName);
  
  var sheet = SS.getSheetByName(sheetName);
  if (!sheet) {
    Logger.log('❌ Sheet not found:', sheetName);
    return [];
  }
  
  // Debug: Check which spreadsheet we're actually reading from
  Logger.log('🔍 Reading from Spreadsheet ID:', SS.getId());
  Logger.log('🔍 Expected Spreadsheet ID:', SPREADSHEET_ID);
  Logger.log('🔍 Spreadsheet URL:', SS.getUrl());
  
  var data = sheet.getDataRange().getValues();
  Logger.log('🔍 Raw data from sheet (first 3 rows):');
  for (var i = 0; i < Math.min(3, data.length); i++) {
    Logger.log('🔍 Row ' + i + ':', data[i]);
  }
  
  var headers = data.shift();
  Logger.log('🔍 Headers:', headers);
  
  var result = data.map(function(row) {
    var obj = {};
    headers.forEach(function(header, index) {
      obj[header] = row[index];
    });
    return obj;
  });
  
  Logger.log('🔍 Processed data (first object):', result.length > 0 ? JSON.stringify(result[0]) : 'No data');
  
  return result;
}

/**
 * Finds a record by ID in a specific sheet
 */
function findRecordById(sheetName, id) {
  var sheet = SS.getSheetByName(sheetName);
  if (!sheet) {
    Logger.log("Sheet not found: " + sheetName);
    return null;
  }
  
  var data = sheet.getDataRange().getValues();
  var headers = data.shift();
  
  // Convert id to string for comparison
  var idStr = String(id);
  
  Logger.log("Searching for ID: " + idStr + " in sheet: " + sheetName);
  Logger.log("Headers: " + JSON.stringify(headers));
  Logger.log("First row data: " + JSON.stringify(data[0] || []));
  Logger.log("Total rows: " + data.length);
  
  for (var i = 0; i < data.length; i++) {
    var rowId = data[i][0];
    var rowIdStr = String(rowId);
    Logger.log("Row " + i + " ID: " + rowIdStr + " (type: " + typeof rowId + "), comparing with: " + idStr);
    // Convert cell value to string for comparison
    if (rowIdStr === idStr) {
      Logger.log("Match found at row: " + (i + 2));
      var obj = {};
      headers.forEach(function(header, index) {
        obj[header] = data[i][index];
      });
      return { data: obj, rowIndex: i + 2 }; // +2 because we shifted headers and rows are 1-indexed
    }
  }
  
  Logger.log("No match found for ID: " + idStr + " in sheet: " + sheetName);
  return null;
}

/**
 * Finds a user by username
 */
function findUserByUsername(username) {
  var sheet = SS.getSheetByName('User');
  if (!sheet) {
    return null;
  }
  
  var data = sheet.getDataRange().getValues();
  var headers = data.shift();
  
  // Find username index
  var usernameIndex = headers.indexOf('username');
  if (usernameIndex === -1) return null;
  
  for (var i = 0; i < data.length; i++) {
    if (data[i][usernameIndex] === username) {
      var obj = {};
      headers.forEach(function(header, index) {
        obj[header] = data[i][index];
      });
      return { data: obj, rowIndex: i + 2 }; // +2 because we shifted headers and rows are 1-indexed
    }
  }
  
  return null;
}

// === USER AUTHENTICATION AND MANAGEMENT ===

/**
 * Authenticates a user by username and password
 */
function login(params) {
  try {
    var username = params.username;
    var password = params.password;
    
    if (!username || !password) {
      return { success: false, error: "Username and password are required" };
    }
    
    // Find user by username
    var user = findUserByUsername(username);
    
    if (!user) {
      return { success: false, error: "Invalid username or password" };
    }
    
    // Check password
    if (user.data.password !== password) {
      return { success: false, error: "Invalid username or password" };
    }
    
    // Return user data without password
    var userData = {
      id: user.data.id,
      username: user.data.username,
      name: user.data.name,
      role: user.data.role,
      email: user.data.email
    };
    
    return { 
      success: true, 
      user: userData,
      token: "session-token-" + new Date().getTime() // In a real app, generate a proper JWT or session token
    };
  } catch (error) {
    return { success: false, error: error.toString() };
  }
}

/**
 * Creates a new user
 */
function createUser(params) {
  try {
    // Check if user with username already exists
    var existingUser = findUserByUsername(params.username);
    if (existingUser) {
      return { success: false, error: "Username already exists" };
    }
    
    var sheet = SS.getSheetByName('User');
    
    // Get headers
    var headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];
    
    // Create new row data
    var rowData = [];
    var timestamp = getCurrentTimestamp();
    
    // Generate ID if not provided
    var id = params.id || generateUniqueId();
    
    // Populate row data based on headers
    headers.forEach(function(header) {
      switch(header) {
        case 'id':
          rowData.push(id);
          break;
        case 'created_at':
        case 'updated_at':
          rowData.push(timestamp);
          break;
        default:
          rowData.push(params[header] || '');
      }
    });
    
    // Append new row
    sheet.appendRow(rowData);
    
    return { success: true, data: { id: id } };
  } catch (error) {
    return { success: false, error: error.toString() };
  }
}

/**
 * Gets users (filtered by role if specified)
 */
function getUsers(params) {
  try {
    if (params.id) {
      // Get specific user by ID
      var record = findRecordById('User', params.id);
      if (!record) {
        return { success: false, error: "User not found" };
      }
      
      // Don't return password
      var userData = {...record.data};
      delete userData.password;
      
      return { success: true, data: userData };
    } else {
      // Get all users
      var users = getAllData('User');
      
      // Filter by role if specified
      if (params.role) {
        users = users.filter(function(user) {
          return user.role === params.role;
        });
      }
      
      // Remove passwords from results
      users = users.map(function(user) {
        var userData = {...user};
        delete userData.password;
        return userData;
      });
      
      return { success: true, data: users };
    }
  } catch (error) {
    return { success: false, error: error.toString() };
  }
}

/**
 * Updates a user
 */
function updateUser(params) {
  try {
    if (!params.id) {
      return { success: false, error: "ID is required" };
    }
    
    // Find the user
    var record = findRecordById('User', params.id);
    if (!record) {
      return { success: false, error: "User not found" };
    }
    
    // If updating username, check if it's unique
    if (params.username && params.username !== record.data.username) {
      var existingUser = findUserByUsername(params.username);
      if (existingUser) {
        return { success: false, error: "Username already exists" };
      }
    }
    
    var sheet = SS.getSheetByName('User');
    
    // Get headers
    var headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];
    
    // Create updated row data
    var rowData = [];
    var timestamp = getCurrentTimestamp();
    
    // Update values based on parameters
    headers.forEach(function(header) {
      switch(header) {
        case 'id':
          rowData.push(params.id);
          break;
        case 'updated_at':
          rowData.push(timestamp);
          break;
        case 'created_at':
          rowData.push(record.data.created_at);
          break;
        default:
          // Use new value if provided, otherwise keep the old value
          rowData.push(params[header] !== undefined ? params[header] : record.data[header]);
      }
    });
    
    // Update the row
    sheet.getRange(record.rowIndex, 1, 1, rowData.length).setValues([rowData]);
    
    return { success: true, data: { id: params.id } };
  } catch (error) {
    return { success: false, error: error.toString() };
  }
}

/**
 * Deletes a user
 */
function deleteUser(params) {
  try {
    if (!params.id) {
      return { success: false, error: "ID is required" };
    }
    
    // Find the user
    var record = findRecordById('User', params.id);
    if (!record) {
      return { success: false, error: "User not found" };
    }
    
    var sheet = SS.getSheetByName('User');
    
    // Delete the row
    sheet.deleteRow(record.rowIndex);
    
    return { success: true, data: { id: params.id } };
  } catch (error) {
    return { success: false, error: error.toString() };
  }
}

// === IMPLEMENTATION FOR KELAS (CLASS) ===

function getKelas(params) {
  try {
    if (params.id) {
      // Get specific class by ID
      var record = findRecordById('Kelas', params.id);
      if (!record) {
        return { success: false, error: "Kelas not found" };
      }
      return { success: true, data: record.data };
    } else {
      // Get all classes
      var data = getAllData('Kelas');
      return { success: true, data: data };
    }
  } catch (error) {
    return { success: false, error: error.toString() };
  }
}

function createKelas(params) {
  try {
    var sheet = SS.getSheetByName('Kelas');
    
    // Get headers
    var headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];
    
    // Create new row data
    var rowData = [];
    var timestamp = getCurrentTimestamp();
    
    // Generate ID if not provided
    var id = params.id || generateUniqueId();
    
    // Populate row data based on headers
    headers.forEach(function(header) {
      switch(header) {
        case 'id':
          rowData.push(id);
          break;
        case 'created_at':
        case 'updated_at':
          rowData.push(timestamp);
          break;
        default:
          rowData.push(params[header] || '');
      }
    });
    
    // Append new row
    sheet.appendRow(rowData);
    
    return { success: true, data: { id: id } };
  } catch (error) {
    return { success: false, error: error.toString() };
  }
}

function updateKelas(params) {
  try {
    if (!params.id) {
      return { success: false, error: "ID is required" };
    }
    
    // Find the record
    var record = findRecordById('Kelas', params.id);
    if (!record) {
      return { success: false, error: "Kelas not found" };
    }
    
    var sheet = SS.getSheetByName('Kelas');
    
    // Get headers
    var headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];
    
    // Create updated row data
    var rowData = [];
    var timestamp = getCurrentTimestamp();
    
    // Update values based on parameters
    headers.forEach(function(header) {
      switch(header) {
        case 'id':
          rowData.push(params.id);
          break;
        case 'updated_at':
          rowData.push(timestamp);
          break;
        case 'created_at':
          rowData.push(record.data.created_at);
          break;
        default:
          // Use new value if provided, otherwise keep the old value
          rowData.push(params[header] !== undefined ? params[header] : record.data[header]);
      }
    });
    
    // Update the row
    sheet.getRange(record.rowIndex, 1, 1, rowData.length).setValues([rowData]);
    
    return { success: true, data: { id: params.id } };
  } catch (error) {
    return { success: false, error: error.toString() };
  }
}

function deleteKelas(params) {
  try {
    if (!params.id) {
      return { success: false, error: "ID is required" };
    }
    
    // Find the record
    var record = findRecordById('Kelas', params.id);
    if (!record) {
      return { success: false, error: "Kelas not found" };
    }
    
    var sheet = SS.getSheetByName('Kelas');
    
    // Delete the row
    sheet.deleteRow(record.rowIndex);
    
    return { success: true, data: { id: params.id } };
  } catch (error) {
    return { success: false, error: error.toString() };
  }
}

// === IMPLEMENT REMAINING ENTITY OPERATIONS SIMILARLY ===
// (getSiswa, createSiswa, updateSiswa, deleteSiswa, etc.)

// === SISWA (STUDENT) OPERATIONS ===

function getSiswa(params) {
  try {
    // Debug logging
    Logger.log('🔍 getSiswa called with params:', JSON.stringify(params));
    
    // Accept either id or siswa_id for finding a specific student
    var id = params.id || params.siswa_id;
    if (id) {
      // Get specific student by ID
      var record = findRecordById('Siswa', id);
      if (!record) {
        return { success: false, error: "Siswa not found" };
      }
      return { success: true, data: record.data };
    } else if (params.kelas_id) {
      // Get students by class ID
      var allStudents = getAllData('Siswa');
      var filteredStudents = allStudents.filter(function(student) {
        return student.kelas_id === params.kelas_id;
      });
      
      // Debug logging
      Logger.log('🔍 Filtered students by kelas_id ' + params.kelas_id + ':', filteredStudents.length + ' students');
      if (filteredStudents.length > 0) {
        Logger.log('🔍 First student in filtered list:', JSON.stringify(filteredStudents[0]));
      }
      
      return { success: true, data: filteredStudents };
    } else {
      // Get all students
      var data = getAllData('Siswa');
      
      // Debug logging for spreadsheet data
      Logger.log('🔍 Raw student data from spreadsheet:');
      Logger.log('🔍 Total students found:', data.length);
      if (data.length > 0) {
        Logger.log('🔍 First student from spreadsheet:', JSON.stringify(data[0]));
        Logger.log('🔍 All student names from spreadsheet:', data.map(function(s) { return s.nama; }));
      }
      
      return { success: true, data: data };
    }
  } catch (error) {
    Logger.log('❌ Error in getSiswa:', error.toString());
    return { success: false, error: error.toString() };
  }
}

function createSiswa(params) {
  try {
    var sheet = SS.getSheetByName('Siswa');
    
    // Get headers
    var headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];
    
    // Create new row data
    var rowData = [];
    var timestamp = getCurrentTimestamp();
    
    // Generate ID if not provided
    var id = params.id || generateUniqueId();
    
    // Generate default password if not provided (use NIS as default)
    if (!params.password) {
      params.password = params.nis || '';
    }
    
    // Populate row data based on headers
    headers.forEach(function(header) {
      switch(header) {
        case 'id':
          rowData.push(id);
          break;
        case 'created_at':
        case 'updated_at':
          rowData.push(timestamp);
          break;
        default:
          rowData.push(params[header] || '');
      }
    });
    
    // Append new row
    sheet.appendRow(rowData);
    
    return { success: true, data: { id: id } };
  } catch (error) {
    return { success: false, error: error.toString() };
  }
}

function updateSiswa(params) {
  try {
    // Accept either id or siswa_id
    var id = params.id || params.siswa_id;
    if (!id) {
      return { success: false, error: "ID is required (either id or siswa_id)" };
    }
    
    // Find the record
    var record = findRecordById('Siswa', id);
    if (!record) {
      return { success: false, error: "Siswa not found" };
    }
    
    var sheet = SS.getSheetByName('Siswa');
    
    // Get headers
    var headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];
    
    // Create updated row data
    var rowData = [];
    var timestamp = getCurrentTimestamp();
    
    // Update values based on parameters
    headers.forEach(function(header) {
      switch(header) {
        case 'id':
          rowData.push(id);
          break;
        case 'updated_at':
          rowData.push(timestamp);
          break;
        case 'created_at':
          rowData.push(record.data.created_at);
          break;
        default:
          // Use new value if provided, otherwise keep the old value
          rowData.push(params[header] !== undefined ? params[header] : record.data[header]);
      }
    });
    
    // Update the row
    sheet.getRange(record.rowIndex, 1, 1, rowData.length).setValues([rowData]);
    
    return { success: true, data: { id: id } };
  } catch (error) {
    return { success: false, error: error.toString() };
  }
}

function deleteSiswa(params) {
  try {
    // Accept either id or siswa_id
    var id = params.id || params.siswa_id;
    Logger.log("deleteSiswa called with params: " + JSON.stringify(params));
    Logger.log("Extracted ID: " + id + " (type: " + typeof id + ")");
    
    if (!id) {
      Logger.log("No ID provided in parameters");
      return { success: false, error: "ID is required (either id or siswa_id)" };
    }
    
    // Get all student IDs from the sheet for debugging
    var sheet = SS.getSheetByName('Siswa');
    if (sheet) {
      var data = sheet.getDataRange().getValues();
      var headers = data.shift();
      var allIds = data.map(function(row) { return String(row[0]); });
      Logger.log("All student IDs in sheet: " + JSON.stringify(allIds));
      Logger.log("Looking for ID: " + id + " in sheet");
    } else {
      Logger.log("Siswa sheet not found!");
    }
    
    // Find the record
    var record = findRecordById('Siswa', id);
    Logger.log("Record found: " + (record ? "Yes" : "No"));
    
    if (!record) {
      return { success: false, error: "Siswa not found" };
    }
    
    Logger.log("About to delete row at index: " + record.rowIndex);
    
    // Delete the row
    sheet.deleteRow(record.rowIndex);
    Logger.log("Row deleted successfully");
    
    return { success: true, data: { id: id } };
  } catch (error) {
    Logger.log("Error in deleteSiswa: " + error.toString());
    return { success: false, error: error.toString() };
  }
}

/**
 * Debug function to dump all Siswa data
 */
function debugSiswaData() {
  var sheet = SS.getSheetByName('Siswa');
  if (!sheet) {
    Logger.log("Siswa sheet not found!");
    return { success: false, error: "Siswa sheet not found" };
  }
  
  var data = sheet.getDataRange().getValues();
  var headers = data.shift();
  
  Logger.log("Headers: " + JSON.stringify(headers));
  
  var rows = [];
  for (var i = 0; i < data.length; i++) {
    var row = {};
    headers.forEach(function(header, index) {
      row[header] = data[i][index];
    });
    rows.push(row);
    Logger.log("Row " + i + ": " + JSON.stringify(row));
  }
  
  return { success: true, data: rows };
}

/**
 * Debug function to verify spreadsheet connection and raw data
 */
function debugSpreadsheetConnection() {
  try {
    Logger.log('=== SPREADSHEET CONNECTION DEBUG ===');
    
    // Check spreadsheet connection
    Logger.log('🔍 SPREADSHEET_ID constant:', SPREADSHEET_ID);
    Logger.log('🔍 SS.getId():', SS.getId());
    Logger.log('🔍 SS.getName():', SS.getName());
    Logger.log('🔍 SS.getUrl():', SS.getUrl());
    
    // Check if IDs match
    if (SS.getId() !== SPREADSHEET_ID) {
      Logger.log('❌ MISMATCH! SS is not pointing to the correct spreadsheet');
      return { 
        success: false, 
        error: 'Spreadsheet ID mismatch',
        expected: SPREADSHEET_ID,
        actual: SS.getId()
      };
    }
    
    // Get Siswa sheet
    var sheet = SS.getSheetByName('Siswa');
    if (!sheet) {
      Logger.log('❌ Siswa sheet not found');
      return { success: false, error: 'Siswa sheet not found' };
    }
    
    Logger.log('✅ Siswa sheet found');
    
    // Get raw data
    var allData = sheet.getDataRange().getValues();
    Logger.log('🔍 Total rows (including header):', allData.length);
    
    // Log raw data
    for (var i = 0; i < Math.min(5, allData.length); i++) {
      Logger.log('🔍 Raw Row ' + i + ':', JSON.stringify(allData[i]));
    }
    
    if (allData.length < 2) {
      return { 
        success: true, 
        message: 'Sheet is empty or only has headers',
        headers: allData[0] || [],
        rowCount: allData.length
      };
    }
    
    // Parse first data row
    var headers = allData[0];
    var firstDataRow = allData[1];
    var firstStudent = {};
    
    headers.forEach(function(header, index) {
      firstStudent[header] = firstDataRow[index];
    });
    
    Logger.log('🔍 First student object:', JSON.stringify(firstStudent));
    
    return { 
      success: true, 
      spreadsheetId: SS.getId(),
      spreadsheetName: SS.getName(),
      spreadsheetUrl: SS.getUrl(),
      rowCount: allData.length - 1, // excluding header
      headers: headers,
      firstStudent: firstStudent,
      rawFirstRow: firstDataRow
    };
    
  } catch (error) {
    Logger.log('❌ Error in debugSpreadsheetConnection:', error.toString());
    return { 
      success: false, 
      error: error.toString() 
    };
  }
}

/**
 * Creates a response with CORS headers
 */
function createCORSResponse(jsonText) {
  return ContentService.createTextOutput(jsonText)
    .setMimeType(ContentService.MimeType.JSON);
}

// === TUGAS (ASSIGNMENT) OPERATIONS ===

function getTugas(params) {
  try {
    if (params.id) {
      // Get specific assignment by ID
      var record = findRecordById('Tugas', params.id);
      if (!record) {
        return { success: false, error: "Tugas not found" };
      }
      return { success: true, data: record.data };
    } else if (params.kelas_id) {
      // Get assignments by class ID
      var allTugas = getAllData('Tugas');
      var filteredTugas = allTugas.filter(function(tugas) {
        return tugas.kelas_id === params.kelas_id;
      });
      return { success: true, data: filteredTugas };
    } else {
      // Get all assignments
      var data = getAllData('Tugas');
      return { success: true, data: data };
    }
  } catch (error) {
    return { success: false, error: error.toString() };
  }
}

function createTugas(params) {
  try {
    var sheet = SS.getSheetByName('Tugas');
    
    // Get headers
    var headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];
    
    // Create new row data
    var rowData = [];
    var timestamp = getCurrentTimestamp();
    
    // Generate ID if not provided
    var id = params.id || generateUniqueId();
    
    // Populate row data based on headers
    headers.forEach(function(header) {
      switch(header) {
        case 'id':
          rowData.push(id);
          break;
        case 'created_at':
        case 'updated_at':
          rowData.push(timestamp);
          break;
        default:
          rowData.push(params[header] || '');
      }
    });
    
    // Append new row
    sheet.appendRow(rowData);
    
    return { success: true, data: { id: id } };
  } catch (error) {
    return { success: false, error: error.toString() };
  }
}

function updateTugas(params) {
  try {
    if (!params.id) {
      return { success: false, error: "ID is required" };
    }
    
    // Find the record
    var record = findRecordById('Tugas', params.id);
    if (!record) {
      return { success: false, error: "Tugas not found" };
    }
    
    var sheet = SS.getSheetByName('Tugas');
    
    // Get headers
    var headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];
    
    // Create updated row data
    var rowData = [];
    var timestamp = getCurrentTimestamp();
    
    // Update values based on parameters
    headers.forEach(function(header) {
      switch(header) {
        case 'id':
          rowData.push(params.id);
          break;
        case 'updated_at':
          rowData.push(timestamp);
          break;
        case 'created_at':
          rowData.push(record.data.created_at);
          break;
        default:
          // Use new value if provided, otherwise keep the old value
          rowData.push(params[header] !== undefined ? params[header] : record.data[header]);
      }
    });
    
    // Update the row
    sheet.getRange(record.rowIndex, 1, 1, rowData.length).setValues([rowData]);
    
    return { success: true, data: { id: params.id } };
  } catch (error) {
    return { success: false, error: error.toString() };
  }
}

function deleteTugas(params) {
  try {
    if (!params.id) {
      return { success: false, error: "ID is required" };
    }
    
    // Find the record
    var record = findRecordById('Tugas', params.id);
    if (!record) {
      return { success: false, error: "Tugas not found" };
    }
    
    var sheet = SS.getSheetByName('Tugas');
    
    // Delete the row
    sheet.deleteRow(record.rowIndex);
    
    return { success: true, data: { id: params.id } };
  } catch (error) {
    return { success: false, error: error.toString() };
  }
}

// === NILAI (GRADE) OPERATIONS ===

function getNilai(params) {
  try {
    if (params.id) {
      // Get specific grade by ID
      var record = findRecordById('Nilai', params.id);
      if (!record) {
        return { success: false, error: "Nilai not found" };
      }
      return { success: true, data: record.data };
    } else if (params.siswa_id) {
      // Get grades by student ID
      var allNilai = getAllData('Nilai');
      var filteredNilai = allNilai.filter(function(nilai) {
        return nilai.siswa_id === params.siswa_id;
      });
      return { success: true, data: filteredNilai };
    } else if (params.tugas_id) {
      // Get grades by assignment ID
      var allNilai = getAllData('Nilai');
      var filteredNilai = allNilai.filter(function(nilai) {
        return nilai.tugas_id === params.tugas_id;
      });
      return { success: true, data: filteredNilai };
    } else {
      // Get all grades
      var data = getAllData('Nilai');
      return { success: true, data: data };
    }
  } catch (error) {
    return { success: false, error: error.toString() };
  }
}

function createNilai(params) {
  try {
    var sheet = SS.getSheetByName('Nilai');
    
    // Get headers
    var headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];
    
    // Create new row data
    var rowData = [];
    var timestamp = getCurrentTimestamp();
    
    // Generate ID if not provided
    var id = params.id || generateUniqueId();
    
    // Populate row data based on headers
    headers.forEach(function(header) {
      switch(header) {
        case 'id':
          rowData.push(id);
          break;
        case 'created_at':
        case 'updated_at':
          rowData.push(timestamp);
          break;
        default:
          rowData.push(params[header] || '');
      }
    });
    
    // Append new row
    sheet.appendRow(rowData);
    
    return { success: true, data: { id: id } };
  } catch (error) {
    return { success: false, error: error.toString() };
  }
}

function updateNilai(params) {
  try {
    if (!params.id) {
      return { success: false, error: "ID is required" };
    }
    
    // Find the record
    var record = findRecordById('Nilai', params.id);
    if (!record) {
      return { success: false, error: "Nilai not found" };
    }
    
    var sheet = SS.getSheetByName('Nilai');
    
    // Get headers
    var headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];
    
    // Create updated row data
    var rowData = [];
    var timestamp = getCurrentTimestamp();
    
    // Update values based on parameters
    headers.forEach(function(header) {
      switch(header) {
        case 'id':
          rowData.push(params.id);
          break;
        case 'updated_at':
          rowData.push(timestamp);
          break;
        case 'created_at':
          rowData.push(record.data.created_at);
          break;
        default:
          // Use new value if provided, otherwise keep the old value
          rowData.push(params[header] !== undefined ? params[header] : record.data[header]);
      }
    });
    
    // Update the row
    sheet.getRange(record.rowIndex, 1, 1, rowData.length).setValues([rowData]);
    
    return { success: true, data: { id: params.id } };
  } catch (error) {
    return { success: false, error: error.toString() };
  }
}

function deleteNilai(params) {
  try {
    if (!params.id) {
      return { success: false, error: "ID is required" };
    }
    
    // Find the record
    var record = findRecordById('Nilai', params.id);
    if (!record) {
      return { success: false, error: "Nilai not found" };
    }
    
    var sheet = SS.getSheetByName('Nilai');
    
    // Delete the row
    sheet.deleteRow(record.rowIndex);
    
    return { success: true, data: { id: params.id } };
  } catch (error) {
    return { success: false, error: error.toString() };
  }
}

// === PRESENSI (ATTENDANCE) OPERATIONS ===

function getPresensi(params) {
  try {
    if (params.id) {
      // Get specific attendance by ID
      var record = findRecordById('Presensi', params.id);
      if (!record) {
        return { success: false, error: "Presensi not found" };
      }
      return { success: true, data: record.data };
    } else if (params.kelas_id) {
      // Get attendance records by class ID
      var allPresensi = getAllData('Presensi');
      var filteredPresensi = allPresensi.filter(function(presensi) {
        return presensi.kelas_id === params.kelas_id;
      });
      return { success: true, data: filteredPresensi };
    } else if (params.tanggal) {
      // Get attendance records by date
      var allPresensi = getAllData('Presensi');
      var filteredPresensi = allPresensi.filter(function(presensi) {
        return presensi.tanggal === params.tanggal;
      });
      return { success: true, data: filteredPresensi };
    } else {
      // Get all attendance records
      var data = getAllData('Presensi');
      return { success: true, data: data };
    }
  } catch (error) {
    return { success: false, error: error.toString() };
  }
}

function createPresensi(params) {
  try {
    var sheet = SS.getSheetByName('Presensi');
    
    // Get headers
    var headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];
    
    // Create new row data
    var rowData = [];
    var timestamp = getCurrentTimestamp();
    
    // Generate ID if not provided
    var id = params.id || generateUniqueId();
    
    // Populate row data based on headers
    headers.forEach(function(header) {
      switch(header) {
        case 'id':
          rowData.push(id);
          break;
        case 'created_at':
        case 'updated_at':
          rowData.push(timestamp);
          break;
        default:
          rowData.push(params[header] || '');
      }
    });
    
    // Append new row
    sheet.appendRow(rowData);
    
    return { success: true, data: { id: id } };
  } catch (error) {
    return { success: false, error: error.toString() };
  }
}

function updatePresensi(params) {
  try {
    if (!params.id) {
      return { success: false, error: "ID is required" };
    }
    
    // Find the record
    var record = findRecordById('Presensi', params.id);
    if (!record) {
      return { success: false, error: "Presensi not found" };
    }
    
    var sheet = SS.getSheetByName('Presensi');
    
    // Get headers
    var headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];
    
    // Create updated row data
    var rowData = [];
    var timestamp = getCurrentTimestamp();
    
    // Update values based on parameters
    headers.forEach(function(header) {
      switch(header) {
        case 'id':
          rowData.push(params.id);
          break;
        case 'updated_at':
          rowData.push(timestamp);
          break;
        case 'created_at':
          rowData.push(record.data.created_at);
          break;
        default:
          // Use new value if provided, otherwise keep the old value
          rowData.push(params[header] !== undefined ? params[header] : record.data[header]);
      }
    });
    
    // Update the row
    sheet.getRange(record.rowIndex, 1, 1, rowData.length).setValues([rowData]);
    
    return { success: true, data: { id: params.id } };
  } catch (error) {
    return { success: false, error: error.toString() };
  }
}

function deletePresensi(params) {
  try {
    if (!params.id) {
      return { success: false, error: "ID is required" };
    }
    
    // Find the record
    var record = findRecordById('Presensi', params.id);
    if (!record) {
      return { success: false, error: "Presensi not found" };
    }
    
    var sheet = SS.getSheetByName('Presensi');
    
    // Delete the row
    sheet.deleteRow(record.rowIndex);
    
    return { success: true, data: { id: params.id } };
  } catch (error) {
    return { success: false, error: error.toString() };
  }
}

// === EVENT OPERATIONS ===

// Alias for getEvent to handle plural "events" requests from the frontend
function getEvents(params) {
  return getEvent(params);
}

function getEvent(params) {
  try {
    if (params.id) {
      // Get specific event by ID
      var record = findRecordById('Event', params.id);
      if (!record) {
        return { success: false, error: "Event not found" };
      }
      return { success: true, data: record.data };
    } else {
      // Get all events
      var data = getAllData('Event');
      return { success: true, data: data };
    }
  } catch (error) {
    return { success: false, error: error.toString() };
  }
}

function createEvent(params) {
  try {
    var sheet = SS.getSheetByName('Event');
    
    // Get headers
    var headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];
    
    // Create new row data
    var rowData = [];
    var timestamp = getCurrentTimestamp();
    
    // Generate ID if not provided
    var id = params.id || generateUniqueId();
    
    // Populate row data based on headers
    headers.forEach(function(header) {
      switch(header) {
        case 'id':
          rowData.push(id);
          break;
        case 'created_at':
        case 'updated_at':
          rowData.push(timestamp);
          break;
        default:
          rowData.push(params[header] || '');
      }
    });
    
    // Append new row
    sheet.appendRow(rowData);
    
    return { success: true, data: { id: id } };
  } catch (error) {
    return { success: false, error: error.toString() };
  }
}

function updateEvent(params) {
  try {
    if (!params.id) {
      return { success: false, error: "ID is required" };
    }
    
    // Find the record
    var record = findRecordById('Event', params.id);
    if (!record) {
      return { success: false, error: "Event not found" };
    }
    
    var sheet = SS.getSheetByName('Event');
    
    // Get headers
    var headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];
    
    // Create updated row data
    var rowData = [];
    var timestamp = getCurrentTimestamp();
    
    // Update values based on parameters
    headers.forEach(function(header) {
      switch(header) {
        case 'id':
          rowData.push(params.id);
          break;
        case 'updated_at':
          rowData.push(timestamp);
          break;
        case 'created_at':
          rowData.push(record.data.created_at);
          break;
        default:
          // Use new value if provided, otherwise keep the old value
          rowData.push(params[header] !== undefined ? params[header] : record.data[header]);
      }
    });
    
    // Update the row
    sheet.getRange(record.rowIndex, 1, 1, rowData.length).setValues([rowData]);
    
    return { success: true, data: { id: params.id } };
  } catch (error) {
    return { success: false, error: error.toString() };
  }
}

function deleteEvent(params) {
  try {
    if (!params.id) {
      return { success: false, error: "ID is required" };
    }
    
    // Find the record
    var record = findRecordById('Event', params.id);
    if (!record) {
      return { success: false, error: "Event not found" };
    }
    
    var sheet = SS.getSheetByName('Event');
    
    // Delete the row
    sheet.deleteRow(record.rowIndex);
    
    return { success: true, data: { id: params.id } };
  } catch (error) {
    return { success: false, error: error.toString() };
  }
}

// === JURNAL PEMBELAJARAN (LEARNING JOURNAL) OPERATIONS ===

function getJurnal(params) {
  try {
    if (params.id) {
      // Get specific journal by ID
      var record = findRecordById('JurnalPembelajaran', params.id);
      if (!record) {
        return { success: false, error: "Jurnal not found" };
      }
      return { success: true, data: record.data };
    } else if (params.kelas_id) {
      // Get journals by class ID
      var allJurnal = getAllData('JurnalPembelajaran');
      var filteredJurnal = allJurnal.filter(function(jurnal) {
        return jurnal.kelas_id === params.kelas_id;
      });
      return { success: true, data: filteredJurnal };
    } else {
      // Get all journals
      var data = getAllData('JurnalPembelajaran');
      return { success: true, data: data };
    }
  } catch (error) {
    return { success: false, error: error.toString() };
  }
}

function createJurnal(params) {
  try {
    var sheet = SS.getSheetByName('JurnalPembelajaran');
    
    // Get headers
    var headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];
    
    // Create new row data
    var rowData = [];
    var timestamp = getCurrentTimestamp();
    
    // Generate ID if not provided
    var id = params.id || generateUniqueId();
    
    // Populate row data based on headers
    headers.forEach(function(header) {
      switch(header) {
        case 'id':
          rowData.push(id);
          break;
        case 'created_at':
        case 'updated_at':
          rowData.push(timestamp);
          break;
        default:
          rowData.push(params[header] || '');
      }
    });
    
    // Append new row
    sheet.appendRow(rowData);
    
    return { success: true, data: { id: id } };
  } catch (error) {
    return { success: false, error: error.toString() };
  }
}

function updateJurnal(params) {
  try {
    if (!params.id) {
      return { success: false, error: "ID is required" };
    }
    
    // Find the record
    var record = findRecordById('JurnalPembelajaran', params.id);
    if (!record) {
      return { success: false, error: "Jurnal not found" };
    }
    
    var sheet = SS.getSheetByName('JurnalPembelajaran');
    
    // Get headers
    var headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];
    
    // Create updated row data
    var rowData = [];
    var timestamp = getCurrentTimestamp();
    
    // Update values based on parameters
    headers.forEach(function(header) {
      switch(header) {
        case 'id':
          rowData.push(params.id);
          break;
        case 'updated_at':
          rowData.push(timestamp);
          break;
        case 'created_at':
          rowData.push(record.data.created_at);
          break;
        default:
          // Use new value if provided, otherwise keep the old value
          rowData.push(params[header] !== undefined ? params[header] : record.data[header]);
      }
    });
    
    // Update the row
    sheet.getRange(record.rowIndex, 1, 1, rowData.length).setValues([rowData]);
    
    return { success: true, data: { id: params.id } };
  } catch (error) {
    return { success: false, error: error.toString() };
  }
}

function deleteJurnal(params) {
  try {
    if (!params.id) {
      return { success: false, error: "ID is required" };
    }
    
    // Find the record
    var record = findRecordById('JurnalPembelajaran', params.id);
    if (!record) {
      return { success: false, error: "Jurnal not found" };
    }
    
    var sheet = SS.getSheetByName('JurnalPembelajaran');
    
    // Delete the row
    sheet.deleteRow(record.rowIndex);
    
    return { success: true, data: { id: params.id } };
  } catch (error) {
    return { success: false, error: error.toString() };
  }
}

// === BANK SOAL (QUESTION BANK) OPERATIONS ===

function getBankSoal(params) {
  try {
    if (params.id) {
      // Get specific question by ID
      var record = findRecordById('BankSoal', params.id);
      if (!record) {
        return { success: false, error: "Bank Soal not found" };
      }
      return { success: true, data: record.data };
    } else if (params.kategori) {
      // Get questions by category
      var allSoal = getAllData('BankSoal');
      var filteredSoal = allSoal.filter(function(soal) {
        return soal.kategori === params.kategori;
      });
      return { success: true, data: filteredSoal };
    } else {
      // Get all questions
      var data = getAllData('BankSoal');
      return { success: true, data: data };
    }
  } catch (error) {
    return { success: false, error: error.toString() };
  }
}

function createBankSoal(params) {
  try {
    var sheet = SS.getSheetByName('BankSoal');
    
    // Get headers
    var headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];
    
    // Create new row data
    var rowData = [];
    var timestamp = getCurrentTimestamp();
    
    // Generate ID if not provided
    var id = params.id || generateUniqueId();
    
    // Populate row data based on headers
    headers.forEach(function(header) {
      switch(header) {
        case 'id':
          rowData.push(id);
          break;
        case 'created_at':
        case 'updated_at':
          rowData.push(timestamp);
          break;
        default:
          rowData.push(params[header] || '');
      }
    });
    
    // Append new row
    sheet.appendRow(rowData);
    
    return { success: true, data: { id: id } };
  } catch (error) {
    return { success: false, error: error.toString() };
  }
}

function updateBankSoal(params) {
  try {
    if (!params.id) {
      return { success: false, error: "ID is required" };
    }
    
    // Find the record
    var record = findRecordById('BankSoal', params.id);
    if (!record) {
      return { success: false, error: "Bank Soal not found" };
    }
    
    var sheet = SS.getSheetByName('BankSoal');
    
    // Get headers
    var headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];
    
    // Create updated row data
    var rowData = [];
    var timestamp = getCurrentTimestamp();
    
    // Update values based on parameters
    headers.forEach(function(header) {
      switch(header) {
        case 'id':
          rowData.push(params.id);
          break;
        case 'updated_at':
          rowData.push(timestamp);
          break;
        case 'created_at':
          rowData.push(record.data.created_at);
          break;
        default:
          // Use new value if provided, otherwise keep the old value
          rowData.push(params[header] !== undefined ? params[header] : record.data[header]);
      }
    });
    
    // Update the row
    sheet.getRange(record.rowIndex, 1, 1, rowData.length).setValues([rowData]);
    
    return { success: true, data: { id: params.id } };
  } catch (error) {
    return { success: false, error: error.toString() };
  }
}

function deleteBankSoal(params) {
  try {
    if (!params.id) {
      return { success: false, error: "ID is required" };
    }
    
    // Find the record
    var record = findRecordById('BankSoal', params.id);
    if (!record) {
      return { success: false, error: "Bank Soal not found" };
    }
    
    var sheet = SS.getSheetByName('BankSoal');
    
    // Delete the row
    sheet.deleteRow(record.rowIndex);
    
    return { success: true, data: { id: params.id } };
  } catch (error) {
    return { success: false, error: error.toString() };
  }
}

// === Gamifikasi (XP and Badge) OPERATIONS ===

function getGamifikasiXP(params) {
  try {
    if (params.id) {
      // Get specific XP record by ID
      var record = findRecordById('GamifikasiXP', params.id);
      if (!record) {
        return { success: false, error: "Gamifikasi XP not found" };
      }
      return { success: true, data: record.data };
    } else if (params.siswa_id) {
      // Get XP records by student ID
      var allXP = getAllData('GamifikasiXP');
      var filteredXP = allXP.filter(function(xp) {
        return xp.siswa_id === params.siswa_id;
      });
      return { success: true, data: filteredXP };
    } else {
      // Get all XP records
      var data = getAllData('GamifikasiXP');
      return { success: true, data: data };
    }
  } catch (error) {
    return { success: false, error: error.toString() };
  }
}

function createGamifikasiXP(params) {
  try {
    var sheet = SS.getSheetByName('GamifikasiXP');
    
    // Get headers
    var headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];
    
    // Create new row data
    var rowData = [];
    var timestamp = getCurrentTimestamp();
    
    // Generate ID if not provided
    var id = params.id || generateUniqueId();
    
    // Populate row data based on headers
    headers.forEach(function(header) {
      switch(header) {
        case 'id':
          rowData.push(id);
          break;
        case 'created_at':
        case 'updated_at':
          rowData.push(timestamp);
          break;
        default:
          rowData.push(params[header] || '');
      }
    });
    
    // Append new row
    sheet.appendRow(rowData);
    
    return { success: true, data: { id: id } };
  } catch (error) {
    return { success: false, error: error.toString() };
  }
}

function updateGamifikasiXP(params) {
  try {
    if (!params.id) {
      return { success: false, error: "ID is required" };
    }
    
    // Find the record
    var record = findRecordById('GamifikasiXP', params.id);
    if (!record) {
      return { success: false, error: "Gamifikasi XP not found" };
    }
    
    var sheet = SS.getSheetByName('GamifikasiXP');
    
    // Get headers
    var headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];
    
    // Create updated row data
    var rowData = [];
    var timestamp = getCurrentTimestamp();
    
    // Update values based on parameters
    headers.forEach(function(header) {
      switch(header) {
        case 'id':
          rowData.push(params.id);
          break;
        case 'updated_at':
          rowData.push(timestamp);
          break;
        case 'created_at':
          rowData.push(record.data.created_at);
          break;
        default:
          // Use new value if provided, otherwise keep the old value
          rowData.push(params[header] !== undefined ? params[header] : record.data[header]);
      }
    });
    
    // Update the row
    sheet.getRange(record.rowIndex, 1, 1, rowData.length).setValues([rowData]);
    
    return { success: true, data: { id: params.id } };
  } catch (error) {
    return { success: false, error: error.toString() };
  }
}

function deleteGamifikasiXP(params) {
  try {
    if (!params.id) {
      return { success: false, error: "ID is required" };
    }
    
    // Find the record
    var record = findRecordById('GamifikasiXP', params.id);
    if (!record) {
      return { success: false, error: "Gamifikasi XP not found" };
    }
    
    var sheet = SS.getSheetByName('GamifikasiXP');
    
    // Delete the row
    sheet.deleteRow(record.rowIndex);
    
    return { success: true, data: { id: params.id } };
  } catch (error) {
    return { success: false, error: error.toString() };
  }
}

function getGamifikasiBadge(params) {
  try {
    if (params.id) {
      // Get specific badge by ID
      var record = findRecordById('GamifikasiBadge', params.id);
      if (!record) {
        return { success: false, error: "Gamifikasi Badge not found" };
      }
      return { success: true, data: record.data };
    } else if (params.nama_badge) {
      // Get badges by name
      var allBadges = getAllData('GamifikasiBadge');
      var filteredBadges = allBadges.filter(function(badge) {
        return badge.nama_badge === params.nama_badge;
      });
      return { success: true, data: filteredBadges };
    } else {
      // Get all badges
      var data = getAllData('GamifikasiBadge');
      return { success: true, data: data };
    }
  } catch (error) {
    return { success: false, error: error.toString() };
  }
}

function createGamifikasiBadge(params) {
  try {
    var sheet = SS.getSheetByName('GamifikasiBadge');
    
    // Get headers
    var headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];
    
    // Create new row data
    var rowData = [];
    var timestamp = getCurrentTimestamp();
    
    // Generate ID if not provided
    var id = params.id || generateUniqueId();
    
    // Populate row data based on headers
    headers.forEach(function(header) {
      switch(header) {
        case 'id':
          rowData.push(id);
          break;
        case 'created_at':
        case 'updated_at':
          rowData.push(timestamp);
          break;
        default:
          rowData.push(params[header] || '');
      }
    });
    
    // Append new row
    sheet.appendRow(rowData);
    
    return { success: true, data: { id: id } };
  } catch (error) {
    return { success: false, error: error.toString() };
  }
}

function updateGamifikasiBadge(params) {
  try {
    if (!params.id) {
      return { success: false, error: "ID is required" };
    }
    
    // Find the record
    var record = findRecordById('GamifikasiBadge', params.id);
    if (!record) {
      return { success: false, error: "Gamifikasi Badge not found" };
    }
    
    var sheet = SS.getSheetByName('GamifikasiBadge');
    
    // Get headers
    var headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];
    
    // Create updated row data
    var rowData = [];
    var timestamp = getCurrentTimestamp();
    
    // Update values based on parameters
    headers.forEach(function(header) {
      switch(header) {
        case 'id':
          rowData.push(params.id);
          break;
        case 'updated_at':
          rowData.push(timestamp);
          break;
        case 'created_at':
          rowData.push(record.data.created_at);
          break;
        default:
          // Use new value if provided, otherwise keep the old value
          rowData.push(params[header] !== undefined ? params[header] : record.data[header]);
      }
    });
    
    // Update the row
    sheet.getRange(record.rowIndex, 1, 1, rowData.length).setValues([rowData]);
    
    return { success: true, data: { id: params.id } };
  } catch (error) {
    return { success: false, error: error.toString() };
  }
}

function deleteGamifikasiBadge(params) {
  try {
    if (!params.id) {
      return { success: false, error: "ID is required" };
    }
    
    // Find the record
    var record = findRecordById('GamifikasiBadge', params.id);
    if (!record) {
      return { success: false, error: "Gamifikasi Badge not found" };
    }
    
    var sheet = SS.getSheetByName('GamifikasiBadge');
    
    // Delete the row
    sheet.deleteRow(record.rowIndex);
    
    return { success: true, data: { id: params.id } };
  } catch (error) {
    return { success: false, error: error.toString() };
  }
}

function getSiswaBadge(params) {
  try {
    if (params.id) {
      // Get specific siswa badge by ID
      var record = findRecordById('SiswaBadge', params.id);
      if (!record) {
        return { success: false, error: "Siswa Badge not found" };
      }
      return { success: true, data: record.data };
    } else if (params.siswa_id) {
      // Get siswa badges by siswa ID
      var allSiswaBadges = getAllData('SiswaBadge');
      var filteredSiswaBadges = allSiswaBadges.filter(function(siswaBadge) {
        return siswaBadge.siswa_id === params.siswa_id;
      });
      return { success: true, data: filteredSiswaBadges };
    } else {
      // Get all siswa badges
      var data = getAllData('SiswaBadge');
      return { success: true, data: data };
    }
  } catch (error) {
    return { success: false, error: error.toString() };
  }
}

function createSiswaBadge(params) {
  try {
    var sheet = SS.getSheetByName('SiswaBadge');
    
    // Get headers
    var headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];
    
    // Create new row data
    var rowData = [];
    var timestamp = getCurrentTimestamp();
    
    // Generate ID if not provided
    var id = params.id || generateUniqueId();
    
    // Populate row data based on headers
    headers.forEach(function(header) {
      switch(header) {
        case 'id':
          rowData.push(id);
          break;
        case 'created_at':
        case 'updated_at':
          rowData.push(timestamp);
          break;
        default:
          rowData.push(params[header] || '');
      }
    });
    
    // Append new row
    sheet.appendRow(rowData);
    
    return { success: true, data: { id: id } };
  } catch (error) {
    return { success: false, error: error.toString() };
  }
}

function updateSiswaBadge(params) {
  try {
    if (!params.id) {
      return { success: false, error: "ID is required" };
    }
    
    // Find the record
    var record = findRecordById('SiswaBadge', params.id);
    if (!record) {
      return { success: false, error: "Siswa Badge not found" };
    }
    
    var sheet = SS.getSheetByName('SiswaBadge');
    
    // Get headers
    var headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];
    
    // Create updated row data
    var rowData = [];
    var timestamp = getCurrentTimestamp();
    
    // Update values based on parameters
    headers.forEach(function(header) {
      switch(header) {
        case 'id':
          rowData.push(params.id);
          break;
        case 'updated_at':
          rowData.push(timestamp);
          break;
        case 'created_at':
          rowData.push(record.data.created_at);
          break;
        default:
          // Use new value if provided, otherwise keep the old value
          rowData.push(params[header] !== undefined ? params[header] : record.data[header]);
      }
    });
    
    // Update the row
    sheet.getRange(record.rowIndex, 1, 1, rowData.length).setValues([rowData]);
    
    return { success: true, data: { id: params.id } };
  } catch (error) {
    return { success: false, error: error.toString() };
  }
}

function deleteSiswaBadge(params) {
  try {
    if (!params.id) {
      return { success: false, error: "ID is required" };
    }
    
    // Find the record
    var record = findRecordById('SiswaBadge', params.id);
    if (!record) {
      return { success: false, error: "Siswa Badge not found" };
    }
    
    var sheet = SS.getSheetByName('SiswaBadge');
    
    // Delete the row
    sheet.deleteRow(record.rowIndex);
    
    return { success: true, data: { id: params.id } };
  } catch (error) {
    return { success: false, error: error.toString() };
  }
}

// === DETAIL PRESENSI (ATTENDANCE DETAIL) OPERATIONS ===

function getDetailPresensi(params) {
  try {
    if (params.id) {
      // Get specific detail presensi by ID
      var record = findRecordById('DetailPresensi', params.id);
      if (!record) {
        return { success: false, error: "DetailPresensi not found" };
      }
      return { success: true, data: record.data };
    } else if (params.presensi_id) {
      // Get detail presensi by presensi ID
      var allDetailPresensi = getAllData('DetailPresensi');
      var filteredDetailPresensi = allDetailPresensi.filter(function(detailPresensi) {
        return detailPresensi.presensi_id === params.presensi_id;
      });
      return { success: true, data: filteredDetailPresensi };
    } else if (params.siswa_id) {
      // Get detail presensi by student ID
      var allDetailPresensi = getAllData('DetailPresensi');
      var filteredDetailPresensi = allDetailPresensi.filter(function(detailPresensi) {
        return detailPresensi.siswa_id === params.siswa_id;
      });
      return { success: true, data: filteredDetailPresensi };
    } else {
      // Get all detail presensi records
      var data = getAllData('DetailPresensi');
      return { success: true, data: data };
    }
  } catch (error) {
    return { success: false, error: error.toString() };
  }
}

function createDetailPresensi(params) {
  try {
    if (!params.presensi_id) {
      return { success: false, error: "Presensi ID is required" };
    }
    
    if (!params.siswa_id) {
      return { success: false, error: "Siswa ID is required" };
    }
    
    var sheet = SS.getSheetByName('DetailPresensi');
    
    // If sheet doesn't exist, initialize sheets
    if (!sheet) {
      initializeSheets();
      sheet = SS.getSheetByName('DetailPresensi');
      
      // Double check if sheet was created
      if (!sheet) {
        return { success: false, error: "Failed to create DetailPresensi sheet" };
      }
    }
    
    // Get headers
    var headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];
    
    // Create new row data
    var rowData = [];
    var timestamp = getCurrentTimestamp();
    
    // Generate ID if not provided
    var id = params.id || generateUniqueId();
    
    // Populate row data based on headers
    headers.forEach(function(header) {
      switch(header) {
        case 'id':
          rowData.push(id);
          break;
        case 'created_at':
        case 'updated_at':
          rowData.push(timestamp);
          break;
        default:
          rowData.push(params[header] || '');
      }
    });
    
    // Append new row
    sheet.appendRow(rowData);
    
    return { success: true, data: { id: id } };
  } catch (error) {
    return { success: false, error: error.toString() };
  }
}

function updateDetailPresensi(params) {
  try {
    if (!params.id) {
      return { success: false, error: "ID is required" };
    }
    
    // Find the record
    var record = findRecordById('DetailPresensi', params.id);
    if (!record) {
      return { success: false, error: "DetailPresensi not found" };
    }
    
    var sheet = SS.getSheetByName('DetailPresensi');
    
    // Get headers
    var headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];
    
    // Create updated row data
    var rowData = [];
    var timestamp = getCurrentTimestamp();
    
    // Update values based on parameters
    headers.forEach(function(header) {
      switch(header) {
        case 'id':
          rowData.push(params.id);
          break;
        case 'updated_at':
          rowData.push(timestamp);
          break;
        case 'created_at':
          rowData.push(record.data.created_at);
          break;
        default:
          // Use new value if provided, otherwise keep the old value
          rowData.push(params[header] !== undefined ? params[header] : record.data[header]);
      }
    });
    
    // Update the row
    sheet.getRange(record.rowIndex, 1, 1, rowData.length).setValues([rowData]);
    
    return { success: true, data: { id: params.id } };
  } catch (error) {
    return { success: false, error: error.toString() };
  }
}

function deleteDetailPresensi(params) {
  try {
    if (!params.id) {
      return { success: false, error: "ID is required" };
    }
    
    // Find the record
    var record = findRecordById('DetailPresensi', params.id);
    if (!record) {
      return { success: false, error: "DetailPresensi not found" };
    }
    
    var sheet = SS.getSheetByName('DetailPresensi');
    
    // Delete the row
    sheet.deleteRow(record.rowIndex);
    
    return { success: true, data: { id: params.id } };
  } catch (error) {
    return { success: false, error: error.toString() };
  }
}

// Implement paginated data retrieval functions

/**
 * Helper function to get paginated data from a sheet
 * @param {Object} params - Request parameters
 * @param {Sheet} sheet - The sheet to get data from
 * @param {Function} filterFn - Optional filter function for rows
 * @param {Function} transformFn - Optional transform function for rows
 * @return {Object} Paginated result with data, totalItems, and hasMore flag
 */
function getPaginatedSheetData(params, sheet, filterFn, transformFn) {
  // Get pagination parameters
  const page = parseInt(params.page) || 1;
  const pageSize = parseInt(params.pageSize) || 10;
  
  // Calculate indices
  const startRow = (page - 1) * pageSize + 2; // +2 to skip header row
  const maxRows = sheet.getLastRow() - 1; // -1 for header
  
  // Get headers
  const headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];
  
  // Get data for the requested page
  let rowCount = Math.min(pageSize, maxRows - (startRow - 2));
  if (rowCount < 1) rowCount = 0;
  
  let data = [];
  if (rowCount > 0) {
    data = sheet.getRange(startRow, 1, rowCount, sheet.getLastColumn()).getValues();
  }
  
  // Filter and transform data if needed
  let resultData = data;
  let totalFilteredItems = maxRows;
  
  if (filterFn) {
    // Apply filter to the current page data
    resultData = data.filter((row, index) => filterFn(row, headers, startRow + index - 1));
    
    // Calculate total items matching the filter (this requires scanning all data)
    if (page === 1) {
      // For performance reasons, only do a full count on the first page request
      const allData = sheet.getRange(2, 1, maxRows, sheet.getLastColumn()).getValues();
      totalFilteredItems = allData.filter((row, index) => filterFn(row, headers, index + 2)).length;
    }
  }
  
  // Apply transformation if provided
  if (transformFn) {
    resultData = resultData.map((row, index) => transformFn(row, headers, startRow + index - 1));
  } else {
    // Default transformation (convert to object with header keys)
    resultData = resultData.map(row => {
      const obj = {};
      headers.forEach((header, i) => {
        obj[header] = row[i];
      });
      return obj;
    });
  }
  
  // Calculate hasMore flag
  const hasMore = startRow + rowCount - 2 < totalFilteredItems;
  
  return {
    success: true,
    data: resultData,
    pagination: {
      page: page,
      pageSize: pageSize,
      totalItems: totalFilteredItems,
      totalPages: Math.ceil(totalFilteredItems / pageSize),
      hasMore: hasMore
    }
  };
}

// Add paginated versions of the getter functions for all entity types

// Paginated Kelas (Class)
function getKelasPaginated(params) {
  try {
    const sheet = SS.getSheetByName("Kelas");
    if (!sheet) throw new Error("Sheet 'Kelas' not found");
    
    // Optional filter function
    let filterFn = null;
    if (params.search) {
      const searchTerm = params.search.toLowerCase();
      filterFn = (row, headers) => {
        // Search in name, tahun_ajaran, or wali_kelas
        return row[headers.indexOf('nama')].toString().toLowerCase().includes(searchTerm) ||
               row[headers.indexOf('tahun_ajaran')].toString().toLowerCase().includes(searchTerm) ||
               row[headers.indexOf('wali_kelas')].toString().toLowerCase().includes(searchTerm);
      };
    }
    
    return getPaginatedSheetData(params, sheet, filterFn);
  } catch (error) {
    return { success: false, error: error.toString() };
  }
}

// Paginated Siswa (Student)
function getSiswaPaginated(params) {
  try {
    Logger.log('🔍 getSiswaPaginated called with params:', JSON.stringify(params));
    
    const sheet = SS.getSheetByName("Siswa");
    if (!sheet) throw new Error("Sheet 'Siswa' not found");
    
    // Optional filter function
    let filterFn = null;
    if (params.kelas_id || params.search) {
      filterFn = (row, headers) => {
        let match = true;
        
        // Filter by kelas_id if provided
        if (params.kelas_id) {
          match = match && row[headers.indexOf('kelas_id')] == params.kelas_id;
        }
        
        // Filter by search term if provided
        if (params.search && match) {
          const searchTerm = params.search.toLowerCase();
          match = match && (
            row[headers.indexOf('nama')].toString().toLowerCase().includes(searchTerm) ||
            row[headers.indexOf('nis')].toString().toLowerCase().includes(searchTerm)
          );
        }
        
        return match;
      };
    }
    
    const result = getPaginatedSheetData(params, sheet, filterFn);
    
    // Debug logging
    Logger.log('🔍 Paginated result success:', result.success);
    if (result.success && result.data.length > 0) {
      Logger.log('🔍 First paginated student:', JSON.stringify(result.data[0]));
      Logger.log('🔍 Paginated student names:', result.data.map(function(s) { return s.nama; }));
    }
    
    return result;
  } catch (error) {
    Logger.log('❌ Error in getSiswaPaginated:', error.toString());
    return { success: false, error: error.toString() };
  }
}

// Paginated Tugas (Assignment)
function getTugasPaginated(params) {
  try {
    const sheet = SS.getSheetByName("Tugas");
    if (!sheet) throw new Error("Sheet 'Tugas' not found");
    
    // Optional filter function
    let filterFn = null;
    if (params.kelas_id || params.search) {
      filterFn = (row, headers) => {
        let match = true;
        
        // Filter by kelas_id if provided
        if (params.kelas_id) {
          match = match && row[headers.indexOf('kelas_id')] == params.kelas_id;
        }
        
        // Filter by search term if provided
        if (params.search && match) {
          const searchTerm = params.search.toLowerCase();
          match = match && (
            row[headers.indexOf('judul')].toString().toLowerCase().includes(searchTerm) ||
            row[headers.indexOf('deskripsi')].toString().toLowerCase().includes(searchTerm)
          );
        }
        
        return match;
      };
    }
    
    return getPaginatedSheetData(params, sheet, filterFn);
  } catch (error) {
    return { success: false, error: error.toString() };
  }
}

// Paginated Nilai (Grade)
function getNilaiPaginated(params) {
  try {
    const sheet = SS.getSheetByName("Nilai");
    if (!sheet) throw new Error("Sheet 'Nilai' not found");
    
    // Optional filter function
    let filterFn = null;
    if (params.siswa_id || params.tugas_id) {
      filterFn = (row, headers) => {
        let match = true;
        
        // Filter by siswa_id if provided
        if (params.siswa_id) {
          match = match && row[headers.indexOf('siswa_id')] == params.siswa_id;
        }
        
        // Filter by tugas_id if provided
        if (params.tugas_id && match) {
          match = match && row[headers.indexOf('tugas_id')] == params.tugas_id;
        }
        
        return match;
      };
    }
    
    return getPaginatedSheetData(params, sheet, filterFn);
  } catch (error) {
    return { success: false, error: error.toString() };
  }
}

// Paginated Presensi (Attendance)
function getPresensiPaginated(params) {
  try {
    const sheet = SS.getSheetByName("Presensi");
    if (!sheet) throw new Error("Sheet 'Presensi' not found");
    
    // Optional filter function
    let filterFn = null;
    if (params.kelas_id || params.tanggal) {
      filterFn = (row, headers) => {
        let match = true;
        
        // Filter by kelas_id if provided
        if (params.kelas_id) {
          match = match && row[headers.indexOf('kelas_id')] == params.kelas_id;
        }
        
        // Filter by tanggal if provided
        if (params.tanggal && match) {
          // Convert both to string format for comparison
          const rowDate = new Date(row[headers.indexOf('tanggal')]).toISOString().split('T')[0];
          match = match && rowDate === params.tanggal;
        }
        
        return match;
      };
    }
    
    return getPaginatedSheetData(params, sheet, filterFn);
  } catch (error) {
    return { success: false, error: error.toString() };
  }
}

// Add more paginated retrieval functions for other entities as needed

// Update the handleRequest function to route to the paginated endpoints
// Add these case statements inside the switch statement in handleRequest function:

/*
// Paginated data endpoints
case 'getKelas':
  if (params.paginated === 'true') {
    result = getKelasPaginated(params);
  } else {
    result = getKelas(params);
  }
  break;
case 'getSiswa':
  if (params.paginated === 'true') {
    result = getSiswaPaginated(params);
  } else {
    result = getSiswa(params);
  }
  break;
case 'getTugas':
  if (params.paginated === 'true') {
    result = getTugasPaginated(params);
  } else {
    result = getTugas(params);
  }
  break;
case 'getNilai':
  if (params.paginated === 'true') {
    result = getNilaiPaginated(params);
  } else {
    result = getNilai(params);
  }
  break;
case 'getPresensi':
  if (params.paginated === 'true') {
    result = getPresensiPaginated(params);
  } else {
    result = getPresensi(params);
  }
  break;
*/

// === STUDENT ROLE OPERATIONS ===

function studentLogin(params) {
  try {
    // Check if params is undefined and provide default empty object
    params = params || {};
    
    Logger.log("studentLogin called with params: " + JSON.stringify(params));
    Logger.log("params type: " + typeof params);
    Logger.log("Available sheets: " + SS.getSheets().map(function(s) { return s.getName(); }).join(", "));
    
    if (!params.nis || !params.password) {
      Logger.log("Missing required parameters: NIS or password");
      return { success: false, error: "NIS dan password diperlukan" };
    }
    
    // Sanitize inputs
    var nis = String(params.nis).trim();
    var password = String(params.password).trim();
    
    Logger.log("Searching for student with NIS: " + nis);
    
    // Get all students data
    var sheet = SS.getSheetByName('Siswa');
    if (!sheet) {
      Logger.log("Siswa sheet not found");
      return { success: false, error: "Terjadi kesalahan: Sheet Siswa tidak ditemukan" };
    }
    
    // Get headers and data
    var data = sheet.getDataRange().getValues();
    var headers = data.shift();
    
    // Find indices of relevant columns
    var idIndex = headers.indexOf('id');
    var nisIndex = headers.indexOf('nis');
    var namaIndex = headers.indexOf('nama');
    var kelasIdIndex = headers.indexOf('kelas_id');
    var passwordIndex = headers.indexOf('password');
    
    Logger.log("Column indices - ID: " + idIndex + ", NIS: " + nisIndex + 
              ", Nama: " + namaIndex + ", Kelas: " + kelasIdIndex + 
              ", Password: " + passwordIndex);
    
    if (nisIndex === -1) {
      Logger.log("NIS column not found in Siswa sheet");
      return { success: false, error: "Terjadi kesalahan: Format data tidak sesuai" };
    }
    
    // Find student by NIS
    var studentRow = -1;
    var studentData = null;
    
    for (var i = 0; i < data.length; i++) {
      var currentNis = data[i][nisIndex] ? String(data[i][nisIndex]).trim() : "";
      Logger.log("Comparing NIS: '" + currentNis + "' with '" + nis + "'");
      
      if (currentNis === nis) {
        studentRow = i + 2; // +2 because we shifted headers and sheets are 1-indexed
        
        // Construct student data object
        studentData = {};
        headers.forEach(function(header, index) {
          studentData[header] = data[i][index];
        });
        
        Logger.log("Found student: " + JSON.stringify(studentData));
        break;
      }
    }
    
    if (!studentData) {
      Logger.log("No student found with NIS: " + nis);
      return { success: false, error: "Siswa dengan NIS " + nis + " tidak ditemukan" };
    }
    
    // If student doesn't have a password yet, set their NIS as the default password
    if (!studentData.password || String(studentData.password).trim() === '') {
      Logger.log("Student has no password, setting default password");
      
      if (passwordIndex !== -1 && studentRow > 0) {
        // Update the password field with the default password (NIS)
        sheet.getRange(studentRow, passwordIndex + 1).setValue(nis);
        studentData.password = nis;
        Logger.log("Default password set to: " + nis);
      }
    }
    
    // Check password
    var storedPassword = studentData.password ? String(studentData.password).trim() : "";
    Logger.log("Comparing passwords - Provided: '" + password + "', Stored: '" + storedPassword + "'");
    
    if (storedPassword !== password) {
      Logger.log("Password mismatch");
      return { success: false, error: "Password salah" };
    }
    
    // Return student data without sensitive information
    var result = { 
      success: true, 
      siswa: {
        id: studentData.id,
        nama: studentData.nama,
        nis: studentData.nis,
        kelas_id: studentData.kelas_id,
        role: 'siswa'
      } 
    };
    
    Logger.log("Login successful, returning: " + JSON.stringify(result));
    return result;
  } catch (error) {
    Logger.log("Error in studentLogin: " + error.toString());
    return { success: false, error: "Terjadi kesalahan: " + error.toString() };
  }
}

function getSiswaNilai(params) {
  try {
    if (!params.siswa_id) {
      return { success: false, error: "ID siswa diperlukan" };
    }
    
    // Get all grades for the student
    var allNilai = getAllData('Nilai');
    var siswaNilai = allNilai.filter(function(nilai) {
      return nilai.siswa_id === params.siswa_id;
    });
    
    // Get assignment details for each grade
    var allTugas = getAllData('Tugas');
    var tugasMap = {};
    allTugas.forEach(function(tugas) {
      tugasMap[tugas.id] = tugas;
    });
    
    // Combine grades with assignment details
    var result = siswaNilai.map(function(nilai) {
      var tugas = tugasMap[nilai.tugas_id] || {};
      return {
        id: nilai.id,
        nilai: nilai.nilai,
        komentar: nilai.komentar || '',
        created_at: nilai.created_at,
        tugas: {
          id: tugas.id,
          judul: tugas.judul || '',
          deskripsi: tugas.deskripsi || '',
          tanggal: tugas.tanggal || '',
          kategori: tugas.kategori || ''
        }
      };
    });
    
    return { success: true, data: result };
  } catch (error) {
    return { success: false, error: error.toString() };
  }
}

function getSiswaGamification(params) {
  try {
    if (!params.siswa_id) {
      return { success: false, error: "ID siswa diperlukan" };
    }
    
    // Get student data
    var siswaRecord = findRecordById('Siswa', params.siswa_id);
    if (!siswaRecord) {
      return { success: false, error: "Siswa tidak ditemukan" };
    }
    
    // Get all grades for the student
    var allNilai = getAllData('Nilai');
    var siswaNilai = allNilai.filter(function(nilai) {
      return nilai.siswa_id === params.siswa_id;
    });
    
    // Calculate total points and badges
    var totalNilai = 0;
    var nilaiCount = 0;
    var badges = [];
    
    siswaNilai.forEach(function(nilai) {
      // Sum up numeric values
      var nilaiValue = parseFloat(nilai.nilai);
      if (!isNaN(nilaiValue)) {
        totalNilai += nilaiValue;
        nilaiCount++;
      }
    });
    
    // Calculate average grade if there are any
    var averageNilai = nilaiCount > 0 ? totalNilai / nilaiCount : 0;
    
    // Generate badges based on performance
    if (siswaNilai.length >= 10) {
      badges.push({
        id: 'completed_10',
        name: 'Pekerja Keras',
        description: 'Menyelesaikan 10 tugas',
        icon: '🏆'
      });
    }
    
    if (siswaNilai.length >= 5) {
      badges.push({
        id: 'completed_5',
        name: 'Mulai Berkembang',
        description: 'Menyelesaikan 5 tugas',
        icon: '🌱'
      });
    }
    
    if (averageNilai >= 90) {
      badges.push({
        id: 'excellent',
        name: 'Luar Biasa',
        description: 'Rata-rata nilai di atas 90',
        icon: '🥇'
      });
    } else if (averageNilai >= 80) {
      badges.push({
        id: 'great',
        name: 'Sangat Baik',
        description: 'Rata-rata nilai di atas 80',
        icon: '🥈'
      });
    } else if (averageNilai >= 70) {
      badges.push({
        id: 'good',
        name: 'Baik',
        description: 'Rata-rata nilai di atas 70',
        icon: '🥉'
      });
    }
    
    // Calculate level based on average grade
    var level = 1;
    if (averageNilai >= 95) level = 5;
    else if (averageNilai >= 85) level = 4;
    else if (averageNilai >= 75) level = 3;
    else if (averageNilai >= 65) level = 2;
    
    // Calculate XP and next level threshold
    var xp = Math.round(totalNilai * 10);
    var nextLevelXp = level * 1000;
    
    return { 
      success: true, 
      data: {
        siswa_id: params.siswa_id,
        level: level,
        xp: xp,
        next_level_xp: nextLevelXp,
        badges: badges,
        completed_assignments: siswaNilai.length,
        average_grade: Math.round(averageNilai * 10) / 10
      } 
    };
  } catch (error) {
    return { success: false, error: error.toString() };
  }
}

/**
 * Fetches student data from Google Sheets for bulk import
 * This function handles the CORS issue by acting as a proxy
 */
function getSiswaFromSheet(params) {
  try {
    Logger.log('getSiswaFromSheet called with params:', JSON.stringify(params));
    
    if (!params.sheetsId) {
      return { success: false, error: "Sheets ID is required" };
    }
    
    var sheetsId = params.sheetsId;
    Logger.log('Fetching data from sheets ID:', sheetsId);
    
    // Construct the CSV export URL
    var csvUrl = 'https://docs.google.com/spreadsheets/d/' + sheetsId + '/export?format=csv&gid=0';
    Logger.log('CSV URL:', csvUrl);
    
    // Fetch the CSV data using UrlFetchApp (server-side, no CORS issues)
    var response = UrlFetchApp.fetch(csvUrl);
    
    if (response.getResponseCode() !== 200) {
      Logger.log('HTTP Error:', response.getResponseCode(), response.getContentText());
      return { 
        success: false, 
        error: "HTTP " + response.getResponseCode() + ": Pastikan spreadsheet dapat diakses publik dengan setting 'Anyone with the link can view'" 
      };
    }
    
    var csvText = response.getContentText();
    Logger.log('CSV text length:', csvText.length);
    
    if (!csvText || csvText.trim() === '') {
      return { success: false, error: "Spreadsheet kosong atau tidak dapat diakses" };
    }
    
    // Parse CSV data
    var csvData = parseCSVText(csvText);
    Logger.log('Parsed CSV rows:', csvData.length);
    
    if (csvData.length < 2) {
      return { success: false, error: "Spreadsheet harus memiliki header dan minimal 1 baris data" };
    }
    
    // Log headers and sample data
    Logger.log('Headers:', JSON.stringify(csvData[0]));
    if (csvData.length > 1) {
      Logger.log('Sample row:', JSON.stringify(csvData[1]));
    }
    
    return { 
      success: true, 
      data: csvData,
      message: "Data berhasil diambil dari Google Sheets"
    };
    
  } catch (error) {
    Logger.log('Error in getSiswaFromSheet:', error.toString());
    return { 
      success: false, 
      error: "Gagal mengambil data dari Google Sheets: " + error.toString() 
    };
  }
}

/**
 * Parse CSV text into array of arrays
 */
function parseCSVText(csvText) {
  var lines = csvText.split('\n');
  var result = [];
  
  for (var i = 0; i < lines.length; i++) {
    var line = lines[i].trim();
    if (!line) continue;
    
    var row = [];
    var current = '';
    var inQuotes = false;
    
    for (var j = 0; j < line.length; j++) {
      var char = line[j];
      
      if (char === '"') {
        inQuotes = !inQuotes;
      } else if (char === ',' && !inQuotes) {
        row.push(current.trim().replace(/^"|"$/g, '')); // Remove surrounding quotes
        current = '';
      } else {
        current += char;
      }
    }
    
    // Add the last field
    row.push(current.trim().replace(/^"|"$/g, ''));
    result.push(row);
  }
  
  return result;
}
