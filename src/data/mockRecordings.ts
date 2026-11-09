import { RecordingItem } from '../types';

export const INITIAL_RECORDINGS: RecordingItem[] = [
  {
    id: 'rec-001',
    title: 'Testimonio de Salud Materna y Plantas Medicinales',
    description: 'Diálogo entre partera tradicional y promotor de salud rural en la microcuenca de Cangallo.',
    date: '12 de Octubre, 2026',
    community: 'Comunidad Campesina Huancapi, Ayacucho',
    duration: '02:45',
    durationSeconds: 165,
    language: 'Bilingüe Quechua-Castellano',
    informant: 'Mama Tomasa Quispe Huamán (72 años)',
    transcriber: 'Lic. Wilfredo Cárdenas (Lingüista Comunitario)',
    tags: ['Salud', 'Quechua Chanka', 'Medicina Ancestral', 'Parto'],
    segments: [
      {
        id: 's-1',
        timestamp: '00:04',
        seconds: 4,
        speaker: 'Mama Tomasa Quispe',
        role: 'hablante',
        originalText: 'Allillanchu waway. Ñuqaykuqa unaymantañam muñatawan sasawita timpuchispa unquq warmikunata upyachiniku.',
        translatedText: 'Buenos días, hijo. Nosotros desde siempre hacemos hervir la muña con el sasawi y se lo damos de beber a las madres gestantes.',
        phonetics: '[a-ʎi-ʎan-t͡ʃu wa-way | ɲu-qaj-ku-qa u-naj-man-ta-ɲam mu-ɲa-ta-wan sa-sa-wi-ta tim-pu-t͡ʃis-pa un-quq war-mi-ku-na-ta up-ja-t͡ʃi-ni-ku]',
        culturalNote: 'La muña (Minthostachys mollis) y el sasawi son digestivos y calientan el vientre antes y después del alumbramiento.',
        linguisticTag: 'Chanka'
      },
      {
        id: 's-2',
        timestamp: '00:28',
        seconds: 28,
        speaker: 'Lic. Wilfredo Cárdenas',
        role: 'promotor',
        originalText: 'Chay hampi upyasqankutaqa, ¿posta médicapi doctor yachanchu?',
        translatedText: '¿El médico de la posta de salud conoce sobre estos mates medicinales que toman?',
        phonetics: '[t͡ʃaj ham-pi up-jas-qan-ku-ta-qa | pos-ta me-di-ca-pi dok-tor ja-t͡ʃan-t͡ʃu]',
        culturalNote: 'Interculturalidad en salud: necesidad de articular la sabiduría de las parteras con la posta médica.',
        linguisticTag: 'Fonética'
      },
      {
        id: 's-3',
        timestamp: '00:46',
        seconds: 46,
        speaker: 'Mama Tomasa Quispe',
        role: 'hablante',
        originalText: 'Arí, obstetra mamachamanmi willaniku. Paykunapas allin kachkan ninkum, chiri wayramanta jark\'awanchik.',
        translatedText: 'Sí, le contamos a la licenciada obstetra. Ellas también dicen que está bien, pues nos protege del viento frío de la puna.',
        phonetics: '[a-ɾi | obs-te-tɾa ma-ma-t͡ʃa-man-mi wi-ʎa-ni-ku | paj-ku-na-pas a-ʎin kat͡ʃ-kan nin-kum | t͡ʃi-ɾi waj-ɾa-man-ta jar-k\'a-wan-t͡ʃik]',
        culturalNote: 'Concepto de frío/calor (chiri/rupha) en la cosmovisión andina para el equilibrio del cuerpo.',
        linguisticTag: 'Chanka'
      },
      {
        id: 's-4',
        timestamp: '01:15',
        seconds: 75,
        speaker: 'Mama Tomasa Quispe',
        role: 'hablante',
        originalText: 'Chaymi mañakuyku ambulancia chayamunanpaq pachanpi, chaynapi llapa warmakuna allin paqarinanpaq.',
        translatedText: 'Por eso pedimos que la ambulancia llegue a tiempo cuando hay una emergencia, para que los niños nazcan sanos.',
        phonetics: '[t͡ʃaj-mi ma-ɲa-kuj-ku am-bu-lan-sja t͡ʃa-ja-mu-nan-paq pa-t͡ʃan-pi | t͡ʃaj-na-pi ʎa-pa war-ma-ku-na a-ʎin pa-qa-ɾi-nan-paq]',
        culturalNote: 'Petición comunal de transporte de emergencia rural con enfoque territorial.',
        linguisticTag: 'Chanka'
      }
    ]
  },
  {
    id: 'rec-002',
    title: 'Acta y Testimonio sobre Riego Tecnificado y Cosecha',
    description: 'Registro fonético de la asamblea de autoridades originarias en las orillas del Lago Wiñaymarka.',
    date: '28 de Septiembre, 2026',
    community: 'Comunidad Campesina Balsabe, Ilave - Puno',
    duration: '03:10',
    durationSeconds: 190,
    language: 'Aimara',
    informant: 'Tata Eloy Mamani Choque (Mallku de Agua, 65 años)',
    transcriber: 'Prof. Martha Condori (Especialista EIB Puno)',
    tags: ['Aimara', 'Agricultura', 'Yapu', 'Agua Comunal'],
    segments: [
      {
        id: 's-201',
        timestamp: '00:05',
        seconds: 5,
        speaker: 'Tata Eloy Mamani',
        role: 'comunero',
        originalText: 'Kamisaraki jilatanaka, kullakanaka. Uma sut\'iñatax taqpachanitakiw wakisi, jani khitis jaljtañapäkitu.',
        translatedText: 'Saludos cordiales hermanos y hermanas. La distribución clara del agua nos concierne a todos, nadie debe quedar excluido.',
        phonetics: '[ka-mi-sa-ra-ki xi-la-ta-na-ka ku-ʎa-ka-na-ka | u-ma su-t\'i-ɲa-tax taq-pa-t͡ʃa-ni-ta-kiw wa-ki-si]',
        culturalNote: 'El agua (uma) como ser viviente sagrado que vincula la crianza de la vida en el Altiplano.',
        linguisticTag: 'Aimara Central'
      },
      {
        id: 's-202',
        timestamp: '00:34',
        seconds: 34,
        speaker: 'Kullaka Rosa Quispe',
        role: 'hablante',
        originalText: 'Aka ch\'uqi yapuchatanakaxa sumaw achuña munaspa, ukata qullina satapxañani.',
        translatedText: 'Nuestros sembríos de papa nativa necesitan buen abono natural para producir bien en esta temporada.',
        phonetics: '[a-ka t͡ʃ\'u-qi ja-pu-t͡ʃa-ta-na-ka-xa su-maw a-t͡ʃu-ɲa mu-nas-pa | u-ka-ta qul-li-na sa-tap-xa-ɲa-ni]',
        culturalNote: 'La papa (ch\'uqi) y las variedades resistentes a heladas (luki, imilla, k\'hati).',
        linguisticTag: 'Lupaca'
      },
      {
        id: 's-203',
        timestamp: '01:05',
        seconds: 65,
        speaker: 'Tata Eloy Mamani',
        role: 'comunero',
        originalText: 'Jallalla ayllusataki! Jiwasax qala lurañampi uma tantachañani, jichhurunx chacha-warmi irnaqañani.',
        translatedText: '¡Viva nuestra comunidad! Nosotros con piedras reforzaremos los canales de agua; hoy trabajaremos en dualidad comunitaria.',
        phonetics: '[xa-ʎa-ʎa aj-ʎu-sa-ta-ki | xi-wa-sax qa-la lu-ra-ɲam-pi u-ma tan-ta-t͡ʃa-ɲa-ni | xit͡ʃ-hu-runx t͡ʃa-t͡ʃa war-mi ir-na-qa-ɲa-ni]',
        culturalNote: 'Chacha-warmi: principio andino de complementariedad y paridad de género en el trabajo colectivo.',
        linguisticTag: 'Aimara Central'
      }
    ]
  },
  {
    id: 'rec-003',
    title: 'Relato Oral: El Zorro y el Cóndor (Atoqmanta Kunturmantawan)',
    description: 'Narración oral tradicional en Quechua Chanka recopilada para preservación escolar y fonética.',
    date: '04 de Noviembre, 2026',
    community: 'Comunidad de Sarhua, Ayacucho',
    duration: '02:15',
    durationSeconds: 135,
    language: 'Quechua Chanka',
    informant: 'Don Cipriano Palomino (Narrador de Tradición Oral, 78 años)',
    transcriber: 'Allikiwa Laboratorio de Fonética Originaria',
    tags: ['Narrativa', 'Quechua Chanka', 'Literatura Oral', 'Escuela'],
    segments: [
      {
        id: 's-301',
        timestamp: '00:03',
        seconds: 3,
        speaker: 'Don Cipriano Palomino',
        role: 'hablante',
        originalText: 'Huk punchawsi atoqqa hanay pacha fiestaman riyta munasqa. Chaysi kunturta mañakusqa:',
        translatedText: 'Dicen que un día el zorro quiso subir a la fiesta del mundo de arriba (Hanaq Pacha). Por eso le rogó al cóndor:',
        phonetics: '[huk pun-t͡ʃaw-si a-toq-qa ha-naj pa-t͡ʃa fjes-ta-man rij-ta mu-nas-qa | t͡ʃaj-si kun-tur-ta ma-ɲa-kus-qa]',
        culturalNote: 'El Hanaq Pacha (mundo superior) en los relatos orales andinos alberga fiestas donde abundan las semillas originarias.',
        linguisticTag: 'Chanka'
      },
      {
        id: 's-302',
        timestamp: '00:22',
        seconds: 22,
        speaker: 'Don Cipriano Palomino',
        role: 'hablante',
        originalText: '—"¡Kuntur taytay, apaway ari raprallaykipi!" nispan rogakusqa. Kunturtas chaskisqa.',
        translatedText: '—"¡Señor cóndor, llévame por favor en tus alas!" suplicó. Y el cóndor aceptó llevarlo.',
        phonetics: '[kun-tur taj-taj | a-pa-waj a-ɾi ɾap-ra-ʎaj-ki-pi nis-pan ro-ga-kus-qa | kun-tur-tas t͡ʃas-kis-qa]',
        culturalNote: 'El sufijo afectivo y enfático "-lla" y "-ri" en Quechua suavizan el ruego demostrando máximo respeto.',
        linguisticTag: 'Chanka'
      },
      {
        id: 's-303',
        timestamp: '00:48',
        seconds: 48,
        speaker: 'Don Cipriano Palomino',
        role: 'hablante',
        originalText: 'Chaymantaqa hanay pachapi mikhunakunata wiksan hunt\'ata mikhuruspan, waskamanta suchururqa.',
        translatedText: 'Luego, tras comer hasta saciarse de granos sagrados en el cielo, al descender por una cuerda resbaló y cayó a la tierra.',
        phonetics: '[t͡ʃaj-man-ta-qa ha-naj pa-t͡ʃa-pi mik-hu-na-ku-na-ta wik-san hunt\'-a-ta mik-hu-rus-pan was-ka-man-ta su-t͡ʃu-rur-qa]',
        culturalNote: 'Explicación mítica del origen de las semillas alimenticias en los valles andinos.',
        linguisticTag: 'Chanka'
      }
    ]
  }
];
