"use client"
import { useState, useEffect } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { sendEmail } from "@/app/actions/email"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Loader2, CheckCircle, AlertCircle, X } from "lucide-react"
import { FormattedMessage, useIntl } from "react-intl"

// Country codes data
const countryCodes = [
  { code: "+54", country: "Argentina", flag: "🇦🇷", id: "AR" },
  { code: "+1", country: "United States", flag: "🇺🇸", id: "US" },
  { code: "+1", country: "Canada", flag: "🇨🇦", id: "CA" },
  { code: "+52", country: "Mexico", flag: "🇲🇽", id: "MX" },
  { code: "+55", country: "Brazil", flag: "🇧🇷", id: "BR" },
  { code: "+56", country: "Chile", flag: "🇨🇱", id: "CL" },
  { code: "+57", country: "Colombia", flag: "🇨🇴", id: "CO" },
  { code: "+58", country: "Venezuela", flag: "🇻🇪", id: "VE" },
  { code: "+51", country: "Peru", flag: "🇵🇪", id: "PE" },
  { code: "+593", country: "Ecuador", flag: "🇪🇨", id: "EC" },
  { code: "+595", country: "Paraguay", flag: "🇵🇾", id: "PY" },
  { code: "+598", country: "Uruguay", flag: "🇺🇾", id: "UY" },
  { code: "+591", country: "Bolivia", flag: "🇧🇴", id: "BO" },
  { code: "+34", country: "Spain", flag: "🇪🇸", id: "ES" },
  { code: "+33", country: "France", flag: "🇫🇷", id: "FR" },
  { code: "+39", country: "Italy", flag: "🇮🇹", id: "IT" },
  { code: "+49", country: "Germany", flag: "🇩🇪", id: "DE" },
  { code: "+44", country: "United Kingdom", flag: "🇬🇧", id: "GB" },
  { code: "+351", country: "Portugal", flag: "🇵🇹", id: "PT" },
  { code: "+31", country: "Netherlands", flag: "🇳🇱", id: "NL" },
  { code: "+32", country: "Belgium", flag: "🇧🇪", id: "BE" },
  { code: "+41", country: "Switzerland", flag: "🇨🇭", id: "CH" },
  { code: "+43", country: "Austria", flag: "🇦🇹", id: "AT" },
  { code: "+45", country: "Denmark", flag: "🇩🇰", id: "DK" },
  { code: "+46", country: "Sweden", flag: "🇸🇪", id: "SE" },
  { code: "+47", country: "Norway", flag: "🇳🇴", id: "NO" },
  { code: "+358", country: "Finland", flag: "🇫🇮", id: "FI" },
  { code: "+353", country: "Ireland", flag: "🇮🇪", id: "IE" },
  { code: "+48", country: "Poland", flag: "🇵🇱", id: "PL" },
  { code: "+420", country: "Czech Republic", flag: "🇨🇿", id: "CZ" },
  { code: "+421", country: "Slovakia", flag: "🇸🇰", id: "SK" },
  { code: "+36", country: "Hungary", flag: "🇭🇺", id: "HU" },
  { code: "+40", country: "Romania", flag: "🇷🇴", id: "RO" },
  { code: "+359", country: "Bulgaria", flag: "🇧🇬", id: "BG" },
  { code: "+385", country: "Croatia", flag: "🇭🇷", id: "HR" },
  { code: "+386", country: "Slovenia", flag: "🇸🇮", id: "SI" },
  { code: "+381", country: "Serbia", flag: "🇷🇸", id: "RS" },
  { code: "+7", country: "Russia", flag: "🇷🇺", id: "RU" },
  { code: "+380", country: "Ukraine", flag: "🇺🇦", id: "UA" },
  { code: "+30", country: "Greece", flag: "🇬🇷", id: "GR" },
  { code: "+90", country: "Turkey", flag: "🇹🇷", id: "TR" },
  { code: "+972", country: "Israel", flag: "🇮🇱", id: "IL" },
  { code: "+971", country: "UAE", flag: "🇦🇪", id: "AE" },
  { code: "+966", country: "Saudi Arabia", flag: "🇸🇦", id: "SA" },
  { code: "+20", country: "Egypt", flag: "🇪🇬", id: "EG" },
  { code: "+27", country: "South Africa", flag: "🇿🇦", id: "ZA" },
  { code: "+234", country: "Nigeria", flag: "🇳🇬", id: "NG" },
  { code: "+254", country: "Kenya", flag: "🇰🇪", id: "KE" },
  { code: "+91", country: "India", flag: "🇮🇳", id: "IN" },
  { code: "+86", country: "China", flag: "🇨🇳", id: "CN" },
  { code: "+81", country: "Japan", flag: "🇯🇵", id: "JP" },
  { code: "+82", country: "South Korea", flag: "🇰🇷", id: "KR" },
  { code: "+65", country: "Singapore", flag: "🇸🇬", id: "SG" },
  { code: "+60", country: "Malaysia", flag: "🇲🇾", id: "MY" },
  { code: "+66", country: "Thailand", flag: "🇹🇭", id: "TH" },
  { code: "+84", country: "Vietnam", flag: "🇻🇳", id: "VN" },
  { code: "+63", country: "Philippines", flag: "🇵🇭", id: "PH" },
  { code: "+62", country: "Indonesia", flag: "🇮🇩", id: "ID" },
  { code: "+61", country: "Australia", flag: "🇦🇺", id: "AU" },
  { code: "+64", country: "New Zealand", flag: "🇳🇿", id: "NZ" }
]

export default function ContactoForm() {
  const intl = useIntl()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formStatus, setFormStatus] = useState<"idle" | "success" | "error">("idle")
  const [selectedCountryCode, setSelectedCountryCode] = useState("+54")

  const formSchema = z.object({
    name: z.string().min(2, {
      message: intl.formatMessage({ id: "contact.form.name.error" }),
    }),
    email: z.string().email({
      message: intl.formatMessage({ id: "contact.form.email.error" }),
    }),
    phone: z.string().min(8, {
      message: intl.formatMessage({ id: "contact.form.phone.error" }),
    }),
    subject: z.string().min(1, {
      message: intl.formatMessage({ id: "contact.form.subject.error" }),
    }),
    message: z.string().min(10, {
      message: intl.formatMessage({ id: "contact.form.message.error" }),
    }),
  })

  type FormValues = z.infer<typeof formSchema>

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "+54",
      subject: "",
      message: "",
    },
  })

  useEffect(() => {
    if (formStatus !== "idle") {
      const timer = setTimeout(() => {
        setFormStatus("idle")
      }, 5000)
      return () => clearTimeout(timer)
    }
  }, [formStatus])

  useEffect(() => {
    // Update phone field when country code changes
    const currentPhone = form.getValues("phone")
    if (currentPhone && !currentPhone.startsWith(selectedCountryCode)) {
      const phoneNumber = currentPhone.replace(/^\+\d+/, '')
      form.setValue("phone", `${selectedCountryCode}${phoneNumber}`)
    }
  }, [selectedCountryCode, form])

  async function onSubmit(data: FormValues) {
    setIsSubmitting(true)
    setFormStatus("idle")
    try {
      const result = await sendEmail(data)
      if (result.success) {
        setFormStatus("success")
        form.reset()
        setSelectedCountryCode("+54")
      } else {
        setFormStatus("error")
      }
    } catch (error) {
      console.error("Error al enviar el correo:", error)
      setFormStatus("error")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <>
      {/* Notification */}
      {formStatus !== "idle" && (
        <div role="status" aria-live="polite" className="fixed top-24 right-4 z-50 max-w-md w-[calc(100%-2rem)] translate-x-0 opacity-100 transition-all duration-300">
          <div className={`rounded-lg p-4 shadow-lg border-l-4 ${
            formStatus === "success" 
              ? "bg-green-50 border-green-400 text-green-800" 
              : "bg-red-50 border-red-400 text-red-800"
          }`}>
            <div className="flex items-start">
              <div className="flex-shrink-0">
                {formStatus === "success" ? (
                  <CheckCircle className="h-5 w-5 text-green-400" />
                ) : (
                  <AlertCircle className="h-5 w-5 text-red-400" />
                )}
              </div>
              <div className="ml-3 flex-1">
                <h3 className="text-sm font-medium">
                  {formStatus === "success" ? (
                    <FormattedMessage id="contact.form.success.title" defaultMessage="Mensaje enviado" />
                  ) : (
                    <FormattedMessage id="contact.form.error.title" defaultMessage="Error al enviar" />
                  )}
                </h3>
                <p className="mt-1 text-sm">
                  {formStatus === "success" ? (
                    <FormattedMessage id="contact.form.success.alert" defaultMessage="Tu mensaje ha sido enviado correctamente. Te responderemos pronto." />
                  ) : (
                    <FormattedMessage id="contact.form.error.alert" defaultMessage="Hubo un error al enviar tu mensaje. Por favor intenta nuevamente." />
                  )}
                </p>
              </div>
              <div className="ml-4 flex-shrink-0">
                <button
                  type="button"
                  onClick={() => setFormStatus("idle")}
                  className="inline-flex text-gray-400 hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  aria-label="Cerrar notificación"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-white">
                  <FormattedMessage id="contact.form.name.label" defaultMessage="Nombre" />
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder={intl.formatMessage({ id: "contact.form.name.placeholder" })}
                    {...field}
                    className="h-12 rounded-none px-4 text-white"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-white">
                  <FormattedMessage id="contact.form.email.label" defaultMessage="Email" />
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder={intl.formatMessage({ id: "contact.form.email.placeholder" })}
                    {...field}
                    className="h-12 rounded-none px-4 text-white"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-white">
                  <FormattedMessage id="contact.form.phone.label" defaultMessage="Teléfono" />
                </FormLabel>
                <FormControl>
                  <div className="flex">
                    <Select 
                      value={countryCodes.find(c => c.code === selectedCountryCode)?.id || "ar"} 
                      onValueChange={(countryId) => {
                        const country = countryCodes.find(c => c.id === countryId);
                        if (country) {
                          setSelectedCountryCode(country.code);
                        }
                      }}
                    >
                      <SelectTrigger className="h-12 rounded-none border-r-0 text-white cursor-pointer">
                        <SelectValue>
                          <span className="flex items-center">
                            {/* {countryCodes.find(c => c.code === selectedCountryCode)?.flag}  */}
                            {selectedCountryCode}
                          </span>
                        </SelectValue>
                      </SelectTrigger>
                      <SelectContent className="bg-negro text-white border-negro-secundario max-h-60">
                        {countryCodes.map((country) => (
                          <SelectItem
                            key={country.id}
                            value={country.id}
                            className="focus:bg-rojo focus:text-white cursor-pointer bg-negro hover:bg-negro-secundario"
                          >
                            <span className="flex items-center">
                              {country.code} · {country.country}
                            </span>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <Input
                      placeholder={intl.formatMessage({ id: "contact.form.phone.placeholder" })}
                      {...field}
                      onChange={(e) => {
                        const value = e.target.value.replace(/\D/g, '')
                        field.onChange(`${selectedCountryCode}${value}`)
                      }}
                      value={field.value?.replace(selectedCountryCode, '') || ''}
                      className="h-12 rounded-none px-4 text-white flex-1"
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="subject"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-white">
                  <FormattedMessage id="contact.form.subject.label" defaultMessage="Asunto" />
                </FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger id="select-contact" className="h-12 cursor-pointer rounded-none w-full text-white data-[placeholder]:text-white/45">
                      <SelectValue placeholder={intl.formatMessage({ id: "contact.form.subject.placeholder" })} />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent className="bg-negro text-white border-negro-secundario">
                    <SelectItem
                      className="focus:bg-rojo focus:text-white cursor-pointer"
                      value="Excursiones"
                    >
                      <FormattedMessage id="contact.form.subject.option.excursions" />
                    </SelectItem>
                    <SelectItem
                      className="focus:bg-rojo focus:text-white cursor-pointer"
                      value="Buceo"
                    >
                      <FormattedMessage id="contact.form.subject.option.diving" />
                    </SelectItem>
                    <SelectItem
                      className="focus:bg-rojo focus:text-white cursor-pointer"
                      value="Cursos"
                    >
                      <FormattedMessage id="contact.form.subject.option.courses" />
                    </SelectItem>
                    <SelectItem
                      className="focus:bg-rojo focus:text-white cursor-pointer"
                      value="Otro tema"
                    >
                      <FormattedMessage id="contact.form.subject.option.other" />
                    </SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-white">
                <FormattedMessage id="contact.form.message.label" defaultMessage="Mensaje" />
              </FormLabel>
              <FormControl>
                <Textarea
                  placeholder={intl.formatMessage({ id: "contact.form.message.placeholder" })}
                  {...field}
                  className="min-h-[160px] rounded-none p-4 text-white"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="min-h-12 w-full rounded-none bg-rojo text-sm font-extrabold uppercase tracking-[.1em] text-white hover:bg-[#f02b2b]" disabled={isSubmitting}>
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              <FormattedMessage id="contact.form.submitting" defaultMessage="Enviando..." />
            </>
          ) : formStatus === "success" ? (
            <>
              <CheckCircle className="mr-2 h-4 w-4" />
              <FormattedMessage id="contact.form.success" defaultMessage="Mensaje enviado" />
            </>
          ) : formStatus === "error" ? (
            <>
              <AlertCircle className="mr-2 h-4 w-4" />
              <FormattedMessage id="contact.form.error" defaultMessage="Intentar nuevamente" />
            </>
          ) : (
            <FormattedMessage id="contact.form.submit" defaultMessage="Enviar mensaje" />
          )}
        </Button>
        </form>
      </Form>
    </>
  )
}
