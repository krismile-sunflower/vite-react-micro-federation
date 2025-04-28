import { useEffect, useState } from 'react'

function VueAppWrapper() {
  const [ready, setReady] = useState(false)

  useEffect(() => {
    import('remote_vue/VueAppElement').then(() => setReady(true))
  }, [])

  if (!ready) return <div>Loading Vue App...</div>

  // const Vue = <vue-app-element /> AS
  // return <vue-app-element />
  return <></>
  // return <VueAppElement/>
}

export default VueAppWrapper;