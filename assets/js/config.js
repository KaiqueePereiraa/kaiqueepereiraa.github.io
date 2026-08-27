/* ============================================================================
   WasFit — Conteúdo do site  (parametrizável, sem build)
   ----------------------------------------------------------------------------
   Edite este arquivo e suba de novo. Nenhuma compilação é necessária.
   Procure por  "TROCAR"  para achar o que depende do Felipe / da operação.
   A home (12 blocos) segue o "Documento Único Final" (27/08/2026).
   O site é só a HOME + /servicos/ — a antiga /ein foi removida.
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
    titulo: 'WasFit — a IA de WhatsApp que fala a língua da sua escola de natação',
    descricao: 'Criada por quem opera quatro unidades há onze anos. Touca, nível, experimental, reposição, rematrícula. No ar em 30 minutos. Integração nativa com o EVO. API oficial da Meta.',
    // URL ABSOLUTA, imagem >= 1200x630, < 300 KB.
    imagem: 'https://wasfit.com.br/assets/img/og-cover.png',
  },

  /* ====================================================================== */
  /*  PÁGINA INICIAL                                                         */
  /* ====================================================================== */
  home: {
    nav: [
      { label: 'As IAs',       href: '#ias' },
      { label: 'Planos',       href: '#planos' },
      { label: 'Implantação',  href: '#implantacao' },
      { label: 'Perguntas',    href: '#faq' },
    ],

    // BLOCO 1 — Hero. Headline A da spec comercial (25/08/2026).
    hero: {
      selo: 'API oficial ou não oficial da Meta — você escolhe · Integração nativa com o EVO',
      titulo: ['A IA de WhatsApp que fala a', 'língua da sua escola de natação'],
      subtitulo: 'Touca, nível, experimental, reposição, rematrícula. Criada por quem opera quatro unidades há onze anos — e no ar em 30 minutos.',
      ctaPrimario: { label: 'Testar grátis por 7 dias', evento: 'clique_teste_gratis', plano: 'essencial' },
      raioX:       { label: 'Ou peça um raio-x da sua escola em 15 minutos', evento: 'clique_raiox', plano: 'rede' },
    },

    // Vídeo de 45 s. Acima da dobra no desktop, abaixo da subheadline no celular.
    demo: {
      titulo: 'Demonstração · 45 segundos',
      // Coloque o ID do YouTube OU um caminho .mp4 local. Vazio = mostra só o poster.
      youtubeId: '',                                   // TROCAR ex.: 'dQw4w9WgXcQ'
      mp4: '',                                         // ou 'assets/video/demo.mp4'
      evento: 'viu_demo',
    },

    // BLOCO 2 — O problema
    problema: {
      titulo: 'O que acontece hoje quando alguém manda mensagem para a sua escola no domingo à noite?',
      cards: [
        'A mensagem fica esperando até segunda. Quando alguém responde, o pai já falou com outra escola.',
        'Alguém pergunta o preço, some no meio da conversa, e ninguém percebe que sumiu.',
        'No fim do mês, você não sabe quantas pessoas procuraram a escola e não fecharam.',
      ],
      remate: 'Nenhum desses três é problema de esforço da sua equipe. É problema de não ter quem esteja acordado às onze da noite e quem registre tudo.',
    },

    // BLOCO 3 — As IAs do ciclo do aluno (10). Etiqueta: quando cada uma entra.
    ias: {
      eyebrow: 'As IAs do ciclo do aluno',
      titulo: 'Uma IA especialista para cada momento do aluno',
      subtitulo: 'Cada uma cuida de um momento do aluno. Todas incluídas em qualquer plano.',
      itens: [
        { nome: 'Atendimento', desc: 'Responde qualquer pessoa, a qualquer hora, no vocabulário da sua escola.', etiqueta: 'No ar no primeiro dia' },
        { nome: 'Vendas', desc: 'Qualifica o interessado, apresenta os planos e agenda a experimental no horário que tem vaga.', etiqueta: 'No ar no primeiro dia' },
        { nome: 'Após cadastro de oportunidade', desc: 'Assim que a oportunidade entra no seu EVO, o contato já começa — sem esperar alguém puxar.', etiqueta: 'No ar no primeiro dia' },
        { nome: 'Rematrícula / matrícula', desc: 'Recebe quem acabou de fechar contrato ou rematricular com uma mensagem de boas-vindas.', etiqueta: 'No ar no primeiro dia' },
        { nome: 'Sem presença', desc: 'Percebe quem some das aulas por 7 dias e entra em contato antes que vire desistência.', etiqueta: 'No ar no primeiro dia' },
        { nome: 'Feliz aniversário ativo', desc: 'Parabeniza o aluno ativo na data, sem ninguém precisar lembrar.', etiqueta: 'No ar no primeiro dia' },
        { nome: 'Feliz aniversário inativo', desc: 'Também lembra do aluno que já saiu — mantendo a porta aberta.', etiqueta: 'No ar no primeiro dia' },
        { nome: 'Cobrança', desc: 'Cobra quem está em atraso, com o tom certo — insistindo o quanto for preciso.', etiqueta: 'Depois de conferir a sua base' },
        { nome: 'Após vencimento do contrato', desc: 'Quando o contrato encerra, já chama o cliente para renovar — sem deixar o silêncio virar perda.', etiqueta: 'Depois de conferir a sua base' },
        { nome: 'Cancelamento automático', desc: 'Quando o contrato é cancelado por inadimplência, avisa o cliente da pendência e dos próximos passos.', etiqueta: 'Depois de conferir a sua base' },
      ],
      porqueEsperam: {
        titulo: 'Por que três delas esperam',
        texto: 'Cobrança, aviso de vencimento e cancelamento por inadimplência mexem com dinheiro e com contrato. Uma cobrança disparada para quem já pagou, ou um aviso de pendência com o dado errado, não é um erro de sistema na cabeça do seu cliente — é a sua escola fazendo papel ruim. Por isso a gente confere os seus dados antes de ligar essas três. Se estiver tudo certo, elas entram na quarta semana.',
      },
    },

    // BLOCO 4 — Resolve × depende de estratégia
    resolveVsEstrategia: {
      titulo: 'O que ela resolve sozinha, e o que depende de estratégia',
      subtitulo: 'Ferramenta nenhuma conserta operação. Esta é a parte que quase ninguém escreve no site.',
      sozinha: {
        titulo: 'Resolve sozinha',
        itens: [
          'Ninguém fica sem resposta, a qualquer hora',
          'Nenhum contato se perde no meio da conversa',
          'Os dados do aluno entram certos, no ato',
          'Você sabe de onde veio cada contato',
          'Você consegue filtrar quem te procurou e não fechou',
          'Você vê em que etapa cada lead parou',
        ],
      },
      estrategia: {
        titulo: 'Depende de estratégia',
        itens: [
          'Dar continuidade ao lead que a IA qualificou',
          'Fazer campanha que dá resultado, e não só disparo',
          'Definir o que oferecer para quem quer cancelar',
          'Ler o que os seus números estão dizendo',
          'Manter a sua base de dados confiável',
        ],
      },
      remate: 'A primeira coluna está inclusa no plano. A segunda a gente faz com você, ou te ensina a fazer — e você decide se quer.',
      link: { label: 'Ver o que fazemos com você', href: '#' },   // TROCAR: /servicos/ quando a página existir
    },

    // BLOCO 5 — Fala a língua da natação
    linguaNatacao: {
      eyebrow: 'Fala a língua da natação',
      titulo: 'Ela não foi adaptada para natação. Ela nasceu dentro de uma.',
      texto: 'A nossa IA sabe o que é troca de touca, o que é nível, o que é aula experimental, o que é reposição e o que é rematrícula. Não porque alguém escreveu isso num manual — porque ela foi treinada dentro de escolas de natação em operação, desde o primeiro dia de desenvolvimento.',
      // Aprovação MGB concedida — citar a metodologia nominalmente.
      mgb: 'Treinada na Metodologia Gustavo Borges, desde o primeiro dia.',
    },

    // BLOCO 6 — Para quem usa EVO
    evo: {
      eyebrow: 'Para quem usa EVO',
      titulo: 'Se a sua escola usa EVO, ela faz mais',
      selo: 'Integração nativa com o EVO',
      itens: [
        'Cria o cadastro do aluno direto no EVO',
        'Agenda a aula na grade, no horário que tem vaga',
        'Dispara a cobrança a partir do que está no sistema',
        'Lê a situação do aluno antes de responder',
      ],
      remate: 'E se a sua escola não usa EVO, tudo o que está nesta página continua funcionando igual.',
    },

    // BLOCO 7 — Quem construiu
    quemConstruiu: {
      eyebrow: 'Quem construiu',
      titulo: 'Construímos para as nossas quatro unidades antes de vender para a sua',
      texto: 'São onze anos operando academia e natação. O WasFit nasceu porque a gente precisava resolver o próprio problema: lead perdido no fim de semana, recepção afogada no sábado de matrícula, aluno que some e ninguém percebe. Rodou mais de um ano dentro da nossa operação antes de a gente abrir para o mercado.',
    },

    // BLOCO 8 — Planos. SEM seletor de prazo. Um preço por cartão. Rede = "Falar com a gente".
    planos: {
      eyebrow: 'Planos',
      titulo: 'Sem fidelidade. Preço único. Cancele quando quiser.',
      // 8.3 — linha de migração que aparece em TODOS os cartões, abaixo da implantação.
      migracaoCard: 'Já usa outra plataforma? A implantação com migração custa R$ 1.000 a mais.',
      // Linha abaixo da grade dos três cartões.
      rodape: { texto: 'Precisa de mais do que a ferramenta?', link: 'Ver o que fazemos com você →', href: '#' },
      cards: [
        {
          id: 'essencial',
          nome: 'Essencial',
          subtitulo: 'Para escolas de uma unidade',
          preco: 'R$ 597', periodo: '/mês',
          semFidelidade: 'Sem fidelidade. Cancele quando quiser.',
          implantacao: '+ R$ 1.900 de implantação, uma única vez',
          destaque: false,
          itensTitulo: null,
          itens: [
            '1 unidade',
            'Até 2 números de WhatsApp',
            'Todas as IAs do ciclo do aluno',
            'Kanban de leads com a etapa visível',
            'Etiquetas e filtro da base',
            'Registro de origem de cada contato',
            'Painel de controle de atendimento',
            'Conexão por API oficial ou não oficial da Meta — você escolhe, ou usa as duas ao mesmo tempo',
            'Integração nativa com o EVO',
            'No ar em 30 minutos',
            'Plataforma de treinamento em vídeo e IA de suporte no WhatsApp',
          ],
          cta: { label: 'Testar grátis por 7 dias', evento: 'clique_teste_gratis', plano: 'essencial' },
        },
        {
          id: 'escola',
          nome: 'Escola',
          subtitulo: 'Para escolas com mais de um endereço',
          preco: 'R$ 997', periodo: '/mês',
          semFidelidade: 'Sem fidelidade. Cancele quando quiser.',
          implantacao: '+ R$ 2.900 de implantação, uma única vez',
          destaque: true,        // cartão do meio recebe o destaque visual. SEM selo.
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
          subtitulo: 'Para redes com três unidades ou mais',
          preco: 'A partir de R$ 1.347', periodo: '/mês',
          precoDetalhe: 'R$ 1.347 para 3 unidades, mais R$ 350 por unidade adicional.',
          semFidelidade: 'Sem fidelidade. Cancele quando quiser.',
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
          // 8.4 — Calculadora. mensalidade = 1.347 + 350/un. acima de 3. Implantação = 3.800 + 900/un.
          // 1 ou 2 unidades => "o plano é o Escola". Acima de 6 => "Falar com a gente".
          calc: {
            base: 1347, porUnidade: 350,
            implBase: 3800, implPorUnidade: 900,
            min: 3, max: 6,
          },
        },
      ],
    },

    // ---- BLOCO 8.1 / 8.2 — Faixa da condição de lançamento ---------------
    // O contador é editável SEM deploy: mude os números em `vagas` abaixo.
    // Quando fundador.restantes chega a 0, a faixa vira automaticamente Pioneiro
    // (sem garantia de 30 dias) e o BLOCO 10 perde a coluna da garantia.
    vagas: {
      fundador: { total: 20, restantes: 20 },
      pioneiro: { total: 40, restantes: 40 },
    },
    faixaLancamento: {
      prazo: 'Válido até 31 de outubro de 2026',
      cta: { label: 'Quero minha vaga', evento: 'clique_vaga', plano: 'fundador' },
      fundador: {
        titulo: 'Implantação grátis para as 20 primeiras escolas',
        destaque: 'Você entra sem pagar nada de entrada. A implantação, com o treinamento da sua recepção, é por nossa conta.',
        beneficios: ['Preço travado enquanto você for cliente', 'Garantia de 30 dias', 'Sem fidelidade'],
        contador: 'Restam {X} das {TOTAL} vagas',
      },
      pioneiro: {
        titulo: 'Implantação pela metade',
        destaque: 'As 20 vagas de fundador acabaram. A condição de pioneiro vale até 31 de outubro.',
        beneficios: ['Preço travado por 12 meses', 'Sem fidelidade'],
        contador: 'Restam {X} das {TOTAL} vagas',
      },
      esgotado: {
        titulo: 'Condição de lançamento',
        destaque: 'As vagas de lançamento acabaram.',
        beneficios: ['Fale com a gente para conhecer as condições atuais'],
        contador: '',
      },
    },

    // BLOCO 9 — Como funciona a implantação
    implantacao: {
      eyebrow: 'Como funciona a implantação',
      titulo: 'O que acontece nas suas primeiras quatro semanas',
      subtitulo: 'Implantação não é uma taxa. É o que faz a sua equipe usar de verdade.',
      marcos: [
        { marco: 'Dia 1', titulo: 'Ativação', texto: '60 minutos. Conectamos o número e ligamos as quatro primeiras IAs. Você sai com a IA respondendo.' },
        { marco: 'Semana 1', titulo: 'Ajuste fino', texto: 'Lemos as conversas reais todo dia e corrigimos o que saiu fora. Seu tempo: nenhum.' },
        { marco: 'Semana 2', titulo: 'O seu funil', texto: 'Montamos o Kanban com as etapas da sua escola e treinamos o ponto focal.' },
        { marco: 'Semana 3', titulo: 'Treinamento da recepção', texto: 'Três horas com a sua equipe. É a parte que decide se a ferramenta vai ser usada.' },
        { marco: 'Semana 4', titulo: 'As três IAs que faltam', texto: 'Conferimos os seus dados e ligamos cobrança, aviso de vencimento e cancelamento.' },
      ],
      remate: [
        'Total do seu tempo nas quatro semanas: cerca de 5 horas.',
        'Já usa outra plataforma? A gente leva a sua base, as suas etiquetas, o seu histórico e o seu número. Você não começa do zero.',
      ],
    },

    // BLOCO 10 — Sem fidelidade e garantia. A coluna da garantia some quando as
    // 20 vagas de fundador acabam (main.js -> data-garantia-col).
    trust: [
      { titulo: 'Sem fidelidade', texto: 'Não tem contrato de permanência. Você cancela no mês que quiser, sem multa.' },
      { titulo: 'Garantia de 30 dias', texto: 'Nas 20 primeiras escolas: se em 30 dias não servir, devolvemos a mensalidade. Uma mensagem no WhatsApp, sem formulário.', somenteFundador: true },
      { titulo: 'Preço travado', texto: 'O seu preço não sobe enquanto você for cliente.' },
    ],

    // BLOCO 11 — Perguntas frequentes (acordeão, todas fechadas por padrão)
    faq: [
      { q: 'Preciso trocar o meu número de WhatsApp?', a: 'Não. O número que os seus alunos já têm salvo continua o mesmo. Você escolhe como ele é atendido: pela conexão oficial da Meta, pela não oficial, ou pelas duas ao mesmo tempo — o que fizer mais sentido pra sua operação.' },
      { q: 'E se eu já uso outra plataforma?', a: 'A migração é nossa. Levamos a sua base, as suas etiquetas, o seu histórico e o seu número, e você aprova o mapeamento por escrito antes de qualquer coisa ser ligada. A implantação com migração custa R$ 1.000 a mais.' },
      { q: 'Minha escola não usa EVO. Funciona?', a: 'Funciona igual. A integração com o EVO acrescenta coisas, mas nada do que está nesta página depende dela.' },
      { q: 'A IA vai falar errado com o meu aluno?', a: 'Na primeira semana a gente lê todas as conversas e ajusta o que sair fora do esperado. E as IAs que mexem com dinheiro só entram depois de conferirmos os seus dados — justamente para não cobrar quem já pagou.' },
      { q: 'Isso substitui a minha recepção?', a: 'Não. A IA cuida do repetitivo e entrega o interessado qualificado. Quem acolhe, conduz e fecha continua sendo a sua equipe — com mais tempo para isso.' },
      { q: 'Quanto tempo até estar funcionando?', a: 'A IA começa a responder no mesmo dia da ativação, que leva cerca de 30 minutos. As quatro semanas seguintes são para ela responder bem e para a sua equipe saber usar.' },
      { q: 'Posso cancelar quando quiser?', a: 'Pode, no mês que quiser, sem multa. Não existe contrato de permanência.' },
    ],

    // BLOCO 12 — Chamada final. Duas portas: testar ou pedir o raio-x.
    ctaFinal: {
      titulo: 'Duas formas de começar',
      portas: [
        { titulo: 'Teste grátis por 7 dias', texto: 'Sem cartão. Em 30 minutos a sua IA está respondendo.', cta: { label: 'Começar agora', evento: 'clique_teste_gratis', plano: 'essencial' } },
        { titulo: 'Peça um raio-x da sua escola', texto: '15 minutos por vídeo. A gente olha o seu atendimento e te mostra onde está vazando. Cortesia.', cta: { label: 'Agendar meu raio-x', evento: 'clique_raiox', plano: 'rede' } },
      ],
    },
  },


  /* ---- Rodapé --------------------------------------------------------------- */
  footer: {
    tagline: 'IA de WhatsApp para escolas de natação, criada dentro de uma.',
    colunas: [
      { titulo: 'Produto', links: [
        { label: 'As IAs',                href: '/#ias' },
        { label: 'Planos',                href: '/#planos' },
        { label: 'Implantação',           href: '/#implantacao' },
        { label: 'Garantia',              href: '/#garantia' },
        { label: 'Perguntas frequentes',  href: '/#faq' },
        { label: 'Serviços',              href: '/servicos/' },
      ]},
    ],
    copyright: '© ' + new Date().getFullYear() + ' WasFit. Todos os direitos reservados.',
  },
};
