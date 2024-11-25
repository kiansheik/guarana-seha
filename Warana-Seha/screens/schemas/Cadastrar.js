export const cadastrar_schema = {
    // Identificação
    identificacao: {
      type: 'checkbox',
      options: ['satere', 'caboclo'],
      label: 'Identificação de Cadastro / Registro CPSM',
    },
    data_do_cadastro: {
      type: 'date',
      label: 'Data do Cadastro',
      placeholder: 'DD/MM/AAAA',
    },
    assinatura_agente_campo: {
      type: 'text',
      label: 'Assinatura do Agente de Campo',
      placeholder: 'Assinatura',
    },
  
    // Dados do Produtor
    codigo_cadastro: {
      type: 'text',
      label: 'Código de Cadastro',
      placeholder: 'Código',
    },
    nome_sitio: {
      type: 'text',
      label: 'Nome Sítio',
      placeholder: 'Nome do Sítio',
    },
    nome_produtor: {
      type: 'text',
      label: 'Nome do Produtor',
      placeholder: 'Nome do Produtor',
    },
    data_nascimento: {
      type: 'date',
      label: 'Data de Nascimento',
      placeholder: 'DD/MM/AAAA',
    },
    cpf: {
      type: 'text',
      label: 'CPF',
      placeholder: 'CPF',
    },
    rg: {
      type: 'text',
      label: 'RG',
      placeholder: 'RG',
    },
    uf: {
      type: 'text',
      label: 'UF',
      placeholder: 'Estado',
    },
    pais: {
      type: 'text',
      label: 'País',
      placeholder: 'País',
    },
    comunidade: {
      type: 'text',
      label: 'Comunidade',
      placeholder: 'Comunidade',
    },
    rio: {
      type: 'text',
      label: 'Rio',
      placeholder: 'Rio',
    },
    municipio: {
      type: 'text',
      label: 'Município',
      placeholder: 'Município',
    },
    telefone: {
      type: 'text',
      label: 'Telefone',
      placeholder: 'Telefone',
    },
    validade: {
      type: 'text',
      label: 'VAL DOC',
      placeholder: 'Validade do Documento',
    },
  
    dimensao_familiar: {
      type: 'table',
      label: 'Dimensão Social / Familiar',
      columns: [
        { key: 'nome_familiar', label: 'Nome Familiares', type: 'text', placeholder: 'Nome do Familiar' },
        { key: 'data_nascimento_familiar', label: 'Data de Nascimento', type: 'date', placeholder: 'DD/MM/AAAA' },
        { key: 'cpf_familiar', label: 'CPF', type: 'text', placeholder: 'CPF' },
        { key: 'estuda_familiar', label: 'Estuda (S/N)', type: 'text', placeholder: 'Sim/Não' },
        { key: 'serie_familiar', label: 'Qual Série?', type: 'text', placeholder: 'Série' },
        { key: 'parentesco', label: 'Parentesco', type: 'text', placeholder: 'Parentesco' },
      ],
    },
  
    // Dimensão Econômica Produtiva
    situacao_fundiaria: {
      type: 'checkbox',
      options: ['posse', 'uso_coletivo', 'comodato', 'titulo_definitivo', 'assentamento'],
      label: 'Qual a situação Fundiária da Área de Coleta / Produtiva? (CASO FOR FORA DA T.I)',
    },
    acesso: {
      type: 'checkbox',
      options: ['chao_batido', 'asfalto', 'so_picada'],
      label: 'Acesso',
    },
    other_acesso: {
      type: 'text',
      label: 'Outro Acesso',
      placeholder: 'Descreva outro acesso (se houver)',
    },
  
    // Produtos e Produção
    produtos: {
      type: 'table',
      label: 'Produtos e Produção',
      columns: [
        { key: 'produto', label: 'Produto', type: 'text', placeholder: 'Nome do Produto' },
        { key: 'area_ano_anterior', label: 'Área Produtiva Ano Anterior (hc)', type: 'number', placeholder: 'Área Ano Anterior (hc)' },
        { key: 'area_ano_atual', label: 'Área Produtiva Ano Atual (hc)', type: 'number', placeholder: 'Área Ano Atual (hc)' },
        { key: 'num_plantas', label: 'Nº de Plantas Produzem', type: 'number', placeholder: 'Número de Plantas' },
        { key: 'producao_anterior', label: 'Produção Anterior (kg)', type: 'number', placeholder: 'Produção Anterior (kg)' },
        { key: 'producao_atual', label: 'Produção Atual (kg)', type: 'number', placeholder: 'Produção Atual (kg)' },
        { key: 'quant_vendida_atual', label: 'Quant Vendida Atual (kg)', type: 'number', placeholder: 'Quantidade Vendida Atual (kg)' },
        { key: 'preco_vendido', label: 'Preço Vendido (kg)', type: 'number', placeholder: 'Preço Vendido (kg)' },
      ],
    },
    // Situações Ambientais
    situacoes_ambientais: {
      type: 'checkbox',
      options: [
        'assoreamentos_de_rios',
        'desmatamentos',
        'degradacao_do_solo',
        'compactacao_do_solo',
        'queimadas',
        'contaminacao_da_agua',
        'embalagem_de_agrotoxicos',
      ],
      label: 'Quais situações ambientais são encontradas na unidade de produção familiar?',
    },
  
    // Práticas Culturais
    praticas_culturais: {
      type: 'checkbox',
      options: [
        'rotacao_cultura',
        'plantio_nivel',
        'adubacao_verde',
        'agroflorestal',
        'controle_pragas',
      ],
      label: 'Quais praticas culturais são realizadas na unidade produtiva familiar?',
    },
  
    // Limpeza do Terreno
    limpeza_do_terreno: {
      type: 'checkbox',
      options: ['fogo', 'foice_e_enxadas', 'grade_e_arado', 'herbicidas'],
      label: 'A limpeza do terreno para plantios é feita com',
    },
    other_limpeza_do_terreno: {
      type: 'text',
      label: 'Outro Tipo de Limpeza do Terreno',
      placeholder: "(se houver)",
    },
  
    // Preservação Ambiental e Biodiversidade
    preserva_fauna_e_flora: {
      type: 'checkbox',
      options: ['Sim', 'Não'],
      label: 'Você se preocupa com a preservação do meio ambiente, e Fauna e Flora?',
    },
    ha_rio: {
      type: 'checkbox',
      options: ['Sim', 'Não'],
      label: 'Há um rio que passa pela sua Unidade de Produção Familiar?',
    },
    recomend_ant: {
    type: "text",
    label: "Recomendações anterior",
    placeholder: "(se houver)",
    },
    recommend_cump: {
      type: 'checkbox',
      options: ['Sim', 'Não'],
      label: 'As recomendações anteriores foram cumpridas?',
    },
    terms: {
      type: "text",
      label: `TERMO DE COMPROMISSO:
  DECLARO ME ESFORÇAR O MÁXIMO JUNTO COM A EQUIPE DO CPSM – CONSÓRCIO DOS PRODUTORES SATERÉ MAWE E DEPARTAMENTO LIGADO SCI-SISTEMA DE CONTROLE INTERNO, PARA ATENDER AS NORMAS PEDIDAS PELA CERTIFICADORA ( ) DE SEUS PROTOCOLOS EXIGIDOS, PELO FGP (Forest Garden Products (Productos de Jardines Forestales ) , ORGÂNICO, ECOLÓGICO SUSTENTÁVEL..
  DECLARO, CONCORDAR COM O TERMO DE COMPROMISSO ACIMA`,
      placeholder: "assinar",
      },
  
  }

  export default cadastrar_schema;