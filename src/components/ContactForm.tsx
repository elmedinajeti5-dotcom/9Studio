import { ArrowRightIcon } from './Icons'

type ContactFormProps = {
  showTitle?: boolean
}

export function ContactForm({ showTitle = true }: ContactFormProps) {
  return (
    <section className="studio-form-block" id="contact">
      <div className="studio-form-inner">
        {showTitle ? <h2 className="studio-form-title">Send the brief</h2> : null}

        <form
          className={`studio-form${showTitle ? '' : ' studio-form-plain'}`}
          onSubmit={(event) => event.preventDefault()}
        >
          <FormLine label="Name" name="name" type="text" />
          <FormLine label="Email" name="email" type="email" />
          <FormLine label="Project details" name="details" as="textarea" rows={4} />

          <div className="studio-form-actions">
            <button className="studio-form-submit" type="submit">
              <span>Send brief</span>
              <span className="studio-form-submit-disc">
                <ArrowRightIcon className="studio-form-submit-icon" />
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
  return (
    <label className="studio-form-line">
      <span>{label}</span>
      {as === 'textarea' ? (
        <textarea name={name} rows={rows} />
      ) : (
        <input name={name} type={type} />
      )}
    </label>
  )
}
