import sqlite3
import requests
from datetime import datetime
import json, time
from copy import deepcopy
import pandas as pd
import data_processing as dp

# Connect to SQLite database
conn = sqlite3.connect('relational_data.db')
cursor = conn.cursor()


def infer_schema_and_create_table(table_name, objects):
    """
    Infers schema from the first object in the list and creates the table if it doesn't exist.
    """
    if not objects:
        raise ValueError("No objects provided for schema inference.")
    
    # Check if table already exists
    cursor.execute(f"SELECT name FROM sqlite_master WHERE type='table' AND name='{table_name}'")
    if cursor.fetchone():
        print(f"Table '{table_name}' already exists.")
        return

    # Infer schema from the first object
    first_obj = objects[0]
    columns = []
    for key, value in first_obj.items():
        if isinstance(value, int):
            col_type = "INTEGER"
        elif isinstance(value, float):
            col_type = "REAL"
        elif isinstance(value, str):
            col_type = "TEXT"
        elif isinstance(value, bytes):
            col_type = "BLOB"
        else:
            raise ValueError(f"Unsupported data type for field '{key}': {type(value)}")
        columns.append(f"{key} {col_type}")
    
    # Create table with inferred schema
    schema = ", ".join(columns)
    cursor.execute(f"CREATE TABLE {table_name} (id INTEGER PRIMARY KEY AUTOINCREMENT, {schema}, synced INTEGER DEFAULT 0)")
    conn.commit()
    print(f"Table '{table_name}' created with schema: {schema}")

def add_objects_to_table(table_name, objects):
    """
    Adds a list of objects to the specified table. The table must exist.
    """
    if not objects:
        raise ValueError("No objects provided for insertion.")
    
    # Ensure table exists
    cursor.execute(f"SELECT name FROM sqlite_master WHERE type='table' AND name='{table_name}'")
    if not cursor.fetchone():
        raise ValueError(f"Table '{table_name}' does not exist. Please create it first.")
    
    # Prepare and execute insertion
    keys = objects[0].keys()
    placeholders = ", ".join("?" for _ in keys)
    columns = ", ".join(keys)
    data = [tuple(obj[key] for key in keys) for obj in objects]

    cursor.executemany(f"INSERT INTO {table_name} ({columns}) VALUES ({placeholders})", data)
    conn.commit()
    print(f"Inserted {len(objects)} records into '{table_name}'.")


def sync_table_data(table_name, server_url):
    """
    Syncs unsynced data from the table with the server and marks as synced on success.
    """
    cursor.execute(f"SELECT * FROM {table_name} WHERE synced = 0")
    unsynced_data = cursor.fetchall()
    column_names = [desc[0] for desc in cursor.description]

    for row in unsynced_data:
        record = dict(zip(column_names, row))
        record_id = record["id"]
        try:
            # Simulate an API request
            response = requests.post(server_url, json=record)
            if response.status_code == 200:
                # Mark data as synced
                cursor.execute(f"UPDATE {table_name} SET synced = 1 WHERE id = ?", (record_id,))
                conn.commit()
                print(f"Record ID {record_id} synced successfully.")
            else:
                print(f"Failed to sync Record ID {record_id}. Server responded with {response.status_code}.")
        except requests.RequestException as e:
            print(f"Network error while syncing Record ID {record_id}: {e}")

def sync_all_tables(server_url):
    """
    Syncs all tables in the database where a 'synced' column exists.

    Args:
        server_url (str): The server URL to sync data with.
    """
    # Get all tables in the database
    cursor.execute("SELECT name FROM sqlite_master WHERE type='table'")
    tables = cursor.fetchall()

    for (table_name,) in tables:  # Unpack table name from tuple
        # Check if the table has a 'synced' column
        cursor.execute(f"PRAGMA table_info({table_name})")
        columns = [col[1] for col in cursor.fetchall()]
        if 'synced' in columns:
            print(f"Syncing table: {table_name}")
            sync_table_data(table_name, server_url)
        else:
            print(f"Skipping table {table_name}: No 'synced' column")


# Example Usage
example_data = []

table_name = "producer_data"
server_url = "https://example.com/api/upload"



with open("sample_form.json", "r") as file:
    sample_form_data = json.load(file)

# using the sample_form data, create fake data to sync with the server with diferent names
for i in range(10):
    new_data = deepcopy(sample_form_data)
    new_data["dados_do_produtor"]["nome_do_produtor"] = f"Producer {i}"
    new_data["timestamp"] = datetime.now().isoformat()
    example_data.append(new_data)
    time.sleep(0.1)
    dp.process_specific_json_with_relationships(new_data, 'relational_data.db')

sync_all_tables(server_url)
