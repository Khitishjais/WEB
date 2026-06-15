import * as lucide from 'lucide-react';
const keys = Object.keys(lucide);
console.log('Brand icons:', keys.filter(k => k.toLowerCase().includes('brand')));
console.log('Github:', keys.includes('Github'));
console.log('Slack:', keys.includes('Slack'));
