// We use String.raw to ensure LaTeX backslashes are treated as literals and not escape characters.

export const PROMPT_INSTRUCTIONS = String.raw`# Role
你是一位**拥有技术背景的资深招聘官 (Technical Recruiter)**，同时也是一位**LaTeX 代码排版专家**。

# Context
输入：
1. **Target JD** (目标职位描述)。
2. **User Requirements** (求职者的额外要求)。
3. **Master Resume Code** (包含我所有经历的 LaTeX 源代码，这是唯一的“事实数据库”)。

你的任务是利用你的招聘经验，为我生成两份文件：
1. 一份**针对该职位**的 1 页简历（Resume）。
2. 一份配套的求职信（Cover Letter）。

---

# 🚀 PART A: Resume Optimization (简历优化)

## 1. 布局策略 (Layout Strategy) -> "Perfect Fit"
- **目标**: 输出内容必须**完美填充 1 页 A4 纸**。
- **实习经历 (Internship)**: 【🚫绝对禁止修改】保留所有实习经历的代码块（包括标题、时间、描述），**一字不改**。
- **教育经历 (Education)**: 【🚫绝对禁止修改】保留学校、学位、时间等信息，不要删减。
- **项目经历 (Projects)**: 【🎯锁定 3 个】
  - 根据 JD 的核心需求，挑选出 **3 个** 最相关的项目。
  - **其余项目全部删除**。

## 2. 内容优化 (Content Optimization) -> "Description Only"
你对选中的 3 个项目拥有“部分编辑权”，请严格遵守以下红线：
- **❌ 禁止修改 (DO NOT TOUCH):**
  - **项目名称 (Project Title)**: 必须保持原样。
  - **项目时间/链接**: 必须保持原样。
  - **技术栈列表**: 如果项目标题旁有列出具体的 Tech Stack，尽量保持原样，除非为了省空间需要微调。
- **✅ 允许优化 (OPTIMIZE THIS):**
  - 仅限 **\`\resumeItem{...}\` 内部的描述性文字**。
  - **关键词对齐**: 将描述中的动词和名词向 JD 靠拢。
  - **精准修辞**: 使用强有力的动词开头（Developed, Architected, Spearheaded）。
  - **拒绝瞎编**: 优化表达，但严禁捏造事实。

## 3. 代码安全 (Code Safety)
- **容器保护**: 严禁修改 LaTeX 的结构命令。
- **符号转义**: 检查 \`&\`, \`%\`, \`_\`, \`$\`, \`#\`，必须加反斜杠转义（如 \`\&\`）。
- **编译检查**: 确保花括号 \`{}\` 闭合。

## 4. 空间微调 (Space Management)
- 如果 **实习 + 3个项目** 导致内容略微超出一页：
  1. **精简 Skills 部分**: 仅保留与 JD 高度相关的技能关键词，删除次要技能。
  2. **精简项目描述**: 在不减少项目数量（保持3个）的前提下，缩短 \`\resumeItem\` 的句子长度。

---

# ✉️ PART B: Cover Letter Generation (求职信生成)

请根据 JD 和 简历，撰写一封求职信，并**严格套用**以下的 Deedy 模板格式输出。

## 1. Deedy 模板规范 (Template Rules)
- **头部 (Header)**: 保持与 Resume 一致的 \`\namesection{Max}{Zhang}{...}\` 信息。
- **公司信息**: 
  - 找到 \`\companyname{...}\`，填入 JD 中的公司名称。
  - 找到 \`\companyaddress{...}\`，填入 JD 中的地址/Hiring Team。
  - 找到 \`\currentdate{...}\`，填入 \`\today\`。
- **正文格式**: 
  - **必须**使用 \`\lettercontent{...}\` 包裹每一段落。
  - 例如：\`\lettercontent{First paragraph text...}\`。
  - **不要**使用普通文本段落，否则格式会错乱。

## 2. 内容撰写策略 (Content Strategy)
- **真实性原则**: 只能引用 Resume 中的经历。**严禁瞎编**我没做过的技能或数据。
- **第一段**: 明确提及申请的职位名称（从 JD 获取）和公司名称。
- **中间段**: 挑选 Resume 中 **最匹配 JD 的 2 个亮点**（项目或实习）进行展开。解释这些经历如何让我胜任该职位。
- **结尾**: 表达对面试的期待。

## 3. Cover Letter 代码骨架 (Skeleton)
请基于此结构填充内容：
\`\`\`latex
\documentclass[]{cover}
\usepackage{fancyhdr}
\pagestyle{fancy}
\fancyhf{}
\rfoot{Page \thepage \hspace{1pt}}
\thispagestyle{empty}
\renewcommand{\headrulewidth}{0pt}
\begin{document}
\enlargethispage{3\baselineskip}

% 保持个人信息与简历一致
\namesection{Max}{Zhang}{ [保留简历中的链接和邮箱信息] }

\hfill

\begin{minipage}[t]{0.5\textwidth} 
\companyname{[AI: 填入公司名]}
\companyaddress{[AI: 填入地址]}
\end{minipage}
\begin{minipage}[t]{0.49\textwidth} 
\currentdate{\today}
\end{minipage}

\lettercontent{Dear Hiring Manager,}

\lettercontent{[AI: 第一段 - 申请职位与热情]}
\lettercontent{[AI: 第二段 - 核心匹配经历1]}
\lettercontent{[AI: 第三段 - 核心匹配经历2]}
\lettercontent{[AI: 结尾段 - 期待面试]}

\vspace{0.2cm}
\closing{Sincerely,\\ \vspace{.1cm} Max Zhang }
\end{document}
\`\`\``;

export const MASTER_RESUME_LATEX = String.raw`%以下是我的简历母版 告诉我需要改什么删什么 如何让简历贴近jd 不许编我没做过的 不可以对latex格式进行任何改动 需要缩到一页 告诉我改完是什么样子 最后给我改完的latex代码
%###########################################


%-------------------------
% Resume in Latex
% Author
% License : MIT
%------------------------

%---- Required Packages and Functions ----

\documentclass[a4paper,11pt]{article}
\usepackage{latexsym}
\usepackage{pdfpages}
\usepackage{xcolor}
\usepackage{float}
\usepackage{ragged2e}
\usepackage[empty]{fullpage}
\usepackage{wrapfig}
\usepackage{lipsum}
\usepackage{tabularx}
\usepackage{titlesec}
\usepackage{geometry}
\usepackage{marvosym}
\usepackage{verbatim}
\usepackage{enumitem}
\usepackage[hidelinks]{hyperref}
\usepackage{fancyhdr}
\usepackage{fontawesome5}
\usepackage{multicol}
\usepackage{graphicx}
\usepackage{cfr-lm}
\usepackage[T1]{fontenc}
\setlength{\multicolsep}{0pt} 
\pagestyle{fancy}
\fancyhf{} % clear all header and footer fields
\fancyfoot{}
\renewcommand{\headrulewidth}{0pt}
\renewcommand{\footrulewidth}{0pt}
\geometry{left=1.4cm, top=0.8cm, right=1.2cm, bottom=1cm}
% Adjust margins
%\addtolength{\oddsidemargin}{-0.5in}
%\addtolength{\evensidemargin}{-0.5in}
%\addtolength{\textwidth}{1in}
\usepackage[most]{tcolorbox}
\tcbset{
	frame code={}
	center title,
	left=0pt,
	right=0pt,
	top=0pt,
	bottom=0pt,
	colback=gray!20,
	colframe=white,
	width=\dimexpr\textwidth\relax,
	enlarge left by=-2mm,
	boxsep=4pt,
	arc=0pt,outer arc=0pt,
}

\urlstyle{same}

\raggedright
\setlength{\tabcolsep}{0in}

% Sections formatting
\titleformat{\section}{
  \vspace{-4pt}\scshape\raggedright\large
}{}{0em}{}[\color{black}\titlerule \vspace{-7pt}]

%-------------------------
% Custom commands
\newcommand{\resumeItem}[2]{
  \item{
    \textbf{#1}{\hspace{0.5mm}#2 \vspace{-0.5mm}}
  }
}

\newcommand{\resumePOR}[3]{
\vspace{0.5mm}\item
    \begin{tabular*}{0.97\textwidth}[t]{l@{\extracolsep{\fill}}r}
        \textbf{#1}\hspace{0.3mm}#2 & \textit{\small{#3}} 
    \end{tabular*}
    \vspace{-2mm}
}

\newcommand{\resumeSubheading}[4]{
\vspace{0.5mm}\item
    \begin{tabular*}{0.98\textwidth}[t]{l@{\extracolsep{\fill}}r}
        \textbf{#1} & \textit{\footnotesize{#4}} \\
        \textit{\footnotesize{#3}} &  \footnotesize{#2}\\
    \end{tabular*}
    \vspace{-2.4mm}
}

\newcommand{\resumeProject}[4]{
\vspace{0.5mm}\item
    \begin{tabular*}{0.98\textwidth}[t]{l@{\extracolsep{\fill}}r}
        \textbf{#1} & \textit{\footnotesize{#3}} \\
        \footnotesize{\textit{#2}} & \footnotesize{#4}
    \end{tabular*}
    \vspace{-2.4mm}
}

\newcommand{\resumeSubItem}[2]{\resumeItem{#1}{#2}\vspace{-4pt}}
% \renewcommand{\labelitemii}{$\circ$}
\renewcommand{\labelitemi}{$\vcenter{\hbox{\tiny$\bullet$}}$}
\newcommand{\resumeSubHeadingListStart}{\begin{itemize}[leftmargin=*,labelsep=0mm]}
\newcommand{\resumeHeadingSkillStart}{\begin{itemize}[leftmargin=*,itemsep=1.7mm, rightmargin=2ex]}
\newcommand{\resumeItemListStart}{\begin{justify}\begin{itemize}[leftmargin=3ex, rightmargin=2ex, noitemsep,labelsep=1.2mm,itemsep=0mm]\small}
\newcommand{\resumeSubHeadingListEnd}{\end{itemize}\vspace{2mm}}
\newcommand{\resumeHeadingSkillEnd}{\end{itemize}\vspace{-2mm}}
\newcommand{\resumeItemListEnd}{\end{itemize}\end{justify}\vspace{-2mm}}
\newcommand{\cvsection}[1]{%
\vspace{2mm}
\begin{tcolorbox}
    \textbf{\large #1}
\end{tcolorbox}
    \vspace{-4mm}
}
\newcolumntype{L}{>{\raggedright\arraybackslash}X}%
\newcolumntype{R}{>{\raggedleft\arraybackslash}X}%
\newcolumntype{C}{>{\centering\arraybackslash}X}%
%---- End of Packages and Functions ------

%-------------------------------------------
%%%%%%  CV STARTS HERE  %%%%%%%%%%%
%%%%%% DEFINE ELEMENTS HERE %%%%%%%
\newcommand{\name}{Max Zhang} % Your Name
\newcommand{\course}{Computer Science and Engineering} % Your Program
%\newcommand{\roll}{xxxxxxx} % Your Roll No.
%\newcommand{\phone}{3433681577} % Your Phone Number
\newcommand{\emaila}{maxzhangggg@gmail.com} %Email 1

\begin{document}
\fontfamily{cmr}\selectfont
%----------HEADING-----------------

{
\begin{tabularx}{\linewidth}{L r} \\
  \textbf{\Large \name} & \href{mailto:\emaila}{\raisebox{0.0\height}{\footnotesize \faEnvelope}\ {Email}}\\
  {(She/Her) } &  \href{https://maxzhangg.github.io/portfolio/\#/resume}{\raisebox{0.0\height}{\footnotesize \faHome}\ {Portfolio}}\\
  Master of Engineering & \href{https://github.com/maxzhangg}{\raisebox{0.0\height}{\footnotesize \faGithub}\ {GitHub}} \\  
  {University of Ottawa Ottawa, ON} & \href{https://www.linkedin.com/in/maxzhang0/}{\raisebox{0.0\height}{\footnotesize \faLinkedin}\ {LinkedIn}}
\end{tabularx}
}
\vspace{-4mm}
%-----------Technical skills-----------------
\section{\textbf{Technical Skills}}
\begin{itemize}[leftmargin=0.05in, label={}]
\small{\item{

\textbf{Programming \& Scripting}{: 
Python (automation, scripting, data processing, ML), 
Java (test scripting, JUnit), 
TCL (network/device test scripting), 
JavaScript (ES6+), 
TypeScript, 
BASH, 
SQL (basic), 
MATLAB (numerical analysis, simulation), 
HTML, 
CSS, 
XML} \\

\textbf{Software Testing \& QA}{: 
Test Planning, 
Test Case Design, 
Regression Testing, 
System Testing, 
Functional Testing, 
Automation Testing, 
Combinatorial Testing (ACTS), 
Metamorphic Testing, 
Mutation Testing (PIT), 
CI/CD Testing, 
Defect Tracking} \\

\textbf{Testing Frameworks \& Tools}{: 
PyTest, 
JUnit 4, 
Selenium, 
Appium, 
ACTS, 
Z3 Solver, 
METtester, 
Postman, 
JIRA} \\

\textbf{Networking \& Optical Systems}{: 
Optical Networks, 
Optical Transceivers, 
Ethernet, 
TCP/IP, 
Traffic Generation (Ixia), 
BER Analysis, 
Link Budget Analysis} \\

\textbf{Power Systems \& Control}{: 
Circuit Analysis, 
Power System Analysis, 
Automatic Control Fundamentals, 
Power Electronics Basics, 
Relay Protection Principles, 
Power System Automation} \\

\textbf{Machine Learning \& Data Science}{: 
Scikit-learn, 
XGBoost, 
Keras, 
Pandas, 
NumPy, 
Matplotlib, 
Feature Engineering (basic), 
Data Visualization} \\

\textbf{Frontend \& Web Development}{: 
React, 
Vite, 
Tailwind CSS, 
Responsive Design, 
Markdown Rendering, 
Frontend-only Deployment (GitHub Pages)} \\

\textbf{AI \& Generative Systems}{: 
Prompt Engineering, 
LLM-based Reasoning Pipelines, 
Google Gemini API, 
AI-assisted Testing, 
AI-driven Data Interpretation} \\

\textbf{Engineering \& Simulation Software}{: 
SolidWorks, 
MATLAB Simulink, 
CAD Tools, 
Proteus, 
Matpower} \\

\textbf{Platforms \& Dev Tools}{: 
Linux, 
Windows 10/11, 
Git, 
GitHub, 
Google Cloud (basic), 
Office 365, 
LaTeX (Overleaf, MiKTeX)} \\

\textbf{Lab Equipment}{: 
BERT, 
Optical Spectrum Analyzer (OSA), 
Oscilloscope, 
Function Generator, 
Multimeter, 
Fiber Inspection and Cleaning Tools} \\

\textbf{Soft Skills}{: 
Analytical Thinking, 
Problem Solving, 
Debugging \& Troubleshooting, 
Technical Documentation, 
Cross-team Communication, 
Rapid Learning, 
Attention to Detail} \\

}}
\end{itemize}




 \vspace{-20pt}

%-----------EDUCATION-----------
\section{\textbf{Education}}
  \resumeSubHeadingListStart
    \resumeSubheading
      {Master of Engineering in Electrical and Computer Engineering}{GPA:9.22/10}
      {University of Ottawa}{2023-2025}
    \resumeSubheading
      {Bachelor of Engineering in Electrical Engineering and Automation}{GPA:87.2/100}
      {Northeast Electric Power University}{2019-2023}
  \resumeSubHeadingListEnd
\vspace{-5.5mm}
%


%-----------EXPERIENCE-----------------
\section{\textbf{Experience}}
  \resumeSubHeadingListStart
  \resumeSubheading
      {Night-time Technical Support}{Remote}
      {\href{https://github.com/CasualHackathon/SPARK-AI-Hackathon}{SPARK AI Hackathon}}{Jan 2026 - Feb 2026}
      \vspace{-2.0mm}
      \resumeItemListStart
        \item Debugged and fixed issues in the automated registration script to ensure smooth participant onboarding
        \item Assisted participants in resolving problems encountered during registration and project submission workflows
        \item Provided timely technical support to unblock participants under tight hackathon timelines
      \resumeItemListEnd
      \vspace{-3mm}
    \resumeSubheading
      {Service Router Test Platform Dev Student}{Ottawa}
      {\href{https://www.nokia.com/}{Nokia}}{Apr 2024 - Dec 2024}
      \vspace{-2.0mm}
      \resumeItemListStart
    \item Assisted Ethernet and Optical teams to validate new hardware and software in a Linux-based regression environment on the Service Router platform.
    \item Developed and executed \textbf{3} test cases for optical transceivers and Media Dependent Adapters as part of feature validation.
    \item Conducted \textbf{1,078} regression tests on \textbf{QSFP28 - 4x25G/100G PSM4 Optical Transceiver}, ensuring reliability and compliance.
    \item Identified and reported \textbf{7} critical embedded software bugs, enhancing system stability.
    \item Verified \textbf{8} bug fixes across \textbf{3} embedded software images.
    \item Optimized GASH code by fixing bugs and improving functionality, streamlining testing workflows.
    \resumeItemListEnd
    
  %  \vspace{-3.0mm}
\vspace{-4mm}





%-----------PROJECTS-----------------
\section{\textbf{Projects}}
\vspace{-2mm}
\resumeSubHeadingListStart
\resumeProject
  {\href{https://github.com/maxzhangg/Oracle-s-Choice}{Oracle's Choice: SpoonOS Graph Agent–Powered Dual-Mode Oracle Application}} 
  {Designed an explainable AI agent system supporting empathetic chat and deterministic divination workflows.}
  {2026.01}
  {} 
\resumeItemListStart
\item Architected a \textbf{SpoonOS Graph Agent} workflow (\textit{parse → route → divination → narration → persist}) to support \textbf{dual interaction modes}, enabling seamless switching between contextual chat and forced divination.
\item Designed \textbf{LLM-driven intent parsing and routing logic} to classify user intent, domain, and tone, dynamically selecting tools (chat, tarot, lenormand, liuyao) with \textbf{rule-based fallbacks} for robustness.
\item Implemented \textbf{deterministic local divination engines} using session-scoped seeds, ensuring reproducible readings while decoupling symbolic logic from LLM generation.
\item Engineered a \textbf{multi-provider LLM fallback mechanism} (Gemini → OpenAI), abstracting model access through a unified client to improve reliability under rate limits.
\item Designed \textbf{transparent agent trace schemas} and persistence logic, exposing the full \textbf{Input → Processing → Output} decision path to the frontend for explainability and user trust.
\item Translated product goals around emotional support and ritual-based interaction into concrete \textbf{technical requirements and agent behaviors}, aligning UX intent with system feasibility.
\resumeItemListEnd
\vspace{-1mm}

\resumeProject
  {\href{https://aistudio.google.com/apps/drive/1qK1Q2xgsjRjdyWyPRFvbSJ1XNgf4iD1I}{WeOrganizer: AI-Driven B2B Content Aggregation Platform (Architecture \& Design)}} 
  {Architected a SaaS solution for automated market intelligence extraction and analysis.}
  {2026.01}
  {} 
\resumeItemListStart
\item Designed a \textbf{dual-model AI architecture} utilizing \textbf{NLP} for structural keyword extraction and \textbf{Supervised Learning} to predict client-article relevance based on historical interaction data.
\item Defined technical specifications and \textbf{JSON data schemas} to ensure seamless data flow between the crawler, analysis engine, and frontend dashboard.
\item Engineered \textbf{system logic} for the "Smart Push" feature, designing \textbf{LLM prompt engineering} strategies to transform structured data into context-aware business insights.
\item Translated complex algorithmic concepts into actionable \textbf{technical requirements (PRD)}, bridging the gap between business needs and machine learning feasibility.
\resumeItemListEnd
\vspace{-1mm}
\resumeProject
  {\href{https://maxzhangg.github.io/relationship-k-line/}{Relationship K-Line (AI-Powered Data Visualization Web App)}}
  {Developed a bilingual React-based web app with AI integration and interactive charts.}
  {2025.01}

\resumeItemListStart
\item Built a \textbf{frontend-only React application} using \textbf{React 19, TypeScript, Vite, and Tailwind CSS}; deployed via \textbf{GitHub Pages} for remote access.
\item Implemented full \textbf{English / Simplified Chinese localization} with automatic browser language detection, supporting multilingual AI outputs.
\item Designed a structured \textbf{AI prompt pipeline} and integrated \textbf{Google Gemini API} to generate year-by-year analytical results in JSON format for frontend rendering.
\item Transformed AI-generated data into \textbf{interactive visual dashboards} using \textbf{Recharts}, including candlestick charts, dual trend lines, and radar charts.
\item Processed user input data (date, time, location) entirely on the client side and converted it into normalized feature sets for AI inference.
\resumeItemListEnd
\vspace{-1mm}
\resumeProject
  {\href{https://maxzhangg.github.io/tarot/}{Tarot Drawing Website with AI Reading}} % Project Name
  {Developed an interactive Tarot reading website using React and DeepSeek-powered chatbot.} % Project Description
  {2025.07} % Event Dates

  \resumeItemListStart
    \item Built a responsive web app with \textbf{React},\textbf{ Tailwind CSS}, and \textbf{GitHub Pages}; implemented deterministic card drawing via \textbf{SHA-256} and a 156-card \textbf{JSON} dataset.
    \item Enabled multi-turn tarot chat using \textbf{DeepSeek API} with Markdown rendering; ensured static hosting compatibility via \textbf{React HashRouter}.
  \resumeItemListEnd
  \vspace{-1mm}

    \resumeProject
  {\href{https://maxzhangg.github.io/Style-Max-Demo/}{Style Max - Fashion Recommendation Platform}} % Project Name
  {Prototyped a fashion assistant using React and DeepSeek API, featuring multi-page UI and chatbot integration.} % Project Description
  {2025.05 -- 2025.07} % Event Dates

  \resumeItemListStart
    \item Developed a multi-page \textbf{React} front-end with \textbf{Tailwind CSS}for routes like Home, Chat, Wardrobe, and Uniqlo assistant.
    \item Integrated \textbf{DeepSeek API} for AI chat; enabled GitHub Pages deployment via \textbf{HashRouter} and multi-entry \textbf{Vite} builds.
  \resumeItemListEnd
  \vspace{-1mm}
\resumeProject
    {\href{https://github.com/maxzhangg/ai-generated-pytest-for-sorting}{Automated Test Generation with Gen-AI under Pytest}} % Project Name
  {Generated Pytest test cases for Python programs using gen-ai.} % Project Description
  {2025.04} % Event Dates

  \resumeItemListStart
    \item This project provides a full suite of \textbf{Pytest} test cases for the classic sorting algorithms.
    \item The tests were automatically generated and evaluated by human to ensure correctness, structural coverage, and robustness.
  \resumeItemListEnd
    \vspace{-1mm}
    \resumeProject
      {MCU-Based Solar Street Light Controller Design} %Project Name
      { Developed a solar-powered \textbf{LED street lighting system} based on \textbf{ATmega8 MCU}} %Project Name, Location Name
      {2023.03 - 2023.06} %Event Dates

      \resumeItemListStart
    \item Designed \textbf{DC-DC circuit} using \textbf{pulse width modulation} for optimized charging.
    \item Implemented protection features such as \textbf{short circuit, overload, and automatic recovery mechanisms}.
    \resumeItemListEnd
    \resumeProject
  {Harmonic Analysis of Power Systems Using Fourier Transform}
  {Performed signal processing–based harmonic analysis for electrical power systems.}
  {2021.11}

\resumeItemListStart
\item Applied \textbf{Fast Fourier Transform (FFT)} techniques to analyze harmonic components in power system signals.
\item Utilized \textbf{Hanning window} methods to reduce spectral leakage and improve frequency-domain accuracy.
\item Evaluated harmonic distortion characteristics to support power quality assessment and system optimization.
\resumeItemListEnd
\vspace{-1mm}

\resumeProject
  {Power Flow Calculation for IEEE 57-Bus System}
  {Conducted steady-state power flow analysis and system stability evaluation.}
  {2021.12}

\resumeItemListStart
\item Analyzed \textbf{voltage magnitude, phase angle, and line loading conditions} for the \textbf{IEEE 57-bus power system}.
\item Used \textbf{MATPOWER} to simulate power flow scenarios and adjust system parameters for stability analysis.
\item Developed \textbf{Python scripts} for numerical data processing and \textbf{engineering visualization} of power system results.
\resumeItemListEnd
\vspace{-1mm}
      
  \resumeSubHeadingListEnd
\vspace{-6mm}

%-----------Additional Information-----------------
\section{\textbf{Additional Information}}
\begin{itemize}[leftmargin=0.05in, label={}]
    \small{\item{
     Full G driver's license. Valid PGWP.
    }}
\end{itemize}
 \vspace{-16pt}

%\includepdf[pages=1]{transcript_maxzhang.pdf}
%\includepdf[pages=1]{transcript_neepu.pdf}

%-------------------------------------------
\end{document}
`;
