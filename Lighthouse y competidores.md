# Lighthouse: qué tipo de aplicación es, para qué se usa y competidores

Nov 24, 2026

Lighthouse es una herramienta de auditoría web de código abierto, creada y mantenida por Google. Es una herramienta de desarrollo (no una app de usuario final), orientada a desarrolladores web y profesionales de SEO/rendimiento.

## Qué tipo de aplicación es

Es una herramienta automatizada de auditoría técnica que analiza una página web y genera un informe con puntuaciones en varias categorías. Se puede usar de varias formas:

- Integrada en las DevTools de Chrome (pestaña "Lighthouse")
- Como extensión de Chrome
- Como paquete de Node/CLI (`npx lighthouse`) para automatizar auditorías o integrarlas en CI/CD
- A través de PageSpeed Insights (la versión web de Google que usa Lighthouse por debajo)

## Para qué se usa

Audita una URL y la analiza en cinco grandes áreas:

| Categoría | Qué evalúa |
| --- | --- |
| Rendimiento (Performance) | Velocidad de carga, Core Web Vitals, tiempos de renderizado |
| Accesibilidad | Contraste, etiquetas ARIA, navegación por teclado |
| Buenas prácticas | Seguridad, APIs obsoletas, errores de consola |
| SEO | Metaetiquetas, estructura, rastreabilidad |
| PWA (versiones antiguas) | Cumplimiento de criterios de Progressive Web App |

Cada categoría recibe una puntuación de 0 a 100, junto con un listado detallado de oportunidades de mejora y diagnósticos específicos (por ejemplo, reducir el tamaño de las imágenes o eliminar JavaScript que bloquea el renderizado).

## Competidores

- PageSpeed Insights — usa el motor de Lighthouse, pero añade datos de campo reales (CrUX)
- GTmetrix — enfoque similar, combina métricas de Lighthouse con las suyas propias
- WebPageTest — mucho más granular y técnico, popular entre expertos en performance
- Pingdom Website Speed Test
- New Relic / Datadog — monitorización y APM, más que auditoría puntual
- SiteSpeed.io — alternativa open source más configurable
- Calibre — herramienta comercial de monitorización continua basada en Lighthouse
- axe DevTools — competidor directo en el nicho específico de accesibilidad
