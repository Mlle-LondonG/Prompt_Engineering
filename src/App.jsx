import React, { useState, useEffect, useRef, useCallback, useMemo, createContext, useContext } from "react";
import {
  Sparkles, Brain, Rocket, ChevronRight, ChevronDown, Check, Copy,
  CheckCircle2, XCircle, AlertTriangle, Lightbulb, Target, Wrench,
  RefreshCw, BookOpen, Zap, MessageSquare, ArrowRight, Code2, Eye,
  Play, Trophy, ShieldCheck, FileText, Database, Hexagon, Menu, X,
  Search, ChevronLeft, Layers, GraduationCap, Clock, Circle,
  ListChecks, GitBranch, Network, Boxes, Microscope, Compass, Award,
  Star, Flame, HelpCircle, BookOpenCheck, Library, Share2, Send,
  Cpu, Globe, History, Wand2, Crosshair, Scale, ScrollText,
  Telescope, Sigma, Variable, Beaker, FlaskConical, Gauge, Trash2,
  Mic, Image as ImageIcon, FileCode2, Briefcase, BookMarked,
  Atom, Binary, Workflow, BarChart3, TrendingUp, Users, Megaphone,
  PenTool, Calculator, Stethoscope, Gavel, Building2, LineChart,
  Swords, Crown, Medal, Trees, Diamond, Infinity as InfinityIcon,
  ArrowUpRight, ArrowUp, ArrowDown, Lock, Unlock, KeyRound,
  Loader2, AlertCircle, Settings2, Activity, Volume2, Camera,
  Anchor, Book, BrainCircuit, Bug, Code, Cookie, FileCode, Headphones, Heart,
  Languages, Mountain, PenLine, Quote, RotateCw, ScanLine, Sprout, Terminal,
  User, UserCheck, Video, AlertOctagon, Info
} from "lucide-react";

/* ============================================================================
   PROMPT ENGINEERING ACADEMY · Premium Educational Platform
   ----------------------------------------------------------------------------
   Architecture:
   - i18n: ES (default) | EN | PT — persisted via localStorage
   - Persistence: progress, levels, checklists, prompts, skills — localStorage
   - 10 Modules × 3 Levels (Foundations / Advanced / Expert)
   - Intelligent Prompt Evaluator (multi-dimensional scoring)
   - Universal Prompt Simulator (5 AI models)
   - Prompt Improver, Templates Library, Battle Mode, Recommendation Engine
   - Skill Tree, Certification, Capstone Project
   ========================================================================== */

/* ============================================================================
   PERSISTENCE LAYER
   ========================================================================== */

const STORAGE_PREFIX = "prompt-academy:v1:";
const KEYS = {
  PROGRESS: `${STORAGE_PREFIX}progress`,
  CHECKLISTS: `${STORAGE_PREFIX}checklists`,
  ACTIVE_MODULE: `${STORAGE_PREFIX}active-module`,
  ACTIVE_LEVELS: `${STORAGE_PREFIX}active-levels`,
  LANG: `${STORAGE_PREFIX}lang`,
  CONSENT: `${STORAGE_PREFIX}consent`,
  PROMPTS: `${STORAGE_PREFIX}prompts`,
  SKILLS: `${STORAGE_PREFIX}skills`,
  EVAL_HISTORY: `${STORAGE_PREFIX}eval-history`,
  CAPSTONE: `${STORAGE_PREFIX}capstone`,
  QUIZ_SCORES: `${STORAGE_PREFIX}quiz-scores`,
};

function safeGet(key, fallback) {
  try {
    if (typeof window === "undefined") return fallback;
    const raw = window.localStorage.getItem(key);
    if (raw === null || raw === undefined) return fallback;
    return JSON.parse(raw);
  } catch {
    return fallback;
  }
}

function safeSet(key, value) {
  try {
    if (typeof window === "undefined") return;
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch {
    /* silent */
  }
}

function usePersistentState(key, initial) {
  const [value, setValue] = useState(() => {
    const stored = safeGet(key, undefined);
    // If stored type doesn't match initial type, fall back to initial (prevents stale data corruption)
    if (stored === undefined) return initial;
    if (typeof initial === typeof stored || initial === null) return stored;
    return initial;
  });
  useEffect(() => { safeSet(key, value); }, [key, value]);
  return [value, setValue];
}

/* ============================================================================
   I18N — translations (ES / EN / PT)
   ========================================================================== */

const translations = {
  es: {
    brand: { name: "Prompt Academy", tag: "Ingeniería de Prompt" },
    nav: {
      sections: {
        Foundations: "Fundamentos",
        Application: "Aplicación",
        Mastery: "Maestría",
        Tools: "Herramientas",
      },
      searchPlaceholder: "Buscar módulo…",
      progress: "Tu progreso",
      language: "Idioma",
      skills: "Skill Tree",
      tools: "Herramientas",
      evaluator: "Evaluador de Prompts",
      templates: "Biblioteca",
      battle: "AI Battle",
      capstone: "Proyecto Final",
    },
    levels: {
      foundations: "Fundamentos",
      advanced: "Avanzado",
      expert: "Experto",
      foundationsDesc: "Conceptos esenciales",
      advancedDesc: "Casos reales",
      expertDesc: "Diseño de sistemas",
    },
    nav_btn: {
      previous: "Anterior",
      finish: "Finalizar",
      continue: "Continuar",
      markAndContinue: "Marcar y continuar",
      completeCourse: "Completar academia",
    },
    hero: {
      eyebrow: "Academia interactiva · Prompt Engineering",
      title1: "Aprende a hablar con la AI",
      title2: "como un arquitecto",
      title3: "no como un usuario.",
      sub: "Una academia estructurada que te enseña a comunicarte con cualquier modelo de AI — ChatGPT, Claude, Gemini, Perplexity, NotebookLM — con precisión, intención y criterio profesional.",
      meta: {
        modules: "10 módulos",
        time: "≈ 4 horas",
        levels: "3 niveles por módulo",
        skills: "Skills certificables",
      },
      philosophy: "La AI no vino a reemplazarte. Vino a potenciar tu pensamiento, tu criterio, tu creatividad. Tu valor sigue siendo humano: estrategia, ética, juicio. Aquí aprendes a usar esa palanca como un arquitecto.",
      cta: "Comenzar Módulo 1",
      certification: "Certificación incluida",
    },
    module: {
      validate: "Validación",
      practice: "Práctica",
      exercise: "Ejercicio",
      example: "Ejemplo",
      compare: "Comparación",
      simulator: "Simulador",
      tryIt: "Pruébalo",
      checklist: "Checklist",
      realCases: "Casos reales",
      executiveSummary: "Resumen ejecutivo",
      nextStep: "Próximo paso",
      problem: "Problema",
      solution: "Solución",
      keyIdea: "Idea clave",
      anatomy: "Anatomía",
      timeline: "Línea de tiempo",
      tryNow: "Practicar ahora",
    },
    evaluator: {
      title: "Evaluador de Prompts",
      subtitle: "Analiza tu prompt con un motor de evaluación multidimensional",
      placeholder: "Escribe aquí el prompt que quieres analizar…",
      analyze: "Analizar prompt",
      analyzing: "Analizando…",
      score: "Puntaje general",
      level: "Nivel",
      strengths: "Fortalezas",
      weaknesses: "Áreas a mejorar",
      suggestions: "Sugerencias del mentor",
      bestAI: "AI recomendada",
      improved: "Prompt mejorado",
      compare: "Comparar versiones",
      original: "Original",
      optimized: "Optimizado",
      expert: "Versión experta",
      dimensions: "Dimensiones evaluadas",
      clarity: "Claridad",
      structure: "Estructura",
      context: "Contexto",
      intent: "Intención",
      delimiters: "Delimitadores",
      role: "Rol asignado",
      output: "Output esperado",
      specificity: "Especificidad",
      strategy: "Pensamiento estratégico",
      clear: "Borrar",
      copy: "Copiar",
      copied: "Copiado",
      mentorMode: "Modo Mentor",
      mentorIntro: "Te hablo como un instructor senior. Vamos a desglosar tu prompt:",
      noPrompt: "Escribe un prompt arriba para comenzar el análisis.",
      tipsTitle: "Aplica estas mejoras:",
      adaptFor: "Adaptaciones por modelo",
    },
    templates: {
      title: "Biblioteca de Prompts",
      subtitle: "Prompts profesionales listos para usar y adaptar",
      categories: {
        study: "Estudio",
        work: "Trabajo",
        coding: "Programación",
        creative: "Creatividad",
        business: "Negocios",
        research: "Investigación",
        productivity: "Productividad",
        analysis: "Análisis",
      },
      use: "Usar plantilla",
      copy: "Copiar",
      copied: "Copiado",
      all: "Todos",
    },
    battle: {
      title: "AI Battle Mode",
      subtitle: "Compara cómo respondería cada AI al mismo prompt",
      prompt: "Tu prompt",
      placeholder: "Ej: Explícame el cambio climático para un niño de 10 años",
      run: "Lanzar comparación",
      running: "Comparando AIs…",
      strengths: "Fortalezas",
      style: "Estilo",
      bestFor: "Mejor para",
      verdict: "Veredicto del mentor",
    },
    recommender: {
      title: "Motor de Recomendación AI",
      subtitle: "Descubre qué AI es mejor para cada tarea",
      task: "¿Qué quieres hacer?",
      placeholder: "Describe tu tarea o selecciona una sugerencia",
      recommend: "Recomendar AI",
      best: "Mejor opción",
      alternative: "Alternativa",
      why: "Por qué",
      whenToUse: "Cuándo usarla",
    },
    skills: {
      title: "Skill Tree",
      subtitle: "Habilidades desbloqueadas a través de tu progreso",
      unlocked: "Desbloqueada",
      locked: "Bloqueada",
      progress: "Progreso",
      levelLabel: "Nivel",
      unlock: "Completa módulos para desbloquear",
    },
    capstone: {
      title: "Proyecto Final · Capstone",
      subtitle: "Tu evaluación final como Arquitecto de Prompts",
      intro: "Enfrenta un escenario empresarial real. Tu prompt será evaluado por el motor en múltiples dimensiones.",
      selectCase: "Selecciona tu escenario",
      yourPrompt: "Tu solución",
      submit: "Enviar para evaluación",
      score: "Puntaje final",
      verdict: "Veredicto",
      strengths: "Fortalezas demostradas",
      improvements: "Roadmap de mejora",
      certified: "Certificado",
      retake: "Intentar otro caso",
    },
    quiz: {
      submit: "Validar",
      correct: "¡Correcto!",
      incorrect: "Inténtalo de nuevo",
      explanation: "Explicación",
    },
    cookies: {
      title: "Privacidad y consentimiento",
      body: "Usamos almacenamiento local del navegador para guardar tu progreso, idioma y preferencias. No enviamos datos a servidores externos.",
      essential: "Esencial",
      essentialDesc: "Progreso, idioma, prompts guardados. Necesario para que la academia funcione.",
      analytics: "Analítica anónima",
      analyticsDesc: "Métricas agregadas sin identificadores personales.",
      acceptAll: "Aceptar todo",
      onlyEssential: "Solo esencial",
      save: "Guardar preferencias",
    },
    achievement: {
      title: "Lo lograste",
      sub: "Ahora sabes hablar con cualquier AI con criterio profesional. Lo demás es práctica.",
      unlocked: "Certificación desbloqueada",
    },
    common: {
      tools: "Herramientas",
      academy: "Academia",
      back: "Volver a la academia",
      try: "Probar",
      reset: "Reiniciar",
      learn: "Aprender más",
    },
  },
  en: {
    brand: { name: "Prompt Academy", tag: "Prompt Engineering" },
    nav: {
      sections: {
        Foundations: "Foundations",
        Application: "Application",
        Mastery: "Mastery",
        Tools: "Tools",
      },
      searchPlaceholder: "Search module…",
      progress: "Your progress",
      language: "Language",
      skills: "Skill Tree",
      tools: "Tools",
      evaluator: "Prompt Evaluator",
      templates: "Library",
      battle: "AI Battle",
      capstone: "Capstone",
    },
    levels: {
      foundations: "Foundations",
      advanced: "Advanced",
      expert: "Expert",
      foundationsDesc: "Essential concepts",
      advancedDesc: "Real cases",
      expertDesc: "System design",
    },
    nav_btn: {
      previous: "Previous",
      finish: "Finish",
      continue: "Continue",
      markAndContinue: "Mark and continue",
      completeCourse: "Complete academy",
    },
    hero: {
      eyebrow: "Interactive academy · Prompt Engineering",
      title1: "Learn to talk to AI",
      title2: "like an architect",
      title3: "not like a user.",
      sub: "A structured academy that teaches you to communicate with any AI model — ChatGPT, Claude, Gemini, Perplexity, NotebookLM — with precision, intent and professional judgment.",
      meta: {
        modules: "10 modules",
        time: "≈ 4 hours",
        levels: "3 levels per module",
        skills: "Certifiable skills",
      },
      philosophy: "AI did not come to replace you. It came to amplify your thinking, your judgment, your creativity. Your value is still human: strategy, ethics, criterion. Here you learn to use that lever like an architect.",
      cta: "Start Module 1",
      certification: "Certification included",
    },
    module: {
      validate: "Validation",
      practice: "Practice",
      exercise: "Exercise",
      example: "Example",
      compare: "Comparison",
      simulator: "Simulator",
      tryIt: "Try it",
      checklist: "Checklist",
      realCases: "Real cases",
      executiveSummary: "Executive summary",
      nextStep: "Next step",
      problem: "Problem",
      solution: "Solution",
      keyIdea: "Key idea",
      anatomy: "Anatomy",
      timeline: "Timeline",
      tryNow: "Practice now",
    },
    evaluator: {
      title: "Prompt Evaluator",
      subtitle: "Analyze your prompt with a multi-dimensional evaluation engine",
      placeholder: "Write the prompt you want to analyze here…",
      analyze: "Analyze prompt",
      analyzing: "Analyzing…",
      score: "Overall score",
      level: "Level",
      strengths: "Strengths",
      weaknesses: "Areas to improve",
      suggestions: "Mentor suggestions",
      bestAI: "Recommended AI",
      improved: "Improved prompt",
      compare: "Compare versions",
      original: "Original",
      optimized: "Optimized",
      expert: "Expert version",
      dimensions: "Dimensions evaluated",
      clarity: "Clarity",
      structure: "Structure",
      context: "Context",
      intent: "Intent",
      delimiters: "Delimiters",
      role: "Role",
      output: "Expected output",
      specificity: "Specificity",
      strategy: "Strategic thinking",
      clear: "Clear",
      copy: "Copy",
      copied: "Copied",
      mentorMode: "Mentor Mode",
      mentorIntro: "Let me speak to you as a senior instructor. Let's break down your prompt:",
      noPrompt: "Write a prompt above to begin analysis.",
      tipsTitle: "Apply these improvements:",
      adaptFor: "Per-model adaptations",
    },
    templates: {
      title: "Prompt Library",
      subtitle: "Professional prompts ready to use and adapt",
      categories: {
        study: "Study",
        work: "Work",
        coding: "Coding",
        creative: "Creative",
        business: "Business",
        research: "Research",
        productivity: "Productivity",
        analysis: "Analysis",
      },
      use: "Use template",
      copy: "Copy",
      copied: "Copied",
      all: "All",
    },
    battle: {
      title: "AI Battle Mode",
      subtitle: "Compare how each AI would respond to the same prompt",
      prompt: "Your prompt",
      placeholder: "E.g. Explain climate change for a 10-year-old",
      run: "Run comparison",
      running: "Comparing AIs…",
      strengths: "Strengths",
      style: "Style",
      bestFor: "Best for",
      verdict: "Mentor verdict",
    },
    recommender: {
      title: "AI Recommendation Engine",
      subtitle: "Discover which AI is best for each task",
      task: "What do you want to do?",
      placeholder: "Describe your task or pick a suggestion",
      recommend: "Recommend AI",
      best: "Best option",
      alternative: "Alternative",
      why: "Why",
      whenToUse: "When to use it",
    },
    skills: {
      title: "Skill Tree",
      subtitle: "Skills unlocked through your progress",
      unlocked: "Unlocked",
      locked: "Locked",
      progress: "Progress",
      levelLabel: "Level",
      unlock: "Complete modules to unlock",
    },
    capstone: {
      title: "Capstone · Final Project",
      subtitle: "Your final evaluation as a Prompt Architect",
      intro: "Face a real business scenario. Your prompt will be evaluated across multiple dimensions.",
      selectCase: "Select your scenario",
      yourPrompt: "Your solution",
      submit: "Submit for evaluation",
      score: "Final score",
      verdict: "Verdict",
      strengths: "Demonstrated strengths",
      improvements: "Improvement roadmap",
      certified: "Certified",
      retake: "Try another case",
    },
    quiz: {
      submit: "Validate",
      correct: "Correct!",
      incorrect: "Try again",
      explanation: "Explanation",
    },
    cookies: {
      title: "Privacy and consent",
      body: "We use browser local storage to save your progress, language and preferences. No data is sent to external servers.",
      essential: "Essential",
      essentialDesc: "Progress, language, saved prompts. Required for the academy.",
      analytics: "Anonymous analytics",
      analyticsDesc: "Aggregated metrics with no personal identifiers.",
      acceptAll: "Accept all",
      onlyEssential: "Essential only",
      save: "Save preferences",
    },
    achievement: {
      title: "You did it",
      sub: "You can now speak to any AI with professional criterion. The rest is practice.",
      unlocked: "Certification unlocked",
    },
    common: {
      tools: "Tools",
      academy: "Academy",
      back: "Back to academy",
      try: "Try",
      reset: "Reset",
      learn: "Learn more",
    },
  },
  pt: {
    brand: { name: "Prompt Academy", tag: "Engenharia de Prompt" },
    nav: {
      sections: {
        Foundations: "Fundamentos",
        Application: "Aplicação",
        Mastery: "Maestria",
        Tools: "Ferramentas",
      },
      searchPlaceholder: "Buscar módulo…",
      progress: "Seu progresso",
      language: "Idioma",
      skills: "Skill Tree",
      tools: "Ferramentas",
      evaluator: "Avaliador de Prompts",
      templates: "Biblioteca",
      battle: "AI Battle",
      capstone: "Projeto Final",
    },
    levels: {
      foundations: "Fundamentos",
      advanced: "Avançado",
      expert: "Especialista",
      foundationsDesc: "Conceitos essenciais",
      advancedDesc: "Casos reais",
      expertDesc: "Desenho de sistemas",
    },
    nav_btn: {
      previous: "Anterior",
      finish: "Finalizar",
      continue: "Continuar",
      markAndContinue: "Marcar e continuar",
      completeCourse: "Completar academia",
    },
    hero: {
      eyebrow: "Academia interativa · Prompt Engineering",
      title1: "Aprenda a falar com a AI",
      title2: "como um arquiteto",
      title3: "não como um usuário.",
      sub: "Uma academia estruturada que ensina você a se comunicar com qualquer modelo de AI — ChatGPT, Claude, Gemini, Perplexity, NotebookLM — com precisão, intenção e critério profissional.",
      meta: {
        modules: "10 módulos",
        time: "≈ 4 horas",
        levels: "3 níveis por módulo",
        skills: "Habilidades certificáveis",
      },
      philosophy: "A AI não veio para substituir você. Veio para amplificar seu pensamento, seu critério, sua criatividade. Seu valor segue humano: estratégia, ética, julgamento. Aqui você aprende a usar essa alavanca como um arquiteto.",
      cta: "Começar Módulo 1",
      certification: "Certificação incluída",
    },
    module: {
      validate: "Validação",
      practice: "Prática",
      exercise: "Exercício",
      example: "Exemplo",
      compare: "Comparação",
      simulator: "Simulador",
      tryIt: "Experimente",
      checklist: "Checklist",
      realCases: "Casos reais",
      executiveSummary: "Resumo executivo",
      nextStep: "Próximo passo",
      problem: "Problema",
      solution: "Solução",
      keyIdea: "Ideia-chave",
      anatomy: "Anatomia",
      timeline: "Linha do tempo",
      tryNow: "Praticar agora",
    },
    evaluator: {
      title: "Avaliador de Prompts",
      subtitle: "Analise seu prompt com um motor multidimensional",
      placeholder: "Escreva o prompt que quer analisar…",
      analyze: "Analisar prompt",
      analyzing: "Analisando…",
      score: "Pontuação geral",
      level: "Nível",
      strengths: "Pontos fortes",
      weaknesses: "Áreas a melhorar",
      suggestions: "Sugestões do mentor",
      bestAI: "AI recomendada",
      improved: "Prompt melhorado",
      compare: "Comparar versões",
      original: "Original",
      optimized: "Otimizado",
      expert: "Versão expert",
      dimensions: "Dimensões avaliadas",
      clarity: "Clareza",
      structure: "Estrutura",
      context: "Contexto",
      intent: "Intenção",
      delimiters: "Delimitadores",
      role: "Papel",
      output: "Output esperado",
      specificity: "Especificidade",
      strategy: "Pensamento estratégico",
      clear: "Limpar",
      copy: "Copiar",
      copied: "Copiado",
      mentorMode: "Modo Mentor",
      mentorIntro: "Falando como um instrutor sênior. Vamos analisar seu prompt:",
      noPrompt: "Escreva um prompt acima para começar a análise.",
      tipsTitle: "Aplique estas melhorias:",
      adaptFor: "Adaptações por modelo",
    },
    templates: {
      title: "Biblioteca de Prompts",
      subtitle: "Prompts profissionais prontos para usar",
      categories: {
        study: "Estudo",
        work: "Trabalho",
        coding: "Programação",
        creative: "Criatividade",
        business: "Negócios",
        research: "Pesquisa",
        productivity: "Produtividade",
        analysis: "Análise",
      },
      use: "Usar modelo",
      copy: "Copiar",
      copied: "Copiado",
      all: "Todos",
    },
    battle: {
      title: "AI Battle Mode",
      subtitle: "Compare como cada AI responderia ao mesmo prompt",
      prompt: "Seu prompt",
      placeholder: "Ex: Explique mudança climática para uma criança de 10 anos",
      run: "Comparar",
      running: "Comparando AIs…",
      strengths: "Pontos fortes",
      style: "Estilo",
      bestFor: "Melhor para",
      verdict: "Veredito do mentor",
    },
    recommender: {
      title: "Motor de Recomendação AI",
      subtitle: "Descubra qual AI é melhor para cada tarefa",
      task: "O que você quer fazer?",
      placeholder: "Descreva sua tarefa",
      recommend: "Recomendar AI",
      best: "Melhor opção",
      alternative: "Alternativa",
      why: "Por quê",
      whenToUse: "Quando usar",
    },
    skills: {
      title: "Skill Tree",
      subtitle: "Habilidades desbloqueadas pelo seu progresso",
      unlocked: "Desbloqueada",
      locked: "Bloqueada",
      progress: "Progresso",
      levelLabel: "Nível",
      unlock: "Complete módulos para desbloquear",
    },
    capstone: {
      title: "Projeto Final · Capstone",
      subtitle: "Sua avaliação final como Arquiteto de Prompts",
      intro: "Enfrente um cenário empresarial real. Seu prompt será avaliado em múltiplas dimensões.",
      selectCase: "Selecione seu cenário",
      yourPrompt: "Sua solução",
      submit: "Enviar para avaliação",
      score: "Pontuação final",
      verdict: "Veredito",
      strengths: "Pontos demonstrados",
      improvements: "Roadmap de melhoria",
      certified: "Certificado",
      retake: "Tentar outro caso",
    },
    quiz: {
      submit: "Validar",
      correct: "Correto!",
      incorrect: "Tente novamente",
      explanation: "Explicação",
    },
    cookies: {
      title: "Privacidade e consentimento",
      body: "Usamos armazenamento local para salvar progresso, idioma e preferências. Nenhum dado é enviado a servidores externos.",
      essential: "Essencial",
      essentialDesc: "Progresso, idioma, prompts. Necessário para a academia.",
      analytics: "Analítica anônima",
      analyticsDesc: "Métricas agregadas sem identificadores.",
      acceptAll: "Aceitar tudo",
      onlyEssential: "Somente essencial",
      save: "Salvar preferências",
    },
    achievement: {
      title: "Você conseguiu",
      sub: "Você agora fala com qualquer AI com critério profissional. O resto é prática.",
      unlocked: "Certificação desbloqueada",
    },
    common: {
      tools: "Ferramentas",
      academy: "Academia",
      back: "Voltar à academia",
      try: "Testar",
      reset: "Reiniciar",
      learn: "Saiba mais",
    },
  },
};

/* ============================================================================
   EXTRA TRANSLATIONS — UI strings referenced via t("...") not in base table
   ========================================================================== */

const EXTRA_TRANSLATIONS = {
  es: {
    brand: { name: "Prompt Academy", sub: "AI Communication Mastery" },
    nav: {
      search: "Buscar…",
      progress: "Tu progreso",
      modules: "módulos",
      section: {
        foundations: "Fundamentos",
        application: "Aplicación",
        mastery: "Maestría",
        tools: "Herramientas",
      },
      tool: {
        evaluator: "Evaluador de Prompts",
        templates: "Biblioteca de Plantillas",
        battle: "AI Battle Mode",
        skills: "Skill Tree",
        capstone: "Proyecto Final",
      },
    },
    module: {
      previous: "Anterior",
      next: "Siguiente",
      markDone: "Marcar como completado",
      completed: "Completado",
      level: {
        foundations: "Fundamentos",
        advanced: "Avanzado",
        expert: "Experto",
      },
    },
    hero: {
      eyebrow: "Academia interactiva · Prompt Engineering",
      title1: "Aprende a hablar con la AI",
      title2: "como un arquitecto, no como un usuario.",
      tag: "Una academia estructurada que te enseña a comunicarte con cualquier modelo de AI — ChatGPT, Claude, Gemini, Perplexity, NotebookLM — con precisión, intención y criterio profesional.",
      quote: "La AI no vino a reemplazarte. Vino a potenciar tu pensamiento, tu criterio, tu creatividad. Tu valor sigue siendo profundamente humano.",
      quoteAuthor: "Prompt Engineering Academy",
      meta: { modules: "módulos", levels: "niveles", tools: "herramientas pro", templates: "plantillas listas" },
      cta: "Comenzar el viaje",
      ctaSecondary: "Probar el evaluador",
      coversAI: "Cubre",
    },
    history: {
      section1: "De Turing a los Transformers",
      section2: "Modelos mentales que te van a servir para siempre",
      adv1: "Las 5 AIs principales: ADN distinto",
      exp1: "La intuición geométrica del prompt",
    },
    whatIs: {
      section1: "Las seis piezas de todo prompt",
      adv1: "Débil vs profesional: el contraste",
      exp1: "De prompt a sistema de prompts",
    },
    anatomy: {
      section1: "Los siete bloques arquitectónicos",
      adv1: "Un prompt completo, en producción",
      exp1: "El contrato perfecto",
      fullPrompt: "PROMPT COMPLETO",
    },
    study: {
      section1: "AI aplicada a estudios universitarios",
      adv1: "Qué AI usar para qué tarea académica",
      exp1: "La disciplina del estudiante con AI",
    },
    work: {
      section1: "Casos profesionales reales",
      adv1: "Construye tu biblioteca personal de prompts",
    },
    coding: {
      section1: "AI aplicada al desarrollo de software",
      adv1: "ChatGPT vs Claude vs Gemini para código",
    },
    multimodal: {
      section1: "Más allá del texto: imagen, voz, video, docs",
      adv1: "Pro tip: enmarcar antes de pedir",
    },
    context: {
      section1: "El iceberg invisible del prompt",
      adv1: "La pregunta del ingeniero de contexto",
    },
    leadership: {
      section1: "AI como sparring partner del líder",
    },
    ethics: {
      section1: "Dilemas éticos del mundo con AI",
      adv1: "La filosofía detrás de esta academia",
      exp1: "Donde termina la academia, comienza tu carrera",
    },
    evaluator: {
      title: "Evaluador de Prompts AI",
      sub: "Pega un prompt y recibe un análisis profesional: puntaje, dimensiones, fortalezas, debilidades y sugerencias del mentor.",
      inputLabel: "Tu prompt",
      placeholder: "Pega aquí el prompt que quieres analizar. Cuanto más completo, mejor el diagnóstico…",
      analyze: "Analizar prompt",
      analyzing: "Analizando…",
      overallScore: "Puntaje general",
      bestAI: "AI recomendada",
      dimensions: "Dimensiones del prompt",
      strengths: "Lo que está funcionando",
      weaknesses: "Lo que falta",
      mentorSays: "El mentor dice",
      versions: "Compara versiones",
      original: "Original",
      optimized: "Optimizada",
      expert: "Versión experto",
      emptyTitle: "Esperando tu prompt",
      emptyBody: "Escribe o pega un prompt arriba y presiona Analizar. Recibirás un diagnóstico de nivel profesional en segundos.",
    },
    templates: {
      title: "Biblioteca de plantillas",
      sub: "Prompts listos para producción, organizados por categoría. Cópialos, adáptalos a tu contexto y úsalos.",
      searchPlaceholder: "Buscar plantilla…",
      empty: "No hay plantillas que coincidan con tu búsqueda.",
      cat: {
        all: "Todas",
        study: "Estudio",
        work: "Trabajo",
        coding: "Coding",
        creative: "Creatividad",
        business: "Negocio",
        research: "Investigación",
        productivity: "Productividad",
        analysis: "Análisis",
      },
    },
    battle: {
      title: "AI Battle Mode",
      sub: "Un mismo prompt, las 5 AIs principales, respuestas lado a lado. Decide cuál es mejor para tu caso.",
      inputLabel: "Tu prompt de batalla",
      placeholder: "Escribe el prompt que quieres comparar entre AIs…",
      run: "Lanzar batalla",
      running: "Procesando…",
      recommended: "Recomendada para este prompt",
      verdict: "Veredicto del mentor",
      emptyTitle: "Lanza tu primera batalla",
      emptyBody: "Cada AI responde con su estilo distintivo. Aprende qué modelo brilla para qué tipo de prompt.",
    },
    skills: {
      title: "Skill Tree de Prompt Engineering",
      sub: "Tu árbol de habilidades. Cada skill se desbloquea cuando completas los módulos requeridos.",
      unlocked: "Skills desbloqueadas",
      mastery: "Maestría total",
      modules: "módulos",
    },
    capstone: {
      title: "Proyecto Final",
      sub: "Un escenario real. Tu prompt. Una evaluación profesional que define tu nivel.",
      chooseCase: "Elige tu escenario",
      yourPrompt: "Diseña tu prompt maestro",
      placeholder: "Aplica todo lo que aprendiste: rol, tarea, contexto, restricciones, formato, razonamiento. Mínimo 30 palabras…",
      minWords: "mínimo 30",
      submit: "Enviar para evaluación",
      evaluating: "Evaluando tu trabajo…",
      finalScore: "Puntaje final",
      certified: "¡Certificado!",
      certifiedBody: "Tu prompt demuestra criterio profesional. Has alcanzado el estándar de la academia.",
      notYet: "Casi lo logras",
      notYetBody: "Tu prompt tiene buenos elementos, pero le falta criterio en áreas clave. Revisa las sugerencias y vuelve a intentarlo.",
      strengths: "Lo que ya dominas",
      roadmap: "Tu próximo nivel",
    },
    cookies: {
      title: "Privacidad y cookies",
      body: "Esta academia guarda tu progreso, idioma y configuración únicamente en tu navegador (localStorage). No usamos cookies de terceros ni rastreo. Tus datos nunca salen de tu dispositivo.",
      accept: "Aceptar todo",
      essential: "Solo esenciales",
    },
    achievement: {
      title: "Has completado la academia.",
      body: "Has terminado los 10 módulos. Pero esto no es un final: es el comienzo de tu carrera como arquitecto de AI. Ahora vas con criterio donde antes ibas con esperanza.",
      tag: "Prompt Engineering Architect",
    },
    common: {
      copy: "Copiar",
      copied: "Copiado",
      clear: "Limpiar",
      words: "palabras",
      chars: "caracteres",
      intro: "Introducción",
      mental: "Modelos mentales",
      deep: "Profundizar",
      reflection: "Reflexión",
      mentorNote: "Nota del mentor",
      contrast: "Contraste",
      pro: "Nivel pro",
      framework: "Marco de trabajo",
      example: "Ejemplo aplicado",
      architect: "Pensar como arquitecto",
      useCases: "Casos de uso",
      match: "Match: AI ↔ Tarea",
      discipline: "Disciplina",
      compare: "Comparativa",
      philosophy: "Filosofía",
      close: "Cierre",
      style: "Estilo",
      bestFor: "Ideal para",
    },
  },
  en: {
    brand: { name: "Prompt Academy", sub: "AI Communication Mastery" },
    nav: {
      search: "Search…",
      progress: "Your progress",
      modules: "modules",
      section: { foundations: "Foundations", application: "Application", mastery: "Mastery", tools: "Tools" },
      tool: { evaluator: "Prompt Evaluator", templates: "Templates Library", battle: "AI Battle Mode", skills: "Skill Tree", capstone: "Capstone" },
    },
    module: {
      previous: "Previous", next: "Next", markDone: "Mark as complete", completed: "Completed",
      level: { foundations: "Foundations", advanced: "Advanced", expert: "Expert" },
    },
    hero: {
      eyebrow: "Interactive academy · Prompt Engineering",
      title1: "Learn to talk to AI",
      title2: "like an architect, not a user.",
      tag: "A structured academy that teaches you to communicate with any AI model — ChatGPT, Claude, Gemini, Perplexity, NotebookLM — with precision, intent, and professional judgment.",
      quote: "AI didn't come to replace you. It came to amplify your thinking, your judgment, your creativity. Your value remains deeply human.",
      quoteAuthor: "Prompt Engineering Academy",
      meta: { modules: "modules", levels: "levels", tools: "pro tools", templates: "ready templates" },
      cta: "Start the journey",
      ctaSecondary: "Try the evaluator",
      coversAI: "Covers",
    },
    history: { section1: "From Turing to Transformers", section2: "Mental models that will serve you forever", adv1: "The 5 main AIs: different DNA", exp1: "The geometric intuition of the prompt" },
    whatIs: { section1: "The six pieces of every prompt", adv1: "Weak vs professional: the contrast", exp1: "From prompt to prompt-system" },
    anatomy: { section1: "The seven architectural blocks", adv1: "A complete prompt, production-ready", exp1: "The perfect contract", fullPrompt: "FULL PROMPT" },
    study: { section1: "AI applied to university studies", adv1: "Which AI for which academic task", exp1: "The discipline of the student with AI" },
    work: { section1: "Real professional use cases", adv1: "Build your personal prompt library" },
    coding: { section1: "AI applied to software development", adv1: "ChatGPT vs Claude vs Gemini for code" },
    multimodal: { section1: "Beyond text: image, voice, video, docs", adv1: "Pro tip: frame before you ask" },
    context: { section1: "The invisible iceberg of the prompt", adv1: "The context-engineer's question" },
    leadership: { section1: "AI as the leader's sparring partner" },
    ethics: { section1: "Ethical dilemmas of the AI world", adv1: "The philosophy behind this academy", exp1: "Where the academy ends, your career begins" },
    evaluator: {
      title: "AI Prompt Evaluator", sub: "Paste a prompt and get a professional analysis: score, dimensions, strengths, weaknesses, and mentor suggestions.",
      inputLabel: "Your prompt", placeholder: "Paste the prompt you want to analyze. The more complete, the better the diagnosis…",
      analyze: "Analyze prompt", analyzing: "Analyzing…", overallScore: "Overall score", bestAI: "Recommended AI", dimensions: "Prompt dimensions",
      strengths: "What's working", weaknesses: "What's missing", mentorSays: "The mentor says",
      versions: "Compare versions", original: "Original", optimized: "Optimized", expert: "Expert version",
      emptyTitle: "Waiting for your prompt", emptyBody: "Write or paste a prompt above and press Analyze. You'll get a professional-grade diagnosis in seconds.",
    },
    templates: {
      title: "Templates library", sub: "Production-ready prompts, organized by category. Copy them, adapt them to your context, and use them.",
      searchPlaceholder: "Search template…", empty: "No templates match your search.",
      cat: { all: "All", study: "Study", work: "Work", coding: "Coding", creative: "Creative", business: "Business", research: "Research", productivity: "Productivity", analysis: "Analysis" },
    },
    battle: {
      title: "AI Battle Mode", sub: "One prompt, the 5 main AIs, responses side by side. Decide which is best for your case.",
      inputLabel: "Your battle prompt", placeholder: "Write the prompt you want to compare across AIs…",
      run: "Launch battle", running: "Processing…", recommended: "Recommended for this prompt", verdict: "Mentor's verdict",
      emptyTitle: "Launch your first battle", emptyBody: "Each AI responds with its distinctive style. Learn which model shines for which kind of prompt.",
    },
    skills: { title: "Prompt Engineering Skill Tree", sub: "Your skill tree. Each skill unlocks when you complete the required modules.", unlocked: "Skills unlocked", mastery: "Total mastery", modules: "modules" },
    capstone: {
      title: "Capstone Project", sub: "A real scenario. Your prompt. A professional evaluation that defines your level.",
      chooseCase: "Choose your scenario", yourPrompt: "Design your master prompt",
      placeholder: "Apply everything you learned: role, task, context, constraints, format, reasoning. Minimum 30 words…",
      minWords: "minimum 30", submit: "Submit for evaluation", evaluating: "Evaluating your work…",
      finalScore: "Final score", certified: "Certified!", certifiedBody: "Your prompt shows professional judgment. You've reached the academy's standard.",
      notYet: "Almost there", notYetBody: "Your prompt has good elements but lacks judgment in key areas. Review the suggestions and try again.",
      strengths: "What you already master", roadmap: "Your next level",
    },
    cookies: {
      title: "Privacy and cookies",
      body: "This academy stores your progress, language, and settings only in your browser (localStorage). We use no third-party cookies or tracking. Your data never leaves your device.",
      accept: "Accept all", essential: "Essential only",
    },
    achievement: {
      title: "You completed the academy.",
      body: "You finished the 10 modules. But this isn't an ending: it's the start of your career as an AI architect. Now you go with judgment where you used to go with hope.",
      tag: "Prompt Engineering Architect",
    },
    common: {
      copy: "Copy", copied: "Copied", clear: "Clear", words: "words", chars: "characters",
      intro: "Introduction", mental: "Mental models", deep: "Go deeper", reflection: "Reflection", mentorNote: "Mentor's note",
      contrast: "Contrast", pro: "Pro level", framework: "Framework", example: "Applied example", architect: "Think as an architect",
      useCases: "Use cases", match: "Match: AI ↔ Task", discipline: "Discipline", compare: "Comparison",
      philosophy: "Philosophy", close: "Closing", style: "Style", bestFor: "Best for",
    },
  },
  pt: {
    brand: { name: "Prompt Academy", sub: "AI Communication Mastery" },
    nav: {
      search: "Buscar…",
      progress: "Seu progresso",
      modules: "módulos",
      section: { foundations: "Fundamentos", application: "Aplicação", mastery: "Maestria", tools: "Ferramentas" },
      tool: { evaluator: "Avaliador de Prompts", templates: "Biblioteca de Templates", battle: "AI Battle Mode", skills: "Skill Tree", capstone: "Projeto Final" },
    },
    module: {
      previous: "Anterior", next: "Próximo", markDone: "Marcar como concluído", completed: "Concluído",
      level: { foundations: "Fundamentos", advanced: "Avançado", expert: "Expert" },
    },
    hero: {
      eyebrow: "Academia interativa · Prompt Engineering",
      title1: "Aprenda a falar com a AI",
      title2: "como um arquiteto, não como um usuário.",
      tag: "Uma academia estruturada que te ensina a comunicar com qualquer modelo de AI — ChatGPT, Claude, Gemini, Perplexity, NotebookLM — com precisão, intenção e critério profissional.",
      quote: "A AI não veio te substituir. Veio amplificar seu pensamento, seu critério, sua criatividade. Seu valor permanece profundamente humano.",
      quoteAuthor: "Prompt Engineering Academy",
      meta: { modules: "módulos", levels: "níveis", tools: "ferramentas pro", templates: "templates prontos" },
      cta: "Começar a jornada", ctaSecondary: "Experimentar o avaliador", coversAI: "Cobre",
    },
    history: { section1: "De Turing aos Transformers", section2: "Modelos mentais que servirão para sempre", adv1: "As 5 AIs principais: DNA distinto", exp1: "A intuição geométrica do prompt" },
    whatIs: { section1: "As seis peças de todo prompt", adv1: "Fraco vs profissional: o contraste", exp1: "De prompt a sistema de prompts" },
    anatomy: { section1: "Os sete blocos arquiteturais", adv1: "Um prompt completo, em produção", exp1: "O contrato perfeito", fullPrompt: "PROMPT COMPLETO" },
    study: { section1: "AI aplicada a estudos universitários", adv1: "Qual AI para qual tarefa acadêmica", exp1: "A disciplina do estudante com AI" },
    work: { section1: "Casos profissionais reais", adv1: "Construa sua biblioteca pessoal de prompts" },
    coding: { section1: "AI aplicada ao desenvolvimento de software", adv1: "ChatGPT vs Claude vs Gemini para código" },
    multimodal: { section1: "Além do texto: imagem, voz, vídeo, docs", adv1: "Dica pro: enquadre antes de pedir" },
    context: { section1: "O iceberg invisível do prompt", adv1: "A pergunta do engenheiro de contexto" },
    leadership: { section1: "AI como sparring partner do líder" },
    ethics: { section1: "Dilemas éticos do mundo com AI", adv1: "A filosofia por trás desta academia", exp1: "Onde a academia termina, sua carreira começa" },
    evaluator: {
      title: "Avaliador de Prompts AI", sub: "Cole um prompt e receba uma análise profissional: score, dimensões, forças, fraquezas e sugestões do mentor.",
      inputLabel: "Seu prompt", placeholder: "Cole aqui o prompt que quer analisar. Quanto mais completo, melhor o diagnóstico…",
      analyze: "Analisar prompt", analyzing: "Analisando…", overallScore: "Score geral", bestAI: "AI recomendada", dimensions: "Dimensões do prompt",
      strengths: "O que está funcionando", weaknesses: "O que falta", mentorSays: "O mentor diz",
      versions: "Comparar versões", original: "Original", optimized: "Otimizada", expert: "Versão expert",
      emptyTitle: "Aguardando seu prompt", emptyBody: "Escreva ou cole um prompt acima e pressione Analisar. Receberá um diagnóstico profissional em segundos.",
    },
    templates: {
      title: "Biblioteca de templates", sub: "Prompts prontos para produção, organizados por categoria. Copie, adapte ao seu contexto, e use.",
      searchPlaceholder: "Buscar template…", empty: "Nenhum template corresponde à sua busca.",
      cat: { all: "Todos", study: "Estudo", work: "Trabalho", coding: "Coding", creative: "Criatividade", business: "Negócio", research: "Pesquisa", productivity: "Produtividade", analysis: "Análise" },
    },
    battle: {
      title: "AI Battle Mode", sub: "Um prompt, as 5 AIs principais, respostas lado a lado. Decida qual é melhor para seu caso.",
      inputLabel: "Seu prompt de batalha", placeholder: "Escreva o prompt que quer comparar entre AIs…",
      run: "Lançar batalha", running: "Processando…", recommended: "Recomendada para este prompt", verdict: "Veredito do mentor",
      emptyTitle: "Lance sua primeira batalha", emptyBody: "Cada AI responde com seu estilo distinto. Aprenda qual modelo brilha para qual tipo de prompt.",
    },
    skills: { title: "Skill Tree de Prompt Engineering", sub: "Sua árvore de habilidades. Cada skill desbloqueia ao completar os módulos requeridos.", unlocked: "Skills desbloqueadas", mastery: "Maestria total", modules: "módulos" },
    capstone: {
      title: "Projeto Final", sub: "Um cenário real. Seu prompt. Uma avaliação profissional que define seu nível.",
      chooseCase: "Escolha seu cenário", yourPrompt: "Desenhe seu prompt mestre",
      placeholder: "Aplique tudo que aprendeu: papel, tarefa, contexto, restrições, formato, raciocínio. Mínimo 30 palavras…",
      minWords: "mínimo 30", submit: "Enviar para avaliação", evaluating: "Avaliando seu trabalho…",
      finalScore: "Score final", certified: "Certificado!", certifiedBody: "Seu prompt demonstra critério profissional. Você alcançou o padrão da academia.",
      notYet: "Quase lá", notYetBody: "Seu prompt tem bons elementos, mas falta critério em áreas-chave. Revise as sugestões e tente de novo.",
      strengths: "O que você já domina", roadmap: "Seu próximo nível",
    },
    cookies: {
      title: "Privacidade e cookies",
      body: "Esta academia guarda seu progresso, idioma e configurações apenas no seu navegador (localStorage). Não usamos cookies de terceiros nem rastreamento. Seus dados nunca saem do seu dispositivo.",
      accept: "Aceitar tudo", essential: "Só essenciais",
    },
    achievement: {
      title: "Você completou a academia.",
      body: "Você terminou os 10 módulos. Mas isto não é um final: é o começo da sua carreira como arquiteto de AI. Agora vai com critério onde antes ia com esperança.",
      tag: "Prompt Engineering Architect",
    },
    common: {
      copy: "Copiar", copied: "Copiado", clear: "Limpar", words: "palavras", chars: "caracteres",
      intro: "Introdução", mental: "Modelos mentais", deep: "Aprofundar", reflection: "Reflexão", mentorNote: "Nota do mentor",
      contrast: "Contraste", pro: "Nível pro", framework: "Framework", example: "Exemplo aplicado", architect: "Pensar como arquiteto",
      useCases: "Casos de uso", match: "Match: AI ↔ Tarefa", discipline: "Disciplina", compare: "Comparativo",
      philosophy: "Filosofia", close: "Fechamento", style: "Estilo", bestFor: "Ideal para",
    },
  },
};

function resolveDotted(obj, key) {
  if (!obj || !key) return undefined;
  const parts = key.split(".");
  let cur = obj;
  for (let i = 0; i < parts.length; i++) {
    if (cur == null || typeof cur !== "object") return undefined;
    cur = cur[parts[i]];
  }
  return cur;
}

function humanizeKey(key) {
  const last = key.split(".").pop() || key;
  const spaced = last.replace(/([A-Z])/g, " $1").replace(/[-_]/g, " ").trim();
  return spaced.charAt(0).toUpperCase() + spaced.slice(1);
}

const I18nContext = createContext({ lang: "es", setLang: () => {}, t: (k) => k });

function I18nProvider({ children }) {
  const [lang, setLangState] = usePersistentState(KEYS.LANG, "es");
  const setLang = useCallback((l) => setLangState(l), [setLangState]);
  const t = useCallback((key) => {
    const tA = translations[lang] || translations.es;
    const tB = EXTRA_TRANSLATIONS[lang] || EXTRA_TRANSLATIONS.es;
    const v1 = resolveDotted(tA, key);
    if (typeof v1 === "string") return v1;
    const v2 = resolveDotted(tB, key);
    if (typeof v2 === "string") return v2;
    const fb1 = resolveDotted(translations.es, key);
    if (typeof fb1 === "string") return fb1;
    const fb2 = resolveDotted(EXTRA_TRANSLATIONS.es, key);
    if (typeof fb2 === "string") return fb2;
    return humanizeKey(key);
  }, [lang]);
  const value = useMemo(() => ({ lang, setLang, t }), [lang, setLang, t]);
  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

function useT() {
  return useContext(I18nContext).t;
}


/* ============================================================================
   DESIGN TOKENS — futuristic dark, lila + cyan, glassmorphism
   ========================================================================== */

const DESIGN_TOKENS = `
  :root {
    --bg-base: #08080b;
    --bg-surface: #0f0f13;
    --bg-elevated: #15151b;
    --bg-hover: #1c1c24;
    --bg-active: #24242e;
    --bg-glass: rgba(20, 20, 28, 0.65);
    --bg-glass-strong: rgba(20, 20, 28, 0.85);

    --border-subtle: #1d1d25;
    --border-default: #2a2a35;
    --border-strong: #3a3a48;
    --border-focus: #818cf8;

    --text-h: #fafafb;
    --text-primary: #ededef;
    --text-secondary: #b4b4be;
    --text-tertiary: #8b8b95;
    --text-muted: #6a6a73;

    /* Lila accent */
    --accent: #a78bfa;
    --accent-strong: #8b5cf6;
    --accent-deep: #7c3aed;
    --accent-bg: rgba(139, 92, 246, 0.12);
    --accent-bg-strong: rgba(139, 92, 246, 0.22);
    --accent-border: rgba(167, 139, 250, 0.38);
    --accent-glow: rgba(167, 139, 250, 0.55);

    /* Cyan */
    --cyan: #67e8f9;
    --cyan-strong: #22d3ee;
    --cyan-deep: #0891b2;
    --cyan-bg: rgba(34, 211, 238, 0.10);
    --cyan-border: rgba(103, 232, 249, 0.32);

    --success: #34d399;
    --success-bg: rgba(52, 211, 153, 0.10);
    --success-border: rgba(52, 211, 153, 0.32);

    --warning: #fbbf24;
    --warning-bg: rgba(251, 191, 36, 0.10);
    --warning-border: rgba(251, 191, 36, 0.32);

    --danger: #f87171;
    --danger-bg: rgba(248, 113, 113, 0.10);
    --danger-border: rgba(248, 113, 113, 0.32);

    --info: #60a5fa;
    --info-bg: rgba(96, 165, 250, 0.10);
    --info-border: rgba(96, 165, 250, 0.32);

    --gold: #fbbf24;
    --pink: #f0abfc;

    --s-1: 4px; --s-2: 8px; --s-3: 12px; --s-4: 16px; --s-5: 20px;
    --s-6: 24px; --s-8: 32px; --s-10: 40px; --s-12: 48px; --s-16: 64px; --s-20: 80px;

    --r-sm: 4px; --r-md: 6px; --r-lg: 8px; --r-xl: 12px; --r-2xl: 16px; --r-3xl: 24px;

    --font-sans: 'Inter', -apple-system, BlinkMacSystemFont, system-ui, sans-serif;
    --font-mono: 'JetBrains Mono', 'SF Mono', Menlo, monospace;

    --fs-xs: 11px; --fs-sm: 13px; --fs-base: 14px; --fs-body: 15px;
    --fs-md: 15px; --fs-lg: 17px; --fs-xl: 20px; --fs-2xl: 24px;
    --fs-3xl: 30px; --fs-4xl: 38px; --fs-display: 56px;

    --lh-tight: 1.2; --lh-snug: 1.4; --lh-normal: 1.5; --lh-relaxed: 1.65;
    --fw-normal: 400; --fw-medium: 500; --fw-semibold: 600; --fw-bold: 700;
    --ls-tight: -0.011em; --ls-tighter: -0.025em;

    --shadow-sm: 0 1px 2px rgba(0,0,0,0.4);
    --shadow-md: 0 4px 12px rgba(0,0,0,0.5);
    --shadow-lg: 0 12px 32px rgba(0,0,0,0.6);
    --shadow-glow: 0 0 40px var(--accent-bg-strong);
    --shadow-cyan-glow: 0 0 32px rgba(34, 211, 238, 0.22);

    --t-fast: 120ms cubic-bezier(0.4, 0, 0.2, 1);
    --t-base: 200ms cubic-bezier(0.4, 0, 0.2, 1);
    --t-slow: 320ms cubic-bezier(0.4, 0, 0.2, 1);

    --sidebar-width: 272px;
    --header-height: 56px;
    --content-max: 920px;

    --gradient-hero: radial-gradient(ellipse 80% 50% at 50% -20%, rgba(139, 92, 246, 0.18), transparent 60%),
                     radial-gradient(ellipse 60% 40% at 80% 10%, rgba(34, 211, 238, 0.10), transparent 60%);
    --gradient-card: linear-gradient(180deg, rgba(167, 139, 250, 0.06), rgba(34, 211, 238, 0.03));
    --gradient-accent: linear-gradient(135deg, var(--accent), var(--accent-deep));
    --gradient-cyan: linear-gradient(135deg, var(--cyan), var(--cyan-strong));
    --gradient-mixed: linear-gradient(135deg, var(--accent), var(--cyan-strong));
  }

  * { box-sizing: border-box; margin: 0; padding: 0; }
  html, body, #root { height: 100%; }

  body {
    font-family: var(--font-sans);
    font-size: var(--fs-base);
    line-height: var(--lh-normal);
    color: var(--text-primary);
    background: var(--bg-base);
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    font-feature-settings: "cv11", "ss01", "ss03";
    overflow: hidden;
  }

  ::selection { background: var(--accent-bg-strong); color: var(--text-h); }

  :focus { outline: none; }
  :focus-visible {
    outline: 2px solid var(--accent);
    outline-offset: 2px;
    border-radius: var(--r-sm);
  }

  ::-webkit-scrollbar { width: 8px; height: 8px; }
  ::-webkit-scrollbar-track { background: transparent; }
  ::-webkit-scrollbar-thumb { background: var(--border-default); border-radius: 8px; border: 2px solid transparent; background-clip: padding-box; }
  ::-webkit-scrollbar-thumb:hover { background: var(--border-strong); background-clip: padding-box; }
  * { scrollbar-width: thin; scrollbar-color: var(--border-default) transparent; }

  button { font-family: inherit; cursor: pointer; border: none; background: none; color: inherit; }
  button:disabled { cursor: not-allowed; opacity: 0.5; }
  input, textarea { font-family: inherit; }

  /* ============ LAYOUT ============ */
  .app {
    display: grid;
    grid-template-columns: var(--sidebar-width) 1fr;
    height: 100vh;
    overflow: hidden;
  }
  @media (max-width: 900px) { .app { grid-template-columns: 1fr; } }

  /* ============ SIDEBAR ============ */
  .sidebar {
    background: var(--bg-surface);
    border-right: 1px solid var(--border-subtle);
    display: flex;
    flex-direction: column;
    overflow: hidden;
    position: relative;
  }
  @media (max-width: 900px) {
    .sidebar {
      position: fixed;
      left: 0; top: 0; bottom: 0;
      width: 280px;
      z-index: 100;
      transform: translateX(-100%);
      transition: transform var(--t-base);
    }
    .sidebar.open { transform: translateX(0); }
  }

  .overlay {
    position: fixed; inset: 0; background: rgba(0,0,0,0.6);
    z-index: 99; opacity: 0; pointer-events: none;
    transition: opacity var(--t-base);
  }
  .overlay.show { opacity: 1; pointer-events: auto; }
  @media (min-width: 901px) { .overlay { display: none; } }

  .sidebar__brand {
    height: var(--header-height);
    padding: 0 var(--s-5);
    display: flex;
    align-items: center;
    gap: var(--s-3);
    border-bottom: 1px solid var(--border-subtle);
    flex-shrink: 0;
  }
  .brand-mark {
    width: 30px; height: 30px;
    border-radius: var(--r-md);
    background: var(--gradient-accent);
    display: grid;
    place-items: center;
    color: white;
    box-shadow: 0 0 0 1px var(--accent-border), 0 4px 16px var(--accent-bg-strong);
    position: relative;
    overflow: hidden;
  }
  .brand-mark::after {
    content: ""; position: absolute; inset: 0;
    background: linear-gradient(135deg, transparent 40%, rgba(255,255,255,0.18) 50%, transparent 60%);
  }
  .brand-name {
    font-size: var(--fs-md);
    font-weight: var(--fw-semibold);
    letter-spacing: -0.01em;
    color: var(--text-h);
  }
  .brand-tag { font-size: 10px; color: var(--accent); margin-top: 1px; font-weight: var(--fw-medium); letter-spacing: 0.02em; }

  .sidebar__search { padding: var(--s-3) var(--s-4) var(--s-2); flex-shrink: 0; }
  .search-wrap { position: relative; }
  .search-wrap > svg {
    position: absolute; left: var(--s-3); top: 50%;
    transform: translateY(-50%); color: var(--text-tertiary); pointer-events: none;
  }
  .search-input {
    width: 100%; height: 32px;
    background: var(--bg-base);
    border: 1px solid var(--border-subtle);
    border-radius: var(--r-md);
    padding: 0 var(--s-3) 0 32px;
    font-size: var(--fs-sm);
    color: var(--text-primary);
    transition: border-color var(--t-fast);
  }
  .search-input:focus { border-color: var(--border-strong); }
  .search-input::placeholder { color: var(--text-tertiary); }

  .sidebar__nav {
    flex: 1; overflow-y: auto;
    padding: var(--s-2) var(--s-3) var(--s-4);
  }
  .nav-section {
    padding: var(--s-4) var(--s-3) var(--s-1);
    font-size: 10px;
    font-weight: var(--fw-semibold);
    text-transform: uppercase;
    letter-spacing: 0.08em;
    color: var(--text-tertiary);
  }
  .nav-section:first-child { padding-top: var(--s-2); }

  .nav-item {
    display: flex; align-items: center; gap: var(--s-3);
    padding: 7px var(--s-3);
    border-radius: var(--r-md);
    color: var(--text-secondary);
    font-size: var(--fs-sm);
    font-weight: var(--fw-medium);
    text-align: left; width: 100%;
    transition: background var(--t-fast), color var(--t-fast);
    margin-bottom: 1px;
    position: relative;
  }
  .nav-item:hover { background: var(--bg-hover); color: var(--text-h); }
  .nav-item.active {
    background: var(--bg-active);
    color: var(--text-h);
    box-shadow: inset 2px 0 0 var(--accent);
  }
  .nav-item__icon { width: 16px; height: 16px; flex-shrink: 0; color: var(--text-tertiary); }
  .nav-item.active .nav-item__icon, .nav-item:hover .nav-item__icon { color: var(--accent); }
  .nav-item__num {
    font-size: 10px; font-family: var(--font-mono);
    color: var(--text-tertiary); margin-left: auto; flex-shrink: 0;
  }
  .nav-item__check { width: 14px; height: 14px; margin-left: auto; color: var(--success); flex-shrink: 0; }

  .sidebar__footer {
    padding: var(--s-3) var(--s-4);
    border-top: 1px solid var(--border-subtle);
    flex-shrink: 0;
    display: flex; flex-direction: column; gap: var(--s-3);
  }

  .lang-switch {
    display: flex; gap: 2px;
    padding: 3px;
    background: var(--bg-elevated);
    border: 1px solid var(--border-subtle);
    border-radius: var(--r-md);
  }
  .lang-switch__btn {
    flex: 1; height: 24px;
    border-radius: 3px;
    font-size: 10px;
    font-weight: var(--fw-semibold);
    text-transform: uppercase;
    letter-spacing: 0.08em;
    color: var(--text-tertiary);
    transition: all var(--t-fast);
  }
  .lang-switch__btn:hover { color: var(--text-primary); }
  .lang-switch__btn--active {
    background: var(--bg-active);
    color: var(--accent);
    box-shadow: 0 0 0 1px var(--accent-border);
  }

  .progress-card {
    background: var(--bg-elevated);
    border: 1px solid var(--border-subtle);
    border-radius: var(--r-md);
    padding: var(--s-3);
  }
  .progress-card__head {
    display: flex; justify-content: space-between; align-items: center;
    margin-bottom: var(--s-2);
  }
  .progress-card__label { font-size: var(--fs-xs); color: var(--text-secondary); font-weight: var(--fw-medium); }
  .progress-card__value { font-size: var(--fs-xs); font-family: var(--font-mono); color: var(--text-h); font-weight: var(--fw-semibold); }
  .progress-bar {
    height: 4px; background: var(--border-subtle);
    border-radius: 2px; overflow: hidden;
  }
  .progress-bar__fill {
    height: 100%;
    background: var(--gradient-mixed);
    border-radius: 2px;
    transition: width var(--t-slow);
  }

  /* ============ MAIN ============ */
  .main { overflow-y: auto; background: var(--bg-base); position: relative; }

  .header {
    height: var(--header-height);
    border-bottom: 1px solid var(--border-subtle);
    background: var(--bg-glass);
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
    position: sticky; top: 0; z-index: 30;
    display: flex; align-items: center;
    padding: 0 var(--s-6);
    gap: var(--s-4);
  }
  .header__menu {
    width: 32px; height: 32px;
    border-radius: var(--r-md);
    display: none;
    align-items: center; justify-content: center;
    color: var(--text-secondary);
    transition: background var(--t-fast);
  }
  @media (max-width: 900px) { .header__menu { display: flex; } }
  .header__menu:hover { background: var(--bg-hover); }

  .header__crumb {
    display: flex; align-items: center; gap: var(--s-2);
    font-size: var(--fs-sm);
    color: var(--text-tertiary);
  }
  .header__crumb-current { color: var(--text-h); font-weight: var(--fw-medium); }
  .header__progress {
    margin-left: auto;
    display: flex; align-items: center; gap: var(--s-3);
    font-size: var(--fs-xs);
    color: var(--text-secondary);
  }
  .header__progress-bar {
    width: 80px; height: 4px;
    background: var(--border-subtle);
    border-radius: 2px; overflow: hidden;
  }
  .header__progress-fill {
    height: 100%;
    background: var(--gradient-mixed);
    border-radius: 2px;
    transition: width var(--t-slow);
  }

  .content {
    max-width: var(--content-max);
    margin: 0 auto;
    padding: var(--s-12) var(--s-6) var(--s-20);
  }
  @media (max-width: 700px) { .content { padding: var(--s-8) var(--s-4) var(--s-12); } }

  /* ============ HERO ============ */
  .hero {
    position: relative;
    padding: var(--s-16) 0 var(--s-12);
    text-align: left;
  }
  .hero::before {
    content: ""; position: absolute;
    inset: -40px -100px 0;
    background: var(--gradient-hero);
    pointer-events: none;
    z-index: -1;
  }
  .hero__eyebrow {
    display: inline-flex; align-items: center; gap: var(--s-2);
    padding: 5px var(--s-3);
    background: var(--accent-bg);
    border: 1px solid var(--accent-border);
    border-radius: 999px;
    font-size: var(--fs-xs);
    color: var(--accent);
    font-weight: var(--fw-medium);
    margin-bottom: var(--s-6);
  }
  .hero__title {
    font-size: clamp(34px, 5vw, 56px);
    font-weight: var(--fw-bold);
    line-height: 1.05;
    letter-spacing: var(--ls-tighter);
    color: var(--text-h);
    margin-bottom: var(--s-5);
  }
  .hero__title-accent {
    background: var(--gradient-mixed);
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;
  }
  .hero__sub {
    font-size: var(--fs-lg);
    line-height: var(--lh-relaxed);
    color: var(--text-secondary);
    max-width: 720px;
    margin-bottom: var(--s-8);
  }
  .hero__philosophy {
    padding: var(--s-5);
    background: var(--bg-glass);
    backdrop-filter: blur(20px);
    border: 1px solid var(--accent-border);
    border-radius: var(--r-xl);
    color: var(--text-primary);
    font-size: var(--fs-md);
    line-height: var(--lh-relaxed);
    margin-bottom: var(--s-8);
    position: relative;
    overflow: hidden;
  }
  .hero__philosophy::before {
    content: ""; position: absolute; left: 0; top: 0; bottom: 0;
    width: 3px; background: var(--gradient-mixed);
  }
  .hero__meta {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
    gap: var(--s-3);
    margin-bottom: var(--s-8);
  }
  .hero__meta-item {
    display: flex; align-items: center; gap: var(--s-3);
    padding: var(--s-3) var(--s-4);
    background: var(--bg-surface);
    border: 1px solid var(--border-subtle);
    border-radius: var(--r-md);
    transition: border-color var(--t-base), background var(--t-base);
  }
  .hero__meta-item:hover { border-color: var(--accent-border); background: var(--bg-elevated); }
  .hero__meta-icon { color: var(--accent); flex-shrink: 0; }
  .hero__meta-text { font-size: var(--fs-sm); color: var(--text-secondary); }

  .btn-primary {
    display: inline-flex; align-items: center; gap: var(--s-2);
    padding: 11px var(--s-5);
    background: var(--gradient-accent);
    border-radius: var(--r-md);
    color: white;
    font-size: var(--fs-sm);
    font-weight: var(--fw-semibold);
    transition: transform var(--t-fast), box-shadow var(--t-base);
    box-shadow: 0 4px 16px var(--accent-bg-strong), 0 0 0 1px var(--accent-border);
  }
  .btn-primary:hover { transform: translateY(-1px); box-shadow: 0 6px 24px var(--accent-bg-strong), 0 0 0 1px var(--accent); }
  .btn-primary:active { transform: translateY(0); }

  .btn-secondary {
    display: inline-flex; align-items: center; gap: var(--s-2);
    padding: 10px var(--s-4);
    background: var(--bg-surface);
    border: 1px solid var(--border-default);
    border-radius: var(--r-md);
    color: var(--text-primary);
    font-size: var(--fs-sm);
    font-weight: var(--fw-medium);
    transition: background var(--t-fast), border-color var(--t-fast);
  }
  .btn-secondary:hover { background: var(--bg-hover); border-color: var(--border-strong); }

  .btn-ghost {
    display: inline-flex; align-items: center; gap: var(--s-2);
    padding: 8px var(--s-3);
    border-radius: var(--r-md);
    color: var(--text-secondary);
    font-size: var(--fs-sm);
    font-weight: var(--fw-medium);
    transition: background var(--t-fast), color var(--t-fast);
  }
  .btn-ghost:hover { background: var(--bg-hover); color: var(--text-h); }

  /* ============ MODULE HEADER ============ */
  .module-head { margin-bottom: var(--s-8); }
  .module-head__num {
    font-family: var(--font-mono);
    font-size: var(--fs-xs);
    color: var(--accent);
    margin-bottom: var(--s-2);
    letter-spacing: 0.04em;
  }
  .module-head__title {
    font-size: var(--fs-3xl);
    font-weight: var(--fw-bold);
    color: var(--text-h);
    letter-spacing: var(--ls-tighter);
    line-height: 1.15;
    margin-bottom: var(--s-3);
  }
  .module-head__sub {
    font-size: var(--fs-body);
    color: var(--text-secondary);
    line-height: var(--lh-relaxed);
    max-width: 720px;
  }

  /* ============ LEVEL TABS ============ */
  .level-tabs {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: var(--s-2);
    padding: 4px;
    background: var(--bg-surface);
    border: 1px solid var(--border-subtle);
    border-radius: var(--r-md);
    margin-bottom: var(--s-8);
  }
  .level-tab {
    padding: var(--s-3);
    border-radius: var(--r-sm);
    text-align: left;
    transition: all var(--t-fast);
    color: var(--text-secondary);
  }
  .level-tab:hover { background: var(--bg-hover); color: var(--text-h); }
  .level-tab--active {
    background: var(--bg-active);
    color: var(--text-h);
    box-shadow: inset 0 0 0 1px var(--accent-border);
  }
  .level-tab__top {
    display: flex; align-items: center; gap: var(--s-2);
    font-size: var(--fs-xs);
    font-weight: var(--fw-semibold);
    text-transform: uppercase;
    letter-spacing: 0.06em;
    margin-bottom: 2px;
  }
  .level-tab__num { font-family: var(--font-mono); color: var(--text-tertiary); }
  .level-tab--active .level-tab__num { color: var(--accent); }
  .level-tab__desc {
    font-size: var(--fs-xs);
    color: var(--text-tertiary);
    line-height: 1.4;
  }

  /* ============ CARDS ============ */
  .card {
    background: var(--bg-surface);
    border: 1px solid var(--border-subtle);
    border-radius: var(--r-xl);
    padding: var(--s-6);
    transition: all var(--t-base);
  }
  .card--interactive:hover { border-color: var(--border-strong); background: var(--bg-elevated); }
  .card--elevated {
    background: var(--bg-elevated);
    box-shadow: var(--shadow-md);
  }
  .card--glow {
    background: var(--bg-glass);
    backdrop-filter: blur(20px);
    border-color: var(--accent-border);
    box-shadow: var(--shadow-glow);
  }
  .card--cyan {
    background: var(--bg-glass);
    backdrop-filter: blur(20px);
    border-color: var(--cyan-border);
    box-shadow: var(--shadow-cyan-glow);
  }

  .section { margin-bottom: var(--s-10); }
  .section__title {
    font-size: var(--fs-xl);
    font-weight: var(--fw-semibold);
    color: var(--text-h);
    margin-bottom: var(--s-2);
    letter-spacing: var(--ls-tight);
    display: flex; align-items: center; gap: var(--s-3);
  }
  .section__title-icon {
    width: 32px; height: 32px;
    border-radius: var(--r-md);
    background: var(--accent-bg);
    color: var(--accent);
    display: grid; place-items: center;
    border: 1px solid var(--accent-border);
  }
  .section__sub {
    font-size: var(--fs-sm);
    color: var(--text-secondary);
    margin-bottom: var(--s-5);
    line-height: var(--lh-relaxed);
  }

  /* ============ ANIMATIONS ============ */
  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(8px); }
    to { opacity: 1; transform: translateY(0); }
  }
  @keyframes pulse-glow {
    0%, 100% { box-shadow: 0 0 0 0 var(--accent-glow); }
    50% { box-shadow: 0 0 0 8px transparent; }
  }
  @keyframes shimmer {
    0% { background-position: -200% center; }
    100% { background-position: 200% center; }
  }
  @keyframes rotate-slow {
    from { transform: rotate(0); }
    to { transform: rotate(360deg); }
  }
  .animate-in { animation: fadeUp 320ms cubic-bezier(0.4, 0, 0.2, 1); }

  /* ============ MISC PRIMITIVES ============ */
  .chip {
    display: inline-flex; align-items: center; gap: 6px;
    padding: 3px var(--s-2);
    background: var(--bg-elevated);
    border: 1px solid var(--border-subtle);
    border-radius: 999px;
    font-size: var(--fs-xs);
    color: var(--text-secondary);
    font-weight: var(--fw-medium);
  }
  .chip--accent { background: var(--accent-bg); border-color: var(--accent-border); color: var(--accent); }
  .chip--cyan { background: var(--cyan-bg); border-color: var(--cyan-border); color: var(--cyan); }
  .chip--success { background: var(--success-bg); border-color: var(--success-border); color: var(--success); }
  .chip--warning { background: var(--warning-bg); border-color: var(--warning-border); color: var(--warning); }
  .chip--danger { background: var(--danger-bg); border-color: var(--danger-border); color: var(--danger); }

  .alert {
    display: flex; gap: var(--s-3);
    padding: var(--s-4);
    border-radius: var(--r-md);
    border: 1px solid;
    margin-bottom: var(--s-4);
  }
  .alert__icon { flex-shrink: 0; margin-top: 2px; }
  .alert__title { font-size: var(--fs-sm); font-weight: var(--fw-semibold); margin-bottom: 2px; }
  .alert__body { font-size: var(--fs-sm); line-height: var(--lh-relaxed); color: var(--text-secondary); }
  .alert--info { background: var(--info-bg); border-color: var(--info-border); }
  .alert--info .alert__icon, .alert--info .alert__title { color: var(--info); }
  .alert--success { background: var(--success-bg); border-color: var(--success-border); }
  .alert--success .alert__icon, .alert--success .alert__title { color: var(--success); }
  .alert--warning { background: var(--warning-bg); border-color: var(--warning-border); }
  .alert--warning .alert__icon, .alert--warning .alert__title { color: var(--warning); }
  .alert--danger { background: var(--danger-bg); border-color: var(--danger-border); }
  .alert--danger .alert__icon, .alert--danger .alert__title { color: var(--danger); }

  .grid-2 { display: grid; grid-template-columns: 1fr 1fr; gap: var(--s-4); }
  .grid-3 { display: grid; grid-template-columns: repeat(3, 1fr); gap: var(--s-4); }
  .grid-auto { display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: var(--s-4); }
  @media (max-width: 700px) {
    .grid-2, .grid-3 { grid-template-columns: 1fr; }
  }

  /* ============ CODE BLOCKS ============ */
  .code-block {
    background: #06060a;
    border: 1px solid var(--border-subtle);
    border-radius: var(--r-md);
    overflow: hidden;
    margin: var(--s-3) 0;
  }
  .code-block__head {
    display: flex; align-items: center; justify-content: space-between;
    padding: 8px var(--s-3);
    background: var(--bg-surface);
    border-bottom: 1px solid var(--border-subtle);
    font-size: var(--fs-xs);
    color: var(--text-tertiary);
    font-family: var(--font-mono);
  }
  .code-block__body {
    padding: var(--s-4);
    overflow-x: auto;
    font-family: var(--font-mono);
    font-size: var(--fs-sm);
    line-height: 1.6;
    color: var(--text-primary);
    white-space: pre-wrap;
    word-break: break-word;
  }
  .code-block__copy {
    display: inline-flex; align-items: center; gap: 4px;
    padding: 3px var(--s-2);
    border-radius: var(--r-sm);
    color: var(--text-tertiary);
    font-size: var(--fs-xs);
    transition: all var(--t-fast);
  }
  .code-block__copy:hover { color: var(--accent); background: var(--accent-bg); }

  /* ============ NAVIGATION FOOTER ============ */
  .module-nav {
    display: flex; justify-content: space-between; align-items: center;
    padding: var(--s-6) 0 0;
    margin-top: var(--s-12);
    border-top: 1px solid var(--border-subtle);
    gap: var(--s-4);
    flex-wrap: wrap;
  }
  .module-nav__btn {
    display: inline-flex; align-items: center; gap: var(--s-2);
    padding: 10px var(--s-4);
    background: var(--bg-surface);
    border: 1px solid var(--border-default);
    border-radius: var(--r-md);
    color: var(--text-primary);
    font-size: var(--fs-sm);
    font-weight: var(--fw-medium);
    transition: all var(--t-fast);
  }
  .module-nav__btn:hover:not(:disabled) { background: var(--bg-hover); border-color: var(--border-strong); }
  .module-nav__btn--primary {
    background: var(--gradient-accent);
    border-color: transparent;
    color: white;
    box-shadow: 0 4px 16px var(--accent-bg-strong);
  }
  .module-nav__btn--primary:hover:not(:disabled) {
    transform: translateY(-1px);
    box-shadow: 0 6px 24px var(--accent-bg-strong);
  }

  /* ============ CHECKLIST ============ */
  .checklist { display: flex; flex-direction: column; gap: var(--s-2); }
  .checklist-item {
    display: flex; align-items: flex-start; gap: var(--s-3);
    padding: var(--s-3) var(--s-4);
    background: var(--bg-surface);
    border: 1px solid var(--border-subtle);
    border-radius: var(--r-md);
    cursor: pointer;
    transition: all var(--t-fast);
    text-align: left;
    width: 100%;
  }
  .checklist-item:hover { background: var(--bg-hover); border-color: var(--border-default); }
  .checklist-item--done {
    background: var(--success-bg);
    border-color: var(--success-border);
  }
  .checklist-checkbox {
    width: 18px; height: 18px;
    border-radius: 4px;
    border: 1.5px solid var(--border-strong);
    display: grid; place-items: center;
    flex-shrink: 0;
    margin-top: 2px;
    transition: all var(--t-fast);
  }
  .checklist-item--done .checklist-checkbox {
    background: var(--success);
    border-color: var(--success);
    color: var(--bg-base);
  }
  .checklist-text {
    font-size: var(--fs-sm);
    color: var(--text-primary);
    line-height: var(--lh-relaxed);
  }
  .checklist-item--done .checklist-text { color: var(--text-secondary); }

  /* ============ QUIZ ============ */
  .quiz {
    background: var(--bg-surface);
    border: 1px solid var(--border-subtle);
    border-radius: var(--r-xl);
    padding: var(--s-5);
  }
  .quiz__q {
    font-size: var(--fs-md);
    font-weight: var(--fw-semibold);
    color: var(--text-h);
    margin-bottom: var(--s-4);
    line-height: var(--lh-snug);
  }
  .quiz__opts { display: flex; flex-direction: column; gap: var(--s-2); margin-bottom: var(--s-4); }
  .quiz__opt {
    padding: var(--s-3) var(--s-4);
    background: var(--bg-elevated);
    border: 1px solid var(--border-subtle);
    border-radius: var(--r-md);
    color: var(--text-primary);
    font-size: var(--fs-sm);
    text-align: left;
    transition: all var(--t-fast);
    display: flex; align-items: center; gap: var(--s-3);
  }
  .quiz__opt:hover:not(:disabled) { background: var(--bg-hover); border-color: var(--border-default); }
  .quiz__opt--selected { border-color: var(--accent); background: var(--accent-bg); }
  .quiz__opt--correct { border-color: var(--success); background: var(--success-bg); color: var(--success); }
  .quiz__opt--wrong { border-color: var(--danger); background: var(--danger-bg); color: var(--danger); }

  /* ============ TIMELINE ============ */
  .timeline { position: relative; padding-left: var(--s-8); }
  .timeline::before {
    content: ""; position: absolute;
    left: 12px; top: 8px; bottom: 8px;
    width: 2px;
    background: linear-gradient(180deg, var(--accent), var(--cyan-strong));
    opacity: 0.4;
  }
  .timeline-item { position: relative; padding-bottom: var(--s-6); }
  .timeline-item:last-child { padding-bottom: 0; }
  .timeline-item::before {
    content: ""; position: absolute;
    left: -28px; top: 6px;
    width: 12px; height: 12px;
    border-radius: 50%;
    background: var(--bg-base);
    border: 2px solid var(--accent);
    box-shadow: 0 0 0 3px var(--bg-base), 0 0 12px var(--accent-glow);
  }
  .timeline-year {
    display: inline-block;
    font-family: var(--font-mono);
    font-size: var(--fs-xs);
    color: var(--accent);
    font-weight: var(--fw-semibold);
    margin-bottom: 4px;
    letter-spacing: 0.04em;
  }
  .timeline-title {
    font-size: var(--fs-md);
    font-weight: var(--fw-semibold);
    color: var(--text-h);
    margin-bottom: 4px;
  }
  .timeline-body {
    font-size: var(--fs-sm);
    color: var(--text-secondary);
    line-height: var(--lh-relaxed);
  }

  /* ============ AI BADGES ============ */
  .ai-badge {
    display: inline-flex; align-items: center; gap: 6px;
    padding: 4px 10px;
    border-radius: 999px;
    font-size: var(--fs-xs);
    font-weight: var(--fw-semibold);
    letter-spacing: 0.02em;
  }
  .ai-badge--gpt { background: rgba(16, 163, 127, 0.12); color: #10a37f; border: 1px solid rgba(16, 163, 127, 0.32); }
  .ai-badge--claude { background: rgba(217, 119, 87, 0.12); color: #d97757; border: 1px solid rgba(217, 119, 87, 0.32); }
  .ai-badge--gemini { background: rgba(66, 133, 244, 0.12); color: #4285f4; border: 1px solid rgba(66, 133, 244, 0.32); }
  .ai-badge--perplexity { background: rgba(32, 178, 170, 0.12); color: #20b2aa; border: 1px solid rgba(32, 178, 170, 0.32); }
  .ai-badge--notebook { background: rgba(234, 67, 53, 0.12); color: #ea4335; border: 1px solid rgba(234, 67, 53, 0.32); }

  /* ============ SCORE GAUGE ============ */
  .score-gauge { position: relative; width: 200px; height: 200px; margin: 0 auto; }
  .score-gauge svg { transform: rotate(-90deg); }
  .score-gauge__center {
    position: absolute; inset: 0;
    display: flex; flex-direction: column; align-items: center; justify-content: center;
  }
  .score-gauge__value {
    font-size: 56px;
    font-weight: var(--fw-bold);
    font-family: var(--font-mono);
    background: var(--gradient-mixed);
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;
    line-height: 1;
  }
  .score-gauge__label {
    font-size: var(--fs-xs);
    color: var(--text-tertiary);
    text-transform: uppercase;
    letter-spacing: 0.1em;
    margin-top: var(--s-1);
  }
  .score-gauge__sub {
    font-size: var(--fs-sm);
    color: var(--text-h);
    font-weight: var(--fw-semibold);
    margin-top: var(--s-2);
  }

  /* ============ DIMENSION BAR ============ */
  .dim-row {
    display: grid;
    grid-template-columns: 130px 1fr 40px;
    gap: var(--s-3);
    align-items: center;
    padding: var(--s-2) 0;
  }
  .dim-label { font-size: var(--fs-sm); color: var(--text-secondary); }
  .dim-bar-track {
    height: 6px;
    background: var(--border-subtle);
    border-radius: 3px;
    overflow: hidden;
  }
  .dim-bar-fill {
    height: 100%;
    border-radius: 3px;
    background: var(--gradient-mixed);
    transition: width var(--t-slow);
  }
  .dim-value {
    font-family: var(--font-mono);
    font-size: var(--fs-xs);
    color: var(--text-h);
    text-align: right;
    font-weight: var(--fw-semibold);
  }

  /* ============ TEXTAREA ============ */
  .ta-pro {
    width: 100%;
    min-height: 140px;
    background: var(--bg-surface);
    border: 1px solid var(--border-default);
    border-radius: var(--r-md);
    padding: var(--s-3) var(--s-4);
    font-family: var(--font-mono);
    font-size: var(--fs-sm);
    color: var(--text-primary);
    resize: vertical;
    line-height: var(--lh-relaxed);
    transition: border-color var(--t-fast);
  }
  .ta-pro:focus { border-color: var(--accent); box-shadow: 0 0 0 3px var(--accent-bg); }

  .input-pro {
    width: 100%;
    height: 36px;
    background: var(--bg-surface);
    border: 1px solid var(--border-default);
    border-radius: var(--r-md);
    padding: 0 var(--s-3);
    font-size: var(--fs-sm);
    color: var(--text-primary);
    transition: border-color var(--t-fast);
  }
  .input-pro:focus { border-color: var(--accent); box-shadow: 0 0 0 3px var(--accent-bg); }

  /* ============ COOKIE BANNER ============ */
  .cookie-banner {
    position: fixed;
    bottom: var(--s-4);
    left: var(--s-4);
    right: var(--s-4);
    max-width: 480px;
    margin: 0 auto;
    padding: var(--s-5);
    background: var(--bg-glass-strong);
    backdrop-filter: blur(20px);
    border: 1px solid var(--accent-border);
    border-radius: var(--r-xl);
    box-shadow: var(--shadow-lg);
    z-index: 200;
    animation: fadeUp 400ms cubic-bezier(0.4, 0, 0.2, 1);
  }

  /* ============ SKILL TREE ============ */
  .skill-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
    gap: var(--s-4);
  }
  .skill-node {
    padding: var(--s-4);
    background: var(--bg-surface);
    border: 1px solid var(--border-subtle);
    border-radius: var(--r-xl);
    transition: all var(--t-base);
    position: relative;
    overflow: hidden;
  }
  .skill-node--unlocked {
    border-color: var(--accent-border);
    background: linear-gradient(180deg, var(--accent-bg) 0%, var(--bg-surface) 60%);
  }
  .skill-node--locked { opacity: 0.45; }
  .skill-node__head {
    display: flex; align-items: center; gap: var(--s-3);
    margin-bottom: var(--s-3);
  }
  .skill-node__icon {
    width: 36px; height: 36px;
    border-radius: var(--r-md);
    display: grid; place-items: center;
    background: var(--accent-bg);
    color: var(--accent);
    border: 1px solid var(--accent-border);
  }
  .skill-node--locked .skill-node__icon {
    background: var(--bg-elevated);
    color: var(--text-tertiary);
    border-color: var(--border-subtle);
  }
  .skill-node__title {
    font-size: var(--fs-sm);
    font-weight: var(--fw-semibold);
    color: var(--text-h);
  }
  .skill-node__sub { font-size: var(--fs-xs); color: var(--text-tertiary); }
  .skill-node__desc {
    font-size: var(--fs-xs);
    color: var(--text-secondary);
    line-height: var(--lh-relaxed);
    margin-bottom: var(--s-3);
  }
  .skill-node__level {
    display: flex; gap: 3px;
  }
  .skill-node__dot {
    height: 4px;
    flex: 1;
    background: var(--border-subtle);
    border-radius: 2px;
  }
  .skill-node__dot--filled {
    background: var(--gradient-mixed);
  }

  /* ============ TEMPLATE CARD ============ */
  .tpl-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    gap: var(--s-4);
  }
  .tpl-card {
    padding: var(--s-5);
    background: var(--bg-surface);
    border: 1px solid var(--border-subtle);
    border-radius: var(--r-xl);
    display: flex; flex-direction: column;
    transition: all var(--t-base);
  }
  .tpl-card:hover {
    border-color: var(--accent-border);
    background: var(--bg-elevated);
    transform: translateY(-2px);
  }
  .tpl-card__head {
    display: flex; align-items: center; gap: var(--s-3);
    margin-bottom: var(--s-3);
  }
  .tpl-card__icon {
    width: 36px; height: 36px;
    border-radius: var(--r-md);
    background: var(--accent-bg);
    color: var(--accent);
    display: grid; place-items: center;
    border: 1px solid var(--accent-border);
  }
  .tpl-card__title {
    font-size: var(--fs-sm);
    font-weight: var(--fw-semibold);
    color: var(--text-h);
  }
  .tpl-card__cat { font-size: var(--fs-xs); color: var(--text-tertiary); }
  .tpl-card__preview {
    font-family: var(--font-mono);
    font-size: var(--fs-xs);
    color: var(--text-secondary);
    background: var(--bg-base);
    border: 1px solid var(--border-subtle);
    border-radius: var(--r-sm);
    padding: var(--s-3);
    line-height: 1.6;
    margin-bottom: var(--s-3);
    flex: 1;
    max-height: 120px;
    overflow: hidden;
    position: relative;
  }
  .tpl-card__preview::after {
    content: ""; position: absolute;
    bottom: 0; left: 0; right: 0;
    height: 30px;
    background: linear-gradient(transparent, var(--bg-base));
    pointer-events: none;
  }
  .tpl-card__actions { display: flex; gap: var(--s-2); }

  /* ============ ACHIEVEMENT CORE ============ */
  .achievement {
    position: relative;
    padding: var(--s-12) var(--s-8);
    background: radial-gradient(circle at center, var(--accent-bg-strong) 0%, transparent 70%);
    border-radius: var(--r-3xl);
    text-align: center;
    overflow: hidden;
  }
  .achievement__core {
    position: relative;
    width: 160px; height: 160px;
    margin: 0 auto var(--s-8);
  }
  .achievement__ring {
    position: absolute; inset: 0;
    border-radius: 50%;
    border: 2px solid var(--accent-border);
  }
  .achievement__ring--outer {
    animation: rotate-slow 20s linear infinite;
    background: conic-gradient(from 0deg, transparent, var(--accent), transparent, var(--cyan-strong), transparent);
    -webkit-mask: radial-gradient(circle at center, transparent 78px, black 80px);
    mask: radial-gradient(circle at center, transparent 78px, black 80px);
    border: none;
  }
  .achievement__center {
    position: absolute; inset: 20px;
    background: var(--bg-glass-strong);
    backdrop-filter: blur(20px);
    border-radius: 50%;
    display: grid; place-items: center;
    box-shadow: 0 0 60px var(--accent-glow);
    border: 1px solid var(--accent-border);
  }

  /* ============ MISC ============ */
  .kbd {
    display: inline-block;
    padding: 1px 6px;
    font-family: var(--font-mono);
    font-size: var(--fs-xs);
    color: var(--text-secondary);
    background: var(--bg-elevated);
    border: 1px solid var(--border-default);
    border-radius: 4px;
    line-height: 1.5;
  }

  .pulse-dot {
    width: 8px; height: 8px;
    border-radius: 50%;
    background: var(--success);
    box-shadow: 0 0 0 0 rgba(52, 211, 153, 0.5);
    animation: pulse-glow 2s infinite;
  }

  .divider {
    height: 1px;
    background: var(--border-subtle);
    margin: var(--s-6) 0;
  }
`;

/* ============================================================================
   AI MODELS REGISTRY
   ========================================================================== */

const AI_MODELS = {
  chatgpt: {
    id: "chatgpt",
    name: "ChatGPT",
    company: "OpenAI",
    icon: Sparkles,
    badge: "ai-badge--gpt",
    color: "#10a37f",
    strengths: {
      es: ["Creatividad", "Generación rápida", "Versatilidad", "Imágenes (DALL·E)", "Code Interpreter"],
      en: ["Creativity", "Fast generation", "Versatility", "Images (DALL·E)", "Code Interpreter"],
      pt: ["Criatividade", "Geração rápida", "Versatilidade", "Imagens (DALL·E)", "Code Interpreter"],
    },
    bestFor: {
      es: "Creatividad, brainstorming, drafting, asistencia general, automatización con GPTs",
      en: "Creativity, brainstorming, drafting, general assistance, GPTs automation",
      pt: "Criatividade, brainstorming, drafting, assistência geral, automação com GPTs",
    },
    style: {
      es: "Conversacional, fluido, listas claras, tono entusiasta",
      en: "Conversational, fluid, clear lists, enthusiastic tone",
      pt: "Conversacional, fluido, listas claras, tom entusiasta",
    },
  },
  claude: {
    id: "claude",
    name: "Claude",
    company: "Anthropic",
    icon: BrainCircuit,
    badge: "ai-badge--claude",
    color: "#d97757",
    strengths: {
      es: ["Análisis profundo", "Razonamiento ético", "Textos largos", "Documentos extensos", "Honestidad calibrada"],
      en: ["Deep analysis", "Ethical reasoning", "Long-form writing", "Long documents", "Calibrated honesty"],
      pt: ["Análise profunda", "Raciocínio ético", "Textos longos", "Documentos extensos", "Honestidade calibrada"],
    },
    bestFor: {
      es: "Análisis crítico, textos largos, código profesional, ética y matices",
      en: "Critical analysis, long-form text, professional code, ethics and nuance",
      pt: "Análise crítica, textos longos, código profissional, ética e nuances",
    },
    style: {
      es: "Reflexivo, estructurado, cauteloso, transparente sobre incertidumbre",
      en: "Reflective, structured, careful, transparent about uncertainty",
      pt: "Reflexivo, estruturado, cuidadoso, transparente sobre incerteza",
    },
  },
  gemini: {
    id: "gemini",
    name: "Gemini",
    company: "Google",
    icon: Diamond,
    badge: "ai-badge--gemini",
    color: "#4285f4",
    strengths: {
      es: ["Búsqueda en tiempo real", "Integración con Google", "Multimodal nativo", "Velocidad", "Contexto enorme"],
      en: ["Real-time search", "Google integration", "Native multimodal", "Speed", "Huge context window"],
      pt: ["Busca em tempo real", "Integração com Google", "Multimodal nativo", "Velocidade", "Contexto enorme"],
    },
    bestFor: {
      es: "Búsqueda actualizada, Gmail/Docs/Drive, análisis multimodal, contexto masivo",
      en: "Up-to-date search, Gmail/Docs/Drive, multimodal analysis, massive context",
      pt: "Busca atualizada, Gmail/Docs/Drive, análise multimodal, contexto massivo",
    },
    style: {
      es: "Directo, informativo, con fuentes, orientado a hechos",
      en: "Direct, informative, with sources, fact-oriented",
      pt: "Direto, informativo, com fontes, orientado a fatos",
    },
  },
  perplexity: {
    id: "perplexity",
    name: "Perplexity",
    company: "Perplexity AI",
    icon: Search,
    badge: "ai-badge--perplexity",
    color: "#20b2aa",
    strengths: {
      es: ["Citas verificables", "Investigación web", "Respuestas con fuentes", "Información actual", "Modo Deep Research"],
      en: ["Verifiable citations", "Web research", "Sourced answers", "Current information", "Deep Research mode"],
      pt: ["Citações verificáveis", "Pesquisa web", "Respostas com fontes", "Informação atual", "Deep Research"],
    },
    bestFor: {
      es: "Investigación, fact-checking, noticias, papers académicos, due diligence",
      en: "Research, fact-checking, news, academic papers, due diligence",
      pt: "Pesquisa, fact-checking, notícias, papers acadêmicos, due diligence",
    },
    style: {
      es: "Tipo motor de búsqueda + análisis, siempre con citas numeradas",
      en: "Search-engine style + analysis, always with numbered citations",
      pt: "Estilo motor de busca + análise, sempre com citações numeradas",
    },
  },
  notebooklm: {
    id: "notebooklm",
    name: "NotebookLM",
    company: "Google",
    icon: BookOpen,
    badge: "ai-badge--notebook",
    color: "#ea4335",
    strengths: {
      es: ["Análisis de tus documentos", "Resúmenes precisos", "Audio Overviews (podcasts)", "Citas internas", "Estudio profundo"],
      en: ["Your-documents analysis", "Precise summaries", "Audio Overviews (podcasts)", "Internal citations", "Deep study"],
      pt: ["Análise dos seus docs", "Resumos precisos", "Audio Overviews (podcasts)", "Citações internas", "Estudo profundo"],
    },
    bestFor: {
      es: "Tesis, papers, libros, estudio profundo de fuentes propias, briefings",
      en: "Theses, papers, books, deep study of your own sources, briefings",
      pt: "Teses, papers, livros, estudo profundo de fontes próprias, briefings",
    },
    style: {
      es: "Fiel a tus documentos, evita inventar, cita pasajes exactos",
      en: "Faithful to your documents, avoids fabrication, cites exact passages",
      pt: "Fiel aos seus documentos, evita inventar, cita passagens exatas",
    },
  },
};

/* ============================================================================
   MODULES REGISTRY — 10 modules, each with 3 levels
   ========================================================================== */

const MODULES = [
  { id: "history", num: "01", section: "Foundations", icon: History, hasContent: true },
  { id: "what-is-prompt", num: "02", section: "Foundations", icon: MessageSquare, hasContent: true },
  { id: "anatomy", num: "03", section: "Foundations", icon: Layers, hasContent: true },
  { id: "study", num: "04", section: "Application", icon: GraduationCap, hasContent: true },
  { id: "work", num: "05", section: "Application", icon: Briefcase, hasContent: true },
  { id: "coding", num: "06", section: "Application", icon: Code2, hasContent: true },
  { id: "multimodal", num: "07", section: "Mastery", icon: ImageIcon, hasContent: true },
  { id: "context", num: "08", section: "Mastery", icon: Database, hasContent: true },
  { id: "leadership", num: "09", section: "Mastery", icon: Crown, hasContent: true },
  { id: "ethics", num: "10", section: "Mastery", icon: Scale, hasContent: true },
];

const MODULE_META = {
  es: {
    history: { title: "Historia de la Inteligencia Artificial", sub: "De Turing a los Transformers. Cómo nacieron los LLMs y por qué cambian todo." },
    "what-is-prompt": { title: "¿Qué es realmente un Prompt?", sub: "No es una pregunta. Es una especificación. Contexto, intención, claridad, restricciones." },
    anatomy: { title: "Anatomía de un Prompt Profesional", sub: "Role, task, context, constraints, tone, examples, output schema. La estructura que separa a un usuario de un arquitecto." },
    study: { title: "Prompting para Estudios Universitarios", sub: "Tesis, papers, resúmenes, análisis críticos, mapas mentales. AI como tutor, no como tramposo." },
    work: { title: "Prompting para Trabajo Profesional", sub: "Reuniones, análisis de negocio, marketing, ventas, legal, RH. AI como asistente senior." },
    coding: { title: "Prompting para Programación", sub: "Debugging, documentación, arquitectura, generación de código. ChatGPT vs Claude vs Gemini para code." },
    multimodal: { title: "Prompting Multimodal", sub: "Imágenes, PDFs, voz, video, OCR. Comunicarse con la AI más allá del texto." },
    context: { title: "Ingeniería de Contexto", sub: "Memory, embeddings, RAG, context windows, retrieval. Explicado para humanos." },
    leadership: { title: "AI para Liderazgo y Estrategia", sub: "Toma de decisiones, brainstorming, simulaciones, escenarios. AI como socio estratégico." },
    ethics: { title: "Ética y Futuro de la AI", sub: "Riesgos, sesgos, privacidad, futuro del trabajo. La coexistencia humano + AI." },
  },
  en: {
    history: { title: "History of Artificial Intelligence", sub: "From Turing to Transformers. How LLMs were born and why they change everything." },
    "what-is-prompt": { title: "What is a Prompt, really?", sub: "Not a question. A specification. Context, intent, clarity, constraints." },
    anatomy: { title: "Anatomy of a Professional Prompt", sub: "Role, task, context, constraints, tone, examples, output schema. The structure that separates a user from an architect." },
    study: { title: "Prompting for University Studies", sub: "Theses, papers, summaries, critical analysis, mind maps. AI as tutor, not cheat." },
    work: { title: "Prompting for Professional Work", sub: "Meetings, business analysis, marketing, sales, legal, HR. AI as senior assistant." },
    coding: { title: "Prompting for Programming", sub: "Debugging, documentation, architecture, code generation. ChatGPT vs Claude vs Gemini for code." },
    multimodal: { title: "Multimodal Prompting", sub: "Images, PDFs, voice, video, OCR. Communicating with AI beyond text." },
    context: { title: "Context Engineering", sub: "Memory, embeddings, RAG, context windows, retrieval. Explained for humans." },
    leadership: { title: "AI for Leadership and Strategy", sub: "Decision-making, brainstorming, simulations, scenarios. AI as strategic partner." },
    ethics: { title: "Ethics and the Future of AI", sub: "Risks, bias, privacy, the future of work. Human + AI coexistence." },
  },
  pt: {
    history: { title: "História da Inteligência Artificial", sub: "De Turing aos Transformers. Como os LLMs nasceram e por que mudam tudo." },
    "what-is-prompt": { title: "O que é um Prompt, de verdade?", sub: "Não é uma pergunta. É uma especificação. Contexto, intenção, clareza, restrições." },
    anatomy: { title: "Anatomia de um Prompt Profissional", sub: "Role, task, context, constraints, tone, examples, output schema. A estrutura que separa um usuário de um arquiteto." },
    study: { title: "Prompting para Estudos Universitários", sub: "Teses, papers, resumos, análise crítica, mapas mentais. AI como tutor, não como trapaça." },
    work: { title: "Prompting para Trabalho Profissional", sub: "Reuniões, análise de negócio, marketing, vendas, jurídico, RH. AI como assistente sênior." },
    coding: { title: "Prompting para Programação", sub: "Debugging, documentação, arquitetura, geração de código. ChatGPT vs Claude vs Gemini." },
    multimodal: { title: "Prompting Multimodal", sub: "Imagens, PDFs, voz, vídeo, OCR. Comunicar-se com a AI além do texto." },
    context: { title: "Engenharia de Contexto", sub: "Memory, embeddings, RAG, context windows, retrieval. Explicado para humanos." },
    leadership: { title: "AI para Liderança e Estratégia", sub: "Tomada de decisão, brainstorming, simulações, cenários. AI como sócio estratégico." },
    ethics: { title: "Ética e Futuro da AI", sub: "Riscos, vieses, privacidade, futuro do trabalho. Coexistência humano + AI." },
  },
};

const TOOL_PAGES = [
  { id: "evaluator", icon: Wand2, labelKey: "evaluator" },
  { id: "templates", icon: Library, labelKey: "templates" },
  { id: "battle", icon: Swords, labelKey: "battle" },
  { id: "skills", icon: Trees, labelKey: "skills" },
  { id: "capstone", icon: Trophy, labelKey: "capstone" },
];

/* ============================================================================
   SKILL TREE
   ========================================================================== */

const SKILL_TREE = [
  { id: "ai-foundations", icon: Brain, requiredModules: ["history"],
    es: { title: "AI Foundations", sub: "Comprensión del campo", desc: "Entiendes qué es la AI, cómo evolucionó y por qué los LLMs cambiaron todo." },
    en: { title: "AI Foundations", sub: "Field understanding", desc: "You understand what AI is, how it evolved, and why LLMs changed everything." },
    pt: { title: "AI Foundations", sub: "Compreensão do campo", desc: "Você entende o que é AI, como evoluiu e por que os LLMs mudaram tudo." } },
  { id: "structured-prompting", icon: Layers, requiredModules: ["what-is-prompt", "anatomy"],
    es: { title: "Structured Prompting", sub: "Anatomía profesional", desc: "Construyes prompts con role, task, context, constraints y output schema." },
    en: { title: "Structured Prompting", sub: "Professional anatomy", desc: "You build prompts with role, task, context, constraints and output schema." },
    pt: { title: "Structured Prompting", sub: "Anatomia profissional", desc: "Você cria prompts com role, task, context, constraints e output schema." } },
  { id: "ai-research", icon: Microscope, requiredModules: ["study"],
    es: { title: "AI Research", sub: "Investigación académica", desc: "Usas AI como tutor universitario: tesis, papers, análisis críticos, mapas." },
    en: { title: "AI Research", sub: "Academic research", desc: "You use AI as a university tutor: theses, papers, critical analysis, mind maps." },
    pt: { title: "AI Research", sub: "Pesquisa acadêmica", desc: "Você usa AI como tutor universitário: teses, papers, análise crítica, mapas." } },
  { id: "ai-productivity", icon: Zap, requiredModules: ["work"],
    es: { title: "AI Productivity", sub: "Trabajo profesional", desc: "Aplicas AI a reuniones, análisis, marketing, ventas, legal, RH." },
    en: { title: "AI Productivity", sub: "Professional work", desc: "You apply AI to meetings, analysis, marketing, sales, legal, HR." },
    pt: { title: "AI Productivity", sub: "Trabalho profissional", desc: "Você aplica AI a reuniões, análise, marketing, vendas, jurídico, RH." } },
  { id: "ai-coding", icon: Code2, requiredModules: ["coding"],
    es: { title: "AI Coding", sub: "Programación con AI", desc: "Debugging, documentación, arquitectura. Eliges la AI correcta para cada caso." },
    en: { title: "AI Coding", sub: "Programming with AI", desc: "Debugging, documentation, architecture. You pick the right AI for each case." },
    pt: { title: "AI Coding", sub: "Programação com AI", desc: "Debugging, documentação, arquitetura. Você escolhe a AI certa para cada caso." } },
  { id: "multimodal-prompting", icon: ImageIcon, requiredModules: ["multimodal"],
    es: { title: "Multimodal Prompting", sub: "Más allá del texto", desc: "Trabajas con imágenes, PDFs, voz, video, OCR, screenshots." },
    en: { title: "Multimodal Prompting", sub: "Beyond text", desc: "You work with images, PDFs, voice, video, OCR, screenshots." },
    pt: { title: "Multimodal Prompting", sub: "Além do texto", desc: "Você trabalha com imagens, PDFs, voz, vídeo, OCR, screenshots." } },
  { id: "context-engineering", icon: Database, requiredModules: ["context"],
    es: { title: "Context Engineering", sub: "Memoria y RAG", desc: "Diseñas el contexto: memory, embeddings, RAG, retrieval, instrucciones persistentes." },
    en: { title: "Context Engineering", sub: "Memory and RAG", desc: "You design the context: memory, embeddings, RAG, retrieval, persistent instructions." },
    pt: { title: "Context Engineering", sub: "Memória e RAG", desc: "Você desenha o contexto: memory, embeddings, RAG, retrieval, instruções persistentes." } },
  { id: "ai-leadership", icon: Crown, requiredModules: ["leadership"],
    es: { title: "AI Leadership", sub: "Estrategia y decisión", desc: "Usas AI para escenarios, brainstorming estratégico, simulaciones de decisión." },
    en: { title: "AI Leadership", sub: "Strategy and decision", desc: "You use AI for scenarios, strategic brainstorming, decision simulations." },
    pt: { title: "AI Leadership", sub: "Estratégia e decisão", desc: "Você usa AI para cenários, brainstorming estratégico, simulações de decisão." } },
  { id: "ai-systems-thinking", icon: Network, requiredModules: ["ethics", "context"],
    es: { title: "AI Systems Thinking", sub: "Visión sistémica", desc: "Piensas la AI como un sistema: ética, sesgo, impacto social, futuro del trabajo." },
    en: { title: "AI Systems Thinking", sub: "Systemic vision", desc: "You think of AI as a system: ethics, bias, social impact, future of work." },
    pt: { title: "AI Systems Thinking", sub: "Visão sistêmica", desc: "Você pensa a AI como sistema: ética, viés, impacto social, futuro do trabalho." } },
];


/* ============================================================================
   PROMPT EVALUATOR ENGINE
   Multi-dimensional scoring of user-written prompts.
   No external API — fully heuristic, deterministic, transparent.
   ========================================================================== */

const ROLE_PATTERNS = [
  /\b(actúa como|act as|aja como|behave as|pretend you are|you are an?)\b/i,
  /\b(eres un?|sos un?|sé un?|be an?|atue como)\b/i,
  /\b(experto en|expert in|especialista en|especialista em|specialist in)\b/i,
  /\b(role:|rol:|papel:|persona:)/i,
];

const FORMAT_PATTERNS = [
  /\b(en formato|in format|em formato|output:|formato:|format:|return:|responde en|respond in|responda em)\b/i,
  /\b(json|markdown|tabla|table|tabela|lista|list|csv|xml|yaml|bullet)\b/i,
  /\b(máximo \d+|maximum \d+|no más de|no more than|exactly \d+|exactamente \d+)\b/i,
];

const CONTEXT_PATTERNS = [
  /\b(contexto:|context:|background:|antecedentes:|situación:|situation:)/i,
  /\b(mi (empresa|negocio|equipo|proyecto)|my (company|business|team|project)|trabajo en|i work at|trabalho em)\b/i,
  /\b(para una audiencia|for an audience|para un público|para uma audiência|target audience)\b/i,
];

const DELIMITER_PATTERNS = [
  /```[\s\S]*?```/,
  /"""[\s\S]*?"""/,
  /<[a-z_]+>[\s\S]*?<\/[a-z_]+>/i,
  /---\s*\n[\s\S]*?\n---/,
  /\[\[[\s\S]*?\]\]/,
];

const CONSTRAINT_PATTERNS = [
  /\b(no incluyas|do not include|don't include|avoid|evita|evite|never|nunca)\b/i,
  /\b(must|debe|deve|required|requerido|obligatorio)\b/i,
  /\b(restricciones?:|constraints?:|rules?:|reglas?:|regras?:)/i,
  /\b(tono:|tone:|estilo:|style:|voice:|voz:)/i,
];

const EXAMPLE_PATTERNS = [
  /\b(por ejemplo|for example|por exemplo|e\.?g\.?|i\.?e\.?|like this:|así:|assim:)\b/i,
  /\bejemplo \d|example \d|exemplo \d\b/i,
  /\binput:[\s\S]*?output:/i,
];

const COT_PATTERNS = [
  /\b(piensa paso a paso|think step by step|pense passo a passo|step-by-step|razona|reason through)\b/i,
  /\b(primero.*luego|first.*then|primeiro.*depois|antes de responder|before answering)\b/i,
];

const AMBIGUOUS_PATTERNS = [
  /^\s*(hola|hi|hello|olá)\s*\??\s*$/i,
  /^\s*(.{1,15})\s*$/,
];

const VAGUE_WORDS = /\b(algo|some|something|bueno|good|nice|maybe|tal vez|talvez|cosas?|things?|stuff)\b/i;

function evaluatePrompt(text) {
  const t = (text || "").trim();
  const len = t.length;
  const wordCount = t.split(/\s+/).filter(Boolean).length;

  // 8 dimensions, each 0-100
  const dims = {
    clarity: 0,
    structure: 0,
    context: 0,
    intent: 0,
    delimiters: 0,
    role: 0,
    output: 0,
    specificity: 0,
    strategy: 0,
  };

  if (len === 0) {
    return { score: 0, level: "empty", dims, strengths: [], weaknesses: [], suggestions: [], bestAI: null };
  }

  // CLARITY — length, sentence structure, absence of vague words
  if (wordCount >= 8) dims.clarity += 25;
  if (wordCount >= 20) dims.clarity += 25;
  if (wordCount >= 40) dims.clarity += 15;
  if (!VAGUE_WORDS.test(t)) dims.clarity += 20;
  if (/[.?!]/.test(t)) dims.clarity += 15;
  dims.clarity = Math.min(100, dims.clarity);

  // STRUCTURE — line breaks, sections, bullets, numbered steps
  const lines = t.split(/\n/).filter(l => l.trim());
  if (lines.length >= 2) dims.structure += 25;
  if (lines.length >= 4) dims.structure += 20;
  if (/^\s*[-*•]\s+/m.test(t)) dims.structure += 20;
  if (/^\s*\d+\.\s+/m.test(t)) dims.structure += 15;
  if (/^[A-ZÁÉÍÓÚÑ#].*:\s*$/m.test(t)) dims.structure += 20;
  dims.structure = Math.min(100, dims.structure);

  // CONTEXT
  CONTEXT_PATTERNS.forEach(p => { if (p.test(t)) dims.context += 35; });
  if (wordCount > 30) dims.context += 20;
  if (/\b(porque|because|porque|since|dado que|given that)\b/i.test(t)) dims.context += 25;
  dims.context = Math.min(100, dims.context);

  // INTENT — verbs, clear goal
  const actionVerbs = /\b(analyze|analiza|analise|generate|genera|gere|write|escribe|escreva|create|crea|crie|explain|explica|explique|compare|compara|summarize|resume|resuma|translate|traduce|traduza|design|diseña|desenhe|optimize|optimiza|otimize|review|revisa|revise|extract|extrae|extraia|classify|clasifica|classifique|rewrite|reescribe|reescreva)\b/i;
  if (actionVerbs.test(t)) dims.intent += 45;
  if (/\bobjetivo:|goal:|propósito:|purpose:/i.test(t)) dims.intent += 30;
  if (wordCount >= 15) dims.intent += 15;
  if (!AMBIGUOUS_PATTERNS.some(p => p.test(t))) dims.intent += 10;
  dims.intent = Math.min(100, dims.intent);

  // DELIMITERS
  DELIMITER_PATTERNS.forEach(p => { if (p.test(t)) dims.delimiters += 50; });
  if (/\n\s*\n/.test(t)) dims.delimiters += 15;
  if (/[:]\s*\n/.test(t)) dims.delimiters += 10;
  dims.delimiters = Math.min(100, dims.delimiters);

  // ROLE
  ROLE_PATTERNS.forEach(p => { if (p.test(t)) dims.role += 40; });
  dims.role = Math.min(100, dims.role);

  // OUTPUT — formatting hints
  FORMAT_PATTERNS.forEach(p => { if (p.test(t)) dims.output += 35; });
  if (/\b(\d+\s*(palabras|words|palavras|párrafos|paragraphs|parágrafos|líneas|lines|linhas))\b/i.test(t)) dims.output += 25;
  if (/```|<output>|schema/i.test(t)) dims.output += 20;
  dims.output = Math.min(100, dims.output);

  // SPECIFICITY
  if (wordCount >= 50) dims.specificity += 30;
  if (wordCount >= 100) dims.specificity += 20;
  const numbers = (t.match(/\b\d+\b/g) || []).length;
  dims.specificity += Math.min(30, numbers * 7);
  if (/\b(específicamente|specifically|especificamente|en particular|in particular)\b/i.test(t)) dims.specificity += 15;
  CONSTRAINT_PATTERNS.forEach(p => { if (p.test(t)) dims.specificity += 8; });
  dims.specificity = Math.min(100, dims.specificity);

  // STRATEGY
  COT_PATTERNS.forEach(p => { if (p.test(t)) dims.strategy += 35; });
  EXAMPLE_PATTERNS.forEach(p => { if (p.test(t)) dims.strategy += 25; });
  if (/\b(criterios?|criteria|critérios?)\b/i.test(t)) dims.strategy += 20;
  if (/\b(audiencia|audience|audiência|target|stakeholder)\b/i.test(t)) dims.strategy += 15;
  if (/\b(pros y contras|pros and cons|prós e contras|trade-off|trade off)\b/i.test(t)) dims.strategy += 15;
  dims.strategy = Math.min(100, dims.strategy);

  // OVERALL — weighted average
  const weights = { clarity: 1.4, intent: 1.4, structure: 1.0, context: 1.1, output: 1.1, specificity: 1.2, role: 0.8, delimiters: 0.7, strategy: 0.9 };
  let weightSum = 0, scoreSum = 0;
  Object.keys(dims).forEach(k => { scoreSum += dims[k] * weights[k]; weightSum += weights[k]; });
  const score = Math.round(scoreSum / weightSum);

  // LEVEL
  let level = "beginner";
  if (score >= 92) level = "architect";
  else if (score >= 78) level = "expert";
  else if (score >= 60) level = "advanced";
  else if (score >= 38) level = "intermediate";

  // STRENGTHS & WEAKNESSES (by lang)
  const strengths = [];
  const weaknesses = [];
  Object.keys(dims).forEach(k => {
    if (dims[k] >= 70) strengths.push(k);
    else if (dims[k] < 35) weaknesses.push(k);
  });

  // SUGGESTIONS based on weaknesses
  const suggestions = generateSuggestions(t, dims, wordCount);

  // BEST AI for this prompt
  const bestAI = recommendAIForPrompt(t);

  return { score, level, dims, strengths, weaknesses, suggestions, bestAI, wordCount };
}

function generateSuggestions(text, dims, wordCount) {
  const suggestions = [];

  if (dims.clarity < 50) {
    suggestions.push({
      key: "clarity",
      es: "Expande tu prompt. Tiene menos detalle del que la AI necesita para responder bien. Apunta a 40-80 palabras mínimo para tareas no-triviales.",
      en: "Expand your prompt. It has less detail than the AI needs to answer well. Aim for 40-80 words minimum for non-trivial tasks.",
      pt: "Expanda seu prompt. Tem menos detalhe do que a AI precisa para responder bem. Mire em 40-80 palavras mínimo para tarefas não-triviais.",
    });
  }
  if (dims.role < 40) {
    suggestions.push({
      key: "role",
      es: "Asigna un rol específico al inicio. Ej: \"Actúa como editor senior de The Economist\" o \"Eres una abogada especializada en derecho laboral\".",
      en: "Assign a specific role at the start. E.g. \"Act as a senior editor at The Economist\" or \"You are a labor-law specialist attorney\".",
      pt: "Atribua um papel específico no início. Ex: \"Aja como editor sênior da Economist\" ou \"Você é uma advogada de direito trabalhista\".",
    });
  }
  if (dims.context < 40) {
    suggestions.push({
      key: "context",
      es: "Agrega contexto: quién eres, para qué audiencia es, qué situación enfrentas. La AI no adivina — necesita los antecedentes.",
      en: "Add context: who you are, who the audience is, what situation you face. The AI doesn't guess — it needs background.",
      pt: "Adicione contexto: quem você é, qual a audiência, qual a situação. A AI não adivinha — precisa do background.",
    });
  }
  if (dims.output < 40) {
    suggestions.push({
      key: "output",
      es: "Define el formato exacto de salida. Ej: \"Devuelve una tabla con 3 columnas: Riesgo / Probabilidad / Mitigación\" o \"Responde en JSON con keys: title, summary, key_points\".",
      en: "Define the exact output format. E.g. \"Return a table with 3 columns: Risk / Probability / Mitigation\" or \"Respond in JSON with keys: title, summary, key_points\".",
      pt: "Defina o formato exato. Ex: \"Devolva uma tabela com 3 colunas: Risco / Probabilidade / Mitigação\" ou \"Responda em JSON com keys: title, summary, key_points\".",
    });
  }
  if (dims.structure < 40) {
    suggestions.push({
      key: "structure",
      es: "Usa secciones con títulos: ROL: / CONTEXTO: / TAREA: / FORMATO: / RESTRICCIONES:. La estructura visual ayuda al modelo a parsear tu intención.",
      en: "Use titled sections: ROLE: / CONTEXT: / TASK: / FORMAT: / CONSTRAINTS:. Visual structure helps the model parse your intent.",
      pt: "Use seções com títulos: PAPEL: / CONTEXTO: / TAREFA: / FORMATO: / RESTRIÇÕES:. A estrutura visual ajuda o modelo a entender sua intenção.",
    });
  }
  if (dims.delimiters < 30 && wordCount > 30) {
    suggestions.push({
      key: "delimiters",
      es: "Usa delimitadores para separar instrucción de datos: ```código```, \"\"\"texto\"\"\", o tags <documento>...</documento>. Evita ambigüedad.",
      en: "Use delimiters to separate instructions from data: ```code```, \"\"\"text\"\"\", or <document>...</document> tags. Avoid ambiguity.",
      pt: "Use delimitadores para separar instrução de dados: ```código```, \"\"\"texto\"\"\", ou tags <documento>...</documento>. Evite ambiguidade.",
    });
  }
  if (dims.intent < 50) {
    suggestions.push({
      key: "intent",
      es: "Empieza con un verbo de acción claro: Analiza / Genera / Compara / Resume / Diseña. Evita preguntas vagas como \"¿qué piensas?\".",
      en: "Start with a clear action verb: Analyze / Generate / Compare / Summarize / Design. Avoid vague questions like \"what do you think?\".",
      pt: "Comece com um verbo de ação claro: Analise / Gere / Compare / Resuma / Desenhe. Evite perguntas vagas como \"o que acha?\".",
    });
  }
  if (dims.strategy < 40 && wordCount > 25) {
    suggestions.push({
      key: "strategy",
      es: "Pide razonamiento explícito: \"Piensa paso a paso antes de responder\" o \"Lista 3 hipótesis, evalúa cada una, luego concluye\".",
      en: "Ask for explicit reasoning: \"Think step by step before answering\" or \"List 3 hypotheses, evaluate each, then conclude\".",
      pt: "Peça raciocínio explícito: \"Pense passo a passo antes de responder\" ou \"Liste 3 hipóteses, avalie cada uma, depois conclua\".",
    });
  }
  if (dims.specificity < 40) {
    suggestions.push({
      key: "specificity",
      es: "Sé específico con números, plazos, audiencia, restricciones. \"Resume en 5 viñetas de máximo 20 palabras cada una para ejecutivos C-level\".",
      en: "Be specific with numbers, deadlines, audience, constraints. \"Summarize in 5 bullets of max 20 words each for C-level executives\".",
      pt: "Seja específico com números, prazos, audiência, restrições. \"Resuma em 5 bullets de máximo 20 palavras cada para executivos C-level\".",
    });
  }

  return suggestions;
}

function recommendAIForPrompt(text) {
  const t = text.toLowerCase();
  const scores = { chatgpt: 0, claude: 0, gemini: 0, perplexity: 0, notebooklm: 0 };

  // Research / sources / citations
  if (/\b(investig|research|fuentes?|sources?|citas?|citations?|paper|académico|academic|fact.check|últimas? noticias|latest news|notícias?)\b/.test(t)) {
    scores.perplexity += 35; scores.gemini += 15;
  }
  // Long analytical / ethical / nuanced
  if (/\b(analiz|analy|análisis|analysis|análise|ético|ethic|matiz|nuance|crítico|critical|profundo|deep|estratég|strateg|reflexion|reflect)\b/.test(t)) {
    scores.claude += 30; scores.chatgpt += 10;
  }
  // Coding
  if (/\b(código|code|coding|programa|debug|función|function|api|refactor|class|método|method|python|javascript|typescript|java\b|rust|go\b)\b/.test(t)) {
    scores.claude += 25; scores.chatgpt += 20; scores.gemini += 10;
  }
  // Creative / brainstorming / image
  if (/\b(creativ|brainstorm|idea|story|cuento|conto|poem|poesía|imagen|image|dibuja|draw|ilustr)\b/.test(t)) {
    scores.chatgpt += 30; scores.gemini += 15; scores.claude += 10;
  }
  // Documents / studying / books / theses
  if (/\b(documento|document|pdf|libro|book|livro|tesis|thesis|tese|estudiar|study|estudar|notas|notes|notas)\b/.test(t)) {
    scores.notebooklm += 30; scores.claude += 20;
  }
  // Real-time / today / now / current
  if (/\b(hoy|today|hoje|ahora|now|agora|reciente|recent|este mes|this month|este año|this year|actual|current)\b/.test(t)) {
    scores.perplexity += 30; scores.gemini += 25;
  }
  // Google ecosystem
  if (/\b(gmail|drive|docs|sheets|calendar|youtube|google)\b/.test(t)) {
    scores.gemini += 35;
  }
  // Long-form writing
  if ((t.match(/\s+/g) || []).length > 100) {
    scores.claude += 15;
  }
  // Generic / short / casual
  if (t.length < 60) {
    scores.chatgpt += 10;
  }

  const best = Object.keys(scores).sort((a, b) => scores[b] - scores[a])[0];
  return scores[best] > 0 ? best : "chatgpt";
}

const LEVEL_INFO = {
  empty: { es: "Vacío", en: "Empty", pt: "Vazio", color: "var(--text-tertiary)" },
  beginner: { es: "Principiante", en: "Beginner", pt: "Iniciante", color: "var(--danger)" },
  intermediate: { es: "Intermedio", en: "Intermediate", pt: "Intermediário", color: "var(--warning)" },
  advanced: { es: "Avanzado", en: "Advanced", pt: "Avançado", color: "var(--cyan)" },
  expert: { es: "Experto", en: "Expert", pt: "Especialista", color: "var(--accent)" },
  architect: { es: "Arquitecto AI", en: "AI Architect", pt: "Arquiteto AI", color: "var(--gold)" },
};

const DIM_LABELS = {
  clarity: { es: "Claridad", en: "Clarity", pt: "Clareza" },
  structure: { es: "Estructura", en: "Structure", pt: "Estrutura" },
  context: { es: "Contexto", en: "Context", pt: "Contexto" },
  intent: { es: "Intención", en: "Intent", pt: "Intenção" },
  delimiters: { es: "Delimitadores", en: "Delimiters", pt: "Delimitadores" },
  role: { es: "Rol", en: "Role", pt: "Papel" },
  output: { es: "Output", en: "Output", pt: "Output" },
  specificity: { es: "Especificidad", en: "Specificity", pt: "Especificidade" },
  strategy: { es: "Estrategia", en: "Strategy", pt: "Estratégia" },
};

function buildOptimizedPrompt(original, lang) {
  const role = lang === "es" ? "Actúa como un especialista senior con 15 años de experiencia en el área correspondiente."
    : lang === "pt" ? "Aja como um especialista sênior com 15 anos de experiência na área correspondente."
    : "Act as a senior specialist with 15 years of experience in the relevant area.";
  const context = lang === "es" ? "CONTEXTO: [Describe aquí tu situación, audiencia y antecedentes específicos]."
    : lang === "pt" ? "CONTEXTO: [Descreva aqui sua situação, audiência e antecedentes específicos]."
    : "CONTEXT: [Describe here your situation, audience and specific background].";
  const task = lang === "es" ? `TAREA:\n${original.trim() || "[Tu tarea aquí]"}`
    : lang === "pt" ? `TAREFA:\n${original.trim() || "[Sua tarefa aqui]"}`
    : `TASK:\n${original.trim() || "[Your task here]"}`;
  const constraints = lang === "es" ? "RESTRICCIONES:\n- Sé específico, evita generalidades\n- Si falta información, pregúntame antes de asumir\n- Cita fuentes cuando aplique"
    : lang === "pt" ? "RESTRIÇÕES:\n- Seja específico, evite generalidades\n- Se faltar informação, pergunte antes de assumir\n- Cite fontes quando aplicável"
    : "CONSTRAINTS:\n- Be specific, avoid generalities\n- If information is missing, ask before assuming\n- Cite sources where applicable";
  const format = lang === "es" ? "FORMATO DE SALIDA:\n1. Resumen ejecutivo (3 líneas)\n2. Análisis detallado por secciones\n3. Próximos pasos accionables"
    : lang === "pt" ? "FORMATO DE SAÍDA:\n1. Resumo executivo (3 linhas)\n2. Análise detalhada por seções\n3. Próximos passos acionáveis"
    : "OUTPUT FORMAT:\n1. Executive summary (3 lines)\n2. Detailed analysis by sections\n3. Actionable next steps";
  const reasoning = lang === "es" ? "Antes de responder, piensa paso a paso y verifica que tu respuesta cumpla las restricciones."
    : lang === "pt" ? "Antes de responder, pense passo a passo e verifique que sua resposta cumpre as restrições."
    : "Before answering, think step by step and verify that your response meets the constraints.";

  return `${role}\n\n${context}\n\n${task}\n\n${constraints}\n\n${format}\n\n${reasoning}`;
}

function buildExpertPrompt(original, lang) {
  if (lang === "es") {
    return `# ROL
Eres un consultor estratégico senior, ex-McKinsey, con experiencia en transformación organizacional y análisis riguroso.

# CONTEXTO
<contexto>
[Reemplaza con: industria, tamaño de empresa, mercado, etapa, principales restricciones, audiencia final]
</contexto>

# TAREA
${original.trim() || "[Describe la tarea concreta]"}

# CRITERIOS DE CALIDAD
- Cada afirmación debe estar respaldada por razonamiento o datos
- Si la pregunta está mal planteada, reformúlala antes de responder
- Distingue claramente entre hechos, hipótesis y opinión
- Identifica los 3 supuestos más críticos detrás de tu respuesta

# RESTRICCIONES
- Evita generalidades de management book ("piense fuera de la caja")
- No uses jerga sin definirla
- Si la información disponible no es suficiente, dilo explícitamente

# FORMATO DE SALIDA
\`\`\`
1. TL;DR (máx. 3 viñetas, una línea cada una)
2. Diagnóstico (qué está realmente en juego)
3. 3 opciones estratégicas con trade-offs explícitos
4. Recomendación con justificación
5. Riesgos clave y cómo mitigarlos
6. Métricas de éxito (KPIs específicos)
\`\`\`

# RAZONAMIENTO
Piensa paso a paso. Antes de dar tu recomendación final, juega abogado del diablo contra tu propia conclusión.`;
  }
  if (lang === "pt") {
    return `# PAPEL
Você é um consultor estratégico sênior, ex-McKinsey, com experiência em transformação organizacional e análise rigorosa.

# CONTEXTO
<contexto>
[Substitua com: indústria, tamanho da empresa, mercado, estágio, principais restrições, audiência final]
</contexto>

# TAREFA
${original.trim() || "[Descreva a tarefa concreta]"}

# CRITÉRIOS DE QUALIDADE
- Cada afirmação deve ter respaldo em raciocínio ou dados
- Se a pergunta está mal formulada, reformule antes de responder
- Distinga claramente fatos, hipóteses e opinião
- Identifique os 3 pressupostos mais críticos da sua resposta

# RESTRIÇÕES
- Evite generalidades de livro de management ("pense fora da caixa")
- Não use jargão sem definir
- Se a informação não é suficiente, diga isso explicitamente

# FORMATO DE SAÍDA
\`\`\`
1. TL;DR (máx. 3 bullets, uma linha cada)
2. Diagnóstico (o que está realmente em jogo)
3. 3 opções estratégicas com trade-offs explícitos
4. Recomendação com justificativa
5. Riscos-chave e mitigação
6. Métricas de sucesso (KPIs específicos)
\`\`\`

# RACIOCÍNIO
Pense passo a passo. Antes da recomendação final, faça advogado do diabo contra sua própria conclusão.`;
  }
  return `# ROLE
You are a senior strategy consultant, ex-McKinsey, with deep experience in organizational transformation and rigorous analysis.

# CONTEXT
<context>
[Replace with: industry, company size, market, stage, key constraints, final audience]
</context>

# TASK
${original.trim() || "[Describe the concrete task]"}

# QUALITY CRITERIA
- Every claim must be backed by reasoning or data
- If the question is mis-framed, reframe it before answering
- Clearly distinguish fact, hypothesis and opinion
- Identify the 3 most critical assumptions behind your answer

# CONSTRAINTS
- Avoid management-book generalities ("think outside the box")
- Don't use jargon without defining it
- If available information is insufficient, say so explicitly

# OUTPUT FORMAT
\`\`\`
1. TL;DR (max 3 bullets, one line each)
2. Diagnosis (what is really at stake)
3. 3 strategic options with explicit trade-offs
4. Recommendation with justification
5. Key risks and how to mitigate
6. Success metrics (specific KPIs)
\`\`\`

# REASONING
Think step by step. Before your final recommendation, play devil's advocate against your own conclusion.`;
}


/* ============================================================================
   PROMPT TEMPLATES LIBRARY — 24 professional prompts across 8 categories
   ========================================================================== */

const TEMPLATES = [
  // STUDY
  { id: "tpl-paper-summary", category: "study", icon: ScrollText,
    es: { title: "Resumen crítico de paper", body: `Actúa como profesor titular de una universidad de investigación.

Voy a darte el contenido de un paper académico. Tu tarea:

1. Resumen ejecutivo (5 líneas máximo)
2. Pregunta de investigación y por qué es relevante
3. Metodología en lenguaje accesible
4. Hallazgos clave (3-5 viñetas)
5. Limitaciones que los autores reconocen
6. Limitaciones que los autores NO mencionan pero deberían
7. Cómo este paper conversa con [campo X]

Paper:
"""
[PEGA AQUÍ EL PAPER]
"""

Antes de responder, lee dos veces y piensa qué falta entender antes de afirmar nada.` },
    en: { title: "Critical paper summary", body: `Act as a tenured professor at a research university.

I will give you the content of an academic paper. Your task:

1. Executive summary (5 lines max)
2. Research question and why it matters
3. Methodology in accessible language
4. Key findings (3-5 bullets)
5. Limitations the authors acknowledge
6. Limitations the authors do NOT mention but should
7. How this paper converses with [field X]

Paper:
"""
[PASTE PAPER HERE]
"""

Before answering, read twice and think what you need to understand before asserting anything.` },
    pt: { title: "Resumo crítico de paper", body: `Aja como professor titular de uma universidade de pesquisa.

Vou te dar o conteúdo de um paper acadêmico. Sua tarefa:

1. Resumo executivo (5 linhas máximo)
2. Pergunta de pesquisa e por que importa
3. Metodologia em linguagem acessível
4. Achados-chave (3-5 bullets)
5. Limitações que os autores reconhecem
6. Limitações que os autores NÃO mencionam mas deveriam
7. Como este paper conversa com [campo X]

Paper:
"""
[COLE O PAPER AQUI]
"""

Antes de responder, leia duas vezes e pense o que falta entender antes de afirmar.` } },

  { id: "tpl-study-plan", category: "study", icon: Calculator,
    es: { title: "Plan de estudio para examen", body: `Eres un coach académico que prepara estudiantes para exámenes complejos.

Necesito un plan de estudio de [X días] para [TEMA/MATERIA].

Mi nivel actual: [PRINCIPIANTE / INTERMEDIO / AVANZADO]
Horas disponibles por día: [N]
Estilo de aprendizaje: [VISUAL / LECTURA / PRÁCTICA]

Diséñame:
1. Roadmap día-por-día con objetivos medibles
2. Recursos recomendados (libros, videos, papers) por nivel
3. Técnicas de estudio para cada tipo de contenido (memorización, comprensión, aplicación)
4. Mini-quizzes para auto-evaluación cada 3 días
5. Red flags que indiquen que necesito ajustar el plan

No incluyas relleno. Cada hora debe estar justificada.` },
    en: { title: "Exam study plan", body: `You are an academic coach preparing students for complex exams.

I need a study plan of [X days] for [TOPIC/SUBJECT].

My current level: [BEGINNER / INTERMEDIATE / ADVANCED]
Hours available per day: [N]
Learning style: [VISUAL / READING / PRACTICE]

Design:
1. Day-by-day roadmap with measurable objectives
2. Recommended resources (books, videos, papers) per level
3. Study techniques for each content type (memorization, comprehension, application)
4. Mini-quizzes for self-assessment every 3 days
5. Red flags that indicate the plan needs adjustment

No filler. Every hour must be justified.` },
    pt: { title: "Plano de estudo para prova", body: `Você é um coach acadêmico que prepara estudantes para provas complexas.

Preciso de um plano de estudo de [X dias] para [TEMA/MATÉRIA].

Meu nível atual: [INICIANTE / INTERMEDIÁRIO / AVANÇADO]
Horas disponíveis por dia: [N]
Estilo de aprendizagem: [VISUAL / LEITURA / PRÁTICA]

Desenhe:
1. Roadmap dia-a-dia com objetivos mensuráveis
2. Recursos recomendados (livros, vídeos, papers) por nível
3. Técnicas de estudo para cada tipo de conteúdo
4. Mini-quizzes a cada 3 dias
5. Red flags que indicam necessidade de ajustar o plano

Sem enchimento. Cada hora deve estar justificada.` } },

  { id: "tpl-mindmap", category: "study", icon: Network,
    es: { title: "Mapa mental de un tema", body: `Actúa como pedagogo experto en visualización del conocimiento.

Construye un mapa mental textual para el tema: [TEMA]

Estructura:
- Nodo central
- 5-7 ramas principales
- 3-5 sub-ramas por rama
- Conexiones cruzadas entre ramas relacionadas (marca con →)
- Para cada nodo hoja: una frase de 1 línea que capture la idea

Devuelve en formato markdown jerárquico. Al final, lista las 3 conexiones más sorprendentes entre ramas.` },
    en: { title: "Topic mind map", body: `Act as a pedagogue expert in knowledge visualization.

Build a textual mind map for the topic: [TOPIC]

Structure:
- Central node
- 5-7 main branches
- 3-5 sub-branches per branch
- Cross-connections between related branches (mark with →)
- For each leaf node: a one-line phrase capturing the idea

Return as hierarchical markdown. At the end, list the 3 most surprising connections.` },
    pt: { title: "Mapa mental de um tema", body: `Aja como pedagogo expert em visualização de conhecimento.

Construa um mapa mental textual para o tema: [TEMA]

Estrutura:
- Nó central
- 5-7 ramos principais
- 3-5 sub-ramos por ramo
- Conexões cruzadas (marque com →)
- Para cada folha: uma frase de 1 linha

Devolva em markdown hierárquico. No final, liste as 3 conexões mais surpreendentes.` } },

  // WORK
  { id: "tpl-meeting-summary", category: "work", icon: Mic,
    es: { title: "Resumen ejecutivo de reunión", body: `Eres asistente ejecutivo de un C-level. Tu valor está en sintetizar sin perder lo crítico.

Te paso la transcripción de una reunión. Devuelve:

DECISIONES TOMADAS
- [bullet por decisión con responsable y deadline]

ACUERDOS PENDIENTES
- [bullets con dueño]

TENSIONES SIN RESOLVER
- [identifica desacuerdos no resueltos, no los suavices]

PRÓXIMOS PASOS
- [acciones concretas con quién y cuándo]

CONTEXTO PARA AUSENTES
- [3 líneas máximo para que un ausente entienda lo esencial]

Transcripción:
"""
[PEGA TRANSCRIPCIÓN]
"""

Sé brutal con el filtro. Una reunión bien resumida cabe en 200 palabras.` },
    en: { title: "Executive meeting summary", body: `You are executive assistant to a C-level. Your value is synthesizing without losing the critical.

I'll give you a meeting transcript. Return:

DECISIONS MADE
- [bullet per decision with owner and deadline]

PENDING AGREEMENTS
- [bullets with owner]

UNRESOLVED TENSIONS
- [identify unresolved disagreements, don't smooth them]

NEXT STEPS
- [concrete actions with who and when]

CONTEXT FOR ABSENTEES
- [3 lines max so an absentee gets the essentials]

Transcript:
"""
[PASTE TRANSCRIPT]
"""

Be brutal with the filter. A well-summarized meeting fits in 200 words.` },
    pt: { title: "Resumo executivo de reunião", body: `Você é assistente executivo de um C-level. Seu valor é sintetizar sem perder o crítico.

Envio a transcrição. Devolva:

DECISÕES TOMADAS
- [bullet por decisão com responsável e prazo]

ACORDOS PENDENTES
- [bullets com dono]

TENSÕES NÃO RESOLVIDAS
- [identifique desacordos não resolvidos, não suavize]

PRÓXIMOS PASSOS
- [ações concretas com quem e quando]

CONTEXTO PARA AUSENTES
- [3 linhas máximo]

Transcrição:
"""
[COLE A TRANSCRIÇÃO]
"""

Seja brutal com o filtro. Uma reunião bem resumida cabe em 200 palavras.` } },

  { id: "tpl-feedback", category: "work", icon: Users,
    es: { title: "Feedback profesional difícil", body: `Actúa como coach ejecutivo entrenado en comunicación no violenta y feedback radical.

Necesito redactar feedback para [NOMBRE / ROL] sobre [SITUACIÓN].

Hechos observables:
- [LISTA HECHOS, NO INTERPRETACIONES]

Impacto que tuvo:
- [DESCRIBE EL IMPACTO CONCRETO]

Lo que necesito que cambie:
- [COMPORTAMIENTO ESPERADO]

Genérame:
1. Versión escrita para email (formal, clara)
2. Script para conversación 1:1 (con pausas y preguntas)
3. 3 posibles reacciones del receptor y cómo responder a cada una

Tono: firme + respetuoso. Nada de pasivo-agresivo. Nada de "sándwich" forzado.` },
    en: { title: "Hard professional feedback", body: `Act as an executive coach trained in non-violent communication and radical feedback.

I need to write feedback for [NAME / ROLE] about [SITUATION].

Observable facts:
- [LIST FACTS, NOT INTERPRETATIONS]

Impact it had:
- [CONCRETE IMPACT]

What I need to change:
- [EXPECTED BEHAVIOR]

Generate:
1. Written email version (formal, clear)
2. Script for 1:1 conversation (with pauses and questions)
3. 3 possible reactions and how to respond to each

Tone: firm + respectful. No passive-aggressive. No forced "sandwich".` },
    pt: { title: "Feedback profissional difícil", body: `Aja como coach executivo treinado em comunicação não-violenta e feedback radical.

Preciso redigir feedback para [NOME / PAPEL] sobre [SITUAÇÃO].

Fatos observáveis:
- [LISTA DE FATOS]

Impacto que teve:
- [IMPACTO CONCRETO]

O que preciso que mude:
- [COMPORTAMENTO ESPERADO]

Gere:
1. Versão escrita para email
2. Script para conversa 1:1
3. 3 reações possíveis e como responder

Tom: firme + respeitoso.` } },

  { id: "tpl-decision", category: "work", icon: GitBranch,
    es: { title: "Marco de decisión 2x2", body: `Eres consultor estratégico. Quiero decidir entre [OPCIÓN A] vs [OPCIÓN B] para [DECISIÓN].

Mi situación: [DESCRIBE CONTEXTO Y RESTRICCIONES]
Mi objetivo: [LO QUE QUIERO LOGRAR]
Plazo de decisión: [CUÁNDO]

Construye:
1. Matriz 2x2 con dimensiones relevantes
2. Para cada opción: 3 mejores casos / 3 peores casos
3. ¿Qué información me falta que cambiaría la decisión?
4. Si tuvieras que decidir por mí ahora con esta info, ¿qué elegirías y por qué?
5. ¿Qué señales debo monitorear los próximos 30 días?

No me digas "depende". Toma una posición y defiéndela.` },
    en: { title: "2x2 decision framework", body: `You are a strategy consultant. I want to decide between [OPTION A] vs [OPTION B] for [DECISION].

Situation: [DESCRIBE CONTEXT AND CONSTRAINTS]
Goal: [WHAT I WANT TO ACHIEVE]
Decision deadline: [WHEN]

Build:
1. 2x2 matrix with relevant dimensions
2. For each option: 3 best cases / 3 worst cases
3. What information am I missing that would change the decision?
4. If you had to decide for me now, what would you pick and why?
5. What signals should I monitor in the next 30 days?

Don't tell me "it depends". Take a position and defend it.` },
    pt: { title: "Framework de decisão 2x2", body: `Você é consultor estratégico. Quero decidir entre [OPÇÃO A] vs [OPÇÃO B] para [DECISÃO].

Situação: [CONTEXTO E RESTRIÇÕES]
Objetivo: [O QUE QUERO ALCANÇAR]
Prazo: [QUANDO]

Construa:
1. Matriz 2x2 com dimensões relevantes
2. Para cada opção: 3 melhores casos / 3 piores casos
3. Que informação me falta que mudaria a decisão?
4. Se tivesse que decidir agora, o que escolheria e por quê?
5. Que sinais monitorar nos próximos 30 dias?

Não diga "depende". Tome uma posição.` } },

  // CODING
  { id: "tpl-code-review", category: "coding", icon: FileCode2,
    es: { title: "Code review profesional", body: `Actúa como tech lead senior con 15 años en sistemas de producción.

Revisa el siguiente código y devuelve:

1. RESUMEN DE 3 LÍNEAS
   - Qué hace
   - Calidad general (escala 1-10)
   - Bloqueante para merge: sí/no

2. ISSUES POR SEVERIDAD
   - 🔴 BLOQUEANTES (bugs, seguridad, data loss)
   - 🟡 IMPORTANTES (performance, mantenibilidad, edge cases)
   - 🟢 NICE-TO-HAVE (estilo, naming, refactor)

3. SUGERENCIAS CONCRETAS
   - Para cada issue, propón el fix exacto en código

4. PREGUNTAS PARA EL AUTOR
   - Decisiones de diseño que necesitan justificación

Código:
\`\`\`
[PEGA EL CÓDIGO]
\`\`\`

Stack: [LENGUAJE / FRAMEWORK]
Contexto: [PARA QUÉ ES, NIVEL DE CRITICIDAD]` },
    en: { title: "Professional code review", body: `Act as a senior tech lead with 15 years in production systems.

Review the following code and return:

1. 3-LINE SUMMARY
   - What it does
   - Overall quality (scale 1-10)
   - Merge blocker: yes/no

2. ISSUES BY SEVERITY
   - 🔴 BLOCKERS (bugs, security, data loss)
   - 🟡 IMPORTANT (performance, maintainability, edge cases)
   - 🟢 NICE-TO-HAVE (style, naming, refactor)

3. CONCRETE SUGGESTIONS
   - For each issue, propose the exact code fix

4. QUESTIONS FOR THE AUTHOR
   - Design decisions needing justification

Code:
\`\`\`
[PASTE CODE]
\`\`\`

Stack: [LANGUAGE / FRAMEWORK]
Context: [WHAT IT'S FOR, CRITICALITY LEVEL]` },
    pt: { title: "Code review profissional", body: `Aja como tech lead sênior com 15 anos em sistemas de produção.

Revise o código e devolva:

1. RESUMO DE 3 LINHAS
2. ISSUES POR SEVERIDADE
   - 🔴 BLOQUEANTES
   - 🟡 IMPORTANTES
   - 🟢 NICE-TO-HAVE
3. SUGESTÕES CONCRETAS COM CÓDIGO
4. PERGUNTAS PARA O AUTOR

Código:
\`\`\`
[COLE O CÓDIGO]
\`\`\`

Stack: [LINGUAGEM / FRAMEWORK]
Contexto: [PARA QUE É, NÍVEL DE CRITICIDADE]` } },

  { id: "tpl-debug", category: "coding", icon: Beaker,
    es: { title: "Debugging asistido", body: `Eres un ingeniero senior que ha visto miles de bugs. Tu fuerza es no asumir nada y verificar todo.

Tengo un bug. Antes de proponer fix:
1. Lista las 5 hipótesis más probables (en orden de probabilidad)
2. Para cada una, qué experimento ejecuto para confirmarla o descartarla (el más barato primero)
3. Qué información adicional necesitas de mí

Comportamiento esperado:
[QUÉ DEBERÍA PASAR]

Comportamiento real:
[QUÉ PASA]

Pasos para reproducir:
[STEPS]

Código relevante:
\`\`\`
[CÓDIGO]
\`\`\`

Logs/errores:
\`\`\`
[LOGS]
\`\`\`

No propongas fix antes de tener confirmada la hipótesis.` },
    en: { title: "Assisted debugging", body: `You are a senior engineer who has seen thousands of bugs. Your strength is assuming nothing and verifying everything.

I have a bug. Before proposing a fix:
1. List the 5 most likely hypotheses (in probability order)
2. For each, what experiment to confirm or rule out (cheapest first)
3. What additional info you need from me

Expected behavior:
[WHAT SHOULD HAPPEN]

Actual behavior:
[WHAT HAPPENS]

Steps to reproduce:
[STEPS]

Relevant code:
\`\`\`
[CODE]
\`\`\`

Logs/errors:
\`\`\`
[LOGS]
\`\`\`

Don't propose a fix until a hypothesis is confirmed.` },
    pt: { title: "Debug assistido", body: `Você é engenheiro sênior que viu milhares de bugs. Sua força é não assumir nada.

Tenho um bug. Antes de propor fix:
1. Liste as 5 hipóteses mais prováveis (em ordem)
2. Para cada, que experimento (o mais barato primeiro)
3. Que info adicional precisa

Comportamento esperado:
[ESPERADO]

Comportamento real:
[REAL]

Steps:
[REPRODUÇÃO]

Código:
\`\`\`
[CÓDIGO]
\`\`\`

Logs:
\`\`\`
[LOGS]
\`\`\`

Não proponha fix sem confirmar hipótese.` } },

  { id: "tpl-architecture", category: "coding", icon: Network,
    es: { title: "Diseño de arquitectura", body: `Actúa como arquitecto de software con experiencia en sistemas distribuidos a escala.

Necesito diseñar [SISTEMA / FEATURE].

Requisitos funcionales: [LISTA]
Requisitos no funcionales:
- Carga esperada: [USUARIOS / RPS]
- Latencia objetivo: [MS]
- Disponibilidad: [99.X%]
- Restricciones de costo: [BUDGET]

Stack actual: [TECNOLOGÍAS]

Entrega:
1. Diagrama textual de la arquitectura propuesta (cajas y flechas en ASCII o markdown)
2. Decisiones clave con su justificación (DB, queue, cache, etc.)
3. 2 alternativas de arquitectura con trade-offs
4. Plan de implementación por fases
5. Riesgos técnicos y mitigación

Si los requisitos están incompletos, pregúntame antes de seguir.` },
    en: { title: "Architecture design", body: `Act as a software architect experienced in distributed systems at scale.

I need to design [SYSTEM / FEATURE].

Functional reqs: [LIST]
Non-functional reqs:
- Expected load: [USERS / RPS]
- Target latency: [MS]
- Availability: [99.X%]
- Cost constraints: [BUDGET]

Current stack: [TECHNOLOGIES]

Deliver:
1. Textual diagram of proposed architecture (ASCII/markdown boxes and arrows)
2. Key decisions with justification (DB, queue, cache, etc.)
3. 2 architecture alternatives with trade-offs
4. Phased implementation plan
5. Technical risks and mitigation

If requirements are incomplete, ask before proceeding.` },
    pt: { title: "Design de arquitetura", body: `Aja como arquiteto de software experiente em sistemas distribuídos em escala.

Preciso desenhar [SISTEMA / FEATURE].

Reqs funcionais: [LISTA]
Reqs não-funcionais:
- Carga: [USUÁRIOS / RPS]
- Latência: [MS]
- Disponibilidade: [99.X%]
- Custo: [BUDGET]

Stack: [TECNOLOGIAS]

Entregue:
1. Diagrama textual
2. Decisões-chave com justificativa
3. 2 alternativas com trade-offs
4. Plano por fases
5. Riscos e mitigação

Se reqs estão incompletos, pergunte antes.` } },

  // CREATIVE
  { id: "tpl-story", category: "creative", icon: PenTool,
    es: { title: "Historia con voz propia", body: `Eres escritor profesional con voz literaria propia, similar a [REFERENCIA: Cortázar / Saunders / etc.].

Escribe una historia corta (800-1200 palabras) con estas restricciones:

Premisa: [PREMISA]
Tono: [DRAMA / HUMOR NEGRO / FÁBULA / NOIR]
POV: [PRIMERA / TERCERA LIMITADA / OMNISCIENTE]
Restricciones formales: [Ej: sin diálogos / en presente / un solo párrafo]

Reglas:
- Nada de clichés ni frases hechas
- Cada oración debe ganar su lugar
- Final que reverbera, no final que explica
- Permitido el riesgo: una imagen extraña, una decisión narrativa atrevida

Antes de escribir, dame:
1. 3 ideas de premisa expandida
2. La que más resuena contigo y por qué
Después escribe esa.` },
    en: { title: "Short story with voice", body: `You are a professional writer with your own literary voice, similar to [REFERENCE: Saunders / Carver / etc.].

Write a short story (800-1200 words) with these constraints:

Premise: [PREMISE]
Tone: [DRAMA / DARK HUMOR / FABLE / NOIR]
POV: [FIRST / LIMITED THIRD / OMNISCIENT]
Formal constraints: [E.g. no dialogue / present tense / single paragraph]

Rules:
- No clichés or stock phrases
- Every sentence must earn its place
- Ending that reverberates, not ending that explains
- Risk is allowed: a strange image, a bold narrative decision

Before writing, give me:
1. 3 expanded premise ideas
2. The one that resonates most and why
Then write that one.` },
    pt: { title: "Conto com voz própria", body: `Você é escritor profissional com voz literária própria, similar a [REFERÊNCIA].

Escreva um conto (800-1200 palavras) com:

Premissa: [PREMISSA]
Tom: [DRAMA / HUMOR NEGRO / FÁBULA / NOIR]
POV: [PRIMEIRA / TERCEIRA LIMITADA / ONISCIENTE]
Restrições formais: [Ex: sem diálogos / no presente]

Regras:
- Sem clichês
- Cada frase deve ganhar seu lugar
- Final que reverbera, não que explica
- Risco permitido

Antes de escrever:
1. 3 ideias de premissa expandida
2. A que mais ressoa e por quê
Depois escreva.` } },

  { id: "tpl-ad-copy", category: "creative", icon: Megaphone,
    es: { title: "Copy publicitario por ángulo", body: `Eres copy chief con experiencia en agencias top (Wieden, Mother, AKQA).

Producto: [PRODUCTO]
Audiencia: [AUDIENCIA]
Beneficio principal: [BENEFICIO]
Canal: [INSTAGRAM / LINKEDIN / TV / BILLBOARD]

Genera 5 ángulos de copy distintos. Para cada ángulo:
1. Insight psicológico que activa
2. Headline (máx. 10 palabras)
3. Subhead (1 frase)
4. CTA (3 palabras)

Restricciones:
- Nada de superlativos vacíos ("la mejor", "increíble")
- Verbos en activo
- Cada ángulo debe ser radicalmente distinto al anterior
- Si el producto es aburrido, di la verdad y úsala
Al final: ranking de mejor a peor con justificación.` },
    en: { title: "Ad copy by angle", body: `You are a copy chief with experience at top agencies (Wieden, Mother, AKQA).

Product: [PRODUCT]
Audience: [AUDIENCE]
Main benefit: [BENEFIT]
Channel: [INSTAGRAM / LINKEDIN / TV / BILLBOARD]

Generate 5 distinct copy angles. For each:
1. Psychological insight it activates
2. Headline (max 10 words)
3. Subhead (one sentence)
4. CTA (3 words)

Constraints:
- No empty superlatives ("the best", "amazing")
- Active verbs
- Each angle radically different from previous
- If the product is boring, say the truth and use it
End with: ranking best to worst with justification.` },
    pt: { title: "Copy publicitário por ângulo", body: `Você é copy chief com experiência em agências top.

Produto: [PRODUTO]
Audiência: [AUDIÊNCIA]
Benefício: [BENEFÍCIO]
Canal: [INSTAGRAM / LINKEDIN / TV]

Gere 5 ângulos de copy. Para cada:
1. Insight psicológico
2. Headline (máx 10 palavras)
3. Subhead
4. CTA (3 palavras)

Sem superlativos vazios. Cada ângulo radicalmente distinto.` } },

  // BUSINESS
  { id: "tpl-swot", category: "business", icon: BarChart3,
    es: { title: "Análisis competitivo profundo", body: `Actúa como analista de estrategia competitiva con experiencia en consultoría top-tier.

Empresa a analizar: [EMPRESA]
Industria: [INDUSTRIA]
Pregunta específica: [QUÉ QUIERO ENTENDER]

Construye:

1. MAPA DEL CAMPO DE BATALLA
   - Quiénes son los 5 jugadores relevantes y su posicionamiento
   - Cómo se segmenta el mercado realmente (no las segmentaciones obvias)

2. ANÁLISIS DE LA EMPRESA OBJETIVO
   - Sus 3 ventajas competitivas reales (no las que dice tener)
   - Sus 3 vulnerabilidades estructurales
   - Tesis: ¿por qué gana o pierde la próxima década?

3. MOVIMIENTOS PROBABLES
   - 2 jugadas que esperarías de ellos
   - 2 jugadas que NO esperarían los competidores

4. SEÑALES DÉBILES
   - Qué métricas/eventos monitorear

Cita fuentes cuando hagas afirmaciones empíricas. Si no las tienes, márcalo como hipótesis.` },
    en: { title: "Deep competitive analysis", body: `Act as a competitive strategy analyst with top-tier consulting experience.

Company to analyze: [COMPANY]
Industry: [INDUSTRY]
Specific question: [WHAT I WANT TO UNDERSTAND]

Build:

1. BATTLEFIELD MAP
   - Who are the 5 relevant players and their positioning
   - How the market really segments (not the obvious segmentations)

2. TARGET COMPANY ANALYSIS
   - Their 3 real competitive advantages (not the ones they claim)
   - Their 3 structural vulnerabilities
   - Thesis: why they win or lose the next decade?

3. PROBABLE MOVES
   - 2 plays you'd expect from them
   - 2 plays competitors would NOT expect

4. WEAK SIGNALS
   - Metrics/events to monitor

Cite sources for empirical claims. If you don't have them, mark as hypothesis.` },
    pt: { title: "Análise competitiva profunda", body: `Aja como analista de estratégia competitiva top-tier.

Empresa: [EMPRESA]
Indústria: [INDÚSTRIA]
Pergunta: [O QUE QUERO ENTENDER]

Construa:
1. MAPA DO CAMPO DE BATALHA
2. ANÁLISE DA EMPRESA-ALVO (vantagens reais, vulnerabilidades, tese)
3. MOVIMENTOS PROVÁVEIS
4. SINAIS FRACOS

Cite fontes para afirmações empíricas.` } },

  { id: "tpl-pitch", category: "business", icon: Rocket,
    es: { title: "Pitch deck narrativo", body: `Eres ex-partner de un fondo de VC de primer nivel. Has visto miles de pitches y sabes qué hace que un pitch funcione (o muera).

Mi negocio: [DESCRIPCIÓN EN 2 LÍNEAS]
Mercado: [MERCADO Y TAMAÑO]
Tracción actual: [MÉTRICAS REALES]
Ronda buscada: [MONTO / VALUACIÓN OBJETIVO]
Audiencia: [SEMILLA / SERIES A / B]

Construye el outline de un pitch de 10 slides siguiendo la narrativa de Sequoia:
1. Company purpose (1 frase)
2. Problem (concreto, sentido)
3. Solution (cómo es radicalmente distinta)
4. Why now (la ventana temporal)
5. Market size (TAM/SAM/SOM con metodología)
6. Competition (mapa honesto)
7. Product (demo o roadmap)
8. Business model
9. Team (por qué nosotros)
10. Financials + ask

Para cada slide:
- Mensaje central (1 línea memorable)
- Datos/visuales clave
- Trampa común que evitar

Al final: 5 preguntas filosas que un VC me va a hacer y cómo responder.` },
    en: { title: "Narrative pitch deck", body: `You are an ex-partner at a top-tier VC fund. You've seen thousands of pitches and know what makes one work (or die).

My business: [2-LINE DESCRIPTION]
Market: [MARKET AND SIZE]
Current traction: [REAL METRICS]
Round sought: [AMOUNT / TARGET VALUATION]
Audience: [SEED / SERIES A / B]

Build the outline of a 10-slide pitch following Sequoia's narrative:
1. Company purpose
2. Problem (concrete, felt)
3. Solution (how it's radically different)
4. Why now
5. Market size (TAM/SAM/SOM with methodology)
6. Competition (honest map)
7. Product
8. Business model
9. Team (why us)
10. Financials + ask

For each slide:
- Central message (one memorable line)
- Key data/visuals
- Common trap to avoid

End with: 5 sharp questions a VC will ask and how to answer.` },
    pt: { title: "Pitch deck narrativo", body: `Você é ex-sócio de um fundo de VC top-tier.

Meu negócio: [DESCRIÇÃO 2 LINHAS]
Mercado: [MERCADO E TAMANHO]
Tração: [MÉTRICAS REAIS]
Rodada: [VALOR / VALUATION]
Audiência: [SEED / SÉRIE A / B]

Outline de pitch de 10 slides (narrativa Sequoia).
Para cada slide: mensagem central, dados, armadilha comum.
No final: 5 perguntas afiadas de VC e como responder.` } },

  // RESEARCH
  { id: "tpl-literature", category: "research", icon: BookMarked,
    es: { title: "Revisión de literatura inicial", body: `Actúa como investigador con doctorado en [DISCIPLINA].

Pregunta de investigación: [PREGUNTA]
Disciplina: [CAMPO]
Nivel: [TESIS / PAPER / EXPLORATORIO]

Necesito un mapa inicial:

1. AUTORES SEMINALES (5-7)
   - Por qué cada uno importa
   - Su obra clave

2. ESCUELAS DE PENSAMIENTO
   - 3-5 corrientes con sus tesis principales
   - Dónde discrepan entre sí

3. ESTADO DEL ARTE
   - Qué se considera resuelto
   - Qué sigue abierto
   - Qué se debate intensamente

4. KEYWORDS PARA BÚSQUEDA
   - 10 términos para buscar en Google Scholar / JSTOR

5. POSIBLES GAPS
   - 3 huecos en la literatura donde una contribución sería valiosa

Marca claramente qué afirmaciones son de conocimiento general y cuáles requieren verificación con fuentes específicas.` },
    en: { title: "Initial literature review", body: `Act as a researcher with PhD in [DISCIPLINE].

Research question: [QUESTION]
Discipline: [FIELD]
Level: [THESIS / PAPER / EXPLORATORY]

I need an initial map:

1. SEMINAL AUTHORS (5-7)
   - Why each matters
   - Their key work

2. SCHOOLS OF THOUGHT
   - 3-5 currents with their main theses
   - Where they disagree

3. STATE OF THE ART
   - What's considered settled
   - What remains open
   - What's intensely debated

4. SEARCH KEYWORDS
   - 10 terms for Google Scholar / JSTOR

5. POSSIBLE GAPS
   - 3 holes where a contribution would be valuable

Clearly mark which claims are general knowledge vs. which need source verification.` },
    pt: { title: "Revisão de literatura inicial", body: `Aja como pesquisador com doutorado em [DISCIPLINA].

Pergunta: [PERGUNTA]
Disciplina: [CAMPO]
Nível: [TESE / PAPER / EXPLORATÓRIO]

Mapa inicial:
1. Autores seminais (5-7)
2. Escolas de pensamento (3-5)
3. Estado da arte
4. Keywords para busca (10)
5. Possíveis gaps (3)

Marque claramente conhecimento geral vs verificação necessária.` } },

  // PRODUCTIVITY
  { id: "tpl-week-plan", category: "productivity", icon: Workflow,
    es: { title: "Planificación semanal por prioridades", body: `Actúa como coach de productividad nivel ejecutivo. Filosofía: pocas cosas, muy bien, sin culpa.

Objetivos del trimestre: [OBJETIVOS]
Esta semana, lo no negociable: [DEADLINES / COMPROMISOS]
Energía actual (1-10): [N]
Horas reales disponibles: [N]

Diseña mi semana:

LUNES-VIERNES
- 1-3 prioridades por día (no más)
- Para cada prioridad: bloque de tiempo + output esperado

REGLAS
- Una sola "big rock" por día
- Mañanas para trabajo profundo (sin reuniones)
- Tardes para reactivo / colaboración

CIRCUIT BREAKERS
- Qué hacer si un fuego rompe el plan
- Qué postergar sin culpa si la semana se complica

FIN DE SEMANA
- Bloque corto de revisión y reset

Sé honesto: si lo que pido no cabe en las horas disponibles, dilo y propón qué cortar.` },
    en: { title: "Weekly planning by priority", body: `Act as an executive-level productivity coach. Philosophy: few things, done well, without guilt.

Quarter objectives: [OBJECTIVES]
This week, non-negotiables: [DEADLINES / COMMITMENTS]
Current energy (1-10): [N]
Real hours available: [N]

Design my week:

MONDAY-FRIDAY
- 1-3 priorities per day (no more)
- For each: time block + expected output

RULES
- Single "big rock" per day
- Mornings for deep work (no meetings)
- Afternoons for reactive / collaboration

CIRCUIT BREAKERS
- What to do if a fire breaks the plan
- What to defer guilt-free if the week complicates

WEEKEND
- Short review and reset block

Be honest: if what I'm asking doesn't fit, say so and propose what to cut.` },
    pt: { title: "Planejamento semanal por prioridades", body: `Aja como coach de produtividade executivo.

Objetivos do trimestre: [OBJETIVOS]
Não-negociáveis da semana: [DEADLINES]
Energia (1-10): [N]
Horas reais: [N]

Desenhe minha semana:
- 1-3 prioridades/dia (max)
- Manhãs: deep work
- Tardes: reativo
- Circuit breakers
- Revisão de fim de semana

Seja honesto: se não cabe, diga o que cortar.` } },

  // ANALYSIS
  { id: "tpl-data-analysis", category: "analysis", icon: LineChart,
    es: { title: "Análisis de datos exploratorio", body: `Actúa como analista senior de datos. Pragmático, escéptico, orientado a decisión.

Te paso un conjunto de datos. Tu tarea:

1. DESCRIPCIÓN
   - Qué tenemos (variables, tipos, n)
   - Calidad de los datos (missing, outliers, sesgos visibles)

2. PREGUNTAS NATURALES
   - 5 preguntas que los datos sugieren responder

3. PRIMER ANÁLISIS
   - Para 2-3 de esas preguntas, qué nos dicen los datos
   - Cuantifica (medias, distribuciones, correlaciones)
   - Marca claramente lo descriptivo vs lo causal

4. CAVEATS
   - Qué no se puede concluir con estos datos
   - Qué datos adicionales serían valiosos

5. RECOMENDACIÓN
   - Si tuvieras que decidir hoy con esto, ¿qué?

Datos:
"""
[PEGA DATOS / DESCRIPCIÓN]
"""

No inventes números. Si necesitas calcular algo, dilo y propón el método.` },
    en: { title: "Exploratory data analysis", body: `Act as a senior data analyst. Pragmatic, skeptical, decision-oriented.

I give you a dataset. Your task:

1. DESCRIPTION
   - What we have (variables, types, n)
   - Data quality (missing, outliers, visible biases)

2. NATURAL QUESTIONS
   - 5 questions the data suggests answering

3. FIRST ANALYSIS
   - For 2-3 of those questions, what the data says
   - Quantify (means, distributions, correlations)
   - Clearly mark descriptive vs causal

4. CAVEATS
   - What can't be concluded from this data
   - What additional data would be valuable

5. RECOMMENDATION
   - If you had to decide today with this, what?

Data:
"""
[PASTE DATA / DESCRIPTION]
"""

Don't fabricate numbers. If you need to compute something, say so and propose method.` },
    pt: { title: "Análise exploratória de dados", body: `Aja como analista sênior de dados.

Envio dataset. Tarefa:
1. Descrição (variáveis, qualidade)
2. 5 perguntas naturais
3. Primeira análise para 2-3
4. Caveats
5. Recomendação

Dados:
"""
[DADOS / DESCRIÇÃO]
"""

Não invente números.` } },

  { id: "tpl-risk", category: "analysis", icon: AlertTriangle,
    es: { title: "Análisis de riesgo profesional", body: `Actúa como risk officer de una empresa global. Tu trabajo es ver lo que otros no quieren ver.

Situación: [SITUACIÓN]
Decisión / acción evaluada: [DECISIÓN]
Horizonte temporal: [PLAZO]

Construye una matriz de riesgos:

| Riesgo | Probabilidad | Impacto | Severidad | Mitigación | Owner |

Cobertura mínima:
- 3 riesgos operacionales
- 2 riesgos financieros
- 2 riesgos reputacionales / legales
- 2 riesgos de mercado / competencia
- 1 riesgo "cisne negro" (baja prob, alto impacto)
- 1 riesgo que solo se ve al ejecutar (riesgo emergente)

Para los 3 más severos:
- Plan de mitigación detallado
- Indicador temprano que avisaría que el riesgo se está materializando

Sé incómodo. Tu valor es decir las cosas que el equipo no quiere oír.` },
    en: { title: "Professional risk analysis", body: `Act as risk officer at a global company. Your job is to see what others don't want to see.

Situation: [SITUATION]
Decision/action evaluated: [DECISION]
Time horizon: [TIMEFRAME]

Build a risk matrix:

| Risk | Probability | Impact | Severity | Mitigation | Owner |

Min coverage:
- 3 operational risks
- 2 financial risks
- 2 reputational / legal risks
- 2 market / competition risks
- 1 "black swan" risk (low prob, high impact)
- 1 emergent risk (only visible on execution)

For the 3 most severe:
- Detailed mitigation plan
- Early indicator that warns the risk is materializing

Be uncomfortable. Your value is saying what the team doesn't want to hear.` },
    pt: { title: "Análise de risco profissional", body: `Aja como risk officer global.

Situação: [SITUAÇÃO]
Decisão: [DECISÃO]
Horizonte: [PRAZO]

Matriz de riscos cobrindo: operacionais, financeiros, reputacionais, mercado, cisne negro, emergente.

Para os 3 mais severos: plano detalhado + indicador antecipado.

Seja incômodo.` } },
];

/* ============================================================================
   CAPSTONE SCENARIOS — final evaluation
   ========================================================================== */

const CAPSTONE_CASES = [
  { id: "cap-business",
    icon: Building2,
    es: { title: "Transformación empresarial", scenario: "Eres consultor estratégico contratado por el CEO de una empresa familiar de manufactura (450 empleados, 60 años, márgenes en descenso 3 años seguidos). El CEO quiere usar AI para 're-inventar la empresa', pero no sabe por dónde empezar. La junta espera resultados en 6 meses. Diseña el prompt que usarías con una AI top para producir el primer diagnóstico estratégico." },
    en: { title: "Business transformation", scenario: "You are a strategy consultant hired by the CEO of a family manufacturing company (450 employees, 60 years old, margins declining for 3 years). The CEO wants to use AI to 'reinvent the company' but doesn't know where to start. The board expects results in 6 months. Design the prompt you'd use with a top AI to produce the first strategic diagnosis." },
    pt: { title: "Transformação empresarial", scenario: "Você é consultor estratégico contratado pelo CEO de uma manufatureira familiar (450 funcionários, 60 anos, margens caindo há 3 anos). O CEO quer usar AI para 'reinventar a empresa' mas não sabe por onde começar. A diretoria espera resultados em 6 meses. Desenhe o prompt para o primeiro diagnóstico." } },
  { id: "cap-research",
    icon: Microscope,
    es: { title: "Investigación universitaria", scenario: "Eres estudiante de doctorado en ciencias sociales. Tu tema: 'Impacto del trabajo remoto en la salud mental de profesionales jóvenes post-pandemia'. Necesitas que la AI te ayude a construir un marco teórico riguroso, identificar gaps en la literatura existente y diseñar la metodología más adecuada (mixta). El comité de tesis es exigente. Diseña el prompt que enviarías." },
    en: { title: "University research", scenario: "You are a PhD student in social sciences. Topic: 'Impact of remote work on the mental health of young professionals post-pandemic'. You need AI to help build a rigorous theoretical framework, identify gaps in existing literature, and design the most appropriate (mixed) methodology. The thesis committee is demanding. Design the prompt." },
    pt: { title: "Pesquisa universitária", scenario: "Você é doutorando em ciências sociais. Tema: 'Impacto do trabalho remoto na saúde mental de jovens profissionais pós-pandemia'. Precisa que a AI ajude a construir marco teórico rigoroso, identificar gaps na literatura e desenhar metodologia mista. Banca exigente. Desenhe o prompt." } },
  { id: "cap-automation",
    icon: Workflow,
    es: { title: "Automatización profesional", scenario: "Eres director de operaciones de una empresa de servicios. Tu equipo de 12 personas dedica 40% de su tiempo a tareas repetitivas: triage de tickets, redacción de reportes semanales y reconciliación de datos entre 3 sistemas. Tienes presupuesto limitado pero acceso a las AIs principales. Diseña el prompt maestro que estructura un workflow automatizado con AI." },
    en: { title: "Professional automation", scenario: "You are operations director at a services company. Your 12-person team spends 40% of time on repetitive tasks: ticket triage, weekly report drafting, and data reconciliation across 3 systems. Limited budget but access to top AIs. Design the master prompt structuring an AI-automated workflow." },
    pt: { title: "Automação profissional", scenario: "Você é diretor de operações em empresa de serviços. Equipe de 12 dedica 40% do tempo a tarefas repetitivas: triagem de tickets, relatórios semanais e reconciliação de dados entre 3 sistemas. Orçamento limitado mas acesso às AIs principais. Desenhe o prompt mestre do workflow." } },
  { id: "cap-strategic",
    icon: Telescope,
    es: { title: "Análisis estratégico", scenario: "Eres VP de estrategia. La competencia acaba de lanzar un producto que canibaliza el tuyo. Tu CEO te pide en 48 horas una respuesta estratégica completa: análisis del movimiento del competidor, opciones de respuesta con trade-offs, y recomendación con plan de ejecución. Diseña el prompt que te dé el mejor punto de partida posible." },
    en: { title: "Strategic analysis", scenario: "You are VP of strategy. A competitor just launched a product that cannibalizes yours. The CEO asks you in 48 hours for a full strategic response: competitor move analysis, response options with trade-offs, recommendation with execution plan. Design the prompt that gives you the best possible starting point." },
    pt: { title: "Análise estratégica", scenario: "Você é VP de estratégia. Concorrente lançou produto que canibaliza o seu. CEO pede em 48h resposta estratégica completa: análise do movimento, opções com trade-offs, recomendação com plano. Desenhe o prompt." } },
];


/* ============================================================================
   PRIMITIVE COMPONENTS
   ========================================================================== */

function Card({ children, className = "", style }) {
  return <div className={`card ${className}`} style={style}>{children}</div>;
}

function Section({ title, eyebrow, children, icon: Icon }) {
  return (
    <section className="section">
      {eyebrow && <div className="section-eyebrow">{eyebrow}</div>}
      {title && (
        <h2 className="section-title">
          {Icon && <Icon size={22} className="section-title-icon" />}
          <span>{title}</span>
        </h2>
      )}
      {children}
    </section>
  );
}

function ChipRow({ items, className = "" }) {
  return (
    <div className={`chip-row ${className}`}>
      {items.map((it, i) => (
        <span key={i} className="chip">
          {it.icon && <it.icon size={13} />}
          {it.label || it}
        </span>
      ))}
    </div>
  );
}

function AlertBox({ kind = "info", title, children, icon: Icon }) {
  const defaults = {
    info: Info, success: CheckCircle2, warn: AlertTriangle,
    danger: AlertOctagon, mentor: Sparkles, idea: Lightbulb,
  };
  const ResolvedIcon = Icon || defaults[kind] || Info;
  return (
    <div className={`alert alert-${kind}`}>
      <div className="alert-icon"><ResolvedIcon size={18} /></div>
      <div className="alert-body">
        {title && <div className="alert-title">{title}</div>}
        <div className="alert-text">{children}</div>
      </div>
    </div>
  );
}

function CodeBlock({ code, lang = "txt", label, copyKey }) {
  const [copied, setCopied] = useState(false);
  const onCopy = useCallback(() => {
    try {
      navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch (e) { /* noop */ }
  }, [code]);
  return (
    <div className="code-block">
      <div className="code-head">
        <div className="code-label">
          <Terminal size={12} />
          <span>{label || lang.toUpperCase()}</span>
        </div>
        <button className="code-copy" onClick={onCopy} aria-label="Copy code">
          {copied ? <Check size={13} /> : <Copy size={13} />}
          <span>{copied ? "Copied" : "Copy"}</span>
        </button>
      </div>
      <pre className="code-body"><code>{code}</code></pre>
    </div>
  );
}

function Checklist({ items, storageKey }) {
  const [state, setState] = usePersistentState(storageKey, {});
  const toggle = (i) => setState((s) => ({ ...s, [i]: !s[i] }));
  return (
    <ul className="checklist">
      {items.map((it, i) => {
        const done = !!state[i];
        return (
          <li key={i} className={`check-item ${done ? "done" : ""}`} onClick={() => toggle(i)}>
            <span className="check-box">{done && <Check size={12} />}</span>
            <span className="check-text">{it}</span>
          </li>
        );
      })}
    </ul>
  );
}

function QuizCard({ question, options, correctIndex, explanation, storageKey }) {
  const [picked, setPicked] = usePersistentState(storageKey, null);
  const answered = picked !== null;
  const isCorrect = picked === correctIndex;
  return (
    <div className="quiz">
      <div className="quiz-q">
        <HelpCircle size={16} />
        <span>{question}</span>
      </div>
      <div className="quiz-opts">
        {options.map((opt, i) => {
          let cls = "quiz-opt";
          if (answered) {
            if (i === correctIndex) cls += " correct";
            else if (i === picked) cls += " wrong";
            else cls += " muted";
          }
          return (
            <button key={i} className={cls} onClick={() => !answered && setPicked(i)} disabled={answered}>
              <span className="quiz-bullet">{String.fromCharCode(65 + i)}</span>
              <span>{opt}</span>
              {answered && i === correctIndex && <Check size={14} className="quiz-mark" />}
              {answered && i === picked && i !== correctIndex && <X size={14} className="quiz-mark" />}
            </button>
          );
        })}
      </div>
      {answered && (
        <div className={`quiz-explain ${isCorrect ? "ok" : "no"}`}>
          <Sparkles size={14} />
          <span>{explanation}</span>
        </div>
      )}
    </div>
  );
}

function CompareCards({ bad, good }) {
  return (
    <div className="compare-grid">
      <div className="compare-card bad">
        <div className="compare-head">
          <X size={14} />
          <span>{bad.label}</span>
        </div>
        <div className="compare-body">{bad.text}</div>
        {bad.notes && <div className="compare-notes">{bad.notes}</div>}
      </div>
      <div className="compare-card good">
        <div className="compare-head">
          <Check size={14} />
          <span>{good.label}</span>
        </div>
        <div className="compare-body">{good.text}</div>
        {good.notes && <div className="compare-notes">{good.notes}</div>}
      </div>
    </div>
  );
}

function LevelTabs({ levels, active, onChange }) {
  return (
    <div className="level-tabs" role="tablist">
      {levels.map((lv) => (
        <button
          key={lv.id}
          role="tab"
          aria-selected={active === lv.id}
          className={`level-tab ${active === lv.id ? "active" : ""}`}
          onClick={() => onChange(lv.id)}
        >
          <lv.icon size={14} />
          <span>{lv.label}</span>
        </button>
      ))}
    </div>
  );
}

function Timeline({ items }) {
  return (
    <ol className="timeline">
      {items.map((it, i) => (
        <li key={i} className="timeline-item">
          <div className="timeline-marker">
            <span className="timeline-dot" />
            {i !== items.length - 1 && <span className="timeline-line" />}
          </div>
          <div className="timeline-content">
            <div className="timeline-head">
              <span className="timeline-year">{it.year}</span>
              <span className="timeline-title">{it.title}</span>
            </div>
            <div className="timeline-body">{it.body}</div>
          </div>
        </li>
      ))}
    </ol>
  );
}

function AIBadge({ id, size = "sm" }) {
  const model = AI_MODELS[id];
  if (!model) return null;
  const Icon = model.icon || Sparkles;
  return (
    <span className={`ai-badge --${id} size-${size}`} style={{ "--ai-color": model.color }}>
      <Icon size={size === "lg" ? 16 : 12} />
      <span>{model.name}</span>
    </span>
  );
}

function ScoreGauge({ value, level, label }) {
  const radius = 64;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (value / 100) * circumference;
  const colorVar = `var(--gauge-${level || "intermediate"})`;
  return (
    <div className="score-gauge">
      <svg viewBox="0 0 160 160" className="gauge-svg">
        <circle cx="80" cy="80" r={radius} className="gauge-track" />
        <circle
          cx="80" cy="80" r={radius}
          className="gauge-fill"
          style={{
            strokeDasharray: circumference,
            strokeDashoffset: offset,
            stroke: colorVar,
          }}
        />
      </svg>
      <div className="gauge-center">
        <div className="gauge-value">{Math.round(value)}</div>
        <div className="gauge-suffix">/ 100</div>
        {label && <div className="gauge-label">{label}</div>}
      </div>
    </div>
  );
}

function DimensionBar({ label, score, hint }) {
  const pct = Math.max(0, Math.min(100, score));
  const tone = pct >= 75 ? "high" : pct >= 50 ? "mid" : "low";
  return (
    <div className={`dim-row tone-${tone}`}>
      <div className="dim-label">
        <span>{label}</span>
        <span className="dim-score">{Math.round(pct)}</span>
      </div>
      <div className="dim-track">
        <div className="dim-fill" style={{ width: `${pct}%` }} />
      </div>
      {hint && <div className="dim-hint">{hint}</div>}
    </div>
  );
}


/* ============================================================================
   SHELL — Sidebar, Header, Hero, ModuleHeader
   ========================================================================== */

function Sidebar({ open, onClose, activeIdx, activeView, onPickModule, onPickTool, completed, totalProgress, lang, setLang }) {
  const t = useT();
  const sectionGroups = useMemo(() => {
    const g = { foundations: [], application: [], mastery: [] };
    MODULES.forEach((m, i) => g[m.section]?.push({ ...m, idx: i }));
    return g;
  }, []);

  const [query, setQuery] = useState("");
  const filterFn = (m) => !query || (MODULE_META[m.id]?.[lang]?.title || "").toLowerCase().includes(query.toLowerCase());

  return (
    <aside className={`sidebar ${open ? "open" : ""}`}>
      <div className="sidebar-inner">
        <div className="brand">
          <div className="brand-mark"><BrainCircuit size={20} /></div>
          <div className="brand-text">
            <div className="brand-name">{t("brand.name")}</div>
            <div className="brand-sub">{t("brand.sub")}</div>
          </div>
        </div>

        <div className="search-box">
          <Search size={14} />
          <input
            type="text"
            placeholder={t("nav.search")}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            aria-label={t("nav.search")}
          />
          {query && <button className="search-clear" onClick={() => setQuery("")} aria-label="Clear"><X size={12} /></button>}
        </div>

        <nav className="nav">
          {["foundations", "application", "mastery"].map((sec) => {
            const items = sectionGroups[sec].filter(filterFn);
            if (!items.length) return null;
            return (
              <div key={sec} className="nav-group">
                <div className="nav-group-title">{t(`nav.section.${sec}`)}</div>
                {items.map((m) => {
                  const Icon = m.icon;
                  const isActive = activeView === "module" && activeIdx === m.idx;
                  const isDone = completed[m.id];
                  return (
                    <button
                      key={m.id}
                      className={`nav-item ${isActive ? "active" : ""} ${isDone ? "done" : ""}`}
                      onClick={() => { onPickModule(m.idx); onClose(); }}
                    >
                      <span className="nav-num">{String(m.num).padStart(2, "0")}</span>
                      <Icon size={15} className="nav-icon" />
                      <span className="nav-label">{MODULE_META[m.id]?.[lang]?.title}</span>
                      {isDone && <CheckCircle2 size={13} className="nav-done" />}
                    </button>
                  );
                })}
              </div>
            );
          })}

          <div className="nav-group">
            <div className="nav-group-title">{t("nav.section.tools")}</div>
            {TOOL_PAGES.map((tool) => {
              const Icon = tool.icon;
              const isActive = activeView === tool.id;
              return (
                <button
                  key={tool.id}
                  className={`nav-item tool ${isActive ? "active" : ""}`}
                  onClick={() => { onPickTool(tool.id); onClose(); }}
                >
                  <Icon size={15} className="nav-icon" />
                  <span className="nav-label">{t(`nav.tool.${tool.id}`)}</span>
                </button>
              );
            })}
          </div>
        </nav>

        <div className="sidebar-foot">
          <div className="progress-card">
            <div className="progress-head">
              <div className="progress-title">
                <Trophy size={13} />
                <span>{t("nav.progress")}</span>
              </div>
              <div className="progress-pct">{Math.round(totalProgress)}%</div>
            </div>
            <div className="progress-track">
              <div className="progress-fill" style={{ width: `${totalProgress}%` }} />
            </div>
            <div className="progress-meta">
              {Object.values(completed).filter(Boolean).length} / {MODULES.length} {t("nav.modules")}
            </div>
          </div>

          <div className="lang-switch">
            <Globe size={12} />
            {[
              { code: "es", label: "ES" },
              { code: "en", label: "EN" },
              { code: "pt", label: "PT" },
            ].map((l) => (
              <button
                key={l.code}
                className={`lang-opt ${lang === l.code ? "active" : ""}`}
                onClick={() => setLang(l.code)}
              >{l.label}</button>
            ))}
          </div>
        </div>
      </div>
    </aside>
  );
}

function Header({ activeView, activeIdx, onToggleSidebar, totalProgress, lang, onMarkComplete, completedThis }) {
  const t = useT();
  const m = MODULES[activeIdx];
  const isTool = activeView !== "module";
  const toolDef = TOOL_PAGES.find((tt) => tt.id === activeView);
  const Icon = isTool ? toolDef?.icon : m?.icon;
  const title = isTool ? t(`nav.tool.${activeView}`) : MODULE_META[m?.id]?.[lang]?.title;
  return (
    <header className="header">
      <button className="hamburger" onClick={onToggleSidebar} aria-label="Toggle menu">
        <Menu size={18} />
      </button>
      <div className="crumb">
        {Icon && <Icon size={14} className="crumb-icon" />}
        <span className="crumb-section">{isTool ? t("nav.section.tools") : t(`nav.section.${m?.section}`)}</span>
        <ChevronRight size={12} className="crumb-sep" />
        <span className="crumb-current">{title}</span>
      </div>
      <div className="header-right">
        {!isTool && m && (
          <button
            className={`mark-done ${completedThis ? "is-done" : ""}`}
            onClick={onMarkComplete}
          >
            {completedThis ? <CheckCircle2 size={13} /> : <Circle size={13} />}
            <span>{completedThis ? t("module.completed") : t("module.markDone")}</span>
          </button>
        )}
        <div className="header-progress" title={`${Math.round(totalProgress)}%`}>
          <div className="header-progress-fill" style={{ width: `${totalProgress}%` }} />
        </div>
      </div>
    </header>
  );
}

function Hero({ onCTAClick, onPickTool }) {
  const t = useT();
  return (
    <section className="hero">
      <div className="hero-bg">
        <div className="hero-glow g1" />
        <div className="hero-glow g2" />
        <div className="hero-grid-bg" />
      </div>
      <div className="hero-inner">
        <div className="hero-eyebrow">
          <Sparkles size={12} />
          <span>{t("hero.eyebrow")}</span>
        </div>
        <h1 className="hero-title">
          <span className="hero-title-1">{t("hero.title1")}</span>
          <span className="hero-title-2">{t("hero.title2")}</span>
        </h1>
        <p className="hero-tag">{t("hero.tag")}</p>

        <div className="hero-quote">
          <Quote size={16} className="quote-icon" />
          <div className="quote-text">{t("hero.quote")}</div>
          <div className="quote-cite">— {t("hero.quoteAuthor")}</div>
        </div>

        <div className="hero-meta">
          {[
            { icon: Layers, value: "10", label: t("hero.meta.modules") },
            { icon: GraduationCap, value: "3", label: t("hero.meta.levels") },
            { icon: Wrench, value: "5", label: t("hero.meta.tools") },
            { icon: Sparkles, value: "17+", label: t("hero.meta.templates") },
          ].map((m, i) => (
            <div key={i} className="hero-meta-tile">
              <m.icon size={16} className="hero-meta-icon" />
              <div className="hero-meta-value">{m.value}</div>
              <div className="hero-meta-label">{m.label}</div>
            </div>
          ))}
        </div>

        <div className="hero-cta-row">
          <button className="cta-primary" onClick={onCTAClick}>
            <Rocket size={15} />
            <span>{t("hero.cta")}</span>
            <ArrowRight size={15} />
          </button>
          <button className="cta-ghost" onClick={() => onPickTool("evaluator")}>
            <Wand2 size={14} />
            <span>{t("hero.ctaSecondary")}</span>
          </button>
        </div>

        <div className="hero-ai-row">
          <span className="hero-ai-label">{t("hero.coversAI")}:</span>
          {Object.keys(AI_MODELS).map((id) => <AIBadge key={id} id={id} />)}
        </div>
      </div>
    </section>
  );
}

function ModuleHeader({ module, lang }) {
  const meta = MODULE_META[module.id]?.[lang];
  const Icon = module.icon;
  return (
    <div className="module-head">
      <div className="module-head-row">
        <div className="module-head-icon"><Icon size={22} /></div>
        <div className="module-head-text">
          <div className="module-head-num">
            <span>{`Module ${String(module.num).padStart(2, "0")}`}</span>
            <span className="dot-sep">·</span>
            <span className="module-head-section">{module.section}</span>
          </div>
          <h1 className="module-head-title">{meta?.title}</h1>
          <p className="module-head-sub">{meta?.sub}</p>
        </div>
      </div>
    </div>
  );
}

function ModuleNav({ activeIdx, onNav }) {
  const t = useT();
  const prev = activeIdx > 0 ? MODULES[activeIdx - 1] : null;
  const next = activeIdx < MODULES.length - 1 ? MODULES[activeIdx + 1] : null;
  const lang = useContext(I18nContext).lang;
  return (
    <div className="module-nav">
      <button
        className="module-nav-btn prev"
        disabled={!prev}
        onClick={() => prev && onNav(activeIdx - 1)}
      >
        <ChevronLeft size={14} />
        <div className="module-nav-text">
          <span className="module-nav-label">{t("module.previous")}</span>
          <span className="module-nav-title">{prev ? MODULE_META[prev.id]?.[lang]?.title : "—"}</span>
        </div>
      </button>
      <button
        className="module-nav-btn next"
        disabled={!next}
        onClick={() => next && onNav(activeIdx + 1)}
      >
        <div className="module-nav-text right">
          <span className="module-nav-label">{t("module.next")}</span>
          <span className="module-nav-title">{next ? MODULE_META[next.id]?.[lang]?.title : "—"}</span>
        </div>
        <ChevronRight size={14} />
      </button>
    </div>
  );
}


/* ============================================================================
   MODULE RENDERERS — Foundations
   ========================================================================== */

const LEVEL_DEFS = [
  { id: "foundations", icon: Sprout, key: "module.level.foundations" },
  { id: "advanced", icon: Mountain, key: "module.level.advanced" },
  { id: "expert", icon: Crown, key: "module.level.expert" },
];

function useModuleLevel(moduleId, defaultLevel = "foundations") {
  const [activeLevels, setActiveLevels] = usePersistentState(KEYS.LEVELS, {});
  const current = activeLevels[moduleId] || defaultLevel;
  const setLevel = (lv) => setActiveLevels((s) => ({ ...s, [moduleId]: lv }));
  return [current, setLevel];
}

function LevelTabsBound({ moduleId }) {
  const t = useT();
  const [level, setLevel] = useModuleLevel(moduleId);
  const levels = LEVEL_DEFS.map((lv) => ({ ...lv, label: t(lv.key) }));
  return { level, setLevel, view: <LevelTabs levels={levels} active={level} onChange={setLevel} /> };
}

/* ── Module 1: History of AI ───────────────────────────────────────────── */

function HistoryModule({ lang }) {
  const t = useT();
  const { level, view } = LevelTabsBound({ moduleId: "history" });

  const timelineFoundations = {
    es: [
      { year: "1950", title: "El Test de Turing", body: "Alan Turing publica 'Computing Machinery and Intelligence' y plantea la pregunta que cambió todo: ¿pueden las máquinas pensar?" },
      { year: "1956", title: "Nace el término 'AI'", body: "John McCarthy organiza la conferencia de Dartmouth. Por primera vez, 'Inteligencia Artificial' se vuelve un campo formal de estudio." },
      { year: "1997", title: "Deep Blue derrota a Kasparov", body: "La AI vence al campeón mundial de ajedrez. Por primera vez, una máquina supera al mejor humano en un dominio simbólico de élite." },
      { year: "2012", title: "Revolución del Deep Learning", body: "AlexNet gana ImageNet. Las redes neuronales profundas demuestran que pueden 'ver' mejor que cualquier algoritmo anterior." },
      { year: "2017", title: "El paper 'Attention is All You Need'", body: "Google publica la arquitectura Transformer. Esto es, literalmente, el nacimiento de los LLMs modernos." },
      { year: "2020", title: "GPT-3 cambia el mundo", body: "OpenAI lanza un modelo con 175 mil millones de parámetros. Por primera vez, una AI escribe casi como un humano educado." },
      { year: "2022", title: "ChatGPT llega al público", body: "Noviembre 2022: 100 millones de usuarios en 2 meses. La AI conversacional se vuelve accesible para todos." },
      { year: "2024+", title: "La era multimodal", body: "GPT-4o, Claude 3.5, Gemini 1.5, Perplexity. Texto, imagen, voz, video, código: todo en una sola conversación." },
    ],
    en: [
      { year: "1950", title: "The Turing Test", body: "Alan Turing publishes 'Computing Machinery and Intelligence' and asks the question that changed everything: can machines think?" },
      { year: "1956", title: "The term 'AI' is born", body: "John McCarthy hosts the Dartmouth Conference. 'Artificial Intelligence' becomes a formal field of study for the first time." },
      { year: "1997", title: "Deep Blue defeats Kasparov", body: "AI beats the world chess champion. For the first time, a machine surpasses the best human at an elite symbolic domain." },
      { year: "2012", title: "Deep Learning revolution", body: "AlexNet wins ImageNet. Deep neural networks prove they can 'see' better than any prior algorithm." },
      { year: "2017", title: "'Attention is All You Need'", body: "Google publishes the Transformer architecture. This is, literally, the birth of modern LLMs." },
      { year: "2020", title: "GPT-3 changes the world", body: "OpenAI releases a 175-billion-parameter model. For the first time, an AI writes like an educated human." },
      { year: "2022", title: "ChatGPT goes public", body: "November 2022: 100 million users in 2 months. Conversational AI becomes accessible to everyone." },
      { year: "2024+", title: "The multimodal era", body: "GPT-4o, Claude 3.5, Gemini 1.5, Perplexity. Text, image, voice, video, code — all in one conversation." },
    ],
    pt: [
      { year: "1950", title: "O Teste de Turing", body: "Alan Turing publica 'Computing Machinery and Intelligence' e faz a pergunta que mudou tudo: máquinas podem pensar?" },
      { year: "1956", title: "Nasce o termo 'AI'", body: "John McCarthy organiza a Conferência de Dartmouth. 'Inteligência Artificial' vira campo formal de estudo." },
      { year: "1997", title: "Deep Blue vence Kasparov", body: "AI derrota o campeão mundial de xadrez. Primeira vez que uma máquina supera o melhor humano em domínio simbólico de elite." },
      { year: "2012", title: "Revolução do Deep Learning", body: "AlexNet vence ImageNet. Redes neurais profundas provam que veem melhor que qualquer algoritmo anterior." },
      { year: "2017", title: "'Attention is All You Need'", body: "Google publica a arquitetura Transformer. É, literalmente, o nascimento dos LLMs modernos." },
      { year: "2020", title: "GPT-3 muda o mundo", body: "OpenAI lança modelo de 175 bilhões de parâmetros. Pela primeira vez, uma AI escreve quase como um humano educado." },
      { year: "2022", title: "ChatGPT chega ao público", body: "Nov 2022: 100 milhões de usuários em 2 meses. AI conversacional vira acessível a todos." },
      { year: "2024+", title: "A era multimodal", body: "GPT-4o, Claude 3.5, Gemini 1.5, Perplexity. Texto, imagem, voz, vídeo, código — tudo numa conversa só." },
    ],
  };

  const analogies = {
    es: [
      { t: "Un LLM es como un bibliotecario que leyó todo internet", b: "No tiene 'pensamiento' como tú, pero ha visto tantos patrones que puede recombinarlos brillantemente cuando le pides bien." },
      { t: "Un prompt es como dar instrucciones a un consultor brillante pero amnésico", b: "No recuerda lo de ayer. Cada conversación es nueva. Pero si lo briefas bien, te entrega trabajo de nivel mundial." },
      { t: "Los Transformers son la imprenta del siglo XXI", b: "Gutenberg democratizó el conocimiento escrito. Los Transformers democratizan el razonamiento estructurado." },
    ],
    en: [
      { t: "An LLM is like a librarian who read the entire internet", b: "It doesn't 'think' like you do, but it's seen so many patterns it can recombine them brilliantly when you ask well." },
      { t: "A prompt is like briefing a brilliant but amnesiac consultant", b: "Doesn't remember yesterday. Every chat is new. But brief them well and they deliver world-class work." },
      { t: "Transformers are the printing press of the 21st century", b: "Gutenberg democratized written knowledge. Transformers democratize structured reasoning." },
    ],
    pt: [
      { t: "Um LLM é como um bibliotecário que leu a internet inteira", b: "Não 'pensa' como você, mas viu tantos padrões que recombina brilhantemente quando você pede bem." },
      { t: "Um prompt é como instruir um consultor brilhante mas amnésico", b: "Não lembra de ontem. Cada chat é novo. Mas brief bem e ele entrega trabalho de nível mundial." },
      { t: "Transformers são a imprensa do século XXI", b: "Gutenberg democratizou o conhecimento escrito. Transformers democratizam o raciocínio estruturado." },
    ],
  };

  const quizMap = {
    es: { q: "¿Qué innovación arquitectónica de 2017 hizo posible los LLMs modernos?",
      opts: ["Las redes convolucionales", "El Transformer y el mecanismo de atención", "Los árboles de decisión", "Las redes recurrentes simples"],
      exp: "El paper 'Attention is All You Need' (Google, 2017) introdujo el Transformer. Sin esa arquitectura, ChatGPT, Claude y Gemini no existirían." },
    en: { q: "Which 2017 architectural innovation made modern LLMs possible?",
      opts: ["Convolutional networks", "The Transformer and attention mechanism", "Decision trees", "Simple recurrent networks"],
      exp: "The paper 'Attention is All You Need' (Google, 2017) introduced the Transformer. Without it, ChatGPT, Claude, and Gemini wouldn't exist." },
    pt: { q: "Qual inovação arquitetural de 2017 tornou os LLMs modernos possíveis?",
      opts: ["Redes convolucionais", "O Transformer e o mecanismo de atenção", "Árvores de decisão", "Redes recorrentes simples"],
      exp: "O paper 'Attention is All You Need' (Google, 2017) introduziu o Transformer. Sem ele, ChatGPT, Claude e Gemini não existiriam." },
  };

  return (
    <div className="module-body">
      {view}

      {level === "foundations" && (
        <>
          <Section eyebrow={t("common.intro")} title={t("history.section1")} icon={History}>
            <p className="lead">
              {lang === "es" && "La historia de la AI no comienza en 2022. Comienza en 1950, cuando un matemático británico se preguntó si una máquina podía pensar. Para entender por qué tu prompt importa, primero hay que entender de dónde viene la inteligencia que estás invocando."}
              {lang === "en" && "AI's history doesn't begin in 2022. It begins in 1950, when a British mathematician asked whether a machine could think. To understand why your prompt matters, you first need to understand where the intelligence you're invoking comes from."}
              {lang === "pt" && "A história da AI não começa em 2022. Começa em 1950, quando um matemático britânico perguntou se uma máquina podia pensar. Para entender por que seu prompt importa, primeiro entenda de onde vem a inteligência que você invoca."}
            </p>
            <Timeline items={timelineFoundations[lang]} />
          </Section>

          <Section eyebrow={t("common.mental")} title={t("history.section2")} icon={Lightbulb}>
            <div className="grid-2">
              {analogies[lang].map((a, i) => (
                <Card key={i} className="analogy-card">
                  <div className="analogy-icon"><Sparkles size={14} /></div>
                  <div className="analogy-title">{a.t}</div>
                  <div className="analogy-body">{a.b}</div>
                </Card>
              ))}
            </div>
          </Section>

          <QuizCard
            question={quizMap[lang].q}
            options={quizMap[lang].opts}
            correctIndex={1}
            explanation={quizMap[lang].exp}
            storageKey={`${KEYS.QUIZ}:history-1`}
          />
        </>
      )}

      {level === "advanced" && (
        <>
          <Section eyebrow={t("common.deep")} title={t("history.adv1")} icon={Network}>
            <p className="lead">
              {lang === "es" && "Cada modelo refleja a su creador. ChatGPT viene de OpenAI: optimizado para conversación masiva. Claude viene de Anthropic: obsesionado con seguridad y razonamiento largo. Gemini viene de Google: nacido multimodal con acceso a todo el ecosistema Google. Perplexity es un agente de búsqueda con razonamiento. NotebookLM es Google Research aplicado a tus documentos. Conocer su origen es saber cómo hablarles."}
              {lang === "en" && "Each model reflects its maker. ChatGPT comes from OpenAI: optimized for mass conversation. Claude comes from Anthropic: obsessed with safety and long-form reasoning. Gemini comes from Google: born multimodal with access to all of Google. Perplexity is a search agent with reasoning. NotebookLM is Google Research applied to your documents. Knowing their origin is knowing how to talk to them."}
              {lang === "pt" && "Cada modelo reflete seu criador. ChatGPT vem da OpenAI: otimizado para conversação em massa. Claude vem da Anthropic: obcecado com segurança e raciocínio longo. Gemini vem do Google: nasceu multimodal. Perplexity é um agente de busca com raciocínio. NotebookLM é Google Research aplicado aos seus documentos."}
            </p>
            <div className="grid-auto">
              {Object.entries(AI_MODELS).map(([id, m]) => (
                <Card key={id} className="model-card">
                  <div className="model-card-head">
                    <AIBadge id={id} size="lg" />
                  </div>
                  <div className="model-card-row">
                    <span className="model-card-k">{t("common.style")}</span>
                    <span className="model-card-v">{m.style[lang]}</span>
                  </div>
                  <div className="model-card-row">
                    <span className="model-card-k">{t("common.bestFor")}</span>
                    <span className="model-card-v">{m.bestFor[lang]}</span>
                  </div>
                  <ChipRow items={m.strengths[lang].map((s) => ({ label: s }))} />
                </Card>
              ))}
            </div>
          </Section>
        </>
      )}

      {level === "expert" && (
        <Section eyebrow={t("common.reflection")} title={t("history.exp1")} icon={Telescope}>
          <AlertBox kind="mentor" title={t("common.mentorNote")}>
            {lang === "es" && "Lo que llamamos 'inteligencia' en un LLM no es consciencia. Es geometría de alta dimensión: tu prompt es un vector que activa regiones específicas de un espacio aprendido sobre billones de tokens de texto humano. Cuando escribes mejor, no estás 'siendo más amable' con la máquina — estás aterrizando en regiones más ricas del espacio. Esa es la verdadera disciplina del prompt engineering."}
            {lang === "en" && "What we call 'intelligence' in an LLM is not consciousness. It's high-dimensional geometry: your prompt is a vector that activates specific regions of a space learned over trillions of tokens of human text. When you write better, you're not 'being nicer' to the machine — you're landing in richer regions of that space. That's the real discipline of prompt engineering."}
            {lang === "pt" && "O que chamamos 'inteligência' num LLM não é consciência. É geometria de alta dimensão: seu prompt é um vetor que ativa regiões específicas de um espaço aprendido sobre trilhões de tokens de texto humano. Quando você escreve melhor, está pousando em regiões mais ricas desse espaço. Essa é a disciplina real do prompt engineering."}
          </AlertBox>
        </Section>
      )}
    </div>
  );
}

/* ── Module 2: What is really a Prompt ───────────────────────────────── */

function WhatIsPromptModule({ lang }) {
  const t = useT();
  const { level, view } = LevelTabsBound({ moduleId: "what-is-prompt" });

  const elements = {
    es: [
      { i: Target, t: "Intención", b: "Qué quieres realmente. No qué crees que la AI debe hacer, sino qué resultado final necesitas." },
      { i: Eye, t: "Contexto", b: "Quién eres, para quién es, qué se asume, qué no se asume. La AI no te conoce." },
      { i: Sparkles, t: "Claridad", b: "Cero ambigüedad. Si una frase puede leerse de dos formas, está mal escrita." },
      { i: Lock, t: "Restricciones", b: "Límites explícitos: longitud, formato, tono, qué incluir, qué evitar." },
      { i: FileCode, t: "Formato de salida", b: "JSON, tabla, prosa, bullets, código. Define el contenedor antes que el contenido." },
      { i: Quote, t: "Delimitadores", b: "Comillas, triples backticks, etiquetas XML. Separan instrucciones de datos." },
    ],
    en: [
      { i: Target, t: "Intent", b: "What you really want. Not what you think the AI should do, but the final outcome you need." },
      { i: Eye, t: "Context", b: "Who you are, who it's for, what's assumed, what isn't. The AI doesn't know you." },
      { i: Sparkles, t: "Clarity", b: "Zero ambiguity. If a sentence can be read two ways, it's badly written." },
      { i: Lock, t: "Constraints", b: "Explicit limits: length, format, tone, what to include, what to avoid." },
      { i: FileCode, t: "Output format", b: "JSON, table, prose, bullets, code. Define the container before the content." },
      { i: Quote, t: "Delimiters", b: "Quotes, triple backticks, XML tags. They separate instructions from data." },
    ],
    pt: [
      { i: Target, t: "Intenção", b: "O que você quer de verdade. Não o que acha que a AI deve fazer, mas o resultado final que precisa." },
      { i: Eye, t: "Contexto", b: "Quem você é, para quem é, o que se assume, o que não. A AI não te conhece." },
      { i: Sparkles, t: "Clareza", b: "Zero ambiguidade. Se uma frase pode ser lida de duas formas, está mal escrita." },
      { i: Lock, t: "Restrições", b: "Limites explícitos: tamanho, formato, tom, o que incluir, o que evitar." },
      { i: FileCode, t: "Formato de saída", b: "JSON, tabela, prosa, bullets, código. Defina o contêiner antes do conteúdo." },
      { i: Quote, t: "Delimitadores", b: "Aspas, triplos backticks, tags XML. Separam instruções de dados." },
    ],
  };

  const badGood = {
    es: {
      bad: { label: "Prompt débil", text: "Escríbeme algo sobre marketing.", notes: "Sin contexto, sin formato, sin audiencia, sin objetivo. La AI inventará lo que sea." },
      good: { label: "Prompt profesional", text: "Actúa como director de marketing senior. Escribe un brief de 200 palabras para lanzar una app de finanzas personales en Latinoamérica dirigida a millennials. Incluye: 1) propuesta de valor única, 2) tres canales de adquisición priorizados, 3) métrica de éxito principal. Tono profesional pero accesible. Devuelve en bullets con headers.", notes: "Rol + tarea + contexto + estructura + tono + formato. Resultado predecible y útil." },
    },
    en: {
      bad: { label: "Weak prompt", text: "Write me something about marketing.", notes: "No context, no format, no audience, no goal. The AI will invent anything." },
      good: { label: "Professional prompt", text: "Act as a senior marketing director. Write a 200-word brief to launch a personal finance app in Latin America targeting millennials. Include: 1) unique value proposition, 2) three prioritized acquisition channels, 3) primary success metric. Professional but accessible tone. Return as bullets with headers.", notes: "Role + task + context + structure + tone + format. Predictable, useful result." },
    },
    pt: {
      bad: { label: "Prompt fraco", text: "Escreva algo sobre marketing.", notes: "Sem contexto, formato, audiência ou objetivo. A AI inventará qualquer coisa." },
      good: { label: "Prompt profissional", text: "Aja como diretor de marketing sênior. Escreva um brief de 200 palavras para lançar um app de finanças pessoais na América Latina para millennials. Inclua: 1) proposta de valor única, 2) três canais de aquisição priorizados, 3) métrica principal. Tom profissional mas acessível. Retorne em bullets com headers.", notes: "Função + tarefa + contexto + estrutura + tom + formato. Resultado previsível e útil." },
    },
  };

  return (
    <div className="module-body">
      {view}

      {level === "foundations" && (
        <>
          <Section eyebrow={t("common.intro")} title={t("whatIs.section1")} icon={Lightbulb}>
            <p className="lead">
              {lang === "es" && "Un prompt no es una pregunta. Un prompt es un contrato. Tú especificas qué quieres, bajo qué condiciones, en qué formato — y la AI te entrega lo más cercano a eso que pueda encontrar en su espacio de patrones aprendidos. Si tu contrato es vago, la entrega será vaga. Si es preciso, la entrega es precisa."}
              {lang === "en" && "A prompt is not a question. A prompt is a contract. You specify what you want, under what conditions, in what format — and the AI delivers the closest thing it can find in its space of learned patterns. Vague contract, vague delivery. Precise contract, precise delivery."}
              {lang === "pt" && "Um prompt não é uma pergunta. Um prompt é um contrato. Você especifica o que quer, em quais condições, em qual formato — e a AI entrega o mais próximo disso no seu espaço de padrões aprendidos. Contrato vago, entrega vaga. Contrato preciso, entrega precisa."}
            </p>
            <div className="grid-auto">
              {elements[lang].map((e, i) => {
                const I = e.i;
                return (
                  <Card key={i} className="element-card">
                    <div className="element-card-icon"><I size={16} /></div>
                    <div className="element-card-title">{e.t}</div>
                    <div className="element-card-body">{e.b}</div>
                  </Card>
                );
              })}
            </div>
          </Section>
        </>
      )}

      {level === "advanced" && (
        <Section eyebrow={t("common.contrast")} title={t("whatIs.adv1")} icon={Scale}>
          <CompareCards bad={badGood[lang].bad} good={badGood[lang].good} />
        </Section>
      )}

      {level === "expert" && (
        <Section eyebrow={t("common.pro")} title={t("whatIs.exp1")} icon={Wand2}>
          <AlertBox kind="mentor">
            {lang === "es" && "Cuando llegues a nivel arquitecto, no escribes prompts: diseñas sistemas de prompts. Bloques reutilizables, plantillas con variables, chains, validaciones del output, fallbacks. Tu prompt se vuelve un componente de software, no un texto."}
            {lang === "en" && "At architect level, you don't write prompts: you design prompt systems. Reusable blocks, templates with variables, chains, output validations, fallbacks. Your prompt becomes a software component, not a text."}
            {lang === "pt" && "Em nível arquiteto, você não escreve prompts: desenha sistemas de prompts. Blocos reutilizáveis, templates com variáveis, chains, validações de saída, fallbacks. Seu prompt vira um componente de software, não um texto."}
          </AlertBox>
        </Section>
      )}
    </div>
  );
}


/* ── Module 3: Anatomy of a Professional Prompt ───────────────────────── */

function AnatomyModule({ lang }) {
  const t = useT();
  const { level, view } = LevelTabsBound({ moduleId: "anatomy" });

  const anatomyParts = {
    es: [
      { k: "Role", label: "Rol", icon: User, desc: "Activa la región del espacio del modelo que corresponde a ese tipo de experto.", ex: "Actúa como editor senior de The Economist con 20 años de experiencia." },
      { k: "Task", label: "Tarea", icon: Target, desc: "Verbo claro de acción. No 'sobre' sino 'redacta', 'analiza', 'compara', 'estructura'.", ex: "Redacta un análisis ejecutivo del impacto del trabajo remoto en productividad." },
      { k: "Context", label: "Contexto", icon: Book, desc: "Quién consume el output, qué se asume, qué se sabe, qué restricciones reales existen.", ex: "Para una junta directiva escéptica con tiempo limitado (5 min de lectura)." },
      { k: "Constraints", label: "Restricciones", icon: Lock, desc: "Longitud, tono, qué incluir, qué evitar, fuentes, sensibilidades.", ex: "Máximo 350 palabras. Evita jerga. Cita 3 estudios reales." },
      { k: "Examples", label: "Ejemplos", icon: Eye, desc: "Few-shot: 1-3 ejemplos del output deseado. Acelera el aprendizaje del modelo dentro del prompt.", ex: "Ejemplo del estilo: 'En 2024, el 67% de los líderes reportó...'" },
      { k: "Output", label: "Esquema", icon: FileCode, desc: "Define la estructura exacta de la respuesta. Headers, JSON, secciones numeradas, tablas.", ex: "Devuelve en 3 secciones: Diagnóstico, Implicaciones, Recomendación." },
      { k: "Reasoning", label: "Razonamiento", icon: Brain, desc: "Pide cadena de pensamiento explícita cuando la complejidad lo amerite. 'Piensa paso a paso antes de responder.'", ex: "Antes de la recomendación final, evalúa 3 escenarios alternativos." },
    ],
    en: [
      { k: "Role", label: "Role", icon: User, desc: "Activates the region of the model's space that corresponds to that expert type.", ex: "Act as a senior editor at The Economist with 20 years of experience." },
      { k: "Task", label: "Task", icon: Target, desc: "Clear action verb. Not 'about' but 'draft', 'analyze', 'compare', 'structure'.", ex: "Draft an executive analysis of remote work's impact on productivity." },
      { k: "Context", label: "Context", icon: Book, desc: "Who consumes the output, what's assumed, what's known, what real constraints exist.", ex: "For a skeptical board with limited time (5-min read)." },
      { k: "Constraints", label: "Constraints", icon: Lock, desc: "Length, tone, what to include, what to avoid, sources, sensitivities.", ex: "Max 350 words. Avoid jargon. Cite 3 real studies." },
      { k: "Examples", label: "Examples", icon: Eye, desc: "Few-shot: 1–3 examples of the desired output. Accelerates the model's learning inside the prompt.", ex: "Style example: 'In 2024, 67% of leaders reported...'" },
      { k: "Output", label: "Schema", icon: FileCode, desc: "Defines the exact response structure. Headers, JSON, numbered sections, tables.", ex: "Return in 3 sections: Diagnosis, Implications, Recommendation." },
      { k: "Reasoning", label: "Reasoning", icon: Brain, desc: "Ask for explicit chain-of-thought when complexity warrants. 'Think step by step before answering.'", ex: "Before the final recommendation, evaluate 3 alternative scenarios." },
    ],
    pt: [
      { k: "Role", label: "Papel", icon: User, desc: "Ativa a região do espaço do modelo correspondente a esse tipo de especialista.", ex: "Aja como editor sênior da The Economist com 20 anos de experiência." },
      { k: "Task", label: "Tarefa", icon: Target, desc: "Verbo de ação claro. Não 'sobre' mas 'redija', 'analise', 'compare', 'estruture'.", ex: "Redija análise executiva do impacto do trabalho remoto na produtividade." },
      { k: "Context", label: "Contexto", icon: Book, desc: "Quem consome o output, o que se assume, o que se sabe, quais restrições reais existem.", ex: "Para diretoria cética com tempo limitado (5 min de leitura)." },
      { k: "Constraints", label: "Restrições", icon: Lock, desc: "Tamanho, tom, o que incluir, o que evitar, fontes, sensibilidades.", ex: "Máximo 350 palavras. Evite jargão. Cite 3 estudos reais." },
      { k: "Examples", label: "Exemplos", icon: Eye, desc: "Few-shot: 1-3 exemplos do output desejado. Acelera o aprendizado do modelo dentro do prompt.", ex: "Exemplo do estilo: 'Em 2024, 67% dos líderes reportaram...'" },
      { k: "Output", label: "Esquema", icon: FileCode, desc: "Define a estrutura exata da resposta. Headers, JSON, seções numeradas, tabelas.", ex: "Retorne em 3 seções: Diagnóstico, Implicações, Recomendação." },
      { k: "Reasoning", label: "Raciocínio", icon: Brain, desc: "Peça cadeia de pensamento explícita quando a complexidade justificar. 'Pense passo a passo antes de responder.'", ex: "Antes da recomendação final, avalie 3 cenários alternativos." },
    ],
  };

  const fullExample = {
    es: `[ROLE] Actúa como editor senior de The Economist con 20 años cubriendo economía laboral.

[TASK] Redacta un análisis ejecutivo del impacto del trabajo remoto en la productividad real (no autorreportada) de equipos de conocimiento.

[CONTEXT] El lector es una junta directiva de una empresa de servicios financieros con 3000 empleados. Están escépticos del trabajo remoto y consideran un mandato de regreso a oficina. Tienen 5 minutos.

[CONSTRAINTS]
- Máximo 350 palabras.
- Evita jerga académica.
- Cita 3 estudios reales con metodología sólida.
- Sé honesto sobre incertidumbre donde la evidencia esté dividida.

[OUTPUT SCHEMA]
1. Diagnóstico (qué dice la evidencia)
2. Tres tensiones principales (no respuestas, sino preguntas duras)
3. Recomendación con condiciones (no un sí/no plano)

[REASONING] Antes de redactar, identifica internamente 3 escenarios alternativos. Solo escribe la versión final.`,
    en: `[ROLE] Act as a senior editor at The Economist with 20 years covering labor economics.

[TASK] Draft an executive analysis of remote work's impact on real (not self-reported) productivity for knowledge teams.

[CONTEXT] The reader is the board of a 3,000-employee financial services company. They're skeptical of remote work and considering a return-to-office mandate. They have 5 minutes.

[CONSTRAINTS]
- Max 350 words.
- Avoid academic jargon.
- Cite 3 real studies with solid methodology.
- Be honest about uncertainty where evidence is split.

[OUTPUT SCHEMA]
1. Diagnosis (what evidence says)
2. Three main tensions (not answers, hard questions)
3. Recommendation with conditions (not a flat yes/no)

[REASONING] Before drafting, internally identify 3 alternative scenarios. Only write the final version.`,
    pt: `[ROLE] Aja como editor sênior da The Economist com 20 anos cobrindo economia do trabalho.

[TASK] Redija análise executiva do impacto do trabalho remoto na produtividade real (não auto-relatada) de equipes de conhecimento.

[CONTEXT] Leitor: diretoria de empresa de serviços financeiros com 3.000 funcionários. Céticos quanto a remoto, considerando volta ao escritório. 5 minutos.

[CONSTRAINTS]
- Máximo 350 palavras.
- Evite jargão acadêmico.
- Cite 3 estudos reais com metodologia sólida.
- Seja honesto sobre incerteza onde evidência diverge.

[OUTPUT SCHEMA]
1. Diagnóstico (o que diz a evidência)
2. Três tensões principais (não respostas, perguntas duras)
3. Recomendação com condições

[REASONING] Antes de redigir, identifique internamente 3 cenários alternativos. Escreva apenas a versão final.`,
  };

  return (
    <div className="module-body">
      {view}

      {level === "foundations" && (
        <Section eyebrow={t("common.framework")} title={t("anatomy.section1")} icon={Layers}>
          <p className="lead">
            {lang === "es" && "Hay siete piezas en todo prompt de élite. No necesitas las siete en cada caso, pero saber qué pieza falta es la diferencia entre un prompt mediocre y uno quirúrgico."}
            {lang === "en" && "There are seven pieces in every elite prompt. You don't need all seven every time, but knowing which one is missing is the difference between a mediocre prompt and a surgical one."}
            {lang === "pt" && "Há sete peças em todo prompt de elite. Você não precisa de todas sempre, mas saber qual está faltando é a diferença entre um prompt medíocre e um cirúrgico."}
          </p>
          <div className="grid-auto anatomy-grid">
            {anatomyParts[lang].map((p, i) => {
              const I = p.icon;
              return (
                <Card key={i} className="anatomy-card">
                  <div className="anatomy-head">
                    <div className="anatomy-icon"><I size={15} /></div>
                    <div className="anatomy-title">{p.label}</div>
                    <span className="anatomy-tag">{p.k}</span>
                  </div>
                  <div className="anatomy-desc">{p.desc}</div>
                  <div className="anatomy-ex">{p.ex}</div>
                </Card>
              );
            })}
          </div>
        </Section>
      )}

      {level === "advanced" && (
        <Section eyebrow={t("common.example")} title={t("anatomy.adv1")} icon={Wand2}>
          <p className="lead">
            {lang === "es" && "Así se ve un prompt completo de los siete bloques, listo para producción:"}
            {lang === "en" && "Here's what a complete seven-block prompt looks like, production-ready:"}
            {lang === "pt" && "Eis um prompt completo dos sete blocos, pronto para produção:"}
          </p>
          <CodeBlock code={fullExample[lang]} lang="prompt" label={t("anatomy.fullPrompt")} />
        </Section>
      )}

      {level === "expert" && (
        <Section eyebrow={t("common.architect")} title={t("anatomy.exp1")} icon={Crown}>
          <AlertBox kind="mentor">
            {lang === "es" && "El arquitecto no escribe prompts: escribe contratos. Cada bloque tiene una razón empírica de existir, y la ausencia de uno es una decisión consciente, no un olvido. Cuando dudes, agrega — pero etiquetado y separado con delimitadores limpios."}
            {lang === "en" && "The architect doesn't write prompts: they write contracts. Each block exists for an empirical reason, and missing one is a conscious decision, not an oversight. When in doubt, add — but labeled and separated with clean delimiters."}
            {lang === "pt" && "O arquiteto não escreve prompts: escreve contratos. Cada bloco existe por uma razão empírica, e a ausência de um é decisão consciente, não esquecimento. Em dúvida, acrescente — mas rotulado e separado por delimitadores limpos."}
          </AlertBox>
        </Section>
      )}
    </div>
  );
}

/* ── Module 4: Prompting for University Studies ───────────────────────── */

function StudyModule({ lang }) {
  const t = useT();
  const { level, view } = LevelTabsBound({ moduleId: "study" });

  const useCases = {
    es: [
      { i: BookOpen, t: "Resumir un paper de 30 páginas", b: "ChatGPT y Claude son tus aliados. Sube el PDF, pide resumen estructurado por secciones." },
      { i: Brain, t: "Construir un mapa mental", b: "Gemini o Claude pueden devolverte un esquema jerárquico en Markdown listo para Notion o MindMup." },
      { i: GraduationCap, t: "Estudiar para un examen", b: "Pídele flashcards, preguntas tipo examen con dificultad creciente, y explicaciones por Feynman technique." },
      { i: Microscope, t: "Análisis crítico de fuentes", b: "Claude brilla: 'Identifica 5 limitaciones metodológicas y 3 sesgos posibles en este estudio.'" },
      { i: FileText, t: "Estructurar una tesis", b: "Usa NotebookLM con tus referencias y pídele un marco teórico borrador con gaps identificados." },
      { i: Languages, t: "Aprender un idioma", b: "Conversación rolplayada, corrección con explicación, vocabulario espaciado por contexto temático." },
    ],
    en: [
      { i: BookOpen, t: "Summarize a 30-page paper", b: "ChatGPT and Claude are your allies. Upload the PDF, ask for a structured summary by section." },
      { i: Brain, t: "Build a mind map", b: "Gemini or Claude can return a hierarchical outline in Markdown ready for Notion or MindMup." },
      { i: GraduationCap, t: "Study for an exam", b: "Ask for flashcards, exam-style questions with rising difficulty, Feynman-technique explanations." },
      { i: Microscope, t: "Critical source analysis", b: "Claude shines: 'Identify 5 methodological limitations and 3 possible biases in this study.'" },
      { i: FileText, t: "Structure a thesis", b: "Use NotebookLM with your references and ask for a draft theoretical framework with identified gaps." },
      { i: Languages, t: "Learn a language", b: "Roleplayed conversation, correction with explanation, spaced vocabulary by thematic context." },
    ],
    pt: [
      { i: BookOpen, t: "Resumir um paper de 30 páginas", b: "ChatGPT e Claude são seus aliados. Suba o PDF, peça resumo estruturado por seção." },
      { i: Brain, t: "Construir um mapa mental", b: "Gemini ou Claude retornam um esquema hierárquico em Markdown pronto para Notion ou MindMup." },
      { i: GraduationCap, t: "Estudar para uma prova", b: "Peça flashcards, perguntas tipo prova com dificuldade crescente, explicações via técnica Feynman." },
      { i: Microscope, t: "Análise crítica de fontes", b: "Claude brilha: 'Identifique 5 limitações metodológicas e 3 vieses possíveis neste estudo.'" },
      { i: FileText, t: "Estruturar uma tese", b: "Use NotebookLM com suas referências e peça um marco teórico borrador com gaps identificados." },
      { i: Languages, t: "Aprender um idioma", b: "Conversação roleplay, correção com explicação, vocabulário espaçado por contexto temático." },
    ],
  };

  const aiMap = {
    es: [
      { ai: "notebooklm", task: "Trabajar con TUS documentos, papers y notas. Citas con anclas." },
      { ai: "claude", task: "Análisis crítico de textos largos, redacción académica matizada, razonamiento ético." },
      { ai: "chatgpt", task: "Tutor general, conversación, generación de ideas, idiomas, código simple." },
      { ai: "gemini", task: "Investigación combinada con búsqueda en Google, multimodal con docs y diagramas." },
      { ai: "perplexity", task: "Encontrar fuentes reales con citas verificables. Antídoto contra alucinaciones." },
    ],
    en: [
      { ai: "notebooklm", task: "Work with YOUR docs, papers, notes. Citations with anchors." },
      { ai: "claude", task: "Critical analysis of long texts, nuanced academic writing, ethical reasoning." },
      { ai: "chatgpt", task: "General tutor, conversation, ideation, languages, simple code." },
      { ai: "gemini", task: "Research combined with Google search, multimodal with docs and diagrams." },
      { ai: "perplexity", task: "Find real sources with verifiable citations. Antidote to hallucinations." },
    ],
    pt: [
      { ai: "notebooklm", task: "Trabalhar com SEUS documentos, papers, notas. Citações com âncoras." },
      { ai: "claude", task: "Análise crítica de textos longos, redação acadêmica matizada, raciocínio ético." },
      { ai: "chatgpt", task: "Tutor geral, conversa, geração de ideias, idiomas, código simples." },
      { ai: "gemini", task: "Pesquisa combinada com busca no Google, multimodal com docs e diagramas." },
      { ai: "perplexity", task: "Encontrar fontes reais com citações verificáveis. Antídoto contra alucinações." },
    ],
  };

  return (
    <div className="module-body">
      {view}

      {level === "foundations" && (
        <Section eyebrow={t("common.useCases")} title={t("study.section1")} icon={GraduationCap}>
          <p className="lead">
            {lang === "es" && "La AI no te va a estudiar la carrera. Pero puede comprimir 10 horas de lectura en 90 minutos de comprensión profunda — si sabes pedirlo. Aquí están los casos reales donde marca la diferencia."}
            {lang === "en" && "AI won't get your degree for you. But it can compress 10 hours of reading into 90 minutes of deep understanding — if you know how to ask. Here are the real cases where it changes everything."}
            {lang === "pt" && "A AI não vai fazer sua faculdade por você. Mas pode comprimir 10 horas de leitura em 90 minutos de compreensão profunda — se você souber pedir. Eis os casos reais onde faz a diferença."}
          </p>
          <div className="grid-auto">
            {useCases[lang].map((c, i) => {
              const I = c.i;
              return (
                <Card key={i} className="usecase-card">
                  <div className="usecase-icon"><I size={15} /></div>
                  <div className="usecase-title">{c.t}</div>
                  <div className="usecase-body">{c.b}</div>
                </Card>
              );
            })}
          </div>
        </Section>
      )}

      {level === "advanced" && (
        <Section eyebrow={t("common.match")} title={t("study.adv1")} icon={Network}>
          <div className="ai-match-list">
            {aiMap[lang].map((m, i) => (
              <Card key={i} className="ai-match-row">
                <AIBadge id={m.ai} size="lg" />
                <div className="ai-match-task">{m.task}</div>
              </Card>
            ))}
          </div>
        </Section>
      )}

      {level === "expert" && (
        <Section eyebrow={t("common.discipline")} title={t("study.exp1")} icon={Crown}>
          <AlertBox kind="mentor">
            {lang === "es" && "El error más común del estudiante con AI no es prompting débil — es delegar lo que solo el cerebro humano debe hacer: la lucha cognitiva con la idea. Usa la AI para acelerar comprensión, no para evitar pensar. La diferencia entre quien aprende y quien copia es exactamente esa."}
            {lang === "en" && "The most common student mistake with AI isn't weak prompting — it's delegating what only the human brain should do: the cognitive struggle with the idea. Use AI to accelerate understanding, not to avoid thinking. The difference between someone who learns and someone who copies is exactly that."}
            {lang === "pt" && "O erro mais comum do estudante com AI não é prompt fraco — é delegar o que só o cérebro humano deve fazer: a luta cognitiva com a ideia. Use AI para acelerar compreensão, não para evitar pensar."}
          </AlertBox>
        </Section>
      )}
    </div>
  );
}


/* ── Module 5: Work / Professional ──────────────────────────────────── */

function WorkModule({ lang }) {
  const t = useT();
  const { level, view } = LevelTabsBound({ moduleId: "work" });

  const domains = {
    es: [
      { i: Users, t: "Reuniones y minutas", b: "Transcripción → resumen ejecutivo → action items con dueño y fecha. ChatGPT con archivo de audio o Claude con transcripción pegada." },
      { i: TrendingUp, t: "Análisis de negocio", b: "FODA, Porter, pricing, sensitivity analysis, hipótesis estratégicas. Claude o Gemini con tu data." },
      { i: Megaphone, t: "Marketing y ventas", b: "Copy AB-testing, segmentación, scripts de venta, objeciones, follow-up emails personalizados." },
      { i: Scale, t: "Legal y compliance", b: "Lectura de contratos, identificación de cláusulas riesgosas, redacción de cartas formales. SIEMPRE valida con humano." },
      { i: UserCheck, t: "Recursos humanos", b: "Descripciones de puesto sin sesgos, evaluaciones 360, planes de desarrollo individual, scripts difíciles." },
      { i: Headphones, t: "Soporte al cliente", b: "Plantillas de respuesta por categoría, scripts de desescalación, análisis de sentimiento de feedback." },
      { i: Workflow, t: "Automatización", b: "Diseño de workflows: input → AI → validación → output → trigger. Documentación de procesos." },
      { i: Calculator, t: "Finanzas", b: "Explicación de estados financieros, simulación de escenarios, análisis de variaciones, dashboards." },
    ],
    en: [
      { i: Users, t: "Meetings & minutes", b: "Transcription → exec summary → action items with owner and date. ChatGPT with audio file or Claude with pasted transcript." },
      { i: TrendingUp, t: "Business analysis", b: "SWOT, Porter, pricing, sensitivity analysis, strategic hypotheses. Claude or Gemini with your data." },
      { i: Megaphone, t: "Marketing & sales", b: "Copy AB-testing, segmentation, sales scripts, objection handling, personalized follow-ups." },
      { i: Scale, t: "Legal & compliance", b: "Contract reading, risky clause identification, formal letter drafting. ALWAYS validate with human." },
      { i: UserCheck, t: "HR", b: "Bias-free job descriptions, 360 reviews, individual development plans, difficult scripts." },
      { i: Headphones, t: "Customer support", b: "Response templates by category, de-escalation scripts, feedback sentiment analysis." },
      { i: Workflow, t: "Automation", b: "Workflow design: input → AI → validation → output → trigger. Process documentation." },
      { i: Calculator, t: "Finance", b: "Financial statement explanation, scenario simulation, variance analysis, dashboards." },
    ],
    pt: [
      { i: Users, t: "Reuniões e atas", b: "Transcrição → resumo executivo → action items com dono e data. ChatGPT com áudio ou Claude com transcrição colada." },
      { i: TrendingUp, t: "Análise de negócios", b: "SWOT, Porter, pricing, análise de sensibilidade, hipóteses estratégicas. Claude ou Gemini com seus dados." },
      { i: Megaphone, t: "Marketing e vendas", b: "Copy AB-test, segmentação, scripts de venda, objeções, follow-up personalizado." },
      { i: Scale, t: "Jurídico e compliance", b: "Leitura de contratos, identificação de cláusulas arriscadas, redação formal. SEMPRE valide com humano." },
      { i: UserCheck, t: "Recursos humanos", b: "Descrições de cargo sem viés, avaliações 360, planos de desenvolvimento, scripts difíceis." },
      { i: Headphones, t: "Suporte ao cliente", b: "Templates por categoria, scripts de des-escalação, análise de sentimento de feedback." },
      { i: Workflow, t: "Automação", b: "Desenho de workflows: input → AI → validação → output → trigger. Documentação de processos." },
      { i: Calculator, t: "Finanças", b: "Explicação de demonstrações, simulação de cenários, análise de variações, dashboards." },
    ],
  };

  return (
    <div className="module-body">
      {view}

      {level === "foundations" && (
        <Section eyebrow={t("common.useCases")} title={t("work.section1")} icon={Briefcase}>
          <p className="lead">
            {lang === "es" && "El profesional moderno no compite con quien usa AI. Compite con quien la usa bien. La AI no te reemplaza — te libera para hacer el trabajo de alto criterio que solo tú puedes hacer."}
            {lang === "en" && "The modern professional doesn't compete with people who use AI. They compete with people who use it well. AI doesn't replace you — it frees you for the high-judgment work only you can do."}
            {lang === "pt" && "O profissional moderno não compete com quem usa AI. Compete com quem a usa bem. A AI não te substitui — te libera para o trabalho de alto critério que só você pode fazer."}
          </p>
          <div className="grid-auto">
            {domains[lang].map((d, i) => {
              const I = d.i;
              return (
                <Card key={i} className="domain-card">
                  <div className="domain-icon"><I size={15} /></div>
                  <div className="domain-title">{d.t}</div>
                  <div className="domain-body">{d.b}</div>
                </Card>
              );
            })}
          </div>
        </Section>
      )}

      {level === "advanced" && (
        <Section eyebrow={t("common.pro")} title={t("work.adv1")} icon={Zap}>
          <p className="lead">
            {lang === "es" && "El profesional avanzado construye plantillas reutilizables. Para cada tarea recurrente — un reporte semanal, un brief, un análisis competitivo — diseñas el prompt UNA vez, lo perfeccionas, lo guardas, y lo invocas con variables. Pasas de tomar decisiones de prompting a tomar decisiones de negocio."}
            {lang === "en" && "Advanced professionals build reusable templates. For each recurring task — a weekly report, a brief, a competitive analysis — you design the prompt ONCE, perfect it, save it, and invoke it with variables. You shift from making prompting decisions to making business decisions."}
            {lang === "pt" && "Profissionais avançados constroem templates reutilizáveis. Para cada tarefa recorrente — relatório semanal, brief, análise competitiva — você desenha o prompt UMA vez, aperfeiçoa, salva, e invoca com variáveis. Sai das decisões de prompt para as decisões de negócio."}
          </p>
        </Section>
      )}

      {level === "expert" && (
        <AlertBox kind="mentor" title={t("common.mentorNote")}>
          {lang === "es" && "El profesional de élite no usa AI para hacer su trabajo: la usa para multiplicar su criterio. La AI hace los borradores; tú haces las decisiones. La AI agrega información; tú agregas juicio. Si dejas que la AI tome las decisiones, te reemplazará. Si la usas para informarlas mejor, serás insustituible."}
          {lang === "en" && "Elite professionals don't use AI to do their work: they use it to multiply their judgment. AI does the drafts; you make the decisions. AI adds information; you add judgment. If you let AI make the decisions, it'll replace you. If you use it to inform them better, you become irreplaceable."}
          {lang === "pt" && "Profissionais de elite não usam AI para fazer seu trabalho: usam para multiplicar seu critério. A AI faz rascunhos; você decide. A AI agrega informação; você agrega julgamento. Se deixar a AI decidir, será substituído. Se usar para informar melhor, será insubstituível."}
        </AlertBox>
      )}
    </div>
  );
}

/* ── Module 6: Coding ──────────────────────────────────────────────── */

function CodingModule({ lang }) {
  const t = useT();
  const { level, view } = LevelTabsBound({ moduleId: "coding" });

  const codingTasks = {
    es: [
      { i: Bug, t: "Debugging", b: "Pega el error completo, el código relevante (no todo el repo), y di qué esperabas que pasara. Claude es excelente para razonar sobre bugs sutiles." },
      { i: FileText, t: "Documentación", b: "Pídele docstrings, READMEs, comentarios inline, ADRs. Especifica el estilo (Google, NumPy, JSDoc)." },
      { i: Layers, t: "Arquitectura", b: "Antes de escribir código, conversa la arquitectura. Trade-offs, alternativas, riesgos. Claude y GPT-4 brillan aquí." },
      { i: Code, t: "Generación de código", b: "Sé explícito: lenguaje, framework, versión, librerías permitidas, estilo. 'Escribe en Python 3.11, FastAPI, sin dependencias externas adicionales.'" },
      { i: Wrench, t: "Refactoring", b: "Pega el código original, dí qué quieres mejorar (legibilidad, performance, testabilidad), y pide diff antes que código nuevo completo." },
      { i: ShieldCheck, t: "Testing", b: "Pídele tests unitarios con casos de borde explícitos, mocks de dependencias, y al menos un test de regresión por bug encontrado." },
      { i: Network, t: "APIs e integración", b: "Especifica formato del payload, manejo de errores esperado, timeouts, retries, y autenticación." },
      { i: GitBranch, t: "Revisión de PR", b: "Pega el diff y pide: code smells, bugs potenciales, oportunidades de simplificación, cobertura de tests faltante." },
    ],
    en: [
      { i: Bug, t: "Debugging", b: "Paste the full error, the relevant code (not the whole repo), and say what you expected. Claude is excellent at subtle bugs." },
      { i: FileText, t: "Documentation", b: "Ask for docstrings, READMEs, inline comments, ADRs. Specify the style (Google, NumPy, JSDoc)." },
      { i: Layers, t: "Architecture", b: "Before writing code, talk architecture. Trade-offs, alternatives, risks. Claude and GPT-4 shine here." },
      { i: Code, t: "Code generation", b: "Be explicit: language, framework, version, allowed libraries, style. 'Write in Python 3.11, FastAPI, no extra deps.'" },
      { i: Wrench, t: "Refactoring", b: "Paste original code, say what you want to improve (readability, performance, testability), ask for a diff before a full rewrite." },
      { i: ShieldCheck, t: "Testing", b: "Ask for unit tests with explicit edge cases, mocked dependencies, and at least one regression test per found bug." },
      { i: Network, t: "APIs & integration", b: "Specify payload format, expected error handling, timeouts, retries, authentication." },
      { i: GitBranch, t: "PR review", b: "Paste the diff and ask: code smells, potential bugs, simplification opportunities, missing test coverage." },
    ],
    pt: [
      { i: Bug, t: "Debugging", b: "Cole o erro completo, o código relevante (não o repo inteiro), e diga o que esperava. Claude é excelente em bugs sutis." },
      { i: FileText, t: "Documentação", b: "Peça docstrings, READMEs, comentários inline, ADRs. Especifique o estilo (Google, NumPy, JSDoc)." },
      { i: Layers, t: "Arquitetura", b: "Antes de escrever código, converse a arquitetura. Trade-offs, alternativas, riscos. Claude e GPT-4 brilham." },
      { i: Code, t: "Geração de código", b: "Seja explícito: linguagem, framework, versão, libs permitidas, estilo. 'Python 3.11, FastAPI, sem deps extras.'" },
      { i: Wrench, t: "Refactoring", b: "Cole o código original, diga o que quer melhorar (legibilidade, performance, testabilidade), peça diff antes que código novo completo." },
      { i: ShieldCheck, t: "Testing", b: "Peça testes unitários com edge cases explícitos, mocks, e ao menos um teste de regressão por bug encontrado." },
      { i: Network, t: "APIs e integração", b: "Especifique formato do payload, tratamento de erros, timeouts, retries, autenticação." },
      { i: GitBranch, t: "Revisão de PR", b: "Cole o diff e peça: code smells, bugs potenciais, simplificações, cobertura de testes faltante." },
    ],
  };

  const aiCompare = {
    es: { gpt: "Generación rápida, gran ecosistema de plugins, multimodal con imágenes.", claude: "Razonamiento largo, código de alta calidad, mejor para refactor masivo y arquitectura.", gemini: "Integración nativa con Google Cloud, gran contexto, multimodal con Workspace." },
    en: { gpt: "Fast generation, huge plugin ecosystem, multimodal with images.", claude: "Long reasoning, high-quality code, best for massive refactor and architecture.", gemini: "Native Google Cloud integration, huge context, multimodal with Workspace." },
    pt: { gpt: "Geração rápida, grande ecossistema de plugins, multimodal com imagens.", claude: "Raciocínio longo, código de alta qualidade, melhor para refactor massivo e arquitetura.", gemini: "Integração nativa com Google Cloud, contexto enorme, multimodal com Workspace." },
  };

  return (
    <div className="module-body">
      {view}

      {level === "foundations" && (
        <Section eyebrow={t("common.useCases")} title={t("coding.section1")} icon={Code}>
          <p className="lead">
            {lang === "es" && "Programar con AI no es 'pedir que escriba el código por ti'. Es tener un par-programador senior de paciencia infinita que ha visto millones de soluciones similares. Tu trabajo es enmarcar el problema bien."}
            {lang === "en" && "Coding with AI isn't 'asking it to write the code for you'. It's having a senior pair-programmer with infinite patience who has seen millions of similar solutions. Your job is to frame the problem well."}
            {lang === "pt" && "Programar com AI não é 'pedir que escreva o código por você'. É ter um par-programador sênior de paciência infinita que viu milhões de soluções similares. Seu trabalho é enquadrar bem o problema."}
          </p>
          <div className="grid-auto">
            {codingTasks[lang].map((c, i) => {
              const I = c.i;
              return (
                <Card key={i} className="coding-card">
                  <div className="coding-icon"><I size={15} /></div>
                  <div className="coding-title">{c.t}</div>
                  <div className="coding-body">{c.b}</div>
                </Card>
              );
            })}
          </div>
        </Section>
      )}

      {level === "advanced" && (
        <Section eyebrow={t("common.compare")} title={t("coding.adv1")} icon={Swords}>
          <div className="grid-3 coding-compare-grid">
            <Card className="coding-compare-card">
              <AIBadge id="chatgpt" size="lg" />
              <div className="coding-compare-body">{aiCompare[lang].gpt}</div>
            </Card>
            <Card className="coding-compare-card">
              <AIBadge id="claude" size="lg" />
              <div className="coding-compare-body">{aiCompare[lang].claude}</div>
            </Card>
            <Card className="coding-compare-card">
              <AIBadge id="gemini" size="lg" />
              <div className="coding-compare-body">{aiCompare[lang].gemini}</div>
            </Card>
          </div>
        </Section>
      )}

      {level === "expert" && (
        <AlertBox kind="mentor">
          {lang === "es" && "El programador de élite no le pide código a la AI. Le pide opciones, trade-offs, segundas opiniones, code reviews, y luego decide. La AI es un acelerador de buen juicio, no un sustituto del juicio. Si copias y pegas sin entender, estás construyendo deuda técnica más rápido que nunca antes en la historia."}
          {lang === "en" && "The elite programmer doesn't ask AI for code. They ask for options, trade-offs, second opinions, code reviews, and then decide. AI is a good-judgment accelerator, not a substitute for judgment. If you copy-paste without understanding, you're building tech debt faster than ever in history."}
          {lang === "pt" && "O programador de elite não pede código à AI. Pede opções, trade-offs, segundas opiniões, code reviews, e então decide. A AI é acelerador de bom julgamento, não substituto. Copiar e colar sem entender constrói dívida técnica mais rápido que nunca."}
        </AlertBox>
      )}
    </div>
  );
}

/* ── Module 7: Multimodal Prompting ──────────────────────────────────── */

function MultimodalModule({ lang }) {
  const t = useT();
  const { level, view } = LevelTabsBound({ moduleId: "multimodal" });

  const modalities = {
    es: [
      { i: Eye, t: "Imágenes", b: "Sube una foto y pide: descripción técnica, OCR, análisis de diseño, comparación con referencia, extracción de datos de un gráfico." },
      { i: FileText, t: "PDFs y documentos", b: "Resumen estructurado, comparación con otro documento, extracción de tablas, identificación de inconsistencias." },
      { i: Mic, t: "Voz y audio", b: "Transcripción con timestamps, identificación de hablantes, resumen de podcasts, análisis de tono emocional." },
      { i: Video, t: "Video", b: "Extracción de momentos clave, transcripción + análisis visual, generación de clips, detección de objetos." },
      { i: Camera, t: "Screenshots", b: "Debugging visual de errores de UI, copia de texto de imágenes, análisis de dashboards, validación de diseños." },
      { i: ScanLine, t: "OCR avanzado", b: "De facturas, contratos manuscritos, recibos, formularios viejos. ChatGPT y Gemini son los más fuertes aquí." },
    ],
    en: [
      { i: Eye, t: "Images", b: "Upload a photo and ask for: technical description, OCR, design analysis, comparison with reference, chart data extraction." },
      { i: FileText, t: "PDFs and documents", b: "Structured summary, comparison with another doc, table extraction, inconsistency identification." },
      { i: Mic, t: "Voice and audio", b: "Transcription with timestamps, speaker identification, podcast summarization, emotional tone analysis." },
      { i: Video, t: "Video", b: "Key moment extraction, transcription + visual analysis, clip generation, object detection." },
      { i: Camera, t: "Screenshots", b: "Visual debugging of UI errors, text from images, dashboard analysis, design validation." },
      { i: ScanLine, t: "Advanced OCR", b: "From invoices, handwritten contracts, receipts, old forms. ChatGPT and Gemini are strongest here." },
    ],
    pt: [
      { i: Eye, t: "Imagens", b: "Suba uma foto e peça: descrição técnica, OCR, análise de design, comparação com referência, extração de dados de gráfico." },
      { i: FileText, t: "PDFs e documentos", b: "Resumo estruturado, comparação com outro doc, extração de tabelas, identificação de inconsistências." },
      { i: Mic, t: "Voz e áudio", b: "Transcrição com timestamps, identificação de falantes, resumo de podcasts, análise de tom emocional." },
      { i: Video, t: "Vídeo", b: "Extração de momentos-chave, transcrição + análise visual, geração de clipes, detecção de objetos." },
      { i: Camera, t: "Screenshots", b: "Debugging visual de erros de UI, cópia de texto de imagens, análise de dashboards, validação de designs." },
      { i: ScanLine, t: "OCR avançado", b: "De faturas, contratos manuscritos, recibos, formulários antigos. ChatGPT e Gemini são os mais fortes." },
    ],
  };

  return (
    <div className="module-body">
      {view}

      {level === "foundations" && (
        <Section eyebrow={t("common.useCases")} title={t("multimodal.section1")} icon={Eye}>
          <p className="lead">
            {lang === "es" && "La AI moderna ya no solo lee texto: ve, oye, mira, escucha, lee documentos. Cuando le das contexto multimodal junto a un prompt bien estructurado, su capacidad de razonar se multiplica. Pero las reglas siguen siendo las mismas: claridad, contexto, objetivo claro."}
            {lang === "en" && "Modern AI doesn't just read text: it sees, hears, watches, listens, reads documents. When you give it multimodal context alongside a well-structured prompt, its reasoning ability multiplies. But the rules are the same: clarity, context, clear objective."}
            {lang === "pt" && "A AI moderna não só lê texto: vê, ouve, assiste, escuta, lê documentos. Quando você dá contexto multimodal junto a um prompt bem estruturado, a capacidade de raciocínio se multiplica. Mas as regras são as mesmas: clareza, contexto, objetivo claro."}
          </p>
          <div className="grid-auto">
            {modalities[lang].map((m, i) => {
              const I = m.i;
              return (
                <Card key={i} className="modality-card">
                  <div className="modality-icon"><I size={15} /></div>
                  <div className="modality-title">{m.t}</div>
                  <div className="modality-body">{m.b}</div>
                </Card>
              );
            })}
          </div>
        </Section>
      )}

      {level === "advanced" && (
        <Section eyebrow={t("common.pro")} title={t("multimodal.adv1")} icon={Sparkles}>
          <AlertBox kind="info">
            {lang === "es" && "Tip pro: cuando subas un documento o imagen, dile a la AI qué tipo de contenido es antes de pedirle la tarea. 'Esta es una factura escaneada del 2019' es radicalmente mejor que solo subir la imagen. Le das un marco de interpretación que evita errores."}
            {lang === "en" && "Pro tip: when uploading a document or image, tell the AI what kind of content it is before asking the task. 'This is a scanned invoice from 2019' is radically better than just uploading. You give it an interpretation frame that prevents errors."}
            {lang === "pt" && "Dica pro: ao subir documento ou imagem, diga à AI que tipo de conteúdo é antes de pedir a tarefa. 'Esta é uma fatura escaneada de 2019' é radicalmente melhor que só subir. Você dá um marco interpretativo que evita erros."}
          </AlertBox>
        </Section>
      )}

      {level === "expert" && (
        <AlertBox kind="mentor">
          {lang === "es" && "El experto multimodal entiende que cada formato de entrada activa rutas diferentes en el modelo. Una imagen + texto produce respuestas diferentes a un texto que describe la misma imagen. Aprende qué formato es óptimo para cada tarea. Esto es prompting de tercer orden: ya no eliges palabras, eliges canales."}
          {lang === "en" && "The multimodal expert understands that each input format activates different routes in the model. An image + text produces different answers than text describing the same image. Learn which format is optimal for each task. This is third-order prompting: you no longer choose words, you choose channels."}
          {lang === "pt" && "O expert multimodal entende que cada formato de entrada ativa rotas diferentes no modelo. Imagem + texto produz respostas diferentes de texto que descreve a mesma imagem. Aprenda qual formato é ótimo para cada tarefa. Isso é prompting de terceira ordem: não escolhe palavras, escolhe canais."}
        </AlertBox>
      )}
    </div>
  );
}


/* ── Module 8: Context Engineering ───────────────────────────────────── */

function ContextModule({ lang }) {
  const t = useT();
  const { level, view } = LevelTabsBound({ moduleId: "context" });

  const concepts = {
    es: [
      { i: Brain, t: "Context window", b: "La ventana de memoria de la AI por conversación. GPT-4 tiene 128k tokens, Claude 3.5 tiene 200k, Gemini 1.5 tiene 1M+. Es la cantidad de información que puede 'tener presente' a la vez." },
      { i: Layers, t: "System prompt", b: "Instrucciones persistentes que se inyectan antes de cada mensaje. Definen la personalidad y reglas del asistente. Tú las controlas en API o configuración avanzada." },
      { i: Database, t: "Memory", b: "Algunas AIs (ChatGPT) recuerdan entre conversaciones. Útil para personalización, pero puede contaminarse. Aprende a usar la función de borrar memorias específicas." },
      { i: Network, t: "RAG (Retrieval-Augmented Generation)", b: "En vez de meter todo en el prompt, conectas la AI a una base de conocimiento que recupera lo relevante al momento. Así funciona NotebookLM con tus docs." },
      { i: Sparkles, t: "Embeddings", b: "Cada palabra/frase se convierte en un vector de números que representa su significado. Búsquedas semánticas y similaridad funcionan en este espacio." },
      { i: Anchor, t: "Instrucciones persistentes", b: "En ChatGPT: 'Custom Instructions'. En Claude: Projects. En Gemini: Gems. Configura una vez el contexto que se aplica a cada chat." },
    ],
    en: [
      { i: Brain, t: "Context window", b: "AI's memory window per conversation. GPT-4 has 128k tokens, Claude 3.5 has 200k, Gemini 1.5 has 1M+. The amount of info it can 'hold in mind' at once." },
      { i: Layers, t: "System prompt", b: "Persistent instructions injected before each message. They define the assistant's personality and rules. You control them in API or advanced settings." },
      { i: Database, t: "Memory", b: "Some AIs (ChatGPT) remember across conversations. Useful for personalization but can get contaminated. Learn to delete specific memories." },
      { i: Network, t: "RAG (Retrieval-Augmented Generation)", b: "Instead of stuffing everything in the prompt, you connect AI to a knowledge base that retrieves what's relevant on the fly. NotebookLM works this way with your docs." },
      { i: Sparkles, t: "Embeddings", b: "Every word/phrase becomes a vector of numbers representing its meaning. Semantic search and similarity work in this space." },
      { i: Anchor, t: "Persistent instructions", b: "ChatGPT: 'Custom Instructions'. Claude: Projects. Gemini: Gems. Configure context once, applies to each chat." },
    ],
    pt: [
      { i: Brain, t: "Context window", b: "A janela de memória da AI por conversa. GPT-4 tem 128k tokens, Claude 3.5 tem 200k, Gemini 1.5 tem 1M+. Quantidade de info que pode 'ter em mente' de uma vez." },
      { i: Layers, t: "System prompt", b: "Instruções persistentes injetadas antes de cada mensagem. Definem a personalidade e regras do assistente. Você controla na API ou config avançada." },
      { i: Database, t: "Memory", b: "Algumas AIs (ChatGPT) lembram entre conversas. Útil para personalização, mas pode contaminar. Aprenda a apagar memórias específicas." },
      { i: Network, t: "RAG (Retrieval-Augmented Generation)", b: "Em vez de enfiar tudo no prompt, conecta a AI a uma base de conhecimento que recupera o relevante na hora. NotebookLM funciona assim." },
      { i: Sparkles, t: "Embeddings", b: "Cada palavra/frase vira um vetor de números representando significado. Busca semântica e similaridade funcionam nesse espaço." },
      { i: Anchor, t: "Instruções persistentes", b: "ChatGPT: 'Custom Instructions'. Claude: Projects. Gemini: Gems. Configure o contexto uma vez, aplica em cada chat." },
    ],
  };

  return (
    <div className="module-body">
      {view}

      {level === "foundations" && (
        <Section eyebrow={t("common.framework")} title={t("context.section1")} icon={Network}>
          <p className="lead">
            {lang === "es" && "El prompt es solo la punta visible del iceberg. Debajo está el contexto: lo que la AI sabe, recuerda, puede consultar y asumir. Cuando dominas el contexto, tu prompt corto se vuelve más poderoso que el prompt largo de un novato."}
            {lang === "en" && "The prompt is just the visible tip of the iceberg. Below is the context: what the AI knows, remembers, can consult, and assume. When you master context, your short prompt becomes more powerful than a novice's long one."}
            {lang === "pt" && "O prompt é só a ponta visível do iceberg. Embaixo está o contexto: o que a AI sabe, lembra, pode consultar e assumir. Ao dominar contexto, seu prompt curto vira mais poderoso que o longo de um novato."}
          </p>
          <div className="grid-auto">
            {concepts[lang].map((c, i) => {
              const I = c.i;
              return (
                <Card key={i} className="concept-card">
                  <div className="concept-icon"><I size={15} /></div>
                  <div className="concept-title">{c.t}</div>
                  <div className="concept-body">{c.b}</div>
                </Card>
              );
            })}
          </div>
        </Section>
      )}

      {level === "advanced" && (
        <AlertBox kind="idea" title={t("context.adv1")}>
          {lang === "es" && "Pregunta clave del ingeniero de contexto: ¿qué información necesita la AI saber AHORA para esta tarea, qué información debería poder consultar, y qué información debería simplemente ignorar? El arte es separar señal de ruido en el contexto."}
          {lang === "en" && "Key context-engineer question: what info does the AI need to know NOW for this task, what should it be able to consult, and what should it simply ignore? The art is separating signal from noise in the context."}
          {lang === "pt" && "Pergunta-chave do engenheiro de contexto: que info a AI precisa saber AGORA para esta tarefa, o que deveria poder consultar, e o que deveria simplesmente ignorar? A arte é separar sinal de ruído no contexto."}
        </AlertBox>
      )}

      {level === "expert" && (
        <AlertBox kind="mentor">
          {lang === "es" && "El arquitecto de contexto entiende que el prompt es solo el 10% de la batalla. El 90% es ingeniería: qué documentos cargas, qué memorias dejas, qué system prompt diseñas, qué herramientas conectas. La diferencia entre una AI mediocre y una AI mágica es casi siempre contexto, no prompt."}
          {lang === "en" && "The context architect understands the prompt is only 10% of the battle. The 90% is engineering: which documents you load, which memories you keep, which system prompt you design, which tools you connect. The difference between a mediocre AI and a magical one is almost always context, not prompt."}
          {lang === "pt" && "O arquiteto de contexto entende que o prompt é só 10% da batalha. 90% é engenharia: quais documentos carrega, que memórias mantém, que system prompt desenha, que ferramentas conecta. A diferença entre AI medíocre e mágica é quase sempre contexto, não prompt."}
        </AlertBox>
      )}
    </div>
  );
}

/* ── Module 9: AI for Leadership & Strategy ─────────────────────────── */

function LeadershipModule({ lang }) {
  const t = useT();
  const { level, view } = LevelTabsBound({ moduleId: "leadership" });

  const scenarios = {
    es: [
      { i: Compass, t: "Toma de decisiones", b: "Pídele a la AI que sea tu 'sparring partner': 'Argumenta en contra de mi decisión con la mejor evidencia disponible. Sé incómodo.'" },
      { i: Sparkles, t: "Brainstorming", b: "Genera 20 ideas, después descártalas por viabilidad. La AI es excelente generando volumen; tú eres el filtro." },
      { i: Telescope, t: "Escenarios futuros", b: "'Modela 3 escenarios para nuestra industria en 5 años: optimista, base, pesimista. Identifica las señales tempranas de cada uno.'" },
      { i: Swords, t: "Análisis competitivo", b: "Pídele perfilar a tu competidor desde su perspectiva. '¿Cómo nos atacaría si fueras ellos?' Es el ejercicio más subutilizado." },
      { i: Crown, t: "Pensamiento estratégico", b: "'Identifica las 3 hipótesis no testeadas en mi plan estratégico. Para cada una, propón el experimento más barato.'" },
      { i: Users, t: "Comunicación de liderazgo", b: "Adapta el mismo mensaje a 5 audiencias: junta, equipo, prensa, cliente, regulador. La AI brilla en este pivot." },
    ],
    en: [
      { i: Compass, t: "Decision-making", b: "Ask AI to be your sparring partner: 'Argue against my decision with the best available evidence. Be uncomfortable.'" },
      { i: Sparkles, t: "Brainstorming", b: "Generate 20 ideas, then filter by viability. AI is great at volume; you're the filter." },
      { i: Telescope, t: "Future scenarios", b: "'Model 3 scenarios for our industry in 5 years: optimistic, base, pessimistic. Identify early signals of each.'" },
      { i: Swords, t: "Competitive analysis", b: "Have it profile your competitor from their perspective. 'How would you attack us if you were them?' The most underused exercise." },
      { i: Crown, t: "Strategic thinking", b: "'Identify the 3 untested hypotheses in my strategic plan. For each, propose the cheapest experiment.'" },
      { i: Users, t: "Leadership communication", b: "Adapt the same message to 5 audiences: board, team, press, client, regulator. AI shines at this pivot." },
    ],
    pt: [
      { i: Compass, t: "Tomada de decisão", b: "Peça à AI para ser seu sparring partner: 'Argumente contra minha decisão com a melhor evidência. Seja incômodo.'" },
      { i: Sparkles, t: "Brainstorming", b: "Gere 20 ideias, depois filtre por viabilidade. A AI é ótima em volume; você é o filtro." },
      { i: Telescope, t: "Cenários futuros", b: "'Modele 3 cenários para nossa indústria em 5 anos: otimista, base, pessimista. Identifique sinais iniciais de cada um.'" },
      { i: Swords, t: "Análise competitiva", b: "Peça para perfilar seu concorrente desde a perspectiva dele. 'Como nos atacaria se fosse eles?' Exercício mais subutilizado." },
      { i: Crown, t: "Pensamento estratégico", b: "'Identifique as 3 hipóteses não testadas no meu plano. Para cada uma, proponha o experimento mais barato.'" },
      { i: Users, t: "Comunicação de liderança", b: "Adapte a mesma mensagem a 5 audiências: diretoria, equipe, imprensa, cliente, regulador. A AI brilha nesse pivot." },
    ],
  };

  return (
    <div className="module-body">
      {view}

      {level === "foundations" && (
        <Section eyebrow={t("common.useCases")} title={t("leadership.section1")} icon={Compass}>
          <p className="lead">
            {lang === "es" && "El líder moderno no usa la AI para que decida por él — la usa para mejorar sus decisiones. La diferencia es enorme. La AI no tiene tu contexto, tu intuición construida en años, tu responsabilidad. Pero tiene paciencia infinita, perspectiva infinita y cero ego."}
            {lang === "en" && "The modern leader doesn't use AI to decide for them — they use it to improve their decisions. The difference is enormous. AI doesn't have your context, your years-built intuition, your accountability. But it has infinite patience, infinite perspective, and zero ego."}
            {lang === "pt" && "O líder moderno não usa a AI para decidir por ele — usa para melhorar suas decisões. A diferença é enorme. A AI não tem seu contexto, sua intuição de anos, sua responsabilidade. Mas tem paciência infinita, perspectiva infinita, e ego zero."}
          </p>
          <div className="grid-auto">
            {scenarios[lang].map((s, i) => {
              const I = s.i;
              return (
                <Card key={i} className="scenario-card">
                  <div className="scenario-icon"><I size={15} /></div>
                  <div className="scenario-title">{s.t}</div>
                  <div className="scenario-body">{s.b}</div>
                </Card>
              );
            })}
          </div>
        </Section>
      )}

      {level === "advanced" && (
        <AlertBox kind="idea">
          {lang === "es" && "El truco de los líderes top: no le piden a la AI 'qué hacer'. Le piden 'qué preguntas no me estoy haciendo'. Esa es la pregunta que multiplica el valor del modelo, porque encuentra los puntos ciegos del humano."}
          {lang === "en" && "Top leaders' trick: they don't ask AI 'what to do'. They ask 'what questions am I not asking'. That's the multiplier question, because it surfaces human blind spots."}
          {lang === "pt" && "Truque dos líderes top: não pedem à AI 'o que fazer'. Pedem 'que perguntas não estou fazendo'. Essa é a pergunta multiplicadora, porque encontra os pontos cegos do humano."}
        </AlertBox>
      )}

      {level === "expert" && (
        <AlertBox kind="mentor">
          {lang === "es" && "El liderazgo con AI no es delegación: es amplificación del juicio. Tu trabajo de líder no cambia — sigue siendo decidir bajo incertidumbre con consecuencias humanas. Pero ahora tienes un equipo de asesores de élite a un prompt de distancia. Úsalos para pensar mejor, no para pensar menos."}
          {lang === "en" && "Leadership with AI isn't delegation: it's judgment amplification. Your job as a leader doesn't change — it's still deciding under uncertainty with human consequences. But now you have a team of elite advisors a prompt away. Use them to think better, not to think less."}
          {lang === "pt" && "Liderança com AI não é delegação: é amplificação de julgamento. Seu trabalho de líder não muda — segue sendo decidir sob incerteza com consequências humanas. Mas agora você tem um time de assessores de elite a um prompt de distância. Use-os para pensar melhor, não menos."}
        </AlertBox>
      )}
    </div>
  );
}

/* ── Module 10: Ethics & Future ─────────────────────────────────────── */

function EthicsModule({ lang }) {
  const t = useT();
  const { level, view } = LevelTabsBound({ moduleId: "ethics" });

  const themes = {
    es: [
      { i: AlertTriangle, t: "Sesgos heredados", b: "El modelo aprendió de texto humano: por tanto refleja nuestros sesgos. Tu prompt puede amplificarlos o mitigarlos." },
      { i: ShieldCheck, t: "Privacidad", b: "No subas información confidencial sin entender la política del proveedor. Empresa: usa planes enterprise con cláusulas de no-entrenamiento." },
      { i: Scale, t: "Atribución y autoría", b: "Lo que la AI escribe contigo es tuyo en uso, pero la honestidad intelectual exige declarar la colaboración cuando es sustancial." },
      { i: Lock, t: "Regulación", b: "EU AI Act, normativas en US, Brasil, Argentina, México. La regulación está naciendo. Mantente informado." },
      { i: Users, t: "Impacto laboral", b: "Algunos trabajos cambiarán radicalmente, otros desaparecerán, muchos nuevos nacerán. La pregunta no es 'si' sino 'cuándo' y 'cómo prepararse'." },
      { i: Heart, t: "Coexistencia humano + AI", b: "El futuro no es humanos vs AI. Es humanos potenciados por AI vs humanos que se resistieron a la AI. Esa es la única competencia que importa." },
    ],
    en: [
      { i: AlertTriangle, t: "Inherited biases", b: "The model learned from human text: it reflects our biases. Your prompt can amplify or mitigate them." },
      { i: ShieldCheck, t: "Privacy", b: "Don't upload confidential info without understanding the provider's policy. Business: use enterprise plans with no-training clauses." },
      { i: Scale, t: "Attribution and authorship", b: "What AI writes with you is yours in use, but intellectual honesty requires disclosing the collaboration when it's substantial." },
      { i: Lock, t: "Regulation", b: "EU AI Act, US, Brazil, Argentina, Mexico regulations. Regulation is being born. Stay informed." },
      { i: Users, t: "Labor impact", b: "Some jobs will change radically, others disappear, many new ones are born. The question isn't 'if' but 'when' and 'how to prepare'." },
      { i: Heart, t: "Human + AI coexistence", b: "The future isn't humans vs AI. It's humans empowered by AI vs humans who resisted AI. That's the only competition that matters." },
    ],
    pt: [
      { i: AlertTriangle, t: "Vieses herdados", b: "O modelo aprendeu de texto humano: reflete nossos vieses. Seu prompt pode amplificar ou mitigar." },
      { i: ShieldCheck, t: "Privacidade", b: "Não suba info confidencial sem entender a política do fornecedor. Empresa: use planos enterprise com cláusulas de não-treinamento." },
      { i: Scale, t: "Atribuição e autoria", b: "O que a AI escreve com você é seu em uso, mas honestidade intelectual exige declarar a colaboração quando substancial." },
      { i: Lock, t: "Regulação", b: "EU AI Act, regulação em US, Brasil, Argentina, México. A regulação está nascendo. Mantenha-se informado." },
      { i: Users, t: "Impacto laboral", b: "Alguns trabalhos mudarão radicalmente, outros desaparecerão, muitos novos nascerão. A pergunta não é 'se' mas 'quando' e 'como se preparar'." },
      { i: Heart, t: "Coexistência humano + AI", b: "O futuro não é humanos vs AI. É humanos potencializados por AI vs humanos que resistiram. Essa é a única competição que importa." },
    ],
  };

  return (
    <div className="module-body">
      {view}

      {level === "foundations" && (
        <Section eyebrow={t("common.reflection")} title={t("ethics.section1")} icon={Scale}>
          <p className="lead">
            {lang === "es" && "Toda tecnología transformadora viene con dilemas. La imprenta. La electricidad. Internet. La AI no es la excepción. Pero la ética no es un freno: es la dirección. Saber dónde NO ir es lo que te permite ir más lejos que nadie."}
            {lang === "en" && "Every transformative technology comes with dilemmas. The printing press. Electricity. The internet. AI is no exception. But ethics isn't a brake: it's the direction. Knowing where NOT to go is what lets you go further than anyone."}
            {lang === "pt" && "Toda tecnologia transformadora vem com dilemas. A imprensa. A eletricidade. A internet. A AI não é exceção. Mas ética não é freio: é direção. Saber para onde NÃO ir é o que te deixa ir mais longe."}
          </p>
          <div className="grid-auto">
            {themes[lang].map((th, i) => {
              const I = th.i;
              return (
                <Card key={i} className="ethics-card">
                  <div className="ethics-icon"><I size={15} /></div>
                  <div className="ethics-title">{th.t}</div>
                  <div className="ethics-body">{th.b}</div>
                </Card>
              );
            })}
          </div>
        </Section>
      )}

      {level === "advanced" && (
        <Section eyebrow={t("common.philosophy")} title={t("ethics.adv1")} icon={Sparkles}>
          <Card className="philosophy-card">
            <div className="philosophy-text">
              {lang === "es" && "La AI no vino a reemplazarte. Vino a liberarte de lo que nunca debiste hacer en primer lugar. El trabajo repetitivo, sin alma, mecánico — eso es lo que la AI absorbe. Lo humano queda: el juicio bajo ambigüedad, la creatividad genuina, la responsabilidad, el cuidado, el liderazgo, la pregunta correcta. Eso no se delega. Eso es lo que define la próxima década de tu carrera."}
              {lang === "en" && "AI didn't come to replace you. It came to free you from what you never should have been doing in the first place. The repetitive, soulless, mechanical work — that's what AI absorbs. The human remains: judgment under ambiguity, genuine creativity, responsibility, care, leadership, the right question. That can't be delegated. That's what defines the next decade of your career."}
              {lang === "pt" && "A AI não veio te substituir. Veio te libertar do que você nunca deveria estar fazendo. O trabalho repetitivo, sem alma, mecânico — isso a AI absorve. O humano permanece: julgamento sob ambiguidade, criatividade genuína, responsabilidade, cuidado, liderança, a pergunta certa. Isso não se delega. Isso define a próxima década da sua carreira."}
            </div>
          </Card>
        </Section>
      )}

      {level === "expert" && (
        <Section eyebrow={t("common.close")} title={t("ethics.exp1")} icon={Crown}>
          <Card className="closing-card">
            <Sparkles size={28} className="closing-icon" />
            <div className="closing-title">
              {lang === "es" && "Ahora sabes hablar con cualquier AI."}
              {lang === "en" && "Now you know how to talk to any AI."}
              {lang === "pt" && "Agora você sabe falar com qualquer AI."}
            </div>
            <div className="closing-body">
              {lang === "es" && "No como un usuario. Como un arquitecto. Has visto la historia, la anatomía, los casos, las herramientas, los dilemas. Lo que viene depende solo de ti: tu curiosidad, tu disciplina, tu criterio. La AI multiplicará lo que ya eres. Hazte digno de esa multiplicación."}
              {lang === "en" && "Not as a user. As an architect. You've seen the history, the anatomy, the cases, the tools, the dilemmas. What comes next depends only on you: your curiosity, your discipline, your judgment. AI will multiply what you already are. Be worthy of that multiplication."}
              {lang === "pt" && "Não como um usuário. Como um arquiteto. Você viu a história, a anatomia, os casos, as ferramentas, os dilemas. O que vem depende só de você: sua curiosidade, sua disciplina, seu critério. A AI multiplicará o que você já é. Seja digno dessa multiplicação."}
            </div>
          </Card>
        </Section>
      )}
    </div>
  );
}


/* ============================================================================
   TOOL VIEWS — Evaluator, Templates, Battle, Skills, Capstone
   ========================================================================== */

/* ── Tool: AI Prompt Evaluator ───────────────────────────────────────── */

function PromptEvaluatorView({ lang }) {
  const t = useT();
  const [inputRaw, setInput] = usePersistentState(KEYS.EVAL_DRAFT, "");
  const input = typeof inputRaw === "string" ? inputRaw : "";
  const [result, setResult] = useState(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [showOpt, setShowOpt] = useState(false);
  const [showExp, setShowExp] = useState(false);

  const analyze = useCallback(() => {
    if (!input.trim()) return;
    setAnalyzing(true);
    setShowOpt(false);
    setShowExp(false);
    setTimeout(() => {
      const evalResult = evaluatePrompt(input);
      const recommended = recommendAIForPrompt(input);
      setResult({ ...evalResult, recommended });
      setAnalyzing(false);
    }, 700);
  }, [input]);

  const levelInfo = result ? LEVEL_INFO[result.level] : null;

  return (
    <div className="tool-view evaluator">
      <div className="tool-head">
        <div className="tool-head-icon"><Wand2 size={22} /></div>
        <div>
          <h1 className="tool-title">{t("evaluator.title")}</h1>
          <p className="tool-sub">{t("evaluator.sub")}</p>
        </div>
      </div>

      <Card className="eval-input-card">
        <label className="eval-label">
          <PenLine size={13} />
          <span>{t("evaluator.inputLabel")}</span>
        </label>
        <textarea
          className="ta-pro"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={t("evaluator.placeholder")}
          rows={8}
        />
        <div className="eval-actions">
          <div className="eval-meta">
            <span>{input.length} {t("common.chars")}</span>
            <span className="dot-sep">·</span>
            <span>{input.trim().split(/\s+/).filter(Boolean).length} {t("common.words")}</span>
          </div>
          <div className="eval-buttons">
            <button className="btn-ghost" onClick={() => { setInput(""); setResult(null); }} disabled={!input}>
              <X size={13} /> <span>{t("common.clear")}</span>
            </button>
            <button className="btn-primary" onClick={analyze} disabled={!input.trim() || analyzing}>
              {analyzing ? <RotateCw size={14} className="spin" /> : <Sparkles size={14} />}
              <span>{analyzing ? t("evaluator.analyzing") : t("evaluator.analyze")}</span>
            </button>
          </div>
        </div>
      </Card>

      {result && (
        <>
          <div className="eval-results-grid">
            <Card className="eval-score-card">
              <div className="eval-score-head">
                <Trophy size={14} />
                <span>{t("evaluator.overallScore")}</span>
              </div>
              <ScoreGauge value={result.score} level={result.level} label={levelInfo?.[lang]} />
              <div className="eval-level-tag" style={{ "--level-color": `var(--gauge-${result.level})` }}>
                <Crown size={12} />
                <span>{levelInfo?.[lang]}</span>
              </div>
            </Card>

            <Card className="eval-recommend-card">
              <div className="eval-recommend-head">
                <Compass size={14} />
                <span>{t("evaluator.bestAI")}</span>
              </div>
              <div className="eval-recommend-badge">
                <AIBadge id={result.recommended} size="lg" />
              </div>
              <div className="eval-recommend-reason">
                {AI_MODELS[result.recommended].bestFor[lang]}
              </div>
            </Card>

            <Card className="eval-dims-card">
              <div className="eval-dims-head">
                <Layers size={14} />
                <span>{t("evaluator.dimensions")}</span>
              </div>
              <div className="dims-list">
                {Object.entries(result.dims).map(([k, v]) => (
                  <DimensionBar key={k} label={DIM_LABELS[k]?.[lang] || k} score={v} />
                ))}
              </div>
            </Card>
          </div>

          <div className="grid-2">
            {result.strengths.length > 0 && (
              <Card className="eval-list-card strengths">
                <div className="eval-list-head">
                  <CheckCircle2 size={14} />
                  <span>{t("evaluator.strengths")}</span>
                </div>
                <ul className="eval-list">
                  {result.strengths.map((s, i) => (
                    <li key={i}><Check size={12} /><span>{s[lang]}</span></li>
                  ))}
                </ul>
              </Card>
            )}
            {result.weaknesses.length > 0 && (
              <Card className="eval-list-card weaknesses">
                <div className="eval-list-head">
                  <AlertTriangle size={14} />
                  <span>{t("evaluator.weaknesses")}</span>
                </div>
                <ul className="eval-list">
                  {result.weaknesses.map((w, i) => (
                    <li key={i}><AlertTriangle size={12} /><span>{w[lang]}</span></li>
                  ))}
                </ul>
              </Card>
            )}
          </div>

          {result.suggestions.length > 0 && (
            <Card className="mentor-card">
              <div className="mentor-head">
                <Sparkles size={14} />
                <span>{t("evaluator.mentorSays")}</span>
              </div>
              <ul className="mentor-list">
                {result.suggestions.map((s, i) => (
                  <li key={i} className="mentor-item">
                    <ArrowRight size={12} className="mentor-arrow" />
                    <span>{s[lang]}</span>
                  </li>
                ))}
              </ul>
            </Card>
          )}

          <Card className="eval-versions">
            <div className="eval-versions-head">
              <Layers size={14} />
              <span>{t("evaluator.versions")}</span>
            </div>
            <div className="eval-versions-tabs">
              <button className={`ver-tab ${!showOpt && !showExp ? "active" : ""}`} onClick={() => { setShowOpt(false); setShowExp(false); }}>
                <PenLine size={12} /><span>{t("evaluator.original")}</span>
              </button>
              <button className={`ver-tab ${showOpt && !showExp ? "active" : ""}`} onClick={() => { setShowOpt(true); setShowExp(false); }}>
                <Sparkles size={12} /><span>{t("evaluator.optimized")}</span>
              </button>
              <button className={`ver-tab ${showExp ? "active" : ""}`} onClick={() => { setShowOpt(false); setShowExp(true); }}>
                <Crown size={12} /><span>{t("evaluator.expert")}</span>
              </button>
            </div>
            <CodeBlock
              code={showExp ? buildExpertPrompt(input, lang) : (showOpt ? buildOptimizedPrompt(input, lang) : input)}
              lang="prompt"
              label={showExp ? t("evaluator.expert") : (showOpt ? t("evaluator.optimized") : t("evaluator.original"))}
            />
          </Card>
        </>
      )}

      {!result && !analyzing && (
        <Card className="eval-empty">
          <Wand2 size={28} className="eval-empty-icon" />
          <div className="eval-empty-title">{t("evaluator.emptyTitle")}</div>
          <div className="eval-empty-body">{t("evaluator.emptyBody")}</div>
        </Card>
      )}
    </div>
  );
}

/* ── Tool: Templates Library ─────────────────────────────────────────── */

function TemplatesLibraryView({ lang }) {
  const t = useT();
  const [activeCat, setActiveCat] = useState("all");
  const [query, setQuery] = useState("");
  const [copiedId, setCopiedId] = useState(null);

  const cats = useMemo(() => {
    const set = new Set(TEMPLATES.map((tpl) => tpl.category));
    return ["all", ...Array.from(set)];
  }, []);

  const filtered = useMemo(() => {
    return TEMPLATES.filter((tpl) => {
      if (activeCat !== "all" && tpl.category !== activeCat) return false;
      if (query) {
        const title = (tpl[lang]?.title || "").toLowerCase();
        if (!title.includes(query.toLowerCase())) return false;
      }
      return true;
    });
  }, [activeCat, query, lang]);

  const copy = (id, body) => {
    try {
      navigator.clipboard.writeText(body);
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 1600);
    } catch (e) { /* noop */ }
  };

  return (
    <div className="tool-view templates">
      <div className="tool-head">
        <div className="tool-head-icon"><Library size={22} /></div>
        <div>
          <h1 className="tool-title">{t("templates.title")}</h1>
          <p className="tool-sub">{t("templates.sub")}</p>
        </div>
      </div>

      <div className="tpl-toolbar">
        <div className="search-box">
          <Search size={14} />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={t("templates.searchPlaceholder")}
          />
          {query && <button className="search-clear" onClick={() => setQuery("")}><X size={12} /></button>}
        </div>
        <div className="tpl-cats">
          {cats.map((c) => (
            <button
              key={c}
              className={`tpl-cat ${activeCat === c ? "active" : ""}`}
              onClick={() => setActiveCat(c)}
            >
              {t(`templates.cat.${c}`)}
            </button>
          ))}
        </div>
      </div>

      {filtered.length === 0 ? (
        <Card className="tpl-empty">
          <Search size={26} className="tpl-empty-icon" />
          <div className="tpl-empty-title">{t("templates.empty")}</div>
        </Card>
      ) : (
        <div className="tpl-grid">
          {filtered.map((tpl) => {
            const Icon = tpl.icon;
            const data = tpl[lang];
            return (
              <Card key={tpl.id} className="tpl-card">
                <div className="tpl-card-head">
                  <div className="tpl-card-icon"><Icon size={14} /></div>
                  <div className="tpl-card-cat">{t(`templates.cat.${tpl.category}`)}</div>
                </div>
                <div className="tpl-card-title">{data.title}</div>
                <pre className="tpl-card-body">{data.body}</pre>
                <button className="tpl-copy" onClick={() => copy(tpl.id, data.body)}>
                  {copiedId === tpl.id ? <Check size={12} /> : <Copy size={12} />}
                  <span>{copiedId === tpl.id ? t("common.copied") : t("common.copy")}</span>
                </button>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}


/* ── Tool: AI Battle Mode ────────────────────────────────────────────── */

function simulateAIResponse(prompt, modelId, lang) {
  const model = AI_MODELS[modelId];
  if (!model) return "";
  const wordCount = prompt.trim().split(/\s+/).filter(Boolean).length;
  const hasStructure = /[\n\r]/.test(prompt) || /[#\*\-]/.test(prompt);
  const isQuestion = /\?/.test(prompt) || /^(qué|cómo|cuándo|dónde|por qué|what|how|when|where|why|o que|como)/i.test(prompt.trim());

  const styles = {
    chatgpt: {
      es: `[ChatGPT respondería]: Iría directo al grano con una estructura clara — generalmente un encabezado, una lista numerada de puntos clave (${Math.min(5, Math.max(3, Math.floor(wordCount / 15)))} ítems), y un cierre práctico. Su tono es accesible, conversacional pero competente. Es excelente generando volumen rápido${isQuestion ? ' y dando respuestas directas a preguntas.' : ' y ejecutando tareas amplias.'} Riesgo: puede sonar genérico si el prompt no es específico.`,
      en: `[ChatGPT would respond]: It would go straight to the point with a clear structure — typically a header, a numbered list of key points (${Math.min(5, Math.max(3, Math.floor(wordCount / 15)))} items), and a practical closing. Its tone is accessible, conversational yet competent. Excellent at fast volume${isQuestion ? ' and direct answers to questions.' : ' and executing broad tasks.'} Risk: may sound generic if the prompt isn't specific.`,
      pt: `[ChatGPT responderia]: Iria direto ao ponto com estrutura clara — tipicamente um cabeçalho, lista numerada de pontos-chave (${Math.min(5, Math.max(3, Math.floor(wordCount / 15)))} itens), e fechamento prático. Tom acessível e conversacional. Excelente em volume rápido${isQuestion ? ' e respostas diretas.' : ' e tarefas amplas.'} Risco: pode soar genérico sem prompt específico.`,
    },
    claude: {
      es: `[Claude respondería]: Empezaría considerando el contexto y las posibles interpretaciones antes de responder. Su respuesta sería más matizada, con razonamiento explícito ("primero examino X, luego Y..."). Estructura más prosaica que ChatGPT, con ${hasStructure ? 'estructura honrando la tuya' : 'flujo narrativo cuidadoso'}. Cita advertencias y limitaciones cuando son relevantes. Ideal cuando la pregunta tiene capas o requiere juicio ético.`,
      en: `[Claude would respond]: Would start by considering context and possible interpretations before answering. The response would be more nuanced, with explicit reasoning ("first I examine X, then Y..."). More prose-driven structure, ${hasStructure ? 'honoring yours' : 'with careful narrative flow'}. Cites caveats and limitations when relevant. Ideal when the question has layers or requires ethical judgment.`,
      pt: `[Claude responderia]: Começaria considerando contexto e possíveis interpretações antes de responder. Resposta mais matizada, com raciocínio explícito ("primeiro examino X, depois Y..."). Estrutura mais prosaica${hasStructure ? ', honrando a sua' : ', com fluxo narrativo cuidadoso'}. Cita ressalvas e limitações quando relevantes.`,
    },
    gemini: {
      es: `[Gemini respondería]: Aprovecharía sus integraciones — si tu prompt menciona algo factual, podría buscar y citar fuentes recientes. Respuesta multimodal-amistosa: si menciona un documento, lo procesaría inline. Estructura visual cuidada (a veces incluye tablas o comparaciones). Su gran ventaja: contexto extremadamente largo, puede manejar hasta 1M tokens.`,
      en: `[Gemini would respond]: Would leverage integrations — if your prompt mentions something factual, it could search and cite recent sources. Multimodal-friendly: if a document is mentioned, it processes inline. Careful visual structure (sometimes includes tables or comparisons). Big advantage: extremely long context, handles up to 1M tokens.`,
      pt: `[Gemini responderia]: Aproveitaria integrações — se seu prompt menciona algo factual, poderia buscar e citar fontes recentes. Resposta multimodal-amigável. Estrutura visual cuidada (às vezes inclui tabelas). Grande vantagem: contexto extremamente longo, até 1M tokens.`,
    },
    perplexity: {
      es: `[Perplexity respondería]: Esto es lo que NINGÚN otro hace bien — citaría fuentes reales y verificables en cada afirmación. Su respuesta sería más corta pero respaldada con links: ${Math.max(3, Math.floor(wordCount / 25))} fuentes promedio. Cero alucinaciones porque cada claim viene amarrado a una URL real. Trade-off: menos creatividad y menos profundidad de razonamiento que Claude/ChatGPT.`,
      en: `[Perplexity would respond]: This is what NO ONE else does well — it would cite real, verifiable sources for every claim. Shorter response but backed by links: ${Math.max(3, Math.floor(wordCount / 25))} sources avg. Zero hallucinations because every claim is tied to a real URL. Trade-off: less creativity and reasoning depth than Claude/ChatGPT.`,
      pt: `[Perplexity responderia]: Isso é o que NINGUÉM mais faz bem — citaria fontes reais e verificáveis para cada afirmação. Resposta mais curta mas com links: ${Math.max(3, Math.floor(wordCount / 25))} fontes em média. Zero alucinações. Trade-off: menos criatividade e profundidade que Claude/ChatGPT.`,
    },
    notebooklm: {
      es: `[NotebookLM respondería]: NotebookLM solo responde sobre las fuentes que tú le has subido. Si tu prompt es general, te diría: "Necesito documentos para responder esto." Su valor único: cuando le subes 20 papers, te da una respuesta que cita exactamente cuál párrafo de cuál documento sustenta cada idea. Para tesis, investigación, lecturas largas — es imbatible.`,
      en: `[NotebookLM would respond]: NotebookLM only answers about sources YOU have uploaded. If your prompt is general, it would say: "I need documents to answer this." Its unique value: when you upload 20 papers, it gives an answer citing exactly which paragraph of which document supports each idea. For theses, research, long readings — unbeatable.`,
      pt: `[NotebookLM responderia]: NotebookLM só responde sobre as fontes que VOCÊ subiu. Se seu prompt é geral, diria: "Preciso de documentos para responder." Valor único: ao subir 20 papers, dá resposta citando exatamente qual parágrafo de qual documento sustenta cada ideia. Para teses e pesquisas — imbatível.`,
    },
  };
  return styles[modelId]?.[lang] || "";
}

function AIBattleView({ lang }) {
  const t = useT();
  const [inputRaw, setInput] = usePersistentState(KEYS.BATTLE_DRAFT, "");
  const input = typeof inputRaw === "string" ? inputRaw : "";
  const [running, setRunning] = useState(false);
  const [responses, setResponses] = useState(null);

  const run = useCallback(() => {
    if (!input.trim()) return;
    setRunning(true);
    setResponses(null);
    setTimeout(() => {
      const out = {};
      Object.keys(AI_MODELS).forEach((id) => {
        out[id] = simulateAIResponse(input, id, lang);
      });
      setResponses(out);
      setRunning(false);
    }, 1200);
  }, [input, lang]);

  const winnerId = useMemo(() => {
    if (!input) return null;
    return recommendAIForPrompt(input);
  }, [input]);

  return (
    <div className="tool-view battle">
      <div className="tool-head">
        <div className="tool-head-icon"><Swords size={22} /></div>
        <div>
          <h1 className="tool-title">{t("battle.title")}</h1>
          <p className="tool-sub">{t("battle.sub")}</p>
        </div>
      </div>

      <Card className="battle-input-card">
        <label className="eval-label">
          <PenLine size={13} />
          <span>{t("battle.inputLabel")}</span>
        </label>
        <textarea
          className="ta-pro"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={t("battle.placeholder")}
          rows={6}
        />
        <div className="eval-actions">
          <div className="eval-meta">{input.trim().split(/\s+/).filter(Boolean).length} {t("common.words")}</div>
          <button className="btn-primary" onClick={run} disabled={!input.trim() || running}>
            {running ? <RotateCw size={14} className="spin" /> : <Swords size={14} />}
            <span>{running ? t("battle.running") : t("battle.run")}</span>
          </button>
        </div>
      </Card>

      {responses && (
        <>
          <div className="battle-results">
            {Object.entries(responses).map(([id, text]) => (
              <Card key={id} className={`battle-card ${winnerId === id ? "winner" : ""}`}>
                <div className="battle-card-head">
                  <AIBadge id={id} size="lg" />
                  {winnerId === id && (
                    <div className="battle-winner-tag">
                      <Trophy size={12} />
                      <span>{t("battle.recommended")}</span>
                    </div>
                  )}
                </div>
                <div className="battle-card-body">{text}</div>
              </Card>
            ))}
          </div>

          <AlertBox kind="mentor" title={t("battle.verdict")}>
            {lang === "es" && `Para este prompt, el modelo que probablemente brindará la mejor respuesta es ${AI_MODELS[winnerId].name}. Razón: ${AI_MODELS[winnerId].bestFor.es}. Sin embargo, vale la pena probar 2-3 modelos cuando el output es crítico y compararlos lado a lado.`}
            {lang === "en" && `For this prompt, the model likely to give the best response is ${AI_MODELS[winnerId].name}. Reason: ${AI_MODELS[winnerId].bestFor.en}. Still, it's worth testing 2-3 models when output is critical and comparing side by side.`}
            {lang === "pt" && `Para este prompt, o modelo que provavelmente dará a melhor resposta é ${AI_MODELS[winnerId].name}. Razão: ${AI_MODELS[winnerId].bestFor.pt}. Vale testar 2-3 modelos quando o output é crítico e comparar lado a lado.`}
          </AlertBox>
        </>
      )}

      {!responses && !running && (
        <Card className="eval-empty">
          <Swords size={28} className="eval-empty-icon" />
          <div className="eval-empty-title">{t("battle.emptyTitle")}</div>
          <div className="eval-empty-body">{t("battle.emptyBody")}</div>
        </Card>
      )}
    </div>
  );
}

/* ── Tool: Skill Tree ─────────────────────────────────────────────── */

function SkillTreeView({ lang, completed }) {
  const t = useT();

  const unlockState = useMemo(() => {
    return SKILL_TREE.map((skill) => {
      const total = skill.requiredModules.length;
      const done = skill.requiredModules.filter((m) => completed[m]).length;
      const pct = total ? (done / total) * 100 : 0;
      return { ...skill, done, total, pct, unlocked: done === total };
    });
  }, [completed]);

  const totalUnlocked = unlockState.filter((s) => s.unlocked).length;

  return (
    <div className="tool-view skills">
      <div className="tool-head">
        <div className="tool-head-icon"><Trees size={22} /></div>
        <div>
          <h1 className="tool-title">{t("skills.title")}</h1>
          <p className="tool-sub">{t("skills.sub")}</p>
        </div>
      </div>

      <Card className="skill-stats">
        <div className="skill-stat">
          <Award size={16} />
          <div>
            <div className="skill-stat-value">{totalUnlocked} / {SKILL_TREE.length}</div>
            <div className="skill-stat-label">{t("skills.unlocked")}</div>
          </div>
        </div>
        <div className="skill-stat">
          <Trophy size={16} />
          <div>
            <div className="skill-stat-value">{Math.round((totalUnlocked / SKILL_TREE.length) * 100)}%</div>
            <div className="skill-stat-label">{t("skills.mastery")}</div>
          </div>
        </div>
      </Card>

      <div className="skill-grid">
        {unlockState.map((s) => {
          const Icon = s.icon;
          return (
            <Card key={s.id} className={`skill-node ${s.unlocked ? "unlocked" : "locked"}`}>
              <div className="skill-node-head">
                <div className="skill-node-icon"><Icon size={16} /></div>
                {s.unlocked ? <CheckCircle2 size={14} className="skill-state-ok" /> : <Lock size={13} className="skill-state-lock" />}
              </div>
              <div className="skill-node-title">{s[lang]?.title}</div>
              <div className="skill-node-body">{s[lang]?.desc}</div>
              <div className="skill-node-progress">
                <div className="skill-track">
                  <div className="skill-fill" style={{ width: `${s.pct}%` }} />
                </div>
                <div className="skill-progress-text">{s.done} / {s.total} {t("skills.modules")}</div>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}

/* ── Tool: Final Capstone ────────────────────────────────────────────── */

function CapstoneView({ lang }) {
  const t = useT();
  const [activeCase, setActiveCase] = usePersistentState(KEYS.CAPSTONE_CASE, CAPSTONE_CASES[0].id);
  const [solutionRaw, setSolution] = usePersistentState(KEYS.CAPSTONE_SOLUTION, "");
  const solution = typeof solutionRaw === "string" ? solutionRaw : "";
  const [result, setResult] = useState(null);
  const [analyzing, setAnalyzing] = useState(false);

  const currentCase = CAPSTONE_CASES.find((c) => c.id === activeCase) || CAPSTONE_CASES[0];
  const CaseIcon = currentCase.icon;

  const submit = useCallback(() => {
    if (!solution.trim() || solution.trim().split(/\s+/).length < 30) return;
    setAnalyzing(true);
    setResult(null);
    setTimeout(() => {
      const evalRes = evaluatePrompt(solution);
      const rec = recommendAIForPrompt(solution);
      setResult({ ...evalRes, recommended: rec });
      setAnalyzing(false);
    }, 1200);
  }, [solution]);

  const certified = result && result.score >= 70;

  return (
    <div className="tool-view capstone">
      <div className="tool-head">
        <div className="tool-head-icon"><GraduationCap size={22} /></div>
        <div>
          <h1 className="tool-title">{t("capstone.title")}</h1>
          <p className="tool-sub">{t("capstone.sub")}</p>
        </div>
      </div>

      <Card className="capstone-cases">
        <div className="capstone-cases-label">
          <Briefcase size={13} /><span>{t("capstone.chooseCase")}</span>
        </div>
        <div className="capstone-case-tabs">
          {CAPSTONE_CASES.map((c) => {
            const Icon = c.icon;
            return (
              <button
                key={c.id}
                className={`cap-case-tab ${activeCase === c.id ? "active" : ""}`}
                onClick={() => { setActiveCase(c.id); setResult(null); }}
              >
                <Icon size={13} />
                <span>{c[lang]?.title}</span>
              </button>
            );
          })}
        </div>
      </Card>

      <Card className="capstone-scenario">
        <div className="capstone-scenario-head">
          <CaseIcon size={16} />
          <span>{currentCase[lang]?.title}</span>
        </div>
        <p className="capstone-scenario-body">{currentCase[lang]?.scenario}</p>
      </Card>

      <Card className="capstone-input-card">
        <label className="eval-label">
          <PenLine size={13} />
          <span>{t("capstone.yourPrompt")}</span>
        </label>
        <textarea
          className="ta-pro"
          value={solution}
          onChange={(e) => setSolution(e.target.value)}
          placeholder={t("capstone.placeholder")}
          rows={12}
        />
        <div className="eval-actions">
          <div className="eval-meta">{solution.trim().split(/\s+/).filter(Boolean).length} {t("common.words")} · {t("capstone.minWords")}</div>
          <button className="btn-primary" onClick={submit} disabled={!solution.trim() || analyzing || solution.trim().split(/\s+/).length < 30}>
            {analyzing ? <RotateCw size={14} className="spin" /> : <Send size={14} />}
            <span>{analyzing ? t("capstone.evaluating") : t("capstone.submit")}</span>
          </button>
        </div>
      </Card>

      {result && (
        <>
          <div className="capstone-results-grid">
            <Card className="capstone-score-card">
              <div className="eval-score-head">
                <Trophy size={14} />
                <span>{t("capstone.finalScore")}</span>
              </div>
              <ScoreGauge value={result.score} level={result.level} label={LEVEL_INFO[result.level]?.[lang]} />
            </Card>
            <Card className="capstone-cert-card">
              {certified ? (
                <>
                  <div className="cert-ring">
                    <div className="cert-ring-glow" />
                    <Crown size={32} />
                  </div>
                  <div className="cert-title">{t("capstone.certified")}</div>
                  <div className="cert-body">{t("capstone.certifiedBody")}</div>
                  <div className="cert-tag">
                    <Sparkles size={11} />
                    <span>Prompt Engineering Certification · {LEVEL_INFO[result.level]?.[lang]}</span>
                  </div>
                </>
              ) : (
                <>
                  <RotateCw size={28} className="cert-retry-icon" />
                  <div className="cert-title">{t("capstone.notYet")}</div>
                  <div className="cert-body">{t("capstone.notYetBody")}</div>
                </>
              )}
            </Card>
          </div>

          {result.strengths.length > 0 && (
            <Card className="eval-list-card strengths">
              <div className="eval-list-head">
                <CheckCircle2 size={14} />
                <span>{t("capstone.strengths")}</span>
              </div>
              <ul className="eval-list">
                {result.strengths.map((s, i) => <li key={i}><Check size={12} /><span>{s[lang]}</span></li>)}
              </ul>
            </Card>
          )}

          {result.suggestions.length > 0 && (
            <Card className="mentor-card">
              <div className="mentor-head">
                <Sparkles size={14} />
                <span>{t("capstone.roadmap")}</span>
              </div>
              <ul className="mentor-list">
                {result.suggestions.map((s, i) => (
                  <li key={i} className="mentor-item">
                    <ArrowRight size={12} className="mentor-arrow" />
                    <span>{s[lang]}</span>
                  </li>
                ))}
              </ul>
            </Card>
          )}
        </>
      )}
    </div>
  );
}


/* ============================================================================
   COOKIE BANNER + ACHIEVEMENT CORE
   ========================================================================== */

function CookieBanner() {
  const t = useT();
  const [accepted, setAccepted] = usePersistentState(KEYS.COOKIES, false);
  if (accepted) return null;
  return (
    <div className="cookie-banner" role="dialog" aria-live="polite">
      <div className="cookie-icon"><Cookie size={16} /></div>
      <div className="cookie-text">
        <div className="cookie-title">{t("cookies.title")}</div>
        <div className="cookie-body">{t("cookies.body")}</div>
      </div>
      <div className="cookie-actions">
        <button className="btn-ghost cookie-decline" onClick={() => setAccepted("essential")}>
          {t("cookies.essential")}
        </button>
        <button className="btn-primary cookie-accept" onClick={() => setAccepted("all")}>
          <Check size={12} />
          <span>{t("cookies.accept")}</span>
        </button>
      </div>
    </div>
  );
}

function AchievementCore({ visible, onClose }) {
  const t = useT();
  if (!visible) return null;
  return (
    <div className="achievement-overlay" onClick={onClose}>
      <div className="achievement-modal" onClick={(e) => e.stopPropagation()}>
        <button className="achievement-close" onClick={onClose} aria-label="Close"><X size={14} /></button>
        <div className="achievement-core">
          <div className="achievement-ring r1" />
          <div className="achievement-ring r2" />
          <div className="achievement-ring r3" />
          <div className="achievement-glow" />
          <div className="achievement-center">
            <Crown size={42} />
          </div>
        </div>
        <div className="achievement-title">{t("achievement.title")}</div>
        <div className="achievement-body">{t("achievement.body")}</div>
        <div className="achievement-tag">
          <Sparkles size={11} />
          <span>{t("achievement.tag")}</span>
        </div>
      </div>
    </div>
  );
}

/* ============================================================================
   MODULE ROUTER + TOOL ROUTER
   ========================================================================== */

function ModuleRouter({ moduleId, lang }) {
  switch (moduleId) {
    case "history":         return <HistoryModule lang={lang} />;
    case "what-is-prompt":  return <WhatIsPromptModule lang={lang} />;
    case "anatomy":         return <AnatomyModule lang={lang} />;
    case "study":           return <StudyModule lang={lang} />;
    case "work":            return <WorkModule lang={lang} />;
    case "coding":          return <CodingModule lang={lang} />;
    case "multimodal":      return <MultimodalModule lang={lang} />;
    case "context":         return <ContextModule lang={lang} />;
    case "leadership":      return <LeadershipModule lang={lang} />;
    case "ethics":          return <EthicsModule lang={lang} />;
    default:                return <HistoryModule lang={lang} />;
  }
}

function ToolRouter({ toolId, lang, completed }) {
  switch (toolId) {
    case "evaluator":  return <PromptEvaluatorView lang={lang} />;
    case "templates":  return <TemplatesLibraryView lang={lang} />;
    case "battle":     return <AIBattleView lang={lang} />;
    case "skills":     return <SkillTreeView lang={lang} completed={completed} />;
    case "capstone":   return <CapstoneView lang={lang} />;
    default:           return <PromptEvaluatorView lang={lang} />;
  }
}

/* ============================================================================
   APP SHELL
   ========================================================================== */

function AppShell() {
  const { lang, setLang } = useContext(I18nContext);
  const [activeView, setActiveView] = usePersistentState(KEYS.ACTIVE_VIEW, "hero");
  const [activeIdx, setActiveIdx] = usePersistentState(KEYS.ACTIVE_IDX, 0);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [completed, setCompleted] = usePersistentState(KEYS.COMPLETED, {});
  const [achievementShown, setAchievementShown] = usePersistentState(KEYS.ACHIEVEMENT_SHOWN, false);
  const [showAchievement, setShowAchievement] = useState(false);

  const totalProgress = (Object.values(completed).filter(Boolean).length / MODULES.length) * 100;

  const onPickModule = useCallback((idx) => {
    setActiveIdx(idx);
    setActiveView("module");
  }, [setActiveIdx, setActiveView]);

  const onPickTool = useCallback((toolId) => {
    setActiveView(toolId);
  }, [setActiveView]);

  const currentModule = MODULES[activeIdx];
  const isToolView = activeView !== "module" && activeView !== "hero";
  const completedThis = !!completed[currentModule?.id];

  const onMarkComplete = useCallback(() => {
    if (!currentModule) return;
    setCompleted((s) => ({ ...s, [currentModule.id]: !s[currentModule.id] }));
  }, [currentModule, setCompleted]);

  // Trigger achievement when all modules complete (once)
  useEffect(() => {
    const allDone = MODULES.every((m) => completed[m.id]);
    if (allDone && !achievementShown) {
      setShowAchievement(true);
      setAchievementShown(true);
    }
  }, [completed, achievementShown, setAchievementShown]);

  const onStartLearning = useCallback(() => {
    setActiveView("module");
    setActiveIdx(0);
  }, [setActiveView, setActiveIdx]);

  return (
    <div className="app">
      <Sidebar
        open={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        activeIdx={activeIdx}
        activeView={activeView}
        onPickModule={onPickModule}
        onPickTool={onPickTool}
        completed={completed}
        totalProgress={totalProgress}
        lang={lang}
        setLang={setLang}
      />
      {sidebarOpen && <div className="sidebar-backdrop" onClick={() => setSidebarOpen(false)} />}

      <main className="main">
        <Header
          activeView={activeView === "hero" ? "module" : activeView}
          activeIdx={activeIdx}
          onToggleSidebar={() => setSidebarOpen((s) => !s)}
          totalProgress={totalProgress}
          lang={lang}
          onMarkComplete={onMarkComplete}
          completedThis={completedThis}
        />

        <div className="content">
          {activeView === "hero" && (
            <Hero onCTAClick={onStartLearning} onPickTool={onPickTool} />
          )}

          {activeView === "module" && currentModule && (
            <>
              <ModuleHeader module={currentModule} lang={lang} />
              <ModuleRouter moduleId={currentModule.id} lang={lang} />
              <ModuleNav activeIdx={activeIdx} onNav={(i) => { setActiveIdx(i); window.scrollTo({ top: 0, behavior: "smooth" }); }} />
            </>
          )}

          {isToolView && (
            <ToolRouter toolId={activeView} lang={lang} completed={completed} />
          )}
        </div>

        <footer className="footer">
          <div className="footer-row">
            <div className="footer-brand">
              <BrainCircuit size={14} />
              <span>Prompt Engineering Academy</span>
            </div>
            <div className="footer-meta">
              <span>© {new Date().getFullYear()}</span>
              <span className="dot-sep">·</span>
              <span>{lang === "es" ? "Construido con disciplina." : lang === "en" ? "Built with discipline." : "Construído com disciplina."}</span>
            </div>
          </div>
        </footer>
      </main>

      <CookieBanner />
      <AchievementCore visible={showAchievement} onClose={() => setShowAchievement(false)} />
    </div>
  );
}

/* ============================================================================
   ROOT EXPORT
   ========================================================================== */

// Inject design tokens at module load (before first render) so styles apply on initial paint.
// useEffect runs after paint, which can cause a brief unstyled flash or a blank screen
// in hosts that mount + paint synchronously.
if (typeof document !== "undefined" && !document.getElementById("prompt-academy-design-tokens")) {
  try {
    const _styleEl = document.createElement("style");
    _styleEl.id = "prompt-academy-design-tokens";
    _styleEl.textContent = DESIGN_TOKENS;
    document.head.appendChild(_styleEl);
  } catch (_e) { /* silent */ }
}

class AppErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { error: null };
  }
  static getDerivedStateFromError(error) {
    return { error };
  }
  componentDidCatch(error, info) {
    // eslint-disable-next-line no-console
    if (typeof console !== "undefined") console.error("Prompt Academy crashed:", error, info);
  }
  render() {
    if (this.state.error) {
      const msg = String(this.state.error?.message || this.state.error || "Unknown error");
      const stack = String(this.state.error?.stack || "");
      return (
        <div style={{
          minHeight: "100vh", background: "#0a0a12", color: "#e5e7eb",
          fontFamily: "ui-sans-serif, system-ui, -apple-system, sans-serif",
          padding: "32px", boxSizing: "border-box",
        }}>
          <div style={{ maxWidth: 720, margin: "0 auto" }}>
            <div style={{ fontSize: 13, color: "#a78bfa", letterSpacing: ".08em", textTransform: "uppercase", marginBottom: 12 }}>
              Prompt Engineering Academy
            </div>
            <h1 style={{ fontSize: 24, fontWeight: 700, margin: "0 0 16px", color: "#f87171" }}>
              The app could not render
            </h1>
            <div style={{ background: "rgba(248,113,113,.08)", border: "1px solid rgba(248,113,113,.3)", borderRadius: 12, padding: 16, marginBottom: 16 }}>
              <div style={{ fontSize: 14, marginBottom: 8, color: "#fca5a5", fontWeight: 600 }}>{msg}</div>
              <pre style={{ fontSize: 11, color: "#9ca3af", whiteSpace: "pre-wrap", margin: 0, maxHeight: 320, overflow: "auto" }}>{stack}</pre>
            </div>
            <div style={{ fontSize: 13, color: "#9ca3af", lineHeight: 1.6 }}>
              Tip: make sure <code style={{ background: "#1f2937", padding: "2px 6px", borderRadius: 4 }}>react</code>,
              {" "}<code style={{ background: "#1f2937", padding: "2px 6px", borderRadius: 4 }}>react-dom</code>{" "}
              and <code style={{ background: "#1f2937", padding: "2px 6px", borderRadius: 4 }}>lucide-react</code> are installed.
            </div>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

export default function App() {
  // Defensive re-inject (in case the module-load inject missed because document
  // wasn't ready yet — e.g. SSR, then hydrate on client)
  useEffect(() => {
    if (typeof document === "undefined") return;
    if (document.getElementById("prompt-academy-design-tokens")) return;
    try {
      const styleEl = document.createElement("style");
      styleEl.id = "prompt-academy-design-tokens";
      styleEl.textContent = DESIGN_TOKENS;
      document.head.appendChild(styleEl);
    } catch (_e) { /* silent */ }
  }, []);

  return (
    <AppErrorBoundary>
      <I18nProvider>
        <AppShell />
      </I18nProvider>
    </AppErrorBoundary>
  );
}
