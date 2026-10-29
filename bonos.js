// Os 4 bonos do app (texto do próprio app, não são imagens do ChatGPT).
// Bono 4 (Tabla de pruebas rápidas) é montado a partir de window.RAPIDAS (datos.js),
// que vem do plano das fichas: a tabela sempre repete o que a ficha diz.
// Tipos de bloco: intro (texto), lista (checkbox que marca e fica salvo no aparelho),
// tabla (cabeçalho + linhas), notas (lista simples), aviso (caixa amarela).
window.BONOS = [
  {
    n: 1,
    titulo: 'Checklist de Mantenimiento Preventivo',
    sub: '6 etapas · 32 verificaciones',
    desc: 'La secuencia completa para revisar la computadora de punta a punta y no olvidarte de nada antes de entregarla al cliente.',
    marcar: true,
    rotuloMarcar: 'verificaciones hechas',
    reiniciar: 'Empezar otra computadora',
    secoes: [
      { t: 'Recepción: antes de abrir', e: '📋', itens: [
        'Anota marca, modelo y número de serie, y lo que el cliente dice que falla, con sus palabras.',
        'Enciende el equipo antes de tocarlo y prueba arranque, imagen, sonido, red y USB.',
        'Pregunta si hay archivos importantes y haz el respaldo antes de cualquier cambio en el disco.',
        'Revisa golpes, puertos flojos y tornillos faltantes, y toma fotos del estado en que llegó.',
        'Fotografía los conectores y cables antes de desconectar nada.'
      ] },
      { t: 'Seguridad', e: '🛡️', itens: [
        'Apaga, desconecta el cable de poder y mantén presionado el botón de encendido unos segundos.',
        'Trabaja sobre una superficie aislante y usa pulsera antiestática (o toca el chasis metálico antes de tocar piezas).',
        'No uses aspiradora común dentro del gabinete: usa aire comprimido o soplador.',
        'Sujeta las aspas de los ventiladores mientras soplas para que no giren.'
      ] },
      { t: 'Limpieza', e: '🧹', itens: [
        'Saca el polvo de filtros, rejillas y ventiladores del gabinete.',
        'Limpia el disipador del procesador y el de la tarjeta de video.',
        'Limpia la fuente solo por fuera (rejillas y ventilador): no abras la fuente.',
        'Limpia contactos sucios u oxidados con alcohol isopropílico y deja secar antes de encender.'
      ] },
      { t: 'Revisión interna', e: '🔧', itens: [
        'Pasta térmica: si está seca o el procesador calienta, cámbiala con una capa fina.',
        'Todos los ventiladores giran libres, sin ruido ni juego en el eje.',
        'Capacitores sin hinchazón ni fuga en la placa y en la tarjeta de video.',
        'Conector de 24 pines y EPS del procesador bien encajados.',
        'Memorias y tarjeta de video bien encajadas, con la traba cerrada.',
        'Pila CMOS: si la hora se reinicia o marca menos de 3 V, cámbiala (CR2032).',
        'Cables ordenados, sin tapar la entrada ni la salida de aire.'
      ] },
      { t: 'Software', e: '💻', itens: [
        'Revisa la salud del disco (SMART) con CrystalDiskInfo.',
        'Actualiza Windows y los drivers principales: chipset, video y red.',
        'Revisa los programas que inician con Windows y quita los innecesarios (con permiso del cliente).',
        'Analiza el sistema con el antivirus.',
        'Deja espacio libre en el disco del sistema (como referencia, al menos un 15 %).'
      ] },
      { t: 'Pruebas finales: antes de entregar', e: '✅', itens: [
        'Confirma que el defecto original ya no aparece, repitiendo lo que hacía el cliente.',
        'Haz una prueba de carga y mira las temperaturas (HWMonitor o similar).',
        'Prueba puertos USB, audio, red o Wi-Fi y todas las salidas de video que use el cliente.',
        'Fecha y hora correctas y la BIOS sin avisos al encender.',
        'Cierra el gabinete con todos los tornillos y limpia el exterior.',
        'Anota lo que hiciste y las piezas cambiadas, para el cliente y para tu registro.',
        'Entrega con una prueba encendida delante del cliente.'
      ] }
    ]
  },
  {
    n: 2,
    titulo: 'Guía de Compatibilidad: Placa Madre, Procesador y Memoria',
    sub: '5 preguntas · 2 tablas · reglas de memoria',
    desc: 'Consulta rápida para revisar socket, chipset y memoria antes de un upgrade o un armado, y evitar comprar la pieza equivocada.',
    secoes: [
      { t: 'Las 5 preguntas antes de comprar o armar', e: '❓', intro: 'Si una de las respuestas es «no» o «no sé», detente y confírmalo antes de comprar.', notas: [
        '<b>Socket:</b> ¿el procesador y la placa usan el mismo socket?',
        '<b>Chipset y BIOS:</b> ¿la placa soporta esa generación de procesador y con qué versión de BIOS?',
        '<b>Memoria:</b> ¿el tipo (DDR3, DDR4 o DDR5) y el formato (DIMM de escritorio) son los que acepta la placa?',
        '<b>Fuente:</b> ¿tiene la potencia y los conectores (EPS del procesador, PCIe de la tarjeta de video)?',
        '<b>Gabinete:</b> ¿entran la placa (ATX, Micro-ATX, Mini-ITX), la altura del disipador y el largo de la tarjeta de video?'
      ] },
      { t: 'Intel: socket, procesador y memoria', e: '🔷', tabla: {
        cab: ['Socket', 'Procesadores', 'Chipsets', 'Memoria'],
        filas: [
          ['LGA 1155', 'Core 2.ª y 3.ª gen.', 'H61, B75, H77, Z68, Z77', 'DDR3'],
          ['LGA 1150', 'Core 4.ª y 5.ª gen.', 'H81, B85, H87, Z87, H97, Z97', 'DDR3'],
          ['LGA 1151', 'Core 6.ª y 7.ª gen.', 'Serie 100 y 200 (H110, B150, Z170, B250, Z270…)', 'DDR4 (algunas DDR3L)'],
          ['LGA 1151 (300)', 'Core 8.ª y 9.ª gen.', 'Serie 300 (H310, B360, B365, Z370, Z390…)', 'DDR4'],
          ['LGA 1200', 'Core 10.ª y 11.ª gen.', 'Serie 400 y 500 (H410, B460, B560, Z590…)', 'DDR4'],
          ['LGA 1700', 'Core 12.ª, 13.ª y 14.ª gen.', 'Serie 600 y 700 (H610, B660, B760, Z790…)', 'DDR4 o DDR5, según la placa'],
          ['LGA 1851', 'Core Ultra serie 200', 'Serie 800 (H810, B860, Z890)', 'DDR5']
        ]
      }, notas: [
        '<b>Mismo nombre, otra compatibilidad:</b> el LGA 1151 de 8.ª y 9.ª gen. no funciona en placas de serie 100 y 200, aunque el procesador entre en el socket.',
        'Los Core de 11.ª gen. no funcionan en placas H410 ni B460.',
        'En LGA 1700, la placa es DDR4 o DDR5: nunca las dos. Las de serie 600 necesitan BIOS actualizada para 13.ª y 14.ª gen.'
      ] },
      { t: 'AMD: socket, procesador y memoria', e: '🔶', tabla: {
        cab: ['Socket', 'Procesadores', 'Chipsets', 'Memoria'],
        filas: [
          ['AM3+', 'FX', '970, 990FX', 'DDR3'],
          ['AM4', 'Ryzen 1000 a 5000', 'A320, B350, X370, B450, X470, A520, B550, X570', 'DDR4'],
          ['AM5', 'Ryzen 7000, 8000 y 9000', 'A620, B650, X670, B850, X870', 'DDR5']
        ]
      }, notas: [
        '<b>AM4 depende de la BIOS:</b> un Ryzen 5000 en placa de serie 300 o 400 solo funciona con la BIOS actualizada, y no todos los modelos la recibieron.',
        'Las placas A520 y B550 no aceptan Ryzen 1000 ni la mayoría de los Ryzen 2000.',
        'En AM5, los Ryzen 9000 en placas de serie 600 necesitan BIOS actualizada.'
      ] },
      { t: 'Memoria RAM: las reglas que más fallan', e: '🧩', notas: [
        '<b>DDR3, DDR4 y DDR5 no se mezclan:</b> la muesca está en otro lugar y el módulo no entra. Nunca lo fuerces.',
        '<b>DIMM es de escritorio y SO-DIMM es de laptop:</b> no son intercambiables.',
        '<b>Velocidad:</b> si la memoria es más rápida que lo que soporta la placa o el procesador, trabaja a la velocidad menor. Para la velocidad anunciada hay que activar XMP (Intel) o EXPO (AMD).',
        '<b>Doble canal:</b> usa módulos iguales en los slots que indica el manual de la placa (casi siempre A2 y B2).',
        '<b>Módulos distintos:</b> todos trabajan a la velocidad del más lento, y el perfil XMP puede quedar inestable.',
        '<b>Capacidad máxima:</b> la placa tiene un límite por slot y un total. Está en la ficha técnica del fabricante.'
      ] },
      { t: 'Video integrado: ¿el procesador da imagen sin tarjeta?', e: '🖥️', tabla: {
        cab: ['Procesador', 'Video integrado'],
        filas: [
          ['Intel Core con letra F (ej.: i5-12400F)', 'No: necesita tarjeta de video'],
          ['Intel Core sin F', 'Sí'],
          ['AMD Ryzen 1000 a 5000 sin G (ej.: Ryzen 5 5600)', 'No: necesita tarjeta de video'],
          ['AMD Ryzen con G (ej.: Ryzen 5 5600G)', 'Sí'],
          ['AMD Ryzen 7000 y 9000 sin F', 'Sí, básico'],
          ['AMD Ryzen con F (ej.: Ryzen 5 8400F)', 'No: necesita tarjeta de video']
        ]
      }, notas: [
        'Si el procesador no tiene video integrado, las salidas de video de la placa no dan imagen. Ver la ficha 064.'
      ] },
      { t: 'Antes de cambiar el procesador', e: '🧠', notas: [
        'Busca la placa exacta (modelo y revisión) en el sitio del fabricante y abre la lista de procesadores compatibles («CPU support list»).',
        'Mira la versión mínima de BIOS para ese procesador y compárala con la que tiene la placa.',
        'Si hay que actualizar la BIOS, hazlo con el procesador viejo todavía instalado. Algunas placas tienen BIOS Flashback, que actualiza sin procesador.',
        'Nunca apagues ni desconectes durante la actualización de la BIOS.'
      ] }
    ],
    aviso: 'Esta guía resume las reglas generales. La última palabra la tiene la lista de compatibilidad del fabricante de la placa: depende del modelo exacto y de la versión de BIOS.'
  },
  {
    n: 3,
    titulo: 'Lista de Herramientas Esenciales',
    sub: '4 niveles · 28 herramientas',
    desc: 'Qué conviene comprar primero, para qué sirve cada herramienta y los programas gratuitos que no pueden faltar en tu pendrive.',
    marcar: true,
    rotuloMarcar: 'ya las tienes',
    rotuloItem: 'La tengo',
    secoes: [
      { t: 'Para empezar', e: '🧰', intro: 'Con esto ya haces la mayoría de las pruebas de las fichas.', itens: [
        '<b>Destornilladores de precisión</b> (Phillips PH0, PH1 y PH2, y Torx T5 a T10): gabinetes, discos y laptops.',
        '<b>Pulsera antiestática</b> o alfombra ESD: protege las piezas de la descarga de tu cuerpo.',
        '<b>Multímetro digital:</b> tensiones de la fuente, pila CMOS y continuidad de cables.',
        '<b>Aire comprimido o soplador eléctrico</b> y brocha antiestática.',
        '<b>Alcohol isopropílico</b> (99 %), paños sin pelusa e hisopos.',
        '<b>Pasta térmica</b> de buena calidad.',
        '<b>Pinzas</b> y palanca plástica para abrir sin rayar.',
        '<b>Linterna</b> o lámpara de cabeza.',
        '<b>Bandeja magnética</b> o recipiente para separar tornillos.',
        '<b>Pendrive de 16 GB o más</b> con el instalador de Windows y tus herramientas.'
      ] },
      { t: 'Para diagnosticar más rápido', e: '🔍', intro: 'Son las que más tiempo ahorran: te permiten probar por sustitución.', itens: [
        '<b>Tester de fuente ATX:</b> confirma en segundos si la fuente entrega tensión.',
        '<b>Tarjeta POST</b> (PCIe): muestra el código de arranque cuando la placa no da imagen.',
        '<b>Fuente de prueba</b> que sabes que funciona.',
        '<b>Memoria de prueba</b> (DDR3, DDR4 y DDR5, según lo que más atiendes).',
        '<b>Tarjeta de video de prueba</b>, aunque sea sencilla.',
        '<b>Disco o SSD de prueba</b> con Windows instalado.',
        '<b>Adaptador USB a SATA y NVMe</b> (caja externa): revisar discos y hacer respaldos.',
        '<b>Monitor de prueba y cables</b> HDMI, DisplayPort y VGA, con adaptadores.'
      ] },
      { t: 'Programas gratuitos', e: '💾', intro: 'Llévalos en el pendrive.', itens: [
        '<b>CrystalDiskInfo:</b> salud del disco (SMART).',
        '<b>HWMonitor o HWiNFO:</b> temperaturas, tensiones y velocidad de los ventiladores.',
        '<b>MemTest86:</b> prueba de memoria RAM desde el pendrive.',
        '<b>CPU-Z:</b> identifica procesador, placa y memoria sin abrir el gabinete.',
        '<b>OCCT:</b> prueba de estabilidad bajo carga.',
        '<b>DDU (Display Driver Uninstaller):</b> borra por completo el driver de video.',
        '<b>Ventoy:</b> varias imágenes ISO en un solo pendrive.'
      ] },
      { t: 'Cuando el taller crece', e: '🚀', intro: 'No hace falta para empezar.', itens: [
        '<b>Estación de soldadura</b>, estaño y flux.',
        '<b>Termómetro infrarrojo</b> o cámara térmica: encuentra componentes calientes.',
        '<b>Lupa o microscopio con luz:</b> soldaduras, pistas y conectores.'
      ] }
    ],
    aviso: 'Compra por niveles: las de «Para empezar» primero. Las de diagnóstico se pagan solas con el tiempo que ahorran en cada reparación.'
  },
  {
    n: 4,
    titulo: 'Tabla de Pruebas Rápidas',
    sub: '16 fallas comunes · 3 pruebas cada una',
    desc: 'Las 3 primeras pruebas de las fallas que más llegan al taller, en una sola hoja. Para imprimir y dejar a mano en el banco de trabajo.',
    rapidas: true,
    aviso: 'Si las 3 primeras pruebas no resuelven, abre la ficha completa: sigue el orden de pruebas, las verificaciones y las observaciones.'
  }
];
