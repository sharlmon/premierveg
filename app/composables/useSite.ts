export const useSite = () => {
  const c = useRuntimeConfig().public
  const wa = (text: string) => `https://wa.me/${c.whatsapp}?text=${encodeURIComponent(text)}`
  return { siteUrl: String(c.siteUrl).replace(/\/$/, ''), formKey: String(c.web3formsKey || ''), whatsapp: String(c.whatsapp), email: 'info@premierveg.com', phone: '+39 351 215 1931', wa }
}
