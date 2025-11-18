// Temporary wrapper to inject global constants for MCP server scripts
(globalThis as any).ZOTERO_API_KEY = 'XT4lGT6XZ7nyhkazKl4RXhI4';
(globalThis as any).ZOTERO_USER_ID = '17884071';

// Now import and run the main script
import './view-collections.ts';
