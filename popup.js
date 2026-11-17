"use strict";
const STORAGE_KEY = "amoled-ntp-shortcuts-v2";
const SETTINGS_KEY = "ntp-am-settings-v1";
const TOTAL_SLOTS = 12;
const DEFAULT_PREFS = {showClock:true, gridColumns:4, iconSize:"medium", showLabels:true, iconStyle:"floating"};
const showClock = document.getElementById("show-clock");
const backupInput = document.getElementById("backup-file");
const status = document.getElementById("status");

function readPreferences() {
  let saved = {};
  try { saved = JSON.parse(localStorage.getItem(SETTINGS_KEY)) || {}; } catch {}
  return {
    showClock: typeof saved.showClock === "boolean" ? saved.showClock : true,
    gridColumns: [4,5,6].includes(Number(saved.gridColumns)) ? Number(saved.gridColumns) : 4,
    iconSize: ["small","medium","large"].includes(saved.iconSize) ? saved.iconSize : "medium",
    showLabels: typeof saved.showLabels === "boolean" ? saved.showLabels : true,
    iconStyle: ["floating","tiles","subtle"].includes(saved.iconStyle) ? saved.iconStyle : "floating"
  };
}
function savePreference(key, value) {
  localStorage.setItem(SETTINGS_KEY, JSON.stringify({...readPreferences(), [key]:value}));
  setStatus("Display preference saved.");
}
function setStatus(message, isError = false) {
  status.textContent = message;
  status.classList.toggle("error", isError);
}
showClock.checked = readPreferences().showClock;
showClock.addEventListener("change", () => savePreference("showClock", showClock.checked));
const columnButtons = [...document.querySelectorAll("[data-columns]")];
function updateColumnButtons(value) {
  columnButtons.forEach(button => {
    const selected = Number(button.dataset.columns) === Number(value);
    button.setAttribute("aria-pressed", String(selected));
  });
}
const iconSizeSelect = document.getElementById("icon-size");
const labelsToggle = document.getElementById("show-labels");
const iconStyleSelect = document.getElementById("icon-style");
iconStyleSelect.value = readPreferences().iconStyle;
iconStyleSelect.addEventListener("change", () => savePreference("iconStyle", iconStyleSelect.value));
updateColumnButtons(readPreferences().gridColumns);
iconSizeSelect.value = readPreferences().iconSize;
labelsToggle.checked = readPreferences().showLabels;
columnButtons.forEach(button => button.addEventListener("click", () => {
  const columns = Number(button.dataset.columns);
  savePreference("gridColumns", columns);
  updateColumnButtons(columns);
}));
iconSizeSelect.addEventListener("change", () => savePreference("iconSize", iconSizeSelect.value));
labelsToggle.addEventListener("change", () => savePreference("showLabels", labelsToggle.checked));
function readSites() {
  try {
    const data = JSON.parse(localStorage.getItem(STORAGE_KEY));
    if (Array.isArray(data) && data.length >= 8 && data.length <= TOTAL_SLOTS) return data.concat(Array(TOTAL_SLOTS - data.length).fill(null));
  } catch {}
  return Array(TOTAL_SLOTS).fill(null);
}
function exportBackup() {
  const backup = { app: "NTP-Am", backupVersion: 1, exportedAt: new Date().toISOString(), shortcuts: readSites(), preferences: readPreferences() };
  const blob = new Blob([JSON.stringify(backup, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = "NTP-Am-backup-" + new Date().toISOString().slice(0, 10) + ".json";
  document.body.appendChild(link); link.click(); link.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
  setStatus("Backup exported. Keep it somewhere safe.");
}
document.getElementById("export-backup").addEventListener("click", exportBackup);
document.getElementById("choose-backup").addEventListener("click", () => { backupInput.value = ""; backupInput.click(); });
function validateBackup(data) {
  if (!data || data.app !== "NTP-Am" || data.backupVersion !== 1 || !Array.isArray(data.shortcuts) || ![8, 10, 12].includes(data.shortcuts.length)) throw new Error("This is not a valid NTP-Am backup.");
  const shortcuts = data.shortcuts.map(site => {
    if (site === null) return null;
    if (!site || typeof site.name !== "string" || typeof site.url !== "string") throw new Error("The backup contains an invalid shortcut.");
    const url = new URL(site.url);
    if (!["http:", "https:"].includes(url.protocol) || !url.hostname.includes(".")) throw new Error("The backup contains an invalid website address.");
    return { name: site.name.slice(0, 30), url: url.href };
  });
  while (shortcuts.length < TOTAL_SLOTS) shortcuts.push(null);
  const raw = data.preferences || {};
  const preferences = {
    showClock: typeof raw.showClock === "boolean" ? raw.showClock : true,
    gridColumns: [4,5,6].includes(Number(raw.gridColumns)) ? Number(raw.gridColumns) : 4,
    iconSize: ["small","medium","large"].includes(raw.iconSize) ? raw.iconSize : "medium",
    showLabels: typeof raw.showLabels === "boolean" ? raw.showLabels : true
  };
  return { shortcuts, preferences };
}
backupInput.addEventListener("change", async () => {
  const file = backupInput.files && backupInput.files[0];
  if (!file) return;
  try {
    const data = JSON.parse(await file.text());
    const restored = validateBackup(data);
    if (!window.confirm("Restore this NTP-Am backup? Your current shortcuts and clock preference will be replaced.")) { setStatus("Restore cancelled."); return; }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(restored.shortcuts));
    localStorage.setItem(SETTINGS_KEY, JSON.stringify(restored.preferences));
    showClock.checked = restored.preferences.showClock;
    updateColumnButtons(restored.preferences.gridColumns);
    iconSizeSelect.value = restored.preferences.iconSize;
    labelsToggle.checked = restored.preferences.showLabels;
    iconStyleSelect.value = restored.preferences.iconStyle;
    setStatus("Backup restored successfully.");
  } catch (err) { setStatus(err.message || "Could not read that backup file.", true); }
});
