import { describe, it, expect } from 'vitest'
import { render, screen, within } from '@testing-library/react'
import { beforeEach } from 'vitest'
import userEvent from '@testing-library/user-event'
import App from './App'

beforeEach(() => {
  window.history.replaceState({}, '', '/')
})

describe('App Component', () => {
  it('should render the navbar with logo and brand name', () => {
    render(<App />)

    const nav = screen.getByRole('navigation')
    expect(within(nav).getByText('GoodHealthMate')).toBeInTheDocument()
    expect(within(nav).getByAltText(/goodhealthmate app icon/i)).toBeInTheDocument()
  })

  it('should render static navbar navigation items', () => {
    render(<App />)

    const nav = screen.getByRole('navigation')
    expect(within(nav).getByRole('link', { name: /^features$/i })).toHaveAttribute('href', '#features')
    expect(within(nav).getByRole('link', { name: /how it works/i })).toHaveAttribute('href', '#how-it-works')
    expect(within(nav).getByRole('button', { name: /^about$/i })).toBeInTheDocument()
    expect(within(nav).getByRole('link', { name: /^contact$/i })).toHaveAttribute('href', '/contact-us')
  })

  it('should keep modal hidden by default', () => {
    render(<App />)

    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
  })

  it('should open About modal when About is clicked', async () => {
    const user = userEvent.setup()
    render(<App />)

    const nav = screen.getByRole('navigation')
    await user.click(within(nav).getByRole('button', { name: /^about$/i }))

    const dialog = screen.getByRole('dialog')
    expect(within(dialog).getByRole('heading', { name: /about goodhealthmate/i })).toBeInTheDocument()
    expect(within(dialog).getByText(/goodhealthmate is designed to help people build healthier eating habits/i)).toBeInTheDocument()
    expect(within(dialog).getByRole('button', { name: /close dialog/i })).toBeInTheDocument()
  })

  it('should open Contact modal from footer and keep form available', async () => {
    const user = userEvent.setup()
    render(<App />)

    const footer = screen.getByText(/all rights reserved/i).closest('footer')
    await user.click(within(footer).getByRole('link', { name: /^contact us$/i }))

    const dialog = screen.getByRole('dialog')
    expect(within(dialog).getByRole('heading', { name: /^contact us$/i })).toBeInTheDocument()
    expect(window.location.pathname).toBe('/contact-us')

    const emailLinks = within(dialog).getAllByRole('link', { name: 'support@dreamingstudio.net' })
    expect(emailLinks[0]).toHaveAttribute('href', 'mailto:support@dreamingstudio.net')

    const sendButton = within(dialog).getByRole('button', { name: /send feedback/i })
    const feedbackForm = sendButton.closest('form')
    expect(feedbackForm).toHaveAttribute('action', 'https://formsubmit.co/support@dreamingstudio.net')
  })

  it('should open Contact modal from navbar and expose the support URL', async () => {
    const user = userEvent.setup()
    render(<App />)

    const nav = screen.getByRole('navigation')
    await user.click(within(nav).getByRole('link', { name: /^contact$/i }))

    expect(window.location.pathname).toBe('/contact-us')
    expect(screen.getByRole('heading', { name: /^contact us$/i })).toBeInTheDocument()
  })

  it('should open Contact modal when visiting the support URL directly', () => {
    window.history.replaceState({}, '', '/contact-us')
    render(<App />)

    expect(screen.getByRole('heading', { name: /^contact us$/i })).toBeInTheDocument()
  })

  it('should open Privacy Policy modal from footer', async () => {
    const user = userEvent.setup()
    render(<App />)

    const footer = screen.getByText(/all rights reserved/i).closest('footer')
    await user.click(within(footer).getByRole('button', { name: /^privacy policy$/i }))

    const dialog = screen.getByRole('dialog')
    expect(within(dialog).getByRole('heading', { name: /privacy policy: goodhealthmate/i })).toBeInTheDocument()
    expect(within(dialog).getByText(/last updated:/i)).toBeInTheDocument()
    expect(within(dialog).getAllByText(/may 13, 2026/i).length).toBeGreaterThan(0)
  })

  it('should close modal when close button is clicked', async () => {
    const user = userEvent.setup()
    render(<App />)

    const nav = screen.getByRole('navigation')
    await user.click(within(nav).getByRole('button', { name: /^about$/i }))
    expect(screen.getByRole('dialog')).toBeInTheDocument()

    await user.click(screen.getByRole('button', { name: /close dialog/i }))
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
  })

  it('should show one modal content at a time', async () => {
    const user = userEvent.setup()
    render(<App />)

    const footer = screen.getByText(/all rights reserved/i).closest('footer')
    await user.click(within(footer).getByRole('link', { name: /^contact us$/i }))
    expect(screen.getByRole('heading', { name: /^contact us$/i })).toBeInTheDocument()

    await user.click(within(footer).getByRole('button', { name: /^privacy policy$/i }))
    expect(screen.getByRole('heading', { name: /privacy policy: goodhealthmate/i })).toBeInTheDocument()
    expect(screen.queryByRole('heading', { name: /^contact us$/i })).not.toBeInTheDocument()
  })

  it('should render hero and feature content', () => {
    render(<App />)

    expect(screen.getByRole('heading', { name: /reach your goals with goodhealthmate/i })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: /food tracking/i })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: /^how it works$/i })).toBeInTheDocument()
  })

  it('should render the hero image with correct alt text', () => {
    render(<App />)

    const heroImage = screen.getByAltText(/healthy meal prep/i)
    expect(heroImage).toBeInTheDocument()
    expect(heroImage).toHaveAttribute('src', expect.stringContaining('unsplash.com'))
  })
})
