/* ============================================================================
   WasFit — Conteúdo do site  (parametrizável, sem build)
   ----------------------------------------------------------------------------
   Edite este arquivo e suba de novo. Nenhuma compilação é necessária.
   Procure por  "TROCAR"  para achar o que depende do Felipe / da operação.
   Os textos finais chegam até 04/09 — aqui está a versão de trabalho, tirada
   do deck EIN 2026 e da especificação v3.
   ========================================================================== */
window.WASFIT = {

  /* ---- Marca / termos --------------------------------------------------- */
  brand: {
    nome: 'WasFit',
    produto: 'WasFit Assist',
    dominio: 'wasfit.com.br',
    url: 'https://wasfit.com.br',
    // Item 10.6 — não fixar "academia" no código. Trocar aqui muda o site todo.
    segmento: 'escolas de natação e academias',
    segmentoCurto: 'sua escola',
  },

  /* ---- Contato / links de ação --------------------------------------------
     O WhatsApp aparece em 3 posições (header, footer, botão flutuante).
     Cada clique dispara o evento clique_whatsapp com a posição. */
  contato: {
    whatsapp: '5527000000000',                       // TROCAR: número oficial (só dígitos, com DDI 55)
    whatsappMsg: 'Oi! Vim pelo site da WasFit e quero entender o Assist.',
    email: 'comercial@wasfit.com.br',                 // TROCAR
    // Link de agendamento de demonstração. Os UTMs são repassados automaticamente.
    agendamento: 'https://cal.com/wasfit/demo',       // TROCAR
    instagram: 'https://instagram.com/wasfit',        // TROCAR
    // Endpoint do formulário de contato (ex.: Formspree, Getform, n8n webhook).
    // Vazio => o formulário monta uma mensagem e abre o WhatsApp.
    formEndpoint: '',                                 // TROCAR ex.: 'https://formspree.io/f/xxxx'
  },

  /* ---- Medição (item 4 e 5) --------------------------------------------------
     Deixe gtmId vazio ('') e NENHUM script de terceiros carrega — a página
     funciona igual. Quando o Felipe enviar o ID, cole aqui e suba o arquivo.
     GA4 e Pixel da Meta são configurados DENTRO do GTM, não aqui. */
  analytics: {
    gtmId: '',                 // TROCAR ex.: 'GTM-XXXXXXX'
    ga4_hint: 'Configurar a tag GA4 dentro do container do GTM',
    pixel_hint: 'Configurar o Pixel da Meta dentro do container do GTM',
    debug: false,              // true = também joga os eventos no console
  },

  /* ---- Open Graph / preview de link no WhatsApp (item 12) ----------------- */
  og: {
    titulo: 'WasFit — a IA que atende como gente, 24/7 no WhatsApp',
    descricao: 'Atendimento, qualificação e follow-up automáticos para escolas de natação e academias. Integração nativa com o EVO. API oficial da Meta.',
    // URL ABSOLUTA, imagem >= 1200x630, < 300 KB.
    imagem: 'https://wasfit.com.br/assets/img/og-cover.png',
  },

  /* ====================================================================== */
  /*  PÁGINA INICIAL                                                         */
  /* ====================================================================== */
  home: {
    nav: [
      { label: 'Como funciona', href: '#como-funciona' },
      { label: 'As 7 IAs',      href: '#ias' },
      { label: 'Planos',        href: '#planos' },
      { label: 'EIN 2026',      href: '/ein/' },
    ],

    hero: {
      selo: 'API oficial da Meta',                    // item 10.3 — selo visível perto do topo
      // Item 10.1 — título parametrizável. Texto novo até 04/09.
      titulo: ['Sua escola vende', 'enquanto você dorme.'],
      subtitulo: 'Atendimento 24/7 no WhatsApp com a inteligência da sua operação e o acolhimento que cada família espera. Menos fila, mais matrícula.',
      ctaPrimario:   { label: 'Testar grátis por 7 dias', evento: 'clique_teste_gratis', plano: 'essencial' },
      ctaSecundario: { label: 'Falar com a gente',        evento: 'clique_contato',       plano: 'rede' },
      stats: [
        { n: '11 anos', l: 'de mercado fitness' },
        { n: '24/7',    l: 'IA sempre ativa' },
        { n: '1 nicho', l: 'fitness e natação' },
      ],
    },

    // Vídeo de ~2 min acima da dobra. Carrega só quando o visitante pede (item 9).
    demo: {
      eyebrow: 'Demonstração',
      titulo: 'A IA escuta antes de vender',
      texto: 'Uma conversa real: a IA identifica o objetivo da família, apresenta o diferencial certo e conduz para o próximo passo.',
      // Coloque o ID do YouTube OU um caminho .mp4 local. Vazio = mostra só o poster.
      youtubeId: '',                                   // TROCAR ex.: 'dQw4w9WgXcQ'
      mp4: '',                                         // ou 'assets/video/demo.mp4'
      evento: 'viu_demo',
    },

    // Item 9 — As 7 IAs do ciclo do aluno. (nomes sujeitos a ajuste até 04/09)
    ias: {
      eyebrow: 'As 7 IAs do ciclo do aluno',
      titulo: 'Uma IA para cada etapa. Nenhuma conversa perdida.',
      itens: [
        { icone: 'bolt',      nome: 'Recepção',    desc: 'Responde todo primeiro contato na hora, a qualquer hora.' },
        { icone: 'target',    nome: 'Qualificação', desc: 'Entende objetivo, nível e perfil de quem chega.' },
        { icone: 'calendar',  nome: 'Agendamento', desc: 'Marca a aula experimental e sincroniza a agenda.' },
        { icone: 'reply',     nome: 'Follow-up',   desc: 'Reativa quem disse "vou pensar" antes de esfriar.' },
        { icone: 'check',     nome: 'Matrícula',   desc: 'Conduz da experimental ao contrato, com contexto.' },
        { icone: 'chat',      nome: 'Onboarding',  desc: 'Acompanha as primeiras semanas do novo aluno.' },
        { icone: 'refresh',   nome: 'Rematrícula', desc: 'Antecipa a renovação antes do vencimento.' },
      ],
    },

    // Item 9 — duas colunas lado a lado
    resolveVsComVoce: {
      eyebrow: 'O que é e o que resolve',
      titulo: 'A IA resolve sozinha. O time faz com você.',
      sozinho: {
        titulo: 'A IA resolve sozinha',
        itens: [
          'Responde na hora, 24/7, no WhatsApp',
          'Qualifica cada lead pelo objetivo',
          'Agenda a aula experimental',
          'Faz o follow-up de quem sumiu',
          'Registra a origem de cada contato',
          'Organiza o funil no kanban',
          'Comunicação em escala pela API oficial da Meta',
        ],
      },
      comVoce: {
        titulo: 'O que fazemos com você',
        itens: [
          'Desenho do funil e das filas de atendimento',
          'Treino da IA com a linguagem da sua escola',
          'Integração com o seu EVO',
          'Migração da plataforma que você usa hoje',
          'Acompanhamento nas primeiras semanas',
        ],
      },
    },

    // Item 9 — bloco com selo de integração
    evo: {
      eyebrow: 'Para quem usa EVO',
      titulo: 'O que muda para quem já roda no EVO',
      selo: 'Integração nativa com o EVO',
      itens: [
        { t: 'Sem digitação dupla', d: 'Cadastro, agenda e cobrança conversam com o WhatsApp.' },
        { t: 'Lead vira aluno direto', d: 'O contato qualificado entra no EVO sem retrabalho.' },
        { t: 'A IA sabe quem é quem', d: 'Distingue aluno ativo, ex-aluno e lead novo.' },
        { t: 'Status em tempo real', d: 'Pagamento e presença puxados automaticamente.' },
      ],
    },

    // ---- Planos (item 7) — SEM seletor de prazo. Um preço por cartão. ----
    planos: {
      eyebrow: 'Planos',
      titulo: 'Sem fidelidade. Preço único. Cancele quando quiser.',
      migracao: {
        texto: 'Já usa outra plataforma? A implantação com migração custa R$ 1.000 a mais.',
        href: '#migracao',
      },
      cards: [
        {
          id: 'essencial',
          nome: 'Essencial',
          subtitulo: 'para escolas de uma unidade',
          preco: 'R$ 597', periodo: '/mês',
          semFidelidade: 'Sem fidelidade. Cancele quando quiser.',
          implantacao: '+ R$ 1.900 de implantação, uma única vez',
          destaque: false,
          itensTitulo: null,
          itens: [
            '1 unidade',
            'Até 2 números de WhatsApp',
            'As 7 IAs do ciclo do aluno',
            'Kanban de leads com a etapa visível',
            'Etiquetas e filtro da base',
            'Registro de origem de cada contato',
            'Painel de controle de atendimento',
            'Comunicação em escala pela API oficial da Meta',
            'Integração nativa com o EVO',
            'No ar em 30 minutos',
            'Plataforma de treinamento em vídeo e IA de suporte no WhatsApp',
          ],
          cta: { label: 'Testar grátis por 7 dias', evento: 'clique_teste_gratis', plano: 'essencial' },
        },
        {
          id: 'escola',
          nome: 'Escola',
          subtitulo: 'para escolas com mais de um endereço',
          preco: 'R$ 997', periodo: '/mês',
          semFidelidade: 'Sem fidelidade. Cancele quando quiser.',
          implantacao: '+ R$ 2.900 de implantação, uma única vez',
          destaque: true,
          selo: 'Mais escolhido',
          itensTitulo: 'Tudo do Essencial, e mais:',
          itens: [
            'Até 2 unidades',
            'Até 4 números de WhatsApp — um oficial e um secundário por unidade',
            'Visão consolidada entre as unidades',
          ],
          cta: { label: 'Testar grátis por 7 dias', evento: 'clique_teste_gratis', plano: 'escola' },
        },
        {
          id: 'rede',
          nome: 'Rede',
          subtitulo: 'para redes com três unidades ou mais',
          preco: 'A partir de R$ 1.347', periodo: '/mês',
          semFidelidade: 'R$ 1.347 para 3 unidades, mais R$ 350 por unidade adicional',
          implantacao: '+ R$ 3.800 de implantação, mais R$ 900 por unidade adicional',
          destaque: false,
          itensTitulo: 'Tudo do Escola, e mais:',
          itens: [
            '3 unidades ou mais',
            '2 números de WhatsApp por unidade',
            'IA configurada por unidade',
            'Painel unificado',
          ],
          cta: { label: 'Falar com a gente', evento: 'clique_contato', plano: 'rede' },
          // Calculadora (7.2). Válida de 3 a 6 unidades; acima disso, "Falar com a gente".
          calc: {
            base: 1347, porUnidade: 350,
            implBase: 3800, implPorUnidade: 900,
            min: 3, max: 6,
          },
        },
      ],
    },

    // ---- Faixa da condição de lançamento (7.4 / item 8) ------------------
    // O contador é editável SEM deploy: mude os números em `vagas` abaixo.
    // Quando fundador.restantes chega a 0, a faixa vira automaticamente Pioneiro.
    vagas: {
      fundador: { total: 20, restantes: 20 },
      pioneiro: { total: 40, restantes: 40 },
    },
    faixaLancamento: {
      prazo: 'Válido até 31 de outubro de 2026',
      cta: { label: 'Quero minha vaga', evento: 'clique_vaga', plano: 'fundador' },
      fundador: {
        titulo: 'Condição de lançamento — Fundador',
        destaque: 'Implantação grátis — você não paga nada de entrada',
        beneficios: ['Preço travado enquanto for cliente', 'Garantia de 30 dias', 'Sem fidelidade'],
        contador: 'de {TOTAL} vagas restantes',
      },
      pioneiro: {
        titulo: 'Condição de lançamento — Pioneiro',
        destaque: 'Implantação pela metade',
        beneficios: ['Preço travado por 12 meses', 'Sem fidelidade'],
        contador: 'de {TOTAL} vagas restantes',
      },
      esgotado: {
        titulo: 'Condição de lançamento',
        destaque: 'As vagas de lançamento acabaram',
        beneficios: ['Fale com a gente para conhecer as condições atuais'],
        contador: '',
      },
    },

    // Item 9 — bloco de destaque, garantia por extenso
    garantia: {
      eyebrow: 'Garantia',
      titulo: 'Garantia de 30 dias, escrita por extenso',
      texto: 'Se em 30 dias o Assist não estiver rodando na sua operação do jeito que combinamos, devolvemos o valor da implantação. Sem letra miúda, sem fidelidade, sem pegadinha.',
    },

    ctaFinal: {
      titulo: 'Pronto para tirar a sua escola da fila?',
      subtitulo: 'Comece o teste grátis hoje ou fale com a gente sobre a sua rede.',
      ctaPrimario:   { label: 'Testar grátis por 7 dias', evento: 'clique_teste_gratis', plano: 'essencial' },
      ctaSecundario: { label: 'Falar com a gente',        evento: 'clique_contato',       plano: 'rede' },
    },
  },

  /* ====================================================================== */
  /*  PÁGINA DE CAMPANHA  /ein   (item 6)                                    */
  /* ====================================================================== */
  ein: {
    selo: 'WasFit Assist · EIN 2026',

    // Encontro Internacional de Natação (vemproein.com.br) — contador e blocos de evento.
    evento: {
      nome: 'Encontro Internacional de Natação',
      sigla: 'EIN 2026',
      // Data/hora de início (horário de Brasília). Contador regressivo aponta para cá.
      inicioISO: '2026-10-15T09:00:00-03:00',          // TROCAR se o horário de abertura mudar
      dias: '15, 16 e 17 de outubro de 2026',
      local: 'Centro de Convenções Senac Santo Amaro · São Paulo',
      estande: 'Estande WasFit',                       // TROCAR: nº / pavilhão do estande
      site: 'https://vemproein.com.br',
      cta: { label: 'Ver o Assist ao vivo no EIN', evento: 'clique_evento' },
    },

    hero: {
      titulo: ['A inteligência que', 'mergulha na sua operação.'],
      subtitulo: 'IA + WhatsApp treinada na linguagem da natação, por uma escola credenciada na Metodologia Gustavo Borges. Responde, entende, organiza e converte — 24/7.',
      chips: ['Responde', 'Entende', 'Organiza', 'Converte'],
      cta: { label: 'Quero minha vaga', evento: 'clique_vaga', plano: 'fundador' },
    },

    demo: {
      eyebrow: 'Demonstração',
      titulo: 'Do primeiro "oi" à matrícula',
      texto: 'Veja a IA conduzir uma conversa real de natação: contexto, argumento e próximo passo.',
      youtubeId: '',                                   // TROCAR
      mp4: '',
      evento: 'viu_demo',
    },

    // Conversa real anonimizada (deck "Prova real"). Vira um mock de chat animado.
    conversa: {
      eyebrow: 'Prova real',
      titulo: ['Não é promessa.', 'É a IA respondendo de verdade.'],
      subtitulo: 'Conversa real de um lead de natação, atendida pela IA do WasFit. Sem edição no conteúdo — nome e telefone anonimizados por privacidade.',
      contato: 'Consultora aquática · online',
      mensagens: [
        { de: 'lead', t: 'oi, é da escola de natação?' },
        { de: 'lead', t: 'meu filho é novo aqui em Serra, ele ainda não sabe nadar' },
        { de: 'lead', t: 'quero que ele aprenda pra ter um esporte' },
        { de: 'ia', t: 'Perfeito, Amaury! Aqui a gente oferece um ambiente seguro e acolhedor, ideal pro seu filho aprender a nadar do jeitinho que ele merece.' },
        { de: 'ia', t: 'Seguimos a Metodologia Gustavo Borges, criada pelo medalhista olímpico: as turmas são organizadas por nível de habilidade, o que garante evolução rápida e segura.' },
        { de: 'ia', t: 'Qual o principal motivo de começar a natação agora — alguma meta ou preocupação com o desenvolvimento dele?' },
        { de: 'lead', t: 'aprender a nadar e autossalvamento' },
        { de: 'ia', t: 'Isso é fundamental. Quer que eu já deixe agendada uma aula experimental pra ele conhecer a piscina e a professora?' },
      ],
      stats: [
        { n: '100%', l: 'respostas sem edição' },
        { n: 'MGB', l: 'vocabulário da metodologia' },
        { n: '24/7', l: 'na conversa real' },
      ],
    },
    problema: {
      eyebrow: 'O problema',
      titulo: ['O lead chega.', 'E a matrícula some.'],
      subtitulo: 'Enquanto sua equipe cuida do presencial, a oportunidade fica esperando no WhatsApp.',
      cards: [
        { n: '01', t: 'Demora',        d: 'O responsável procura outra escola.' },
        { n: '02', t: 'Sem follow-up', d: 'O "vou pensar" desaparece.' },
        { n: '03', t: 'Sem controle',  d: 'Ninguém sabe onde o lead parou.' },
      ],
      remate: 'Dinheiro ficando na mesa.',
    },
    confianca: {
      eyebrow: 'Por que confiar',
      titulo: ['Não nasceu numa startup.', 'Nasceu na piscina.'],
      texto: 'Tecnologia construída por quem já viveu a dor da recepção, da venda e da retenção. O Assist foi testado onde a operação trava — antes de chegar ao mercado.',
      stats: [
        { n: '11', l: 'anos de operação fitness na prática' },
        { n: '4', l: 'unidades' },
        { n: '+1 ano', l: 'de teste real' },
        { n: '100%', l: 'fitness' },
      ],
    },
    aquatica: {
      eyebrow: 'Especialização aquática',
      titulo: ['Uma IA genérica responde.', 'O Assist entende.'],
      subtitulo: 'Natação tem uma linguagem própria. Ela já faz parte do vocabulário da IA — desde o primeiro dia.',
      vocabulario: ['Idade', 'Nível', 'Touca', 'Avaliação', 'Experimental', 'Adaptação', 'Reposição', 'Rematrícula', 'Autossalvamento', 'Hidroginástica'],
    },

    // Conexão com a Metodologia Gustavo Borges (cores/mascotes autorizados pelo cliente).
    // NÃO chamar a WasFit de "estabelecimento credenciado" — a IA é TREINADA na metodologia.
    metodologia: {
      eyebrow: 'Metodologia Gustavo Borges',
      titulo: ['A IA foi treinada', 'na metodologia certa.'],
      texto: 'O WasFit é feito por quem opera escolas na Metodologia Gustavo Borges — do maior medalhista olímpico brasileiro da natação. A IA fala a língua dessa metodologia desde o primeiro dia: turmas por nível, progressão segura e a experiência que a família espera, dentro e fora da água.',
      pilares: [
        { t: 'Nível', d: 'Turmas organizadas por habilidade, não por idade solta.' },
        { t: 'Segurança', d: 'Progressão que respeita o tempo de cada aluno.' },
        { t: 'Evolução', d: 'Marcos claros — a família enxerga o avanço.' },
        { t: 'Experiência', d: 'Técnica com acolhimento, dentro e fora da água.' },
      ],
    },

    // Kanban visual — mini board animado (deck "Como funciona na prática").
    kanban: {
      eyebrow: 'Como funciona na prática',
      titulo: ['Do primeiro contato à matrícula,', 'tudo num só lugar.'],
      subtitulo: 'Sua equipe vê, em tempo real, onde cada lead está. A IA cuida do repetitivo enquanto o time fecha.',
      colunas: [
        { nome: 'Interessado', cor: 'teal', cards: [
          { nome: 'Ana P.', nota: 'Perguntou sobre turma de 4 anos' },
          { nome: 'Carlos M.', nota: 'Veio do Instagram, quer hidro' },
        ]},
        { nome: 'Aula marcada', cor: 'amber', cards: [
          { nome: 'Júlia R.', nota: 'IA agendou a experimental do filho' },
          { nome: 'Marcos T.', nota: 'Follow-up enviado' },
        ]},
        { nome: 'Proposta enviada', cor: 'lime', cards: [
          { nome: 'Fernanda L.', nota: 'Negociando plano família' },
        ]},
        { nome: 'Matrícula fechada', cor: 'white', cards: [
          { nome: 'Beatriz S.', nota: '2 filhos matriculados' },
        ]},
      ],
      // card que "viaja" pelas colunas ao rolar a seção
      fluxo: { nome: 'Rafael D.', trajeto: ['Perguntou por WhatsApp às 22h', 'IA agendou experimental', 'Proposta enviada pela IA', 'Matriculado — sem fila'] },
    },

    // Autodiagnóstico interativo (deck "Checklist").
    diagnostico: {
      eyebrow: 'Autodiagnóstico',
      titulo: ['Sua escola de natação', 'está pronta para automatizar?'],
      perguntas: [
        'Você sabe de onde vêm seus leads hoje?',
        'Sua equipe registra todos os contatos em um só lugar?',
        'Alguém faz follow-up de forma sistemática?',
        'Você tem fluxo ativo de rematrícula e reposição?',
        'Seu WhatsApp responde à noite e no fim de semana, quando as famílias pesquisam?',
      ],
      // resultado por nº de "Não" — 3 faixas: 0-1 / 2-3 / 4-5
      resultados: [
        { max: 1, titulo: 'Sua escola já está no caminho certo.', texto: 'Você tem uma base organizada — o Assist entra pra tirar o repetitivo do seu time e responder mais rápido do que hoje.' },
        // [DADO FICTÍCIO] no plano: "...representa algumas matrículas por mês" — recolocar quando houver número real de matrículas perdidas/mês.
        { max: 3, titulo: 'Você está perdendo matrícula sem perceber.', texto: 'Alguns leads estão escapando pela falta de resposta rápida ou de follow-up. É exatamente onde o Assist entra.' },
        { max: 5, titulo: 'Sua escola está deixando dinheiro na mesa todo mês.', texto: 'Sem resposta rápida, sem follow-up e sem controle de onde o lead está, a maior parte da perda de matrícula acontece antes mesmo de alguém da equipe saber que o lead existiu.' },
      ],
      cta: { label: 'Ver os planos', evento: 'viu_planos' },
    },
    incluido: {
      eyebrow: 'O que está incluído',
      titulo: 'Automação que atende como gente',
      itens: [
        { n: '1', t: 'IA no WhatsApp', d: 'Qualifica, responde e agenda.' },
        { n: '2', t: 'Kanban visual', d: 'Organiza cada etapa do lead.' },
        { n: '3', t: 'Conexão WhatsApp flexível', d: 'API oficial, não oficial ou as duas juntas.' },
        { n: '4', t: 'Integração EVO', d: 'Conecta cadastro, agenda e cobrança.' },
        { n: '5', t: 'As 7 IAs do ciclo do aluno', d: 'Da recepção à rematrícula.' },
        { n: '6', t: 'Comunicação em escala', d: 'Pela API oficial da Meta.' },
      ],
    },
    transformacao: {
      eyebrow: 'A transformação',
      titulo: ['Menos fila.', 'Mais matrícula.'],
      subtitulo: 'A tecnologia assume a repetição. A equipe recupera tempo para acolher e fechar.',
      sem: { titulo: 'Sem Assist', itens: ['Fila de conversas', 'Lead esquecido', 'Resposta genérica', 'Gestão no escuro'] },
      com: { titulo: 'Com Assist', itens: ['Resposta imediata', 'Follow-up ativo', 'Argumento contextual', 'Funil visível'] },
    },
    ctaFinal: {
      selo: 'Lançamento EIN 2026',
      titulo: ['Sua escola pode vender', 'enquanto você dorme.'],
      subtitulo: 'Atendimento 24/7 com a inteligência do seu negócio e o acolhimento que cada família espera.',
      cta: { label: 'Quero minha vaga', evento: 'clique_vaga', plano: 'fundador' },
    },
  },

  /* ---- Rodapé --------------------------------------------------------------- */
  footer: {
    tagline: 'IA + WhatsApp para escolas de natação e academias.',
    colunas: [
      { titulo: 'Produto', links: [
        { label: 'Como funciona', href: '/#como-funciona' },
        { label: 'As 7 IAs',      href: '/#ias' },
        { label: 'Planos',        href: '/#planos' },
        { label: 'Garantia',      href: '/#garantia' },
      ]},
      { titulo: 'Campanha', links: [
        { label: 'EIN 2026',            href: '/ein/' },
        { label: 'Condição de lançamento', href: '/#lancamento' },
      ]},
      { titulo: 'Legal', links: [
        { label: 'Política de privacidade', href: '/privacidade/' },
        { label: 'Termos de uso',           href: '/termos/' },
      ]},
    ],
    copyright: '© ' + new Date().getFullYear() + ' WasFit. Todos os direitos reservados.',
  },
};
