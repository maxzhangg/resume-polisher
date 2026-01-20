import React, { useState, useRef } from 'react';
import { Copy, Check, FileText, Sparkles, AlertCircle } from 'lucide-react';
import { PROMPT_INSTRUCTIONS, MASTER_RESUME_LATEX } from '../constants';

const PromptGenerator: React.FC = () => {
  const [jd, setJd] = useState('');
  const [requirements, setRequirements] = useState('');
  const [generatedPrompt, setGeneratedPrompt] = useState<string | null>(null);
  const [isCopied, setIsCopied] = useState(false);
  const resultRef = useRef<HTMLDivElement>(null);

  const handleGenerate = () => {
    if (!jd.trim()) return;

    // Construct the final prompt using the templates
    // We strictly follow the structure requested by the prompt engineering instructions
    const finalOutput = `
${PROMPT_INSTRUCTIONS}

# Input Data
1. **Target JD**:
"""
${jd}
"""

2. **User Requirements** (Extra instructions from me):
"""
${requirements ? requirements : "No additional specific requirements. Please follow the core mission."}
"""

3. **Master Resume Code**:
"""
${MASTER_RESUME_LATEX}
"""

# Output
请在一个代码块中输出**修改后的、完整的、可编译的** LaTeX 源代码。########################################%以下是我的简历母版 告诉我需要改什么删什么 如何让简历贴近jd 不许编我没做过的 不可以对latex格式进行任何改动 需要缩到一页 告诉我改完是什么样子 最后给我改完的latex代码
%###########################################
    `.trim();

    setGeneratedPrompt(finalOutput);

    // Scroll to result after a short delay to allow rendering
    setTimeout(() => {
        resultRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
  };

  const copyToClipboard = async () => {
    if (!generatedPrompt) return;
    try {
      await navigator.clipboard.writeText(generatedPrompt);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy!', err);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-20">
      
      {/* Intro Section */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 md:p-8">
        <h2 className="text-xl font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <FileText className="w-5 h-5 text-indigo-600" />
          Configuration
        </h2>
        <div className="space-y-6">
          
          {/* JD Input */}
          <div className="space-y-2">
            <label htmlFor="jd" className="block text-sm font-medium text-slate-700">
              Target Job Description (JD) <span className="text-red-500">*</span>
            </label>
            <div className="relative group">
                <textarea
                id="jd"
                value={jd}
                onChange={(e) => setJd(e.target.value)}
                placeholder="Paste the full job description here..."
                className="w-full h-48 p-4 text-sm text-slate-700 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all resize-y placeholder:text-slate-400 group-hover:bg-white"
                />
            </div>
            <p className="text-xs text-slate-400 text-right">
                {jd.length} characters
            </p>
          </div>

          {/* Requirements Input */}
          <div className="space-y-2">
            <label htmlFor="requirements" className="block text-sm font-medium text-slate-700">
              Personal Requirements (Optional)
            </label>
            <textarea
              id="requirements"
              value={requirements}
              onChange={(e) => setRequirements(e.target.value)}
              placeholder="e.g. Focus on my React experience, or emphasize my leadership in the Nokia project..."
              className="w-full h-24 p-4 text-sm text-slate-700 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all resize-y placeholder:text-slate-400 hover:bg-white"
            />
          </div>
        </div>

        {/* Action Button */}
        <div className="mt-8 flex justify-end">
            <button
                onClick={handleGenerate}
                disabled={!jd.trim()}
                className={`
                    relative overflow-hidden group flex items-center gap-2 px-8 py-3 rounded-full font-semibold text-white shadow-lg transition-all duration-300
                    ${!jd.trim() 
                        ? 'bg-slate-300 cursor-not-allowed opacity-70' 
                        : 'bg-indigo-600 hover:bg-indigo-700 hover:shadow-indigo-500/30 hover:-translate-y-0.5 active:translate-y-0'
                    }
                `}
            >
                <Sparkles className={`w-5 h-5 ${jd.trim() ? 'group-hover:animate-spin-slow' : ''}`} />
                <span>Generate Prompt</span>
            </button>
        </div>
      </div>

      {/* Output Section */}
      {generatedPrompt && (
        <div ref={resultRef} className="animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="bg-slate-900 rounded-2xl shadow-xl border border-slate-800 overflow-hidden">
            
            {/* Toolbar */}
            <div className="flex items-center justify-between px-6 py-4 bg-slate-950 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
                </div>
                <span className="ml-3 text-sm font-mono text-slate-400">generated_prompt.txt</span>
              </div>
              <button
                onClick={copyToClipboard}
                className={`
                  flex items-center gap-2 px-4 py-1.5 rounded-lg text-xs font-medium transition-all duration-200
                  ${isCopied 
                    ? 'bg-green-500/10 text-green-400 border border-green-500/20' 
                    : 'bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 hover:bg-indigo-500/20'
                  }
                `}
              >
                {isCopied ? (
                  <>
                    <Check className="w-3.5 h-3.5" />
                    Copied!
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    Copy All
                  </>
                )}
              </button>
            </div>

            {/* Content Preview */}
            <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-b from-slate-900/50 to-transparent pointer-events-none" />
                <textarea
                    readOnly
                    value={generatedPrompt}
                    className="w-full h-96 p-6 text-sm font-mono leading-relaxed text-slate-300 bg-slate-900 focus:outline-none resize-none"
                    spellCheck={false}
                />
                 {/* Gradient Fade at bottom to suggest scrolling/copying */}
                 <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-slate-900 to-transparent pointer-events-none"></div>
            </div>
            
            {/* Instruction Footer */}
            <div className="bg-slate-950 px-6 py-4 border-t border-slate-800">
                <div className="flex items-start gap-3 text-sm text-slate-400">
                    <AlertCircle className="w-5 h-5 text-indigo-400 shrink-0 mt-0.5" />
                    <p>
                        <span className="text-slate-200 font-medium">Next Step:</span> Copy this entire block and paste it into <span className="text-white">ChatGPT (o1/4o)</span>, <span className="text-white">DeepSeek</span>, or <span className="text-white">Gemini 1.5 Pro</span>. The model will output the refined LaTeX code for your resume.
                    </p>
                </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PromptGenerator;
