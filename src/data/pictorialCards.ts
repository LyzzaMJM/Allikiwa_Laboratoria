import { PictorialPrompt } from '../types';

export const PICTORIAL_CARDS: PictorialPrompt[] = [
  {
    id: 'salud',
    iconName: 'HeartPulse',
    category: 'salud',
    color: '#ba1a1a', // Error / Health red
    bgGradient: 'from-rose-50 to-orange-50 border-rose-200',
    quechua: {
      title: 'Hampi Wasi / Nanay',
      phonetic: '[ham-pi wa-si / na-nay]',
      spokenPrompt: 'Hampi wasimanta rimasun. ¿Imaynam kachkanki? ¿Maypitaq nanasunki?',
      phrase: 'Umaymi nanawan, rupariypas kachkanmi.',
      translation: 'Me duele la cabeza y tengo fiebre. Necesito atención médica.'
    },
    aimara: {
      title: 'Qullaña Uta / Usuta',
      phonetic: '[qull-a-ña u-ta / u-su-ta]',
      spokenPrompt: 'Qullaña utxat aruskipañani. ¿Kunjamastasa? ¿Kawkirus ususkta?',
      phrase: 'P\'iqiw usutu, junt\'uptatätwa.',
      translation: 'Me duele la cabeza y tengo calentura. Necesito médico.'
    },
    castellano: {
      title: 'Salud / Posta Médica',
      phonetic: '[sa-lud / pos-ta me-di-ca]',
      spokenPrompt: 'Hablemos de salud. ¿Cómo te sientes? ¿Dónde te duele?',
      phrase: 'Tengo dolor de cabeza y fiebre, necesito consultar al médico.',
      translation: 'Consulta sobre síntomas, medicamentos y citas de salud.'
    }
  },
  {
    id: 'chacra',
    iconName: 'Sprout',
    category: 'chacra',
    color: '#3ca21d', // Growth green
    bgGradient: 'from-emerald-50 to-lime-50 border-emerald-200',
    quechua: {
      title: 'Chacra / Tarpuy',
      phonetic: '[chak-ra / tar-puy]',
      spokenPrompt: 'Chacramanta rimasun. ¿Imaynam tarpuy kachkan? ¿Para chayamunchu?',
      phrase: 'Kunan killapi saratawan papata tarpusunchik.',
      translation: 'En este mes sembraremos el maíz y la papa comunal.'
    },
    aimara: {
      title: 'Yapu / Sataña',
      phonetic: '[ya-pu / sa-ta-ña]',
      spokenPrompt: 'Yapu satat aruskipañani. ¿Kunapachasa jallux jutani?',
      phrase: 'Jichha phaxsina ch\'uqi tunkuru satxañani.',
      translation: 'Este mes realizaremos la siembra de la papa en la parcela.'
    },
    castellano: {
      title: 'Campo y Siembra',
      phonetic: '[cam-po y siem-bra]',
      spokenPrompt: 'Hablemos del campo y las cosechas. ¿Cómo va la siembra?',
      phrase: 'Organizamos el riego y la preparación del terreno para sembrar.',
      translation: 'Preguntas y acuerdos sobre riego, lluvia y cultivos agrícolas.'
    }
  },
  {
    id: 'ayllu',
    iconName: 'Users',
    category: 'ayllu',
    color: '#2a3691', // Deep Indigo
    bgGradient: 'from-indigo-50 to-blue-50 border-indigo-200',
    quechua: {
      title: 'Ayllu / Huñunakuy',
      phonetic: '[ay-llu / hu-ñu-na-kuy]',
      spokenPrompt: 'Ayllunchikmanta rimasun. ¿Ima horataq huñunakuy kanqa?',
      phrase: 'Llapallanchik huñunakusunchik faenapi llankanapaq.',
      translation: 'Nos reuniremos todos para trabajar en la faena comunal.'
    },
    aimara: {
      title: 'Jaqi Masi / Tantachawi',
      phonetic: '[ja-qi ma-si / tan-ta-cha-wi]',
      spokenPrompt: 'Ayllu tantachawit aruskipañani. ¿Kunapachasa jaqinaka irnaqapxani?',
      phrase: 'Taqpachaniw tantachasipxañani uta lurañataki.',
      translation: 'Nos congregaremos todos en asamblea para los trabajos comunales.'
    },
    castellano: {
      title: 'Comunidad y Asamblea',
      phonetic: '[co-mu-ni-dad]',
      spokenPrompt: 'Hablemos de la comunidad. ¿A qué hora es la asamblea comunal?',
      phrase: 'Todos nos reunimos para coordinar la faena comunal y acuerdos del pueblo.',
      translation: 'Acuerdos de asamblea, directiva comunal y trabajo cooperativo.'
    }
  },
  {
    id: 'qhatu',
    iconName: 'ShoppingBag',
    category: 'qhatu',
    color: '#f27a21', // Sun Orange
    bgGradient: 'from-amber-50 to-orange-50 border-amber-200',
    quechua: {
      title: 'Qhatu / Rantiy',
      phonetic: '[qha-tu / ran-tiy]',
      spokenPrompt: 'Qhatumanta rimasun. ¿Haykatataq rantikunki? ¿Chalankichu?',
      phrase: '¿Haykapaqtaq kay chaki aycha kachkan?',
      translation: '¿A cuánto está el kilo de charqui y la arroba de chuño?'
    },
    aimara: {
      title: 'Qhatu / Alaqaña',
      phonetic: '[qha-tu / a-la-qa-ña]',
      spokenPrompt: 'Qhatuñat aruskipañani. ¿Qawqhasa ch\'uñu alasiña?',
      phrase: '¿Qawqharusa aka ch\'arki churasma?',
      translation: '¿A cuánto vendes este charqui y la quinua cosechada?'
    },
    castellano: {
      title: 'Mercado y Trueque',
      phonetic: '[mer-ca-do y true-que]',
      spokenPrompt: 'Hablemos de compras y ventas en la feria o mercado local.',
      phrase: '¿A cuánto está el precio de la arroba de papa nativa y granos?',
      translation: 'Comercio justo, trueque de productos de puna y valle, pesos y medidas.'
    }
  },
  {
    id: 'auxilio',
    iconName: 'ShieldAlert',
    category: 'auxilio',
    color: '#9a4600', // Terracotta warm
    bgGradient: 'from-orange-100 to-red-50 border-orange-300',
    quechua: {
      title: 'Yanapay / Auxilio',
      phonetic: '[ya-na-pay / au-xi-lio]',
      spokenPrompt: 'Yanapakuymanta rimasun. ¡Ama manchakuychu! ¿Ima sasachakuymi kachkan?',
      phrase: '¡Ama hina kaychu, utqayman yanapawayku!',
      translation: '¡Por favor, necesitamos auxilio y apoyo urgente aquí!'
    },
    aimara: {
      title: 'Yanapt\'awi / Jikxataña',
      phonetic: '[ya-nap-t\'a-wi]',
      spokenPrompt: 'Yanapt\'awit aruskipañani. ¡Jani axsaramti! ¿Kunas pachat juti?',
      phrase: '¡Jilatanaka, jank\'akiw yanapapxita!',
      translation: '¡Hermanos, por favor vengan pronto a apoyarnos en la emergencia!'
    },
    castellano: {
      title: 'Auxilio y Emergencia',
      phonetic: '[au-xi-lio ur-gen-te]',
      spokenPrompt: 'Canal de auxilio inmediato. Mantén la calma, te escuchamos.',
      phrase: '¡Por favor, necesitamos ayuda urgente para trasladar a un hermano herido!',
      translation: 'Alerta médica, caminos bloqueados por huayco, o rescate urgente.'
    }
  },
  {
    id: 'familia',
    iconName: 'Home',
    category: 'familia',
    color: '#b43f1d', // Ancestral terracotta
    bgGradient: 'from-stone-50 to-orange-50 border-stone-200',
    quechua: {
      title: 'Wasi / Ayllu Kawsay',
      phonetic: '[wa-si / ayl-lu kaw-say]',
      spokenPrompt: 'Wasi kawsaymanta rimasun. ¿Wawakuna allillanchu kachkanku?',
      phrase: 'Wawaykunaqa allin mikhusqam puririchkanku.',
      translation: 'Nuestros hijos están creciendo sanos y alimentados con nuestra tierra.'
    },
    aimara: {
      title: 'Uta / Wila Masi',
      phonetic: '[u-ta / wi-la ma-si]',
      spokenPrompt: 'Uta kawkisat aruskipañani. ¿Wawanakax sumat qullatanakakiti?',
      phrase: 'Wawanakasax walikiskiwa, sumañaniwa.',
      translation: 'Nuestra familia está bien, compartiendo el sustento de la casa.'
    },
    castellano: {
      title: 'Familia y Hogar',
      phonetic: '[fa-mi-lia y ho-gar]',
      spokenPrompt: 'Hablemos de la familia, los abuelos y la crianza de los niños.',
      phrase: 'Conversamos sobre el bienestar de los mayores y la crianza en el hogar.',
      translation: 'Alimentación nutritiva, cuidado de ancianos y memoria de los abuelos.'
    }
  }
];
