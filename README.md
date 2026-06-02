# Ruta Clara

Ruta Clara es una web estática de temática libre creada como prototipo académico de accesibilidad digital. La aplicación simula un panel avanzado de movilidad urbana donde una persona puede consultar rutas, revisar alertas, filtrar riesgos y reportar incidentes de accesibilidad en puntos críticos de la ciudad.

La web está construida con HTML, CSS y JavaScript sin dependencias externas. Se eligió este enfoque para que la accesibilidad dependa principalmente de una buena estructura semántica, controles nativos y comportamiento claro, no de componentes complejos o librerías innecesarias.

## Usuario objetivo

La aplicación está orientada a una persona no vidente usuaria avanzada de lector de pantalla y navegación por teclado.

Escogimos este tipo de usuario porque representa un escenario exigente de accesibilidad: si la página puede usarse sin visión, con lector de pantalla, foco visible, orden lógico, controles correctamente etiquetados y mensajes dinámicos anunciados, también mejora la experiencia para muchas otras personas con discapacidades visuales, motoras o cognitivas.

Además, el tema de movilidad urbana es especialmente relevante para una persona no vidente, ya que la información sobre rutas, obstáculos, cruces bloqueados, semáforos sonoros y desvíos puede afectar directamente su autonomía y seguridad.

## Estándar usado

El estándar principal utilizado fue WCAG 2.1 en nivel AA.

WCAG significa Web Content Accessibility Guidelines. Es una guía internacional del W3C que define criterios para que el contenido web sea más accesible. Se organiza en cuatro principios:

- Perceptible: la información debe poder ser percibida por distintas vías.
- Operable: la interfaz debe poder usarse con teclado y otras tecnologías de asistencia.
- Comprensible: el contenido y la interacción deben ser claros.
- Robusto: la página debe funcionar correctamente con navegadores y tecnologías de asistencia.

Usamos WCAG 2.1 porque fue la versión solicitada para el proyecto y porque sigue siendo una referencia ampliamente usada para evaluar accesibilidad web en contextos académicos, públicos y profesionales.

## Criterios aplicados

### 1.1.1 Contenido no textual

El mapa de rutas usa SVG con `title` y `desc`, además de un texto visible que resume el estado de las rutas. Esto permite que una persona que no puede ver el mapa reciba la misma información importante mediante lector de pantalla.

### 1.3.1 Información y relaciones

La página usa HTML semántico: `header`, `nav`, `main`, `section`, encabezados, listas, tablas, formularios, `fieldset`, `legend`, `label`, `caption` y encabezados de tabla con `scope`.

Esto permite que el lector de pantalla entienda la estructura real de la página y no solo lea bloques visuales sin relación.

### 1.4.1 Uso del color

Los estados de las rutas no dependen únicamente del color. Cada alerta también tiene texto visible, como "Crítico", "Precaución" o "Despejado".

Esto beneficia a personas no videntes, personas con baja visión o usuarios con daltonismo.

### 1.4.3 Contraste mínimo

La interfaz usa combinaciones de color con contraste suficiente para texto normal y elementos importantes. Se comprobaron los pares principales y todos superan el mínimo de 4.5:1 requerido para WCAG AA.

### 1.4.10 Reflow

El diseño se adapta a pantallas pequeñas mediante CSS responsive. Las secciones cambian de columnas a una sola columna cuando el espacio es reducido, evitando que el contenido se rompa o se superponga.

### 2.1.1 Teclado

Los controles principales son elementos nativos: enlaces, botones, campos de texto, selects y checkboxes. Esto permite usar la aplicación con teclado sin depender del mouse.

### 2.4.1 Saltar bloques

La página incluye un enlace de salto al contenido principal. Esto ayuda a usuarios de teclado o lector de pantalla a evitar repetir la navegación principal cada vez que cargan la página.

### 2.4.6 Encabezados y etiquetas

Cada sección tiene encabezados claros y cada control de formulario tiene una etiqueta asociada. Esto facilita que el usuario entienda dónde está y qué acción puede realizar.

### 2.4.7 Foco visible

El CSS define un foco visible fuerte con `:focus-visible`. Esto ayuda a usuarios que navegan con teclado a identificar exactamente qué elemento está activo.

### 3.3.1 Identificación de errores

El formulario de reporte valida los campos obligatorios. Cuando hay errores, se muestra un mensaje claro y se marca el campo inválido con `aria-invalid`.

### 3.3.2 Etiquetas o instrucciones

Los campos tienen etiquetas visibles y el área de detalle incluye una instrucción sobre qué información debe ingresar el usuario: punto exacto, barrera encontrada y acción recomendada.

### 4.1.2 Nombre, función y valor

Los controles usan elementos HTML nativos y nombres accesibles. Esto permite que el lector de pantalla comunique correctamente qué es cada elemento y cómo interactuar con él.

### 4.1.3 Mensajes de estado

La página usa regiones `aria-live` y `role="status"` para anunciar cambios dinámicos, como resultados filtrados, resúmenes de ruta y reportes enviados.

Esto es especialmente importante para una persona no vidente, porque los cambios visuales no serían percibidos si no se anuncian de forma accesible.

## Por qué estas decisiones son importantes

Para una persona no vidente, una interfaz accesible no consiste solo en tener buen contraste o textos alternativos. También necesita:

- Orden lógico de navegación.
- Controles que funcionen con teclado.
- Información estructurada por encabezados.
- Mensajes dinámicos anunciados.
- Formularios con errores claros.
- Contenido visual convertido en información textual equivalente.

Por eso Ruta Clara fue diseñada como una herramienta operativa, no como una página decorativa. La prioridad es que la persona pueda consultar, decidir y reportar información crítica de movilidad de forma autónoma.

## Archivos del proyecto

- `index.html`: estructura principal de la página.
- `styles.css`: estilos visuales, diseño responsive, contraste y foco visible.
- `script.js`: filtros de rutas, mensajes dinámicos, validación del formulario y registro de reportes.

## Verificación realizada

Se verificó la estructura HTML con `html-validate`, la sintaxis JavaScript con `node --check script.js` y se calcularon contrastes principales por código. También se revisó que la interfaz use etiquetas, encabezados, tablas y formularios semánticos.
