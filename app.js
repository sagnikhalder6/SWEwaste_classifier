// app.js (LIVE PREVIEW ONLY — runs MobileNet, not the real trained model)
(function () {
  const dropzone = document.getElementById('dropzone');
  const fileInput = document.getElementById('fileInput');
  const previewWrap = document.getElementById('previewWrap');
  const previewImg = document.getElementById('previewImg');
  const statusLine = document.getElementById('statusLine');
  const statusText = document.getElementById('statusText');
  const resultCard = document.getElementById('resultCard');
  const iconSwatch = document.getElementById('iconSwatch');
  const badge = document.getElementById('badge');
  const guidanceText = document.getElementById('guidanceText');
  const rawPredictions = document.getElementById('rawPredictions');
  const resetBtn = document.getElementById('resetBtn');

  let model = null;

  async function classifyImage(imgEl) {
    if (!model) {
      statusText.textContent = 'Loading model…';
      model = await mobilenet.load();
    }
    const predictions = await model.classify(imgEl, 3);
    const category = mapToCategory(predictions[0].className);
    return { category, predictions };
  }

  function showStatus(text) {
    statusText.textContent = text;
    statusLine.style.display = 'block';
    resultCard.style.display = 'none';
  }

  function showResult(category, predictions) {
    statusLine.style.display = 'none';
    resultCard.style.display = 'block';

    const info = CATEGORY_INFO[category] || CATEGORY_INFO.trash;
    iconSwatch.textContent = info.icon;
    iconSwatch.style.background = `linear-gradient(135deg, ${info.color}, ${info.color}99)`;
    iconSwatch.style.boxShadow = `0 8px 24px -8px ${info.color}`;
    badge.textContent = info.label;
    badge.style.color = info.color;
    guidanceText.textContent = info.guidance;

    rawPredictions.innerHTML = '';
    predictions.forEach((p) => {
      const pct = Math.round(p.probability * 100);
      const row = document.createElement('div');
      row.innerHTML = `
        <div class="rawRow"><span>${p.className}</span><b>${pct}%</b></div>
        <div class="barTrack"><div class="barFill" style="width:${pct}%;"></div></div>
      `;
      rawPredictions.appendChild(row);
    });
  }

  async function handleFile(file) {
    if (!file || !file.type.startsWith('image/')) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      previewImg.src = e.target.result;
      previewWrap.style.display = 'block';
      dropzone.style.display = 'none';
      showStatus('Loading model…');
      previewImg.onload = async () => {
        try {
          showStatus('Classifying…');
          const { category, predictions } = await classifyImage(previewImg);
          showResult(category, predictions);
        } catch (err) {
          showStatus('Something went wrong — try a different image.');
          console.error(err);
        }
      };
    };
    reader.readAsDataURL(file);
  }

  dropzone.addEventListener('click', () => fileInput.click());
  fileInput.addEventListener('change', (e) => handleFile(e.target.files[0]));
  ['dragenter', 'dragover'].forEach((evt) =>
    dropzone.addEventListener(evt, (e) => { e.preventDefault(); dropzone.classList.add('drag'); })
  );
  ['dragleave', 'drop'].forEach((evt) =>
    dropzone.addEventListener(evt, (e) => { e.preventDefault(); dropzone.classList.remove('drag'); })
  );
  dropzone.addEventListener('drop', (e) => { handleFile(e.dataTransfer.files[0]); });

  resetBtn.addEventListener('click', () => {
    previewWrap.style.display = 'none';
    resultCard.style.display = 'none';
    statusLine.style.display = 'none';
    dropzone.style.display = 'block';
    fileInput.value = '';
  });

  mobilenet.load().then((m) => { model = m; }).catch(() => {});
})();
