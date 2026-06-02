const routes = [
  {
    id: "norte-prado",
    name: "Norte - Estación Prado",
    risk: "safe",
    riskLabel: "Despejado",
    time: 14,
    point: "Andén oriental",
    detail: "Semáforo sonoro activo, guía podotáctil continua y acceso sin obstáculos.",
    reviewed: false,
  },
  {
    id: "centro-calle-12",
    name: "Centro - Cruce Calle 12",
    risk: "critical",
    riskLabel: "Crítico",
    time: 23,
    point: "Paso peatonal principal",
    detail: "Cruce bloqueado por obra temporal y ausencia de anuncio audible alternativo.",
    reviewed: false,
  },
  {
    id: "sur-las-aguas",
    name: "Sur - Puente Las Aguas",
    risk: "critical",
    riskLabel: "Crítico",
    time: 28,
    point: "Rampa de ingreso",
    detail: "Baranda interrumpida y desvío sin señal táctil hacia el acceso secundario.",
    reviewed: false,
  },
  {
    id: "occidente-parque",
    name: "Occidente - Parque Central",
    risk: "warning",
    riskLabel: "Precaución",
    time: 19,
    point: "Sendero norte",
    detail: "Se detectan vendedores ocupando parte del recorrido, pero hay paso lateral disponible.",
    reviewed: false,
  },
  {
    id: "oriente-clinica",
    name: "Oriente - Clínica Aurora",
    risk: "warning",
    riskLabel: "Precaución",
    time: 17,
    point: "Entrada de urgencias",
    detail: "El ascensor funciona, pero el aviso audible de piso está intermitente.",
    reviewed: false,
  },
  {
    id: "norte-biblioteca",
    name: "Norte - Biblioteca Mayor",
    risk: "safe",
    riskLabel: "Despejado",
    time: 12,
    point: "Acceso sur",
    detail: "Ruta con referencia táctil estable, puertas automáticas y personal informado.",
    reviewed: false,
  },
];

const riskWeight = {
  critical: 3,
  warning: 2,
  safe: 1,
};

const riskClass = {
  critical: "risk-critical",
  warning: "risk-warning",
  safe: "risk-safe",
};

const routeResults = document.querySelector("#route-results");
const routeSearch = document.querySelector("#route-search");
const riskFilter = document.querySelector("#risk-filter");
const sortFilter = document.querySelector("#sort-filter");
const compactMode = document.querySelector("#compact-mode");
const resultStatus = document.querySelector("#result-status");
const liveRegion = document.querySelector("#live-region");
const screenReaderOutput = document.querySelector("#screen-reader-output");
const incidentRoute = document.querySelector("#incident-route");
const incidentType = document.querySelector("#incident-type");
const incidentDetail = document.querySelector("#incident-detail");
const incidentForm = document.querySelector("#incident-form");
const incidentError = document.querySelector("#incident-error");
const reportLog = document.querySelector("#report-log");
const criticalAlerts = document.querySelector("#critical-alerts");
const activeRoutes = document.querySelector("#active-routes");

function getVisibleRoutes() {
  const query = routeSearch.value.trim().toLocaleLowerCase("es");
  const risk = riskFilter.value;

  return routes
    .filter((route) => {
      const searchable = `${route.name} ${route.point} ${route.detail}`.toLocaleLowerCase("es");
      const matchesQuery = query === "" || searchable.includes(query);
      const matchesRisk = risk === "all" || route.risk === risk;
      return matchesQuery && matchesRisk;
    })
    .sort((first, second) => {
      if (sortFilter.value === "time") {
        return first.time - second.time;
      }

      if (sortFilter.value === "name") {
        return first.name.localeCompare(second.name, "es");
      }

      return riskWeight[second.risk] - riskWeight[first.risk] || first.time - second.time;
    });
}

function createButton(label, type, routeId) {
  const button = document.createElement("button");
  button.type = "button";
  button.textContent = label;
  button.dataset.action = type;
  button.dataset.routeId = routeId;
  return button;
}

function renderRoutes() {
  const visibleRoutes = getVisibleRoutes();
  routeResults.innerHTML = "";
  routeResults.classList.toggle("is-compact", compactMode.checked);

  visibleRoutes.forEach((route) => {
    const item = document.createElement("li");
    item.className = "route-list-item";

    const article = document.createElement("article");
    article.className = `route-card${compactMode.checked ? " compact" : ""}`;
    article.dataset.risk = route.risk;
    article.setAttribute("aria-labelledby", `${route.id}-title`);

    const titleRow = document.createElement("div");
    titleRow.className = "route-title-row";

    const title = document.createElement("h3");
    title.id = `${route.id}-title`;
    title.textContent = route.name;

    const badge = document.createElement("span");
    badge.className = `risk-badge ${riskClass[route.risk]}`;
    badge.textContent = route.riskLabel;

    titleRow.append(title, badge);

    const meta = document.createElement("dl");
    meta.className = "route-meta";
    meta.innerHTML = `
      <div>
        <dt>Tiempo estimado</dt>
        <dd>${route.time} minutos</dd>
      </div>
      <div>
        <dt>Punto clave</dt>
        <dd>${route.point}</dd>
      </div>
      <div>
        <dt>Revisión</dt>
        <dd>${route.reviewed ? "Revisada" : "Pendiente"}</dd>
      </div>
      <div>
        <dt>Nivel</dt>
        <dd>${route.riskLabel}</dd>
      </div>
    `;

    const detail = document.createElement("p");
    detail.className = "route-detail";
    detail.textContent = route.detail;

    const actions = document.createElement("div");
    actions.className = "card-actions";
    actions.append(
      createButton("Enviar resumen", "summary", route.id),
      createButton(route.reviewed ? "Quitar revisión" : "Marcar revisada", "review", route.id)
    );

    article.append(titleRow, meta, detail, actions);
    item.append(article);
    routeResults.append(item);
  });

  const visibleCount = visibleRoutes.length;
  const criticalCount = routes.filter((route) => route.risk === "critical").length;
  activeRoutes.textContent = String(routes.length);
  criticalAlerts.textContent = String(criticalCount);
  resultStatus.textContent =
    visibleCount === 1 ? "1 ruta disponible." : `${visibleCount} rutas disponibles.`;

  if (visibleCount === 0) {
    const item = document.createElement("li");
    const empty = document.createElement("p");
    empty.className = "status-line";
    empty.textContent = "No hay rutas que coincidan con la consulta actual.";
    item.append(empty);
    routeResults.append(item);
  }
}

function announceRoute(route) {
  const message = `${route.name}. Riesgo ${route.riskLabel}. Tiempo estimado ${route.time} minutos. Punto clave: ${route.point}. ${route.detail}`;
  screenReaderOutput.textContent = message;
  liveRegion.textContent = message;
}

function toggleReview(route) {
  route.reviewed = !route.reviewed;
  liveRegion.textContent = `${route.name} quedó ${route.reviewed ? "marcada como revisada" : "pendiente de revisión"}.`;
  renderRoutes();
}

function populateIncidentRoutes() {
  routes.forEach((route) => {
    const option = document.createElement("option");
    option.value = route.name;
    option.textContent = route.name;
    incidentRoute.append(option);
  });
}

function resetValidation() {
  [incidentRoute, incidentType, incidentDetail].forEach((field) => {
    field.removeAttribute("aria-invalid");
  });
  incidentError.textContent = "";
}

function validateIncidentForm() {
  resetValidation();
  const errors = [];

  if (!incidentRoute.value) {
    incidentRoute.setAttribute("aria-invalid", "true");
    errors.push("selecciona una ruta");
  }

  if (!incidentType.value) {
    incidentType.setAttribute("aria-invalid", "true");
    errors.push("selecciona un tipo de incidente");
  }

  if (incidentDetail.value.trim().length < 20) {
    incidentDetail.setAttribute("aria-invalid", "true");
    errors.push("describe el incidente con al menos 20 caracteres");
  }

  return errors;
}

function registerIncident() {
  const impacts = Array.from(document.querySelectorAll("input[name^='impact-']:checked"))
    .map((input) => input.value)
    .join(", ");
  const impactText = impacts || "impacto no especificado";
  const entry = `${incidentRoute.value}: ${incidentType.value}; ${impactText}.`;

  if (reportLog.children.length === 1 && reportLog.firstElementChild.textContent.includes("No hay")) {
    reportLog.innerHTML = "";
  }

  const item = document.createElement("li");
  item.textContent = entry;
  reportLog.prepend(item);

  liveRegion.textContent = `Reporte registrado para ${incidentRoute.value}.`;
  incidentForm.reset();
  resetValidation();
}

routeSearch.addEventListener("input", renderRoutes);
riskFilter.addEventListener("change", renderRoutes);
sortFilter.addEventListener("change", renderRoutes);
compactMode.addEventListener("change", renderRoutes);

routeResults.addEventListener("click", (event) => {
  const button = event.target.closest("button[data-action]");
  if (!button) return;

  const route = routes.find((item) => item.id === button.dataset.routeId);
  if (!route) return;

  if (button.dataset.action === "summary") {
    announceRoute(route);
  }

  if (button.dataset.action === "review") {
    toggleReview(route);
  }
});

incidentForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const errors = validateIncidentForm();

  if (errors.length > 0) {
    const message = `No se pudo enviar el reporte: ${errors.join(", ")}.`;
    incidentError.textContent = message;
    liveRegion.textContent = message;
    const firstInvalid = incidentForm.querySelector("[aria-invalid='true']");
    firstInvalid.focus();
    return;
  }

  registerIncident();
});

populateIncidentRoutes();
renderRoutes();
