import sqlite3  # For creating and managing the SQLite database
import json     # For serializing/deserializing JSON data


def process_specific_json_with_relationships(json_data, db_name='relational_data_with_relationships.db'):
    """
    Processes your specific JSON structure into multiple relational tables with parent-child relationships in SQLite.

    Args:
        json_data (dict): JSON object with your specific data structure.
        db_name (str): The SQLite database name.

    Returns:
        None
    """
    conn = sqlite3.connect(db_name)
    cursor = conn.cursor()

    # Create and populate tables
    def process_identificacao(data):
        cursor.execute('''
            CREATE TABLE IF NOT EXISTS identificacao_cadastro_registro_cpsm (
                id INTEGER PRIMARY KEY,
                options TEXT,
                data_do_cadastro TEXT,
                assinatura_agente_de_campo TEXT
                , synced INTEGER DEFAULT 0
            )
        ''')
        cursor.execute('''
            INSERT INTO identificacao_cadastro_registro_cpsm (options, data_do_cadastro, assinatura_agente_de_campo)
            VALUES (?, ?, ?)
        ''', (json.dumps(data.get('options')), data.get('data_do_cadastro'), data.get('assinatura_agente_de_campo')))
        conn.commit()
        return cursor.lastrowid  # Return the ID for parent reference

    def process_dados_do_produtor(data, parent_id):
        cursor.execute('''
            CREATE TABLE IF NOT EXISTS dados_do_produtor (
                id INTEGER PRIMARY KEY,
                parent_id INTEGER,
                nome_do_produtor TEXT,
                nome_do_sitio TEXT,
                data_de_nascimento TEXT,
                cpf TEXT,
                rg TEXT,
                uf TEXT,
                codigo_do_pais TEXT,
                comunidade TEXT,
                rio TEXT,
                municipio TEXT,
                telefone TEXT,
                validade_do_documento TEXT
                , synced INTEGER DEFAULT 0,
                FOREIGN KEY (parent_id) REFERENCES identificacao_cadastro_registro_cpsm(id)
            )
        ''')
        cursor.execute('''
            INSERT INTO dados_do_produtor (
                parent_id, nome_do_produtor, nome_do_sitio, data_de_nascimento, cpf, rg, uf,
                codigo_do_pais, comunidade, rio, municipio, telefone, validade_do_documento
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        ''', (
            parent_id, data.get('nome_do_produtor'), data.get('nome_do_sitio'), data.get('data_de_nascimento'),
            data.get('cpf'), data.get('rg'), data.get('uf'), data.get('codigo_do_pais'),
            data.get('comunidade'), data.get('rio'), data.get('municipio'),
            data.get('telefone'), data.get('validade_do_documento')
        ))
        conn.commit()
        return cursor.lastrowid

    def process_dimensao_social_familiar(data, parent_id):
        cursor.execute('''
            CREATE TABLE IF NOT EXISTS dimensao_social_familiar (
                id INTEGER PRIMARY KEY,
                parent_id INTEGER,
                nome_familiares TEXT,
                data_de_nascimento TEXT,
                parentesco TEXT,
                cpf TEXT,
                estuda BOOLEAN,
                qual_serie TEXT
                , synced INTEGER DEFAULT 0,
                FOREIGN KEY (parent_id) REFERENCES dados_do_produtor(id)
            )
        ''')
        for item in data:
            cursor.execute('''
                INSERT INTO dimensao_social_familiar (
                    parent_id, nome_familiares, data_de_nascimento, parentesco, cpf, estuda, qual_serie
                ) VALUES (?, ?, ?, ?, ?, ?, ?)
            ''', (
                parent_id, item.get('nome_familiares'), item.get('data_de_nascimento'),
                item.get('parentesco'), item.get('cpf'), item.get('estuda'), item.get('qual_serie')
            ))
        conn.commit()

    # Add parent-child relationships where applicable
    identificacao_id = process_identificacao(json_data.get('identificacao_cadastro_registro_cpsm', {}))
    dados_do_produtor_id = process_dados_do_produtor(json_data.get('dados_do_produtor', {}), identificacao_id)
    process_dimensao_social_familiar(json_data.get('dimensao_social_familiar', []), dados_do_produtor_id)

    conn.close()
