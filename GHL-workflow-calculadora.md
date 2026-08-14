# Workflow: correo de la calculadora de rotación

> Todo listo para pegar. Son unos tres minutos en GHL.
>
> No lo puedo crear yo: el conector de GHL no expone workflows ni automatizaciones.

---

## El workflow

`Automations → Workflows → Create Workflow → Start from Scratch`

**Nombre:** `Landing — Desglose de rotación`

### Trigger

| Campo     | Valor                  |
| --------- | ---------------------- |
| Tipo      | `Contact Tag`          |
| Condición | `Tag Added`            |
| Tag       | `calculadora-rotacion` |

### Acción 1 — Send Email

Los datos del correo están abajo.

### Acción 2 (opcional) — Notificación interna

Un `Send Internal Notification` a quien haga seguimiento. Un lead que acaba de
calcular su pérdida está en el mejor momento para una llamada: cuanto antes,
mejor.

---

## El correo

**De:** el remitente que ya uses en GHL
**Responder a:** `contacto@centroevaluador6d.com`

### Asunto

```
Tu rotación te costó {{contact.prdida_por_rotacin}} el año pasado
```

> ⚠️ La clave del campo va **sin acentos**: así la generó GHL a partir de
> "Pérdida por rotación". Si escribes `{{contact.pérdida_por_rotación}}` no
> sustituye nada y el correo sale con las llaves a la vista.

### Cuerpo

```
Hola {{contact.first_name}},

Acabas de calcular que la rotación te costó {{contact.prdida_por_rotacin}}
el año pasado.

De dónde sale ese número: el sueldo promedio que nos diste, multiplicado por
seis meses —lo que tarda un puesto en recuperarse entre reclutar, capacitar y
los meses en que nadie rinde igual— por la gente que se te fue.

Y es el cálculo conservador. El rango real va de seis a nueve meses de sueldo
por persona.

Lo que casi nadie mide es POR QUÉ se van. Y casi nunca es el dinero: es que
llevaban dos años haciendo exactamente lo mismo sin que nadie les dijera qué
seguía. Cuando alguien de fuera les ofrece un puesto con nombre, se van.

Por lo que te costó perder a una sola persona, le pagas un plan de carrera
completo a decenas.

Si quieres, lo vemos en diez minutos y te digo qué haría yo con tu caso.

[ Hablemos por WhatsApp ]

Rodrigo
6D Consultoría
Centro de Evaluación acreditado CONOCER-SEP · CE2140-OC063-18
```

### Botón

| Campo | Valor                                                                                                                        |
| ----- | ---------------------------------------------------------------------------------------------------------------------------- |
| Texto | `Hablemos por WhatsApp`                                                                                                      |
| URL   | `https://wa.me/529932232863?text=Hola,%20acabo%20de%20calcular%20mi%20costo%20de%20rotaci%C3%B3n%20y%20quiero%20platicarlo.` |

Ese mensaje precargado hace que la conversación empiece con contexto: sabes de
dónde viene antes de contestar.

---

## Por qué el correo está escrito así

- **El número va en el asunto.** Es suyo, acaba de verlo, y ningún asunto
  genérico compite con eso en una bandeja llena.
- **Explica de dónde sale la cifra.** Un número sin método se lee como truco de
  marketing. Con método, se lee como diagnóstico.
- **Dice que es el cálculo conservador.** Quedarte corto a propósito y decirlo
  vale más que inflar.
- **No vende el programa.** Vende una conversación de diez minutos. El correo no
  tiene que cerrar la venta, solo conseguir la respuesta.
- **La acreditación va en la firma**, no en el cuerpo. Ahí hace de respaldo sin
  interrumpir el argumento.

---

## Cuando esté listo

Manda un lead de prueba desde `plan.6dlinks.com/#calculadora` con tu correo y
confirma que llega con el número sustituido, no con `{{contact...}}` en crudo.

Es el fallo más común: la clave del campo mal escrita.
