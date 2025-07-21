document.getElementById('fileInput').addEventListener('change', function (e) {
  const file = e.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = function (e) {
    const data = new Uint8Array(e.target.result);
    const workbook = XLSX.read(data, { type: 'array' });

    const sheetName = workbook.SheetNames[0]; // Use first sheet
    const worksheet = workbook.Sheets[sheetName];
    const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

    displayTable(jsonData);
  };
  reader.readAsArrayBuffer(file);
});

function displayTable(data) {
  let html = '<table>';
  data.forEach((row, i) => {
    html += '<tr>';
    row.forEach(cell => {
      html += i === 0 ? `<th>${cell}</th>` : `<td>${cell}</td>`;
    });
    html += '</tr>';
  });
  html += '</table>';

  document.getElementById('output').innerHTML = html;
}
