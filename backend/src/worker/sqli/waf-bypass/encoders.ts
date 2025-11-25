/**
 * DragonSploit - WAF Bypass Encoders
 * Encoding techniques to bypass Web Application Firewalls
 */

// ============================================================================
// TYPES
// ============================================================================

export interface EncodedPayload {
  original: string;
  encoded: string;
  technique: string;
  description: string;
}

// ============================================================================
// PAYLOAD ENCODER CLASS
// ============================================================================

export class PayloadEncoder {
  
  /**
   * URL Encoding - Convert special characters to %XX format
   * Bypasses: Basic string matching WAFs
   */
  urlEncode(payload: string, selective: boolean = true): EncodedPayload {
    let encoded: string;
    
    if (selective) {
      // Only encode special SQL characters
      encoded = payload
        .replace(/'/g, '%27')
        .replace(/"/g, '%22')
        .replace(/ /g, '%20')
        .replace(/=/g, '%3D')
        .replace(/</g, '%3C')
        .replace(/>/g, '%3E')
        .replace(/#/g, '%23')
        .replace(/&/g, '%26');
    } else {
      // Full URL encoding
      encoded = encodeURIComponent(payload);
    }
    
    return {
      original: payload,
      encoded: encoded,
      technique: 'URL_ENCODING',
      description: selective ? 'Selective URL encoding of special chars' : 'Full URL encoding'
    };
  }

  /**
   * Unicode Encoding - Convert to \uXXXX format
   * Bypasses: Pattern-based WAFs that don't normalize Unicode
   */
  unicodeEncode(payload: string): EncodedPayload {
    const encoded = payload
      .split('')
      .map(char => {
        const code = char.charCodeAt(0);
        // Encode special SQL chars to Unicode
        if ([39, 34, 32, 61, 60, 62, 35, 38].includes(code)) {
          return `\\u${code.toString(16).padStart(4, '0')}`;
        }
        return char;
      })
      .join('');
    
    return {
      original: payload,
      encoded: encoded,
      technique: 'UNICODE_ENCODING',
      description: 'Unicode escape sequences for special characters'
    };
  }

  /**
   * Hex Encoding - Convert strings to 0xXX format
   * Bypasses: String literal matching
   * Works well in MySQL contexts
   */
  hexEncode(payload: string): EncodedPayload {
    // Convert entire payload to hex
    const hexString = payload
      .split('')
      .map(char => char.charCodeAt(0).toString(16).padStart(2, '0'))
      .join('');
    
    const encoded = `0x${hexString}`;
    
    return {
      original: payload,
      encoded: encoded,
      technique: 'HEX_ENCODING',
      description: 'Hexadecimal string representation (MySQL)'
    };
  }

  /**
   * Double Encoding - Encode twice
   * Bypasses: WAFs that decode only once
   */
  doubleEncode(payload: string): EncodedPayload {
    // First encode
    const firstPass = encodeURIComponent(payload);
    // Second encode
    const secondPass = encodeURIComponent(firstPass);
    
    return {
      original: payload,
      encoded: secondPass,
      technique: 'DOUBLE_ENCODING',
      description: 'URL encoding applied twice'
    };
  }

  /**
   * HTML Entity Encoding - Convert to &#XX; format
   * Bypasses: WAFs in HTML contexts
   */
  htmlEncode(payload: string): EncodedPayload {
    const encoded = payload
      .split('')
      .map(char => {
        const code = char.charCodeAt(0);
        // Encode common SQL injection chars
        if ([39, 34, 32, 61, 60, 62, 35, 38, 59, 45, 40, 41].includes(code)) {
          return `&#${code};`;
        }
        return char;
      })
      .join('');
    
    return {
      original: payload,
      encoded: encoded,
      technique: 'HTML_ENTITY_ENCODING',
      description: 'HTML decimal entity encoding'
    };
  }

  /**
   * Character Code Encoding - Use CHAR() functions
   * Bypasses: String literal filters
   * Database-specific
   */
  charCodeEncode(payload: string, dbType: 'mysql' | 'mssql' | 'postgres' = 'mysql'): EncodedPayload {
    const codes = payload.split('').map(c => c.charCodeAt(0));
    
    let encoded: string;
    switch (dbType) {
      case 'mysql':
        encoded = `CHAR(${codes.join(',')})`;
        break;
      case 'mssql':
        encoded = `CHAR(${codes.join(')+CHAR(')})`;
        break;
      case 'postgres':
        encoded = `CHR(${codes.join(')||CHR(')})`;
        break;
    }
    
    return {
      original: payload,
      encoded: encoded,
      technique: 'CHAR_CODE_ENCODING',
      description: `${dbType.toUpperCase()} CHAR() function encoding`
    };
  }

  /**
   * Mixed Encoding - Combine multiple techniques
   * Maximum evasion potential
   */
  mixedEncode(payload: string): EncodedPayload {
    // Start with selective URL encoding
    let encoded = this.urlEncode(payload, true).encoded;
    
    // Add some Unicode for special chars that weren't URL encoded
    encoded = encoded.replace(/\\/g, '\\u005C');
    
    return {
      original: payload,
      encoded: encoded,
      technique: 'MIXED_ENCODING',
      description: 'Combination of URL and Unicode encoding'
    };
  }

  /**
   * Get all encoding variations for a payload
   */
  getAllEncodings(payload: string, dbType?: 'mysql' | 'mssql' | 'postgres'): EncodedPayload[] {
    const encodings: EncodedPayload[] = [
      this.urlEncode(payload, true),
      this.urlEncode(payload, false),
      this.unicodeEncode(payload),
      this.doubleEncode(payload),
      this.htmlEncode(payload),
      this.mixedEncode(payload)
    ];

    // Add DB-specific encoding if type is known
    if (dbType) {
      encodings.push(this.charCodeEncode(payload, dbType));
      if (dbType === 'mysql') {
        encodings.push(this.hexEncode(payload));
      }
    }

    return encodings;
  }
}

// ============================================================================
// SINGLETON EXPORT
// ============================================================================

export const encoder = new PayloadEncoder();

/**
 * Quick encode function for common use
 */
export function quickEncode(payload: string, technique: 'url' | 'unicode' | 'hex' | 'double'): string {
  switch (technique) {
    case 'url':
      return encoder.urlEncode(payload).encoded;
    case 'unicode':
      return encoder.unicodeEncode(payload).encoded;
    case 'hex':
      return encoder.hexEncode(payload).encoded;
    case 'double':
      return encoder.doubleEncode(payload).encoded;
    default:
      return payload;
  }
}
