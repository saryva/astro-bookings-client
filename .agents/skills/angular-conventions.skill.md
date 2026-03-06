# Skill: Angular 17+ Coding Conventions

> Usado por Agent 5 (Coder) y Agent 7 (Cleaner).
> Carga solo los templates que necesites en cada momento.

---

## Reglas obligatorias

### Componentes
- Siempre `standalone: true` — nunca NgModule
- Usar `inject()` en lugar de constructor injection
- `ChangeDetectionStrategy.OnPush` en todos los componentes
- Inputs con `input()` / `input.required()` (signal-based, Angular 17+)
- Outputs con `output<T>()`
- Estado local con `signal()` y `computed()`

### Servicios
- `@Injectable({ providedIn: 'root' })`
- Estado expuesto como signals: `data`, `loading`, `error`
- HTTP calls con `catchError` — nunca dejar errores sin manejar
- Nunca llamar HTTP directamente desde un componente

### Templates
- Usar `@if` / `@else` / `@for` / `@switch` (nueva sintaxis Angular 17+)
- Nunca NgIf, NgFor como directivas
- `track item.id` obligatorio en todos los `@for`
- Siempre manejar los tres estados: loading, error, empty

### SCSS
- BEM estricto: `.bloque__elemento--modificador`
- Sin colores hardcodeados — usar variables CSS (`var(--color-primary)`)
- Sin `!important`
- Mobile-first con `min-width` breakpoints
- Máximo 3 niveles de anidación

### TypeScript
- Strict mode — sin `any`
- JSDoc en todos los métodos públicos
- Sin `console.log` en código de producción
- Constantes nombradas — sin magic numbers

---

## Templates de referencia

Carga el fichero correspondiente cuando vayas a implementar ese tipo de fichero:

| Qué implementas | Template a leer |
|-----------------|----------------|
| Un componente `.ts` | `.agents/skills/templates/component.template.ts` |
| Un servicio `.ts` | `.agents/skills/templates/service.template.ts` |
| Un template `.html` | `.agents/skills/templates/component.template.html` |
| Estilos `.scss` | `.agents/skills/templates/component.template.scss` |
