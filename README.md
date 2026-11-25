# Notas y materiales — Claude Academy
 
Este proyecto reúne toda la información adicional (apuntes, ejercicios, código de prueba, capturas, enlaces útiles, etc.) que se va generando al seguir la formación de [Claude Academy](https://academy.claude.com/courses).
 
No está pensado para un único curso: Claude Academy ofrece decenas de cursos (Claude 101, Claude Code 101, Building with the Claude API, Introduction to Model Context Protocol, AI Fluency for builders, etc.), así que este repositorio sirve como cuaderno central a medida que se vayan completando distintos cursos y lecciones.
 
## Objetivo
 
- Centralizar notas propias que amplían o aclaran el contenido de cada lección.
- Guardar código, prompts o configuraciones probadas durante los ejercicios.
- Dejar constancia del progreso (cursos empezados, en curso, completados).
- Servir de referencia rápida para volver a consultar lo aprendido sin tener que rever el curso entero.
## Estructura propuesta
 
```
.
├── README.md
├── progreso.md              # Seguimiento de qué cursos/lecciones están hechos
└── cursos/
    └── <slug-del-curso>/
        ├── notas.md         # Apuntes propios lección a lección
        ├── ejercicios/      # Código, prompts o ficheros de práctica
        └── recursos.md      # Enlaces, referencias y material adicional
```
 
El `<slug-del-curso>` coincide con el último segmento de la URL del curso en Academy, por ejemplo:
 
- `claude-101` → https://academy.claude.com/courses/claude-101
- `claude-code-101` → https://academy.claude.com/courses/claude-code-101
- `building-with-the-claude-api` → https://academy.claude.com/courses/building-with-the-claude-api
- `introduction-to-model-context-protocol` → https://academy.claude.com/courses/introduction-to-model-context-protocol
## Formato de `notas.md`
 
Se sugiere un formato simple por lección:
 
```markdown
## Lección X — Título de la lección
 
**Resumen:** qué cubre la lección en 2-3 líneas.
 
**Puntos clave:**
- ...
- ...
 
**Dudas / cosas a repasar:**
- ...
 
**Enlaces relacionados:**
- ...
```
 
## Seguimiento de progreso
 
El fichero `progreso.md` mantiene una tabla simple:
 
| Curso | Estado | Última lección completada | Notas |
|---|---|---|---|
| Claude 101 | En curso | Lección 3 | — |
| Claude Code 101 | Pendiente | — | — |
 
Estados posibles: `Pendiente`, `En curso`, `Completado`.
 
## Cómo añadir un curso nuevo
 
1. Crear la carpeta `cursos/<slug-del-curso>/`.
2. Añadir `notas.md`, `ejercicios/` y `recursos.md` según la estructura anterior.
3. Registrar el curso en `progreso.md`.
## Licencia / uso
 
Repositorio de uso personal para acompañar el aprendizaje en Claude Academy. El contenido de los cursos pertenece a Anthropic; este repositorio solo contiene notas y material propio derivado de seguirlos.