# ♻️ Smart Waste Classifier

A drag-and-drop web app that classifies a photo of waste into a category
(cardboard, glass, metal, paper, plastic, organic, trash) and shows disposal
guidance — entirely in the browser, no backend, no image ever leaves the
device.

Built as the frontend for an academic project on waste
segregation (feasibility study, SRS, DFD, and decision-logic docs done
separately).

## Features
- Drag-and-drop or click-to-upload image input
- Real-time, on-device classification (TensorFlow.js)
- Category badge + disposal guidance + raw prediction breakdown
- Zero backend — deploys as a static site

## Tech stack
- HTML/CSS/JS (no framework, no build step)
- [TensorFlow.js](https://www.tensorflow.org/js) + MobileNet for in-browser inference
- Deployed on [Vercel](https://vercel.com)

## Project structure
```
public/
  index.html      markup
  style.css       theme
  categories.js   category metadata + label mapping
  app.js          model loading, inference, UI wiring
vercel.json       deploy config
```

## How classification works right now
MobileNet (general-purpose, ImageNet-pretrained) makes a prediction, and a
keyword-mapping layer in `categories.js` translates that into a waste
category. This means it works out of the box with zero setup, but it isn't
actually trained on waste imagery — see **Future Scope** below.

## Future scope
- **Swap in a model actually trained on waste data** — e.g.
  [`Stefaron/trash-classifier`](https://huggingface.co/Stefaron/trash-classifier),
  a ResNet50 fine-tuned on TrashNet's 6 classes. This was attempted but
  shelved for now due to time constraints — converting it to TensorFlow.js
  hit a chain of Python/Colab dependency issues (TensorFlow ↔ tensorflowjs ↔
  numpy version mismatches) that needed more time than was available. The
  code is already set up for this switch (`app.js` uses `tf.loadGraphModel`,
  matching the export format that conversion produces) — it mainly needs the
  converted `model.json` dropped into `public/model/`.
- Train a model from scratch on TrashNet + TACO + Kaggle garbage-classification
  data instead of relying on someone else's fine-tune (the original plan in
  the feasibility study).
- Multi-item detection in a single photo (object detection, not just
  classification) — explored separately, would need YOLO + a synthetic/TACO
  training pipeline.
- Logging predictions somewhere for later review (currently nothing is
  stored — fully stateless, on-device only).
