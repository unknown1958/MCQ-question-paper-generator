const testText = `302. ........ his bad leg, he couldn't walk so fast as the others.
a. Because  b. Because of  c. The reason  d. Since

303. ............. difficulties you may encounter, I'm sure you'll succeed.
a. How  b. However  c. Whatever  d. How greater

304. My father said ........ would invite our teacher to dinner on Saturday.
a. of we  b. so we  c. we  d. that is we`;

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
  
  const qRegex = /^\s*(?:\[)?(?:Q(?:uestion)?\.?\s*)?(\d+)(?:\])?[\.\s:\)]+\s*(.*)$/i;
  
  for (let line of lines) {
    const trimmed = line.trim();
    if (!trimmed) continue;
    
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
        answer: 'A',
        marks: 1,
        negmarks: 0.33,
        explanation: ''
      };
      currentState = 'Q_TEXT';
      continue;
    }
    
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
    
    if (currentQ && currentState === 'Q_TEXT') {
      currentQ.text += '\\n' + line;
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

console.log(JSON.stringify(parseBulkText(testText), null, 2));
