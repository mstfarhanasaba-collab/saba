import React, { useState, useEffect, useRef } from 'react';
import { 
  Send, 
  Store, 
  ExternalLink, 
  CheckCheck, 
  Paperclip, 
  PhoneCall, 
  Video, 
  MoreVertical,
  CheckCircle2,
  Sparkles
} from 'lucide-react';
import { StoreInfo } from '../types';
import { WhatsAppIcon } from './WhatsAppIcon';

interface ChatMessage {
  id: string;
  sender: 'customer' | 'merchant';
  text: string;
  time: string;
  isOrderCard?: boolean;
}

interface ChatScreenProps {
  storeInfo: StoreInfo;
  prefilledMessage?: string;
  onClearPrefilled?: () => void;
}

export const ChatScreen: React.FC<ChatScreenProps> = ({
  storeInfo,
  prefilledMessage,
  onClearPrefilled,
}) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'm1',
      sender: 'merchant',
      text: 'Salam! Welcome to Dokan Direct Official WhatsApp Store. We specialize in authentic Panjabi collections, Sundarbans organic honey, handloom textiles & artisanal goods from Bangladesh.\n\nHow can we help you today?',
      time: '10:15 AM',
    },
  ]);

  const [inputVal, setInputVal] = useState(prefilledMessage || '');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (prefilledMessage) {
      setInputVal(prefilledMessage);
    }
  }, [prefilledMessage]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const handleSendMessage = (customText?: string) => {
    const textToSend = customText || inputVal;
    if (!textToSend.trim()) return;

    const timeStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const newMsg: ChatMessage = {
      id: `msg-${Date.now()}`,
      sender: 'customer',
      text: textToSend,
      time: timeStr,
      isOrderCard: textToSend.includes('I want to order this product'),
    };

    setMessages((prev) => [...prev, newMsg]);
    setInputVal('');
    if (onClearPrefilled) onClearPrefilled();

    // Trigger realistic merchant automated response
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      let reply = "Thank you! Our Dhanmondi store team is online and preparing your order details.";

      if (textToSend.includes('I want to order this product')) {
        reply = `Hello! Thank you for choosing Dokan Direct.\n\nWe have received your order inquiry and verified stock availability in our Dhaka fulfillment hub.\n\n🚚 Delivery Details:\n• Inside Dhaka: ৳70 (Delivery in 24-48 hrs)\n• Outside Dhaka: ৳130 (via Courier in 3-4 days)\n\nTo confirm dispatch, please reply with your:\n1. Recipient Name\n2. Complete Delivery Address\n3. Contact Mobile Number\n\nPayment options: Cash on Delivery (COD) or bKash.`;
      } else if (textToSend.toLowerCase().includes('delivery') || textToSend.toLowerCase().includes('dhaka')) {
        reply = `Inside Dhaka express delivery is ৳70, typically delivered within 24 to 48 hours right to your doorstep. You can inspect the package before paying the rider!`;
      } else if (textToSend.toLowerCase().includes('bkash') || textToSend.toLowerCase().includes('payment')) {
        reply = `We support Cash on Delivery (COD) across all 64 districts of Bangladesh. You can also pay via bKash Merchant Account at delivery!`;
      }

      setMessages((prev) => [
        ...prev,
        {
          id: `reply-${Date.now()}`,
          sender: 'merchant',
          text: reply,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
      ]);
    }, 1200);
  };

  const handleLaunchExternalWhatsApp = () => {
    const text = encodeURIComponent(inputVal || 'Hello Dokan Direct, I have an inquiry.');
    window.open(`https://wa.me/${storeInfo.whatsappNumber}?text=${text}`, '_blank');
  };

  return (
    <div className="flex flex-col h-[calc(100vh-115px)] max-w-md mx-auto bg-[#efeae2] relative pb-16">
      {/* WhatsApp chat top bar */}
      <div className="bg-[#075e54] text-white px-3 py-2.5 flex items-center justify-between shadow-sm z-10 shrink-0">
        <div className="flex items-center gap-2.5">
          <div className="relative">
            <div className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center font-bold text-white border border-white/30">
              <Store className="w-5 h-5 text-white" />
            </div>
            <span className="w-2.5 h-2.5 rounded-full bg-[#25d366] absolute bottom-0 right-0 border-2 border-[#075e54]" />
          </div>

          <div>
            <div className="flex items-center gap-1">
              <span className="font-heading font-semibold text-sm leading-tight text-white">
                {storeInfo.name}
              </span>
              <CheckCircle2 className="w-3.5 h-3.5 text-[#25d366]" />
            </div>
            <span className="text-[11px] text-white/80 block leading-tight">
              {isTyping ? 'Typing reply...' : 'Online • Dhaka Merchant'}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2 text-white/90">
          <button
            onClick={handleLaunchExternalWhatsApp}
            title="Open in Official WhatsApp Web/App"
            className="flex items-center gap-1 text-[11px] font-semibold bg-white/15 hover:bg-white/25 px-2 py-1 rounded-md transition-colors"
          >
            <span>Real WhatsApp</span>
            <ExternalLink className="w-3 h-3" />
          </button>
        </div>
      </div>

      {/* Security End-to-End notice */}
      <div className="py-2 px-4 text-center shrink-0">
        <div className="inline-block bg-[#ffeecd] text-[#54656f] text-[10px] px-3 py-1 rounded-md shadow-2xs leading-snug max-w-xs">
          🔒 Messages are secured with end-to-end encryption. Direct WhatsApp merchant channel.
        </div>
      </div>

      {/* Message Stream */}
      <div className="flex-1 overflow-y-auto px-3 py-2 space-y-2.5">
        {messages.map((m) => {
          const isMe = m.sender === 'customer';
          return (
            <div
              key={m.id}
              className={`flex ${isMe ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[85%] rounded-lg p-2.5 shadow-2xs relative text-xs leading-relaxed whitespace-pre-wrap ${
                  isMe
                    ? 'bg-[#d9fdd3] text-[#111b21] rounded-tr-none'
                    : 'bg-white text-[#111b21] rounded-tl-none'
                }`}
              >
                {m.isOrderCard && (
                  <div className="mb-1.5 pb-1.5 border-b border-[#00000014] text-[10px] font-bold text-[#128c7e] uppercase tracking-wider flex items-center gap-1">
                    <Sparkles className="w-3 h-3" />
                    <span>Dokan Direct WhatsApp Order</span>
                  </div>
                )}

                <div className="text-[12px]">{m.text}</div>

                <div className="flex items-center justify-end gap-1 mt-1 text-[10px] text-[#667781]">
                  <span>{m.time}</span>
                  {isMe && <CheckCheck className="w-3.5 h-3.5 text-[#53bdeb]" />}
                </div>
              </div>
            </div>
          );
        })}

        {isTyping && (
          <div className="flex justify-start">
            <div className="bg-white rounded-lg p-2 px-3 shadow-2xs text-xs text-[#667781] flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 bg-[#667781] rounded-full animate-bounce" />
              <span className="w-1.5 h-1.5 bg-[#667781] rounded-full animate-bounce [animation-delay:0.2s]" />
              <span className="w-1.5 h-1.5 bg-[#667781] rounded-full animate-bounce [animation-delay:0.4s]" />
              <span className="text-[11px] ml-1">Merchant typing...</span>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Suggested Quick Replies */}
      <div className="px-3 py-1.5 flex items-center gap-1.5 overflow-x-auto no-scrollbar shrink-0 bg-[#efeae2]">
        <button
          onClick={() => handleSendMessage('Can I confirm my delivery inside Dhaka?')}
          className="px-2.5 py-1 bg-white hover:bg-[#f2f4f6] border border-[#cbd5e1] rounded-full text-[11px] font-medium text-[#111b21] whitespace-nowrap shadow-2xs shrink-0"
        >
          📍 Dhaka Delivery Time?
        </button>
        <button
          onClick={() => handleSendMessage('Is Cash on Delivery (COD) available?')}
          className="px-2.5 py-1 bg-white hover:bg-[#f2f4f6] border border-[#cbd5e1] rounded-full text-[11px] font-medium text-[#111b21] whitespace-nowrap shadow-2xs shrink-0"
        >
          💵 Cash on Delivery?
        </button>
        <button
          onClick={() => handleSendMessage('Can I pay via bKash?')}
          className="px-2.5 py-1 bg-white hover:bg-[#f2f4f6] border border-[#cbd5e1] rounded-full text-[11px] font-medium text-[#111b21] whitespace-nowrap shadow-2xs shrink-0"
        >
          💳 bKash Payment?
        </button>
      </div>

      {/* Input bar */}
      <div className="bg-[#f0f2f5] p-2 flex items-end gap-1.5 border-t border-[#d1d7db] shrink-0">
        <button
          type="button"
          onClick={handleLaunchExternalWhatsApp}
          className="p-2 text-[#54656f] hover:text-[#111b21] transition-colors"
          title="Open in WhatsApp"
        >
          <WhatsAppIcon className="w-5 h-5 text-[#25d366]" />
        </button>

        <textarea
          rows={1}
          value={inputVal}
          onChange={(e) => setInputVal(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault();
              handleSendMessage();
            }
          }}
          placeholder="Type a message or delivery address..."
          className="flex-1 bg-white border-none rounded-2xl py-2 px-3 text-xs text-[#111b21] placeholder-[#8696a0] focus:outline-none max-h-24 resize-none shadow-2xs"
        />

        <button
          onClick={() => handleSendMessage()}
          className="p-2.5 rounded-full bg-[#128c7e] hover:bg-[#0e665c] text-white flex items-center justify-center transition-colors shrink-0 shadow-xs"
        >
          <Send className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
