SELECT
    i.options AS identificacao_options,
    d.nome_do_produtor,
    d.nome_do_sitio,
    f.nome_familiares,
    f.parentesco
FROM dimensao_social_familiar f
JOIN dados_do_produtor d ON f.parent_id = d.id
JOIN identificacao_cadastro_registro_cpsm i ON d.parent_id = i.id;
