import { describe, expect, it } from 'vitest'
import { render, screen, within } from '@testing-library/react'
import App from './App'

const APP_STORE_URL = 'https://apps.apple.com/app/id6766896814'

describe('GoodHealthMate landing page', () => {
  it('renders the simplified header without the removed navigation menu', () => {
    render(<App />)
    const header = screen.getByRole('banner')
    expect(within(header).getByText('GoodHealthMate')).toBeInTheDocument()
    const downloadLink = within(header).getByRole('link', { name: /download goodhealthmate/i })
    expect(downloadLink).toHaveAttribute('href', APP_STORE_URL)
    expect(downloadLink.querySelector('.apple-logo')).toHaveAttribute('src', '/assets/redesign/apple-logo-light.svg')
    expect(screen.queryByRole('navigation')).not.toBeInTheDocument()
  })

  it('renders the approved MVP sections and real app screenshots', () => {
    render(<App />)
    expect(screen.getByRole('heading', { name: /reach your goals with goodhealthmate/i })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: /every screen, designed to keep you on track/i })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: /food tracking that takes seconds/i })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: /^how it works$/i })).toBeInTheDocument()
    expect(screen.getByAltText(/home dashboard/i)).toHaveAttribute('src', expect.stringContaining('scr-home.jpg'))
  })

  it('wires every download action and the QR card to the App Store', () => {
    render(<App />)
    const links = screen.getAllByRole('link', { name: /app store/i })
    expect(links.length).toBeGreaterThanOrEqual(4)
    links.forEach((link) => expect(link).toHaveAttribute('href', APP_STORE_URL))
  })

  it('shows the approved footer details and omits deferred content', () => {
    render(<App />)
    const footer = screen.getByRole('contentinfo')
    expect(within(footer).getByText(/abn 29 677 871 686 · made in adelaide/i)).toBeInTheDocument()
    expect(within(footer).getByRole('link', { name: 'support@goodhealthmate.com' })).toHaveAttribute('href', 'mailto:support@goodhealthmate.com')
    expect(within(footer).getByRole('link', { name: /privacy policy/i })).toHaveAttribute('href', '/privacy/')
    expect(within(footer).queryByText(/our story/i)).not.toBeInTheDocument()
    expect(within(footer).queryByText(/help & faqs/i)).not.toBeInTheDocument()
    expect(within(footer).queryByText(/terms of use/i)).not.toBeInTheDocument()
  })
})
