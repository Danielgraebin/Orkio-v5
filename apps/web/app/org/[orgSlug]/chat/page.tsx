'use client';

import { useState } from 'react';
import { useParams } from 'next/navigation';

export default function ChatPage() {
  const params = useParams<{ orgSlug: string }>();
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<Array<{ role: string; content: string }>>([]);
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    if (!message.trim()) return;

    const userMessage = { role: 'user', content: message };
    setMessages((prev) => [...prev, userMessage]);
    setMessage('');
    setLoading(true);

    try {
      const response = await fetch('/api/v1/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          org_slug: params.orgSlug,
          message: message,
          conversation_id: null,
        }),
      });

      const data = await response.json();
      setMessages((prev) => [...prev, { role: 'assistant', content: data.reply }]);
    } catch (error) {
      console.error('Erro ao enviar mensagem:', error);
      setMessages((prev) => [
        ...prev,
        { role: 'error', content: 'Erro ao enviar mensagem' },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Chat</h1>
        <p className="text-muted-foreground">
          Organização: {params.orgSlug}
        </p>
      </div>

      <div className="flex flex-col space-y-4">
        <div className="min-h-[400px] rounded-lg border p-4 space-y-4">
          {messages.length === 0 ? (
            <p className="text-center text-muted-foreground">
              Nenhuma mensagem ainda. Comece a conversar!
            </p>
          ) : (
            messages.map((msg, i) => (
              <div
                key={i}
                className={`p-3 rounded-lg ${
                  msg.role === 'user'
                    ? 'bg-primary text-primary-foreground ml-auto max-w-[80%]'
                    : msg.role === 'error'
                    ? 'bg-destructive text-destructive-foreground'
                    : 'bg-muted max-w-[80%]'
                }`}
              >
                {msg.content}
              </div>
            ))
          )}
          {loading && (
            <div className="text-center text-muted-foreground">
              Enviando...
            </div>
          )}
        </div>

        <div className="flex space-x-2">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Digite sua mensagem..."
            className="flex-1 rounded-lg border px-4 py-2"
            disabled={loading}
          />
          <button
            onClick={handleSend}
            disabled={loading || !message.trim()}
            className="rounded-lg bg-primary px-6 py-2 text-primary-foreground hover:bg-primary/90 disabled:opacity-50"
          >
            Enviar
          </button>
        </div>
      </div>
    </div>
  );
}
