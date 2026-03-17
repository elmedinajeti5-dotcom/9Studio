import { ArrowRightIcon } from './Icons'

export function ContactForm() {
  return (
    <section className="px-1 pb-4 pt-3 sm:px-0 sm:pb-6 lg:pb-2" id="contact">
      <div className="mx-auto max-w-[392px] text-center min-[640px]:max-w-[540px]">
        <h2 className="text-[clamp(2.05rem,6.4vw,2.95rem)] font-light uppercase tracking-[-0.055em] text-ink min-[640px]:text-[clamp(2.3rem,4.2vw,3.55rem)]">
          LET&apos;S CONNECT
        </h2>

        <form
          className="mt-10 space-y-7 text-left min-[640px]:mt-10 min-[640px]:space-y-7"
          onSubmit={(event) => event.preventDefault()}
        >
          <FormLine label="Name" name="name" type="text" />
          <FormLine label="Email" name="email" type="email" />
          <FormLine
            label="Project details / brief"
            name="details"
            as="textarea"
            rows={2}
          />

          <div className="pt-2 text-center">
            <button
              className="inline-flex items-center gap-3 text-[8px] uppercase tracking-[0.18em] text-white/80 transition duration-300 hover:translate-y-[-1px] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60 focus-visible:ring-offset-2 focus-visible:ring-offset-shell min-[480px]:text-[9px] min-[640px]:text-[11px] min-[640px]:tracking-[0.22em]"
              type="submit"
            >
              <span>Submit form</span>
              <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-white text-black min-[480px]:h-6 min-[480px]:w-6">
                <ArrowRightIcon className="h-3 w-3" />
              </span>
            </button>
          </div>
        </form>
      </div>
    </section>
  )
}

type FormLineProps = {
  label: string
  name: string
  type?: string
  as?: 'input' | 'textarea'
  rows?: number
}

function FormLine({
  label,
  name,
  type = 'text',
  as = 'input',
  rows = 3,
}: FormLineProps) {
  const commonClasses =
    'mt-2 w-full border-0 bg-transparent p-0 text-[11px] text-white outline-none placeholder:text-white/30 min-[480px]:text-[12px] min-[640px]:text-[14px]'

  return (
    <label className="block border-b border-white/12 pb-3">
      <span className="text-[8px] uppercase tracking-[0.18em] text-white/40 min-[480px]:text-[9px] min-[640px]:text-[10px] min-[640px]:tracking-[0.22em]">
        {label}
      </span>
      {as === 'textarea' ? (
        <textarea className={`${commonClasses} resize-none`} name={name} rows={rows} />
      ) : (
        <input className={commonClasses} name={name} type={type} />
      )}
    </label>
  )
}
