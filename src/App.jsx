import { useMemo, useState } from 'react'
import {
  createSession,
  deleteSession,
  getChatHistory,
  sendMessage,
} from './services/safespaceApi'
import { getApiBaseUrl } from './services/httpClient'

function App() {
  const [sessionId, setSessionId] = useState('')
  const [draft, setDraft] = useState('')
  const [messages, setMessages] = useState([])
  const [statusText, setStatusText] = useState('Idle')
  const [errorText, setErrorText] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const apiBaseUrlText = useMemo(() => getApiBaseUrl() || '(same-origin)', [])

  const formatError = (error) => {
    if (!error) {
      return 'Terjadi kesalahan.'
    }

    const detailsText =
      typeof error.details === 'string'
        ? error.details
        : error.details
          ? JSON.stringify(error.details)
          : ''

    return `${error.message ?? 'Permintaan gagal.'}${detailsText ? ` | details: ${detailsText}` : ''}`
  }

  const runAction = async (action, pendingText, successText) => {
    setIsLoading(true)
    setErrorText('')
    setStatusText(pendingText)

    try {
      await action()
      setStatusText(successText)
    } catch (error) {
      setErrorText(formatError(error))
      setStatusText('Gagal')
    } finally {
      setIsLoading(false)
    }
  }

  const handleCreateSession = async () => {
    await runAction(
      async () => {
        const data = await createSession()
        setSessionId(data.session_id)
      },
      'Membuat session...',
      'Session berhasil dibuat.',
    )
  }

  const handleDeleteSession = async () => {
    await runAction(
      async () => {
        await deleteSession(sessionId)
        setSessionId('')
        setMessages([])
      },
      'Menghapus session...',
      'Session berhasil dihapus.',
    )
  }

  const handleSendMessage = async () => {
    await runAction(
      async () => {
        const message = await sendMessage({ sessionId, message: draft })
        setMessages((previous) => [...previous, message])
        setDraft('')
      },
      'Mengirim pesan...',
      'Pesan berhasil dikirim.',
    )
  }

  const handleGetHistory = async () => {
    await runAction(
      async () => {
        const history = await getChatHistory(sessionId)
        setMessages(history.messages)
      },
      'Memuat riwayat chat...',
      'Riwayat chat berhasil dimuat.',
    )
  }

  return (
    <main className='mx-auto max-w-2xl p-6'>
      <h1 className='text-2xl font-semibold'>SafeSpace API Integration</h1>
      <p className='mt-2 text-sm'>API Base URL: {apiBaseUrlText}</p>

      <section className='mt-4 flex flex-wrap gap-2'>
        <button
          type='button'
          onClick={handleCreateSession}
          disabled={isLoading}
          className='rounded border px-3 py-2'
        >
          Create Session
        </button>
        <button
          type='button'
          onClick={handleDeleteSession}
          disabled={isLoading || !sessionId}
          className='rounded border px-3 py-2'
        >
          Delete Session
        </button>
        <button
          type='button'
          onClick={handleGetHistory}
          disabled={isLoading || !sessionId}
          className='rounded border px-3 py-2'
        >
          Get History
        </button>
      </section>

      <p className='mt-3 text-sm'>Session ID: {sessionId || '-'}</p>

      <section className='mt-4'>
        <textarea
          value={draft}
          onChange={(event) => setDraft(event.target.value)}
          rows={4}
          placeholder='Tulis pesan (1-4096 karakter)...'
          className='w-full rounded border p-2'
        />
        <button
          type='button'
          onClick={handleSendMessage}
          disabled={isLoading || !sessionId}
          className='mt-2 rounded border px-3 py-2'
        >
          Send Message
        </button>
      </section>

      <section className='mt-4'>
        <p className='text-sm'>Status: {statusText}</p>
        {errorText ? <p className='mt-1 text-sm text-red-600'>Error: {errorText}</p> : null}
      </section>

      <section className='mt-4'>
        <h2 className='text-lg font-medium'>Messages</h2>
        <ul className='mt-2 space-y-2'>
          {messages.map((message) => (
            <li key={message.id || `${message.role}-${message.created_at}`} className='rounded border p-2'>
              <p className='text-xs text-gray-600'>
                {message.role || 'unknown'} • {message.created_at || '-'}
              </p>
              <p>{message.content || ''}</p>
            </li>
          ))}
        </ul>
      </section>
    </main>
  )
}

export default App
