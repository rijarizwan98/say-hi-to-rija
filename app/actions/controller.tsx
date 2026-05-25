import { createController } from 'remix/router'

import { assetServer } from '../assets.ts'
import { routes } from '../routes.ts'
import { Document } from '../ui/document.tsx'
import { PortfolioHead, PortfolioPage } from '../ui/portfolio-page.tsx'

export default createController(routes, {
  actions: {
    async assets(context) {
      return (
        (await assetServer.fetch(context.request)) ?? new Response('Not Found', { status: 404 })
      )
    },
    home(context) {
      return context.render(
        <Document title="Rija Rizwan — Full Stack Developer" head={<PortfolioHead />}>
          <PortfolioPage />
        </Document>,
      )
    },
  },
})
