const activities=[
 ['Forestación y reforestación','Preparación del terreno, plantación y cuidado de especies.','operacion-1.jpeg','♧'],
 ['Poda segura','Planificación, delimitación del área y uso seguro de herramientas.','operacion-2.jpeg','✂'],
 ['Áreas verdes','Mantenimiento, orden y conservación de jardines y viveros.','operacion-3.jpeg','❋'],
 ['Aplicación fitosanitaria','Manejo responsable de productos y protección del personal.','operacion-4.jpeg','◉'],
 ['Riego y conservación','Uso eficiente del agua y revisión de sistemas de irrigación.','operacion-5.jpeg','⌁'],
 ['Gestión de residuos','Segregación, almacenamiento temporal y manejo seguro.','operacion-6.jpeg','♻'],
 ['Restauración ambiental','Revegetación y recuperación de componentes intervenidos.','operacion-7.jpeg','⛰'],
 ['Cierre de minas','Controles preventivos en actividades de rehabilitación.','operacion-8.jpeg','◎']
];
const months=['Cultura preventiva','Herramientas y equipos','Ergonomía y salud','Forestación y poda','Productos químicos','Residuos y ambiente','Riego y áreas verdes','IPERC y trabajos críticos','Emergencias','Riesgos biológicos','Seguridad operacional','Liderazgo preventivo'];
const annualMotto='SER SEGUROS Y PRODUCTIVOS, ES NUESTRA RESPONSABILIDAD';
const referenceTopics=[
 'La seguridad es tarea de todos','Analizo los peligros y riesgos de mi entorno','La seguridad basada en el comportamiento','Por un trabajo sano y seguro','El autocuidado, una actitud','Mantener limpio el lugar de trabajo','El peligro de la rutina','Peligro en las superficies de tránsito','Uso mi equipo de protección personal','Protección de las manos','Protección de los pies','Protección de la cabeza','Tu participación es importante','Cuidado con las herramientas manuales','No dejemos que el accidente nos encuentre','Tratamiento de residuos orgánicos','Levantamiento correcto de cargas','Lesiones por movimientos repetitivos','Corregimos pequeños errores antes que se agranden','La influencia de mis acciones en la seguridad del equipo','Hojas de seguridad de productos químicos','Acompañemos a los trabajadores nuevos','Prevengamos la deshidratación','Factores humanos que causan accidentes','Guardas de seguridad de las máquinas','Fatiga y somnolencia','Aspectos e impactos ambientales','Automotivación','Prevención de lesiones en la espalda','Uno para todos y todos para uno'
];
const operationalTopics=['reconocer peligros antes de iniciar','verificar el estado de las herramientas','delimitar el área de trabajo','seleccionar el EPP adecuado','mantener orden y limpieza','prevenir la exposición a radiación UV','proteger la biodiversidad del entorno','comunicar cambios en las condiciones','evitar sobreesfuerzos y posturas forzadas','segregar correctamente los residuos','preparar una respuesta ante emergencias','cuidar el agua durante las operaciones','trabajar de forma segura en equipo','controlar derrames y fugas','revisar equipos antes de operarlos','prevenir resbalones y caídas','almacenar insumos de forma segura','detener el trabajo ante un riesgo crítico','proteger manos y ojos en tareas manuales','aplicar buenas prácticas ambientales','mantener rutas de evacuación despejadas','verificar las condiciones del terreno','reportar actos y condiciones subestándar','evitar contacto con flora y fauna','conducir y desplazarse con precaución','revisar etiquetas y fichas de seguridad','controlar polvo y material particulado','usar herramientas de poda con seguridad','prevenir incendios en áreas de trabajo','cerrar la jornada con orden y limpieza','participar activamente en la charla'];
const topics=[...referenceTopics,...operationalTopics];
const companyActivities=[
 {label:'Habilitación y mantenimiento de áreas verdes',context:'áreas verdes'},
 {label:'Mantenimiento y siembra de especies frutales y forestales',context:'siembra de especies frutales y forestales'},
 {label:'Rehabilitación de áreas disturbadas y cierre de minas',context:'rehabilitación y cierre de minas'},
 {label:'Preparación, descompactación y abonamiento de suelos',context:'preparación y abonamiento de suelos'},
 {label:'Vivero, semillas y producción de plantones',context:'vivero y plantones'},
 {label:'Riego e instalación de sistemas HDPE y goteo',context:'riego y sistemas HDPE'},
 {label:'Poda, desmalezado y operación de motoguadaña',context:'poda y desmalezado'},
 {label:'Aplicación fitosanitaria y manejo de productos',context:'aplicación fitosanitaria'},
 {label:'Control de maleza y mantenimiento de plantaciones',context:'mantenimiento de plantaciones'},
 {label:'Reposición y monitoreo de plantas',context:'monitoreo y reposición de plantas'},
 {label:'Manejo y compostaje de residuos vegetales',context:'residuos vegetales y compostaje'},
 {label:'Protección y cercado de áreas rehabilitadas',context:'protección de áreas rehabilitadas'},
 {label:'Cosecha y mantenimiento de especies frutales',context:'cosecha de especies frutales'},
 {label:'Registro fotográfico y reporte de avance',context:'registro y reporte de avance'}
];
const motivationalTalks=[
 ['El valor de lo que cultivamos','Cada plantón que cuidamos representa tiempo, conocimiento y una oportunidad para recuperar el entorno. El resultado se construye con constancia, incluso en tareas pequeñas.'],
 ['Un equipo, un mismo propósito','La coordinación hace que cada persona pueda trabajar con claridad y pedir apoyo a tiempo. El buen resultado depende de cómo nos cuidamos entre todos.'],
 ['El trabajo bien hecho deja huella','La calidad se nota en el área ordenada, las plantas atendidas y los detalles que verificamos antes de retirarnos. Nuestro trabajo permanece después de cada jornada.'],
 ['Aprender también es avanzar','Una observación o una pregunta puede evitar repetir un problema. Compartir lo aprendido fortalece al equipo y mejora el siguiente turno.'],
 ['Cuidar los recursos es cuidar el futuro','El agua, el suelo y los insumos tienen un propósito en cada servicio. Usarlos con criterio ayuda a que las áreas recuperadas prosperen.'],
 ['La constancia hace crecer los resultados','La revegetación necesita seguimiento: riego, control de maleza y reposición cuando corresponda. Cada cuidado oportuno suma al prendimiento.'],
 ['La seguridad empieza al escucharnos','Avisar que algo cambió y escuchar a quien está en el frente permite ajustar el trabajo antes de que alguien resulte expuesto.'],
 ['Orgullo por recuperar espacios','Rehabilitar un área disturbada requiere paciencia y colaboración. Podemos reconocer el avance y mantener el compromiso con cada etapa del cierre.'],
 ['Cada aporte cuenta','Quien prepara el terreno, instala, riega, monitorea o reporta aporta una parte esencial. El respeto entre funciones mejora el resultado común.'],
 ['Hacer una pausa también es avanzar','Detenerse para revisar una condición no es perder tiempo: permite retomar con el equipo informado y con los controles claros.'],
 ['Compartir experiencia fortalece al equipo','Las buenas prácticas se multiplican cuando explicamos cómo resolvimos una dificultad y qué conviene revisar la próxima vez.'],
 ['Cuidemos lo que ya ha prendido','El mantenimiento posterior es tan valioso como la siembra. Detectar a tiempo una planta afectada permite evaluar riego, suelo y reposición.'],
 ['Comunicar a tiempo es cuidar','Un cambio de clima, una fuga, una herramienta dañada o una dificultad personal deben poder comunicarse sin temor y con respeto.'],
 ['Pequeñas mejoras, mejores jornadas','Ordenar materiales, revisar una conexión o acordar una ruta despejada puede hacer la tarea más sencilla y segura para todos.'],
 ['Respeto por el entorno y por las personas','Trabajar con cuidado significa proteger la vegetación y fauna del entorno, y también reconocer los límites y necesidades de cada compañero.'],
 ['La calidad se construye en equipo','Antes de cerrar el frente, confirmar el riego, recoger residuos y dejar registro evita que se pierda el esfuerzo del día.'],
 ['La experiencia se comparte','Cada jornada ofrece aprendizajes sobre especies, terreno y condiciones del área. Compartirlos ayuda a que el grupo tome mejores decisiones.'],
 ['Acompañarnos también es prevención','Estar atentos al equipo y preguntar cómo va la tarea ayuda a detectar cansancio, dudas o una condición que requiera apoyo.'],
 ['Sembramos resultados que perduran','El trabajo con especies frutales y forestales necesita cuidado sostenido. Lo que hacemos hoy puede aportar sombra, alimento y biodiversidad mañana.'],
 ['Una buena jornada se cierra juntos','Revisar pendientes, materiales y evidencias con el equipo deja el frente preparado para continuar y reconoce el esfuerzo de todos.'],
 ['Tu iniciativa mejora el servicio','Proponer una mejora y comunicarla al responsable puede hacer más claro el trabajo y más útil el resultado para el cliente y el ambiente.'],
 ['Reconocer el progreso nos impulsa','Observar áreas atendidas, plantas instaladas y avances registrados permite valorar el esfuerzo y mantener metas realistas.'],
 ['Cuidar al compañero es parte del trabajo','Coordinar movimientos, respetar distancias y ofrecer ayuda cuando se necesita crea un equipo más confiable y unido.'],
 ['Seguimos aprendiendo, seguimos creciendo','El compromiso con la seguridad y el ambiente se renueva en cada servicio. Cerremos el año compartiendo lo aprendido y cuidando lo construido.']
].map(([title,message])=>({title,message,objective:'Fortalecer la motivación, la colaboración y el sentido de propósito en las labores de SGAE.',question:'¿Qué aporte concreto de un compañero ayudó al equipo o al entorno durante esta jornada?',commitment:'Reconoceré un aporte del equipo y contribuiré con una acción concreta para cuidar el resultado del servicio.'}));
const activitiesShort=companyActivities.map(activity=>activity.label);
function activityForTopic(topic,index){const text=topic.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,''),rules=[[/ficha|etiqueta|quimic|fumig|derrame|fuga|insumo|hojas de seguridad/,[7]],[/poda|herramienta|equipo|incendio|guardas|maquinas/,[6]],[/residuo|limpieza|orden|organicos/,[10]],[/riego|agua|deshidratacion/,[5]],[/sembr|plant|forest|biodivers|flora|fauna|reveget|restauracion/,[1,4]],[/suelo|terreno|cierre|rehabilitacion|impactos ambientales/,[2,3,11,9]],[/cosecha|frutal/,[12,1]],[/report|comunicar|participar|equipo|todos|comportamiento|influencia|trabajadores nuevos/,[13,0]],[/maleza|mantenimiento|areas verdes/,[8,0]],[/transito|superficies|caidas/,[0,6]],[/cargas|espalda|repetitivos|fatiga|somnolencia|autocuidado|sano y seguro|autoproteccion|epp|proteccion de las manos|proteccion de los pies|proteccion de la cabeza/,[0,1,2,6]]];const matched=rules.find(([pattern])=>pattern.test(text));return companyActivities[matched?matched[1][index%matched[1].length]:(index%2?0:9)];}
const calendarMonthNames=['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'];
const talks=Array.from({length:365},(_,i)=>{const d=i+1,date=new Date(2026,0,d),m=date.getMonth(),topic=topics[(i*7+Math.floor(i/3))%topics.length],activity=activityForTopic(topic,i),isMotivational=date.getDate()===1||date.getDate()===15,motivation=isMotivational?motivationalTalks[m*2+(date.getDate()===15?1:0)]:null;return {day:d,month:months[m],monthName:calendarMonthNames[m],monthIndex:m,topic,title:isMotivational?`Día ${String(d).padStart(3,'0')} · ${motivation.title}`:`Día ${String(d).padStart(3,'0')} · ${capitalize(topic)}${referenceTopics.includes(topic)?` · ${activity.context}`:` en ${activity.context}`}`,category:months[m],activity:activity.label,activityContext:activity.context,duration:6+(i%4),isMotivational,motivation,motto:annualMotto,objective:motivation?.objective||`Al finalizar, el equipo podrá ${topic.toLowerCase()} durante ${activity.label.toLowerCase()}, aplicando controles antes, durante y al cierre de la tarea.`,date:date.toLocaleDateString('es-PE',{day:'2-digit',month:'short'}),intro:motivation?.message||`Las condiciones de trabajo cambian día a día. Una pausa breve para observar el entorno ayuda a anticipar incidentes y cuidar a las personas y al ambiente.`,hazards:isMotivational?['La rutina puede hacer que dejemos de reconocer avances.','La falta de comunicación puede debilitar la coordinación.','El esfuerzo individual puede pasar inadvertido si no lo reconocemos.']:['Condiciones del terreno y tránsito de equipos','Exposición a radiación solar, polvo o clima','Herramientas en mal estado o uso inadecuado','Contacto accidental con sustancias o elementos del entorno'],controls:isMotivational?[`Reconoce una contribución específica de alguien del equipo.`,`Comparte un aprendizaje útil de la tarea de hoy.`,motivation.commitment]:['Revisar el área y comunicar peligros antes de comenzar.','Confirmar que herramientas y equipos están en condición segura.','Usar el EPP definido en el procedimiento de la tarea.','Mantener comunicación con el equipo y detenerse si cambian las condiciones.','Segregar residuos y dejar el área ordenada al finalizar.']}});
function capitalize(s){return s[0].toUpperCase()+s.slice(1)}
const icons={home:'⌂',talk:'▣',calendar:'▦',report:'⚑',dynamics:'◇',library:'▤',training:'✓',indicators:'▥',admin:'⚙'};
const app=document.querySelector('#app');let page='login',selectedTalk=talks[0],mobileOpen=false,expositor=false,lastTalkSource='library',reopenCharlasInLib=false;
window.getCurrentSgaeTalk=()=>selectedTalk;
window.getSgaeTalks=()=>talks;
window.getSgaeActivities=()=>companyActivities;
window.openSgaeTalk=(day,source)=>{const origin=source||(page==='talk'?lastTalkSource:page)||'library';lastTalkSource=origin;if(origin==='library')reopenCharlasInLib=true;selectedTalk=talks[Number(day)-1]||talks[0];expositor=false;go('talk');};
window.consumeSgaeReopenCharlas=()=>{const v=reopenCharlasInLib;reopenCharlasInLib=false;return v;};
window.goBackFromTalk=()=>{const target=lastTalkSource&&lastTalkSource!=='talk'?lastTalkSource:'library';if(target==='library')reopenCharlasInLib=true;expositor=false;go(target);};
window.getSgaeFavorites=()=>read('favorites');
window.saveSgaeFavorites=items=>save('favorites',items);
const read=(k,fallback=[])=>{try{return JSON.parse(localStorage.getItem('sgae-'+k))??fallback}catch{return fallback}};
const save=(k,v)=>localStorage.setItem('sgae-'+k,JSON.stringify(v));
const ROLES=['Trabajador','Supervisor','Gerente General'];
const ROLE_META={
  'Trabajador':{
    badge:'Operativo en campo',
    tone:'worker',
    permissions:['Consultar ECOGUÍA AL DÍA, afiches, cartillas y hojas MSDS','Revisar charlas diarias y registrar asistencia en este dispositivo','Reportar peligros, condiciones subestándar y observaciones ambientales','Completar check list preoperacional antes de operar equipos'],
    restrictions:['No puede aprobar, cambiar estado ni cerrar observaciones de otros','Modo Expositor de guardia reservado a Supervisor / Gerente General','No puede exportar consolidados CSV ni publicar comunicados gerenciales'],
    can:{readLibrary:true,reportHazards:true,preop:true,verifyHazards:false,exposeTalk:false,exportCsv:false,publishNotice:false,executiveDashboard:false}
  },
  'Supervisor':{
    badge:'Supervisión de guardia',
    tone:'supervisor',
    permissions:['Todas las funciones operativas del Trabajador en ECOGUÍA AL DÍA','Habilitar Modo Expositor para dirigir las charlas diarias de guardia','Cambiar estado (En proceso / Verificado) y registrar acción correctiva','Exportar reporte CSV de observaciones de su guardia o frente'],
    restrictions:['No puede publicar Comunicados Preventivos Institucionales de Gerencia','Sin acceso al tablero ejecutivo global de Gerencia General'],
    can:{readLibrary:true,reportHazards:true,preop:true,verifyHazards:true,exposeTalk:true,exportCsv:true,publishNotice:false,executiveDashboard:false}
  },
  'Gerente General':{
    badge:'Dirección y control integral',
    tone:'executive',
    permissions:['Acceso total a ECOGUÍA AL DÍA, charlas, reportes y supervisión','Validar, cerrar o auditar observaciones y exportar reportes gerenciales CSV','Ver indicadores globales de cierre por prioridad y cumplimiento SSOMA','Publicar o retirar Comunicados Preventivos visibles en toda la plataforma'],
    restrictions:['Sin restricciones: control operativo, de supervisión y gerencial habilitado'],
    can:{readLibrary:true,reportHazards:true,preop:true,verifyHazards:true,exposeTalk:true,exportCsv:true,publishNotice:true,executiveDashboard:true}
  }
};
function normalizeRole(raw){
  if(raw==='Gerencia')return 'Gerente General';
  if(raw==='Responsable SSOMA')return 'Supervisor';
  return ROLES.includes(raw)?raw:'Trabajador';
}
function getSession(){
  const rawName=localStorage.getItem('sgae-user');
  const stored=read('session',null);
  if(!rawName&&!stored?.name)return null;
  const name=(stored?.name||rawName||'').trim();
  const code=(stored?.code||'').trim();
  const sede=(stored?.sede||'').trim();
  if(!name||!code||!sede)return null;
  const role=normalizeRole(stored?.role||localStorage.getItem('sgae-role')||'Trabajador');
  return {name,role,sede,code,loggedAt:stored?.loggedAt||''};
}
function setSession(data){
  const role=normalizeRole(data.role);
  const session={name:(data.name||'').trim(),role,sede:(data.sede||'Santa María').trim(),code:(data.code||'').trim(),loggedAt:new Date().toLocaleString('es-PE')};
  localStorage.setItem('sgae-user',session.name);
  localStorage.setItem('sgae-role',session.role);
  save('session',session);
  return session;
}
function clearSession(){
  localStorage.removeItem('sgae-user');
  localStorage.removeItem('sgae-role');
  localStorage.removeItem('sgae-session');
  expositor=false;
  document.body.classList.remove('expositor');
}
function canDo(perm){
  const s=getSession();
  if(!s)return false;
  return Boolean(ROLE_META[s.role]?.can?.[perm]);
}
const GUEST_ROUTES=['login','about','activities','dynamics'];
function isRouteAllowed(route){
  if(getSession())return true;
  return GUEST_ROUTES.includes(route);
}
window.getSgaeSession=getSession;
window.sgaeCan=canDo;
window.sgaeRead=read;
window.sgaeSave=save;
window.isSgaeRouteAllowed=isRouteAllowed;
const user=()=>getSession()?.name||null;
function escHtml(s){return String(s??'').replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;').replaceAll('"','&quot;');}
function dropletSvg(){
  return `<svg class="sgae-droplet-svg" viewBox="0 0 64 64" width="32" height="32" aria-hidden="true">
    <defs>
      <linearGradient id="sgaeDropWater" x1="20%" y1="6%" x2="78%" y2="92%">
        <stop offset="0%" stop-color="#69e2ff"/>
        <stop offset="52%" stop-color="#119fe0"/>
        <stop offset="100%" stop-color="#056db3"/>
      </linearGradient>
      <linearGradient id="sgaeDropLeaf" x1="15%" y1="20%" x2="88%" y2="88%">
        <stop offset="0%" stop-color="#87dc43"/>
        <stop offset="100%" stop-color="#168644"/>
      </linearGradient>
    </defs>
    <path d="M32 4C22 18 12 29.5 12 40.8C12 52 21 60 32 60C43 60 52 52 52 40.8C52 29.5 42 18 32 4Z" fill="url(#sgaeDropWater)"/>
    <path d="M23.5 23.5C18.5 30 16.5 36.5 17.5 42.5C18.3 46.8 20.8 49.5 23 50.8C20.5 44.8 20.6 35.8 23.5 23.5Z" fill="#d9f7ff" opacity=".78"/>
    <path d="M29 56.5C37.5 55.2 46.5 48.2 49.6 36.8C49.9 35.7 48.5 35.2 47.7 36C41.5 42.3 33.4 45.2 26.8 46.4C29.8 49.8 30.8 53.3 29 56.5Z" fill="url(#sgaeDropLeaf)"/>
    <path d="M27.6 52.8C34.2 48.5 40.6 44 46.4 38.4" stroke="#e4fbba" stroke-width="1.6" stroke-linecap="round" fill="none" opacity=".82"/>
  </svg>`;
}
function logo(){
  return `<svg class="sgae-logo-svg" viewBox="0 0 76 76" width="52" height="52" role="img" aria-label="Logo SGAE">
    <defs>
      <linearGradient id="sgaeLogoWater" x1="20%" y1="6%" x2="78%" y2="92%">
        <stop offset="0%" stop-color="#69e2ff"/>
        <stop offset="52%" stop-color="#119fe0"/>
        <stop offset="100%" stop-color="#056db3"/>
      </linearGradient>
      <linearGradient id="sgaeLogoLeaf" x1="15%" y1="20%" x2="88%" y2="88%">
        <stop offset="0%" stop-color="#87dc43"/>
        <stop offset="100%" stop-color="#168644"/>
      </linearGradient>
    </defs>
    <path d="M38 4C28.6 17.4 19.5 28 19.5 38.2C19.5 48.6 27.8 56 38 56C48.2 56 56.5 48.6 56.5 38.2C56.5 28 47.4 17.4 38 4Z" fill="url(#sgaeLogoWater)"/>
    <path d="M30 22.4C25.6 28.4 23.8 34.4 24.6 40C25.3 43.8 27.4 46.3 29.4 47.5C27.2 42 27.3 33.8 30 22.4Z" fill="#d9f7ff" opacity=".8"/>
    <path d="M34.8 52.8C42.6 51.6 51.2 45 54.1 34.4C54.4 33.4 53.1 32.9 52.3 33.7C46.4 39.6 38.8 42.3 32.8 43.4C35.6 46.5 36.5 49.8 34.8 52.8Z" fill="url(#sgaeLogoLeaf)"/>
    <path d="M33.6 49.3C39.8 45.4 45.8 41.2 51.1 35.9" stroke="#e4fbba" stroke-width="1.5" stroke-linecap="round" fill="none" opacity=".84"/>
    <text class="sgae-logo-word" x="38" y="71.5" text-anchor="middle" font-family="Manrope, sans-serif" font-weight="800" font-size="14.5" letter-spacing="1.4" fill="#5b7f1e">SGAE</text>
  </svg>`;
}
window.sgaeDropletSvg=dropletSvg;
window.sgaeLogoSvg=logo;
function gerenciaBanner(){
  const n=read('gerencia-notice',null);
  if(!n?.text)return '';
  return `<div class="gerencia-banner" role="region" aria-label="Comunicado de Gerencia General"><strong>COMUNICADO GERENCIA GENERAL:</strong> <span>${escHtml(n.text)}</span><small>${escHtml(n.author||'Gerencia')} · ${escHtml(n.when||'')}</small></div>`;
}
function header(){
  const s=getSession();
  const ecoActive=page==='library'||page==='calendar'||page==='talk';
  const roleShort=s?(s.role==='Gerente General'?'Gerente':s.role):'';
  const navMarkup=s
    ?`<a class="nav-item ${page==='home'?'is-active':''}" ${page==='home'?'aria-current="page"':''} href="#inicio" data-page="home">Inicio</a>
      <a class="nav-item ${page==='about'?'is-active':''}" ${page==='about'?'aria-current="page"':''} href="#nosotros" data-page="about">Quiénes somos</a>
      <a class="nav-item ${page==='activities'?'is-active':''}" ${page==='activities'?'aria-current="page"':''} href="#actividades" data-page="activities">Nuestras actividades</a>
      <a class="nav-item ${ecoActive?'is-active':''}" ${ecoActive?'aria-current="page"':''} href="#ecoguia" data-page="library">ECOGUÍA AL DÍA</a>`
    :`<a class="nav-item is-locked" href="#acceso" data-page="home" title="Requiere registro de personal SGAE S.A.C.">🔒 Inicio</a>
      <a class="nav-item ${page==='about'?'is-active':''}" ${page==='about'?'aria-current="page"':''} href="#nosotros" data-page="about">Quiénes somos</a>
      <a class="nav-item ${page==='activities'?'is-active':''}" ${page==='activities'?'aria-current="page"':''} href="#actividades" data-page="activities">Nuestras actividades</a>
      <a class="nav-item ${page==='dynamics'?'is-active':''}" ${page==='dynamics'?'aria-current="page"':''} href="#dinamicas" data-page="dynamics">Retos y Juegos</a>
      <a class="nav-item is-locked" href="#acceso" data-page="library" title="Requiere registro de personal SGAE S.A.C.">🔒 ECOGUÍA AL DÍA</a>`;
  return `<div class="topline"><span><i class="status-dot"></i> Plataforma de aprendizaje y prevención</span><span>SERVICIOS DE GESTIÓN AMBIENTAL EIZAGUIRRE S.A.C.</span></div>${gerenciaBanner()}<header class="navbar"><a class="brand" href="#inicio" data-page="${s?'home':'login'}">${logo()}<span class="brand-name">Conecta SGAE<small>Información que conecta,<br>prevención que protege</small></span></a><nav class="navlinks ${mobileOpen?'open':''}">${navMarkup}</nav><div class="nav-actions"><button class="btn btn-primary" data-page="${s?'dashboard':'login'}">${s?`Mi espacio (${escHtml(roleShort)})`:'Acceso usuarios'} <span>↗</span></button><button class="mobile-toggle" aria-label="Abrir menú">☰</button></div></header>`;
}
function footer(){
  const s=getSession();
  return `<footer class="footer"><div class="footer-inner"><div><a class="brand" href="#inicio" data-page="${s?'home':'login'}">${logo()}<span class="brand-name">Conecta SGAE<small>Información que conecta,<br>prevención que protege</small></span></a><p>Plataforma educativa para la prevención ambiental.</p></div><nav class="footer-links"><a href="#inicio" data-page="${s?'home':'login'}">${s?'Inicio':'Acceso usuarios'}</a><a href="#nosotros" data-page="about">Quiénes somos</a><a href="#actividades" data-page="activities">Lo que cobra vida aquí</a><a href="#ecoguia" data-page="library">${s?'ECOGUÍA AL DÍA':'🔒 ECOGUÍA AL DÍA'}</a></nav></div><div class="divider"></div><p class="copyright">© 2026 SERVICIOS DE GESTIÓN AMBIENTAL EIZAGUIRRE S.A.C. · Plataforma de apoyo para la cultura preventiva.</p><p class="footer-credit">Diseñado por Ing. Braulio Diaz</p></footer>`;
}

const DEFAULT_CSST={
  period:'Comité Paritario de Seguridad y Salud en el Trabajo · SGAE S.A.C.',
  summary:'Vela por el cumplimiento del RISSO, participa en inspecciones de campo, analiza reportes de peligros y promueve condiciones seguras en cada frente.',
  nextMeeting:'Reunión ordinaria mensual · Verificación de planes de acción e IPERC en campo',
  members:[
    {role:'Presidente CSST (Empleador)',name:'Gerencia General SGAE S.A.C.',sede:'Sede Central'},
    {role:'Secretario(a) / Coordinación SSOMAC',name:'Coordinación SSOMAC',sede:'Supervisión Operativa'},
    {role:'Representante de Trabajadores (Titular)',name:'Delegado de Operaciones Campo 01',sede:'Santa María / Vijus'},
    {role:'Representante de Trabajadores (Titular)',name:'Delegado de Operaciones Campo 02',sede:'Paraíso / Hualanga'}
  ]
};
const DEFAULT_SAFE_WORKER={
  month:'Mes vigente 2026',
  name:'Por asignar (Gerencia / Supervisión)',
  role:'Trabajador / Supervisor de Campo',
  sede:'Santa María',
  citation:'Por su compromiso ejemplar con el autocuidado, cumplimiento riguroso de PETS e IPERC, orden COLPA y protección del entorno durante el mes.',
  photo:''
};
const DEFAULT_CUSTOM_CARD={
  tag:'CAMPAÑA / INICIATIVA SGAE',
  icon:'✦',
  title:'ESPACIO DISPONIBLE · GESTIÓN SGAE',
  subtitle:'Módulo flexible para campañas, metas o avisos gerenciales.',
  body:'Este espacio está reservado para campañas especiales de seguridad, metas mensuales de reforestación, reconocimientos adicionales o lineamientos definidos por Supervisión o Gerencia General.'
};
function getCsstData(){
  const saved=read('csst',null);
  return saved&&Array.isArray(saved.members)?saved:DEFAULT_CSST;
}
function getSafeWorkerData(){
  const saved=read('safe-worker',null);
  return saved&&saved.name?saved:DEFAULT_SAFE_WORKER;
}
function getCustomCardData(){
  const saved=read('custom-card',null);
  return saved&&saved.title?saved:DEFAULT_CUSTOM_CARD;
}

function quick(){
  const sw=getSafeWorkerData();
  const cc=getCustomCardData();
  const swAvatar=sw.photo
    ?`<img src="${sw.photo}" alt="${escHtml(sw.name)}" class="quick-worker-thumb">`
    :`<span class="quick-icon">🏆</span>`;
  return `<div class="section" style="padding-top:18px;padding-bottom:30px">
    <div class="quick-grid">
      <button type="button" class="quick-card" data-open-csst>
        <span class="quick-icon">🛡</span>
        <span>
          <strong>COMITÉ DE SEGURIDAD Y SALUD (CSST)</strong>
          <small>Integrantes, funciones y actas del comité paritario.</small>
        </span>
      </button>
      <button type="button" class="quick-card quick-card-safeworker" data-open-safeworker>
        ${swAvatar}
        <span>
          <strong>TRABAJADOR MÁS SEGURO DEL MES</strong>
          <small><b>${escHtml(sw.name)}</b> · ${escHtml(sw.sede)} · Diploma Virtual 🎓</small>
        </span>
      </button>
      <a class="quick-card" href="#reportar" data-page="report">
        <span class="quick-icon">⚑</span>
        <span>
          <strong>REPORTAR PELIGROS Y OBSERVACIONES</strong>
          <small>Registra actos, condiciones subestándar o ambiente en campo.</small>
        </span>
      </a>
      <button type="button" class="quick-card" data-open-customcard>
        <span class="quick-icon">${escHtml(cc.icon||'✦')}</span>
        <span>
          <strong>${escHtml(cc.title)}</strong>
          <small>${escHtml(cc.subtitle)}</small>
        </span>
      </button>
    </div>
  </div>`;
}
function home(){return `<main><section class="hero"><div class="hero-card"><div class="hero-content"><span class="eyebrow">Nuestra cultura preventiva</span><h1>SEGURIDAD,<br>SALUD Y MEDIO<br>AMBIENTE</h1><p>Aprendiendo, previniendo y cuidando nuestro entorno en cada jornada. Una plataforma operativa de Servicios de Gestión Ambiental Eizaguirre S.A.C.</p><div class="hero-ctas"><button class="btn btn-white" data-page="about">CONOCER SGAE <b>→</b></button><button class="btn btn-outline" data-page="activities">LO QUE COBRA VIDA AQUÍ</button></div></div><div class="hero-kpis"><div class="kpi-mini"><strong>365</strong><small>días para aprender</small></div><div class="kpi-mini"><strong>3</strong><small>pilares preventivos</small></div><div class="kpi-mini"><strong>1</strong><small>equipo que se cuida</small></div></div></div></section>${quick()}<section class="section" id="nosotros"><div class="section-head"><div><span class="eyebrow" style="color:var(--green)">Nuestro compromiso</span><h2>Cultura preventiva en acción</h2></div><p>Personas seguras, operaciones responsables y un entorno cuidado.</p></div><div class="pillars"><article class="pillar"><span class="pillar-symbol">⬡</span><div><h3>SEGURIDAD</h3><p>Identificamos peligros, evaluamos riesgos y aplicamos controles en nuestras tareas.</p></div></article><article class="pillar"><span class="pillar-symbol">♡</span><div><h3>SALUD</h3><p>Promovemos espacios de trabajo saludables y protegemos a nuestros colaboradores.</p></div></article><article class="pillar"><span class="pillar-symbol">♧</span><div><h3>MEDIO AMBIENTE</h3><p>Cuidamos los recursos naturales y practicamos una gestión ambiental responsable.</p></div></article></div></section><section class="section" style="padding-top:5px"><div class="talk-feature"><div class="talk-copy"><span class="eyebrow">Charla diaria en ECOGUÍA AL DÍA · 6 min</span><h2>${talks[0].title}</h2><p>Una conversación práctica para preparar el trabajo, anticipar riesgos y cuidar a todo el equipo.</p><button class="btn btn-white" data-page="talk">ABRIR CHARLA <b>→</b></button></div><div class="talk-image"></div></div></section></main>`}
function pageHead(title,desc,action=''){return `<div class="page-title-row"><div><a class="back-link" data-page="${getSession()?'home':'login'}">← Volver al ${getSession()?'inicio':'acceso'}</a><h1>${title}</h1><p>${desc}</p></div>${action}</div>`}
function dashboard(){
  const s=getSession();
  if(!s){return login();}
  const meta=ROLE_META[s.role]||ROLE_META['Trabajador'];
  const hazards=read('hazards'),att=read('attended');
  const verifiedCount=hazards.filter(x=>x.status==='Verificado').length;
  const highPending=hazards.filter(x=>x.priority==='Alta'&&x.status!=='Verificado').length;
  const closurePct=hazards.length?Math.round((verifiedCount/hazards.length)*100):100;
  const activeNotice=read('gerencia-notice',null);

  const supervisorPanel=canDo('verifyHazards')?`<section class="panel" style="grid-column:1/-1"><div class="panel-title"><h2>Supervisión de guardia · Gestión y verificación de hallazgos</h2><span class="tag">${s.role}</span></div><p style="font-size:12px;color:var(--muted);margin-bottom:12px">Como <b>${escHtml(s.role)}</b> puedes pasar observaciones a "En proceso", registrar la acción correctiva aplicada o marcarlas como "Verificado".</p><div class="supervisor-hazard-list">${hazards.length?hazards.slice().reverse().map((x,revIdx)=>{const realIdx=hazards.length-1-revIdx;return `<article class="supervisor-hazard-card"><div><strong>${escHtml(x.area)} · ${escHtml(x.type)}</strong><small>Prioridad: <b>${escHtml(x.priority||'Media')}</b> · Reportado por: ${escHtml(x.reporter||'Equipo en campo')} (${escHtml(x.when)})</small><p>${escHtml(x.description)}</p>${x.correctiveNote?`<p class="corrective-note-saved"><b>Acción verificada:</b> ${escHtml(x.correctiveNote)}</p>`:''}</div><div class="supervisor-hazard-actions"><span class="tag">${escHtml(x.status||'Registrado')}</span><button type="button" class="btn btn-outline" data-hazard-status="${realIdx}" data-new-status="En proceso">En proceso</button><button type="button" class="btn btn-primary" data-hazard-verify="${realIdx}">Verificar ✓</button></div></article>`;}).join(''):'<p style="font-size:12px;color:var(--muted)">No hay observaciones pendientes por revisar en este dispositivo.</p>'}</div></section>`:'';

  const gerenciaPanel=canDo('executiveDashboard')?`<section class="panel executive-panel" style="grid-column:1/-1"><div class="panel-title"><h2>Consola ejecutiva · Gerencia General</h2><span class="tag">Control integral SGAE</span></div><div class="stat-grid" style="grid-template-columns:repeat(4,1fr);margin-bottom:16px"><div class="stat-card"><span>Tasa de cierre SSOMA</span><strong>${closurePct}%</strong><small>${verifiedCount} de ${hazards.length} verificadas</small></div><div class="stat-card"><span>Prioridad Alta abierta</span><strong>${highPending}</strong><small>Requieren seguimiento</small></div><div class="stat-card"><span>Charlas revisadas</span><strong>${att.length}</strong><small>Meta anual 365 días</small></div><div class="stat-card"><span>Sede activa</span><strong style="font-size:16px">${escHtml(s.sede)}</strong><small>Unidad consultada</small></div></div><form id="gerenciaNoticeForm" class="gerencia-notice-form"><label for="gerenciaNoticeText"><b>Publicar comunicado preventivo institucional</b> (visible en la barra superior para Trabajadores y Supervisores)</label><div class="gerencia-notice-row"><input id="gerenciaNoticeText" name="noticeText" class="field" placeholder="Ej. Hoy viernes: reforzar inspección trimestral cinta ROJA y pausas de hidratación…" value="${escHtml(activeNotice?.text||'')}"><button type="submit" class="btn btn-primary">Publicar comunicado →</button>${activeNotice?.text?'<button type="button" class="btn btn-outline" data-action="clear-notice">Retirar</button>':''}</div></form><div style="margin-top:12px;display:flex;gap:10px;flex-wrap:wrap"><button type="button" class="btn btn-outline" data-action="export">Exportar reporte gerencial CSV ↓</button><button type="button" class="btn btn-quiet" data-page="indicators">Ver tablero de indicadores →</button></div></section>`:'';

  return `<main class="page-bg">${pageHead(`Mi espacio · ${escHtml(s.role)}`,`Sesión activa para ${escHtml(s.name)} (${escHtml(s.sede)}) · Código ${escHtml(s.code)}.`,`<div style="display:flex;gap:8px;flex-wrap:wrap"><button class="btn btn-outline" data-page="login">Cambiar puesto</button><button class="btn btn-quiet" data-action="logout">Cerrar sesión</button></div>`)}<div class="dashboard-grid"><section class="panel"><div class="panel-title"><h2>Permisos habilitados para ${escHtml(s.role)}</h2><span class="role-badge role-${meta.tone}">${meta.badge}</span></div><ul class="permission-list is-allowed">${meta.permissions.map(p=>`<li><span>✓</span>${p}</li>`).join('')}</ul><h3 style="font:700 12px Manrope;color:var(--muted);margin:14px 0 8px">Alcance restringido en este puesto</h3><ul class="permission-list is-locked">${meta.restrictions.map(r=>`<li><span>•</span>${r}</li>`).join('')}</ul></section><section class="panel"><div class="panel-title"><h2>Tu actividad y accesos</h2><span class="tag">${escHtml(s.sede)}</span></div><div class="stat-grid" style="margin-bottom:14px"><div class="stat-card"><span>Charlas revisadas</span><strong>${att.length}</strong><small>Registro local</small></div><div class="stat-card"><span>Reportes enviados</span><strong>${hazards.length}</strong><small>${verifiedCount} verificados</small></div></div><div class="list">${[['ECOGUÍA AL DÍA','Charlas diarias, herramientas, PAS, COLPA, residuos y MSDS','library'],['Charla diaria de hoy',talks[0].title,'talk'],['Reportar un peligro','Registra actos, condiciones o aspectos ambientales','report'],['Indicadores SSOMA','Consulta avance y exportaciones autorizadas','indicators']].map(x=>`<div class="list-row"><div><strong>${x[0]}</strong><small>${x[1]}</small></div><button class="btn btn-quiet" data-page="${x[2]}">Abrir →</button></div>`).join('')}</div></section><div id="engagementTrackerPanel" style="grid-column:1/-1"></div>${supervisorPanel}${gerenciaPanel}</div></main>`;
}
function talkPage(){
  const t=selectedTalk,done=read('attended').includes(t.day),canExpose=canDo('exposeTalk'),s=getSession();
  const returnLabels={library:'ECOGUÍA AL DÍA',calendar:'Calendario 365',home:'Inicio',dashboard:'Mi espacio'};
  const backLabel=returnLabels[lastTalkSource]||'ECOGUÍA AL DÍA';
  const exposeBtn=`<button class="btn ${canExpose?'btn-outline':'btn-quiet'}" data-action="expositor" title="${canExpose?'Activar vista de proyección para guardia':'Requiere acceso como Supervisor o Gerente General'}">${canExpose?(expositor?'Salir del expositor':'Modo expositor ▣'):'🔒 Modo expositor (Supervisor)'}</button>`;
  const topNav=`<div style="display:flex;gap:8px;flex-wrap:wrap"><button class="btn btn-outline" data-action="go-back-talk">← Retroceder a ${backLabel}</button><button class="btn btn-quiet" data-page="calendar">Calendario 365 ▦</button>${exposeBtn}</div>`;
  return `<main class="page-bg"><div class="page-title-row"><div><button type="button" class="back-link back-link-btn" data-action="go-back-talk">← Retroceder a ${backLabel}</button><h1>${expositor?'Modo expositor':`Charla diaria · Día ${t.day}`}</h1><p>Mes: <b>${t.monthName}</b> (${t.date}) · ${t.category} · ${t.duration} minutos</p></div>${topNav}</div>${!s||!canExpose?`<div class="notice">Estás viendo la charla en modo <b>${escHtml(s?.role||'Consulta')}</b>. Para activar el <b>Modo expositor</b> en guardia inicia sesión en <b>Acceso usuarios</b> como Supervisor o Gerente General.</div>`:''}<div class="dashboard-grid"><section class="panel talk-detail" style="grid-column:span 2"><div class="talk-layout"><div class="talk-header-copy"><span class="tag">${t.monthName} · ${t.isMotivational?'Charla motivacional':t.category}</span><h3 style="font-size:27px;margin-top:12px">${t.title}</h3><div class="talk-data"><span>▦ Mes: ${t.monthName} (${t.date})</span><span>◷ ${t.duration} minutos</span><span>♧ ${capitalize(t.activity)}</span><span>▣ ${t.isMotivational?'Dinámica de equipo':'Charla diaria SSOMA'}</span></div><h3 style="font-size:15px;margin-top:18px">Objetivo</h3><p>${t.objective}</p><h3 style="font-size:15px;margin-top:14px">Conversación inicial</h3><p style="margin-bottom:0">${t.intro}</p></div><img src="./assets/photos/operacion-1.jpeg" alt="Actividad de campo SGAE" style="width:100%;height:100%;object-fit:cover;border-radius:12px"><div class="talk-body-full"><div class="talk-lists-grid"><div class="talk-info-card"><h3>Peligros que debemos observar</h3><ul>${t.hazards.map(x=>`<li>${x}</li>`).join('')}</ul></div><div class="talk-info-card"><h3>Controles para la tarea</h3><ol>${t.controls.map(x=>`<li>${x}</li>`).join('')}</ol></div></div><div class="notice">Ejemplo práctico: antes de comenzar, cada integrante señala un peligro visible y propone un control que el equipo pueda comprobar.</div><div class="talk-closing-grid"><div class="talk-info-card"><h3>Pensemos en equipo</h3><p>¿Qué condición podría cambiar hoy durante esta actividad? ¿Qué haríamos si el control previsto deja de ser suficiente?</p></div><div class="talk-info-card"><h3>Compromiso del día</h3><p>Hoy observaré mi área, aplicaré los controles acordados y comunicaré cualquier cambio antes de continuar.</p></div></div><div class="talk-buttons"><button class="btn btn-outline" data-action="go-back-talk">← Retroceder</button><button class="btn btn-primary" data-action="complete-talk">${done?'Charla revisada ✓':'Marcar charla revisada'}</button><button class="btn btn-outline" data-action="read-aloud">🔊 Escuchar contenido</button><button class="btn btn-outline" data-action="share">Compartir</button></div><p style="font-size:10px;color:var(--muted);margin-top:14px;margin-bottom:0">Material de apoyo general. Verifica siempre los procedimientos, el IPERC y las instrucciones vigentes de tu operación.</p></div></div></section><section class="panel" style="grid-column:span 2"><div class="panel-title"><h2>Pregunta de reflexión</h2><span class="tag">Dinámica grupal</span></div><p style="font-size:13px">Si observas que una herramienta de poda está deteriorada, ¿qué acción corresponde?</p><div class="quiz-option" data-answer="bad">Seguir trabajando con cuidado para no retrasar la tarea.</div><div class="quiz-option" data-answer="good">Retirarla de uso, comunicarlo al supervisor y usar una herramienta apta.</div><div id="quizFeedback" style="font-size:12px;color:var(--green);font-weight:700"></div></section></div></main>`;
}
function calendar(){return `<main class="page-bg">${pageHead('Calendario 365 · Charlas diarias','Charlas diarias organizadas por mes y tema dentro de ECOGUÍA AL DÍA. Selecciona cualquier día para abrir su contenido.','<button class="btn btn-outline" data-page="library">← Volver a ECOGUÍA AL DÍA</button>')}<div class="filters"><input id="searchTalk" class="field" placeholder="Buscar una charla o actividad…"><select id="categoryFilter" class="field"><option value="">Todas las categorías</option>${[...new Set(talks.map(t=>t.category))].map(c=>`<option>${c}</option>`).join('')}</select><select id="monthFilter" class="field"><option value="">Todo el año</option>${months.map((m,i)=>`<option value="${i}">${new Date(2026,i,1).toLocaleDateString('es-PE',{month:'long'})}</option>`).join('')}</select></div><div id="talkList" class="talk-list"></div></main>`}
function renderTalks(){let q=(document.querySelector('#searchTalk')?.value||'').toLowerCase(),cat=document.querySelector('#categoryFilter')?.value||'',mo=document.querySelector('#monthFilter')?.value??'';let filtered=talks.filter(t=>t.title.toLowerCase().includes(q)||t.activity.includes(q)).filter(t=>!cat||t.category===cat).filter(t=>mo===''||Math.floor((t.day-1)/30.42)===+mo).slice(0,60);let el=document.querySelector('#talkList');if(el)el.innerHTML=filtered.map(t=>`<article class="talk-row" data-talk="${t.day}"><span class="day-badge">${t.day}</span><div style="flex:1"><h3>${t.title}</h3><p>${t.category} · ${t.duration} min · ${t.activity}</p><a class="text-link" data-talk="${t.day}">Abrir charla →</a></div><button class="btn btn-quiet" data-favorite="${t.day}" title="Guardar favorita">${read('favorites').includes(t.day)?'★':'☆'}</button></article>`).join('')||'<p>No encontramos charlas con esos filtros.</p>';}
function report(){
  const s=getSession();
  return `<main class="page-bg">${pageHead('Reportar un peligro','Tu observación ayuda a prevenir. Evita incluir información personal innecesaria.')}<div class="dashboard-grid"><section class="panel report-form"><div class="panel-title"><h2 style="font:700 16px Manrope">Nueva observación</h2><span class="tag">${s?`${escHtml(s.role)} · ${escHtml(s.name)}`:'Registro de campo'}</span></div><form id="hazardForm"><div class="form-grid"><div class="form-field"><label>Área o ubicación</label><input name="area" required placeholder="Ej. Vivero norte" value="${s?.sede?`${escHtml(s.sede)} · `:''}"></div><div class="form-field"><label>Actividad relacionada</label><select name="activity">${activitiesShort.map(x=>`<option>${capitalize(x)}</option>`).join('')}</select></div><div class="form-field"><label>Tipo de peligro</label><select name="type"><option>Condición subestándar</option><option>Acto subestándar</option><option>Aspecto ambiental</option><option>Otro peligro</option></select></div><div class="form-field"><label>Prioridad observada</label><select name="priority"><option>Por evaluar</option><option>Alta</option><option>Media</option><option>Baja</option></select></div><div class="form-field full"><label>¿Qué observaste?</label><textarea name="description" required placeholder="Describe la condición y dónde se encuentra…"></textarea></div><div class="form-field full"><label>Control preventivo sugerido (opcional)</label><textarea name="control" placeholder="¿Qué ayudaría a controlar este peligro?"></textarea></div><div class="form-field full"><label>Fotografía (opcional)</label><input name="photo" type="file" accept="image/*" capture="environment"></div></div><div class="notice">Comunica de inmediato los peligros críticos al supervisor y sigue el procedimiento de la operación.</div><button class="btn btn-primary" type="submit">Guardar observación →</button></form></section><section class="panel"><div class="panel-title"><h2>Observaciones registradas</h2><span class="tag">${canDo('verifyHazards')?'Modo supervisión activo':'Solo lectura'}</span></div><div id="hazardList"></div></section></div></main>`;
}
function hazardsRefresh(){
  let el=document.querySelector('#hazardList');
  if(!el)return;
  let h=read('hazards');
  const canVerify=canDo('verifyHazards');
  if(!h.length){
    el.innerHTML='<p style="font-size:12px;color:var(--muted)">Aún no hay observaciones guardadas.</p>';
    return;
  }
  el.innerHTML=(!canVerify?'<div class="role-lock-note">Nota de permisos: como Trabajador puedes registrar hallazgos. Solo <b>Supervisor</b> o <b>Gerente General</b> puede cambiar su estado o cerrarlos.</div>':'')+h.slice().reverse().map((x,revIdx)=>{
    const realIdx=h.length-1-revIdx;
    return `<div class="list-row" style="align-items:flex-start"><div><strong>${escHtml(x.area)} · ${escHtml(x.type)}</strong><small>${escHtml(x.description.slice(0,110))}${x.description.length>110?'…':''}<br>${escHtml(x.reporter||'Campo')} · ${escHtml(x.when)}</small>${x.correctiveNote?`<small style="color:var(--green)"><b>Verificación:</b> ${escHtml(x.correctiveNote)}</small>`:''}${canVerify?`<div style="display:flex;gap:6px;flex-wrap:wrap;margin-top:8px"><button type="button" class="btn btn-outline" style="padding:5px 9px;font-size:10px" data-hazard-status="${realIdx}" data-new-status="En proceso">En proceso</button><button type="button" class="btn btn-primary" style="padding:5px 9px;font-size:10px" data-hazard-verify="${realIdx}">Verificar ✓</button></div>`:''}</div><span class="tag">${escHtml(x.status||'Registrado')}</span></div>`;
  }).join('');
}
function dynamics(){return `<main class="page-bg">${pageHead('Dinámica preventiva','Conversen en equipo, identifiquen el riesgo y acuerden una respuesta segura.')}<div class="dashboard-grid"><section class="panel"><span class="tag">¿QUÉ HARÍAS TÚ?</span><h2 style="font:800 22px Manrope;margin:16px 0">El terreno alrededor de una zona de plantación está húmedo y una persona va a trasladar herramientas.</h2><p style="font-size:13px;color:var(--muted)">Comenten: ¿qué peligros observan?, ¿qué controles aplicarían antes de trasladar el equipo?</p><div class="quiz-option" data-dyn="1">Continuar rápidamente para terminar antes de que llueva.</div><div class="quiz-option" data-dyn="2">Revisar la ruta, asegurar una superficie estable y trasladar la carga de forma controlada.</div><div class="quiz-option" data-dyn="3">Pedir a una sola persona que lleve todas las herramientas.</div><div id="dynamicFeedback" class="notice" style="display:none"></div></section><section class="panel"><div class="panel-title"><h2>Reto ambiental del equipo</h2></div><p style="font-size:13px;line-height:1.7;color:var(--muted)">Al terminar la jornada, identifiquen una oportunidad para evitar desperdicio de agua en el sistema de riego y acuerden una acción comprobable.</p><button class="btn btn-primary" data-action="challenge">Registrar reto completado ✓</button></section></div></main>`}
function library(){return `<main class="page-bg">${pageHead('ECOGUÍA AL DÍA','Charlas diarias, herramientas de gestión de seguridad, PMA, respuesta ante emergencias PAS, COLPA, residuos, MSDS y observación ambiental.')}<div class="filters"><input class="field" id="docSearch" placeholder="Buscar charla, estándar, PETS, reglamento, PMA, COLPA, residuo, MSDS, sede…"><select class="field" id="docFilter"><option value="">Todas las categorías</option><option>Charlas diarias SSOMA</option><option>Herramientas de gestión</option><option>Gestión ambiental (PMA)</option><option>Respuesta ante emergencias</option><option>COLPA · Orden y limpieza</option><option>Residuos en campo</option><option>Productos químicos · MSDS</option><option>Formatos operativos</option><option>Observación ambiental</option></select></div><div id="documents" class="library-folders-host" hidden></div><div id="libraryEmptyMsg" class="empty-folder-card" hidden><strong>Sin coincidencias en ECOGUÍA AL DÍA</strong><p>Prueba otra palabra clave o selecciona "Todas las categorías" para ver todos los módulos disponibles.</p></div><div class="notice">Revisa el resumen visual de cada documento y confirma tu comprensión antes de descargar documentos oficiales vigentes.</div></main>`}
function indicators(){
  let h=read('hazards'),a=read('attended');
  const s=getSession(),canExport=canDo('exportCsv'),isExec=canDo('executiveDashboard');
  return `<main class="page-bg">${pageHead('Indicadores SSOMA','Resumen calculado con la actividad registrada, el reto semanal y el nivel de acceso del usuario.')}<div class="stat-grid" style="grid-template-columns:repeat(4,1fr);margin-bottom:18px"><div class="stat-card"><span>Charlas disponibles</span><strong>365</strong><small>Contenido anual</small></div><div class="stat-card"><span>Charlas revisadas</span><strong>${a.length}</strong><small>Registros locales</small></div><div class="stat-card"><span>Observaciones</span><strong>${h.length}</strong><small>Reportes de campo</small></div><div class="stat-card"><span>Acciones verificadas</span><strong>${h.filter(x=>x.status==='Verificado').length}</strong><small>Cerradas por supervisión</small></div></div><div class="dashboard-grid"><section class="panel"><div class="panel-title"><h2>Charlas diarias por área temática</h2><span class="tag">365 días</span></div>${months.map((m,i)=>`<div style="display:flex;align-items:center;gap:12px;margin:14px 0;font-size:11px"><span style="width:190px">${m}</span><div style="height:8px;background:#edf3ef;border-radius:8px;flex:1"><div style="height:100%;width:${Math.round((talks.filter(t=>t.category===m).length/365)*300)}%;max-width:100%;background:${i%2?'#20a0a0':'#238052'};border-radius:8px"></div></div><strong>${talks.filter(t=>t.category===m).length}</strong></div>`).join('')}</section><section class="panel"><div class="panel-title"><h2>Exportar reporte CSV</h2><span class="tag">${s?escHtml(s.role):'Acceso requerido'}</span></div>${canExport?`<p style="font-size:12px;color:var(--muted);line-height:1.6">Descarga el consolidado de observaciones, estados y controles verificados en formato CSV.</p><button class="btn btn-primary" data-action="export">Exportar observaciones CSV ↓</button>`:`<div class="role-lock-box"><strong>🔒 Exportación restringida por cargo</strong><p>Tu perfil actual (<b>${escHtml(s?.role||'Visitante')}</b>) solo permite consultar indicadores. Inicia sesión en <b>Acceso usuarios</b> como <b>Supervisor</b> o <b>Gerente General</b> para exportar reportes CSV.</p><button class="btn btn-outline" data-page="login">Ir a Acceso usuarios →</button></div>`}${isExec?`<div class="notice" style="margin-top:14px"><b>Vista Gerente General:</b> tasa actual de verificación ${h.length?Math.round((h.filter(x=>x.status==='Verificado').length/h.length)*100):100}% · observaciones prioridad Alta pendientes: ${h.filter(x=>x.priority==='Alta'&&x.status!=='Verificado').length}.</div>`:''}</section><div id="engagementTrackerPanel" style="grid-column:1/-1"></div></div></main>`;
}
function login(){
  const s=getSession();
  const initialRole=s?.role||'Trabajador';
  const meta=ROLE_META[initialRole]||ROLE_META['Trabajador'];
  return `<main class="login-hero-stage"><canvas id="reforestCanvas" aria-hidden="true"></canvas><div class="login-hero-overlay" aria-hidden="true"></div><div class="login-hero-grid"><section class="login-brand-copy"><div class="login-brand-pill"><span class="login-pill-drop" aria-hidden="true">${dropletSvg()}</span><span>CONECTA SGAE · GESTIÓN AMBIENTAL</span></div><h1>Sembrando vida,<br><span>protegiendo cada paso</span></h1><p>Plataforma operativa de <strong>Servicios de Gestión Ambiental Eizaguirre S.A.C.</strong>. Regístrate con todos tus datos para acceder a <b>ECOGUÍA AL DÍA</b>, hojas MSDS de proveedores, herramientas SSOMA y reportes de campo. Como visitante puedes conocer nuestra empresa, nuestras actividades y participar en retos y juegos.</p><div class="login-guest-actions">${s?`<button type="button" class="btn btn-outline-light" data-page="home">Ir al inicio del portal →</button><button type="button" class="btn btn-ghost-light" data-page="activities">Nuestras actividades</button>`:`<button type="button" class="btn btn-outline-light" data-page="about">Explorar como visitante (Quiénes somos) →</button><button type="button" class="btn btn-ghost-light" data-page="activities">Nuestras actividades</button><button type="button" class="btn btn-ghost-light" data-open-games>SGAE GAME 🎮</button>`}</div></section><section class="panel login-glass-panel"><div class="login-form-head"><div class="login-logo-lockup">${logo()}</div><div><h1>Acceso usuarios SGAE</h1><p>Ingresa todos tus datos obligatorios para habilitar la plataforma</p></div></div><form id="loginForm"><div class="form-grid" style="margin-top:14px"><div class="form-field full"><label>Nombre y apellido *</label><input name="name" required placeholder="Ej. Juan Pérez" autocomplete="name" value="${escHtml(s?.name||'')}"></div><div class="form-field"><label>Cargo / Puesto autorizado *</label><select name="role" id="loginRoleSelect" required>${ROLES.map(r=>`<option value="${r}" ${r===initialRole?'selected':''}>${r}</option>`).join('')}</select></div><div class="form-field"><label>Sede / Unidad minera *</label><select name="sede" required>${['Santa María','Paraíso (Papagayo)','Vijus','Hualanga','Vivero / Sede Central'].map(u=>`<option value="${u}" ${u===(s?.sede||'Santa María')?'selected':''}>${u}</option>`).join('')}</select></div><div class="form-field full"><label>Código de trabajador / DNI *</label><input name="code" required minlength="4" placeholder="Ej. SGAE-042 o 71234567" value="${escHtml(s?.code||'')}"></div></div><div id="rolePermissionsPreview" class="role-preview-box"><strong>Permisos que se habilitarán para ${initialRole}:</strong><ul>${meta.permissions.map(p=>`<li>✓ ${p}</li>`).join('')}</ul></div><button class="btn btn-primary" style="width:100%;margin-top:14px">Ingresar con este cargo →</button></form></section></div></main>`;
}

function closeHomeModal(){
  document.getElementById('sgaeHomeModal')?.remove();
}
function resizePhotoFile(file,maxSide=420){
  return new Promise((resolve,reject)=>{
    const reader=new FileReader();
    reader.onerror=()=>reject(new Error('No se pudo leer la foto.'));
    reader.onload=()=>{
      const img=new Image();
      img.onerror=()=>reject(new Error('Formato de imagen inválido.'));
      img.onload=()=>{
        const scale=Math.min(1,maxSide/Math.max(img.width||1,img.height||1));
        const canvas=document.createElement('canvas');
        canvas.width=Math.max(1,Math.round(img.width*scale));
        canvas.height=Math.max(1,Math.round(img.height*scale));
        canvas.getContext('2d').drawImage(img,0,0,canvas.width,canvas.height);
        resolve(canvas.toDataURL('image/jpeg',0.85));
      };
      img.src=String(reader.result||'');
    };
    reader.readAsDataURL(file);
  });
}
function openCsstModal(){
  closeHomeModal();
  const data=getCsstData();
  const canEdit=canDo('verifyHazards');
  const html=`<div class="sgae-home-modal" id="sgaeHomeModal" role="dialog" aria-modal="true" aria-label="Comité de Seguridad y Salud en el Trabajo">
    <div class="sgae-home-dialog">
      <div class="sgae-home-head">
        <div>
          <span class="sgae-home-kicker">ÓRGANO PARITARIO · LEY N° 29783</span>
          <h2>Comité de Seguridad y Salud en el Trabajo (CSST)</h2>
        </div>
        <button type="button" class="btn btn-quiet" data-close-home-modal>Cerrar ✕</button>
      </div>
      <div class="sgae-home-body">
        <p class="sgae-home-lead"><strong>${escHtml(data.period)}</strong></p>
        <p style="font-size:13px;color:var(--muted);line-height:1.6">${escHtml(data.summary)}</p>
        <div class="csst-members-grid">
          ${data.members.map((m,i)=>`<article class="csst-member-card">
            <span class="csst-member-num">0${i+1}</span>
            <div>
              <small>${escHtml(m.role)}</small>
              <strong>${escHtml(m.name)}</strong>
              <span>${escHtml(m.sede)}</span>
            </div>
          </article>`).join('')}
        </div>
        <div class="notice"><strong>Próxima agenda del Comité:</strong> ${escHtml(data.nextMeeting)}</div>
        ${canEdit?`<details class="home-edit-drawer"><summary>✎ Actualizar integrantes y agenda del CSST (Supervisor / Gerencia)</summary>
          <form id="csstEditForm" class="home-edit-form">
            <div class="form-grid">
              <div class="form-field full"><label>Resumen / Periodo</label><input name="period" class="field" required value="${escHtml(data.period)}"></div>
              <div class="form-field full"><label>Agenda / Próxima reunión</label><input name="nextMeeting" class="field" required value="${escHtml(data.nextMeeting)}"></div>
              ${data.members.map((m,i)=>`<div class="form-field"><label>${escHtml(m.role)}</label><input name="mName${i}" class="field" required value="${escHtml(m.name)}"></div><div class="form-field"><label>Sede / Área</label><input name="mSede${i}" class="field" required value="${escHtml(m.sede)}"></div>`).join('')}
            </div>
            <button type="submit" class="btn btn-primary" style="margin-top:10px">Guardar integrantes del CSST ✓</button>
          </form>
        </details>`:''}
      </div>
    </div>
  </div>`;
  document.body.insertAdjacentHTML('beforeend',html);
  const modal=document.getElementById('sgaeHomeModal');
  modal.querySelector('[data-close-home-modal]')?.addEventListener('click',closeHomeModal);
  modal.addEventListener('click',ev=>{if(ev.target===modal)closeHomeModal();});
  modal.querySelector('#csstEditForm')?.addEventListener('submit',ev=>{
    ev.preventDefault();
    const fd=new FormData(ev.currentTarget);
    const updated={
      period:String(fd.get('period')||DEFAULT_CSST.period).trim(),
      summary:data.summary,
      nextMeeting:String(fd.get('nextMeeting')||DEFAULT_CSST.nextMeeting).trim(),
      members:data.members.map((m,i)=>({role:m.role,name:String(fd.get(`mName${i}`)||m.name).trim(),sede:String(fd.get(`mSede${i}`)||m.sede).trim()}))
    };
    save('csst',updated);
    toast('Información del CSST actualizada ✓');
    openCsstModal();
    render();
  });
}

async function downloadDiplomaPng(sw){
  const w=1400,h=980;
  const c=document.createElement('canvas');
  c.width=w;c.height=h;
  const ctx=c.getContext('2d');
  // Paper cream background
  const bg=ctx.createLinearGradient(0,0,w,h);
  bg.addColorStop(0,'#fcfdf9');
  bg.addColorStop(0.5,'#ffffff');
  bg.addColorStop(1,'#f2f9f4');
  ctx.fillStyle=bg;
  ctx.fillRect(0,0,w,h);
  // Outer deep forest border & gold inner trim
  ctx.strokeStyle='#114c3b';
  ctx.lineWidth=22;
  ctx.strokeRect(36,36,w-72,h-72);
  ctx.strokeStyle='#c9a33d';
  ctx.lineWidth=4;
  ctx.strokeRect(62,62,w-124,h-124);
  ctx.strokeStyle='#0d9fe0';
  ctx.lineWidth=2;
  ctx.strokeRect(72,72,w-144,h-144);
  // Header ribbon
  ctx.fillStyle='#114c3b';
  ctx.font='800 22px Manrope, sans-serif';
  ctx.textAlign='center';
  ctx.fillText('SERVICIOS DE GESTIÓN AMBIENTAL EIZAGUIRRE S.A.C.',w/2,148);
  ctx.fillStyle='#0d86c7';
  ctx.font='700 18px Manrope, sans-serif';
  ctx.fillText('SISTEMA DE GESTIÓN EN SEGURIDAD, SALUD OCUPACIONAL Y MEDIO AMBIENTE',w/2,182);
  ctx.fillStyle='#c9a33d';
  ctx.fillRect(w/2-180,202,360,3);
  ctx.fillStyle='#0e4736';
  ctx.font='800 54px Manrope, sans-serif';
  ctx.fillText('DIPLOMA DE RECONOCIMIENTO',w/2,276);
  ctx.fillStyle='#177354';
  ctx.font='800 26px Manrope, sans-serif';
  ctx.fillText('TRABAJADOR MÁS SEGURO DEL MES · '+String(sw.month||'').toUpperCase(),w/2,322);
  // Optional photo
  if(sw.photo){
    await new Promise(res=>{
      const im=new Image();
      im.onload=()=>{
        ctx.save();
        ctx.beginPath();
        ctx.arc(w/2,440,86,0,Math.PI*2);
        ctx.closePath();
        ctx.clip();
        ctx.drawImage(im,w/2-86,354,172,172);
        ctx.restore();
        ctx.strokeStyle='#c9a33d';
        ctx.lineWidth=5;
        ctx.beginPath();
        ctx.arc(w/2,440,88,0,Math.PI*2);
        ctx.stroke();
        res();
      };
      im.onerror=res;
      im.src=sw.photo;
    });
  }else{
    ctx.fillStyle='#e8f6ee';
    ctx.beginPath();
    ctx.arc(w/2,440,74,0,Math.PI*2);
    ctx.fill();
    ctx.strokeStyle='#c9a33d';
    ctx.lineWidth=4;
    ctx.stroke();
    ctx.fillStyle='#145c44';
    ctx.font='800 44px Manrope, sans-serif';
    ctx.fillText('SGAE',w/2,455);
  }
  ctx.fillStyle='#4a6158';
  ctx.font='600 22px sans-serif';
  ctx.fillText('Se otorga el presente diploma de honor a:',w/2,566);
  ctx.fillStyle='#0f3d30';
  ctx.font='800 48px Manrope, sans-serif';
  ctx.fillText(sw.name,w/2,626);
  ctx.fillStyle='#177354';
  ctx.font='700 24px Manrope, sans-serif';
  ctx.fillText(`${sw.role} · Sede ${sw.sede}`,w/2,668);
  // Wrap citation text
  ctx.fillStyle='#344a42';
  ctx.font='500 21px sans-serif';
  const words=String(sw.citation||'').split(/\s+/);
  let line='',y=720;
  for(const word of words){
    const test=line?`${line} ${word}`:word;
    if(ctx.measureText(test).width>980){ctx.fillText(line,w/2,y);line=word;y+=30;}
    else line=test;
  }
  if(line)ctx.fillText(line,w/2,y);
  // Signatures
  ctx.strokeStyle='#88a296';
  ctx.lineWidth=2;
  ctx.beginPath();ctx.moveTo(260,842);ctx.lineTo(540,842);ctx.stroke();
  ctx.beginPath();ctx.moveTo(860,842);ctx.lineTo(1140,842);ctx.stroke();
  ctx.fillStyle='#173d32';
  ctx.font='700 18px Manrope, sans-serif';
  ctx.fillText('GERENCIA GENERAL',400,872);
  ctx.fillText('COORDINACIÓN SSOMAC',1000,872);
  ctx.fillStyle='#5c756c';
  ctx.font='500 15px sans-serif';
  ctx.fillText('Servicios de Gestión Ambiental Eizaguirre S.A.C.',400,896);
  ctx.fillText('Comité de Seguridad y Salud en el Trabajo',1000,896);
  const link=document.createElement('a');
  link.href=c.toDataURL('image/png');
  link.download=`Diploma_Trabajador_Seguro_${String(sw.name||'SGAE').replace(/[^\w\-]+/g,'_')}.png`;
  link.click();
}

function openSafeWorkerModal(){
  closeHomeModal();
  const sw=getSafeWorkerData();
  const canEdit=canDo('verifyHazards');
  let pendingPhoto=sw.photo||'';
  const photoHtml=sw.photo
    ?`<img src="${sw.photo}" alt="${escHtml(sw.name)}" class="diploma-photo-frame">`
    :`<div class="diploma-photo-placeholder"><span>🏆</span><small>SGAE S.A.C.</small></div>`;
  const html=`<div class="sgae-home-modal" id="sgaeHomeModal" role="dialog" aria-modal="true" aria-label="Trabajador Más Seguro del Mes y Diploma Virtual">
    <div class="sgae-home-dialog is-wide">
      <div class="sgae-home-head">
        <div>
          <span class="sgae-home-kicker">CULTURA PREVENTIVA · RECONOCIMIENTO MENSUAL</span>
          <h2>Trabajador Más Seguro del Mes · Diploma Virtual</h2>
        </div>
        <button type="button" class="btn btn-quiet" data-close-home-modal>Cerrar ✕</button>
      </div>
      <div class="sgae-home-body">
        <div class="sgae-diploma-sheet" id="sgaeDiplomaSheet">
          <div class="sgae-diploma-inner">
            <div class="diploma-top-brand">
              ${dropletSvg()}
              <div>
                <strong>SERVICIOS DE GESTIÓN AMBIENTAL EIZAGUIRRE S.A.C.</strong>
                <small>Sistema de Gestión en Seguridad, Salud Ocupacional y Medio Ambiente</small>
              </div>
            </div>
            <h3 class="diploma-heading">DIPLOMA DE RECONOCIMIENTO</h3>
            <span class="diploma-subpill">TRABAJADOR MÁS SEGURO DEL MES · ${escHtml(sw.month)}</span>
            <div class="diploma-person-row">
              ${photoHtml}
              <div class="diploma-person-copy">
                <span class="diploma-grant-label">Otorgado con orgullo a:</span>
                <h4>${escHtml(sw.name)}</h4>
                <p class="diploma-role-line">${escHtml(sw.role)} · Sede ${escHtml(sw.sede)}</p>
                <p class="diploma-citation">${escHtml(sw.citation)}</p>
              </div>
            </div>
            <div class="diploma-sign-row">
              <div><span></span><strong>GERENCIA GENERAL</strong><small>SGAE S.A.C.</small></div>
              <div class="diploma-seal-badge">★ SSOMA ★<small>Cero Incidentes</small></div>
              <div><span></span><strong>COORDINACIÓN SSOMAC</strong><small>CSST SGAE S.A.C.</small></div>
            </div>
          </div>
        </div>
        <div class="diploma-actions-bar">
          <button type="button" class="btn btn-primary" id="btnDownloadDiploma">Descargar Diploma (Imagen PNG) ↓</button>
          <button type="button" class="btn btn-outline" id="btnPrintDiploma">Imprimir Diploma 🖨️</button>
        </div>
        ${canEdit?`<details class="home-edit-drawer"><summary>✎ Designar / Actualizar Trabajador del Mes y fotografía (Supervisor / Gerencia)</summary>
          <form id="safeWorkerEditForm" class="home-edit-form">
            <div class="form-grid">
              <div class="form-field"><label>Nombre completo del colaborador</label><input name="name" class="field" required value="${escHtml(sw.name)}"></div>
              <div class="form-field"><label>Mes y año</label><input name="month" class="field" required value="${escHtml(sw.month)}"></div>
              <div class="form-field"><label>Cargo / Especialidad</label><input name="role" class="field" required value="${escHtml(sw.role)}"></div>
              <div class="form-field"><label>Sede / Unidad minera</label><select name="sede" class="field">${['Santa María','Paraíso (Papagayo)','Vijus','Hualanga','Vivero / Sede Central'].map(u=>`<option ${u===sw.sede?'selected':''}>${u}</option>`).join('')}</select></div>
              <div class="form-field full"><label>Motivo del reconocimiento</label><textarea name="citation" class="field" required>${escHtml(sw.citation)}</textarea></div>
              <div class="form-field full"><label>Fotografía del colaborador (opcional)</label><input id="swPhotoInput" type="file" accept="image/*" class="field"></div>
            </div>
            <div style="display:flex;gap:8px;flex-wrap:wrap;margin-top:10px">
              <button type="submit" class="btn btn-primary">Guardar y emitir Diploma Virtual ✓</button>
              ${sw.photo?'<button type="button" class="btn btn-outline" id="btnClearSwPhoto">Quitar foto</button>':''}
            </div>
          </form>
        </details>`:''}
      </div>
    </div>
  </div>`;
  document.body.insertAdjacentHTML('beforeend',html);
  const modal=document.getElementById('sgaeHomeModal');
  modal.querySelector('[data-close-home-modal]')?.addEventListener('click',closeHomeModal);
  modal.addEventListener('click',ev=>{if(ev.target===modal)closeHomeModal();});
  modal.querySelector('#btnDownloadDiploma')?.addEventListener('click',()=>{downloadDiplomaPng(sw);toast('Diploma Virtual descargado ✓');});
  modal.querySelector('#btnPrintDiploma')?.addEventListener('click',()=>window.print());
  modal.querySelector('#swPhotoInput')?.addEventListener('change',async ev=>{
    const file=ev.target.files?.[0];
    if(!file)return;
    try{pendingPhoto=await resizePhotoFile(file,420);toast('Fotografía lista para guardar en el diploma');}
    catch(err){toast(err.message||'No se pudo procesar la foto');}
  });
  modal.querySelector('#btnClearSwPhoto')?.addEventListener('click',()=>{
    pendingPhoto='';
    save('safe-worker',{...sw,photo:''});
    toast('Fotografía removida');
    openSafeWorkerModal();
    render();
  });
  modal.querySelector('#safeWorkerEditForm')?.addEventListener('submit',ev=>{
    ev.preventDefault();
    const fd=new FormData(ev.currentTarget);
    const updated={
      name:String(fd.get('name')||sw.name).trim(),
      month:String(fd.get('month')||sw.month).trim(),
      role:String(fd.get('role')||sw.role).trim(),
      sede:String(fd.get('sede')||sw.sede).trim(),
      citation:String(fd.get('citation')||sw.citation).trim(),
      photo:pendingPhoto
    };
    save('safe-worker',updated);
    toast('Trabajador Más Seguro del Mes actualizado ✓');
    openSafeWorkerModal();
    render();
  });
}

function openCustomCardModal(){
  closeHomeModal();
  const cc=getCustomCardData();
  const canEdit=canDo('verifyHazards');
  const html=`<div class="sgae-home-modal" id="sgaeHomeModal" role="dialog" aria-modal="true" aria-label="${escHtml(cc.title)}">
    <div class="sgae-home-dialog">
      <div class="sgae-home-head">
        <div>
          <span class="sgae-home-kicker">${escHtml(cc.tag)}</span>
          <h2>${escHtml(cc.icon)} ${escHtml(cc.title)}</h2>
        </div>
        <button type="button" class="btn btn-quiet" data-close-home-modal>Cerrar ✕</button>
      </div>
      <div class="sgae-home-body">
        <p class="sgae-home-lead">${escHtml(cc.subtitle)}</p>
        <div class="custom-card-body-box">${escHtml(cc.body)}</div>
        ${canEdit?`<details class="home-edit-drawer"><summary>✎ Configurar este espacio (Supervisor / Gerencia)</summary>
          <form id="customCardEditForm" class="home-edit-form">
            <div class="form-grid">
              <div class="form-field"><label>Etiqueta superior</label><input name="tag" class="field" required value="${escHtml(cc.tag)}"></div>
              <div class="form-field"><label>Ícono / Símbolo</label><input name="icon" class="field" maxlength="4" value="${escHtml(cc.icon)}"></div>
              <div class="form-field full"><label>Título del módulo</label><input name="title" class="field" required value="${escHtml(cc.title)}"></div>
              <div class="form-field full"><label>Subtítulo corto de tarjeta</label><input name="subtitle" class="field" required value="${escHtml(cc.subtitle)}"></div>
              <div class="form-field full"><label>Contenido / Aviso detallado</label><textarea name="body" class="field" required>${escHtml(cc.body)}</textarea></div>
            </div>
            <button type="submit" class="btn btn-primary" style="margin-top:10px">Guardar configuración ✓</button>
          </form>
        </details>`:'<div class="notice">Espacio informativo administrado por Supervisión y Gerencia General SGAE S.A.C.</div>'}
      </div>
    </div>
  </div>`;
  document.body.insertAdjacentHTML('beforeend',html);
  const modal=document.getElementById('sgaeHomeModal');
  modal.querySelector('[data-close-home-modal]')?.addEventListener('click',closeHomeModal);
  modal.addEventListener('click',ev=>{if(ev.target===modal)closeHomeModal();});
  modal.querySelector('#customCardEditForm')?.addEventListener('submit',ev=>{
    ev.preventDefault();
    const fd=new FormData(ev.currentTarget);
    save('custom-card',{
      tag:String(fd.get('tag')||DEFAULT_CUSTOM_CARD.tag).trim(),
      icon:String(fd.get('icon')||'✦').trim()||'✦',
      title:String(fd.get('title')||DEFAULT_CUSTOM_CARD.title).trim(),
      subtitle:String(fd.get('subtitle')||DEFAULT_CUSTOM_CARD.subtitle).trim(),
      body:String(fd.get('body')||DEFAULT_CUSTOM_CARD.body).trim()
    });
    toast('Módulo configurado ✓');
    openCustomCardModal();
    render();
  });
}

function wireHomeCards(){
  document.querySelectorAll('[data-open-csst]').forEach(el=>{
    if(el.dataset.wired)return;
    el.dataset.wired='1';
    el.addEventListener('click',openCsstModal);
  });
  document.querySelectorAll('[data-open-safeworker]').forEach(el=>{
    if(el.dataset.wired)return;
    el.dataset.wired='1';
    el.addEventListener('click',openSafeWorkerModal);
  });
  document.querySelectorAll('[data-open-customcard]').forEach(el=>{
    if(el.dataset.wired)return;
    el.dataset.wired='1';
    el.addEventListener('click',openCustomCardModal);
  });
}
window.wireSgaeHomeCards=wireHomeCards;

function render(){
  if(!isRouteAllowed(page))page='login';
  let content={home,dashboard,talk:talkPage,calendar,report,dynamics,library,indicators,login}[page]?.()||login();
  app.innerHTML=`<div class="shell">${header()}${content}${footer()}</div>`;
  if(page==='calendar'){renderTalks();document.querySelector('#searchTalk').addEventListener('input',renderTalks);document.querySelector('#categoryFilter').addEventListener('change',renderTalks);document.querySelector('#monthFilter').addEventListener('change',renderTalks)}
  if(page==='report')hazardsRefresh();
  bind();
  window.sgaeRefreshTracker?.();
}
function go(p){
  if(!isRouteAllowed(p)){
    toast('Acceso exclusivo para personal registrado de SGAE S.A.C. Completa tus datos para ingresar.');
    p='login';
  }
  page=p;mobileOpen=false;window.scrollTo(0,0);render();
}
function toast(s){let e=document.createElement('div');e.className='toast';e.textContent=s;document.body.append(e);setTimeout(()=>e.remove(),2600)}
function updateRolePreview(role){
  const box=document.querySelector('#rolePermissionsPreview');
  const meta=ROLE_META[role]||ROLE_META['Trabajador'];
  if(box)box.innerHTML=`<strong>Permisos que se habilitarán para ${role}:</strong><ul>${meta.permissions.map(p=>`<li>✓ ${p}</li>`).join('')}</ul>`;
}
function bind(){
  document.querySelectorAll('[data-page]').forEach(e=>e.addEventListener('click',ev=>{ev.preventDefault();if(e.dataset.page==='talk')lastTalkSource=page==='talk'?lastTalkSource:page;go(e.dataset.page)}));
  document.querySelectorAll('[data-action="go-back-talk"]').forEach(e=>e.addEventListener('click',ev=>{ev.preventDefault();window.goBackFromTalk();}));
  document.querySelectorAll('[data-scroll]').forEach(e=>e.addEventListener('click',ev=>{ev.preventDefault();if(!getSession()){go('login');return;}if(page!=='home')go('home');setTimeout(()=>document.getElementById(e.dataset.scroll)?.scrollIntoView({behavior:'smooth'}),80)}));
  document.querySelector('.mobile-toggle')?.addEventListener('click',()=>{mobileOpen=!mobileOpen;document.querySelector('.navlinks').classList.toggle('open',mobileOpen)});
  document.querySelectorAll('[data-talk]').forEach(e=>e.addEventListener('click',()=>{if(!isRouteAllowed('talk')){go('login');return;}lastTalkSource=page==='talk'?lastTalkSource:page;selectedTalk=talks[Number(e.dataset.talk)-1];expositor=false;go('talk')}));
  document.querySelectorAll('[data-favorite]').forEach(e=>e.addEventListener('click',ev=>{ev.stopPropagation();let f=read('favorites'),n=+e.dataset.favorite;save('favorites',f.includes(n)?f.filter(x=>x!==n):[...f,n]);renderTalks()}));
  document.querySelectorAll('[data-answer]').forEach(e=>e.addEventListener('click',()=>{document.querySelector('#quizFeedback').textContent=e.dataset.answer==='good'?'Correcto. Retirar la herramienta y comunicarlo ayuda a evitar una lesión.':'Revisa la condición del equipo antes de usarlo. Una herramienta deteriorada debe retirarse de servicio.'}));
  document.querySelectorAll('[data-dyn]').forEach(e=>e.addEventListener('click',()=>{let f=document.querySelector('#dynamicFeedback');f.style.display='block';f.textContent=e.dataset.dyn==='2'?'Buena decisión. Revisar la ruta y mover la carga de manera controlada reduce la posibilidad de resbalones y sobreesfuerzos.':'Revisen la ruta antes de iniciar. Apurar la tarea o sobrecargar a una persona aumenta la exposición al riesgo.'}));
  document.querySelector('#hazardForm')?.addEventListener('submit',ev=>{ev.preventDefault();const s=getSession();let d=Object.fromEntries(new FormData(ev.currentTarget));d.when=new Date().toLocaleString('es-PE');d.status=navigator.onLine?'Registrado':'Pendiente de sincronización';d.reporter=s?`${s.name} (${s.role})`:'Colaborador en campo';let h=read('hazards');h.push(d);save('hazards',h);window.sgaeTrackAction?.('report',d.type);ev.currentTarget.reset();hazardsRefresh();toast('Observación guardada en este dispositivo')});
  document.querySelector('#loginRoleSelect')?.addEventListener('change',ev=>updateRolePreview(ev.target.value));
  document.querySelector('#loginForm')?.addEventListener('submit',ev=>{
    ev.preventDefault();
    const d=Object.fromEntries(new FormData(ev.currentTarget));
    if(!String(d.name||'').trim()||!String(d.role||'').trim()||!String(d.sede||'').trim()||String(d.code||'').trim().length<4){
      toast('Completa nombre, cargo, sede y código/DNI (mínimo 4 caracteres) para ingresar.');
      return;
    }
    const session=setSession(d);
    window.sgaeTrackAction?.('login',session.role);
    toast(`Acceso habilitado: ${session.name} (${session.role})`);
    go('home');
  });
  document.querySelector('[data-action="logout"]')?.addEventListener('click',()=>{clearSession();toast('Sesión cerrada');go('login')});
  document.querySelectorAll('[data-hazard-status]').forEach(btn=>btn.addEventListener('click',()=>{
    if(!canDo('verifyHazards')){toast('Requiere acceso de Supervisor o Gerente General');return;}
    const idx=Number(btn.dataset.hazardStatus),h=read('hazards'),s=getSession();
    if(h[idx]){h[idx].status=btn.dataset.newStatus;h[idx].correctiveNote=`En atención por ${s.name} (${s.role}) · ${new Date().toLocaleTimeString('es-PE')}`;save('hazards',h);toast('Estado actualizado a En proceso');if(page==='dashboard')render();else hazardsRefresh();}
  }));
  document.querySelectorAll('[data-hazard-verify]').forEach(btn=>btn.addEventListener('click',()=>{
    if(!canDo('verifyHazards')){toast('Requiere acceso de Supervisor o Gerente General');return;}
    const idx=Number(btn.dataset.hazardVerify),h=read('hazards'),s=getSession();
    if(h[idx]){h[idx].status='Verificado';h[idx].correctiveNote=`Verificado y cerrado por ${s.name} (${s.role}) · ${new Date().toLocaleDateString('es-PE')}`;save('hazards',h);toast('Observación verificada ✓');if(page==='dashboard')render();else hazardsRefresh();}
  }));
  document.querySelector('#gerenciaNoticeForm')?.addEventListener('submit',ev=>{
    ev.preventDefault();
    if(!canDo('publishNotice')){toast('Solo Gerente General puede publicar comunicados');return;}
    const txt=(new FormData(ev.currentTarget).get('noticeText')||'').toString().trim();
    const s=getSession();
    if(!txt){toast('Escribe el mensaje del comunicado');return;}
    save('gerencia-notice',{text:txt,author:`${s.name} (${s.role})`,when:new Date().toLocaleDateString('es-PE')});
    toast('Comunicado preventivo publicado ✓');
    render();
  });
  document.querySelector('[data-action="clear-notice"]')?.addEventListener('click',()=>{
    if(!canDo('publishNotice'))return;
    localStorage.removeItem('sgae-gerencia-notice');
    toast('Comunicado retirado');
    render();
  });
  document.querySelector('[data-action="complete-talk"]')?.addEventListener('click',()=>{let a=read('attended');if(!a.includes(selectedTalk.day))a.push(selectedTalk.day);save('attended',a);window.sgaeTrackAction?.('talk',selectedTalk.day);toast('Charla marcada como revisada');render()});
  document.querySelector('[data-action="read-aloud"]')?.addEventListener('click',()=>{if(!('speechSynthesis'in window)){toast('La lectura en voz alta no está disponible en este navegador');return}speechSynthesis.cancel();speechSynthesis.speak(new SpeechSynthesisUtterance(`${selectedTalk.title}. ${selectedTalk.objective}. ${selectedTalk.intro}. Controles. ${selectedTalk.controls.join('. ')}`))});
  document.querySelector('[data-action="expositor"]')?.addEventListener('click',()=>{if(!canDo('exposeTalk')){toast('Modo Expositor habilitado solo para Supervisor o Gerente General');return;}expositor=!expositor;document.body.classList.toggle('expositor',expositor);render()});
  document.querySelector('[data-action="share"]')?.addEventListener('click',async()=>{const scripted=document.querySelector('[data-share-content]')?.innerText?.trim();let data={title:selectedTalk.title,text:scripted||selectedTalk.objective,url:location.href};try{if(navigator.share)await navigator.share(data);else{try{await navigator.clipboard.writeText(`${data.title}\n\n${data.text}`)}catch{const box=document.createElement('textarea');box.value=`${data.title}\n\n${data.text}`;box.style.position='fixed';box.style.opacity='0';document.body.append(box);box.select();document.execCommand('copy');box.remove()}toast('Charla completa copiada para compartir')}}catch{}});
  document.querySelector('[data-action="commit"]')?.addEventListener('click',()=>toast('Compromiso anotado para esta sesión'));
  document.querySelector('[data-action="challenge"]')?.addEventListener('click',()=>toast('Reto registrado en esta sesión'));
  document.querySelector('[data-action="export"]')?.addEventListener('click',()=>{if(!canDo('exportCsv')){toast('Exportación habilitada solo para Supervisor o Gerente General');return;}let rows=read('hazards'),csv=['Fecha,Área,Actividad,Tipo,Prioridad,Reportado por,Descripción,Control sugerido,Estado,Verificación',...rows.map(r=>[r.when,r.area,r.activity,r.type,r.priority,r.reporter,r.description,r.control,r.status,r.correctiveNote].map(v=>'"'+String(v||'').replaceAll('"','""')+'"').join(','))].join('\n'),link=document.createElement('a');link.href=URL.createObjectURL(new Blob(['\ufeff'+csv],{type:'text/csv;charset=utf-8'}));link.download='observaciones-ssoma.csv';link.click();URL.revokeObjectURL(link.href)});
  document.querySelectorAll('[data-open-folder]').forEach(e=>e.addEventListener('click',ev=>{ev.preventDefault();const folder=document.getElementById(e.dataset.openFolder);if(folder){folder.open=true;folder.scrollIntoView({behavior:'smooth',block:'start'});}}));
  document.querySelectorAll('[data-open-ambiental]').forEach(e=>e.addEventListener('click',ev=>{ev.preventDefault();go('report');setTimeout(()=>{const sel=document.querySelector('#hazardForm select[name="type"]');if(sel)sel.value='Aspecto ambiental';},50);}));
  document.querySelector('#docSearch')?.addEventListener('input',filterDocs);
  document.querySelector('#docFilter')?.addEventListener('change',filterDocs);
  wireHomeCards();
}
function filterDocs(){let q=(document.querySelector('#docSearch')?.value||'').toLowerCase(),cat=document.querySelector('#docFilter')?.value||'';document.querySelectorAll('#documents .doc-item').forEach(e=>e.style.display=(e.dataset.doc.includes(q)&&(!cat||e.dataset.category===cat))?'flex':'none')}
window.addEventListener('online',()=>toast('Conexión disponible. Los datos siguen guardados en este dispositivo.'));window.addEventListener('offline',()=>toast('Sin conexión. Los datos se guardan localmente.'));
if('serviceWorker'in navigator)window.addEventListener('load',()=>navigator.serviceWorker.register('/sw.js').catch(()=>{}));
page=getSession()?'home':'login';
render();
