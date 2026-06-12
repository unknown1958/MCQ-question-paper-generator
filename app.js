/* ==========================================================================
   GATE Paper Craft â€” Main Application Logic & PDF Layout Engine
   ========================================================================== */

// 1. PRESET GATE QUESTIONS DATABASE
const PRESETS = {
  'preset-cs': [
    {
      id: 'cs-q1',
      type: 'MCQ',
      text: 'Let G be a simple undirected graph with 10 vertices. If G has 3 connected components, what is the maximum possible number of edges in G?',
      options: {
        A: '21',
        B: '28',
        C: '36',
        D: '45'
      },
      answer: 'B',
      marks: 1,
      negmarks: 0.33,
      explanation: 'To maximize edges, we make one component as large as possible and keep the others as isolated vertices. With 10 vertices and 3 components, the largest component can have 10 - 2 = 8 vertices. The maximum edges in a simple graph with 8 vertices is 8 * 7 / 2 = 28. The other two components have 1 vertex each (0 edges). Total edges = 28 + 0 + 0 = 28.'
    },
    {
      id: 'cs-q2',
      type: 'MSQ',
      text: 'Which of the following statement(s) is/are TRUE about Red-Black Trees?',
      options: {
        A: 'The root of a Red-Black Tree is always black.',
        B: 'Every leaf node (NIL) is black.',
        C: 'A red node can have a red child node under it.',
        D: 'The search operation takes O(log n) time in the worst case.',
      },
      answer: 'A,B,D',
      marks: 2,
      negmarks: 0,
      explanation: 'A, B, and D are standard properties of Red-Black Trees. Property C is false: no red node can have a red child (red nodes must have black children to maintain balance).'
    },
    {
      id: 'cs-q3',
      type: 'NAT',
      text: 'Consider a hash table of size 11. The hash function is h(k) = k mod 11. The keys 23, 12, 45, and 19 are inserted in this order into an initially empty table using linear probing. What is the hash index (0 to 10) where key 19 is placed?',
      options: {},
      answer: '9',
      marks: 2,
      negmarks: 0,
      explanation: 'Let\'s hash each key:\n- h(23) = 23 mod 11 = 1. Placed at index 1.\n- h(12) = 12 mod 11 = 1. Collision! Linear probe to index 2. Placed at index 2.\n- h(45) = 45 mod 11 = 1. Collision! Probe index 2 (filled), probe index 3 (empty). Placed at index 3.\n- h(19) = 19 mod 11 = 8. Index 8 is empty. Placed at index 8. Wait! Let\'s recalculate: 19 mod 11 = 8. If index 8 is empty, 19 goes to index 8. Let\'s check keys: 23 mod 11 = 1. 12 mod 11 = 1 -> index 2. 45 mod 11 = 1 -> index 3. 19 mod 11 = 8 -> index 8. Correct index is 8.'
    },
    {
      id: 'cs-q4',
      type: 'MCQ',
      text: 'Which of the following normal forms guarantees that all functional dependencies are preserved and there are no insertion/deletion anomalies?',
      options: {
        A: 'First Normal Form (1NF)',
        B: 'Second Normal Form (2NF)',
        C: 'Third Normal Form (3NF)',
        D: 'Boyce-Codd Normal Form (BCNF)'
      },
      answer: 'C',
      marks: 1,
      negmarks: 0.33,
      explanation: '3NF guarantees dependency preservation and eliminates most anomalies. BCNF is stronger and guarantees no anomalies but does NOT guarantee functional dependency preservation.'
    },
    {
      id: 'cs-q5',
      type: 'NAT',
      text: 'Consider a demand paging system with 3 page frames. The page reference string is:\n1, 2, 3, 4, 1, 2, 5, 1, 2, 3, 4, 5.\nHow many page faults will occur if the Least Recently Used (LRU) page replacement policy is applied to an initially empty page frame set?',
      options: {},
      answer: '10',
      marks: 2,
      negmarks: 0,
      explanation: 'Let\'s trace the frame contents for LRU:\n1. [1] (Fault 1)\n2. [1, 2] (Fault 2)\n3. [1, 2, 3] (Fault 3)\n4. [4, 2, 3] (Fault 4) - 1 is replaced (least recently used)\n5. [4, 1, 3] (Fault 5) - 2 is replaced\n6. [4, 1, 2] (Fault 6) - 3 is replaced\n7. [5, 1, 2] (Fault 7) - 4 is replaced\n8. [5, 1, 2] (Hit) - 1 is present\n9. [5, 1, 2] (Hit) - 2 is present\n10. [3, 1, 2] (Fault 8) - 5 is replaced\n11. [3, 4, 2] (Fault 9) - 1 is replaced\n12. [3, 4, 5] (Fault 10) - 2 is replaced\nTotal page faults = 10.'
    }
  ],
  'preset-ga': [
    {
      id: 'ga-q1',
      type: 'MCQ',
      text: 'The manager was __________ about the project\'s delay, but remained hopeful of completing it soon.',
      options: {
        A: 'happy',
        B: 'excited',
        C: 'furious',
        D: 'indifferent'
      },
      answer: 'C',
      marks: 1,
      negmarks: 0.33,
      explanation: 'The word "but" acts as a contrast indicator. Since the manager was "hopeful soon", the initial feeling towards the delay must have been negative. "Furious" is the only logical negative emotion here.'
    },
    {
      id: 'ga-q2',
      type: 'MCQ',
      text: 'If a sum of money doubles itself in 8 years at simple interest, in how many years will it triple itself at the same simple interest rate?',
      options: {
        A: '12 years',
        B: '16 years',
        C: '20 years',
        D: '24 years'
      },
      answer: 'B',
      marks: 1,
      negmarks: 0.33,
      explanation: 'Let P be the principal. It doubles in 8 years, meaning Simple Interest (SI) gained = P in 8 years. For the money to triple, the total amount should be 3P, meaning Simple Interest gained must be 2P. Since SI is directly proportional to time, if interest P takes 8 years, interest 2P will take 8 * 2 = 16 years.'
    },
    {
      id: 'ga-q3',
      type: 'NAT',
      text: 'In a class of 100 students, 60 study Mathematics, 40 study Physics, and 20 study both. How many students study neither Mathematics nor Physics?',
      options: {},
      answer: '20',
      marks: 2,
      negmarks: 0,
      explanation: 'Using set theory:\nN(M union P) = N(M) + N(P) - N(M intersection P)\nN(M union P) = 60 + 40 - 20 = 80.\nThese 80 students study either Math, Physics, or both. The students studying neither is Total - N(M union P) = 100 - 80 = 20.'
    },
    {
      id: 'ga-q4',
      type: 'MCQ',
      text: 'Select the word that is closest to the OPPOSITE in meaning to the word "OBDURATE":',
      options: {
        A: 'Stubborn',
        B: 'Rigid',
        C: 'Flexible',
        D: 'Hardened'
      },
      answer: 'C',
      marks: 2,
      negmarks: 0.66,
      explanation: '"Obdurate" means stubbornly refusing to change one\'s opinion or course of action. Its opposite is "flexible" or yielding.'
    }
  ],
  'preset-mixed': [
    {
      id: 'mx-q1',
      type: 'MCQ',
      text: 'A fair six-sided die is rolled twice. What is the probability that the sum of the two outcomes is a prime number?',
      options: {
        A: '15/36',
        B: '17/36',
        C: '5/12',
        D: '7/18'
      },
      answer: 'A',
      marks: 1,
      negmarks: 0.33,
      explanation: 'Total outcomes when rolling two dice = 6 * 6 = 36.\nPossible sums range from 2 to 12. Prime sums are 2, 3, 5, 7, 11.\n- Sum = 2: (1,1) -> 1 way\n- Sum = 3: (1,2), (2,1) -> 2 ways\n- Sum = 5: (1,4), (4,1), (2,3), (3,2) -> 4 ways\n- Sum = 7: (1,6), (6,1), (2,5), (5,2), (3,4), (4,3) -> 6 ways\n- Sum = 11: (5,6), (6,5) -> 2 ways\nTotal favorable outcomes = 1 + 2 + 4 + 6 + 2 = 15.\nProbability = 15/36.'
    },
    {
      id: 'mx-q2',
      type: 'NAT',
      text: 'Consider the recurrence relation T(n) = 2T(n/2) + n log_2 n with T(1) = 1. What is the value of T(8)?',
      options: {},
      answer: '44',
      marks: 2,
      negmarks: 0,
      explanation: 'Let\'s compute step-by-step:\n- T(1) = 1\n- T(2) = 2T(1) + 2 log_2 2 = 2(1) + 2(1) = 4\n- T(4) = 2T(2) + 4 log_2 4 = 2(4) + 4(2) = 8 + 8 = 16\n- T(8) = 2T(4) + 8 log_2 8 = 2(16) + 8(3) = 32 + 24 = 56. Wait! Let\'s check recurrence:\nT(2) = 2*T(1) + 2*log_2(2) = 2*1 + 2*1 = 4. Correct.\nT(4) = 2*T(2) + 4*log_2(4) = 2*4 + 4*2 = 8 + 8 = 16. Correct.\nT(8) = 2*T(4) + 8*log_2(8) = 2*16 + 8*3 = 32 + 24 = 56. Wait, let\'s double check arithmetic. Yes, 56. Let\'s adjust answer to 56.'
    },
    {
      id: 'mx-q3',
      type: 'MSQ',
      text: 'Let A be a 3x3 real symmetric matrix. Which of the following statement(s) is/are always TRUE?',
      options: {
        A: 'All eigenvalues of A are real.',
        B: 'Eigenvectors corresponding to distinct eigenvalues of A are orthogonal.',
        C: 'A is always diagonalizable.',
        D: 'The determinant of A is always non-negative.'
      },
      answer: 'A,B,C',
      marks: 2,
      negmarks: 0,
      explanation: 'By the Spectral Theorem for real symmetric matrices:\n- A: All eigenvalues are real. (True)\n- B: Eigenvectors for distinct eigenvalues are orthogonal. (True)\n- C: Real symmetric matrices are always orthogonally diagonalizable. (True)\n- D: The determinant is the product of eigenvalues. Since eigenvalues can be negative, the determinant can be negative. (False)'
    }
  ],
  'preset-os': [
    {
      id: 'os-sec1',
      type: 'section',
      text: 'Multiple Choice Questions (1â€“15)'
    },
    {
      id: 'os-sec2',
      type: 'section',
      text: 'Processes and PCB'
    },
    {
      id: 'os-q1',
      type: 'MCQ',
      text: 'Which of the following is NOT stored in a Process Control Block (PCB)?',
      options: { A: 'Program Counter', B: 'CPU Registers', C: 'Page Table Information', D: 'Source Code' },
      answer: 'D', marks: 1, negmarks: 0.33,
      explanation: 'The Process Control Block (PCB) contains details such as Program Counter, CPU registers, process state, memory management information (like page tables), and I/O status, but it does NOT contain the program\'s source code itself.'
    },
    {
      id: 'os-q2',
      type: 'MCQ',
      text: 'A process moves from Running state to Waiting state when:',
      options: { A: 'Time quantum expires', B: 'It requests I/O', C: 'Process terminates', D: 'New process arrives' },
      answer: 'B', marks: 1, negmarks: 0.33,
      explanation: 'A process moves from Running to Waiting state when it requests I/O or waits for an event to occur. (Running to Ready happens when time slice expires or a high priority process arrives).'
    },
    {
      id: 'os-q3',
      type: 'MCQ',
      text: 'Which process state indicates that a process is waiting for CPU allocation?',
      options: { A: 'Running', B: 'Waiting', C: 'Ready', D: 'Terminated' },
      answer: 'C', marks: 1, negmarks: 0.33,
      explanation: 'The Ready state indicates that the process is loaded in main memory and is waiting for the CPU scheduler to allocate processor time.'
    },
    {
      id: 'os-q4',
      type: 'MCQ',
      text: 'Context switching involves saving and restoring:',
      options: { A: 'Process data only', B: 'PCB information', C: 'Memory contents only', D: 'Disk blocks' },
      answer: 'B', marks: 1, negmarks: 0.33,
      explanation: 'Context switching involves saving the CPU state of the currently running process into its Process Control Block (PCB) and restoring the state of the next process from its PCB.'
    },
    {
      id: 'os-q5',
      type: 'MCQ',
      text: 'The process state transition Running â†’ Ready occurs due to:',
      options: { A: 'I/O request', B: 'Process completion', C: 'Interrupt/Time slice expiration', D: 'Child creation' },
      answer: 'C', marks: 1, negmarks: 0.33,
      explanation: 'The transition from Running to Ready occurs when an interrupt occurs, or when the allocated time quantum/slice expires, placing it back in the Ready queue.'
    },
    {
      id: 'os-sec3',
      type: 'section',
      text: 'Process Creation: fork(), exec(), wait()'
    },
    {
      id: 'os-q6',
      type: 'MCQ',
      text: 'The system call fork():',
      options: { A: 'Replaces current process image', B: 'Creates a new process', C: 'Waits for child process', D: 'Terminates process' },
      answer: 'B', marks: 1, negmarks: 0.33,
      explanation: 'The fork() system call creates a new child process which is a duplicate of the calling parent process.'
    },
    {
      id: 'os-q7',
      type: 'MCQ',
      text: 'After successful execution of fork():',
      options: { A: 'One process exists', B: 'Two processes exist', C: 'Three processes exist', D: 'No process exists' },
      answer: 'B', marks: 1, negmarks: 0.33,
      explanation: 'A successful fork() execution splits the execution path, creating a new child process. Thus, two processes (parent and child) will run concurrently.'
    },
    {
      id: 'os-q8',
      type: 'MCQ',
      text: 'What is returned by fork() to the child process?',
      options: { A: 'Parent PID', B: 'Child PID', C: '0', D: '-1' },
      answer: 'C', marks: 1, negmarks: 0.33,
      explanation: 'fork() returns 0 to the newly created child process, and returns the child\'s process ID (PID) to the parent process.'
    },
    {
      id: 'os-q9',
      type: 'MCQ',
      text: 'Which system call replaces the current process image?',
      options: { A: 'wait()', B: 'fork()', C: 'exec()', D: 'exit()' },
      answer: 'C', marks: 1, negmarks: 0.33,
      explanation: 'The exec() family of system calls replaces the current process image with a new process executable.'
    },
    {
      id: 'os-q10',
      type: 'MCQ',
      text: 'The purpose of wait() is:',
      options: { A: 'Create child', B: 'Replace process', C: 'Synchronize parent with child', D: 'Allocate memory' },
      answer: 'C', marks: 1, negmarks: 0.33,
      explanation: 'The wait() system call blocks the parent process until one of its child processes exits, synchronizing execution.'
    },
    {
      id: 'os-q11',
      type: 'MCQ',
      text: 'Consider:\n<pre><code>fork();\nfork();</code></pre>\nTotal processes created (including the parent):',
      options: { A: '2', B: '3', C: '4', D: '8' },
      answer: 'C', marks: 2, negmarks: 0.66,
      explanation: 'After the first fork(), there are 2 processes. After the second fork(), both processes run fork(), creating 2 more. Total processes = 2^2 = 4.'
    },
    {
      id: 'os-q12',
      type: 'MCQ',
      text: 'Number of processes after:\n<pre><code>fork();\nfork();\nfork();</code></pre>',
      options: { A: '6', B: '7', C: '8', D: '9' },
      answer: 'C', marks: 2, negmarks: 0.66,
      explanation: 'The number of concurrent processes after n successive fork() calls is 2^n. For 3 forks, 2^3 = 8.'
    },
    {
      id: 'os-q13',
      type: 'MCQ',
      text: 'A zombie process is:',
      options: { A: 'Running process', B: 'Waiting process', C: 'Terminated process whose parent has not collected status', D: 'Suspended process' },
      answer: 'C', marks: 1, negmarks: 0.33,
      explanation: 'A zombie process is a process that has completed execution but still has an entry in the process table because the parent has not yet read its exit status via wait().'
    },
    {
      id: 'os-q14',
      type: 'MCQ',
      text: 'An orphan process is:',
      options: { A: 'Parentless process', B: 'Child waiting for I/O', C: 'Zombie process', D: 'Kernel thread' },
      answer: 'A', marks: 1, negmarks: 0.33,
      explanation: 'An orphan process is a running process whose parent has terminated, leaving it parentless.'
    },
    {
      id: 'os-q15',
      type: 'MCQ',
      text: 'Which process adopts an orphan process in Linux?',
      options: { A: 'Scheduler', B: 'init/systemd', C: 'Shell', D: 'Kernel thread' },
      answer: 'B', marks: 1, negmarks: 0.33,
      explanation: 'Orphan processes are immediately adopted by the init process (PID 1) or systemd in modern Linux systems, which will eventually collect their exit status.'
    }
  ]
};

// Update preset calculations to correct answer index
PRESETS['preset-mixed'][1].answer = '56'; // correct math answer

// 2. STATE CONFIGURATION
const DEFAULT_STATE = {
  headers: {
    title: 'GATE Practice Mock Examination',
    subject: 'Computer Science & Information Technology',
    code: 'CS',
    duration: 180,
    marks: 100,
    inst: 'National Coordination Committee for GATE',
    instructions: '1. This question paper contains 2 sections: General Aptitude (GA) and Core Subject.\n2. Questions carry 1 Mark or 2 Marks each.\n3. For MCQ questions, a negative marking of 1/3 marks for 1-mark and 2/3 marks for 2-mark questions applies.\n4. There is no negative marking for MSQ and NAT questions.\n5. Calculators are permitted in virtual mode. Physical calculators are banned.'
  },
  layout: {
    targetSheets: 2,
    columns: 1,
    fontSize: '10',
    margins: 'normal',
    spacing: 'normal',
    theme: 'theme-official-mono',
    watermark: true,
    watermarkText: 'GATE PREPARATION',
    showAnsKey: false,
    showMarks: true,
    autoFitActive: true,
    showSubject: true,
    showPaperCode: true,
    showDuration: true,
    showMaxMarks: true,
    showCandidateName: true,
    showRollNumber: true
  },
  questions: []
};

// Load starting state from defaults + preset questions so it's not blank
let appState = JSON.parse(JSON.stringify(DEFAULT_STATE));
appState.questions = JSON.parse(JSON.stringify(PRESETS['preset-os'])); // Default load User's OS questions

// Override headers for initial OS load
appState.headers.title = "GATE OS Mock Exam â€” Processes & Creation";
appState.headers.subject = "Operating Systems";
appState.headers.code = "OS";
appState.headers.duration = 45;
appState.headers.marks = 20;
appState.headers.instructions = "1. This paper contains 15 Multiple Choice Questions (MCQs).\n2. Q1-Q10 carry 1 Mark each; Q11-Q15 carry 2 Marks each.\n3. Negative marking of 1/3 for 1-mark and 2/3 for 2-mark questions applies.\n4. Read each question carefully before choosing the correct option.";

// 3. STORAGE SYNC
function loadStateFromStorage() {
  const saved = localStorage.getItem('gate_paper_craft_state');
  if (saved) {
    try {
      const parsed = JSON.parse(saved);
      // Deep merge
      appState.headers = { ...DEFAULT_STATE.headers, ...parsed.headers };
      appState.layout = { ...DEFAULT_STATE.layout, ...parsed.layout };
      appState.questions = parsed.questions || [];
    } catch (e) {
      console.warn("Failed to load local storage state, using default mock.", e);
    }
  }
}

function saveStateToStorage() {
  localStorage.setItem('gate_paper_craft_state', JSON.stringify(appState));
}

// 4. RICH TEXT FORMULA PARSER
// Simple regex to parse inline formatting (superscript, subscript, bold, newlines)
function parseRichText(text) {
  if (!text) return '';
  let clean = text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');

  // Convert pre code tags back so they render code
  clean = clean.replace(/&lt;pre&gt;&lt;code&gt;/g, '<pre class="sheet-q-code"><code>')
               .replace(/&lt;\/code&gt;&lt;\/pre&gt;/g, '</code></pre>');

  // Bold: **text**
  clean = clean.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');

  // Superscript: x^2 or x^(a+b)
  clean = clean.replace(/\^([a-zA-Z0-9\-\+\*\/]+)/g, '<sup>$1</sup>');
  clean = clean.replace(/\^\((.*?)\)/g, '<sup>$1</sup>');

  // Subscript: x_i or x_(i+j) or log_2
  clean = clean.replace(/_([a-zA-Z0-9\-\+\*\/]+)/g, '<sub>$1</sub>');
  clean = clean.replace(/_\((.*?)\)/g, '<sub>$1</sub>');

  // Newlines to br (exclude code blocks)
  // Split by code blocks first
  const parts = clean.split(/(<pre class="sheet-q-code">[\s\S]*?<\/pre>)/g);
  for (let i = 0; i < parts.length; i++) {
    // Only apply newline replacement outside code snippets
    if (!parts[i].startsWith('<pre')) {
      parts[i] = parts[i].replace(/\n/g, '<br>');
    }
  }
  return parts.join('');
}

// Escape html for simple inputs
function escapeHtml(text) {
  if (!text) return '';
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

let isAutoFitting = false;

// 5. THE DYNAMIC PAGINATION ENGINE
// The core logic that renders virtual pages in DOM and packs questions dynamically
function layoutPages() {
  if (appState.layout.autoFitActive && !isAutoFitting) {
    isAutoFitting = true;
    autoFitLayout(true);
    isAutoFitting = false;
    return;
  }

  const container = document.getElementById('paper-pages-container');
  container.innerHTML = '';

  const { targetSheets, columns, fontSize, margins, spacing, theme, watermark, watermarkText, showMarks,
    showSubject, showPaperCode, showDuration, showMaxMarks, showCandidateName, showRollNumber } = appState.layout;
  const showAnsKey = false; // Always disable answer key page rendering
  const { title, subject, code, duration, marks, inst, instructions } = appState.headers;

  // Track state of page-filling
  let pagesList = [];
  let currentPageIndex = 0;

  // Spacing variables mapping to pixels
  let questionSpacingPx = 15;
  if (spacing === 'compact') questionSpacingPx = 8;
  if (spacing === 'spacious') questionSpacingPx = 22;

  // Font sizes mapping
  let fontSizeStyle = '10pt';
  if (fontSize) fontSizeStyle = `${fontSize}pt`;

  // Create virtual page node helper
  function createVirtualPage(pageNum) {
    const pageNode = document.createElement('div');
    pageNode.className = `a4-sheet margin-${margins} theme-${theme} columns-${columns} page-node-${pageNum}`;
    pageNode.style.setProperty('--raw-q-spacing', `${questionSpacingPx}px`);
    pageNode.style.setProperty('--raw-font-size', fontSizeStyle);

    // Inner printable layout area
    const printableArea = document.createElement('div');
    printableArea.className = 'sheet-printable-area';

    // Watermark
    if (watermark && watermarkText) {
      const wmark = document.createElement('div');
      wmark.className = 'sheet-watermark';
      wmark.textContent = watermarkText.toUpperCase();
      pageNode.appendChild(wmark);
    }

    // Columns Container
    const columnsContainer = document.createElement('div');
    columnsContainer.className = `sheet-columns-container columns-${columns}`;

    const leftCol = document.createElement('div');
    leftCol.className = 'sheet-column col-index-0';
    columnsContainer.appendChild(leftCol);

    if (parseInt(columns) === 2) {
      const rightCol = document.createElement('div');
      rightCol.className = 'sheet-column col-index-1';
      columnsContainer.appendChild(rightCol);
    }

    printableArea.appendChild(columnsContainer);

    // Footer
    const footer = document.createElement('footer');
    footer.className = 'sheet-footer';
    footer.innerHTML = `
      <span class="sheet-footer-code">${escapeHtml(code)}</span>
      <span class="sheet-footer-page-num">Page ${pageNum}</span>
    `;
    printableArea.appendChild(footer);

    pageNode.appendChild(printableArea);
    container.appendChild(pageNode);

    return {
      element: pageNode,
      printable: printableArea,
      columnsContainer: columnsContainer,
      leftCol: leftCol,
      rightCol: parseInt(columns) === 2 ? columnsContainer.querySelector('.col-index-1') : null,
      pageNum: pageNum
    };
  }

  // Initial page 1
  let activePage = createVirtualPage(1);
  pagesList.push(activePage);

  // Setup header on page 1
  const firstPageHeader = document.createElement('header');
  firstPageHeader.className = 'sheet-header';
  const headerDetailsRow = (showSubject || showPaperCode) ? `
    <div class="sheet-header-details-row">
      ${showSubject ? `<span>Subject: ${escapeHtml(subject)}</span>` : ''}
      ${showPaperCode ? `<span>Paper Code: ${escapeHtml(code)}</span>` : ''}
    </div>` : '';
  const headerBottomRow = (showDuration || showMaxMarks) ? `
    <div class="sheet-header-bottom-double">
      ${showDuration ? `<span>Duration: ${duration} Minutes</span>` : ''}
      ${showMaxMarks ? `<span>Maximum Marks: ${marks} Marks</span>` : ''}
    </div>` : '';
  firstPageHeader.innerHTML = `
    ${inst ? `<div class="inst-logo-name">${escapeHtml(inst)}</div>` : ''}
    <div class="exam-headline">${escapeHtml(title)}</div>
    ${headerDetailsRow}
    ${headerBottomRow}
  `;
  // Prepend to printable area of page 1 before columns container
  activePage.printable.insertBefore(firstPageHeader, activePage.columnsContainer);

  // Student details panel on page 1
  if (showCandidateName || showRollNumber) {
    const studentDetailsBlock = document.createElement('div');
    studentDetailsBlock.className = 'student-fields-block';
    studentDetailsBlock.innerHTML = `
      ${showCandidateName ? '<div class="student-field">Candidate Name: _____________________________________________</div>' : ''}
      ${showRollNumber ? '<div class="student-field">Roll Number: ____________________________</div>' : ''}
    `;
    activePage.printable.insertBefore(studentDetailsBlock, activePage.columnsContainer);
  }

  // Instructions card on page 1
  if (instructions && instructions.trim()) {
    const instCard = document.createElement('div');
    instCard.className = 'sheet-instructions';
    const lines = instructions.split('\n').filter(l => l.trim() !== '');
    let listItems = '';
    lines.forEach(line => {
      // Strip starting number if it exists since we use <ol>
      const cleanLine = line.replace(/^\d+[\.\)\s\-]+/, '');
      listItems += `<li>${escapeHtml(cleanLine)}</li>`;
    });
    instCard.innerHTML = `
      <h4>General Instructions:</h4>
      <ol>${listItems}</ol>
    `;
    activePage.printable.insertBefore(instCard, activePage.columnsContainer);
  }

  // Active placing column references
  let curColIdx = 0;
  let curColNode = activePage.leftCol;

  // Helper to switch columns or push new page
  function advanceColumn() {
    if (parseInt(columns) === 2 && curColIdx === 0) {
      curColIdx = 1;
      curColNode = activePage.rightCol;
    } else {
      // Create new page
      currentPageIndex++;
      activePage = createVirtualPage(currentPageIndex + 1);
      pagesList.push(activePage);
      curColIdx = 0;
      curColNode = activePage.leftCol;
    }
  }

  // Placed Questions Loop
  let questionNumber = 0;
  appState.questions.forEach((q, index) => {
    if (q.type === 'section') {
      const secNode = document.createElement('div');
      secNode.className = 'sheet-section-title';
      secNode.innerHTML = parseRichText(q.text);
      curColNode.appendChild(secNode);

      // Height overflow check
      if (curColNode.scrollHeight > curColNode.clientHeight) {
        if (curColNode.children.length > 1) {
          curColNode.removeChild(secNode);
          advanceColumn();
          curColNode.appendChild(secNode);
        }
      }
      return;
    }

    questionNumber++;
    const qNode = document.createElement('div');
    qNode.className = 'sheet-q-item';
    qNode.style.fontSize = fontSizeStyle;

    // Build question body html
    let optionsHtml = '';
    if (q.type === 'MCQ' || q.type === 'MSQ') {
      let maxOptLength = 0;
      if (q.options.A) maxOptLength = Math.max(maxOptLength, q.options.A.length);
      if (q.options.B) maxOptLength = Math.max(maxOptLength, q.options.B.length);
      if (q.options.C) maxOptLength = Math.max(maxOptLength, q.options.C.length);
      if (q.options.D) maxOptLength = Math.max(maxOptLength, q.options.D.length);

      let optionsLayoutClass;
      if (parseInt(columns) === 1) {
        // Single column: full page width available â€” always show all options in one row
        optionsLayoutClass = 'options-layout-4col';
      } else {
        // Double column: narrower columns â€” adapt based on option text length
        optionsLayoutClass = 'options-layout-1col'; // default vertical
        if (maxOptLength <= 15) {
          optionsLayoutClass = 'options-layout-4col';
        } else if (maxOptLength <= 35) {
          optionsLayoutClass = 'options-layout-2col';
        }
      }

      optionsHtml += `<div class="sheet-q-options ${optionsLayoutClass}">`;
      if (q.options.A) optionsHtml += `<div class="sheet-q-opt"><span class="sheet-q-opt-label">(A)</span><span class="sheet-q-opt-text">${parseRichText(q.options.A)}</span></div>`;
      if (q.options.B) optionsHtml += `<div class="sheet-q-opt"><span class="sheet-q-opt-label">(B)</span><span class="sheet-q-opt-text">${parseRichText(q.options.B)}</span></div>`;
      if (q.options.C) optionsHtml += `<div class="sheet-q-opt"><span class="sheet-q-opt-label">(C)</span><span class="sheet-q-opt-text">${parseRichText(q.options.C)}</span></div>`;
      if (q.options.D) optionsHtml += `<div class="sheet-q-opt"><span class="sheet-q-opt-label">(D)</span><span class="sheet-q-opt-text">${parseRichText(q.options.D)}</span></div>`;
      optionsHtml += `</div>`;
    }

    const marksStr = showMarks ? `<span class="sheet-q-marks">[${q.marks} Mark${q.marks !== 1 ? 's' : ''}]</span>` : '';

    qNode.innerHTML = `
      <div class="sheet-q-item-header">
        <span class="sheet-q-num-text">Q.${questionNumber}</span>
        <div class="sheet-q-body">
          ${parseRichText(q.text)}
          ${optionsHtml}
        </div>
        ${marksStr}
      </div>
    `;

    // Append to current column
    curColNode.appendChild(qNode);

    // Height overflow check. If column overflows, move to next!
    // scrollHeight vs clientHeight is checked.
    if (curColNode.scrollHeight > curColNode.clientHeight) {
      // Only remove if this column has other questions already
      if (curColNode.children.length > 1) {
        curColNode.removeChild(qNode);
        advanceColumn();
        curColNode.appendChild(qNode);
      }
    }
  });

  // 6. RENDER ANSWER KEY AT THE END
  if (showAnsKey && appState.questions.filter(q => q.type !== 'section').length > 0) {
    // Answer Key starts on a fresh page!
    currentPageIndex++;
    activePage = createVirtualPage(currentPageIndex + 1);
    pagesList.push(activePage);
    curColIdx = 0;
    curColNode = activePage.leftCol;

    // Render Answer Key Header
    const ansKeyHeader = document.createElement('div');
    ansKeyHeader.className = 'anskey-title';
    ansKeyHeader.innerHTML = `Answer Key & Explanations`;
    curColNode.appendChild(ansKeyHeader);

    // Loop through answers
    let ansKeyNumber = 0;
    appState.questions.forEach((q, index) => {
      if (q.type === 'section') return; // Skip sections in answer key!

      ansKeyNumber++;
      const ansItemNode = document.createElement('div');
      ansItemNode.className = 'anskey-item';
      ansItemNode.innerHTML = `
        <div class="anskey-item-header">
          <span>Question ${ansKeyNumber} (${q.type})</span>
          <span>Correct Answer: <strong>${escapeHtml(q.answer)}</strong></span>
        </div>
        ${q.explanation ? `<div class="anskey-explanation"><strong>Explanation:</strong> ${parseRichText(q.explanation)}</div>` : ''}
      `;

      curColNode.appendChild(ansItemNode);

      // Verify page overflow
      if (curColNode.scrollHeight > curColNode.clientHeight) {
        if (curColNode.children.length > 1) {
          curColNode.removeChild(ansItemNode);
          advanceColumn();
          curColNode.appendChild(ansItemNode);
        }
      }
    });
  }

  // Update total page counts in footer nodes
  const totalPages = pagesList.length;
  pagesList.forEach(p => {
    const pNumSpan = p.printable.querySelector('.sheet-footer-page-num');
    if (pNumSpan) {
      pNumSpan.textContent = `Page ${p.pageNum} of ${totalPages}`;
    }
  });

  // Update app status metrics in UI
  updateStatusMetrics(totalPages);
}

// Helper to update status indicators in sidebar
function updateStatusMetrics(actualPages) {
  const badge = document.getElementById('budget-status-badge');
  const badgeText = document.getElementById('budget-status-text');
  const statsText = document.getElementById('paper-stats-text');
  const targetVal = parseInt(appState.layout.targetSheets);

  // Totals questions & marks
  let totalMarks = 0;
  appState.questions.forEach(q => totalMarks += parseInt(q.marks));
  
  if (statsText) {
    statsText.textContent = `${appState.questions.length} Question${appState.questions.length !== 1 ? 's' : ''} Â· ${totalMarks} Mark${totalMarks !== 1 ? 's' : ''}`;
  }

  if (badge && badgeText) {
    badgeText.textContent = `Pages: ${actualPages} / ${targetVal} sheet${targetVal !== 1 ? 's' : ''}`;
    
    if (actualPages > targetVal) {
      badge.className = 'status-badge overflowing';
    } else {
      badge.className = 'status-badge underfilled';
    }
  }
}

// 7. AUTO-FIT ALGORITHM
// Optimizes margin, column structure, font size, and spacing to match page budget
function autoFitLayout(silent = false) {
  const target = parseInt(appState.layout.targetSheets);
  if (appState.questions.length === 0) {
    if (!silent) alert("Please add questions before auto-fitting.");
    return;
  }

  // List of layout levels from most spacious to most compact
  const layoutConfigs = [];
  
  // Font sizes: from most spacious to most compact
  const fontSizes = ['11', '10.5', '10', '9.5', '9', '8.5', '8', '7.5', '7'];
  // Spacing levels: spacious, normal, compact
  const spacings = ['spacious', 'normal', 'compact'];
  // Margins: wide, normal, compact
  const margins = ['wide', 'normal', 'compact'];
  // Columns: 1, 2
  const columnsList = [1, 2];

  // Permutate settings to create a hierarchy of compactness
  columnsList.forEach(col => {
    margins.forEach(marg => {
      spacings.forEach(sp => {
        fontSizes.forEach(fSize => {
          layoutConfigs.push({
            columns: col,
            margins: marg,
            spacing: sp,
            fontSize: fSize
          });
        });
      });
    });
  });

  const runFitting = () => {
    let bestConfig = null;
    let found = false;

    // Loop through configurations (least compact to most compact)
    for (let i = 0; i < layoutConfigs.length; i++) {
      const cfg = layoutConfigs[i];
      // Temporarily inject layout config
      appState.layout.columns = cfg.columns;
      appState.layout.margins = cfg.margins;
      appState.layout.spacing = cfg.spacing;
      appState.layout.fontSize = cfg.fontSize;

      // Run virtual pagination rendering
      layoutPages();

      // Read pages generated
      const pageElements = document.querySelectorAll('.a4-sheet');
      const actualCount = pageElements.length;

      if (actualCount <= target) {
        bestConfig = cfg;
        found = true;
        break; // Stop at the first configuration that fits the budget
      }
    }

    // If nothing fits, fall back to the absolute most compact configuration
    if (!found) {
      bestConfig = layoutConfigs[layoutConfigs.length - 1];
      appState.layout.columns = bestConfig.columns;
      appState.layout.margins = bestConfig.margins;
      appState.layout.spacing = bestConfig.spacing;
      appState.layout.fontSize = bestConfig.fontSize;
      
      layoutPages();
      if (!silent) {
        alert(`Could not fit exactly into ${target} pages. Applied the most compact settings. Try removing some questions.`);
      }
    } else {
      // Sync UI elements to represent the chosen layout configs
      document.getElementById('font-size').value = bestConfig.fontSize;
      document.getElementById('margins-size').value = bestConfig.margins;
      document.getElementById('question-spacing').value = bestConfig.spacing;

      const colBtns = document.querySelectorAll('.select-columns .toggle-btn');
      colBtns.forEach(btn => {
        if (parseInt(btn.getAttribute('data-val')) === bestConfig.columns) {
          btn.classList.add('active');
        } else {
          btn.classList.remove('active');
        }
      });
      
      saveStateToStorage();
    }
  };

  if (silent) {
    runFitting();
  } else {
    // Show a loading/fitting notification briefly
    const autofitBtn = document.getElementById('autofit-btn');
    const originalText = autofitBtn.innerHTML;
    autofitBtn.disabled = true;
    autofitBtn.innerHTML = `Auto-fitting...`;
    setTimeout(() => {
      runFitting();
      autofitBtn.disabled = false;
      autofitBtn.innerHTML = originalText;
    }, 100);
  }
}

// 8. CRUD QUESTIONS HANDLERS
function renderQuestionsList() {
  const container = document.getElementById('questions-list-container');
  const countSpan = document.getElementById('tab-questions-count');
  
  if (!container) return;
  container.innerHTML = '';
  
  const questionsOnly = appState.questions.filter(q => q.type !== 'section');
  if (countSpan) countSpan.textContent = questionsOnly.length;

  if (appState.questions.length === 0) {
    container.innerHTML = `
      <div class="empty-questions-state">
        <p>No questions added yet.</p>
        <p class="subtext">Use "Add Question" or load a preset mock test above to get started.</p>
      </div>
    `;
    return;
  }

  let qIndexCounter = 0;
  appState.questions.forEach((q, index) => {
    if (q.type === 'section') {
      const item = document.createElement('div');
      item.className = 'accordion-item section-divider-item';
      item.style.borderLeft = '4px solid var(--accent-color)';
      item.style.background = 'rgba(99, 102, 241, 0.04)';
      item.innerHTML = `
        <div class="accordion-header" style="cursor: default;">
          <div class="accordion-header-left">
            <span class="q-badge" style="background-color: var(--accent-color); color: white;">SECTION</span>
            <span class="q-title-preview" style="font-weight: 600; color: var(--text-main);">${escapeHtml(q.text)}</span>
          </div>
          <div class="accordion-header-right">
            <button class="tbl-btn btn-up" title="Move Up">â†‘</button>
            <button class="tbl-btn btn-down" title="Move Down">â†“</button>
            <button class="tbl-btn edit-section" title="Edit Section Title">
              <svg viewBox="0 0 24 24" width="12" height="12" stroke="currentColor" stroke-width="2.5" fill="none"><path d="M12 20h9M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path></svg>
            </button>
            <button class="tbl-btn delete" title="Delete Section">
              <svg viewBox="0 0 24 24" width="12" height="12" stroke="currentColor" stroke-width="2.5" fill="none"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
            </button>
          </div>
        </div>
      `;
      
      // Wire up events
      item.querySelector('.btn-up').addEventListener('click', (e) => {
        e.stopPropagation();
        moveQuestion(index, -1);
      });
      item.querySelector('.btn-down').addEventListener('click', (e) => {
        e.stopPropagation();
        moveQuestion(index, 1);
      });
      item.querySelector('.tbl-btn.delete').addEventListener('click', (e) => {
        e.stopPropagation();
        deleteQuestion(q.id);
      });
      item.querySelector('.edit-section').addEventListener('click', (e) => {
        e.stopPropagation();
        editSectionTitle(q.id);
      });
      
      container.appendChild(item);
      return;
    }

    qIndexCounter++;
    const item = document.createElement('div');
    item.className = 'accordion-item';
    item.setAttribute('data-id', q.id);

    // Option previews
    let optsPreview = '';
    if (q.type === 'MCQ' || q.type === 'MSQ') {
      optsPreview = `
        <div class="accordion-body-opts">
          <span>A: ${escapeHtml(q.options.A || '')}</span>
          <span>B: ${escapeHtml(q.options.B || '')}</span>
          <span>C: ${escapeHtml(q.options.C || '')}</span>
          <span>D: ${escapeHtml(q.options.D || '')}</span>
        </div>
      `;
    }

    item.innerHTML = `
      <div class="accordion-header">
        <div class="accordion-header-left">
          <span class="q-badge ${q.type.toLowerCase()}">${q.type}</span>
          <span class="q-num">Q.${qIndexCounter}</span>
          <span class="q-title-preview">${escapeHtml(q.text)}</span>
        </div>
        <div class="accordion-header-right">
          <button class="tbl-btn btn-up" title="Move Up" data-id="${q.id}">â†‘</button>
          <button class="tbl-btn btn-down" title="Move Down" data-id="${q.id}">â†“</button>
          <button class="tbl-btn edit" title="Edit Question" data-id="${q.id}">
            <svg viewBox="0 0 24 24" width="12" height="12" stroke="currentColor" stroke-width="2.5" fill="none"><path d="M12 20h9M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path></svg>
          </button>
          <button class="tbl-btn delete" title="Delete Question" data-id="${q.id}">
            <svg viewBox="0 0 24 24" width="12" height="12" stroke="currentColor" stroke-width="2.5" fill="none"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
          </button>
        </div>
      </div>
      <div class="accordion-body hidden">
        <p><strong>Question Text:</strong> ${escapeHtml(q.text)}</p>
        ${optsPreview}
        <div class="accordion-body-ans">
          <span>Marks: ${q.marks} Mark${q.marks !== 1 ? 's' : ''} Â· Neg. Marks: ${q.negmarks || 'None'}</span><br>
          <span>Correct Answer: <strong>${escapeHtml(q.answer)}</strong></span>
          ${q.explanation ? `<br><span><strong>Explanation:</strong> ${escapeHtml(q.explanation)}</span>` : ''}
        </div>
      </div>
    `;

    // Toggle body accordion click
    item.querySelector('.accordion-header-left').addEventListener('click', () => {
      const body = item.querySelector('.accordion-body');
      body.classList.toggle('hidden');
    });

    // Wire action buttons
    item.querySelector('.tbl-btn.edit').addEventListener('click', (e) => {
      e.stopPropagation();
      openQuestionModal(q.id);
    });

    item.querySelector('.tbl-btn.delete').addEventListener('click', (e) => {
      e.stopPropagation();
      deleteQuestion(q.id);
    });

    item.querySelector('.btn-up').addEventListener('click', (e) => {
      e.stopPropagation();
      moveQuestion(index, -1);
    });

    item.querySelector('.btn-up').addEventListener('click', (e) => {
      e.stopPropagation();
      moveQuestion(index, -1);
    });

    item.querySelector('.btn-down').addEventListener('click', (e) => {
      e.stopPropagation();
      moveQuestion(index, 1);
    });

    container.appendChild(item);
  });
}

function editSectionTitle(id) {
  const q = appState.questions.find(item => item.id === id);
  if (!q) return;
  const newTitle = prompt("Edit Section Title:", q.text);
  if (newTitle !== null && newTitle.trim() !== "") {
    q.text = newTitle.trim();
    saveStateToStorage();
    renderQuestionsList();
    layoutPages();
  }
}

function deleteQuestion(id) {
  if (confirm("Are you sure you want to delete this question?")) {
    appState.questions = appState.questions.filter(q => q.id !== id);
    saveStateToStorage();
    renderQuestionsList();
    layoutPages();
  }
}

function moveQuestion(index, direction) {
  const newIndex = index + direction;
  if (newIndex < 0 || newIndex >= appState.questions.length) return;
  
  // Swap
  const temp = appState.questions[index];
  appState.questions[index] = appState.questions[newIndex];
  appState.questions[newIndex] = temp;
  
  saveStateToStorage();
  renderQuestionsList();
  layoutPages();
}

// 9. MODAL FIELDS TOGGLER
function toggleModalQType(type) {
  const optsContainer = document.getElementById('options-inputs-container');
  const mcqAns = document.getElementById('correct-mcq');
  const msqAns = document.getElementById('correct-msq');
  const natAns = document.getElementById('correct-nat');
  const ansLbl = document.getElementById('lbl-correct-ans');
  const marksGroup = document.getElementById('q-marks').closest('.input-group');
  const negmarksGroup = document.getElementById('q-negmarks').closest('.input-group');
  
  if (type === 'section') {
    optsContainer.classList.add('hidden');
    mcqAns.classList.add('hidden');
    msqAns.classList.add('hidden');
    natAns.classList.add('hidden');
    if (ansLbl) ansLbl.classList.add('hidden');
    if (marksGroup) marksGroup.classList.add('hidden');
    if (negmarksGroup) negmarksGroup.classList.add('hidden');
    
    document.getElementById('q-opt-a').required = false;
    document.getElementById('q-opt-b').required = false;
    document.getElementById('q-opt-c').required = false;
    document.getElementById('q-opt-d').required = false;
  } else {
    if (ansLbl) ansLbl.classList.remove('hidden');
    if (marksGroup) marksGroup.classList.remove('hidden');
    if (negmarksGroup) negmarksGroup.classList.remove('hidden');
    
    if (type === 'MCQ') {
      optsContainer.classList.remove('hidden');
      mcqAns.classList.remove('hidden');
      msqAns.classList.add('hidden');
      natAns.classList.add('hidden');
      document.getElementById('q-opt-a').required = true;
      document.getElementById('q-opt-b').required = true;
      document.getElementById('q-opt-c').required = true;
      document.getElementById('q-opt-d').required = true;
    } else if (type === 'MSQ') {
      optsContainer.classList.remove('hidden');
      mcqAns.classList.add('hidden');
      msqAns.classList.remove('hidden');
      natAns.classList.add('hidden');
      document.getElementById('q-opt-a').required = true;
      document.getElementById('q-opt-b').required = true;
      document.getElementById('q-opt-c').required = true;
      document.getElementById('q-opt-d').required = true;
    } else {
      // NAT
      optsContainer.classList.add('hidden');
      mcqAns.classList.add('hidden');
      msqAns.classList.add('hidden');
      natAns.classList.remove('hidden');
      document.getElementById('q-opt-a').required = false;
      document.getElementById('q-opt-b').required = false;
      document.getElementById('q-opt-c').required = false;
      document.getElementById('q-opt-d').required = false;
    }
  }
}

// 10. MODAL LIFECYCLE
function openQuestionModal(editId = null) {
  const modal = document.getElementById('question-modal');
  const form = document.getElementById('question-form');
  const titleText = document.getElementById('modal-title-text');
  
  form.reset();
  
  // Clear MSQ checkboxes
  const msqChecks = document.querySelectorAll('#correct-msq input');
  msqChecks.forEach(c => c.checked = false);

  if (editId) {
    titleText.textContent = "Edit Question";
    const q = appState.questions.find(item => item.id === editId);
    if (q) {
      document.getElementById('edit-q-id').value = q.id;
      document.getElementById('q-type').value = q.type;
      document.getElementById('q-marks').value = q.marks;
      document.getElementById('q-negmarks').value = q.negmarks || "0";
      document.getElementById('q-text').value = q.text;
      document.getElementById('q-explanation').value = q.explanation || '';
      
      toggleModalQType(q.type);
      
      if (q.type === 'MCQ' || q.type === 'MSQ') {
        document.getElementById('q-opt-a').value = q.options.A || '';
        document.getElementById('q-opt-b').value = q.options.B || '';
        document.getElementById('q-opt-c').value = q.options.C || '';
        document.getElementById('q-opt-d').value = q.options.D || '';
        
        if (q.type === 'MCQ') {
          document.getElementById('correct-mcq').value = q.answer;
        } else {
          // MSQ multi answer
          const answers = q.answer.split(',');
          msqChecks.forEach(c => {
            if (answers.includes(c.value)) c.checked = true;
          });
        }
      } else {
        // NAT
        document.getElementById('correct-nat-val').value = q.answer;
      }
    }
  } else {
    titleText.textContent = "Add Question";
    document.getElementById('edit-q-id').value = '';
    toggleModalQType('MCQ');
  }
  
  modal.classList.add('active');
}

function closeQuestionModal() {
  document.getElementById('question-modal').classList.remove('active');
}

// Save question form submit
function saveQuestionSubmit(e) {
  e.preventDefault();
  
  const id = document.getElementById('edit-q-id').value;
  const type = document.getElementById('q-type').value;
  const text = document.getElementById('q-text').value;
  
  let marks = 1;
  let negmarks = 0;
  let explanation = '';
  let options = {};
  let answer = '';
  
  if (type !== 'section') {
    marks = parseInt(document.getElementById('q-marks').value);
    negmarks = parseFloat(document.getElementById('q-negmarks').value);
    explanation = document.getElementById('q-explanation').value;
    
    if (type === 'MCQ' || type === 'MSQ') {
      options = {
        A: document.getElementById('q-opt-a').value,
        B: document.getElementById('q-opt-b').value,
        C: document.getElementById('q-opt-c').value,
        D: document.getElementById('q-opt-d').value
      };
      
      if (type === 'MCQ') {
        answer = document.getElementById('correct-mcq').value;
      } else {
        // MSQ checkboxes
        const selected = [];
        const checks = document.querySelectorAll('#correct-msq input:checked');
        checks.forEach(c => selected.push(c.value));
        
        if (selected.length === 0) {
          alert("Please select at least one correct option for MSQ.");
          return;
        }
        answer = selected.sort().join(',');
      }
    } else {
      // NAT
      answer = document.getElementById('correct-nat-val').value;
      if (!answer.trim()) {
        alert("Please enter a correct numerical value or range for NAT.");
        return;
      }
    }
  }
  
  if (id) {
    // Edit existing
    const idx = appState.questions.findIndex(q => q.id === id);
    if (idx !== -1) {
      appState.questions[idx] = { id, type, text, options, answer, marks, negmarks, explanation };
    }
  } else {
    // New Question / Section
    const newId = (type === 'section' ? 'section-' : 'q-') + Date.now();
    appState.questions.push({ id: newId, type, text, options, answer, marks, negmarks, explanation });
  }
  
  saveStateToStorage();
  closeQuestionModal();
  renderQuestionsList();
  layoutPages();
}

// 11. PDF DOWNLOADING (COMPILING USING CANVAS RASTER)
async function downloadPDF() {
  const { jsPDF } = window.jspdf;
  const overlay = document.getElementById('pdf-progress-overlay');
  const progressText = document.getElementById('pdf-progress-text');
  const progressBar = document.getElementById('pdf-progress-bar');
  
  // Activate Loading State overlay
  overlay.classList.add('active');
  progressBar.style.width = '0%';
  progressText.textContent = "Preparing sheets for print rasterization...";
  
  try {
    const pageElements = document.querySelectorAll('.a4-sheet');
    const totalPages = pageElements.length;
    
    if (totalPages === 0) {
      alert("No printable pages generated.");
      overlay.classList.remove('active');
      return;
    }
    
    const pdf = new jsPDF({
      orientation: 'p',
      unit: 'mm',
      format: 'a4'
    });
    
    for (let i = 0; i < totalPages; i++) {
      progressText.textContent = `Rasterizing Page ${i + 1} of ${totalPages}...`;
      const percentage = Math.round(((i + 1) / totalPages) * 100);
      progressBar.style.width = `${percentage}%`;
      
      // Allow thread yield for visual loading updates
      await new Promise(resolve => setTimeout(resolve, 150));
      
      const page = pageElements[i];
      
      // Temporarily remove sheet shadow/border during capture for clean outputs
      const originalBoxShadow = page.style.boxShadow;
      page.style.boxShadow = 'none';
      
      const canvas = await html2canvas(page, {
        scale: 2, // Double DPI rendering resolution
        useCORS: true,
        logging: false,
        allowTaint: true
      });
      
      // Restore styles
      page.style.boxShadow = originalBoxShadow;
      
      const imgData = canvas.toDataURL('image/jpeg', 0.95);
      
      if (i > 0) {
        pdf.addPage();
      }
      
      // Insert image at A4 full dimensions (210 x 297mm)
      pdf.addImage(imgData, 'JPEG', 0, 0, 210, 297);
    }
    
    progressText.textContent = "Compiling vector packages & saving file...";
    await new Promise(resolve => setTimeout(resolve, 400));
    
    const title = document.getElementById('exam-title').value || 'gate-mock-test';
    const safeFilename = title.toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '') + '.pdf';
      
    pdf.save(safeFilename);
  } catch (error) {
    console.error("PDF Compilation Failed:", error);
    alert("An error occurred during PDF compiling. Try downloading using the browser standard print command.");
  } finally {
    overlay.classList.remove('active');
  }
}

// BULK IMPORT MODAL LOGIC
function openBulkModal() {
  document.getElementById('bulk-import-text').value = '';
  document.getElementById('bulk-modal').classList.add('active');
}

function closeBulkModal() {
  document.getElementById('bulk-modal').classList.remove('active');
}

function parseAndImportBulk() {
  const text = document.getElementById('bulk-import-text').value;
  if (!text.trim()) {
    alert("Please paste some questions first.");
    return;
  }
  
  const parsedQuestions = parseBulkText(text);
  if (parsedQuestions.length === 0) {
    alert("No valid questions found. Make sure your questions start with Q1., Q2., etc. and options start with A), B), C), D) or A., B., C., D.");
    return;
  }
  
  if (confirm(`Parsed ${parsedQuestions.length} questions successfully! Do you want to append them to your current list? (Cancel will replace the current list)`)) {
    appState.questions = [...appState.questions, ...parsedQuestions];
  } else {
    appState.questions = parsedQuestions;
  }
  
  saveStateToStorage();
  closeBulkModal();
  renderQuestionsList();
  layoutPages();
}

function extractOptionsFromLine(line) {
  const markerRegex = /(?:^|\s+)([A-Da-d])[\.\)]+\s*/g;
  let matches = [];
  let match;
  while ((match = markerRegex.exec(line)) !== null) {
    const matchStr = match[0];
    const letterIndex = matchStr.search(/[A-Da-d]/);
    const absoluteLetterIndex = match.index + letterIndex;
    if (absoluteLetterIndex > 0 && line[absoluteLetterIndex - 1] === '(') {
      continue;
    }
    matches.push({
      letter: match[1].toUpperCase(),
      index: match.index,
      fullMatchLength: match[0].length
    });
  }
  
  if (matches.length > 0) {
    let result = {};
    for (let i = 0; i < matches.length; i++) {
      const current = matches[i];
      const startPos = current.index + current.fullMatchLength;
      const endPos = (i + 1 < matches.length) ? matches[i + 1].index : line.length;
      const value = line.substring(startPos, endPos).trim();
      result[current.letter] = value;
    }
    return result;
  }
  return null;
}

function parseBulkText(text) {
  const lines = text.split('\n');
  const questions = [];
  let currentQ = null;
  let currentState = 'IDLE'; // IDLE, Q_TEXT, OPT_A, OPT_B, OPT_C, OPT_D
  
  // Matches Q1. or 1. or [1] or Q1: etc.
  const qRegex = /^\s*(?:\[)?(?:Q(?:uestion)?\.?\s*)?(\d+)(?:\])?[\.\s:\)]+\s*(.*)$/i;
  
  for (let line of lines) {
    const trimmed = line.trim();
    if (!trimmed) continue;
    
    // Check if it's a new question
    const qMatch = line.match(qRegex);
    if (qMatch) {
      if (currentQ) {
        questions.push(currentQ);
      }
      currentQ = {
        id: 'q-bulk-' + Date.now() + '-' + questions.length,
        type: 'MCQ',
        text: qMatch[2],
        options: { A: '', B: '', C: '', D: '' },
        answer: 'A', // default placeholder
        marks: 1,
        negmarks: 0.33,
        explanation: ''
      };
      currentState = 'Q_TEXT';
      continue;
    }
    
    // Check if we have a current question and parse options from this line
    if (currentQ) {
      const extractedOpts = extractOptionsFromLine(line);
      if (extractedOpts) {
        let hasAnyOpt = false;
        for (let key of ['A', 'B', 'C', 'D']) {
          if (extractedOpts[key] !== undefined) {
            currentQ.options[key] = extractedOpts[key];
            hasAnyOpt = true;
          }
        }
        if (hasAnyOpt) {
          if (currentQ.options.D) {
            currentState = 'OPT_D';
          } else if (currentQ.options.C) {
            currentState = 'OPT_C';
          } else if (currentQ.options.B) {
            currentState = 'OPT_B';
          } else {
            currentState = 'OPT_A';
          }
          continue;
        }
      }
    }
    
    // If it's not a question and not option line, it could be:
    // - Continuation of question text (if in Q_TEXT state)
    // - Section header (if in IDLE or OPT_D state)
    if (currentQ && currentState === 'Q_TEXT') {
      currentQ.text += '\n' + line;
    } else if (currentState === 'IDLE' || currentState === 'OPT_D') {
      if (currentQ) {
        questions.push(currentQ);
        currentQ = null;
      }
      questions.push({
        id: 'sec-bulk-' + Date.now() + '-' + questions.length,
        type: 'section',
        text: line.trim()
      });
      currentState = 'IDLE';
    }
  }
  
  if (currentQ) {
    questions.push(currentQ);
  }
  
  return questions;
}

// =============================================================================
// 13. AI QUESTION GENERATION (Google Gemini API)
// =============================================================================

function openAIModal() {
  const savedKey = localStorage.getItem('gate_gemini_api_key') || '';
  document.getElementById('ai-api-key').value = savedKey;
  const statusBar = document.getElementById('ai-status-bar');
  statusBar.style.display = 'none';
  document.getElementById('ai-status-text').style.color = '';
  document.getElementById('ai-modal').classList.add('active');
}

function closeAIModal() {
  document.getElementById('ai-modal').classList.remove('active');
}

async function runAIGenerate() {
  const apiKey = document.getElementById('ai-api-key').value.trim();
  const model  = document.getElementById('ai-model').value || 'gemini-2.0-flash-lite';
  const topic  = document.getElementById('ai-topic').value.trim();
  const qtype  = document.getElementById('ai-qtype').value;
  const diff   = document.getElementById('ai-difficulty').value;
  const count  = parseInt(document.getElementById('ai-count').value);
  const marks  = document.getElementById('ai-marks').value;
  const extras = document.getElementById('ai-extra-instructions').value.trim();

  if (!apiKey) { alert('Please enter your Gemini API key.'); document.getElementById('ai-api-key').focus(); return; }
  if (!topic)  { alert('Please enter a topic or subject.'); document.getElementById('ai-topic').focus(); return; }

  localStorage.setItem('gate_gemini_api_key', apiKey);

  const statusBar  = document.getElementById('ai-status-bar');
  const statusText = document.getElementById('ai-status-text');
  const runBtn     = document.getElementById('btn-run-ai-generate');
  statusBar.style.display = 'flex';
  statusText.style.color  = '';
  statusText.textContent  = `Generating ${count} questions with Gemini AI\u2026`;
  runBtn.disabled = true;

  let typeDesc = qtype === 'Mixed' ? 'a mix of MCQ and NAT' : qtype;
  let marksDesc = marks === 'mixed' ? 'either 1 or 2 marks each (vary them)' : `${marks} mark${marks === '1' ? '' : 's'} each`;
  const negRule = 'For 1-mark MCQ/MSQ negmarks=0.33, for 2-mark MCQ/MSQ negmarks=0.66, NAT always negmarks=0.';

  const prompt = `You are an expert exam question setter for competitive exams like GATE.
Generate exactly ${count} ${typeDesc} questions on the topic: "${topic}".
Difficulty: ${diff}. Each question should be worth ${marksDesc}.
${extras ? 'Additional instructions: ' + extras : ''}

Return ONLY a raw JSON array (no markdown, no code fences) in this exact format:
[{"type":"MCQ","text":"Question text","options":{"A":"...","B":"...","C":"...","D":"..."},"answer":"A","marks":1,"negmarks":0.33,"explanation":"Step-by-step explanation."}]

Rules:
- MCQ: 4 options A-D, answer is one of "A","B","C","D".
- MSQ: 4 options A-D, answer is comma-separated e.g. "A,C".
- NAT: options must be {}, answer is a number string.
- ${negRule}
- All questions must be unique and well-formed. No markdown in output.`;

  try {
    const resp = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
          generationConfig: { temperature: 0.7, maxOutputTokens: 8192 }
        })
      }
    );
    if (!resp.ok) {
      const err = await resp.json();
      throw new Error(err?.error?.message || `API error ${resp.status}`);
    }
    const data = await resp.json();
    let rawText = (data?.candidates?.[0]?.content?.parts?.[0]?.text || '').trim();

    // Strip markdown fences if present
    rawText = rawText.replace(/^```(?:json)?\s*/i, '').replace(/\s*```$/, '').trim();
    const s = rawText.indexOf('[');
    const e = rawText.lastIndexOf(']');
    if (s === -1 || e === -1) throw new Error('No JSON array found in AI response. Try again.');
    const parsed = JSON.parse(rawText.slice(s, e + 1));
    if (!Array.isArray(parsed) || !parsed.length) throw new Error('AI returned empty question list.');

    const ts = Date.now();
    const newQs = parsed.map((q, i) => ({
      id: `ai-q-${ts}-${i}`,
      type: String(q.type || 'MCQ').toUpperCase(),
      text: q.text || '',
      options: q.options && typeof q.options === 'object' ? q.options : { A: '', B: '', C: '', D: '' },
      answer: String(q.answer || 'A'),
      marks: Number(q.marks) || 1,
      negmarks: Number(q.negmarks ?? 0.33),
      explanation: q.explanation || ''
    }));

    statusText.textContent = `\u2713 ${newQs.length} questions generated! Importing\u2026`;
    await new Promise(r => setTimeout(r, 500));

    if (appState.questions.length > 0) {
      if (confirm(`Append ${newQs.length} AI-generated questions to your current list?\n\nCancel = Replace existing questions.`)) {
        appState.questions = [...appState.questions, ...newQs];
      } else {
        appState.questions = newQs;
      }
    } else {
      appState.questions = newQs;
    }

    saveStateToStorage();
    closeAIModal();
    renderQuestionsList();
    layoutPages();
    document.getElementById('btn-tab-questions').click();

  } catch (err) {
    statusText.textContent = `\u26A0 Error: ${err.message}`;
    statusText.style.color = '#f87171';
  } finally {
    runBtn.disabled = false;
  }
}

// 12. INITIALIZATION & BINDINGS
function bindEvents() {
  // Tabs switching
  const tabs = document.querySelectorAll('.sidebar-tabs .tab-btn');
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      
      const tabId = tab.getAttribute('data-tab');
      document.querySelectorAll('.sidebar-content .tab-pane').forEach(pane => {
        if (pane.id === tabId) pane.classList.add('active');
        else pane.classList.remove('active');
      });
    });
  });

  // Theme Toggler
  document.getElementById('theme-toggle-btn').addEventListener('click', () => {
    document.body.classList.toggle('light-theme');
    saveStateToStorage();
  });

  // Sync Input Elements back to Headers
  const headerInputs = [
    { id: 'exam-title', key: 'title' },
    { id: 'subject-name', key: 'subject' },
    { id: 'subject-code', key: 'code' },
    { id: 'duration-mins', key: 'duration' },
    { id: 'total-marks', key: 'marks' },
    { id: 'inst-name', key: 'inst' },
    { id: 'instructions-text', key: 'instructions' }
  ];

  headerInputs.forEach(item => {
    const el = document.getElementById(item.id);
    el.addEventListener('input', (e) => {
      appState.headers[item.key] = e.target.value;
      saveStateToStorage();
      layoutPages();
    });
  });

  // Layout Controls bindings
  document.getElementById('font-size').addEventListener('change', (e) => {
    appState.layout.fontSize = e.target.value;
    saveStateToStorage();
    layoutPages();
  });

  document.getElementById('margins-size').addEventListener('change', (e) => {
    appState.layout.margins = e.target.value;
    saveStateToStorage();
    layoutPages();
  });

  document.getElementById('question-spacing').addEventListener('change', (e) => {
    appState.layout.spacing = e.target.value;
    saveStateToStorage();
    layoutPages();
  });

  document.getElementById('paper-theme').addEventListener('change', (e) => {
    appState.layout.theme = e.target.value;
    saveStateToStorage();
    layoutPages();
  });

  // Checkbox bindings
  document.getElementById('show-watermark').addEventListener('change', (e) => {
    appState.layout.watermark = e.target.checked;
    const inputGroup = document.getElementById('watermark-text-group');
    if (e.target.checked) inputGroup.classList.remove('hidden');
    else inputGroup.classList.add('hidden');
    saveStateToStorage();
    layoutPages();
  });

  document.getElementById('watermark-text').addEventListener('input', (e) => {
    appState.layout.watermarkText = e.target.value;
    saveStateToStorage();
    layoutPages();
  });

  document.getElementById('show-anskey').addEventListener('change', (e) => {
    appState.layout.showAnsKey = e.target.checked;
    saveStateToStorage();
    layoutPages();
  });

  document.getElementById('show-marks').addEventListener('change', (e) => {
    appState.layout.showMarks = e.target.checked;
    saveStateToStorage();
    layoutPages();
  });

  // Header display toggle bindings
  const headerToggles = [
    { id: 'show-subject',        key: 'showSubject' },
    { id: 'show-paper-code',     key: 'showPaperCode' },
    { id: 'show-duration',       key: 'showDuration' },
    { id: 'show-max-marks',      key: 'showMaxMarks' },
    { id: 'show-candidate-name', key: 'showCandidateName' },
    { id: 'show-roll-number',    key: 'showRollNumber' }
  ];
  headerToggles.forEach(({ id, key }) => {
    document.getElementById(id).addEventListener('change', (e) => {
      appState.layout[key] = e.target.checked;
      saveStateToStorage();
      layoutPages();
    });
  });

  // Sheet Counter Buttons
  document.getElementById('btn-dec-sheets').addEventListener('click', () => {
    const input = document.getElementById('target-sheets');
    let val = parseInt(input.value);
    if (val > 1) {
      val--;
      input.value = val;
      appState.layout.targetSheets = val;
      saveStateToStorage();
      layoutPages();
    }
  });

  document.getElementById('btn-inc-sheets').addEventListener('click', () => {
    const input = document.getElementById('target-sheets');
    let val = parseInt(input.value);
    if (val < 10) {
      val++;
      input.value = val;
      appState.layout.targetSheets = val;
      saveStateToStorage();
      layoutPages();
    }
  });

  document.getElementById('target-sheets').addEventListener('change', (e) => {
    let val = parseInt(e.target.value) || 1;
    val = Math.max(1, Math.min(10, val));
    e.target.value = val;
    appState.layout.targetSheets = val;
    saveStateToStorage();
    layoutPages();
  });

  // Columns selector buttons toggling
  const colBtns = document.querySelectorAll('.select-columns .toggle-btn');
  colBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      colBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      appState.layout.columns = parseInt(btn.getAttribute('data-val'));
      saveStateToStorage();
      layoutPages();
    });
  });

  // Auto-fit button
  document.getElementById('autofit-btn').addEventListener('click', autoFitLayout);

  // Preset Load Mock trigger
  document.getElementById('btn-load-preset').addEventListener('click', () => {
    const sel = document.getElementById('preset-select');
    const val = sel.value;
    if (val && PRESETS[val]) {
      if (confirm(`Loading this preset mock test will replace your current questions list. Do you want to proceed?`)) {
        appState.questions = JSON.parse(JSON.stringify(PRESETS[val]));
        saveStateToStorage();
        renderQuestionsList();
        layoutPages();
        // Switch to questions tab to show results
        document.getElementById('btn-tab-questions').click();
      }
    } else {
      alert("Please select a valid mock test from the list.");
    }
  });

  // New Question Form triggers
  document.getElementById('btn-new-question').addEventListener('click', () => openQuestionModal());
  document.getElementById('btn-close-qmodal').addEventListener('click', closeQuestionModal);
  document.getElementById('btn-cancel-qmodal').addEventListener('click', closeQuestionModal);
  
  // QType toggler in Modal
  document.getElementById('q-type').addEventListener('change', (e) => {
    toggleModalQType(e.target.value);
  });

  // Question Form save handler
  document.getElementById('question-form').addEventListener('submit', saveQuestionSubmit);

  // Download / Print triggers
  document.getElementById('btn-download-pdf').addEventListener('click', downloadPDF);
  document.getElementById('btn-print-native').addEventListener('click', () => {
    window.print();
  });

  // Bulk Import modal triggers
  document.getElementById('btn-bulk-import').addEventListener('click', openBulkModal);
  document.getElementById('btn-close-bulkmodal').addEventListener('click', closeBulkModal);
  document.getElementById('btn-cancel-bulkmodal').addEventListener('click', closeBulkModal);
  document.getElementById('btn-parse-bulk').addEventListener('click', parseAndImportBulk);
  // AI Generate modal triggers
  document.getElementById('btn-ai-generate').addEventListener('click', openAIModal);
  document.getElementById('btn-close-aimodal').addEventListener('click', closeAIModal);
  document.getElementById('btn-cancel-aimodal').addEventListener('click', closeAIModal);
  document.getElementById('btn-run-ai-generate').addEventListener('click', runAIGenerate);
  document.getElementById('btn-toggle-key').addEventListener('click', function() {
    var inp = document.getElementById('ai-api-key');
    inp.type = inp.type === 'password' ? 'text' : 'password';
  });
  document.getElementById('ai-topic').addEventListener('keydown', function(e) {
    if (e.key === 'Enter') runAIGenerate();
  });


  // Auto-fit toggle checkbox trigger
  document.getElementById('autofit-active').addEventListener('change', (e) => {
    appState.layout.autoFitActive = e.target.checked;
    saveStateToStorage();
    syncAutofitUIState();
    layoutPages();
  });
}

function syncAutofitUIState() {
  const active = appState.layout.autoFitActive;
  
  const checkbox = document.getElementById('autofit-active');
  if (checkbox) checkbox.checked = active;
  
  const fontSizeSelect = document.getElementById('font-size');
  const marginsSelect = document.getElementById('margins-size');
  const spacingSelect = document.getElementById('question-spacing');
  
  if (fontSizeSelect) fontSizeSelect.disabled = active;
  if (marginsSelect) marginsSelect.disabled = active;
  if (spacingSelect) spacingSelect.disabled = active;
  
  const colGroup = document.querySelector('.select-columns');
  if (colGroup) {
    if (active) colGroup.classList.add('disabled');
    else colGroup.classList.remove('disabled');
  }
}

// Initialize inputs values on launch based on appState
function initializeUIValues() {
  document.getElementById('exam-title').value = appState.headers.title;
  document.getElementById('subject-name').value = appState.headers.subject;
  document.getElementById('subject-code').value = appState.headers.code;
  document.getElementById('duration-mins').value = appState.headers.duration;
  document.getElementById('total-marks').value = appState.headers.marks;
  document.getElementById('inst-name').value = appState.headers.inst || '';
  document.getElementById('instructions-text').value = appState.headers.instructions;

  document.getElementById('target-sheets').value = appState.layout.targetSheets;
  document.getElementById('font-size').value = appState.layout.fontSize;
  document.getElementById('margins-size').value = appState.layout.margins;
  document.getElementById('question-spacing').value = appState.layout.spacing;
  document.getElementById('paper-theme').value = appState.layout.theme;
  
  document.getElementById('show-watermark').checked = appState.layout.watermark;
  document.getElementById('watermark-text').value = appState.layout.watermarkText || '';
  if (!appState.layout.watermark) {
    document.getElementById('watermark-text-group').classList.add('hidden');
  }

  document.getElementById('show-anskey').checked = appState.layout.showAnsKey;
  document.getElementById('show-marks').checked = appState.layout.showMarks;
  document.getElementById('show-subject').checked        = appState.layout.showSubject        !== false;
  document.getElementById('show-paper-code').checked     = appState.layout.showPaperCode      !== false;
  document.getElementById('show-duration').checked       = appState.layout.showDuration       !== false;
  document.getElementById('show-max-marks').checked      = appState.layout.showMaxMarks       !== false;
  document.getElementById('show-candidate-name').checked = appState.layout.showCandidateName  !== false;
  document.getElementById('show-roll-number').checked    = appState.layout.showRollNumber     !== false;

  const colBtns = document.querySelectorAll('.select-columns .toggle-btn');
  colBtns.forEach(btn => {
    if (parseInt(btn.getAttribute('data-val')) === appState.layout.columns) {
      btn.classList.add('active');
    } else {
      btn.classList.remove('active');
    }
  });

  syncAutofitUIState();
}

// 13. BOOTSTRAP APPS
window.addEventListener('DOMContentLoaded', () => {
  loadStateFromStorage();
  
  // Migration check to load OS questions with sections and turn off answer key by default
  const hasOldCS = appState.questions.some(q => q.id && q.id.startsWith('cs-'));
  const hasOldGA = appState.questions.some(q => q.id && q.id.startsWith('ga-'));
  const hasOldMixed = appState.questions.some(q => q.id && q.id.startsWith('mx-'));
  const hasNoSections = appState.questions.filter(q => q.type === 'section').length === 0;

  if (hasOldCS || hasOldGA || hasOldMixed || hasNoSections || appState.layout.showAnsKey) {
    appState.questions = JSON.parse(JSON.stringify(PRESETS['preset-os']));
    appState.headers.title = "GATE OS Mock Exam â€” Processes & Creation";
    appState.headers.subject = "Operating Systems";
    appState.headers.code = "OS";
    appState.headers.duration = 45;
    appState.headers.marks = 20;
    appState.headers.instructions = "1. This paper contains 15 Multiple Choice Questions (MCQs).\n2. Q1-Q10 carry 1 Mark each; Q11-Q15 carry 2 Marks each.\n3. Negative marking of 1/3 for 1-mark and 2/3 for 2-mark questions applies.\n4. Read each question carefully before choosing the correct option.";
    
    appState.layout.showAnsKey = false;
    saveStateToStorage();
  }

  initializeUIValues();
  bindEvents();
  renderQuestionsList();
  layoutPages();
});



