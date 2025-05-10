import { useEffect, useRef, useState } from 'react';
import { FaPaperPlane, FaRobot } from 'react-icons/fa';
import { HiX } from 'react-icons/hi';

const ChatbotWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);

  const [input, setInput] = useState('');
  const messagesEndRef = useRef(null);

  const handleSend = async () => {
  if (input.trim() === '') return;

  const userMessage = input;
  setMessages(prev => [...prev, { from: 'user', text: userMessage }]);
  setInput('');

  try {
    const res = await fetch('http://localhost:5000/api/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${sessionStorage.getItem('token')}`,
      },
      body: JSON.stringify({ message: userMessage }),
    });

    const data = await res.json();

    if (res.ok) {
      setMessages(prev => [...prev, { from: 'bot', text: data.response }]);
    } else {
      setMessages(prev => [...prev, { from: 'bot', text: "An error occurred: " + data.error }]);
    }
  } catch (error) {
    setMessages(prev => [...prev, { from: 'bot', text: "Server error. Please try again." }]);
    console.error('Chatbot error:', error);
  }
};

useEffect(() => {
  if (isOpen) {
    fetch('http://localhost:5000/api/chat/messages', {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem('token')}`,
      },
    })
      .then(res => res.json())
      .then(data => {
        const msgs = data.messages.map(msg => ({
          from: msg.role === 'user' ? 'user' : 'bot',
          text: msg.message,
        }));
        setMessages(msgs);
      })
      .catch(err => console.error('Load messages error:', err));
  }
}, [isOpen]);

  // Auto scroll to the bottom when a new message is added
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="fixed bottom-[7vh] right-10 z-50 font-montserral">
      {isOpen && (
        <div className="w-96 bg-white rounded-3xl shadow-2xl overflow-hidden">
          <div className="bg-[#213824CF] text-white px-5 py-3 flex items-center gap-3">
            <FaRobot className='text-xl'/>
            <h2 className="text-lg font-bold font-playfairdisplay">BinaaBot</h2>
          </div>
            <p className='text-center text-xs p-2 border-b'>This chat is not approved by an expert!!</p>
            <div className=" space-y-4 text-sm p-4 h-80 overflow-y-auto bg-[#fffcf4]">
                {messages.map((msg, idx) => (
                <div key={idx} className={`flex ${msg.from === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`px-4 py-2 rounded-xl max-w-[70%] ${msg.from === 'bot' ? 'bg-[#2138248f] text-white' : 'bg-white text-black border'}`}>
                    {msg.text}
                    </div>
                </div>
                ))}
                <div ref={messagesEndRef} />
            </div>
          <div className="flex items-center p-3 border-t">
            <input
              type="text"
              className="flex-grow p-2 rounded-xl border text-sm outline-none"
              placeholder="Type a message..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            />
            <button onClick={handleSend} className="ml-2 text-[#213824CF] text-xl">
              <FaPaperPlane />
            </button>
          </div>
        </div>
      )}
      <div className="flex justify-end space-x-3 mt-3">
        <button
          className="bg-[#213824CF] text-white p-4 rounded-full shadow-lg hover:bg-[#213824b1] text-2xl"
          onClick={() => setIsOpen(!isOpen)} title='BinaaBot'
        >
          {isOpen ? <HiX /> : <FaRobot />}
        </button>
      </div>
    </div>
  );
};

export default ChatbotWidget;
