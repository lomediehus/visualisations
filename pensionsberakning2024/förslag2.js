// HTML structure for the demo application
const appHtml = `
  <label for="age">Pensionsålder:</label>
  <select id="age">
      <option value="64">64</option>
      <option value="65">65</option>
      <option value="66">66</option>
      <option value="67">67</option>
      <option value="68">68</option>
  </select>

  <label>
      <input type="checkbox" id="partTime"> Jobbat deltid
  </label>

  <label for="sickLeave">Sjukskriven antal år:</label>
  <input type="number" id="sickLeave" min="0" max="10" value="0">

  <button id="calculate">Beräkna pension</button>
  <p id="result">Din pension: </p>
`;

document.body.innerHTML = appHtml;

// Example pension data (from your JSON file)
const pensionData = [
  {
      "Årskull": 1965,
      "Pensionsålder": 64,
      "Deltid": 0,
      "Sjukskriven": 0,
      "Inkomst- och tilläggspension": 11690,
      "Premiepension": 2203,
      "Tjänstepension": 4074,
      "Inkomst brutto": 17967,
      "Disponibel inkomst": 13170.25
  },
  {
      "Årskull": 1965,
      "Pensionsålder": 65,
      "Deltid": 0,
      "Sjukskriven": 0,
      "Inkomst- och tilläggspension": 12415,
      "Premiepension": 2354,
      "Tjänstepension": 4340,
      "Inkomst brutto": 19109,
      "Disponibel inkomst": 13913.92
  },
  // Add more entries from your JSON file as needed
];

// Event listener for the calculate button
document.getElementById('calculate').addEventListener('click', () => {
  const age = parseInt(document.getElementById('age').value);
  const partTime = document.getElementById('partTime').checked ? 1 : 0;
  const sickLeave = parseInt(document.getElementById('sickLeave').value);

  // Find the matching record in the dataset
  const result = pensionData.find(row =>
      row.Pensionsålder === age &&
      row.Deltid === partTime &&
      row.Sjukskriven === sickLeave
  );

  // Display the result
  document.getElementById('result').textContent = result
      ? `Din pension: Brutto: ${result["Inkomst brutto"]} kr, Disponibel: ${result["Disponibel inkomst"]} kr`
      : 'Ingen data hittades för dina val.';
});
