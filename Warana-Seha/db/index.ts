import SQLite from 'react-native-sqlite-storage';

const db = SQLite.openDatabase(
  { name: 'app.db', location: 'default' },
  () => console.log('Database opened'),
  (err) => console.error('Error opening database:', err)
);

// Initialize the tables
export const initializeDatabase = () => {
  db.transaction((tx) => {
    tx.executeSql(
      `CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        cpf TEXT UNIQUE NOT NULL,
        date_created TEXT DEFAULT CURRENT_TIMESTAMP,
        date_modified TEXT DEFAULT CURRENT_TIMESTAMP
      )`
    );
    tx.executeSql(
      `CREATE TABLE IF NOT EXISTS messages (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id INTEGER NOT NULL,
        message TEXT NOT NULL,
        date_created TEXT DEFAULT CURRENT_TIMESTAMP,
        date_modified TEXT DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users (id)
      )`
    );

    // Questionnaire Table
    tx.executeSql(
      `CREATE TABLE IF NOT EXISTS questionnaire (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id INTEGER NOT NULL,
        data TEXT NOT NULL,
        date_created TEXT DEFAULT CURRENT_TIMESTAMP,
        date_modified TEXT DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users (id)
      )`
    );
    // Questionnaire Table
    tx.executeSql(
      `CREATE TABLE IF NOT EXISTS q_images (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id INTEGER NOT NULL,
        q_id INTEGER NOT NULL,
        image BLOB,
        date_created TEXT DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users (id),
        FOREIGN KEY (q_id) REFERENCES questionnaire (id)
      )`
    );
  });
};

export const saveQPhotoToDatabase = (photoURI, userId, qId) => {
  if (!photoURI) {
    console.error('No photo to save');
    return;
  }

  // Convert image to blob
  const fs = require('react-native-fs');
  fs.readFile(photoURI, 'base64')
    .then((data) => {
      const photoBlob = `data:image/jpeg;base64,${data}`;
      db.transaction((tx) => {
        tx.executeSql(
          `INSERT INTO q_images (user_id, q_id, image_blob) VALUES (?, ?, ?)`,
          [userId, qId, photoBlob],
          () => {
            console.log('Photo saved successfully!');
          },
          (txObj, error) => {
            console.error('Error saving photo', error);
          }
        );
      });
    })
    .catch((error) => console.error('Error reading photo', error));
};

export const getLatestQuestionnaireByType = (userId, type, callback) => {
  db.transaction((tx) => {
    tx.executeSql(
      `
      SELECT * 
      FROM questionnaire 
      WHERE user_id = ? AND json_extract(data, '$.tipo') = ? 
      ORDER BY date_modified DESC 
      LIMIT 1
      `,
      [userId, type],
      (_, results) => {
        callback(results.rows.length > 0 ? results.rows.item(0) : null);
      },
      (_, error) => {
        console.error('Error fetching latest questionnaire by type:', error);
      }
    );
  });
};


export const addQuestionnaireData = (user_id, data, post) => {
  db.transaction((tx) => {
    tx.executeSql(
      "INSERT INTO questionnaire (user_id, data, date_created, date_modified) VALUES (?, ?, datetime('now'), datetime('now'))",
      [user_id, JSON.stringify(data)],
      post,
      (err) => console.error('Error saving questionnaire data:', err)
    );
  });
};


export const addUser = (name, cpf) => {
  db.transaction((tx) => {
    tx.executeSql(
      `INSERT INTO users (name, cpf, date_created, date_modified)
       VALUES (?, ?, datetime('now'), datetime('now'))`,
      [name, cpf],
      () => console.log(`User added: ${name}`),
      (err) => console.error('Error adding user:', err)
    );
  });
};


export const getUsers = (callback) => {
  db.transaction((tx) => {
    tx.executeSql(
      `SELECT 
        users.id, 
        users.name, 
        users.cpf, 
        users.date_created,
        -- Get the latest date_modified from users or questionnaire
        MAX(
          CASE 
            WHEN questionnaire.date_modified > users.date_modified THEN questionnaire.date_modified
            ELSE users.date_modified 
          END
        ) AS date_modified
      FROM users
      LEFT JOIN questionnaire ON questionnaire.user_id = users.id
      GROUP BY users.id, users.name, users.cpf, users.date_created
      ORDER BY date_modified DESC`, 
      [],
      (_, results) => {
        callback(results.rows.raw());
      },
      (error) => {
        console.error('Error fetching users:', error);
      }
    );
  });
};

export const updateQuestionnaireData = (id, newData) => {
  db.transaction((tx) => {
    tx.executeSql(
      `UPDATE questionnaire 
       SET data = ?, date_modified = datetime('now') 
       WHERE id = ?`,
      [JSON.stringify(newData), id],
      () => console.log('Questionnaire data updated successfully'),
      (err) => console.error('Error updating questionnaire data:', err)
    );
  });
};
export const updateMessage = (messageId, newMessage) => {
  db.transaction((tx) => {
    tx.executeSql(
      `UPDATE messages 
       SET message = ?, date_modified = datetime('now') 
       WHERE id = ?`,
      [newMessage, messageId],
      () => console.log('Message updated successfully'),
      (err) => console.error('Error updating message:', err)
    );
  });
};


export const getQuestionnaireData = (userId, callback) => {
  db.transaction((tx) => {
    tx.executeSql(
      `SELECT * FROM questionnaire WHERE user_id = ? ORDER BY date_modified ASC`,
      [userId],
      (_, results) => callback(results.rows.raw()),
      (error) => console.error('Error fetching questionnaire data:', error)
    );
  });
};

export const getSpecificQuestionnaireData = (id, callback) => {
  db.transaction((tx) => {
    tx.executeSql(
      `SELECT * FROM questionnaire WHERE id = ? ORDER BY date_modified ASC`,
      [id],
      (_, results) => callback(results.rows.raw()),
      (error) => console.error('Error fetching questionnaire data:', error)
    );
  });
};


export const addMessage = (userId, message) => {
  db.transaction((tx) => {
    tx.executeSql('INSERT INTO messages (user_id, message) VALUES (?, ?)', [userId, message]);
  });
};

export const getMessages = (userId, callback) => {
  db.transaction((tx) => {
    tx.executeSql(
      'SELECT * FROM messages WHERE user_id = ?',
      [userId],
      (_, results) => {
        callback(results.rows.raw());
      }
    );
  });
};
