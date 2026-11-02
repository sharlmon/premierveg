export const useAsset = () => {
  const base = useRuntimeConfig().app.baseURL
  return (p: string) => base.replace(/\/$/, '') + '/' + p.replace(/^\//, '')
}
