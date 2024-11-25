export const individual_schema = {
  // Identificação
  identificacao: {
    type: 'checkbox',
    options: ['satere', 'caboclo'],
    label: 'Identificação da Inspeção/Registro',
  },
  distancia_area_prod: {
    type: 'text',
    label: 'Distância da Área Produtiva (km)',
    placeholder: 'Distância em km',
  },
  data_inspecao: {
    type: 'date',
    label: 'Data da Inspeção',
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
    label: 'Nome do Sítio',
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
    placeholder: 'Brasil',
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
  validade_doc: {
    type: 'text',
    label: 'Validade do Documento',
    placeholder: '1 ano',
  },

  // Avaliação
  fgp: {
    type: 'checkbox',
    options: ['sim', 'não'],
    label: 'FGP?',
  },
  organico: {
    type: 'checkbox',
    options: ['sim', 'não'],
    label: 'Orgânico?',
  },
  principios: {
    type: 'checkbox',
    options: [
      'Princípio observar e registrar',
      'Compreender e avaliar',
      'Conhece o terreno',
      'Identificar níveis de Rendimento',
      'Mapeamento dos sistemas de fluxo e armazenamento',
      'Reduzir a proporção de energia externa na produção',
      'Ser guiado pelas necessidades da paisagem',
      'Siga sucessão ecológica',
      'Usando processos ecológicos',
      'Valor para a biodiversidade',
      'Maturidade respeito',
      'Responder de forma criativa',
    ],
    label: 'Princípios',
  },
  problemas: {
    type: 'checkbox',
    options: [
      'Usa Agrotóxicos',
      'Lixo Orgânico',
      'Utiliza insumos externos',
      'Realiza queimada',
      'Realiza adubação orgânica',
    ],
    label: 'Problemas Observados',
  },
  atividades_coletivas: {
    type: 'checkbox',
    options: ['Participa de Atividades Coletivas'],
    label: 'Atividades Coletivas (Puxirum, visitas)',
  },
  indicadores_ecologicos: {
    type: 'checkbox',
    options: ['Sim', 'Não'],
    label: 'Há presença de indicadores ecológicos (Animais, etc.)?',
  },
  banco_sementes: {
    type: 'text',
    label: 'Possui Banco de Sementes? Quais?',
    placeholder: 'Descreva',
  },
  planejamento: {
    type: 'text',
    label: 'Planejamento para médio e longo prazo',
    placeholder: 'Atividades planejadas',
  },

  // Coordenadas Geográficas
  coordenadas: {
    type: 'table',
    label: 'Coordenadas Geográficas',
    columns: [
      { key: 'latitude', label: 'Latitude', type: 'text', placeholder: 'S __º __ʼ __ʼʼ' },
      { key: 'longitude', label: 'Longitude', type: 'text', placeholder: 'W __º __ʼ __ʼʼ' },
      { key: 'altitude', label: 'Altitude (m)', type: 'number', placeholder: 'Altitude em metros' },
    ],
  },
  local_data: {
    type: 'text',
    label: 'Local/Data',
    placeholder: 'Local e Data',
  },
  assinatura_produtor: {
    type: 'text',
    label: 'Assinatura do Produtor',
    placeholder: 'Assinatura',
  },
};



  export default individual_schema;