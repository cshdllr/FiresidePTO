"""Refresh the embedded design reference from design.css; no runtime build needed."""
import json,re
from pathlib import Path
root=Path(__file__).resolve().parent.parent
css=(root/'design.css').read_text()
base=re.search(r'#fireside-refined\s*\{(.*?)\n\}',css,re.S)[1]
tokens=dict(re.findall(r'(--fr-[\w-]+):\s*([^;]+);',base))
p=root/'design-system.html';html=p.read_text()
payload=json.dumps(tokens).replace('</','<\\/')
html=re.sub(r'(<script id="design-tokens" type="application/json">).*?(</script>)',lambda m:m[1]+payload+m[2],html,flags=re.S)
p.write_text(html)
print(f'Updated reference: {len(tokens)} tokens, including five type roles.')
