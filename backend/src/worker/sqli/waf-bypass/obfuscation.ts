/**
 * DragonSploit - WAF Bypass Obfuscation
 * SQL keyword obfuscation to evade signature-based detection
 */

export interface ObfuscatedPayload {
  original: string;
  obfuscated: string;
  technique: string;
  description: string;
}

export class PayloadObfuscator {
  /**
   * Case Variation - Mixed case SQL keywords
   */
  caseVariation(payload: string): ObfuscatedPayload[] {
    const variations: ObfuscatedPayload[] = [];
    const sqlKeywords = ['SELECT', 'UNION', 'WHERE', 'FROM', 'AND', 'OR', 'INSERT', 'UPDATE', 'DELETE', 'DROP', 'EXEC', 'EXECUTE'];

    // Strategy 1: Alternate case
    let alternateCase = payload;
    sqlKeywords.forEach(keyword => {
      const pattern = new RegExp(keyword, 'gi');
      const varied = keyword.split('').map((c, i) => (i % 2 === 0 ? c.toLowerCase() : c.toUpperCase())).join('');
      alternateCase = alternateCase.replace(pattern, varied);
    });
    if (alternateCase !== payload) {
      variations.push({ original: payload, obfuscated: alternateCase, technique: 'CASE_ALTERNATE', description: 'Alternating uppercase/lowercase' });
    }

    // Strategy 2: Random case
    let randomCase = payload;
    sqlKeywords.forEach(keyword => {
      const pattern = new RegExp(keyword, 'gi');
      const varied = keyword.split('').map(c => (Math.random() > 0.5 ? c.toUpperCase() : c.toLowerCase())).join('');
      randomCase = randomCase.replace(pattern, varied);
    });
    if (randomCase !== payload && randomCase !== alternateCase) {
      variations.push({ original: payload, obfuscated: randomCase, technique: 'CASE_RANDOM', description: 'Random case mixing' });
    }

    return variations;
  }

  /**
   * Comment Injection - Insert SQL comments within keywords
   */
  commentInjection(payload: string, commentType: 'inline' | 'multiline' | 'mixed' = 'multiline'): ObfuscatedPayload[] {
    const variations: ObfuscatedPayload[] = [];
    const sqlKeywords = ['SELECT', 'UNION', 'WHERE', 'FROM', 'AND', 'OR', 'ORDER', 'BY', 'GROUP'];

    if (commentType === 'multiline' || commentType === 'mixed') {
      let multilineCommented = payload;
      sqlKeywords.forEach(keyword => {
        const pattern = new RegExp(keyword, 'gi');
        const mid = Math.floor(keyword.length / 2);
        const commented = keyword.slice(0, mid) + '/**/' + keyword.slice(mid);
        multilineCommented = multilineCommented.replace(pattern, commented);
      });
      if (multilineCommented !== payload) {
        variations.push({ original: payload, obfuscated: multilineCommented, technique: 'COMMENT_INLINE_MULTILINE', description: 'Multiline comments /**/ within keywords' });
      }
    }

    if (commentType === 'inline' || commentType === 'mixed') {
      let inlineCommented = payload;
      sqlKeywords.forEach(keyword => {
        const pattern = new RegExp(keyword, 'gi');
        const mid = Math.floor(keyword.length / 2);
        const commented = keyword.slice(0, mid) + '--\n' + keyword.slice(mid);
        inlineCommented = inlineCommented.replace(pattern, commented);
      });
      if (inlineCommented !== payload) {
        variations.push({ original: payload, obfuscated: inlineCommented, technique: 'COMMENT_INLINE', description: 'Inline comments -- within keywords' });
      }
    }

    // Between words comment injection
    const betweenWords = payload.replace(/\s+/g, '/**/');
    if (betweenWords !== payload) {
      variations.push({ original: payload, obfuscated: betweenWords, technique: 'COMMENT_BETWEEN_WORDS', description: 'Replace spaces with /**/ comments' });
    }

    return variations;
  }

  /**
   * Whitespace Alternatives - Replace spaces with tabs, newlines, etc.
   */
  whitespaceAlternatives(payload: string): ObfuscatedPayload[] {
    const variations: ObfuscatedPayload[] = [];

    const tabbed = payload.replace(/\s+/g, '\t');
    variations.push({ original: payload, obfuscated: tabbed, technique: 'WHITESPACE_TAB', description: 'Replace spaces with tabs' });

    const newlined = payload.replace(/\s+/g, '\n');
    variations.push({ original: payload, obfuscated: newlined, technique: 'WHITESPACE_NEWLINE', description: 'Replace spaces with newlines' });

    const multiSpace = payload.replace(/\s+/g, '  ');
    variations.push({ original: payload, obfuscated: multiSpace, technique: 'WHITESPACE_MULTIPLE', description: 'Double spaces' });

    const mixed = payload.replace(/\s+/g, (): string => {
      const options = [' ', '\t', '\n', '  '];
      return options[Math.floor(Math.random() * options.length)] || ' ';
    });
    variations.push({ original: payload, obfuscated: mixed, technique: 'WHITESPACE_MIXED', description: 'Random mix of whitespace types' });

    return variations;
  }

  /**
   * Plus Sign Encoding
   */
  plusSignEncoding(payload: string): ObfuscatedPayload {
    const encoded = payload.replace(/\s+/g, '+');
    return { original: payload, obfuscated: encoded, technique: 'PLUS_SIGN_ENCODING', description: 'Replace spaces with + sign' };
  }

  /**
   * Unicode Encoding
   */
  unicodeEncoding(payload: string): ObfuscatedPayload {
    const encoded = payload.split('').map(c => '%u' + c.charCodeAt(0).toString(16).padStart(4, '0')).join('');
    return { original: payload, obfuscated: encoded, technique: 'UNICODE_ENCODING', description: 'Encode characters as %uXXXX Unicode escape' };
  }

  /**
   * Hex Encoding
   */
  hexEncoding(payload: string): ObfuscatedPayload {
    const encoded = payload.split('').map(c => '%' + c.charCodeAt(0).toString(16).padStart(2, '0')).join('');
    return { original: payload, obfuscated: encoded, technique: 'HEX_ENCODING', description: 'Encode characters as %XX hex escape' };
  }

  /**
   * Octal Encoding
   */
  octalEncoding(payload: string): ObfuscatedPayload {
    const encoded = payload.split('').map(c => '\\0' + c.charCodeAt(0).toString(8).padStart(3, '0')).join('');
    return { original: payload, obfuscated: encoded, technique: 'OCTAL_ENCODING', description: 'Encode characters as \\0xx octal escape' };
  }

  /**
   * Random Payload - Combine random techniques
   */
  randomPayload(payload: string): ObfuscatedPayload[] {
    const techniques = [
      this.caseVariation(payload),
      this.commentInjection(payload, 'mixed'),
      this.whitespaceAlternatives(payload),
      [this.plusSignEncoding(payload)],
      [this.parenthesesObfuscation(payload)],
      [this.unicodeEncoding(payload)],
      [this.hexEncoding(payload)],
      [this.octalEncoding(payload)]
    ];
    const flat = techniques.flat().filter(t => t);
    const count = Math.min(3, Math.max(2, Math.floor(Math.random() * 2) + 2));
    const shuffled = flat.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  }

  /**
   * Parentheses Obfuscation
   */
  parenthesesObfuscation(payload: string): ObfuscatedPayload {
    let obfuscated = `(${payload})`;
    obfuscated = obfuscated.replace(/(\d+)/g, '($1)');
    return { original: payload, obfuscated, technique: 'PARENTHESES_OBFUSCATION', description: 'Add unnecessary parentheses' };
  }

  /**
   * Multi-Layer Obfuscation - Combine multiple techniques
   */
  multiLayerObfuscation(payload: string): ObfuscatedPayload[] {
    const variations: ObfuscatedPayload[] = [];

    // Layer 1: Case + Comment
    let layer1 = payload;
    const caseVar = this.caseVariation(payload);
    const firstCase = caseVar[0];
    if (firstCase) {
      layer1 = firstCase.obfuscated;
    }

    const commentVar = this.commentInjection(layer1, 'multiline');
    const firstComment = commentVar[0];
    if (firstComment) {
      variations.push({
        original: payload,
        obfuscated: firstComment.obfuscated,
        technique: 'MULTI_LAYER_CASE_COMMENT',
        description: 'Case variation + comment injection'
      });
    }

    // Layer 2: Comment + Whitespace
    let layer2 = payload;
    const comment2 = this.commentInjection(payload, 'multiline');
    const firstComment2 = comment2[0];
    if (firstComment2) {
      layer2 = firstComment2.obfuscated;
    }

    const whitespace = this.whitespaceAlternatives(layer2);
    const firstWhitespace = whitespace[0];
    if (firstWhitespace) {
      variations.push({
        original: payload,
        obfuscated: firstWhitespace.obfuscated,
        technique: 'MULTI_LAYER_COMMENT_WHITESPACE',
        description: 'Comment injection + whitespace alternatives'
      });
    }

    // Layer 3: All combined
    let layer3 = payload;
    if (firstCase) layer3 = firstCase.obfuscated;

    const comment3 = this.commentInjection(layer3, 'multiline');
    const firstComment3 = comment3[0];
    if (firstComment3) layer3 = firstComment3.obfuscated;

    variations.push({
      original: payload,
      obfuscated: layer3,
      technique: 'MULTI_LAYER_FULL',
      description: 'Maximum obfuscation (case + comments + whitespace)'
    });

    return variations;
  }

  /**
   * Get all obfuscation variations
   */
  getAllObfuscations(payload: string): ObfuscatedPayload[] {
    const obfuscations: ObfuscatedPayload[] = [];
    obfuscations.push(...this.caseVariation(payload));
    obfuscations.push(...this.commentInjection(payload, 'mixed'));
    obfuscations.push(...this.whitespaceAlternatives(payload));
    obfuscations.push(this.plusSignEncoding(payload));
    obfuscations.push(this.parenthesesObfuscation(payload));
    obfuscations.push(this.unicodeEncoding(payload));
    obfuscations.push(this.hexEncoding(payload));
    obfuscations.push(this.octalEncoding(payload));
    obfuscations.push(...this.randomPayload(payload));
    obfuscations.push(...this.multiLayerObfuscation(payload));
    return obfuscations;
  }
}

export const obfuscator = new PayloadObfuscator();

/**
 * Quick obfuscate function with safety checks
 */
export function quickObfuscate(payload: string, technique: 'case' | 'comment' | 'whitespace' | 'multi'): string {
  let result: ObfuscatedPayload[] = [];

  switch (technique) {
    case 'case':
      result = obfuscator.caseVariation(payload);
      break;
    case 'comment':
      result = obfuscator.commentInjection(payload);
      break;
    case 'whitespace':
      result = obfuscator.whitespaceAlternatives(payload);
      break;
    case 'multi':
      result = obfuscator.multiLayerObfuscation(payload);
      break;
  }

  const firstResult = result[0];
  return (firstResult) ? firstResult.obfuscated : payload;
}
