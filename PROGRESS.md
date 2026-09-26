# Progress

## Status: Working end-to-end, deployable now

Drag/drop → classify → category + guidance, fully functional. Dark navy/teal
UI. Zero setup, zero backend, deploys to Vercel as-is.

## Done
- [x] Drag-and-drop upload + preview
- [x] Client-side inference (TensorFlow.js + MobileNet), CDN-loaded
- [x] Category mapping layer (`categories.js`) — 7 categories, colors, icons
- [x] Result UI: badge, guidance text, confidence bars, raw predictions
- [x] Vercel-ready (`vercel.json` + `public/`)

## Deferred — future scope
- [ ] **Swap in `Stefaron/trash-classifier`** (ResNet50, actually trained on
      TrashNet) instead of MobileNet's keyword-mapped guesses. Started this —
      got as far as loading the model and exporting it, but the
      `tensorflowjs_converter` step hit repeated dependency conflicts in
      Colab (numpy/tensorflow/tensorflow_decision_forests version mismatches).
      Shelved to ship on time; `app.js` already expects the output format
      this conversion produces (`tf.loadGraphModel`), so picking this back up
      later is mostly "get the conversion to actually finish," not a redesign.
- [ ] Train an actual model on TrashNet + TACO + Kaggle data (the original
      plan in the feasibility study) rather than using someone else's
      fine-tune.
- [ ] Multi-item detection (YOLO-based) instead of one-item-per-photo.
- [ ] Optional: log predictions somewhere instead of fully stateless.

## Key decisions
- Chose MobileNet + keyword-mapping over blocking the whole project on a
  model conversion that kept failing under time pressure — a working,
  honestly-labeled stand-in beats a broken "real" model.
- `app.js`'s model-loading code was written anticipating the graph-model
  export path, so the Stefaron swap (whenever it happens) should be a small,
  contained change rather than touching UI/drag-drop/rendering code again.

## If resuming this later
Read "Future scope" above first — the Stefaron conversion is the most
valuable next step and the groundwork (code + failed-attempt notes) is
already here so it doesn't need to be re-derived from scratch.
