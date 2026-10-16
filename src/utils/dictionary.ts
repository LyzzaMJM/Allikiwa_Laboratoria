// ---------------------------------------------------------------------------
// Allikiwa – Diccionario bilingüe offline (Español → Quechua Chanka / Aimara)
// ---------------------------------------------------------------------------

export interface DictEntry {
  chanka: string;
  aimara: string;
  phonChanka: string;
  phonAimara: string;
  note: string;
}

export interface PhraseEntry {
  es: string;
  chanka: string;
  aimara: string;
  phonChanka: string;
  phonAimara: string;
  note: string;
}

// ---------------------------------------------------------------------------
// FRASES COMPLETAS – Se buscan antes que palabra por palabra
// ---------------------------------------------------------------------------
export const phrases: PhraseEntry[] = [
  // Saludos
  { es: 'buenos dias', chanka: 'Allin punchaw', aimara: 'Aski uru', phonChanka: 'a-yín pun-chaw', phonAimara: 'as-ki u-ru', note: '"Allin punchaw" es el saludo matutino andino, deseando un buen día bajo la luz del Inti.' },
  { es: 'buenas tardes', chanka: 'Allin tardi', aimara: 'Aski jayp\'u', phonChanka: 'a-yín tar-di', phonAimara: 'as-ki jayp-u', note: 'En las tardes andinas, el saludo expresa gratitud por las horas de trabajo y cosecha.' },
  { es: 'buenas noches', chanka: 'Allin tuta', aimara: 'Aski aruma', phonChanka: 'a-yín tu-ta', phonAimara: 'as-ki a-ru-ma', note: '"Allin tuta" es el saludo nocturno. La noche en los Andes es tiempo de descanso y espiritualidad.' },
  { es: 'como estas', chanka: 'Imaynallan kashanki', aimara: 'Kamisaraki', phonChanka: 'i-may-na-llan ka-shan-ki', phonAimara: 'ka-mi-sa-ra-ki', note: '"Imaynallan" pregunta por el estado integral de la persona, cuerpo y espíritu.' },
  { es: 'como estas hermano', chanka: 'Imaynallan kashanki wawqillay', aimara: 'Kamisaraki jilata', phonChanka: 'i-may-na-llan ka-shan-ki waw-ki-llay', phonAimara: 'ka-mi-sa-ra-ki ji-la-ta', note: 'Preguntar por un hermano expresa la reciprocidad fundamental de la cultura andina.' },
  { es: 'estoy bien', chanka: 'Allillanmi kashani', aimara: 'Walikiwa', phonChanka: 'a-yi-llan-mi ka-sha-ni', phonAimara: 'wa-li-ki-wa', note: '"Allillanmi" es la respuesta de bienestar. El sufijo "-mi" le da certeza a la afirmación.' },
  { es: 'muchas gracias', chanka: 'Ancha sulpayki', aimara: 'Yuspagara', phonChanka: 'an-cha sul-pay-ki', phonAimara: 'yus-pa-ga-ra', note: '"Ancha sulpayki" expresa gratitud profunda. "Ancha" intensifica el agradecimiento.' },
  { es: 'por favor', chanka: 'Allichu', aimara: 'Mañasiway', phonChanka: 'a-yi-chu', phonAimara: 'ma-ña-si-way', note: 'La cortesía andina se manifiesta con respeto y dulzura en cada pedido.' },
  { es: 'hasta luego', chanka: 'Tupananchikkama', aimara: 'Jikisiñkama', phonChanka: 'tu-pa-nan-chik-ka-ma', phonAimara: 'ji-ki-si-ña-ka-ma', note: '"Tupananchikkama" significa "hasta que nos volvamos a encontrar", reflejando la esperanza andina.' },
  { es: 'hasta mañana', chanka: 'Paqarinkama', aimara: 'Qharürkama', phonChanka: 'pa-qa-rin-ka-ma', phonAimara: 'qha-rür-ka-ma', note: '"Paqarinkama" es despedirse con la promesa del amanecer siguiente.' },
  { es: 'nos vemos', chanka: 'Rikusinakusunchik', aimara: 'Uñjasipxañani', phonChanka: 'ri-ku-si-na-ku-sun-chik', phonAimara: 'uñ-ja-si-pxa-ña-ni', note: 'La despedida andina siempre implica el deseo de un reencuentro.' },
  { es: 'que tal', chanka: 'Imaynataq', aimara: 'Kamïsatasa', phonChanka: 'i-may-na-taq', phonAimara: 'ka-mï-sa-ta-sa', note: '"Imaynataq" es un saludo informal entre amigos o familiares cercanos.' },
  { es: 'buen dia', chanka: 'Allin punchaw', aimara: 'Aski uru', phonChanka: 'a-yín pun-chaw', phonAimara: 'as-ki u-ru', note: 'El saludo de buen día honra al Sol (Inti) que trae la luz a la comunidad.' },

  // Frases comunes
  { es: 'te quiero', chanka: 'Munakuyki', aimara: 'Munismawa', phonChanka: 'mu-na-ku-yki', phonAimara: 'mu-nis-ma-wa', note: '"Munakuyki" es una de las palabras más hermosas del quechua: amor puro y sincero.' },
  { es: 'te amo', chanka: 'Munakuyki', aimara: 'Munismawa', phonChanka: 'mu-na-ku-yki', phonAimara: 'mu-nis-ma-wa', note: '"Munakuyki" expresa tanto "te quiero" como "te amo". El amor andino no distingue grados.' },
  { es: 'mi corazon', chanka: 'Sunqullay', aimara: 'Chuymaxa', phonChanka: 'sun-qu-llay', phonAimara: 'chuy-ma-xa', note: '"Sunqu" es el corazón en quechua. El sufijo "-llay" le da cariño y ternura.' },
  { es: 'como te llamas', chanka: 'Imataq sutiyki', aimara: 'Kunasataki sutima', phonChanka: 'i-ma-taq su-ti-yki', phonAimara: 'ku-na-sa-ta-ki su-ti-ma', note: 'Preguntar el nombre es el primer paso para crear vínculo comunitario.' },
  { es: 'me llamo', chanka: 'Nuqapa sutiy', aimara: 'Nayan sutijawa', phonChanka: 'nu-qa-pa su-tiy', phonAimara: 'na-yan su-ti-ja-wa', note: '"Nuqa" es "yo" en quechua. Presentarse es abrir el corazón a la comunidad.' },
  { es: 'de donde eres', chanka: 'Maymantataq kanki', aimara: 'Kawkïnkatasa', phonChanka: 'may-man-ta-taq kan-ki', phonAimara: 'kaw-kïn-ka-ta-sa', note: 'El origen es fundamental en la identidad andina, cada pueblo tiene su propia riqueza.' },
  { es: 'yo soy', chanka: 'Nuqam kani', aimara: 'Nayawa', phonChanka: 'nu-qam ka-ni', phonAimara: 'na-ya-wa', note: '"Nuqam kani" es la afirmación de identidad. "-m" es el sufijo de certeza.' },
  { es: 'tengo hambre', chanka: 'Yarqashanmi', aimara: 'Manq\'asiñ muniwa', phonChanka: 'yar-qa-shan-mi', phonAimara: 'manq-a-si-ñ mu-ni-wa', note: 'El hambre en los Andes se expresa con respeto, pues la comida es un regalo de la Pachamama.' },
  { es: 'tengo sed', chanka: 'Chakishanmi', aimara: 'Umiri muniwa', phonChanka: 'cha-ki-shan-mi', phonAimara: 'u-mi-ri mu-ni-wa', note: '"Chaki" se relaciona con sequedad. El agua (yaku) es sagrada en la cosmovisión andina.' },
  { es: 'tengo frio', chanka: 'Chirishanmi', aimara: 'Thayawa', phonChanka: 'chi-ri-shan-mi', phonAimara: 'tha-ya-wa', note: 'El frío andino ("chiri") forma parte de la dualidad climática de las alturas.' },
  { es: 'hace frio', chanka: 'Chirimin', aimara: 'Thayawa', phonChanka: 'chi-ri-min', phonAimara: 'tha-ya-wa', note: 'El frío de las alturas es respetado como una fuerza natural de la Pachamama.' },
  { es: 'hace calor', chanka: 'Rupaymin', aimara: 'Lupiwa', phonChanka: 'ru-pay-min', phonAimara: 'lu-pi-wa', note: '"Rupay" es el calor del sol. En los Andes, el calor del Inti es vida y energía.' },
  { es: 'que hora es', chanka: 'Hayk\'ataq hora', aimara: 'Kuna horaraki', phonChanka: 'hayk-a-taq o-ra', phonAimara: 'ku-na o-ra-ra-ki', note: 'El concepto del tiempo en los Andes es cíclico, no lineal como en Occidente.' },
  { es: 'donde esta', chanka: 'Maypitaq', aimara: 'Kawkinkaraki', phonChanka: 'may-pi-taq', phonAimara: 'kaw-kin-ka-ra-ki', note: '"Maypi" pregunta por ubicación. En los Andes, el espacio es tan importante como el tiempo.' },
  { es: 'vamos a comer', chanka: 'Mikumusunchik', aimara: 'Manq\'añani', phonChanka: 'mi-ku-mu-sun-chik', phonAimara: 'manq-a-ña-ni', note: 'Comer juntos es el acto de comunidad más importante en la cultura andina.' },
  { es: 'quiero aprender', chanka: 'Yachayta munani', aimara: 'Yatiñ muniwa', phonChanka: 'ya-chay-ta mu-na-ni', phonAimara: 'ya-tiñ mu-ni-wa', note: '"Yachay" es el conocimiento sagrado. Aprender es crecer en sabiduría comunitaria.' },
  { es: 'no entiendo', chanka: 'Mana intindichikunichu', aimara: 'Janiwa amtasktti', phonChanka: 'ma-na in-tin-di-chi-ku-ni-chu', phonAimara: 'ja-ni-wa am-tasks-tti', note: '"Mana" es la negación en quechua. Admitir que no se entiende es señal de humildad.' },
  { es: 'si entiendo', chanka: 'Arí intindini', aimara: 'Jïsa amtasktwa', phonChanka: 'a-rí in-tin-di-ni', phonAimara: 'jï-sa am-tasks-twa', note: '"Arí" es "sí" en quechua. Entender es el primer paso del aprendizaje.' },
  { es: 'cuanto cuesta', chanka: 'Hayk\'ataq chaninri', aimara: 'Qhawqharaki chanipa', phonChanka: 'hayk-a-taq cha-nin-ri', phonAimara: 'qhaw-qha-ra-ki cha-ni-pa', note: 'El trueque fue la forma original de intercambio en los Andes antes del dinero.' },
  { es: 'que bonito', chanka: 'Ancha sumaq', aimara: 'Jach\'a sumawa', phonChanka: 'an-cha su-maq', phonAimara: 'jach-a su-ma-wa', note: '"Sumaq" expresa belleza total: visual, espiritual y emocional.' },
  { es: 'que lindo', chanka: 'Ancha sumaq', aimara: 'Jach\'a sumawa', phonChanka: 'an-cha su-maq', phonAimara: 'jach-a su-ma-wa', note: '"Sumaq" en quechua abarca lo lindo, lo hermoso y lo armonioso en un solo concepto.' },
  { es: 'buen provecho', chanka: 'Allin mikuy', aimara: 'Aski manq\'aña', phonChanka: 'a-yín mi-kuy', phonAimara: 'as-ki manq-a-ña', note: 'Desear buen provecho es compartir la bendición de la Pachamama.' },
  { es: 'feliz cumpleaños', chanka: 'Kusikuy punchawniykipi', aimara: 'Kusisiñ uruma', phonChanka: 'ku-si-kuy pun-chaw-niy-ki-pi', phonAimara: 'ku-si-siñ u-ru-ma', note: 'Las celebraciones andinas honran el ciclo de la vida y la conexión con la comunidad.' },
  { es: 'te extraño', chanka: 'Llakikuyki', aimara: 'Llakisismawa', phonChanka: 'lla-ki-ku-yki', phonAimara: 'lla-ki-sis-ma-wa', note: '"Llaki" es tristeza y añoranza. Extrañar a alguien es una expresión de amor profundo.' },
  { es: 'viva el peru', chanka: '¡Kawsachun Piruw!', aimara: '¡Kawsapan Perú!', phonChanka: 'kaw-sa-chun pi-ruw', phonAimara: 'kaw-sa-pan pe-rú', note: '"Kawsachun" significa "¡que viva!". El amor por el Perú se expresa en todas las lenguas.' },

  // Naturaleza
  { es: 'pachamama', chanka: 'Pachamama', aimara: 'Pachamama', phonChanka: 'pa-cha-ma-ma', phonAimara: 'pa-cha-ma-ma', note: 'La Pachamama es la madre tierra, la deidad más importante de la cosmovisión andina.' },
  { es: 'madre tierra', chanka: 'Pachamama', aimara: 'Pachamama', phonChanka: 'pa-cha-ma-ma', phonAimara: 'pa-cha-ma-ma', note: 'La Pachamama no es solo la tierra física, sino toda la naturaleza viva y sagrada.' },
  { es: 'arco iris', chanka: 'K\'uychi', aimara: 'Kurmi', phonChanka: 'kuy-chi', phonAimara: 'kur-mi', note: 'El arco iris ("K\'uychi") es un símbolo sagrado andino, representado en la wiphala.' },

  // Números compuestos
  { es: 'once', chanka: 'Chunka hukniyuq', aimara: 'Tunka mayani', phonChanka: 'chun-ka huk-ni-yuq', phonAimara: 'tun-ka ma-ya-ni', note: 'El sistema numérico andino es decimal, igual que el occidental.' },
  { es: 'doce', chanka: 'Chunka iskayniyuq', aimara: 'Tunka payani', phonChanka: 'chun-ka is-kay-ni-yuq', phonAimara: 'tun-ka pa-ya-ni', note: 'Los números se forman combinando la decena con la unidad.' },
  { es: 'veinte', chanka: 'Iskay chunka', aimara: 'Pä tunka', phonChanka: 'is-kay chun-ka', phonAimara: 'pä tun-ka', note: '"Iskay chunka" literalmente es "dos dieces".' },
  { es: 'cien', chanka: 'Pachak', aimara: 'Pataka', phonChanka: 'pa-chak', phonAimara: 'pa-ta-ka', note: '"Pachak" es cien. El sistema numérico quechua llega hasta millones.' },
  { es: 'mil', chanka: 'Waranqa', aimara: 'Waranqa', phonChanka: 'wa-ran-qa', phonAimara: 'wa-ran-qa', note: '"Waranqa" es mil, compartido entre quechua y aimara.' },
];

// ---------------------------------------------------------------------------
// DICCIONARIO DE PALABRAS INDIVIDUALES
// ---------------------------------------------------------------------------
export const dictionary: Record<string, DictEntry> = {
  // --- Saludos y cortesía ---
  hola: { chanka: 'Allillanchu', aimara: 'Kamisaraki', phonChanka: 'a-yi-llan-chu', phonAimara: 'ka-mi-sa-ra-ki', note: 'Saludo andino tradicional que expresa bienestar y armonía comunitaria.' },
  gracias: { chanka: 'Sulpayki', aimara: 'Yuspagara', phonChanka: 'sul-pay-ki', phonAimara: 'yus-pa-ga-ra', note: '"Sulpayki" es gratitud profunda. Viene de "sulpa", reconocimiento sincero.' },
  adios: { chanka: 'Tinkunakama', aimara: 'Jikisiñkama', phonChanka: 'tin-ku-na-ka-ma', phonAimara: 'ji-ki-si-ña-ka-ma', note: '"Tinkunakama" significa "hasta que nos volvamos a encontrar".' },
  bienvenido: { chanka: 'Allin hamusqa', aimara: 'Aski jutata', phonChanka: 'a-yín ha-mus-qa', phonAimara: 'as-ki ju-ta-ta', note: '"Allin hamusqa" es dar la bienvenida con el corazón abierto.' },
  perdon: { chanka: 'Pampachaway', aimara: 'Pampachita', phonChanka: 'pam-pa-cha-way', phonAimara: 'pam-pa-chi-ta', note: '"Pampachaway" literalmente pide que se perdone, como aplanar la tierra.' },
  disculpa: { chanka: 'Pampachaway', aimara: 'Pampachita', phonChanka: 'pam-pa-cha-way', phonAimara: 'pam-pa-chi-ta', note: 'Disculparse es un acto de humildad valorado en la cultura andina.' },

  // --- Afirmación / Negación ---
  si: { chanka: 'Arí', aimara: 'Jïsa', phonChanka: 'a-rí', phonAimara: 'jï-sa', note: '"Arí" es la afirmación en quechua, dicha con certeza y convicción.' },
  no: { chanka: 'Mana', aimara: 'Janiwa', phonChanka: 'ma-na', phonAimara: 'ja-ni-wa', note: '"Mana" es la negación en quechua. "Janiwa" en aimara es más enfático.' },
  tal: { chanka: 'vez', aimara: 'vez', phonChanka: 'ves', phonAimara: 'ves', note: '' }, // filler
  quizas: { chanka: 'Ichapas', aimara: 'Inas', phonChanka: 'i-cha-pas', phonAimara: 'i-nas', note: '"Ichapas" expresa posibilidad, la incertidumbre con apertura.' },

  // --- Familia ---
  familia: { chanka: 'Ayllu', aimara: 'Ayllu', phonChanka: 'ay-llu', phonAimara: 'ay-llu', note: '"Ayllu" es más que familia: es la comunidad extendida que se apoya mutuamente.' },
  madre: { chanka: 'Mama', aimara: 'Mama', phonChanka: 'ma-ma', phonAimara: 'ma-ma', note: '"Mama" es universal en los Andes. La madre es el centro de la familia.' },
  mama: { chanka: 'Mama', aimara: 'Mama', phonChanka: 'ma-ma', phonAimara: 'ma-ma', note: '"Mama" es la madre, centro del ayllu andino.' },
  padre: { chanka: 'Tayta', aimara: 'Awki', phonChanka: 'tay-ta', phonAimara: 'aw-ki', note: '"Tayta" expresa respeto profundo al padre.' },
  papa: { chanka: 'Tayta', aimara: 'Awki', phonChanka: 'tay-ta', phonAimara: 'aw-ki', note: '"Tayta" en quechua es padre. También "papa" es la papa, tubérculo sagrado andino.' },
  hermano: { chanka: 'Wawqi', aimara: 'Jilata', phonChanka: 'waw-qi', phonAimara: 'ji-la-ta', note: '"Wawqi" es hermano varón. "Jilata" en aimara es hermano mayor.' },
  hermana: { chanka: 'Ñaña', aimara: 'Kullaka', phonChanka: 'ña-ña', phonAimara: 'ku-lla-ka', note: '"Ñaña" es hermana entre mujeres. "Kullaka" es la hermana menor en aimara.' },
  hijo: { chanka: 'Churi', aimara: 'Yuqalla', phonChanka: 'chu-ri', phonAimara: 'yu-qa-lla', note: '"Churi" es el hijo varón del padre. El hijo es esperanza del ayllu.' },
  hija: { chanka: 'Ususi', aimara: 'Phuchhha', phonChanka: 'u-su-si', phonAimara: 'pu-chha', note: '"Ususi" es la hija de la madre. Cada hija lleva la sabiduría ancestral.' },
  abuelo: { chanka: 'Hatun tayta', aimara: 'Achachila', phonChanka: 'ha-tun tay-ta', phonAimara: 'a-cha-chi-la', note: '"Achachila" son los abuelos ancestrales, espíritus protectores de las montañas.' },
  abuela: { chanka: 'Hatun mama', aimara: 'Awicha', phonChanka: 'ha-tun ma-ma', phonAimara: 'a-wi-cha', note: '"Awicha" es la abuela sabia, guardiana de la tradición oral.' },
  esposo: { chanka: 'Qusa', aimara: 'Chacha', phonChanka: 'qu-sa', phonAimara: 'cha-cha', note: '"Qusa" es el esposo. El matrimonio andino es complemento de opuestos.' },
  esposa: { chanka: 'Warmi', aimara: 'Warmi', phonChanka: 'war-mi', phonAimara: 'war-mi', note: '"Warmi" es esposa y mujer. La mujer es complemento esencial del hombre.' },
  bebe: { chanka: 'Wawa', aimara: 'Wawa', phonChanka: 'wa-wa', phonAimara: 'wa-wa', note: '"Wawa" es el bebé, futuro de la comunidad andina.' },
  primo: { chanka: 'Kaka wawa', aimara: 'Lari wawa', phonChanka: 'ka-ka wa-wa', phonAimara: 'la-ri wa-wa', note: 'El primo es parte extendida del ayllu.' },
  tio: { chanka: 'Kaka', aimara: 'Lari', phonChanka: 'ka-ka', phonAimara: 'la-ri', note: '"Kaka" es el tío materno en quechua. La familia extendida es muy valorada.' },
  tia: { chanka: 'Ipa', aimara: 'Ipacha', phonChanka: 'i-pa', phonAimara: 'i-pa-cha', note: '"Ipa" es la tía. Las tías son segundas madres en el ayllu.' },

  // --- Personas y pronombres ---
  yo: { chanka: 'Ñuqa', aimara: 'Naya', phonChanka: 'ñu-qa', phonAimara: 'na-ya', note: '"Ñuqa" es el yo quechua. La identidad individual siempre se vive en comunidad.' },
  tu: { chanka: 'Qam', aimara: 'Juma', phonChanka: 'qam', phonAimara: 'ju-ma', note: '"Qam" es el "tú" en quechua, la segunda persona con quien compartes.' },
  el: { chanka: 'Pay', aimara: 'Jupa', phonChanka: 'pay', phonAimara: 'ju-pa', note: '"Pay" es "él/ella" en quechua. No distingue género.' },
  ella: { chanka: 'Pay', aimara: 'Jupa', phonChanka: 'pay', phonAimara: 'ju-pa', note: '"Pay" sirve para él y ella. El quechua no marca género en pronombres.' },
  nosotros: { chanka: 'Ñuqanchik', aimara: 'Nanaka', phonChanka: 'ñu-qan-chik', phonAimara: 'na-na-ka', note: '"Ñuqanchik" incluye al oyente. Es el "nosotros" inclusivo andino.' },
  ustedes: { chanka: 'Qamkuna', aimara: 'Jumanaka', phonChanka: 'qam-ku-na', phonAimara: 'ju-ma-na-ka', note: '"Qamkuna" es el plural de "tú".' },
  ellos: { chanka: 'Paykuna', aimara: 'Jupanaka', phonChanka: 'pay-ku-na', phonAimara: 'ju-pa-na-ka', note: '"Paykuna" es el plural de la tercera persona.' },
  persona: { chanka: 'Runa', aimara: 'Jaqi', phonChanka: 'ru-na', phonAimara: 'ja-qi', note: '"Runa" es la persona humana completa, con cuerpo, alma y vínculo comunitario.' },
  hombre: { chanka: 'Qari', aimara: 'Chacha', phonChanka: 'qa-ri', phonAimara: 'cha-cha', note: '"Qari" es el hombre. El varón andino es complemento de la mujer.' },
  mujer: { chanka: 'Warmi', aimara: 'Warmi', phonChanka: 'war-mi', phonAimara: 'war-mi', note: '"Warmi" es la mujer. Es complemento indispensable del hombre en la cosmovisión andina.' },
  niño: { chanka: 'Wawa', aimara: 'Wawa', phonChanka: 'wa-wa', phonAimara: 'wa-wa', note: '"Wawa" es el niño pequeño, futuro de la comunidad.' },
  niña: { chanka: 'Warmi wawa', aimara: 'Warmi wawa', phonChanka: 'war-mi wa-wa', phonAimara: 'war-mi wa-wa', note: '"Warmi wawa" es la niña, la pequeña mujer del ayllu.' },
  amigo: { chanka: 'Masiy', aimara: 'Masija', phonChanka: 'ma-siy', phonAimara: 'ma-si-ja', note: '"Masiy" es el compañero y amigo. "Masi" significa "par, igual".' },
  amiga: { chanka: 'Masiy', aimara: 'Masija', phonChanka: 'ma-siy', phonAimara: 'ma-si-ja', note: '"Masiy" no distingue género, el amigo/a es un igual.' },
  pueblo: { chanka: 'Llaqta', aimara: 'Marka', phonChanka: 'llaq-ta', phonAimara: 'mar-ka', note: '"Llaqta" es el pueblo, el lugar donde vive la comunidad.' },

  // --- Naturaleza ---
  agua: { chanka: 'Yaku', aimara: 'Uma', phonChanka: 'ya-ku', phonAimara: 'u-ma', note: 'El agua es vida sagrada en la cosmovisión andina. "Yaku" es madre y fuente de todo.' },
  tierra: { chanka: 'Allpa', aimara: 'Uraqi', phonChanka: 'all-pa', phonAimara: 'u-ra-qi', note: '"Allpa" es la tierra fértil donde se siembra. Es regalo de la Pachamama.' },
  sol: { chanka: 'Inti', aimara: 'Inti', phonChanka: 'in-ti', phonAimara: 'in-ti', note: '"Inti" es el dios Sol, padre celestial de los incas.' },
  luna: { chanka: 'Killa', aimara: 'Phaxsi', phonChanka: 'ki-lla', phonAimara: 'phax-si', note: '"Killa" es la Luna, madre celestial que guía las siembras.' },
  estrella: { chanka: 'Quyllur', aimara: 'Warawara', phonChanka: 'quy-llur', phonAimara: 'wa-ra-wa-ra', note: '"Quyllur" son las estrellas que guiaron a los ancestros.' },
  cielo: { chanka: 'Hanaq pacha', aimara: 'Alax pacha', phonChanka: 'ha-naq pa-cha', phonAimara: 'a-lax pa-cha', note: '"Hanaq pacha" es el mundo de arriba, donde habitan los dioses.' },
  nube: { chanka: 'Phuyu', aimara: 'Qinaya', phonChanka: 'phu-yu', phonAimara: 'qi-na-ya', note: '"Phuyu" es la nube que trae la lluvia bendita.' },
  lluvia: { chanka: 'Para', aimara: 'Jallu', phonChanka: 'pa-ra', phonAimara: 'ja-llu', note: '"Para" es la lluvia sagrada que fertiliza la tierra.' },
  viento: { chanka: 'Wayra', aimara: 'Thaya', phonChanka: 'way-ra', phonAimara: 'tha-ya', note: '"Wayra" es el viento andino, mensajero de los Apus.' },
  fuego: { chanka: 'Nina', aimara: 'Nina', phonChanka: 'ni-na', phonAimara: 'ni-na', note: '"Nina" es el fuego sagrado. Compartido entre quechua y aimara.' },
  rio: { chanka: 'Mayu', aimara: 'Jawira', phonChanka: 'ma-yu', phonAimara: 'ja-wi-ra', note: '"Mayu" es el río, vena de la Pachamama que da vida.' },
  lago: { chanka: 'Qucha', aimara: 'Quta', phonChanka: 'qu-cha', phonAimara: 'qu-ta', note: '"Qucha" es el lago. El Titicaca es el lago sagrado más importante.' },
  mar: { chanka: 'Mama qucha', aimara: 'Mama quta', phonChanka: 'ma-ma qu-cha', phonAimara: 'ma-ma qu-ta', note: '"Mama qucha" es literalmente "madre lago", el mar.' },
  montaña: { chanka: 'Urqu', aimara: 'Qullu', phonChanka: 'ur-qu', phonAimara: 'qu-llu', note: '"Urqu" es la montaña. Los Apus (montañas) son espíritus protectores.' },
  nieve: { chanka: 'Riti', aimara: 'Khunu', phonChanka: 'ri-ti', phonAimara: 'khu-nu', note: '"Riti" es la nieve sagrada de las cumbres andinas.' },
  piedra: { chanka: 'Rumi', aimara: 'Qala', phonChanka: 'ru-mi', phonAimara: 'qa-la', note: '"Rumi" es la piedra. Los incas eran maestros trabajando la piedra.' },
  arbol: { chanka: 'Sacha', aimara: 'Quqa', phonChanka: 'sa-cha', phonAimara: 'qu-qa', note: '"Sacha" es el árbol, hermano verde de la comunidad.' },
  flor: { chanka: 'T\'ika', aimara: 'Panqara', phonChanka: 'ti-ka', phonAimara: 'pan-qa-ra', note: '"T\'ika" es la flor. Las flores andinas adornan las fiestas y ofrendas.' },
  semilla: { chanka: 'Muyu', aimara: 'Jatha', phonChanka: 'mu-yu', phonAimara: 'ja-tha', note: '"Muyu" es la semilla, promesa de vida futura.' },
  campo: { chanka: 'Pampa', aimara: 'Pampa', phonChanka: 'pam-pa', phonAimara: 'pam-pa', note: '"Pampa" es la llanura, el campo abierto compartido entre ambas lenguas.' },
  camino: { chanka: 'Ñan', aimara: 'Thaki', phonChanka: 'ñan', phonAimara: 'tha-ki', note: '"Ñan" es el camino. El Qhapaq Ñan fue la red vial del Tahuantinsuyo.' },

  // --- Animales ---
  perro: { chanka: 'Allqu', aimara: 'Anu', phonChanka: 'all-qu', phonAimara: 'a-nu', note: '"Allqu" es el perro, compañero fiel del hombre andino.' },
  gato: { chanka: 'Michi', aimara: 'Phisi', phonChanka: 'mi-chi', phonAimara: 'phi-si', note: '"Michi" es el gato doméstico en quechua.' },
  llama: { chanka: 'Llama', aimara: 'Qawra', phonChanka: 'lla-ma', phonAimara: 'qaw-ra', note: '"Llama" es el camélido sagrado, compañero de carga y ceremonias.' },
  alpaca: { chanka: 'Paqocha', aimara: 'Allpachu', phonChanka: 'pa-qo-cha', phonAimara: 'all-pa-chu', note: '"Paqocha" es la alpaca, cuya fibra es oro de los Andes.' },
  condor: { chanka: 'Kuntur', aimara: 'Kunturi', phonChanka: 'kun-tur', phonAimara: 'kun-tu-ri', note: '"Kuntur" es el cóndor, mensajero del Hanaq Pacha (mundo de arriba).' },
  puma: { chanka: 'Puma', aimara: 'Puma', phonChanka: 'pu-ma', phonAimara: 'pu-ma', note: '"Puma" simboliza la fuerza y el poder del Kay Pacha (mundo terrenal).' },
  serpiente: { chanka: 'Amaru', aimara: 'Katari', phonChanka: 'a-ma-ru', phonAimara: 'ka-ta-ri', note: '"Amaru" es la serpiente, símbolo del Ukhu Pacha (mundo interior).' },
  pajaro: { chanka: 'Pisqu', aimara: 'Jamach\'i', phonChanka: 'pis-qu', phonAimara: 'ja-mach-i', note: '"Pisqu" es el pájaro. Los pájaros son mensajeros de los Apus.' },
  ave: { chanka: 'Pisqu', aimara: 'Jamach\'i', phonChanka: 'pis-qu', phonAimara: 'ja-mach-i', note: '"Pisqu" es el ave en general, símbolo de libertad andina.' },
  pez: { chanka: 'Challwa', aimara: 'Challwa', phonChanka: 'chall-wa', phonAimara: 'chall-wa', note: '"Challwa" es el pez, regalo de los ríos y lagos.' },
  vicuña: { chanka: 'Wik\'uña', aimara: 'Wik\'uña', phonChanka: 'wik-u-ña', phonAimara: 'wik-u-ña', note: '"Wik\'uña" es la vicuña, el animal más fino de los Andes.' },
  gallina: { chanka: 'Wallpa', aimara: 'Wallpa', phonChanka: 'wall-pa', phonAimara: 'wall-pa', note: '"Wallpa" es la gallina, parte de la vida cotidiana rural.' },
  cuy: { chanka: 'Quwi', aimara: 'Wank\'u', phonChanka: 'qu-wi', phonAimara: 'wank-u', note: '"Quwi" es el cuy, alimento sagrado y medicinal de los Andes.' },
  mariposa: { chanka: 'Pillpintu', aimara: 'Pilpintu', phonChanka: 'pill-pin-tu', phonAimara: 'pil-pin-tu', note: '"Pillpintu" es la mariposa, símbolo de transformación y belleza.' },

  // --- Cuerpo humano ---
  cabeza: { chanka: 'Uma', aimara: 'P\'iqi', phonChanka: 'u-ma', phonAimara: 'p\'i-qi', note: '"Uma" es la cabeza. Curiosamente, "uma" en aimara es agua.' },
  ojo: { chanka: 'Ñawi', aimara: 'Nayra', phonChanka: 'ña-wi', phonAimara: 'nay-ra', note: '"Ñawi" es el ojo, ventana del alma andina.' },
  ojos: { chanka: 'Ñawikuna', aimara: 'Nayranaka', phonChanka: 'ña-wi-ku-na', phonAimara: 'nay-ra-na-ka', note: '"Ñawikuna" es el plural de ojos. "-kuna" es el pluralizador quechua.' },
  mano: { chanka: 'Maki', aimara: 'Ampara', phonChanka: 'ma-ki', phonAimara: 'am-pa-ra', note: '"Maki" es la mano. Las manos andinas tejen, siembran y crean arte.' },
  corazon: { chanka: 'Sunqu', aimara: 'Chuyma', phonChanka: 'sun-qu', phonAimara: 'chuy-ma', note: '"Sunqu" es el corazón, centro de los sentimientos y la sabiduría.' },
  boca: { chanka: 'Simi', aimara: 'Laka', phonChanka: 'si-mi', phonAimara: 'la-ka', note: '"Simi" también significa "lengua/idioma". Runasimi = lengua del pueblo.' },
  pie: { chanka: 'Chaki', aimara: 'Kayuxa', phonChanka: 'cha-ki', phonAimara: 'ka-yu-xa', note: '"Chaki" es el pie. Caminar a pie era la forma de viajar por el Qhapaq Ñan.' },
  sangre: { chanka: 'Yawar', aimara: 'Wila', phonChanka: 'ya-war', phonAimara: 'wi-la', note: '"Yawar" es la sangre. La sangre une al ayllu y a la Pachamama.' },
  hueso: { chanka: 'Tullu', aimara: 'Ch\'akha', phonChanka: 'tu-llu', phonAimara: 'ch\'a-kha', note: '"Tullu" es el hueso, estructura que sostiene al cuerpo.' },

  // --- Comida y agricultura ---
  comida: { chanka: 'Mikuy', aimara: 'Manq\'a', phonChanka: 'mi-kuy', phonAimara: 'manq-a', note: 'Compartir la comida es un acto de comunidad y reciprocidad.' },
  maiz: { chanka: 'Sara', aimara: 'Tunqu', phonChanka: 'sa-ra', phonAimara: 'tun-qu', note: '"Sara" es el maíz, alimento sagrado de las civilizaciones andinas.' },
  quinua: { chanka: 'Kinwa', aimara: 'Jupha', phonChanka: 'kin-wa', phonAimara: 'ju-pha', note: '"Kinwa" es la quinua, el grano de oro de los Andes.' },
  carne: { chanka: 'Aycha', aimara: 'Aycha', phonChanka: 'ay-cha', phonAimara: 'ay-cha', note: '"Aycha" es la carne, alimento compartido en festividades.' },
  pan: { chanka: 'T\'anta', aimara: 'T\'ant\'a', phonChanka: 'tan-ta', phonAimara: 'tan-ta', note: '"T\'anta" es el pan. El pan andino se comparte en comunidad.' },
  sal: { chanka: 'Kachi', aimara: 'Jayu', phonChanka: 'ka-chi', phonAimara: 'ja-yu', note: '"Kachi" es la sal, recurso valioso en las Salinas de Maras.' },
  leche: { chanka: 'Ñuñu', aimara: 'Ñuñu', phonChanka: 'ñu-ñu', phonAimara: 'ñu-ñu', note: '"Ñuñu" es la leche, alimento primero de la vida.' },
  fruta: { chanka: 'Ruru', aimara: 'Achakana', phonChanka: 'ru-ru', phonAimara: 'a-cha-ka-na', note: '"Ruru" es la fruta, regalo dulce de los árboles.' },
  oca: { chanka: 'Uqa', aimara: 'Apilla', phonChanka: 'u-qa', phonAimara: 'a-pi-lla', note: '"Uqa" es la oca, tubérculo andino dulce y nutritivo.' },

  // --- Casa y objetos ---
  casa: { chanka: 'Wasi', aimara: 'Uta', phonChanka: 'wa-si', phonAimara: 'u-ta', note: '"Wasi" es el hogar, espacio sagrado de convivencia familiar.' },
  puerta: { chanka: 'Punku', aimara: 'Puncu', phonChanka: 'pun-ku', phonAimara: 'pun-cu', note: '"Punku" es la puerta, la entrada al hogar y a lo sagrado.' },
  ventana: { chanka: 'Tuqu', aimara: 'T\'ukhu', phonChanka: 'tu-qu', phonAimara: 'tu-khu', note: '"Tuqu" es la ventana, por donde entra la luz del Inti.' },
  mesa: { chanka: 'Misa', aimara: 'Misa', phonChanka: 'mi-sa', phonAimara: 'mi-sa', note: '"Misa" es la mesa. También se usa para la mesa ceremonial de ofrendas.' },
  ropa: { chanka: 'P\'acha', aimara: 'Isi', phonChanka: 'pa-cha', phonAimara: 'i-si', note: '"P\'acha" es la ropa. Los textiles andinos son arte y cultura viva.' },
  cama: { chanka: 'Puñuna', aimara: 'Ikiña', phonChanka: 'pu-ñu-na', phonAimara: 'i-ki-ña', note: '"Puñuna" es donde se duerme, el lugar de descanso.' },

  // --- Colores ---
  rojo: { chanka: 'Puka', aimara: 'Wila', phonChanka: 'pu-ka', phonAimara: 'wi-la', note: '"Puka" es el rojo, color de la sangre y la vida.' },
  blanco: { chanka: 'Yuraq', aimara: 'Janq\'u', phonChanka: 'yu-raq', phonAimara: 'janq-u', note: '"Yuraq" es el blanco, color de la pureza y la nieve.' },
  negro: { chanka: 'Yana', aimara: 'Ch\'iyara', phonChanka: 'ya-na', phonAimara: 'chi-ya-ra', note: '"Yana" es el negro. También significa "compañero" en otro contexto.' },
  azul: { chanka: 'Anqas', aimara: 'Larama', phonChanka: 'an-qas', phonAimara: 'la-ra-ma', note: '"Anqas" es el azul del cielo andino.' },
  verde: { chanka: 'Qumir', aimara: 'Ch\'uxña', phonChanka: 'qu-mir', phonAimara: 'chux-ña', note: '"Qumir" es el verde de los campos cultivados.' },
  amarillo: { chanka: 'Q\'illu', aimara: 'Q\'illu', phonChanka: 'qi-llu', phonAimara: 'qi-llu', note: '"Q\'illu" es el amarillo, color del sol y del maíz.' },

  // --- Números ---
  uno: { chanka: 'Huk', aimara: 'Maya', phonChanka: 'huk', phonAimara: 'ma-ya', note: '"Huk" es uno, la unidad primordial.' },
  dos: { chanka: 'Iskay', aimara: 'Paya', phonChanka: 'is-kay', phonAimara: 'pa-ya', note: '"Iskay" es dos. La dualidad es fundamental en la cosmovisión andina.' },
  tres: { chanka: 'Kinsa', aimara: 'Kimsa', phonChanka: 'kin-sa', phonAimara: 'kim-sa', note: '"Kinsa" es tres. Los tres mundos: Hanaq, Kay y Ukhu Pacha.' },
  cuatro: { chanka: 'Tawa', aimara: 'Pusi', phonChanka: 'ta-wa', phonAimara: 'pu-si', note: '"Tawa" es cuatro. Tahuantinsuyo = las cuatro regiones del imperio.' },
  cinco: { chanka: 'Pichqa', aimara: 'Phisqa', phonChanka: 'pich-qa', phonAimara: 'phis-qa', note: '"Pichqa" es cinco, una mano completa.' },
  seis: { chanka: 'Suqta', aimara: 'Suxta', phonChanka: 'suq-ta', phonAimara: 'sux-ta', note: '"Suqta" es seis.' },
  siete: { chanka: 'Qanchis', aimara: 'Paqallqu', phonChanka: 'qan-chis', phonAimara: 'pa-qall-qu', note: '"Qanchis" es siete.' },
  ocho: { chanka: 'Pusaq', aimara: 'Kimsaqallqu', phonChanka: 'pu-saq', phonAimara: 'kim-sa-qall-qu', note: '"Pusaq" es ocho.' },
  nueve: { chanka: 'Isqun', aimara: 'Llätunka', phonChanka: 'is-qun', phonAimara: 'llä-tun-ka', note: '"Isqun" es nueve.' },
  diez: { chanka: 'Chunka', aimara: 'Tunka', phonChanka: 'chun-ka', phonAimara: 'tun-ka', note: '"Chunka" es diez, base del sistema numérico andino.' },

  // --- Emociones y estados ---
  amor: { chanka: 'Munakuy', aimara: 'Munaña', phonChanka: 'mu-na-kuy', phonAimara: 'mu-na-ña', note: '"Munakuy" es el amor puro y recíproco. Se comparte en comunidad.' },
  feliz: { chanka: 'Kusisqa', aimara: 'Kusisiña', phonChanka: 'ku-sis-qa', phonAimara: 'ku-si-si-ña', note: '"Kusisqa" es estar feliz, lleno de alegría interior.' },
  felicidad: { chanka: 'Kusikuy', aimara: 'Kusisiña', phonChanka: 'ku-si-kuy', phonAimara: 'ku-si-si-ña', note: '"Kusikuy" es la felicidad, alegría compartida con todos.' },
  triste: { chanka: 'Llakisqa', aimara: 'Llakita', phonChanka: 'lla-kis-qa', phonAimara: 'lla-ki-ta', note: '"Llakisqa" es la tristeza. En comunidad, la tristeza se comparte y se alivia.' },
  alegria: { chanka: 'Kusikuy', aimara: 'Kusisiña', phonChanka: 'ku-si-kuy', phonAimara: 'ku-si-si-ña', note: '"Kusikuy" es la alegría andina, siempre celebrada en comunidad.' },
  miedo: { chanka: 'Manchay', aimara: 'Axsaraña', phonChanka: 'man-chay', phonAimara: 'ax-sa-ra-ña', note: '"Manchay" es el miedo. Los Apus protegen a quienes tienen fe.' },
  fuerza: { chanka: 'Kallpa', aimara: 'Ch\'ama', phonChanka: 'kall-pa', phonAimara: 'ch\'a-ma', note: '"Kallpa" es la fuerza vital que mueve a la comunidad.' },
  paz: { chanka: 'Thak', aimara: 'Hacisiña', phonChanka: 'thak', phonAimara: 'ha-ci-si-ña', note: 'La paz andina es armonía entre el hombre, la naturaleza y los dioses.' },
  vida: { chanka: 'Kawsay', aimara: 'Jakaña', phonChanka: 'kaw-say', phonAimara: 'ja-ka-ña', note: '"Kawsay" es vivir. El "sumaq kawsay" es el buen vivir andino.' },
  muerte: { chanka: 'Wañuy', aimara: 'Jiwaña', phonChanka: 'wa-ñuy', phonAimara: 'ji-wa-ña', note: '"Wañuy" no es final, sino transición al mundo de los ancestros.' },
  sueño: { chanka: 'Musquy', aimara: 'Samkaña', phonChanka: 'mus-quy', phonAimara: 'sam-ka-ña', note: '"Musquy" es soñar. Los sueños son mensajes de los ancestros.' },
  trabajo: { chanka: 'Llank\'ay', aimara: 'Irnaqaña', phonChanka: 'llank-ay', phonAimara: 'ir-na-qa-ña', note: '"Llank\'ay" es trabajar. El trabajo comunitario se llama "minka".' },
  descanso: { chanka: 'Samay', aimara: 'Samaraña', phonChanka: 'sa-may', phonAimara: 'sa-ma-ra-ña', note: '"Samay" es descansar y también respirar, tomar aliento.' },
  fiesta: { chanka: 'Raymi', aimara: 'Phista', phonChanka: 'ray-mi', phonAimara: 'phis-ta', note: '"Raymi" es la fiesta sagrada. Inti Raymi es la fiesta del Sol.' },

  // --- Verbos comunes ---
  comer: { chanka: 'Mikuy', aimara: 'Manq\'aña', phonChanka: 'mi-kuy', phonAimara: 'manq-a-ña', note: '"Mikuy" es comer. Compartir comida es el acto más sagrado.' },
  beber: { chanka: 'Upyay', aimara: 'Umaña', phonChanka: 'up-yay', phonAimara: 'u-ma-ña', note: '"Upyay" es beber. El agua y la chicha son las bebidas ancestrales.' },
  dormir: { chanka: 'Puñuy', aimara: 'Ikiña', phonChanka: 'pu-ñuy', phonAimara: 'i-ki-ña', note: '"Puñuy" es dormir, tiempo sagrado de renovación.' },
  caminar: { chanka: 'Puriy', aimara: 'Sarañ', phonChanka: 'pu-riy', phonAimara: 'sa-rañ', note: '"Puriy" es caminar. El caminante andino conecta pueblos y culturas.' },
  hablar: { chanka: 'Rimay', aimara: 'Parlaña', phonChanka: 'ri-may', phonAimara: 'par-la-ña', note: '"Rimay" es hablar. La palabra hablada es sagrada en la tradición andina.' },
  cantar: { chanka: 'Takiy', aimara: 'Q\'uchuña', phonChanka: 'ta-kiy', phonAimara: 'qu-chu-ña', note: '"Takiy" es cantar. Los cantos andinos acompañan el trabajo y las fiestas.' },
  bailar: { chanka: 'Tusuy', aimara: 'Thuquña', phonChanka: 'tu-suy', phonAimara: 'thu-qu-ña', note: '"Tusuy" es bailar. Las danzas andinas cuentan historias ancestrales.' },
  aprender: { chanka: 'Yachay', aimara: 'Yatiña', phonChanka: 'ya-chay', phonAimara: 'ya-ti-ña', note: '"Yachay" es aprender y saber. El conocimiento es sagrado.' },
  enseñar: { chanka: 'Yachachiy', aimara: 'Yatichiri', phonChanka: 'ya-cha-chiy', phonAimara: 'ya-ti-chi-ri', note: '"Yachachiy" es enseñar, transmitir sabiduría de generación en generación.' },
  jugar: { chanka: 'Pukllay', aimara: 'Anathaña', phonChanka: 'puk-llay', phonAimara: 'a-na-tha-ña', note: '"Pukllay" es jugar. El juego andino enseña y celebra la vida.' },
  correr: { chanka: 'Phaway', aimara: 'Jaljaña', phonChanka: 'pha-way', phonAimara: 'jal-ja-ña', note: '"Phaway" es correr. Los chasquis corrían llevando mensajes por todo el imperio.' },
  ver: { chanka: 'Rikuy', aimara: 'Uñjaña', phonChanka: 'ri-kuy', phonAimara: 'uñ-ja-ña', note: '"Rikuy" es ver. Ver en los Andes es también comprender.' },
  escuchar: { chanka: 'Uyariy', aimara: 'Ist\'aña', phonChanka: 'u-ya-riy', phonAimara: 'ist-a-ña', note: '"Uyariy" es escuchar con atención, un valor muy apreciado.' },
  dar: { chanka: 'Quy', aimara: 'Churañ', phonChanka: 'quy', phonAimara: 'chu-rañ', note: '"Quy" es dar. La reciprocidad ("ayni") es la base de la economía andina.' },
  vivir: { chanka: 'Kawsay', aimara: 'Jakaña', phonChanka: 'kaw-say', phonAimara: 'ja-ka-ña', note: '"Kawsay" es vivir. "Sumaq Kawsay" es la filosofía del buen vivir.' },
  morir: { chanka: 'Wañuy', aimara: 'Jiwaña', phonChanka: 'wa-ñuy', phonAimara: 'ji-wa-ña', note: '"Wañuy" es morir. No es el fin, sino un paso al mundo de los ancestros.' },
  llorar: { chanka: 'Waqay', aimara: 'Jachiña', phonChanka: 'wa-qay', phonAimara: 'ja-chi-ña', note: '"Waqay" es llorar. Las lágrimas limpian el alma andina.' },
  reir: { chanka: 'Asiy', aimara: 'Lariña', phonChanka: 'a-siy', phonAimara: 'la-ri-ña', note: '"Asiy" es reír. La risa andina es medicina para el alma.' },
  amar: { chanka: 'Munay', aimara: 'Munaña', phonChanka: 'mu-nay', phonAimara: 'mu-na-ña', note: '"Munay" es amar, querer y desear desde el corazón.' },
  pensar: { chanka: 'Yuyay', aimara: 'Amtaña', phonChanka: 'yu-yay', phonAimara: 'am-ta-ña', note: '"Yuyay" es pensar y recordar. La memoria es clave en la cultura oral.' },
  sembrar: { chanka: 'Tarpuy', aimara: 'Sataña', phonChanka: 'tar-puy', phonAimara: 'sa-ta-ña', note: '"Tarpuy" es sembrar. La siembra es ceremonia sagrada con ofrendas a la Pachamama.' },
  cosechar: { chanka: 'Hallmay', aimara: 'Llamayuña', phonChanka: 'hall-may', phonAimara: 'lla-ma-yu-ña', note: '"Hallmay" es cosechar. La cosecha es fiesta y agradecimiento.' },
  tejer: { chanka: 'Away', aimara: 'Sawaña', phonChanka: 'a-way', phonAimara: 'sa-wa-ña', note: '"Away" es tejer. El tejido andino cuenta historias y preserva la cultura.' },
  cocinar: { chanka: 'Wayk\'uy', aimara: 'Phayaña', phonChanka: 'wayk-uy', phonAimara: 'pha-ya-ña', note: '"Wayk\'uy" es cocinar. La cocina andina es patrimonio de la humanidad.' },
  lavar: { chanka: 'T\'aqsay', aimara: 'T\'akhsuña', phonChanka: 'taq-say', phonAimara: 'takh-su-ña', note: '"T\'aqsay" es lavar con agua. El agua limpia el cuerpo y el espíritu.' },
  venir: { chanka: 'Hamuy', aimara: 'Jutaña', phonChanka: 'ha-muy', phonAimara: 'ju-ta-ña', note: '"Hamuy" es venir. "¡Hamuy!" es una invitación cálida.' },
  ir: { chanka: 'Riy', aimara: 'Saraña', phonChanka: 'riy', phonAimara: 'sa-ra-ña', note: '"Riy" es ir. "Ri" también puede significar "haz" como imperativo.' },
  querer: { chanka: 'Munay', aimara: 'Munaña', phonChanka: 'mu-nay', phonAimara: 'mu-na-ña', note: '"Munay" es querer/desear. Es uno de los tres pilares: Munay, Yachay, Llank\'ay.' },
  poder: { chanka: 'Atiy', aimara: 'Atiña', phonChanka: 'a-tiy', phonAimara: 'a-ti-ña', note: '"Atiy" es poder, tener la capacidad. La fuerza viene de la comunidad.' },
  saber: { chanka: 'Yachay', aimara: 'Yatiña', phonChanka: 'ya-chay', phonAimara: 'ya-ti-ña', note: '"Yachay" es saber y conocer. El conocimiento ancestral se transmite oralmente.' },

  // --- Tiempo y espacio ---
  hoy: { chanka: 'Kunan', aimara: 'Jichhuru', phonChanka: 'ku-nan', phonAimara: 'jich-hu-ru', note: '"Kunan" es hoy, el momento presente.' },
  mañana: { chanka: 'Paqarin', aimara: 'Qharüru', phonChanka: 'pa-qa-rin', phonAimara: 'qha-rü-ru', note: '"Paqarin" también significa "amanecer".' },
  ayer: { chanka: 'Qayna', aimara: 'Masüru', phonChanka: 'qay-na', phonAimara: 'ma-sü-ru', note: '"Qayna" es ayer. En quechua, el pasado está "adelante" porque ya se vio.' },
  noche: { chanka: 'Tuta', aimara: 'Aruma', phonChanka: 'tu-ta', phonAimara: 'a-ru-ma', note: '"Tuta" es la noche, tiempo de descanso y espiritualidad.' },
  dia: { chanka: 'Punchaw', aimara: 'Uru', phonChanka: 'pun-chaw', phonAimara: 'u-ru', note: '"Punchaw" es el día, cuando brilla el Inti.' },
  dias: { chanka: 'Punchawkuna', aimara: 'Urunaka', phonChanka: 'pun-chaw-ku-na', phonAimara: 'u-ru-na-ka', note: '"Punchawkuna" son los días. "-kuna" pluraliza en quechua.' },
  tiempo: { chanka: 'Pacha', aimara: 'Pacha', phonChanka: 'pa-cha', phonAimara: 'pa-cha', note: '"Pacha" es tiempo, espacio y universo. Es una palabra fundamental.' },
  año: { chanka: 'Wata', aimara: 'Mara', phonChanka: 'wa-ta', phonAimara: 'ma-ra', note: '"Wata" es el año. El año nuevo andino se celebra en junio (Inti Raymi).' },
  arriba: { chanka: 'Hanaq', aimara: 'Alax', phonChanka: 'ha-naq', phonAimara: 'a-lax', note: '"Hanaq" es arriba, el mundo celestial (Hanaq Pacha).' },
  abajo: { chanka: 'Uray', aimara: 'Aynacha', phonChanka: 'u-ray', phonAimara: 'ay-na-cha', note: '"Uray" es abajo, el mundo interior (Ukhu Pacha).' },
  aqui: { chanka: 'Kaypi', aimara: 'Akana', phonChanka: 'kay-pi', phonAimara: 'a-ka-na', note: '"Kaypi" es aquí, el mundo terrenal (Kay Pacha).' },
  lejos: { chanka: 'Karu', aimara: 'Jaya', phonChanka: 'ka-ru', phonAimara: 'ja-ya', note: '"Karu" es lejos. Las distancias andinas se miden en jornadas de camino.' },
  cerca: { chanka: 'Kaylla', aimara: 'Jak\'a', phonChanka: 'kay-lla', phonAimara: 'jak-a', note: '"Kaylla" es cerca, a la mano.' },
  grande: { chanka: 'Hatun', aimara: 'Jach\'a', phonChanka: 'ha-tun', phonAimara: 'jach-a', note: '"Hatun" es grande, importante. "Hatun" aporta grandeza y respeto.' },
  pequeño: { chanka: 'Huch\'uy', aimara: 'Jisk\'a', phonChanka: 'hu-chuy', phonAimara: 'jisk-a', note: '"Huch\'uy" es pequeño. Lo pequeño también es valioso en los Andes.' },
  nuevo: { chanka: 'Musuq', aimara: 'Machaqa', phonChanka: 'mu-suq', phonAimara: 'ma-cha-qa', note: '"Musuq" es nuevo. "Musuq wata" es año nuevo.' },
  viejo: { chanka: 'Machu', aimara: 'Achachi', phonChanka: 'ma-chu', phonAimara: 'a-cha-chi', note: '"Machu" es viejo/antiguo. Machu Picchu = montaña vieja.' },

  // --- Adjetivos comunes ---
  bueno: { chanka: 'Allin', aimara: 'Aski', phonChanka: 'a-yín', phonAimara: 'as-ki', note: '"Allin" significa bueno, bonito y armonioso.' },
  buenos: { chanka: 'Allin', aimara: 'Aski', phonChanka: 'a-yín', phonAimara: 'as-ki', note: '"Allin" significa bueno en todos los sentidos.' },
  buenas: { chanka: 'Allin', aimara: 'Aski', phonChanka: 'a-yín', phonAimara: 'as-ki', note: '"Allin" no distingue género, expresa bondad universal.' },
  malo: { chanka: 'Mana allin', aimara: 'Jani wali', phonChanka: 'ma-na a-yín', phonAimara: 'ja-ni wa-li', note: '"Mana allin" literalmente es "no bueno". Lo negativo se define por la ausencia del bien.' },
  bonito: { chanka: 'Sumaq', aimara: 'Suma', phonChanka: 'su-maq', phonAimara: 'su-ma', note: '"Sumaq" es belleza total: visual, espiritual y emocional.' },
  hermoso: { chanka: 'Sumaq', aimara: 'Suma', phonChanka: 'su-maq', phonAimara: 'su-ma', note: '"Sumaq" abarca lo hermoso en todos los sentidos andinos.' },
  lindo: { chanka: 'Sumaq', aimara: 'Suma', phonChanka: 'su-maq', phonAimara: 'su-ma', note: '"Sumaq" es la belleza andina en su expresión más completa.' },
  feo: { chanka: 'Millay', aimara: 'K\'añu', phonChanka: 'mi-llay', phonAimara: 'ka-ñu', note: '"Millay" es feo o desagradable.' },
  caliente: { chanka: 'Rupha', aimara: 'Juq\'u', phonChanka: 'ru-pha', phonAimara: 'juq-u', note: '"Rupha" es caliente, como el calor del hogar.' },
  frio: { chanka: 'Chiri', aimara: 'Thaya', phonChanka: 'chi-ri', phonAimara: 'tha-ya', note: '"Chiri" es el frío de las alturas andinas.' },
  rapido: { chanka: 'Utqay', aimara: 'Jank\'a', phonChanka: 'ut-qay', phonAimara: 'jank-a', note: '"Utqay" es rápido, como el cóndor en vuelo.' },
  lento: { chanka: 'Allillamanta', aimara: 'Jaya jaya', phonChanka: 'a-yi-lla-man-ta', phonAimara: 'ja-ya ja-ya', note: '"Allillamanta" es despacio, con calma. La paciencia es virtud andina.' },
  mucho: { chanka: 'Achka', aimara: 'Walja', phonChanka: 'ach-ka', phonAimara: 'wal-ja', note: '"Achka" es mucho. La abundancia se agradece a la Pachamama.' },
  poco: { chanka: 'Pisilla', aimara: 'Juk\'a', phonChanka: 'pi-si-lla', phonAimara: 'juk-a', note: '"Pisilla" es poco. Incluso lo poco se comparte en la cultura andina.' },
  todo: { chanka: 'Lliw', aimara: 'Taqi', phonChanka: 'lliw', phonAimara: 'ta-qi', note: '"Lliw" es todo, la totalidad.' },
  nada: { chanka: 'Mana ima', aimara: 'Janiwa kuna', phonChanka: 'ma-na i-ma', phonAimara: 'ja-ni-wa ku-na', note: '"Mana ima" es literalmente "no algo", nada.' },

  // --- Conceptos culturales ---
  musica: { chanka: 'Takiy', aimara: 'Q\'uchuña', phonChanka: 'ta-kiy', phonAimara: 'qu-chu-ña', note: 'La música andina acompaña todos los momentos de la vida comunitaria.' },
  danza: { chanka: 'Tusuy', aimara: 'Thuquña', phonChanka: 'tu-suy', phonAimara: 'thu-qu-ña', note: 'Las danzas andinas cuentan historias sagradas de los ancestros.' },
  idioma: { chanka: 'Simi', aimara: 'Aru', phonChanka: 'si-mi', phonAimara: 'a-ru', note: '"Simi" es la lengua/idioma. "Runasimi" = lengua del pueblo.' },
  lengua: { chanka: 'Simi', aimara: 'Aru', phonChanka: 'si-mi', phonAimara: 'a-ru', note: '"Simi" y "Aru" son las palabras para la lengua hablada.' },
  dios: { chanka: 'Apu', aimara: 'Apu', phonChanka: 'a-pu', phonAimara: 'a-pu', note: '"Apu" son los espíritus de las montañas, divinidades protectoras.' },
  sagrado: { chanka: 'Willka', aimara: 'Willka', phonChanka: 'will-ka', phonAimara: 'will-ka', note: '"Willka" es lo sagrado, lo divino que habita en toda la naturaleza.' },
  historia: { chanka: 'Willakuy', aimara: 'Yatiyaña', phonChanka: 'wi-lla-kuy', phonAimara: 'ya-ti-ya-ña', note: '"Willakuy" es contar historias. La tradición oral preserva la historia andina.' },
  sabiduria: { chanka: 'Yachay', aimara: 'Yatiña', phonChanka: 'ya-chay', phonAimara: 'ya-ti-ña', note: '"Yachay" es la sabiduría. Es uno de los tres pilares andinos: Munay, Yachay, Llank\'ay.' },
  suerte: { chanka: 'Saminchay', aimara: 'Sarnaqaña', phonChanka: 'sa-min-chay', phonAimara: 'sar-na-qa-ña', note: 'La suerte en los Andes está ligada a la armonía con la naturaleza.' },
  oro: { chanka: 'Quri', aimara: 'Chhuqi quri', phonChanka: 'qu-ri', phonAimara: 'chhu-qi qu-ri', note: '"Quri" es el oro. Para los incas, el oro era el sudor del Sol.' },
  plata: { chanka: 'Qullqi', aimara: 'Qullqi', phonChanka: 'qull-qi', phonAimara: 'qull-qi', note: '"Qullqi" es la plata y también el dinero.' },
  dinero: { chanka: 'Qullqi', aimara: 'Qullqi', phonChanka: 'qull-qi', phonAimara: 'qull-qi', note: '"Qullqi" significa tanto plata como dinero en general.' },
  escuela: { chanka: 'Yachay wasi', aimara: 'Yatiña uta', phonChanka: 'ya-chay wa-si', phonAimara: 'ya-ti-ña u-ta', note: '"Yachay wasi" es literalmente "casa del saber", la escuela.' },
  libro: { chanka: 'Liwru', aimara: 'Liwru', phonChanka: 'liw-ru', phonAimara: 'liw-ru', note: 'Préstamo del español, adoptado en ambas lenguas.' },
  profesor: { chanka: 'Yachachiq', aimara: 'Yatichiri', phonChanka: 'ya-cha-chiq', phonAimara: 'ya-ti-chi-ri', note: '"Yachachiq" es el que enseña, el transmisor de sabiduría.' },
  estudiante: { chanka: 'Yachaq', aimara: 'Yatiqiri', phonChanka: 'ya-chaq', phonAimara: 'ya-ti-qi-ri', note: '"Yachaq" es el que aprende, el buscador de conocimiento.' },
  medicina: { chanka: 'Hampi', aimara: 'Qullaña', phonChanka: 'ham-pi', phonAimara: 'qu-lla-ña', note: '"Hampi" es la medicina. La medicina andina usa plantas sagradas.' },

  // --- Otras palabras útiles ---
  donde: { chanka: 'Maypi', aimara: 'Kawkïnsa', phonChanka: 'may-pi', phonAimara: 'kaw-kïn-sa', note: '"Maypi" pregunta por un lugar.' },
  cuando: { chanka: 'Hayk\'aq', aimara: 'Kunawrasaki', phonChanka: 'hayk-aq', phonAimara: 'ku-naw-ra-sa-ki', note: '"Hayk\'aq" pregunta por el tiempo.' },
  que: { chanka: 'Ima', aimara: 'Kuna', phonChanka: 'i-ma', phonAimara: 'ku-na', note: '"Ima" es "qué", la pregunta básica.' },
  quien: { chanka: 'Pi', aimara: 'Khiti', phonChanka: 'pi', phonAimara: 'khi-ti', note: '"Pi" es "quién", la pregunta por la identidad.' },
  como: { chanka: 'Imayna', aimara: 'Kamisa', phonChanka: 'i-may-na', phonAimara: 'ka-mi-sa', note: '"Imayna" es "cómo", la pregunta por la manera.' },
  porque: { chanka: 'Imarayku', aimara: 'Kunata', phonChanka: 'i-ma-ray-ku', phonAimara: 'ku-na-ta', note: '"Imarayku" es "por qué", la búsqueda de razón.' },
  bien: { chanka: 'Allin', aimara: 'Wali', phonChanka: 'a-yín', phonAimara: 'wa-li', note: '"Allin" es bien, bueno. "Allinmi" es "está bien".' },
  mal: { chanka: 'Mana allin', aimara: 'Jani wali', phonChanka: 'ma-na a-yín', phonAimara: 'ja-ni wa-li', note: '"Mana allin" es "no está bien", malo.' },
  mas: { chanka: 'Aswan', aimara: 'Juk\'amp', phonChanka: 'as-wan', phonAimara: 'juk-amp', note: '"Aswan" es más. Se usa como comparativo.' },
  menos: { chanka: 'Pisilla', aimara: 'Pisi', phonChanka: 'pi-si-lla', phonAimara: 'pi-si', note: '"Pisilla" es menos o poco.' },
  muy: { chanka: 'Ancha', aimara: 'Wali', phonChanka: 'an-cha', phonAimara: 'wa-li', note: '"Ancha" intensifica: muy, mucho, demasiado.' },
  tambien: { chanka: 'Hinallataq', aimara: 'Ukatxa', phonChanka: 'hi-na-lla-taq', phonAimara: 'u-kat-xa', note: '"Hinallataq" es también, igualmente.' },
  pero: { chanka: 'Ichaqa', aimara: 'Ukampis', phonChanka: 'i-cha-qa', phonAimara: 'u-kam-pis', note: '"Ichaqa" es pero, sin embargo.' },
  y: { chanka: '-wan', aimara: 'ukat', phonChanka: '-wan', phonAimara: 'u-kat', note: '"-wan" es la conjunción "y", se une como sufijo.' },
  con: { chanka: '-wan', aimara: '-mpi', phonChanka: '-wan', phonAimara: '-mpi', note: '"-wan" como sufijo indica compañía.' },
  para: { chanka: '-paq', aimara: '-taki', phonChanka: '-paq', phonAimara: '-ta-ki', note: '"-paq" indica finalidad, para quién o para qué.' },
  en: { chanka: '-pi', aimara: '-na', phonChanka: '-pi', phonAimara: '-na', note: '"-pi" como sufijo indica ubicación, en/dentro de.' },
};

// ---------------------------------------------------------------------------
// FUNCIÓN DE TRADUCCIÓN INTELIGENTE
// ---------------------------------------------------------------------------
export function translateText(
  text: string,
  lang: 'chanka' | 'aimara'
): { result: string; phonetics: string; note: string } {
  const cleaned = text.toLowerCase().replace(/[¿?¡!.,;:()"""'']/g, '').trim();

  if (!cleaned) {
    return {
      result: '',
      phonetics: '',
      note: 'Escribe algo para traducir.',
    };
  }

  // 1) Intentar frases completas primero (coincidencia exacta o parcial)
  for (const phrase of phrases) {
    if (cleaned === phrase.es || cleaned.replace(/\s+/g, ' ') === phrase.es) {
      return {
        result: lang === 'chanka' ? phrase.chanka : phrase.aimara,
        phonetics: lang === 'chanka' ? phrase.phonChanka : phrase.phonAimara,
        note: phrase.note,
      };
    }
  }

  // 2) Buscar frases dentro del texto (multi-word matching)
  let remaining = cleaned;
  const translatedParts: string[] = [];
  const phoneticParts: string[] = [];
  let note = '';

  // Ordenar frases de más larga a más corta para greedy matching
  const sortedPhrases = [...phrases].sort((a, b) => b.es.length - a.es.length);

  while (remaining.trim().length > 0) {
    remaining = remaining.trim();
    let matchedPhrase = false;

    // Intentar matchear frase
    for (const phrase of sortedPhrases) {
      if (remaining.startsWith(phrase.es)) {
        translatedParts.push(lang === 'chanka' ? phrase.chanka : phrase.aimara);
        phoneticParts.push(lang === 'chanka' ? phrase.phonChanka : phrase.phonAimara);
        if (!note) note = phrase.note;
        remaining = remaining.slice(phrase.es.length).trim();
        matchedPhrase = true;
        break;
      }
    }

    if (!matchedPhrase) {
      // Intentar matchear palabra individual
      const wordMatch = remaining.match(/^(\S+)/);
      if (wordMatch) {
        const word = wordMatch[1];
        if (dictionary[word]) {
          const entry = dictionary[word];
          translatedParts.push(lang === 'chanka' ? entry.chanka : entry.aimara);
          phoneticParts.push(lang === 'chanka' ? entry.phonChanka : entry.phonAimara);
          if (!note) note = entry.note;
        } else {
          // Palabra no encontrada: dejarla como está pero marcada
          translatedParts.push(word);
          phoneticParts.push(word);
        }
        remaining = remaining.slice(word.length).trim();
      } else {
        break;
      }
    }
  }

  // Si no se encontró ninguna traducción
  const anyTranslated = translatedParts.some((part, idx) => {
    const originalWords = cleaned.split(/\s+/);
    // Verificar si al menos una parte fue traducida (diferente al original)
    return part.toLowerCase() !== (originalWords[idx] || '').toLowerCase();
  });

  if (!anyTranslated || translatedParts.length === 0) {
    return {
      result: lang === 'chanka'
        ? `"${text.trim()}" → (palabra no encontrada en el diccionario)`
        : `"${text.trim()}" → (palabra no encontrada en el diccionario)`,
      phonetics: '—',
      note: `No encontramos "${text.trim()}" en nuestro diccionario offline. Prueba con palabras comunes como: hola, gracias, agua, sol, familia, madre, amor, casa, comida, perro, montaña, buenas tardes, como estas, te quiero...`,
    };
  }

  return {
    result: translatedParts.join(' '),
    phonetics: phoneticParts.join(' · '),
    note: note || 'Las lenguas originarias son patrimonio vivo de los Andes. Cada palabra guarda siglos de sabiduría comunitaria.',
  };
}
