import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Bot, User } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from './ui/card';

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      type: 'bot',
      text: "Hello! I'm your TIU Financial Planning Assistant. I can help you navigate this tool and answer questions about:\n\n- Cost calculations for studying in Japan\n- Income simulation and work hour limits\n- Scholarship opportunities\n- Budget optimization tips\n\nHow can I help you today?"
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const quickReplies = [
    { text: 'How do I calculate costs?', value: 'calculate-costs' },
    { text: 'Tell me about scholarships', value: 'scholarships' },
    { text: 'Work hour limits', value: 'work-hours' },
    { text: 'Get recommendations', value: 'recommendations' }
  ];

  const getBotResponse = (userMessage) => {
    const lowerMessage = userMessage.toLowerCase();

    if (lowerMessage.includes('cost') || lowerMessage.includes('calculate') || lowerMessage.includes('expense') || lowerMessage.includes('tuition')) {
      return "To calculate your 4-year costs:\n\n1. Go to the **Cost Calculator** page\n2. Enter your expected tuition, housing type, and living expenses\n3. The tool will factor in inflation and show year-by-year projections\n\nTIP: Include all expenses like health insurance, transportation, and study materials for accurate planning!";
    }

    if (lowerMessage.includes('scholarship') || lowerMessage.includes('financial aid')) {
      return "The **Scholarship Analyzer** helps you compare different scenarios:\n\n- 30% scholarship coverage\n- 50% scholarship coverage\n- 80% scholarship coverage\n- 100% full scholarship\n\nIt shows how each level affects your total 4-year cost and required self-funding. Check the Scholarship Impact page to see detailed comparisons!";
    }

    if (lowerMessage.includes('work') || lowerMessage.includes('hour') || lowerMessage.includes('job') || lowerMessage.includes('income') || lowerMessage.includes('part-time')) {
      return "Important work regulations for international students in Japan:\n\n- **Academic semester:** Maximum 28 hours/week\n- **Long vacations:** Up to 40 hours/week allowed\n- Average hourly wage: ~1,050\n\nUse the **Income Simulator** to model realistic earnings while staying compliant with visa requirements!";
    }

    if (lowerMessage.includes('recommend') || lowerMessage.includes('optimize') || lowerMessage.includes('advice') || lowerMessage.includes('tips')) {
      return "The **Optimization Engine** provides smart recommendations:\n\n- Housing optimization (dorm vs. apartment trade-offs)\n- Work-hour scheduling to maximize income safely\n- Budget adjustments based on scholarship levels\n- Deficit prevention strategies\n\nIt uses rule-based analysis to give you actionable suggestions based on your specific situation!";
    }

    if (lowerMessage.includes('hello') || lowerMessage.includes('hi') || lowerMessage.includes('hey')) {
      return "Hello! Welcome to the TIU Financial Planning Tool. I can help you understand how to use the different features. What would you like to know about?";
    }

    if (lowerMessage.includes('thank')) {
      return "You're welcome! Feel free to ask if you have any more questions about financial planning for your studies in Japan. Good luck with your planning!";
    }

    if (lowerMessage.includes('methodology') || lowerMessage.includes('how does') || lowerMessage.includes('how it work')) {
      return "Our methodology is based on:\n\n- Real TIU tuition and fee data\n- Official Japanese immigration work regulations\n- Current Tokyo living cost estimates\n- Standard inflation assumptions\n\nVisit the **Methodology** page for detailed explanations of all calculations and data sources used!";
    }

    if (lowerMessage.includes('future') || lowerMessage.includes('roadmap') || lowerMessage.includes('plan')) {
      return "Check out the **Future Scope** page to see planned features including:\n\n- Currency conversion tools\n- More university comparisons\n- Interactive scenario planning\n- Mobile app development\n\nWe're continuously improving to help students better!";
    }

    return "I can help you with:\n\n- **Cost Calculator:** Estimate 4-year expenses\n- **Income Simulator:** Model part-time earnings\n- **Scholarship Analyzer:** Compare scholarship scenarios\n- **Optimization Engine:** Get personalized recommendations\n\nWhat would you like to learn more about?";
  };

  const handleSend = () => {
    if (!inputValue.trim()) return;

    const userMessage = inputValue.trim();
    setMessages(prev => [...prev, { type: 'user', text: userMessage }]);
    setInputValue('');
    setIsTyping(true);

    setTimeout(() => {
      const botResponse = getBotResponse(userMessage);
      setMessages(prev => [...prev, { type: 'bot', text: botResponse }]);
      setIsTyping(false);
    }, 800);
  };

  const handleQuickReply = (reply) => {
    setMessages(prev => [...prev, { type: 'user', text: reply.text }]);
    setIsTyping(true);

    setTimeout(() => {
      const botResponse = getBotResponse(reply.text);
      setMessages(prev => [...prev, { type: 'bot', text: botResponse }]);
      setIsTyping(false);
    }, 800);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <>
      {/* Chat Button */}
      <button
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-blue-600 hover:bg-blue-700 text-white shadow-lg flex items-center justify-center transition-all duration-300 ${isOpen ? 'scale-0' : 'scale-100'}`}
        aria-label="Open chat support"
      >
        <MessageCircle className="w-6 h-6" />
      </button>

      {/* Chat Window */}
      {isOpen && (
        <Card className="fixed bottom-6 right-6 z-50 w-96 h-[500px] flex flex-col shadow-2xl border-0">
          <CardHeader className="bg-blue-600 text-white rounded-t-xl py-4 px-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                  <Bot className="w-5 h-5" />
                </div>
                <div>
                  <CardTitle className="text-lg font-semibold text-white">Support Assistant</CardTitle>
                  <p className="text-blue-100 text-xs">Ask me anything about TIU planning</p>
                </div>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsOpen(false)}
                className="text-white hover:bg-white/20 rounded-full h-8 w-8"
              >
                <X className="w-5 h-5" />
              </Button>
            </div>
          </CardHeader>

          <CardContent className="flex-1 overflow-y-auto p-4 bg-gray-50 space-y-4">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`flex gap-2 max-w-[85%] ${message.type === 'user' ? 'flex-row-reverse' : 'flex-row'}`}
                >
                  <div
                    className={`w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 ${
                      message.type === 'user' ? 'bg-blue-600' : 'bg-gray-300'
                    }`}
                  >
                    {message.type === 'user' ? (
                      <User className="w-4 h-4 text-white" />
                    ) : (
                      <Bot className="w-4 h-4 text-gray-600" />
                    )}
                  </div>
                  <div
                    className={`rounded-2xl px-4 py-2.5 text-sm whitespace-pre-wrap ${
                      message.type === 'user'
                        ? 'bg-blue-600 text-white rounded-tr-md'
                        : 'bg-white text-gray-800 shadow-sm rounded-tl-md'
                    }`}
                  >
                    {message.text}
                  </div>
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex justify-start">
                <div className="flex gap-2 max-w-[85%]">
                  <div className="w-7 h-7 rounded-full bg-gray-300 flex items-center justify-center flex-shrink-0">
                    <Bot className="w-4 h-4 text-gray-600" />
                  </div>
                  <div className="bg-white rounded-2xl rounded-tl-md px-4 py-3 shadow-sm">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </CardContent>

          {/* Quick Replies */}
          {messages.length === 1 && (
            <div className="px-4 py-2 bg-gray-50 border-t flex flex-wrap gap-2">
              {quickReplies.map((reply, index) => (
                <button
                  key={index}
                  onClick={() => handleQuickReply(reply)}
                  className="text-xs px-3 py-1.5 bg-white border border-blue-200 text-blue-600 rounded-full hover:bg-blue-50 transition-colors"
                >
                  {reply.text}
                </button>
              ))}
            </div>
          )}

          <CardFooter className="p-4 border-t bg-white rounded-b-xl">
            <div className="flex w-full gap-2">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type your question..."
                className="flex-1 px-4 py-2 border border-gray-200 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <Button
                onClick={handleSend}
                disabled={!inputValue.trim()}
                className="rounded-full w-10 h-10 p-0 bg-blue-600 hover:bg-blue-700"
              >
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </CardFooter>
        </Card>
      )}
    </>
  );
};

export default ChatBot;
