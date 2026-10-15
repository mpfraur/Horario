tailwind.config = {
      darkMode: 'class',
      theme: {
        extend: {
          colors: {
            midnight: '#070913',
            navycard: '#0f172a',
            navyborder: '#000000',
            pixelpurple: '#a855f7',
            pixelgreen: '#22c55e',
            pixelyellow: '#eab308',
            pixelred: '#ef4444',
          },
          fontFamily: {
            arcade: ['"Press Start 2P"', 'monospace'],
            pixel: ['"VT323"', 'monospace'],
            mono: ['"VT323"', 'monospace'],
          }
        }
      }
    }

// Global State Variables
    let isSidebarOpen = false;
    let simulatorActive = false;
    let selectedSimDay = 1;
    let selectedSimMinutes = 900;
    let searchQuery = '';
    let currentTeacherFilter = 'ALL';
    let isAudioEnabled = false;
    let isCrtEnabled = false;
    let isDarkMode = true;
    let clockInterval = null;

    // Complete Weekly Schedule Data for IFC33 Grup B
    const modulesData = [
      // DILLUNS (Day 1)
      { id: 'm1', day: 1, dayName: 'Dilluns', colStart: 2, rowStart: 2, rowSpan: 3, code: 'M07', subject: "Disseny d'interfícies web", teacher: 'Rudenko, Artem', room: 'Aula 204', startTime: '15:00', endTime: '17:45', startMin: 900, endMin: 1065, colorClass: 'mod-purple', description: 'Desenvolupament de la interfície d\'usuari web, usabilitat, maquetació adaptable amb CSS, components interactius i accessibilitat.' },
      { id: 'm2', day: 1, dayName: 'Dilluns', colStart: 2, rowStart: 6, rowSpan: 3, code: 'M06', subject: "Desenvolupament web en entorn servidor", teacher: 'Negre, Pere', room: 'Aula 204', startTime: '18:15', endTime: '21:00', startMin: 1095, endMin: 1260, colorClass: 'mod-dark-purple', description: 'Programació web en entorn servidor, integració amb bases de dades relacionals i NoSQL, i creació de serveis web RESTful.' },

      // DIMARTS (Day 2)
      { id: 'm3', day: 2, dayName: 'Dimarts', colStart: 3, rowStart: 2, rowSpan: 2, code: 'M07', subject: "Disseny d'interfícies web", teacher: 'Rudenko, Artem', room: 'Aula 204', startTime: '15:00', endTime: '16:50', startMin: 900, endMin: 1010, colorClass: 'mod-maroon', description: 'Maquetació avançada amb Grid i Flexbox, disseny responsive, adaptabilitat visual i millors pràctiques en UX/UI.' },
      { id: 'm4', day: 2, dayName: 'Dimarts', colStart: 3, rowStart: 4, rowSpan: 1, code: 'M06', subject: "Desenvolupament web en entorn client", teacher: 'Rudenko, Artem', room: 'Aula 204', startTime: '16:50', endTime: '17:45', startMin: 1010, endMin: 1065, colorClass: 'mod-teal', description: 'Llenguatges de guió en entorn client, esdeveniments, gestió del DOM i manipulació d\'estils dinàmics.' },
      { id: 'm5', day: 2, dayName: 'Dimarts', colStart: 3, rowStart: 6, rowSpan: 1, code: 'M06', subject: "Desenvolupament web en entorn client", teacher: 'Rudenko, Artem', room: 'Aula 204', startTime: '18:15', endTime: '19:10', startMin: 1095, endMin: 1150, colorClass: 'mod-teal', description: 'Programació asíncrona amb Fetch API i Promises, integració amb REST APIs i gestió de l\'estat de la secció.' },
      { id: 'm6', day: 2, dayName: 'Dimarts', colStart: 3, rowStart: 7, rowSpan: 2, code: 'M06', subject: "Desenvolupament web en entorn servidor", teacher: 'Negre, Pere', room: 'Aula 204', startTime: '19:10', endTime: '21:00', startMin: 1150, endMin: 1260, colorClass: 'mod-dark-purple', description: 'Gestió de sessions, autenticació d\'usuaris, seguretat backend i desenvolupament d\'API robustes.' },

      // DIMECRES (Day 3)
      { id: 'm7', day: 3, dayName: 'Dimecres', colStart: 4, rowStart: 2, rowSpan: 2, code: 'M14', subject: "Mòdul optatiu 1", teacher: 'Negre, Pere', room: 'Aula 204', startTime: '15:00', endTime: '16:50', startMin: 900, endMin: 1010, colorClass: 'mod-slate', description: 'Tecnologies d\'especialització en desenvolupament d\'aplicacions web avançades i noves tendències del sector.' },
      { id: 'm8', day: 3, dayName: 'Dimecres', colStart: 4, rowStart: 4, rowSpan: 1, code: 'M08', subject: "Desplegament d'aplicacions web", teacher: 'Martínez, Manuel', room: 'Aula 204', startTime: '16:50', endTime: '17:45', startMin: 1010, endMin: 1065, colorClass: 'mod-emerald', description: 'Instal·lació i configuració de servidors d\'aplicacions web, protocols de xarxa i gestió de dominis.' },
      { id: 'm9', day: 3, dayName: 'Dimecres', colStart: 4, rowStart: 6, rowSpan: 1, code: 'M08', subject: "Desplegament d'aplicacions web", teacher: 'Martínez, Manuel', room: 'Aula 204', startTime: '18:15', endTime: '19:10', startMin: 1095, endMin: 1150, colorClass: 'mod-emerald', description: 'Servidors web HTTP/HTTPS, seguretat amb SSL/TLS, redireccions i gestió de directoris de producció.' },
      { id: 'm10', day: 3, dayName: 'Dimecres', colStart: 4, rowStart: 7, rowSpan: 2, code: 'M06', subject: "Desenvolupament web en entorn servidor", teacher: 'Negre, Pere', room: 'Aula 204', startTime: '19:10', endTime: '21:00', startMin: 1150, endMin: 1260, colorClass: 'mod-dark-purple', description: 'Patró de disseny MVC, Ús d\'ORMs per a la persistència de dades i optimització de consultes a la base de dades.' },

      // DIJOUS (Day 4)
      { id: 'm11', day: 4, dayName: 'Dijous', colStart: 5, rowStart: 2, rowSpan: 2, code: 'M11', subject: "Anglès professional", teacher: 'Kirilova, Radosveta', room: 'Aula 204', startTime: '15:00', endTime: '16:50', startMin: 900, endMin: 1010, colorClass: 'mod-maroon', description: 'Comprensió i redacció de documentació tècnica de desenvolupament, especificacions d\'API i comunicació oral en entorns de treball.' },
      { id: 'm12', day: 4, dayName: 'Dijous', colStart: 5, rowStart: 4, rowSpan: 1, code: 'M12', subject: "Sostenibilitat aplicada al sistema productiu", teacher: 'Bonillo, Santi', room: 'Aula 204', startTime: '16:50', endTime: '17:45', startMin: 1010, endMin: 1065, colorClass: 'mod-golden', description: 'Principis de sostenibilitat ambiental, reducció de la petjada de carboni digital, economia circular i eficiència energètica.' },
      { id: 'm13', day: 4, dayName: 'Dijous', colStart: 5, rowStart: 6, rowSpan: 2, code: 'M10', subject: "Itinerari personal per a l'ocupabilitat II", teacher: 'Bonillo, Santi', room: 'Aula 204', startTime: '18:15', endTime: '20:05', startMin: 1095, endMin: 1205, colorClass: 'mod-amber', description: 'Estratègies de recerca de feina, preparació d\'entrevistes de treball tècniques, dret laboral i emprenedoria en el sector TIC.' },
      { id: 'm14', day: 4, dayName: 'Dijous', colStart: 5, rowStart: 8, rowSpan: 1, code: 'M13', subject: "Projecte de desenvolupament d'aplicacions web", teacher: 'Vila Perez, Marc', room: 'Aula 204', startTime: '20:05', endTime: '21:00', startMin: 1205, endMin: 1260, colorClass: 'mod-magenta', description: 'Planificació, tutoria i desenvolupament del projecte integrat de final de cicle informàtic.' },

      // DIVENDRES (Day 5)
      { id: 'm15', day: 5, dayName: 'Divendres', colStart: 6, rowStart: 2, rowSpan: 3, code: 'M06', subject: "Desenvolupament web en entorn client", teacher: 'Rudenko, Artem', room: 'Aula 204', startTime: '15:00', endTime: '17:45', startMin: 900, endMin: 1065, colorClass: 'mod-teal', description: 'Pràctiques intensives amb frameworks moderns (React, Angular, Vue.js), arquitectura de Single Page Applications (SPA) i gestió d\'estats.' },
      { id: 'm16', day: 5, dayName: 'Divendres', colStart: 6, rowStart: 6, rowSpan: 1, code: 'M11', subject: "Anglès professional", teacher: 'Kirilova, Radosveta', room: 'Aula 204', startTime: '18:15', endTime: '19:10', startMin: 1095, endMin: 1150, colorClass: 'mod-maroon', description: 'Presentació oral de projectes de programari i simulació de reunions tècniques en anglès.' },
      { id: 'm17', day: 5, dayName: 'Divendres', colStart: 6, rowStart: 7, rowSpan: 2, code: 'M08', subject: "Desplegament d'aplicacions web", teacher: 'Martínez, Manuel', room: 'Aula 204', startTime: '19:10', endTime: '21:00', startMin: 1150, endMin: 1260, colorClass: 'mod-emerald', description: 'Contenidors Docker, automatització CI/CD, serveis en el núvol (Cloud Services) i monitorització d\'aplicacions en producció.' }
    ];

    const attendanceStamps = [
      { day: 2, startRow: 2, endRow: 5, startMin: 900, endMin: 1065, course: 'Programació', people: ['Mario', 'Pol'] },
      { day: 3, startRow: 4, endRow: 5, startMin: 1010, endMin: 1065, course: 'Programació', people: ['Mario', 'Pol'] },
      { day: 3, startRow: 6, endRow: 7, startMin: 1095, endMin: 1150, course: 'Programació', people: ['Mario', 'Pol'] },
      { day: 4, startRow: 7, endRow: 9, startMin: 1150, endMin: 1260, course: 'Programació', people: ['Mario', 'Pol'] },
      { day: 4, startRow: 2, endRow: 4, startMin: 900, endMin: 1010, course: 'Bases de dades', people: ['Mario'] },
      { day: 5, startRow: 6, endRow: 9, startMin: 1095, endMin: 1260, course: 'Bases de dades', people: ['Mario'] }
    ];
    const alternateAttendanceStamps = [
      { day: 2, startRow: 2, endRow: 5, startMin: 900, endMin: 1065, course: 'Programació', people: ['Miquel', 'Pedro', 'Hugo'] },
      { day: 3, startRow: 4, endRow: 5, startMin: 1010, endMin: 1065, course: 'Programació', people: ['Miquel', 'Pedro', 'Hugo'] },
      { day: 3, startRow: 6, endRow: 7, startMin: 1095, endMin: 1150, course: 'Programació', people: ['Miquel', 'Pedro', 'Hugo'] },
      { day: 4, startRow: 7, endRow: 9, startMin: 1150, endMin: 1260, course: 'Programació', people: ['Miquel', 'Pedro', 'Hugo'] },
      { day: 4, startRow: 2, endRow: 4, startMin: 900, endMin: 1010, course: 'Bases de dades', people: ['Miquel', 'Pedro', 'Hugo'] },
      { day: 5, startRow: 6, endRow: 9, startMin: 1095, endMin: 1260, course: 'Bases de dades', people: ['Miquel', 'Pedro', 'Hugo'] }
    ];
    const attendancePortraits = {
      Mario: 'sources/mario2.png',
      Pol: 'sources/Pol2.png',
      Miquel: 'sources/miquel.png',
      Pedro: 'sources/Pedro.png',
      Hugo: 'sources/hugo.png'
    };
    const attendanceStampPortraits = {
      Mario: 'sources/mario.png',
      Pol: 'sources/pol.png',
      Miquel: 'sources/miquel.png',
      Pedro: 'sources/Pedro.png',
      Hugo: 'sources/hugo.png'
    };
    const alternateModulesData = [
      { id: 'alt-si-mon-am', day: 1, dayName: 'Dilluns', colStart: 2, rowStart: 2, rowSpan: 2, code: 'SI', subject: 'Sistemes informàtics', teacher: 'Martínez, Manuel', room: 'Aula no especificada', startTime: '15:00', endTime: '16:50', startMin: 900, endMin: 1010, colorClass: 'mod-alt-blue', description: 'Sistemes informàtics.' },
      { id: 'alt-ed-mon', day: 1, dayName: 'Dilluns', colStart: 2, rowStart: 4, rowSpan: 1, code: 'ED', subject: 'Entorns de desenvolupament', teacher: 'Vila Perez, Marc', room: 'Aula no especificada', startTime: '16:50', endTime: '17:45', startMin: 1010, endMin: 1065, colorClass: 'mod-alt-orange', description: 'Entorns de desenvolupament.' },
      { id: 'alt-da-mon', day: 1, dayName: 'Dilluns', colStart: 2, rowStart: 6, rowSpan: 1, code: 'DA', subject: 'Digitalització aplicada als sectors productius', teacher: 'Rudenko, Artem', room: 'Aula no especificada', startTime: '18:15', endTime: '19:10', startMin: 1095, endMin: 1150, colorClass: 'mod-alt-pink', description: 'Digitalització aplicada als sectors productius.' },
      { id: 'alt-lmsgi-mon', day: 1, dayName: 'Dilluns', colStart: 2, rowStart: 7, rowSpan: 2, code: 'LMSGI', subject: "Llenguatges de marques i sistemes de gestió d'informació", teacher: 'Rudenko, Artem', room: 'Aula no especificada', startTime: '19:10', endTime: '21:00', startMin: 1150, endMin: 1260, colorClass: 'mod-alt-teal', description: "Llenguatges de marques i sistemes de gestió d'informació." },
      { id: 'alt-prog-tue', day: 2, dayName: 'Dimarts', colStart: 3, rowStart: 2, rowSpan: 3, code: 'PROG', subject: 'Programació', teacher: 'Negre, Pere', room: 'Aula no especificada', startTime: '15:00', endTime: '17:45', startMin: 900, endMin: 1065, colorClass: 'mod-alt-yellow', description: 'Programació.' },
      { id: 'alt-si-tue', day: 2, dayName: 'Dimarts', colStart: 3, rowStart: 6, rowSpan: 3, code: 'SI', subject: 'Sistemes informàtics', teacher: 'Martínez, Manuel', room: 'Aula no especificada', startTime: '18:15', endTime: '21:00', startMin: 1095, endMin: 1260, colorClass: 'mod-alt-blue', description: 'Sistemes informàtics.' },
      { id: 'alt-lmsgi-wed-am', day: 3, dayName: 'Dimecres', colStart: 4, rowStart: 2, rowSpan: 2, code: 'LMSGI', subject: "Llenguatges de marques i sistemes de gestió d'informació", teacher: 'Rudenko, Artem', room: 'Aula no especificada', startTime: '15:00', endTime: '16:50', startMin: 900, endMin: 1010, colorClass: 'mod-alt-teal', description: "Llenguatges de marques i sistemes de gestió d'informació." },
      { id: 'alt-prog-wed-pm1', day: 3, dayName: 'Dimecres', colStart: 4, rowStart: 4, rowSpan: 1, code: 'PROG', subject: 'Programació', teacher: 'Negre, Pere', room: 'Aula no especificada', startTime: '16:50', endTime: '17:45', startMin: 1010, endMin: 1065, colorClass: 'mod-alt-yellow', description: 'Programació.' },
      { id: 'alt-prog-wed-pm2', day: 3, dayName: 'Dimecres', colStart: 4, rowStart: 6, rowSpan: 1, code: 'PROG', subject: 'Programació', teacher: 'Negre, Pere', room: 'Aula no especificada', startTime: '18:15', endTime: '19:10', startMin: 1095, endMin: 1150, colorClass: 'mod-alt-yellow', description: 'Programació.' },
      { id: 'alt-ed-wed', day: 3, dayName: 'Dimecres', colStart: 4, rowStart: 7, rowSpan: 2, code: 'ED', subject: 'Entorns de desenvolupament', teacher: 'Vila Perez, Marc', room: 'Aula no especificada', startTime: '19:10', endTime: '21:00', startMin: 1150, endMin: 1260, colorClass: 'mod-alt-orange', description: 'Entorns de desenvolupament.' },
      { id: 'alt-bd-thu-am', day: 4, dayName: 'Dijous', colStart: 5, rowStart: 2, rowSpan: 2, code: 'BD', subject: 'Bases de dades', teacher: 'Rudenko, Artem', room: 'Aula no especificada', startTime: '15:00', endTime: '16:50', startMin: 900, endMin: 1010, colorClass: 'mod-alt-green', description: 'Bases de dades.' },
      { id: 'alt-si-thu-pm1', day: 4, dayName: 'Dijous', colStart: 5, rowStart: 4, rowSpan: 1, code: 'SI', subject: 'Sistemes informàtics', teacher: 'Martínez, Manuel', room: 'Aula no especificada', startTime: '16:50', endTime: '17:45', startMin: 1010, endMin: 1065, colorClass: 'mod-alt-blue', description: 'Sistemes informàtics.' },
      { id: 'alt-si-thu-pm2', day: 4, dayName: 'Dijous', colStart: 5, rowStart: 6, rowSpan: 1, code: 'SI', subject: 'Sistemes informàtics', teacher: 'Martínez, Manuel', room: 'Aula no especificada', startTime: '18:15', endTime: '19:10', startMin: 1095, endMin: 1150, colorClass: 'mod-alt-blue', description: 'Sistemes informàtics.' },
      { id: 'alt-prog-thu', day: 4, dayName: 'Dijous', colStart: 5, rowStart: 7, rowSpan: 2, code: 'PROG', subject: 'Programació', teacher: 'Negre, Pere', room: 'Aula no especificada', startTime: '19:10', endTime: '21:00', startMin: 1150, endMin: 1260, colorClass: 'mod-alt-yellow', description: 'Programació.' },
      { id: 'alt-ipe-fri', day: 5, dayName: 'Divendres', colStart: 6, rowStart: 2, rowSpan: 3, code: 'IPE I', subject: "Itinerari personal per a l'ocupabilitat I", teacher: 'Bonillo, Santi', room: 'Aula no especificada', startTime: '15:00', endTime: '17:45', startMin: 900, endMin: 1065, colorClass: 'mod-alt-rose', description: "Itinerari personal per a l'ocupabilitat I." },
      { id: 'alt-bd-fri', day: 5, dayName: 'Divendres', colStart: 6, rowStart: 6, rowSpan: 3, code: 'BD', subject: 'Bases de dades', teacher: 'Rudenko, Artem', room: 'Aula no especificada', startTime: '18:15', endTime: '21:00', startMin: 1095, endMin: 1260, colorClass: 'mod-alt-green', description: 'Bases de dades.' }
    ];
    let isAlternateSchedule = false;
    const getActiveScheduleData = () => isAlternateSchedule ? alternateModulesData : modulesData;
    const pedroDailySeconds = 6 * 60 * 60;
    const pedroWeeklySeconds = pedroDailySeconds * 5;
    const pedroDeadline = new Date(2027, 1, 26);
    const pedroDeadlineStart = new Date(2026, 1, 26);
    const pedroDeadlineDuration = pedroDeadline - pedroDeadlineStart;

    function toggleSidebar(show) {
      isSidebarOpen = (typeof show === 'boolean') ? show : !isSidebarOpen;
      const sidebar = document.getElementById('sidebar');
      const backdrop = document.getElementById('sidebarBackdrop');

      if (isSidebarOpen) {
        sidebar.classList.remove('translate-x-full');
        backdrop.classList.remove('hidden');
      } else {
        sidebar.classList.add('translate-x-full');
        backdrop.classList.add('hidden');
      }
    }

    function renderScheduleCards() {
      const grid = document.getElementById('scheduleGrid');
      if (!grid) return;

      const now = getCurrentTime();
      const activeModules = getActiveScheduleData();

      activeModules.forEach(mod => {
        let card = document.getElementById(`card-${mod.id}`);
        const isActive = (now.day === mod.day && now.totalMinutes >= mod.startMin && now.totalMinutes < mod.endMin);

        if (!card) {
          card = document.createElement('div');
          card.id = `card-${mod.id}`;
          card.onclick = () => openModuleModal(mod);
          grid.appendChild(card);
        }

        card.className = `mod-card ${mod.colorClass} col-start-${mod.colStart} row-start-${mod.rowStart} row-span-${mod.rowSpan} p-2.5 flex flex-col justify-between cursor-pointer hover:brightness-110 relative overflow-hidden group border-2 sm:border-4 border-black shadow-[3px_3px_0px_#000] ${isActive ? 'active-card-broadcast' : ''}`;

        // Pixel progress bar overlay for active class
        let progressHTML = '';
        if (isActive) {
          const elapsed = now.totalMinutes - mod.startMin;
          const total = mod.endMin - mod.startMin;
          const percent = Math.min(100, Math.max(0, Math.round((elapsed / total) * 100)));
          progressHTML = `
            <div class="mt-2 w-full bg-black p-0.5 border border-emerald-400">
              <div class="bg-emerald-400 h-2 transition-all duration-300" style="width: ${percent}%"></div>
            </div>
          `;
        }

        card.innerHTML = `
          ${isActive ? '<div class="absolute top-1 right-1 bg-yellow-400 text-black font-arcade text-[7px] px-1 py-0.5 border border-black animate-pulse">[LIVE]</div>' : ''}
          <div class="text-center my-auto py-1">
            <h3 class="font-arcade text-[10px] sm:text-xs leading-snug tracking-tight text-white">
              ${mod.subject}
            </h3>
            <p class="font-pixel text-base opacity-90 mt-1">
              ${mod.teacher}
            </p>
          </div>
          ${progressHTML}
        `;
      });

      renderAttendanceStamps(grid, isAlternateSchedule ? alternateAttendanceStamps : attendanceStamps);
    }

    function renderAttendanceStamps(grid, stamps) {
      if (grid.querySelector('.attendance-stamp')) return;

      stamps.forEach(({ day, startRow, endRow, course, people }) => {
        const stamp = document.createElement('div');
        stamp.className = 'attendance-stamp';
        stamp.style.gridColumn = String(day + 1);
        stamp.style.gridRow = `${startRow} / ${endRow}`;
        stamp.setAttribute('role', 'img');
        stamp.setAttribute('aria-label', `${course}: ${people.join(' and ')}`);
        stamp.title = `${course}: ${people.join(' and ')}`;

        people.forEach(person => {
          const portrait = document.createElement('img');
          portrait.src = attendanceStampPortraits[person];
          portrait.alt = '';
          stamp.appendChild(portrait);
        });

        grid.appendChild(stamp);
      });
    }

    function getCurrentTime() {
      if (simulatorActive) {
        const h = Math.floor(selectedSimMinutes / 60);
        const m = selectedSimMinutes % 60;
        const timeStr = `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`;
        const dayNames = ['', 'Dilluns', 'Dimarts', 'Dimecres', 'Dijous', 'Divendres', 'Dissabte', 'Diumenge'];

        return {
          day: selectedSimDay,
          totalMinutes: selectedSimMinutes,
          timeStr: timeStr,
          secondsStr: '00',
          dateStr: `${dayNames[selectedSimDay]} (Simulat)`
        };
      } else {
        const now = new Date();
        let day = now.getDay();
        if (day === 0) day = 7;

        const h = now.getHours();
        const m = now.getMinutes();
        const s = now.getSeconds();
        const totalMinutes = h * 60 + m;

        const dayNames = ['', 'Dilluns', 'Dimarts', 'Dimecres', 'Dijous', 'Divendres', 'Dissabte', 'Diumenge'];
        const monthNames = ['Gener', 'Febrer', 'Març', 'Abril', 'Maig', 'Juny', 'Juliol', 'Agost', 'Setembre', 'Octubre', 'Novembre', 'Desembre'];

        const dateFormatted = `${dayNames[day] || 'Dia'}, ${now.getDate()} de ${monthNames[now.getMonth()]}`;

        return {
          day: day,
          totalMinutes: totalMinutes,
          timeStr: `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`,
          secondsStr: String(s).padStart(2, '0'),
          dateStr: dateFormatted
        };
      }
    }

    function updateClockAndHUD() {
      const now = getCurrentTime();

      const clockElem = document.getElementById('clockDisplay');
      const dateElem = document.getElementById('dateText');
      if (clockElem) {
        clockElem.innerHTML = `${now.timeStr}<span class="font-arcade text-[10px] text-purple-400 ml-1">${now.secondsStr}s</span>`;
      }
      if (dateElem) {
        dateElem.textContent = now.dateStr;
      }

      const statusBadge = document.getElementById('liveStatusBadge');
      const statusText = document.getElementById('liveStatusText');

      const isBreakTime = (now.day >= 1 && now.day <= 5 && now.totalMinutes >= 1065 && now.totalMinutes < 1095);
      const isClassHours = (now.day >= 1 && now.day <= 5 && now.totalMinutes >= 900 && now.totalMinutes < 1260);

      if (statusBadge && statusText) {
        if (isBreakTime) {
          statusBadge.className = "pixel-btn px-3 py-1 font-arcade text-[10px] uppercase bg-amber-950 text-amber-300 border-amber-500";
          statusText.textContent = "☕ DESCANS / BREAK";
        } else if (isClassHours) {
          statusBadge.className = "pixel-btn px-3 py-1 font-arcade text-[10px] uppercase bg-red-950 text-red-400 border-red-600";
          statusText.textContent = "● LIVE ON AIR";
        } else {
          statusBadge.className = "pixel-btn px-3 py-1 font-arcade text-[10px] uppercase bg-slate-900 text-slate-400 border-slate-700";
          statusText.textContent = "📻 STANDBY / OFF AIR";
        }
      }

      updateUpNextWidget(now);
      updatePedroCountdown();
      renderScheduleCards();
    }

    function getPedroSecondsRemaining(now = new Date()) {
      const monday = new Date(now);
      const daysSinceMonday = (now.getDay() + 6) % 7;
      monday.setDate(monday.getDate() - daysSinceMonday);
      monday.setHours(0, 0, 0, 0);

      let secondsRemaining = 0;
      for (let weekday = 0; weekday < 5; weekday += 1) {
        const workdayStart = new Date(monday);
        workdayStart.setDate(monday.getDate() + weekday);
        workdayStart.setHours(15, 0, 0, 0);

        const workdayEnd = new Date(workdayStart);
        workdayEnd.setHours(21, 0, 0, 0);

        if (now < workdayEnd) {
          secondsRemaining += Math.ceil((workdayEnd - Math.max(now, workdayStart)) / 1000);
        }
      }

      return Math.min(pedroWeeklySeconds, secondsRemaining);
    }

    function formatPedroCountdown(totalSeconds) {
      const hours = Math.floor(totalSeconds / 3600);
      const minutes = Math.floor((totalSeconds % 3600) / 60);
      const seconds = totalSeconds % 60;
      return `${hours}h ${String(minutes).padStart(2, '0')}m ${String(seconds).padStart(2, '0')}s`;
    }

    function updatePedroCountdown() {
      const secondsRemaining = getPedroSecondsRemaining();
      const percentageRemaining = (secondsRemaining / pedroWeeklySeconds) * 100;
      const countdownText = formatPedroCountdown(secondsRemaining);
      const hoursRemaining = (secondsRemaining / 3600).toFixed(1);
      const ariaValueText = `${countdownText} remaining`;

      [
        ['pedroCountdown', 'pedroProgress', 'pedroRemainingLabel'],
        ['pedroModalCountdown', 'pedroModalProgress', 'pedroModalRemainingLabel']
      ].forEach(([countdownId, progressId, labelId]) => {
        const countdown = document.getElementById(countdownId);
        const progress = document.getElementById(progressId);
        const label = document.getElementById(labelId);

        if (countdown) countdown.textContent = countdownText;
        if (progress) {
          progress.style.width = `${percentageRemaining}%`;
          const track = progress.parentElement;
          track.setAttribute('aria-valuenow', String(secondsRemaining));
          track.setAttribute('aria-valuetext', ariaValueText);
        }
        if (label) label.textContent = `${hoursRemaining} OF 30 HOURS REMAINING THIS WEEK`;
      });

      const deadlineSecondsRemaining = Math.max(0, Math.ceil((pedroDeadline - Date.now()) / 1000));
      const deadlinePercentageRemaining = Math.min(100, (deadlineSecondsRemaining * 1000 / pedroDeadlineDuration) * 100);
      const deadlineDays = Math.floor(deadlineSecondsRemaining / 86400);
      const deadlineHours = Math.floor((deadlineSecondsRemaining % 86400) / 3600);
      const deadlineMinutes = Math.floor((deadlineSecondsRemaining % 3600) / 60);
      const deadlineSeconds = deadlineSecondsRemaining % 60;
      const deadlineCountdownText = `${deadlineDays}d ${String(deadlineHours).padStart(2, '0')}h ${String(deadlineMinutes).padStart(2, '0')}m ${String(deadlineSeconds).padStart(2, '0')}s`;
      const deadlineDaysRemaining = Math.ceil(deadlineSecondsRemaining / 86400);
      const deadlineAriaValueText = `${deadlineCountdownText} remaining`;

      [
        ['pedroDeadlineCountdown', 'pedroDeadlineProgress', 'pedroDeadlineRemainingLabel'],
        ['pedroModalDeadlineCountdown', 'pedroModalDeadlineProgress', 'pedroModalDeadlineRemainingLabel']
      ].forEach(([countdownId, progressId, labelId]) => {
        const countdown = document.getElementById(countdownId);
        const progress = document.getElementById(progressId);
        const label = document.getElementById(labelId);

        if (countdown) countdown.textContent = deadlineCountdownText;
        if (progress) {
          progress.style.width = `${deadlinePercentageRemaining}%`;
          const track = progress.parentElement;
          track.setAttribute('aria-valuenow', String(deadlineSecondsRemaining));
          track.setAttribute('aria-valuetext', deadlineAriaValueText);
        }
        if (label) {
          label.textContent = `${Math.round(deadlinePercentageRemaining)}% OF 365 DAYS REMAINING UNTIL FEBRUARY 25, 2027 (${deadlineDaysRemaining} DAYS)`;
        }
      });
    }

    function closePedroModal() {
      document.getElementById('pedroModal').classList.add('hidden');
    }

    function updateUpNextWidget(now) {
      const currentNameElem = document.getElementById('currentModuleName');
      const currentPercentElem = document.getElementById('currentModulePercentText');
      const currentCountdownElem = document.getElementById('currentModuleCountdownText');

      const nextNameElem = document.getElementById('nextModuleName');
      const nextBadgeElem = document.getElementById('nextModuleTimeBadge');

      const todayModules = getActiveScheduleData().filter(m => m.day === now.day);
      const activeModule = todayModules.find(m => now.totalMinutes >= m.startMin && now.totalMinutes < m.endMin);
      const isBreak = (now.day >= 1 && now.day <= 5 && now.totalMinutes >= 1065 && now.totalMinutes < 1095);

      if (isBreak) {
        if (currentNameElem) currentNameElem.textContent = "DESCANS / BREAK";

        const elapsed = now.totalMinutes - 1065;
        const percent = Math.min(100, Math.round((elapsed / 30) * 100));
        const rem = 1095 - now.totalMinutes;

        if (currentPercentElem) currentPercentElem.textContent = `${percent}%`;
        if (currentCountdownElem) currentCountdownElem.textContent = `${rem}m restants`;

        const nextMod = todayModules.find(m => m.startMin >= 1095);
        if (nextMod) {
          if (nextNameElem) nextNameElem.textContent = nextMod.subject;
          if (nextBadgeElem) nextBadgeElem.textContent = nextMod.startTime;
        }

      } else if (activeModule) {
        if (currentNameElem) currentNameElem.textContent = activeModule.subject;

        const elapsed = now.totalMinutes - activeModule.startMin;
        const total = activeModule.endMin - activeModule.startMin;
        const percent = Math.min(100, Math.round((elapsed / total) * 100));
        const remMin = activeModule.endMin - now.totalMinutes;

        if (currentPercentElem) currentPercentElem.textContent = `${percent}%`;
        if (currentCountdownElem) currentCountdownElem.textContent = `${remMin}m restants`;

        const nextMod = todayModules.find(m => m.startMin >= activeModule.endMin);
        if (nextMod) {
          if (nextNameElem) nextNameElem.textContent = nextMod.subject;
          if (nextBadgeElem) nextBadgeElem.textContent = nextMod.startTime;
        } else {
          if (nextNameElem) nextNameElem.textContent = "Final de Jornada";
          if (nextBadgeElem) nextBadgeElem.textContent = "21:00";
        }

      } else {
        if (currentNameElem) currentNameElem.textContent = "Canal en Standby / Fora d'Horari";
        if (currentPercentElem) currentPercentElem.textContent = "0%";
        if (currentCountdownElem) currentCountdownElem.textContent = "--";

        const upcomingToday = todayModules.find(m => m.startMin > now.totalMinutes);
        if (upcomingToday) {
          if (nextNameElem) nextNameElem.textContent = upcomingToday.subject;
          if (nextBadgeElem) nextBadgeElem.textContent = upcomingToday.startTime;
        } else {
          if (nextNameElem) nextNameElem.textContent = "Demà primera classe";
          if (nextBadgeElem) nextBadgeElem.textContent = "15:00";
        }
      }
    }

    function setSimulatorMode(active) {
      simulatorActive = active;
      const btnReal = document.getElementById('btnRealTimeMode');
      const btnSim = document.getElementById('btnSimMode');

      if (btnReal && btnSim) {
        if (active) {
          btnReal.className = "w-1/2 py-1 font-arcade text-[9px] text-slate-400 hover:text-white text-center";
          btnSim.className = "w-1/2 py-1 font-arcade text-[9px] bg-purple-600 text-white text-center";
          playBeepSound(600, 0.1);
        } else {
          btnReal.className = "w-1/2 py-1 font-arcade text-[9px] bg-purple-600 text-white text-center";
          btnSim.className = "w-1/2 py-1 font-arcade text-[9px] text-slate-400 hover:text-white text-center";
          playBeepSound(440, 0.1);
        }
      }

      updateSimulation();
    }

    function updateSimulation() {
      const daySelect = document.getElementById('simDaySelect');
      const slider = document.getElementById('simTimeSlider');
      const valLabel = document.getElementById('simTimeVal');

      if (daySelect) selectedSimDay = parseInt(daySelect.value, 10);
      if (slider) selectedSimMinutes = parseInt(slider.value, 10);

      const h = Math.floor(selectedSimMinutes / 60);
      const m = selectedSimMinutes % 60;
      if (valLabel) valLabel.textContent = `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`;

      if (!simulatorActive) {
        setSimulatorMode(true);
      } else {
        updateClockAndHUD();
      }
    }

    function setSimPreset(day, minutes) {
      const daySelect = document.getElementById('simDaySelect');
      const slider = document.getElementById('simTimeSlider');
      if (daySelect) daySelect.value = day;
      if (slider) slider.value = minutes;
      updateSimulation();
      playBeepSound(800, 0.1);
    }

    function handleSearch() {
      const input = document.getElementById('searchInput');
      const btnClear = document.getElementById('btnClearSearch');
      if (!input) return;
      searchQuery = input.value.trim().toLowerCase();

      if (btnClear) {
        if (searchQuery.length > 0) {
          btnClear.classList.remove('hidden');
        } else {
          btnClear.classList.add('hidden');
        }
      }

      applyFilters();
    }

    function clearSearch() {
      const input = document.getElementById('searchInput');
      if (input) input.value = '';
      searchQuery = '';
      const btnClear = document.getElementById('btnClearSearch');
      if (btnClear) btnClear.classList.add('hidden');
      applyFilters();
    }

    function filterTeacher(teacherName) {
      currentTeacherFilter = teacherName;

      const pills = document.querySelectorAll('.teacher-pill');
      pills.forEach(pill => {
        if ((teacherName === 'ALL' && pill.textContent.includes('TOTS')) || pill.textContent.includes(teacherName.split(',')[0])) {
          pill.className = "teacher-pill pixel-btn px-2 py-1 bg-purple-600 text-white font-arcade text-[8px]";
        } else {
          pill.className = "teacher-pill pixel-btn px-2 py-1 bg-slate-900 text-slate-300 font-arcade text-[8px]";
        }
      });

      applyFilters();
      playBeepSound(520, 0.08);
    }

    function applyFilters() {
      getActiveScheduleData().forEach(mod => {
        const card = document.getElementById(`card-${mod.id}`);
        if (!card) return;

        let matchesSearch = true;
        let matchesTeacher = true;

        if (searchQuery) {
          const fullText = `${mod.subject} ${mod.teacher} ${mod.code} ${mod.room}`.toLowerCase();
          matchesSearch = fullText.includes(searchQuery);
        }

        if (currentTeacherFilter !== 'ALL') {
          matchesTeacher = (mod.teacher === currentTeacherFilter);
        }

        if (matchesSearch && matchesTeacher) {
          card.classList.remove('opacity-20', 'grayscale', 'scale-95');
          card.classList.add('opacity-100');
        } else {
          card.classList.add('opacity-20', 'grayscale', 'scale-95');
          card.classList.remove('opacity-100');
        }
      });
    }

    function openModuleModal(mod) {
      document.getElementById('modalCodeBadge').textContent = mod.code;
      document.getElementById('modalTitle').textContent = mod.subject;
      document.getElementById('modalTeacher').textContent = mod.teacher;
      document.getElementById('modalRoom').textContent = mod.room;
      document.getElementById('modalTimeDetails').innerHTML = `<i class="fa-regular fa-clock"></i> ${mod.dayName}: ${mod.startTime} - ${mod.endTime}`;
      document.getElementById('modalDescription').textContent = mod.description;

      const activeAttendanceStamps = isAlternateSchedule ? alternateAttendanceStamps : attendanceStamps;
      const matchingStamps = activeAttendanceStamps.filter(stamp =>
        stamp.day === mod.day && stamp.startMin < mod.endMin && stamp.endMin > mod.startMin
      );
      const attendancePanel = document.getElementById('modalAttendance');
      const attendanceCourse = document.getElementById('modalAttendanceCourse');
      const attendancePeople = document.getElementById('modalAttendancePeople');
      if (matchingStamps.length && attendancePanel && attendanceCourse && attendancePeople) {
        attendancePanel.classList.remove('hidden');
        attendanceCourse.textContent = [...new Set(matchingStamps.map(stamp => stamp.course))].join(' / ');
        attendancePeople.replaceChildren();

        const people = [...new Set(matchingStamps.flatMap(stamp => stamp.people))];
        people.forEach(person => {
          const attendee = document.createElement('div');
          attendee.className = 'modal-attendee';

          const portrait = document.createElement('img');
          portrait.src = attendancePortraits[person];
          portrait.alt = person;

          const name = document.createElement('span');
          name.textContent = person;

          attendee.append(portrait, name);
          attendancePeople.appendChild(attendee);
        });
      } else if (attendancePanel) {
        attendancePanel.classList.add('hidden');
      }

      const weeklySessions = getActiveScheduleData().filter(m => m.subject === mod.subject);
      const sessionsList = document.getElementById('modalWeeklySessions');
      if (sessionsList) {
        sessionsList.innerHTML = weeklySessions.map(s => `
          <div class="flex items-center justify-between bg-black p-2 border border-slate-800">
            <span class="text-slate-200">${s.dayName}</span>
            <span class="text-yellow-300">${s.startTime} - ${s.endTime}</span>
          </div>
        `).join('');
      }

      document.getElementById('moduleModal').classList.remove('hidden');
      playBeepSound(700, 0.12);
    }

    function closeModal() {
      document.getElementById('moduleModal').classList.add('hidden');
    }

    function openBreakModal() {
      openModuleModal({
        code: 'DESCANS',
        subject: 'Descans / Pausa Lectiva',
        teacher: 'Tots els professors',
        room: 'Pati / Cafeteria',
        dayName: 'Dilluns - Divendres',
        startTime: '17:45',
        endTime: '18:15',
        description: 'Pausa lectiva de 30 minuts per a descans d\'alumnes i professors entre el bloc de tarda i vespre.'
      });
    }

    function openAnalyticsModal() {
      const modal = document.getElementById('analyticsModal');
      const list = document.getElementById('analyticsList');

      const subjectMap = {};
      getActiveScheduleData().forEach(mod => {
        const durationMin = mod.endMin - mod.startMin;
        if (!subjectMap[mod.subject]) {
          subjectMap[mod.subject] = {
            code: mod.code,
            teacher: mod.teacher,
            minutes: 0,
            color: mod.colorClass
          };
        }
        subjectMap[mod.subject].minutes += durationMin;
      });

      const totalWeekMinutes = 30 * 60;

      if (list) {
        list.innerHTML = Object.keys(subjectMap).map(subjKey => {
          const item = subjectMap[subjKey];
          const hours = (item.minutes / 60).toFixed(1);
          const percent = Math.round((item.minutes / totalWeekMinutes) * 100);

          return `
            <div class="bg-black p-3 border-2 border-slate-800 space-y-1.5 font-arcade text-[9px]">
              <div class="flex items-center justify-between">
                <span class="text-yellow-300">${subjKey} (${item.code})</span>
                <span class="text-purple-400">${hours}H (${percent}%)</span>
              </div>
              <div class="text-slate-500">PROFE: ${item.teacher}</div>
              <div class="w-full bg-slate-900 border border-slate-700 p-0.5">
                <div class="h-2 bg-purple-500" style="width: ${percent * 2.5}%"></div>
              </div>
            </div>
          `;
        }).join('');
      }

      if (modal) modal.classList.remove('hidden');
      playBeepSound(650, 0.12);
    }

    function closeAnalyticsModal() {
      const modal = document.getElementById('analyticsModal');
      if (modal) modal.classList.add('hidden');
    }

    // Audio Synthesizer Toggle
    function toggleAudio() {
      isAudioEnabled = !isAudioEnabled;
      const icon = document.getElementById('audioIcon');
      const btn = document.getElementById('btnAudioToggle');

      if (icon && btn) {
        if (isAudioEnabled) {
          icon.className = "fa-solid fa-volume-high text-emerald-400";
          btn.classList.add('border-emerald-500');
          playBeepSound(880, 0.15);
        } else {
          icon.className = "fa-solid fa-volume-xmark text-slate-400";
          btn.classList.remove('border-emerald-500');
        }
      }
    }

    function playBeepSound(freq = 800, duration = 0.1) {
      if (!isAudioEnabled) return;
      try {
        const AudioContext = window.AudioContext || window.webkitAudioContext;
        if (!AudioContext) return;
        const ctx = new AudioContext();
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = 'square'; // Authentic 8-bit square wave
        osc.frequency.value = freq;
        gain.gain.setValueAtTime(0.06, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);

        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + duration);
      } catch (e) {
        console.error('Audio synth error', e);
      }
    }

    function toggleCRT() {
      isCrtEnabled = !isCrtEnabled;
      const overlay = document.getElementById('scanlinesOverlay');
      const btn = document.getElementById('btnCrtToggle');

      if (overlay && btn) {
        if (isCrtEnabled) {
          overlay.classList.remove('hidden');
          btn.classList.add('border-purple-500');
        } else {
          overlay.classList.add('hidden');
          btn.classList.remove('border-purple-500');
        }
      }
      playBeepSound(750, 0.1);
    }

    function toggleTheme() {
      isDarkMode = !isDarkMode;
      const html = document.documentElement;
      const themeIcon = document.getElementById('themeIcon');

      if (themeIcon) {
        if (isDarkMode) {
          html.classList.add('dark');
          html.classList.remove('light');
          themeIcon.className = "fa-solid fa-moon text-amber-400";
        } else {
          html.classList.remove('dark');
          html.classList.add('light');
          themeIcon.className = "fa-solid fa-sun text-amber-500";
        }
      }
      playBeepSound(900, 0.1);
    }

    function toggleSchedule() {
      isAlternateSchedule = !isAlternateSchedule;
      const toggle = document.getElementById('scheduleToggle');
      const label = document.getElementById('scheduleToggleLabel');
      const title = document.getElementById('scheduleTitle');
      const grid = document.getElementById('scheduleGrid');

      if (grid) grid.querySelectorAll('.mod-card, .attendance-stamp').forEach(card => card.remove());
      if (toggle) toggle.setAttribute('aria-pressed', String(isAlternateSchedule));
      if (label) label.textContent = isAlternateSchedule ? 'HORARI GRUP B' : 'HORARI 1r CURS';
      if (title) title.textContent = isAlternateSchedule ? 'HORARI 1r CURS' : 'HORARI GRUP B';

      updateClockAndHUD();
      applyFilters();
      playBeepSound(620, 0.1);
    }

    function bindControls() {
      const actions = {
        'sidebar-close': () => toggleSidebar(false),
        'sidebar-open': () => toggleSidebar(true),
        'theme-toggle': toggleTheme,
        'crt-toggle': toggleCRT,
        'audio-toggle': toggleAudio,
        'analytics-open': () => { openAnalyticsModal(); toggleSidebar(false); },
        print: () => window.print(),
        'simulator-real': () => setSimulatorMode(false),
        'simulator-sim': () => setSimulatorMode(true),
        'simulator-preset': target => setSimPreset(Number(target.dataset.day), Number(target.dataset.minutes)),
        'search-clear': clearSearch,
        'teacher-filter': target => filterTeacher(target.dataset.teacher),
        'break-open': openBreakModal,
        'module-close': closeModal,
        'analytics-close': closeAnalyticsModal,
        'pedro-open': () => {
          updatePedroCountdown();
          document.getElementById('pedroModal').classList.remove('hidden');
        },
        'pedro-close': closePedroModal,
        'schedule-toggle': toggleSchedule,
        'simulator-update': updateSimulation,
        'search-update': handleSearch
      };
      const runAction = target => actions[target.dataset.action]?.(target);
      document.addEventListener('click', event => {
        const target = event.target.closest('[data-action]:not([data-on])');
        if (target) runAction(target);
      });
      ['input', 'change'].forEach(eventName => {
        document.addEventListener(eventName, event => {
          const target = event.target.closest('[data-on="' + eventName + '"][data-action]');
          if (target) runAction(target);
        });
      });
    }
    window.onload = function () {
      bindControls();
      renderScheduleCards();
      updateClockAndHUD();
      clockInterval = setInterval(updateClockAndHUD, 1000);

      document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
          closeModal();
          closeAnalyticsModal();
          closePedroModal();
          toggleSidebar(false);
        }
      });
    };
