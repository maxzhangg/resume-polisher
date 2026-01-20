// We use String.raw to ensure LaTeX backslashes are treated as literals and not escape characters.

export const PROMPT_INSTRUCTIONS = String.raw`# Role
你是一位**拥有技术背景的资深招聘官 (Technical Recruiter)**，同时也是一位**LaTeX 代码排版专家**。

# Context
输入：
1. **Target JD** (目标职位描述)。
2. **User Requirements** (求职者的额外要求)。
3. **Master Resume Code** (包含我所有经历的 LaTeX 源代码)。

你的任务是利用你的招聘经验，从我的代码库中“组装”出一份**针对该职位**的 1 页简历。

# 核心任务 (The Mission)

## 1. 布局策略 (Layout Strategy) -> "Perfect Fit"
- **目标**: 输出内容必须**完美填充 1 页 A4 纸**。
- **实习经历 (Internship)**: 【🚫绝对禁止修改】保留所有实习经历的代码块，**不要改动文字**，这是简历的骨架。
- **教育经历 (Education)**: 【🚫绝对禁止修改】保留学校、学位、时间等信息，不要删减。
- **项目经历 (Projects)**: 【🎯锁定 3 个】
  - 根据 JD 的核心需求，挑选出 **3 个** 最相关的项目。
  - **其余项目全部删除**。
  - 这 3 个项目将作为支撑你能力的支柱。

## 2. 内容优化 (Content Optimization) -> "High Impact"
- 对选中的这 3 个项目进行**基于事实的润色**（只修改 \`{}\` 内的文本）：
  - **关键词对齐**: 参考 JD 中的技术名词和动词。
  - **精准修辞**: 使用强有力的动词开头（Developed, Architected, Spearheaded），去除废话。
  - **拒绝瞎编**: 优化表达，但严禁捏造事实。

## 3. 代码安全 (Code Safety) -> "Don't Break It"
- **容器保护**: 严禁修改 LaTeX 的结构命令（如 \`\resumeProjectHeading\`, \`\resumeItem\`, \`\section\` 等）。
- **符号转义**: 重写文本时，务必检查特殊字符（\`&\`, \`%\`, \`_\`, \`$\`, \`#\`），必须加反斜杠转义（如 \`\&\`）。
- **编译检查**: 确保所有花括号 \`{}\` 严格闭合。

## 4. 空间微调 (Space Management)
- 如果 **实习 + 3个项目** 导致内容略微超出一页，请按以下顺序进行缩减：
  1. **精简 Skills 部分**: 仅保留与 JD 高度相关的技能关键词，删除次要技能。
  2. **精简项目描述**: 在不减少项目数量（保持3个）的前提下，缩短每个 bullet point 的句子长度，去除冗余修饰词。`;

export const MASTER_RESUME_LATEX = String.raw`%-------------------------
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
      {Service Router Test Platform Dev Student}{Ottawa}
      {Nokia}{Apr 2024 - Dec 2024}
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
  {WeOrganizer: AI-Driven B2B Content Aggregation Platform (Architecture \& Design)} 
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
  {Relationship K-Line (AI-Powered Data Visualization Web App)}
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
  {Tarot Drawing Website with AI Reading} % Project Name
  {Developed an interactive Tarot reading website using React and DeepSeek-powered chatbot.} % Project Description
  {2025.07} % Event Dates

  \resumeItemListStart
    \item Built a responsive web app with \textbf{React},\textbf{ Tailwind CSS}, and \textbf{GitHub Pages}; implemented deterministic card drawing via \textbf{SHA-256} and a 156-card \textbf{JSON} dataset.
    \item Enabled multi-turn tarot chat using \textbf{DeepSeek API} with Markdown rendering; ensured static hosting compatibility via \textbf{React HashRouter}.
  \resumeItemListEnd
  \vspace{-1mm}

    \resumeProject
  {Style Max - Fashion Recommendation Platform} % Project Name
  {Prototyped a fashion assistant using React and DeepSeek API, featuring multi-page UI and chatbot integration.} % Project Description
  {2025.05 -- 2025.07} % Event Dates

  \resumeItemListStart
    \item Developed a multi-page \textbf{React} front-end with \textbf{Tailwind CSS}for routes like Home, Chat, Wardrobe, and Uniqlo assistant.
    \item Integrated \textbf{DeepSeek API} for AI chat; enabled GitHub Pages deployment via \textbf{HashRouter} and multi-entry \textbf{Vite} builds.
  \resumeItemListEnd
  \vspace{-1mm}
\resumeProject
    {Automated Test Generation with Gen-AI under Pytest} % Project Name
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
\end{document}`;
