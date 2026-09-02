import { EventItem, ParticipantAttendance, Registration, CertificateItem } from '../types';

export const mockEvents: EventItem[] = [
  {
    id: '1',
    title: 'Inteligência Artificial e o Futuro da Educação',
    description: 'Aprenda sobre o impacto dos grandes modelos de linguagem e ferramentas de IA generativa no ambiente acadêmico e no mercado de trabalho tecnológico.',
    category: 'Palestra',
    modality: 'Presencial',
    startDate: '21/05/2026',
    endDate: '21/05/2026',
    dayMonth: '21 MAI',
    workload: '4 horas',
    location: 'Auditório Principal - IFCE Campus Cedro',
    totalSlots: 60,
    enrolledSlots: 55,
    status: 'Aberto',
    activities: [
      { id: 'a1', title: 'Credenciamento e Abertura', time: '08:00 - 08:30', speaker: 'Comissão Organizadora' },
      { id: 'a2', title: 'Palestra Magna: IA Generativa', time: '08:30 - 10:30', speaker: 'Prof. Dr. Ricardo Silva' },
      { id: 'a3', title: 'Mesa Redonda: Ética e Aplicações', time: '10:45 - 12:00', speaker: 'Corpo Docente de TI' }
    ]
  },
  {
    id: '2',
    title: 'Conversação na Língua Inglesa',
    description: 'Minicurso prático e imersivo focado no desenvolvimento da fluência oral para intercâmbios e apresentações científicas internacionais.',
    category: 'Minicurso',
    modality: 'Presencial',
    startDate: '24/05/2026',
    endDate: '26/05/2026',
    dayMonth: '24 MAI',
    workload: '12 horas',
    location: 'Laboratório de Idiomas - IFCE Campus Cedro',
    totalSlots: 30,
    enrolledSlots: 30,
    status: 'Esgotado',
    activities: [
      { id: 'b1', title: 'Pronunciation & Phrasal Verbs', time: '14:00 - 16:00', speaker: 'Profª. Amanda Costa' },
      { id: 'b2', title: 'Presentation Skills Workshop', time: '16:15 - 18:00', speaker: 'Prof. John Santos' }
    ]
  },
  {
    id: '3',
    title: 'Semana da Inovação e Tecnologia (Expotec 2026)',
    description: 'Maior encontro de inovação, empreendedorismo e computação do centro-sul cearense. Hackathons, mostras científicas e palestras de renome.',
    category: 'Congresso',
    modality: 'Híbrido',
    startDate: '05/05/2026',
    endDate: '07/05/2026',
    dayMonth: '05 MAI',
    workload: '30 horas',
    location: 'Ginásio e Blocos Didáticos - IFCE Campus Cedro',
    totalSlots: 200,
    enrolledSlots: 142,
    status: 'Aberto',
    activities: [
      { id: 'c1', title: 'Palestra Magna de Inovação', time: '09:00 - 11:00', speaker: 'Dra. Camila Nogueira' },
      { id: 'c2', title: 'Workshop de Robótica e IoT', time: '14:00 - 17:00', speaker: 'Grupo de Pesquisa GED' },
      { id: 'c3', title: 'Feira de Projetos e Startups', time: '18:00 - 21:00', speaker: 'Expositores Gerais' }
    ]
  },
  {
    id: '4',
    title: 'Sustentabilidade em Ação: Energias Renováveis',
    description: 'Oficinas sobre instalação e manutenção de painéis fotovoltaicos e gestão energética eficiente na região do semiárido.',
    category: 'Oficina',
    modality: 'Presencial',
    startDate: '12/06/2026',
    endDate: '13/06/2026',
    dayMonth: '12 JUN',
    workload: '8 horas',
    location: 'Laboratório de Eletrotécnica - IFCE',
    totalSlots: 40,
    enrolledSlots: 28,
    status: 'Aberto',
    activities: [
      { id: 'd1', title: 'Introdução ao Solar Fotovoltaico', time: '08:00 - 12:00', speaker: 'Eng. Marcelo Peixoto' }
    ]
  }
];

export const mockParticipants: ParticipantAttendance[] = [
  {
    id: 'p1',
    name: 'Aline de Sousa Silva',
    email: 'aline.sousa@aluno.ifce.edu.br',
    matricula: '2023104501',
    status: 'presente',
    certificateIssued: true
  },
  {
    id: 'p2',
    name: 'Lucas da Silva Ferreira',
    email: 'lucas.ferreira@aluno.ifce.edu.br',
    matricula: '2023104502',
    status: 'presente',
    certificateIssued: true
  },
  {
    id: 'p3',
    name: 'Maria Eduarda Santos',
    email: 'maria.santos@aluno.ifce.edu.br',
    matricula: '2022203114',
    status: 'presente',
    certificateIssued: false
  },
  {
    id: 'p4',
    name: 'Tiago Oliveira Gomes',
    email: 'tiago.gomes@aluno.ifce.edu.br',
    matricula: '2024101908',
    status: 'ausente',
    certificateIssued: false
  },
  {
    id: 'p5',
    name: 'Bruna Ribeiro Silva',
    email: 'bruna.ribeiro@aluno.ifce.edu.br',
    matricula: '2023104509',
    status: 'presente',
    certificateIssued: false
  },
  {
    id: 'p6',
    name: 'Gabriel Costa Farias',
    email: 'gabriel.farias@aluno.ifce.edu.br',
    matricula: '2021102390',
    status: 'ausente',
    certificateIssued: false
  },
  {
    id: 'p7',
    name: 'Larissa Martins Paiva',
    email: 'larissa.paiva@aluno.ifce.edu.br',
    matricula: '2023201102',
    status: 'presente',
    certificateIssued: true
  }
];

export const mockRegistrations: Registration[] = [
  {
    id: 'r1',
    eventId: '1',
    eventTitle: 'Inteligência Artificial e o Futuro da Educação',
    date: '21/05/2026',
    status: 'confirmado',
    ticketCode: 'SGE-IA-94812'
  },
  {
    id: 'r2',
    eventId: '3',
    eventTitle: 'Semana da Inovação e Tecnologia (Expotec 2026)',
    date: '05/05/2026',
    status: 'confirmado',
    ticketCode: 'SGE-EXP-11029'
  }
];

export const mockCertificates: CertificateItem[] = [
  {
    id: 'cert-1',
    eventId: '1',
    eventTitle: 'Inteligência Artificial e o Futuro da Educação',
    issueDate: '22/05/2026',
    workload: '4 horas',
    code: 'IFCE-CED-2026-CERT-8841',
    participantName: 'Luzia Fernandes'
  },
  {
    id: 'cert-2',
    eventId: '4',
    eventTitle: 'Seminário de Metodologias Ágeis',
    issueDate: '15/04/2026',
    workload: '8 horas',
    code: 'IFCE-CED-2026-CERT-3109',
    participantName: 'Luzia Fernandes'
  },
  {
    id: 'cert-3',
    eventId: '2',
    eventTitle: 'Workshop de Desenvolvimento Web Moderno',
    issueDate: '10/03/2026',
    workload: '10 horas',
    code: 'IFCE-CED-2026-CERT-1124',
    participantName: 'Luzia Fernandes'
  }
];
