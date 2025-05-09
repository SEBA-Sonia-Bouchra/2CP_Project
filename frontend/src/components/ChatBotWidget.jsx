import { useEffect, useRef, useState } from 'react';
import { FaPaperPlane, FaRobot } from 'react-icons/fa';
import { HiX } from 'react-icons/hi';

const ChatbotWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { from: 'bot', text: 'Do you have question?' },
    { from: 'user', text: 'Hello!' },
    { from: 'user', text: 'Can I try the software first?' },
    { from: 'bot', text: 'Sure. Here is the demo unit. You can use it as long as you want.' },
    { from: 'user', text: 'Thank you. Now I want to buy the software. Which type of subscription do you have?' },
    { from: 'bot', text: 'You are welcome!' }
  ]);

  const [input, setInput] = useState('');
  const messagesEndRef = useRef(null);

  const handleSend = () => {
    if (input.trim() !== '') {
      setMessages(prev => [...prev, { from: 'user', text: input }]);
      setInput('');
    }
  };

  // Auto scroll to the bottom when a new message is added
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="fixed bottom-4 right-10 z-50 font-montserral">
      {isOpen && (
        <div className="w-96 bg-white rounded-3xl shadow-2xl overflow-hidden">
          <div className="bg-[#B57D57] text-white px-5 py-3 flex items-center gap-3">
            <FaRobot className='text-xl'/>
            <h2 className="text-lg font-bold font-playfairdisplay">BinaaBot</h2>
          </div>
          <div className='h-96 overflow-y-auto bg-[#fffcf4]'>
            <p className='text-center text-xs p-2 border-b'>This chat is not approved by an expert!!</p>
            <div className=" space-y-4 text-sm p-4">
                {messages.map((msg, idx) => (
                <div key={idx} className={`flex ${msg.from === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`px-4 py-2 rounded-xl max-w-[70%] ${msg.from === 'bot' ? 'bg-[#b57d57c7] text-white' : 'bg-white text-black border'}`}>
                    {msg.text}
                    </div>
                </div>
                ))}
                <div ref={messagesEndRef} />
            </div>
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
            <button onClick={handleSend} className="ml-2 text-[#B57D57] text-xl">
              <FaPaperPlane />
            </button>
          </div>
        </div>
      )}
      <div className="flex justify-end space-x-3 mt-3">
        <button
          className="bg-[#B57D57] text-white p-4 rounded-full shadow-lg hover:bg-[#ce8b5e] text-2xl"
          onClick={() => setIsOpen(!isOpen)} title='BinaaBot'
        >
          {isOpen ? <HiX /> : <FaRobot />}
        </button>
      </div>
    </div>
  );
};

export default ChatbotWidget;
