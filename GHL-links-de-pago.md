# Links de pago en GHL — Esencial y Profesional

> Solo estos dos niveles se cobran en línea. **Ejecutivo ($5,997) y Corporativo ($9,997)
> van por WhatsApp** y no necesitan link: el CTA ya abre la conversación con el mensaje
> precargado del nivel.
>
> Los datos de aquí salen de `src/shared/data/plans.ts`. Si cambias un precio, cámbialo
> en los dos lados o el checkout va a decir algo distinto a la página.

---

## Regla que no se puede romper

**El nombre y el precio del checkout tienen que coincidir letra por letra con la landing.**

Alguien que hace clic en "Empezar con Profesional — $2,997" y aterriza en una pantalla que
dice otra cosa, abandona. Es de las fugas más caras y más fáciles de evitar.

---

## Producto 1 · Esencial

| Campo            | Valor                                                |
| ---------------- | ---------------------------------------------------- |
| Nombre           | `Plan de Carrera Profesional — Esencial`             |
| Precio           | `997`                                                |
| Moneda           | `MXN`                                                |
| Tipo de cobro    | Pago único (**no** recurrente)                       |
| IVA              | Incluido en el precio — no agregar impuesto encima   |
| Tipo de producto | Digital / servicio (sin envío, sin dirección física) |
| SKU sugerido     | `PCP-ESENCIAL`                                       |

**Descripción corta** (la que se ve junto al precio):

> Programa introductorio con diagnóstico inicial. Seis meses de programa, doce meses de acceso.

**Descripción larga:**

> El nivel de entrada del Plan de Carrera Profesional, respaldado por Universidad ICEMéxico.
>
> Incluye:
> • Diagnóstico profesional inicial con análisis Pyxoom
> • Capacitación en 14 habilidades, en 5 módulos y 6 talleres
> • Plan de formación personalizado con diagrama de Gantt
> • Plataforma ICEM Online disponible 24/7
> • 12 meses de acceso a todas las grabaciones
>
> No incluye: constancias, capacitación en Excel ni coaching semanal en vivo.
> Esos entran a partir del nivel Profesional, y puedes subir pagando solo la diferencia.
>
> Dedicación sugerida: 1 a 3 horas por semana. Duración del programa: 6 meses.
> Precio en pesos mexicanos con IVA incluido.

---

## Producto 2 · Profesional

| Campo            | Valor                                              |
| ---------------- | -------------------------------------------------- |
| Nombre           | `Plan de Carrera Profesional — Profesional`        |
| Precio           | `2997`                                             |
| Moneda           | `MXN`                                              |
| Tipo de cobro    | Pago único (**no** recurrente)                     |
| IVA              | Incluido en el precio — no agregar impuesto encima |
| Tipo de producto | Digital / servicio                                 |
| SKU sugerido     | `PCP-PROFESIONAL`                                  |

**Descripción corta:**

> Constancias, 200 horas de Excel y coaching semanal en vivo. Seis meses de programa, doce meses de acceso.

**Descripción larga:**

> El nivel más elegido del Plan de Carrera Profesional, respaldado por Universidad ICEMéxico.
>
> Todo lo del nivel Esencial, más:
> • Constancia de competencias profesionales y constancia del programa completo
> • 200 horas de capacitación en Excel, de nivel básico a avanzado
> • Sesiones en vivo de estudio y análisis de los módulos
> • Coaching semanal en vivo durante los seis meses
> • Consultor vocacional asignado con seguimiento personalizado
> • Alineación para la certificación SEP-CONOCER EC0217.01
>
> La evaluación para obtener el certificado CONOCER se cobra por separado.
> No incluye la certificación Microsoft Excel MOS: esa entra desde el nivel Ejecutivo.
>
> Dedicación sugerida: 4 a 6 horas por semana. Duración del programa: 6 meses.
> Precio en pesos mexicanos con IVA incluido.

---

## Hoja de datos campo por campo

Para llenar el formulario de creación de producto sin tener que pensarle.
Si tu pantalla pide algún campo que no esté aquí, mándame captura y lo completo.

### Esencial

| Campo del formulario | Qué poner                                                                                                                           |
| -------------------- | ----------------------------------------------------------------------------------------------------------------------------------- |
| Product name         | `Plan de Carrera Profesional — Esencial`                                                                                            |
| Description          | Ver "descripción larga" abajo                                                                                                       |
| Product type         | `One-time` (pago único)                                                                                                             |
| Price name / label   | `Esencial`                                                                                                                          |
| Amount               | `997`                                                                                                                               |
| **Compare at price** | `1994` ← el precio tachado del anclaje                                                                                              |
| Currency             | `MXN`                                                                                                                               |
| SKU                  | `PCP-ESENCIAL`                                                                                                                      |
| Track inventory      | No                                                                                                                                  |
| Requires shipping    | No (producto digital)                                                                                                               |
| Variants             | Ninguna                                                                                                                             |
| Collection           | `Plan de Carrera Profesional`                                                                                                       |
| URL slug             | `plan-de-carrera-profesional-esencial`                                                                                              |
| SEO title            | `Plan de Carrera Profesional — Esencial \| 6D Consultoría`                                                                         |
| SEO description      | `Diagnóstico inicial, 14 habilidades en 5 módulos y 6 talleres. Seis meses de programa, doce de acceso. $997 MXN con IVA incluido.` |
| Imagen               | Ver nota de imágenes abajo                                                                                                          |

### Profesional

| Campo del formulario | Qué poner                                                                                                                          |
| -------------------- | ---------------------------------------------------------------------------------------------------------------------------------- |
| Product name         | `Plan de Carrera Profesional — Profesional`                                                                                        |
| Description          | Ver "descripción larga" abajo                                                                                                      |
| Product type         | `One-time` (pago único)                                                                                                            |
| Price name / label   | `Profesional`                                                                                                                      |
| Amount               | `2997`                                                                                                                             |
| **Compare at price** | `5994` ← el precio tachado del anclaje                                                                                             |
| Currency             | `MXN`                                                                                                                              |
| SKU                  | `PCP-PROFESIONAL`                                                                                                                  |
| Track inventory      | No                                                                                                                                 |
| Requires shipping    | No (producto digital)                                                                                                              |
| Variants             | Ninguna                                                                                                                            |
| Collection           | `Plan de Carrera Profesional`                                                                                                      |
| URL slug             | `plan-de-carrera-profesional-profesional`                                                                                          |
| SEO title            | `Plan de Carrera Profesional — Profesional \| 6D Consultoría`                                                                     |
| SEO description      | `Constancias, 200 horas de Excel y coaching semanal en vivo. Seis meses de programa, doce de acceso. $2,997 MXN con IVA incluido.` |
| Imagen               | Ver nota de imágenes abajo                                                                                                         |

### El "compare at price" no es opcional

La landing muestra **$1,994 tachado → $997** y **$5,994 tachado → $2,997**. Si el checkout
no muestra el mismo anclaje, pierdes justo el argumento más fuerte de la sección de Planes
en el momento exacto en que la persona está decidiendo pagar.

Y al revés: ese precio regular tiene que ser real y haber estado vigente. Tú confirmaste
que lo es. Guarda evidencia de cuándo se cobró a ese precio.

### Nota sobre las imágenes de producto

No tenemos foto del programa. Dos opciones honestas:

1. **Tarjeta tipográfica** con el fondo morado de marca, el nombre del nivel y el precio —
   la misma estética de la imagen de Open Graph que ya genera la landing. Puedo generártelas.
2. **Dejar el producto sin imagen.** GHL muestra un marcador gris; feo pero neutro.

Lo que **no** conviene: una foto de banco de imágenes con gente sonriendo en una oficina.
Es el indicador número tres de "esto lo hizo una plantilla" y desentona con toda la landing.

---

## Configuración que sí importa

**Impuestos.** Los $997 y $2,997 **ya llevan IVA**. Si activas el cálculo de impuestos en
GHL, configúralo como precio con impuesto incluido. Si GHL le suma 16% encima, el cliente
verá $1,157 donde la página prometía $997 — y eso, además de tumbar la venta, es
publicidad engañosa.

**Recurrencia.** Pago único. No es suscripción. Doce meses de _acceso_ no es lo mismo que
doce _cobros_, y confundirlo genera contracargos.

**Campos del formulario.** Los mínimos: nombre, correo y teléfono. El teléfono sí lo
necesitas, porque el paso 1 del programa es una sesión con el consultor vocacional.
Cada campo extra te cuesta conversión.

**Sin dirección de envío.** Es un producto digital.

**Términos en el checkout.** Que aparezca la garantía tal como está en la landing:

> Tienes 7 días desde la compra para completar el módulo 1 y decidir. Si concluyes que no
> es para ti, te devolvemos el 100%.

---

## Qué pasa después del pago

La landing promete **"empiezas la misma semana"** y **"acceso inmediato"**. El embudo tiene
que cumplirlo o el primer contacto ya arranca en deuda.

Mínimo a dejar armado en GHL:

1. **Página de gracias** que diga exactamente qué sigue y cuándo — no un "gracias por tu
   compra" genérico. Algo como: _"Listo. En las próximas 24 horas te escribimos por
   WhatsApp para agendar tu diagnóstico Pyxoom y asignarte consultor."_
2. **Etiqueta automática** al contacto: `PCP-Esencial` o `PCP-Profesional`. Así sabes de
   qué nivel viene sin preguntar.
3. **Notificación interna** a quien asigna consultores.
4. **Correo de confirmación** con los accesos a ICEM Online.
5. **Recordatorio del módulo 1** a los 3 días. La garantía depende de que lo completen, así
   que te conviene que lo hagan pronto: quien termina el módulo 1 casi no pide reembolso.

---

## Cuando tengas las dos URLs

Pásamelas y las pego, o hazlo tú — es un solo archivo:

`src/shared/data/plans.ts`, hasta abajo:

```ts
const checkoutUrls: Record<string, string | null> = {
  esencial: null, // ← pega aquí la URL de Esencial
  profesional: null, // ← pega aquí la URL de Profesional
};
```

Después:

```bash
npm run build && npm run check:pending
```

Si sale limpio, ya solo falta el correo de contacto del footer y la página se puede publicar.

---

## Nota sobre el MCP de GHL

El conector de GHL que tengo aquí **no puede crear productos ni links de pago**: sus dos
herramientas de pagos son de solo lectura (consultar una orden y listar transacciones).
Por eso los creas tú en la interfaz y yo los cableo.
