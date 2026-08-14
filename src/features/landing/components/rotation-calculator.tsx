"use client";

import { useState } from "react";
import { Eyebrow, Section, SectionTitle } from "@/shared/components/ui";
import { entryPlan } from "@/shared/data/plans";
import { mxn, replacementCost } from "@/shared/data/site";

/**
 * Calculadora de costo de rotación.
 *
 * Es el único componente de cliente de todo el proyecto. Enseña el resultado
 * ANTES de pedir el correo: quien ya vio su número tiene motivo para dejarlo,
 * y quien no lo ve solo tiene un formulario más.
 *
 * Usa el multiplicador conservador (6 meses de sueldo, el extremo bajo del
 * rango 6-9) para que nadie pueda decir que inflamos la cifra.
 */

type Status = "idle" | "sending" | "done" | "error";

export function RotationCalculator() {
  const [salary, setSalary] = useState<number>(replacementCost.salary);
  const [departures, setDepartures] = useState(3);
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");

  const cost = salary * replacementCost.months * departures;
  const equivalent = Math.floor(cost / entryPlan.price);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("sending");

    const data = new FormData(event.currentTarget);

    try {
      const response = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: String(data.get("name") ?? ""),
          email: String(data.get("email") ?? ""),
          company: String(data.get("company") ?? ""),
          website: String(data.get("website") ?? ""),
          salary,
          departures,
          cost,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        setStatus("error");
        setMessage(result.error ?? "Algo falló. Intenta de nuevo.");
        return;
      }

      window.fbq?.("track", "Lead", { value: cost, currency: "MXN" });
      setStatus("done");
    } catch {
      setStatus("error");
      setMessage("No hay conexión. Intenta de nuevo.");
    }
  }

  return (
    <Section id="calculadora" dark>
      <Eyebrow>Tu número</Eyebrow>
      <SectionTitle className="max-w-2xl">
        ¿Cuánto te costó la rotación el año pasado?
      </SectionTitle>

      <div className="mt-12 grid gap-10 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
        {/* Entradas */}
        <div className="space-y-8">
          <Field
            label="Sueldo mensual promedio de quien se te va"
            value={salary}
            onChange={setSalary}
            step={1000}
            min={1000}
            max={200000}
            format={mxn}
          />
          <Field
            label="¿Cuántas personas se fueron en el último año?"
            value={departures}
            onChange={setDepartures}
            step={1}
            min={0}
            max={50}
            format={(n) => String(n)}
          />
        </div>

        {/* Resultado */}
        <div className="rounded-2xl border border-line bg-night p-8 sm:p-10">
          <p className="text-sm uppercase tracking-[0.18em] text-muted">
            Te costó
          </p>
          <p className="tabular mt-3 font-display text-[clamp(2.5rem,7vw,4.5rem)] font-extrabold leading-none text-gold">
            {mxn(cost)}
          </p>
          <p className="mt-4 text-base leading-relaxed text-muted">
            {departures === 0 ? (
              <>
                Si no se te fue nadie, enhorabuena — es raro. Mueve el número y
                mira lo que costaría que se fueran.
              </>
            ) : (
              <>
                Calculado a {replacementCost.months} meses de sueldo por
                persona, que es el extremo{" "}
                <span className="text-cream">bajo</span> del rango. Entre
                reclutar, capacitar y los meses en que nadie rinde igual.
              </>
            )}
          </p>

          {equivalent > 0 && (
            <p className="mt-6 border-t border-line pt-6 font-display text-xl font-bold leading-snug">
              Con ese dinero le pagas el plan de carrera a{" "}
              <span className="tabular text-gold">{equivalent}</span>{" "}
              {equivalent === 1 ? "persona" : "personas"}.
            </p>
          )}
        </div>
      </div>

      {/* Captura */}
      <div className="mt-12 max-w-2xl">
        {status === "done" ? (
          <div className="rounded-2xl border border-aqua/40 bg-aqua/[0.06] p-8">
            <p className="font-display text-2xl font-extrabold">
              Listo, va en camino.
            </p>
            <p className="mt-3 text-base leading-relaxed text-muted">
              Te mandamos el desglose de cómo sale ese número y qué se puede
              hacer. Si quieres adelantarlo, escríbenos por WhatsApp y lo vemos
              hoy mismo.
            </p>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="rounded-2xl border border-line p-8"
          >
            <p className="text-base leading-relaxed text-muted">
              Déjanos tu correo y te mandamos el desglose de ese número, con lo
              que cuesta cada parte y por dónde se detiene.
            </p>

            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <Input name="name" label="Nombre" required autoComplete="name" />
              <Input
                name="email"
                label="Correo"
                type="email"
                required
                autoComplete="email"
              />
              <div className="sm:col-span-2">
                <Input
                  name="company"
                  label="Empresa (opcional)"
                  autoComplete="organization"
                />
              </div>
            </div>

            {/* Trampa para bots: oculta a la vista y a los lectores de pantalla. */}
            <div
              aria-hidden
              className="absolute left-[-9999px] h-0 w-0 overflow-hidden"
            >
              <label htmlFor="website">No llenar</label>
              <input
                id="website"
                name="website"
                tabIndex={-1}
                autoComplete="off"
              />
            </div>

            <button
              type="submit"
              disabled={status === "sending"}
              className="mt-7 inline-flex min-h-[52px] items-center justify-center rounded-full bg-gold px-7 text-base font-semibold text-night transition-colors duration-200 hover:bg-gold-bright disabled:opacity-60"
            >
              {status === "sending" ? "Enviando…" : "Mándame el desglose"}
            </button>

            {status === "error" && (
              <p role="alert" className="mt-4 text-sm text-amber-300">
                {message}
              </p>
            )}

            <p className="mt-4 text-sm text-muted">
              Solo para mandarte esto y ponernos en contacto. Nada de spam.
            </p>
          </form>
        )}
      </div>
    </Section>
  );
}

function Field({
  label,
  value,
  onChange,
  step,
  min,
  max,
  format,
}: {
  label: string;
  value: number;
  onChange: (value: number) => void;
  step: number;
  min: number;
  max: number;
  format: (value: number) => string;
}) {
  return (
    <div>
      <label className="block text-base text-muted">{label}</label>
      <p className="tabular mt-2 font-display text-3xl font-extrabold text-cream">
        {format(value)}
      </p>
      <input
        type="range"
        value={value}
        step={step}
        min={min}
        max={max}
        onChange={(event) => onChange(Number(event.target.value))}
        aria-label={label}
        className="mt-4 h-2 w-full cursor-pointer appearance-none rounded-full bg-surface accent-gold"
      />
    </div>
  );
}

function Input({
  name,
  label,
  type = "text",
  required,
  autoComplete,
}: {
  name: string;
  label: string;
  type?: string;
  required?: boolean;
  autoComplete?: string;
}) {
  return (
    <div>
      <label htmlFor={name} className="block text-sm text-muted">
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        autoComplete={autoComplete}
        className="mt-2 min-h-[48px] w-full rounded-lg border border-line bg-night px-4 text-base text-cream placeholder:text-muted focus:border-aqua focus:outline-none"
      />
    </div>
  );
}
