let workspace = Blockly.inject('blocklyArea', {
  toolbox: `
    <xml>
      <category name="HTML" colour="#e91e63">
        <block type="html_div"></block>
        <block type="html_h1"></block>
        <block type="html_paragraph"></block>
      </category>
      <category name="CSS" colour="#3f51b5">
        <block type="css_style"></block>
      </category>
      <category name="JS" colour="#ff9800">
        <block type="js_alert"></block>
      </category>
    </xml>
  `
});

// Define blocks
Blockly.defineBlocksWithJsonArray([
  {
    "type": "html_div",
    "message0": "<div> %1 </div>",
    "args0": [{ "type": "input_value", "name": "content" }],
    "previousStatement": null,
    "nextStatement": null,
    "colour": 160
  },
  {
    "type": "html_h1",
    "message0": "<h1> %1 </h1>",
    "args0": [{ "type": "field_input", "name": "text", "text": "Heading" }],
    "previousStatement": null,
    "nextStatement": null,
    "colour": 160
  },
  {
    "type": "html_paragraph",
    "message0": "<p> %1 </p>",
    "args0": [{ "type": "field_input", "name": "text", "text": "Paragraph" }],
    "previousStatement": null,
    "nextStatement": null,
    "colour": 160
  },
  {
    "type": "css_style",
    "message0": "<style> %1 </style>",
    "args0": [{ "type": "field_input", "name": "css", "text": "body { color: black; }" }],
    "previousStatement": null,
    "nextStatement": null,
    "colour": 230
  },
  {
    "type": "js_alert",
    "message0": "<script>alert('%1');</script>",
    "args0": [{ "type": "field_input", "name": "msg", "text": "Hello!" }],
    "previousStatement": null,
    "nextStatement": null,
    "colour": 30
  }
]);

// Define generator
Blockly.JavaScript['html_div'] = function(block) {
  var value = Blockly.JavaScript.statementToCode(block, 'content') || '';
  return `<div>\n${value}</div>\n`;
};
Blockly.JavaScript['html_h1'] = block => `<h1>${block.getFieldValue('text')}</h1>\n`;
Blockly.JavaScript['html_paragraph'] = block => `<p>${block.getFieldValue('text')}</p>\n`;
Blockly.JavaScript['css_style'] = block => `<style>${block.getFieldValue('css')}</style>\n`;
Blockly.JavaScript['js_alert'] = block => `<script>alert('${block.getFieldValue('msg')}');</script>\n`;

function updatePreview() {
  const code = Blockly.JavaScript.workspaceToCode(workspace);
  document.getElementById('preview').srcdoc = code || "<body style='background:white;color:black;text-align:center;padding:20px;'>Live Preview</body>";
}

// Update preview when blocks change
workspace.addChangeListener(updatePreview);

// Save draft to localStorage
function saveCode() {
  const code = Blockly.JavaScript.workspaceToCode(workspace);
  localStorage.setItem('zodex-scratch-code', code);
  alert("💾 Draft Saved!");
}

// Export to downloadable HTML file
function exportCode() {
  const code = Blockly.JavaScript.workspaceToCode(workspace);
  const blob = new Blob([code], { type: 'text/html' });
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = "zodex-scratch-export.html";
  a.click();
}

// Auto-load if saved
window.onload = () => {
  const saved = localStorage.getItem('zodex-scratch-code');
  if (saved) {
    document.getElementById('preview').srcdoc = saved;
  }
}
